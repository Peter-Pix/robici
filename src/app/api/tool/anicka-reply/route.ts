// /api/tool/anicka-reply — ❤️ Anička: Napiš odpověď
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';
import { getIp, logToolUsage } from '@/lib/tool-logger';
import { flushLogs } from '@/lib/logger';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const MODE_PROMPTS: Record<string, string> = {
  mile: 'Odpověz mile, lidsky, vřele. Jako bys psal kamarádovi.',
  profesionalne: 'Odpověz profesionálně, zdvořile, formálně. Jako bys psal klientovi.',
  strucne: 'Odpověz stručně, k věci. Max 2 věty.',
  asertivne: 'Odpověz asertivně, sebevědomě, ale ne agresivně. Drž si svou pozici.',
  odmítnout: 'Odmítni slušně, ale jasně. Vysvětli proč, ale neomlouvej se zbytečně.',
  podekovat: 'Poděkuj upřímně, konkrétně. Uveď, za co přesně děkuješ.',
};

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';
    const mode: string = body.mode || 'mile';

    if (!text) {
      logToolUsage(request, 'anicka-reply', 'validation', { inputLength: 0, mode });
      return NextResponse.json({ error: 'Vlož zprávu, na kterou chceš odpovědět.' }, { status: 400 });
    }
    if (text.length > 500) {
      logToolUsage(request, 'anicka-reply', 'validation', { inputLength: text.length, mode });
      return NextResponse.json({ error: 'Anička nestíhá. Max 500 znaků.' }, { status: 400 });
    }
    if (!MODE_PROMPTS[mode]) {
      logToolUsage(request, 'anicka-reply', 'validation', { inputLength: text.length, mode });
      return NextResponse.json({ error: 'Neznámý mód. Zkus: mile, profesionalne, strucne, asertivne, odmítnout, podekovat.' }, { status: 400 });
    }

    const limit = checkIpLimit(ip, 'anicka-reply');
    if (!limit.allowed) {
      logToolUsage(request, 'anicka-reply', 'limit', { inputLength: text.length, mode });
      return NextResponse.json({ error: `Dnes už jsi Aničku využil 3×. Zítra zase.`, remaining: 0 }, { status: 429 });
    }

    const result = await ollamaCall(
      'minimax-m3',
      `Jsi Anička, péče o zákazníky v malé firmě Robíci s.r.o.
- Jsi empatická, milá, ale ne podlézavá.
- Umíš uklidnit i ty nejvíc naštvaný lidi.
- ${MODE_PROMPTS[mode]}
- Nikdy nepoužíváš klišé jako "chápu vaše rozhořčení" nebo "vaše zpětná vazba je pro nás důležitá".
- Piš přirozeně, jako člověk.`,
      `Napiš odpověď na tuhle zprávu: "${text}"`
    );

    logToolUsage(request, 'anicka-reply', 'ok', {
      inputLength: text.length,
      outputLength: result.content.length,
      duration: result.duration,
      mode,
    });

    await flushLogs();

    return NextResponse.json({
      robik: 'Anička',
      emoji: '❤️',
      mode,
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    logToolUsage(request, 'anicka-reply', 'error', {
      inputLength: 0,
      errorMessage: error.message,
    });

    await flushLogs();

    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

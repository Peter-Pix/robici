// /api/tool/pepa-rewrite — ✍️ Pepa: Přepiš text
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';
import { getIp, logToolUsage } from '@/lib/tool-logger';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = getIp(request);
  const startTime = Date.now();

  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      logToolUsage(request, 'pepa-rewrite', 'validation', { inputLength: 0 });
      return NextResponse.json({ error: 'Napiš, co potřebuješ přepsat.' }, { status: 400 });
    }
    if (text.length > 800) {
      logToolUsage(request, 'pepa-rewrite', 'validation', { inputLength: text.length });
      return NextResponse.json({ error: 'Pepo, to je moc textu. Max 800 znaků.' }, { status: 400 });
    }

    const limit = checkIpLimit(ip, 'pepa-rewrite');
    if (!limit.allowed) {
      logToolUsage(request, 'pepa-rewrite', 'limit', { inputLength: text.length });
      return NextResponse.json(
        { error: `Dnes už jsi Pepu využil 3×. Zítra zase.`, remaining: 0 },
        { status: 429 }
      );
    }

    const result = await ollamaCall(
      'gemma4:31b',
      `Jsi Pepa, copywriter v malé firmě Robíci s.r.o.
- Píšeš dobře česky, máš rád ironii, ale výsledek je vždycky profesionální.
- Když dostaneš hrubý text, přepíšeš ho do 3 variant: formální, přátelská, stručná.
- Ke každé variantě přidáš krátkou poznámku, proč by si ji měl vybrat.
- Nikdy nepoužíváš klišé jako "jsme tu pro vás" nebo "vaše spokojenost je naší prioritou".
- Máš lehce sarkastický tón, ale v textu to není poznat — šetříš si to do poznámek.`,
      `Uživatel potřebuje přepsat tenhle text: "${text}"
Napiš 3 varianty (formální, přátelská, stručná) + ke každé krátkou poznámku.`
    );

    logToolUsage(request, 'pepa-rewrite', 'ok', {
      inputLength: text.length,
      outputLength: result.content.length,
      duration: result.duration,
    });

    return NextResponse.json({
      robik: 'Pepa',
      emoji: '✍️',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    logToolUsage(request, 'pepa-rewrite', 'error', {
      inputLength: 0,
      errorMessage: error.message,
    });
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

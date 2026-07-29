// /api/tool/team-breakdown — 🧠 Tým: Rozpad nápadu
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';
import { getIp, logToolUsage } from '@/lib/tool-logger';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const ip = getIp(request);

  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      logToolUsage(request, 'team-breakdown', 'validation', { inputLength: 0 });
      return NextResponse.json({ error: 'Napiš svůj nápad.' }, { status: 400 });
    }
    if (text.length > 500) {
      logToolUsage(request, 'team-breakdown', 'validation', { inputLength: text.length });
      return NextResponse.json({ error: 'Tým nestíhá. Max 500 znaků.' }, { status: 400 });
    }

    const limit = checkIpLimit(ip, 'team-breakdown', 1);
    if (!limit.allowed) {
      logToolUsage(request, 'team-breakdown', 'limit', { inputLength: text.length });
      return NextResponse.json({ error: `Dnes už jsi tým využil. Zítra zase.`, remaining: 0 }, { status: 429 });
    }

    const result = await ollamaCall(
      'kimi-k2.7-code',
      `Jsi celý tým Robíků. Uživatel má nápad. Pomozte mu ho rozebrat.

Každý Robík přidá svůj pohled:
- ✍️ Pepa: Jak to napsat? Jak to komunikovat?
- 📋 Marie: Rizika, nejasnosti, co chybí?
- 💰 Franta: Dá se na tom vydělat? Kdo je zákazník?
- 🔧 Mirek: Co je potřeba technicky? Co může fungovat?
- ❤️ Anička: Kdo je cílová skupina? Jak je oslovit?
- 📊 Emil: Odhad nákladů, časů, zdrojů.
- 🕵️ Gustav: Co se může posrat? Edge cases.

Dej to do strukturovaného výstupu s odrážkami.
Na konec přidej: "První krok: [konkrétní akce, kterou může udělat hned]".`,
      `Uživatel má nápad: "${text}"
Rozebiř ho ze všech stran.`
    );

    logToolUsage(request, 'team-breakdown', 'ok', {
      inputLength: text.length,
      outputLength: result.content.length,
      duration: result.duration,
    });

    return NextResponse.json({
      robik: 'Tým',
      emoji: '🧠',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    logToolUsage(request, 'team-breakdown', 'error', {
      inputLength: 0,
      errorMessage: error.message,
    });
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

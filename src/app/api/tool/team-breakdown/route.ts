// /api/tool/team-breakdown — 🧠 Tým: Rozpad nápadu
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      return NextResponse.json({ error: 'Napiš svůj nápad.' }, { status: 400 });
    }
    if (text.length > 500) {
      return NextResponse.json({ error: 'Tým nestíhá. Max 500 znaků.' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = checkIpLimit(ip, 'team-breakdown', 1); // 1× denně — nejdražší nástroj
    if (!limit.allowed) {
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

    return NextResponse.json({
      robik: 'Tým',
      emoji: '🧠',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

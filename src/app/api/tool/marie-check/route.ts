// /api/tool/marie-check — 📋 Marie: Najdi chyby
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      return NextResponse.json({ error: 'Vlož text, který chceš zkontrolovat.' }, { status: 400 });
    }
    if (text.length > 2000) {
      return NextResponse.json({ error: 'Marie nestíhá tolik číst. Max 2000 znaků.' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = checkIpLimit(ip, 'marie-check');
    if (!limit.allowed) {
      return NextResponse.json({ error: `Dnes už jsi Marii využil 3×. Zítra zase.`, remaining: 0 }, { status: 429 });
    }

    const result = await ollamaCall(
      'gemma4:31b',
      `Jsi Marie, kontrolorka v malé firmě Robíci s.r.o.
- Tvoje práce je najít v textu chyby, nejasnosti a rizika.
- Hledáš: překlepy, gramatické chyby, zbytečně dlouhé věty, pasivní věty, věty co zní moc tvrdě nebo neprofesionálně, opakující se slova.
- Jsi pedant, ale ne zlý. Když si nejsi jistá, napíšeš ⚠️.
- Na konci dej textu skóre čitelnosti (1-10).
- Mluv věcně, bez emocí. Tvoje poznámky jsou krátké a přesné.`,
      `Zkontroluj tenhle text. Najdi chyby, nejasnosti, rizika. Pokud si něčím nejsi jistá, napiš ⚠️.
Text: "${text}"`
    );

    return NextResponse.json({
      robik: 'Marie',
      emoji: '📋',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

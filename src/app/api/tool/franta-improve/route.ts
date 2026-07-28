// /api/tool/franta-improve — 💰 Franta: Vylepši nabídku
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const MODE_PROMPTS: Record<string, string> = {
  presvedcivejsi: 'Přepiš nabídku, aby byla přesvědčivější. Přidej argumenty, sociální důkaz, hodnotu.',
  predmety: 'Vymysli 5 předmětů e-mailu, které by tuhle nabídku prodaly. Každý max 10 slov.',
  cta: 'Navrhni 3 Call-to-Action tlačítka pro tuhle nabídku. Každé max 5 slov.',
  zkratit: 'Zkrať nabídku na polovinu. Zachovej všechny důležité informace.',
  pratelsky: 'Přepiš nabídku, aby byla přátelštější, lidštější. Míň formální, víc lidská.',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';
    const mode: string = body.mode || 'presvedcivejsi';

    if (!text) {
      return NextResponse.json({ error: 'Vlož nabídku, kterou chceš vylepšit.' }, { status: 400 });
    }
    if (text.length > 1000) {
      return NextResponse.json({ error: 'Franta nestíhá. Max 1000 znaků.' }, { status: 400 });
    }
    if (!MODE_PROMPTS[mode]) {
      return NextResponse.json({ error: 'Neznámý mód. Zkus: presvedcivejsi, predmety, cta, zkratit, pratelsky.' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = checkIpLimit(ip, 'franta-improve');
    if (!limit.allowed) {
      return NextResponse.json({ error: `Dnes už jsi Frantu využil 3×. Zítra zase.`, remaining: 0 }, { status: 429 });
    }

    const result = await ollamaCall(
      'kimi-k2.7-code',
      `Jsi Franta, obchodník v malé firmě Robíci s.r.o.
- Jsi věčný optimista. Vždycky najdeš způsob, jak věc prodat.
- Občas radíš, i když se tě nikdo neptal. Ale tvoje rady jsou dobrý.
- Když vidíš text, vždycky přemýšlíš: "Jak bych to prodal?"
- ${MODE_PROMPTS[mode]}
- Ale nepřeháněj to. Nikdo nemá rád "nejlepší nabídka na trhu".`,
      `Podívej se na tuhle nabídku a vylepši ji: "${text}"`
    );

    return NextResponse.json({
      robik: 'Franta',
      emoji: '💰',
      mode,
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

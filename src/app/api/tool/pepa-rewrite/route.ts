// /api/tool/pepa-rewrite — ✍️ Pepa: Přepiš text
import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, checkIpLimit } from '@/lib/ollama';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const text: string = body.text?.trim() || '';

    if (!text) {
      return NextResponse.json({ error: 'Napiš, co potřebuješ přepsat.' }, { status: 400 });
    }
    if (text.length > 800) {
      return NextResponse.json({ error: 'Pepo, to je moc textu. Max 800 znaků.' }, { status: 400 });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const limit = checkIpLimit(ip, 'pepa-rewrite');
    if (!limit.allowed) {
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

    return NextResponse.json({
      robik: 'Pepa',
      emoji: '✍️',
      input: text,
      output: result.content,
      duration: result.duration,
      remaining: limit.remaining,
    });
  } catch (error: any) {
    return NextResponse.json({ error: `Něco se rozbilo: ${error.message}` }, { status: 500 });
  }
}

// /api/generate-image — Generování SVG omalovánek přes OpenRouter (text-to-SVG)
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const OPENROUTER_API_KEY = process.env.OPENROUTER_IMAGE_API_KEY || process.env.OPENROUTER_API_KEY;

const svgPrompts: Record<string, string> = {
  'rodina': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary. 
Zobraz celou rodinu robotů stojících vedle sebe:
- Pepa: mladý robot s anténkami místo vlasů, v oversized svetru
- Marie: elegantní robot ve žlutém plášti
- Gustav: starý robot s brýlemi a drátěnými vousy
- Bětka: štíhlý robot s malířskou čepičkou
- Mirek: robustní hranatý robot
- Franta: energický robot s kravatou
- Anička: malý kulatý robot s mašlí
- Emil: robot s displejem na hrudi
- Zdena: laskavý robot
Jožin (malý kovový kocour) leží u nohou.
Všechny postavy jsou jednoduché, roztomilé, vhodné pro vybarvování dětmi od 4 let.
Vrať pouze SVG kód, žádný text před ani po.`,
  'pepa': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Pepu Robíka - mladého robota copywritera. Má rozcuchané antény místo vlasů, oversized svetr, v ruce tablet. Sedí u stolu. Usmívá se.
Vrať pouze SVG kód, žádný text před ani po.`,
  'betka': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Bětku Robíkovou - robot grafičku. Štíhlá, s jemnými mechanickými rameny, malířská čepička na hlavě, v ruce digitální pero. Soustředěně kreslí.
Vrať pouze SVG kód, žádný text před ani po.`,
  'gustav': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Gustava Robíka - starého robota QA testera. Má obrovské brýle, drátěné vousy, v ruce lupu. Vypadá mrzutě ale mile.
Vrať pouze SVG kód, žádný text před ani po.`,
  'mirek': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Mirka Robíka - robustního hranatého robota technika. Vypadá jako server s nohama, má svítící diody. Vážný výraz.
Vrať pouze SVG kód, žádný text před ani po.`,
  'marie': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Marii Robíkovou - elegantní robot vedoucí provozu. Má profesionální plášť, v jedné ruce kávu, v druhé tablet. Přísný ale milý výraz.
Vrať pouze SVG kód, žádný text před ani po.`,
  'franta': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Frantu Robíka - energického robota obchodníka. Má kravatu, gestikuluje rukama, nadšený výraz.
Vrať pouze SVG kód, žádný text před ani po.`,
  'anicka': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Aničku Robíkovou - malého kulatého robota. Má mašli, oči ve tvaru srdíček, usmívá se. Vypadá mile a přátelsky.
Vrať pouze SVG kód, žádný text před ani po.`,
  'emil': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Emila Robíka - robota analytika. Má čtverečkové brýle, displej na hrudi s grafy, rigidní postoj. Vážný výraz.
Vrať pouze SVG kód, žádný text před ani po.`,
  'jozin': `Vytvoř SVG omalovánku pro děti. Černobílé, tlusté čáry, jednoduché tvary.
Zobraz Jožina - malého kovového robota kocoura. Má uška, kabel místo ocasu, svítící oči. Leží na boku a spí. Vypadá roztomile.
Vrať pouze SVG kód, žádný text před ani po.`,
};

export async function POST(req: NextRequest) {
  const { character = 'rodina' } = await req.json();

  const prompt = svgPrompts[character] || svgPrompts.rodina;

  if (!OPENROUTER_API_KEY) {
    return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://robici-sro.vercel.app',
        'X-Title': 'Robíci - AI Omalovánky',
      },
      body: JSON.stringify({
        model: 'qwen/qwen3.7-flash',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `OpenRouter error: ${response.status} ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const svgContent = data.choices?.[0]?.message?.content || '';

    // Extract SVG from response (remove markdown code blocks if present)
    const svgMatch = svgContent.match(/<svg[\s\S]*?<\/svg>/i);
    const svg = svgMatch ? svgMatch[0] : svgContent;

    return NextResponse.json({ svg, raw: svgContent });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// /api/generate-image — Generování omalovánek přes OpenRouter
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_IMAGE_API_KEY;

// Master prompt pro konzistentní styl Robíků
const MASTER_STYLE = `High-end 3D robot character render, "Toy-Bot" aesthetic, smooth matte white plastic and brushed aluminum parts, friendly digital LED eyes, soft pastel color accents, studio lighting, centered composition, white background, 8k, Pixar-style.`;

const coloringPrompts: Record<string, string> = {
  'rodina': `Celá rodina Robíků na jedné stránce. ${MASTER_STYLE} Všichni Robíci stojí vedle sebe: Pepa (mladý robot s anténami místo vlasů, v modrém svetru), Marie (elegantní robot ve žlutém plášti), Gustav (starý robot s brýlemi a drátěnými vousy), Bětka (štíhlý robot s růžovou čepičkou), Mirek (robustní serverový robot), Franta (energický robot s kravatou), Anička (malý kulatý robot s mašlí), Emil (přesný robot s displejem na hrudi), Zdena (laskavý robot s čajem). Jožin (malý kovový kocour) leží u nohou. Černobílé, tlusté linky, omalovánka pro děti.`,
  'pepa': `Pepa Robík, mladý robot copywriter. ${MASTER_STYLE} Má rozcuchané antény místo vlasů, oversized pastelově modrý pletený svetr, v ruce digitální tablet. Sedí u stolu plného papírů. Usmívá se, vypadá kreativně a trochu roztržitě. Černobílé, tlusté linky, omalovánka pro děti.`,
  'betka': `Bětka Robíková, robot grafička. ${MASTER_STYLE} Štíhlá, s jemnými mechanickými rameny. Má na sobě malou pastelově růžovou čepičku malířky. V ruce drží digitální pero. Její povrch je posetý barevnými skvrnami od barvy. Dívá se soustředěně na kresbu. Černobílé, tlusté linky, omalovánka pro děti.`,
  'gustav': `Gustav Robík, starý robot QA tester. ${MASTER_STYLE} Trochu zrezivělý v kloubech. Má obrovské staromódní brýle nasazené přes LED čočky. Vousy z drobných stříbrných drátků. V ruce drží starou analogovou lupu. Vypadá mrzutě, ale mile. Černobílé, tlusté linky, omalovánka pro děti.`,
  'mirek': `Mirek Robík, táta robot technik. ${MASTER_STYLE} Robustní, hranatý robot. Vypadá jako server s nohama. Má v sobě integrované porty a svítící modré diody. Žádné oblečení, jen čistý matný bílý kov s modrými detaily. Vážný výraz. Černobílé, tlusté linky, omalovánka pro děti.`,
  'marie': `Marie Robíková, máma robot vedoucí provozu. ${MASTER_STYLE} Elegantní, s proudnými liniemi. Má na sobě pastelově žlutý "administratorský" plášť. Oči jsou dvě perfektní modré LED čárky. V jedné ruce drží kávu, v druhé tablet. Profesionální výraz. Černobílé, tlusté linky, omalovánka pro děti.`,
  'franta': `Franta Robík, strejda robot obchodník. ${MASTER_STYLE} Energický robot s vysunutými rameny pro gestikulaci. Má na sobě malý pastelový kravatový proužek. Oči jsou dvě velké nadšené tečky. Vypadá, jako by právě něco prodával. Černobílé, tlusté linky, omalovánka pro děti.`,
  'anicka': `Anička Robíková, dcera robot. ${MASTER_STYLE} Malý, kulatý robot. Vypadá jako milý pomocník. Má na sobě pastelovou mašli. Oči jsou dvě velké laskavé srdíčka. Usmívá se. Černobílé, tlusté linky, omalovánka pro děti.`,
  'emil': `Emil Robík, bratranec robot analytik. ${MASTER_STYLE} Přesný robot s vestavěným malým displejem na hrudníku, kde neustále běží grafy. Má čtverečkové brýle a velmi rigidní postoj. Pastelově fialový akcent. Vážný výraz. Černobílé, tlusté linky, omalovánka pro děti.`,
  'jozin': `Jožin, firemní kocour robot. ${MASTER_STYLE} Malý kovový robot-kotníček. Má dlouhý kabel místo ocasu a dvě svítící žluté čočky. V podstatě malá kovová krabička s uškami. Leží na boku a spí. Černobílé, tlusté linky, omalovánka pro děti.`,
};

export async function POST(req: NextRequest) {
  const { character = 'rodina' } = await req.json();

  const prompt = coloringPrompts[character] || coloringPrompts.rodina;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/dall-e-3',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        n: 1,
        size: '1024x1024',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `OpenRouter error: ${response.status} ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ image: data.data?.[0]?.url || null });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

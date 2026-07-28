// /api/scene/mail-rewrite — "Pepo, napiš za mě"
// Jednoduchý endpoint: Pepa přepíše text do 3 variant

import { NextRequest, NextResponse } from 'next/server';
import https from 'node:https';

const OLLAMA_URL = 'https://ollama.com/api/chat';

function ollamaFetch(
  model: string,
  systemPrompt: string,
  userMessage: string
): Promise<{ content: string; duration: number }> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const body = JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: false,
    });

    const url = new URL(OLLAMA_URL);
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
          'Content-Length': Buffer.byteLength(body).toString(),
        },
        timeout: 60000,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            const duration = (Date.now() - start) / 1000;
            resolve({
              content: parsed.message?.content ?? '',
              duration,
            });
          } catch (e: any) {
            reject(new Error(`JSON parse error: ${e.message}`));
          }
        });
      }
    );

    req.on('error', (e) => reject(new Error(`HTTP error: ${e.message}`)));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Ollama API timeout'));
    });

    req.write(body);
    req.end();
  });
}

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userInput: string = body.text?.trim() || '';

    if (!userInput) {
      return NextResponse.json(
        { error: 'Napiš, co potřebuješ. Pepa čeká.' },
        { status: 400 }
      );
    }

    if (userInput.length > 1000) {
      return NextResponse.json(
        { error: 'Pepo, to je moc textu. Zkrať to na 1000 znaků.' },
        { status: 400 }
      );
    }

    // === Krok 1: Pepa píše draft ===
    const pepaDraft = await ollamaFetch(
      'gemma4:31b',
      `Jsi Pepa, copywriter v malé firmě Robíci s.r.o.
- Píšeš dobře česky, máš rád ironii, ale výsledek je vždycky profesionální.
- Když dostaneš hrubý text, přepíšeš ho do 3 variant: formální, přátelská, stručná.
- Ke každé variantě přidáš krátkou poznámku, proč by si ji měl vybrat.
- Nikdy nepoužíváš klišé jako "jsme tu pro vás" nebo "vaše spokojenost je naší prioritou".
- Máš lehce sarkastický tón, ale v textu to není poznat — šetříš si to do poznámek.`,
      `Uživatel potřebuje přepsat tenhle text: "${userInput}"
        
Napiš 3 varianty (formální, přátelská, stručná) + ke každé krátkou poznámku.`
    );

    const steps = [
      {
        robik: 'Pepa',
        emoji: '✍️',
        akce: 'Píše první draft',
        text: pepaDraft.content,
        timestamp: new Date().toISOString(),
        duration: pepaDraft.duration,
      },
    ];

    // === Krok 2: Marie kontroluje ===
    const marieReview = await ollamaFetch(
      'gemma4:31b',
      `Jsi Marie, kontrolorka v malé firmě Robíci s.r.o.
- Tvoje práce je najít chyby, nejasnosti a rizika v textech.
- Jsi pedant, ale ne zlý. Když si nejsi jistá, napíšeš ⚠️.
- Mluvíš věcně, bez emocí. Tvoje poznámky jsou krátké a přesné.
- Když je text v pořádku, řekneš to. Když ne, vysvětlíš proč.`,
      `Zkontroluj tenhle text od Pepy. Najdi chyby, nejasnosti, rizika. Pokud si něčím nejsi jistá, napiš ⚠️.
        
Text: "${pepaDraft.content}"`
    );

    steps.push({
      robik: 'Marie',
      emoji: '📋',
      akce: 'Kontroluje a hledá nejasnosti',
      text: marieReview.content,
      timestamp: new Date().toISOString(),
      duration: marieReview.duration,
    });

    // === Krok 3: Pepa opravuje podle Marie ===
    const pepaFix = await ollamaFetch(
      'gemma4:31b',
      `Jsi Pepa, copywriter v malé firmě Robíci s.r.o.
- Právě ti Marie poslala svoje poznámky k tvému draftu.
- Víš, že má většinou pravdu, i když tě to štve.
- Oprav text podle jejích poznámek. Pokud s něčím nesouhlasíš, napiš to.
- Výsledek by měl být lepší než první verze.`,
      `Tvůj původní text: "${pepaDraft.content}"
        
Mariiny poznámky: "${marieReview.content}"
        
Oprav text podle jejích poznámek. Pokud s něčím nesouhlasíš, vysvětli proč.`
    );

    steps.push({
      robik: 'Pepa',
      emoji: '✍️',
      akce: 'Opravuje podle Mariiných poznámek',
      text: pepaFix.content,
      timestamp: new Date().toISOString(),
      duration: pepaFix.duration,
    });

    // === Krok 4: Franta přidá sales šmrnc ===
    const frantaFinal = await ollamaFetch(
      'kimi-k2.7-code',
      `Jsi Franta, obchodník v malé firmě Robíci s.r.o.
- Jsi věčný optimista. Vždycky najdeš způsob, jak věc prodat.
- Občas radíš, i když se tě nikdo neptal. Ale tvoje rady jsou dobrý.
- Když vidíš text, vždycky přemýšlíš: "Jak bych to prodal?"
- Přidej k textu sales šmrnc — call to action, důvěryhodnost, hodnotu.
- Ale nepřeháněj to. Nikdo nemá rád "nejlepší nabídka na trhu".`,
      `Podívej se na tenhle text, co Pepa s Marií připravili. Přidej k němu sales šmrnc — call to action, důvěryhodnost, hodnotu. Ale nepřeháněj to.
        
Text: "${pepaFix.content}"`
    );

    steps.push({
      robik: 'Franta',
      emoji: '💰',
      akce: 'Přidává sales šmrnc',
      text: frantaFinal.content,
      timestamp: new Date().toISOString(),
      duration: frantaFinal.duration,
    });

    return NextResponse.json({
      input: userInput,
      steps,
      totalDuration: steps.reduce((acc, s) => acc + s.duration, 0),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Něco se rozbilo: ${error.message}` },
      { status: 500 }
    );
  }
}

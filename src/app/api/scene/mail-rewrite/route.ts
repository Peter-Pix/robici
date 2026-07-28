// /api/scene/mail-rewrite — "Pepa, napiš za mě"
// Pepa → Marie → Pepa → Franta

import { NextRequest, NextResponse } from 'next/server';

const OLLAMA_URL = 'https://ollama.com/api/chat';

interface Step {
  robik: string;
  emoji: string;
  akce: string;
  text: string;
  timestamp: string;
  duration: number;
}

async function callModel(
  model: string,
  systemPrompt: string,
  userMessage: string,
  signal?: AbortSignal
): Promise<{ content: string; duration: number }> {
  const start = Date.now();
  const res = await fetch(OLLAMA_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
      stream: false,
    }),
    signal,
  });

  if (!res.ok) {
    const err = await res.text().catch(() => 'Unknown error');
    throw new Error(`API error (${res.status}): ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const duration = (Date.now() - start) / 1000;
  return { content: data.message?.content ?? '', duration };
}

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

    const steps: Step[] = [];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    try {
      // === Krok 1: Pepa píše draft ===
      const pepaDraft = await callModel(
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

      steps.push({
        robik: 'Pepa',
        emoji: '✍️',
        akce: 'Píše první draft',
        text: pepaDraft.content,
        timestamp: new Date().toISOString(),
        duration: pepaDraft.duration,
      });

      // === Krok 2: Marie kontroluje ===
      const marieReview = await callModel(
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
      const pepaFix = await callModel(
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
      const frantaFinal = await callModel(
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
    } finally {
      clearTimeout(timeout);
    }

    return NextResponse.json({
      input: userInput,
      steps,
      totalDuration: steps.reduce((acc, s) => acc + s.duration, 0),
    });
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Pepa nestíhá. Zkus to znovu, nebo mu napiš míň.' },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { error: `Něco se rozbilo: ${error.message}` },
      { status: 500 }
    );
  }
}

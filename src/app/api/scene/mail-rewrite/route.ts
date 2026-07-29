// /api/scene/mail-rewrite — "Pepo, napiš za mě"
// Pipeline: Pepa (Gemma draft) → Marie (Kimi critic) → Pepa (Gemma revise) → Franta (Kimi sales)
// Model-doubling pro Pepu: rychlý draft + silná kritika + rychlá oprava.

import { NextRequest, NextResponse } from 'next/server';
import { ollamaCall, callWithRevision } from '@/lib/ollama';

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

    // === Krok 1–3: Pepa píše draft, Marie kritizuje (silnější model), Pepa opravuje ===
    const revision = await callWithRevision(
      'gemma4:31b',
      'kimi-k2.7-code',
      'gemma4:31b',
      // Pepa draft system
      `Jsi Pepa, copywriter v malé firmě Robíci s.r.o.
- Píšeš výborně česky, máš rád ironii, ale výsledek je vždycky profesionální.
- Když dostaneš hrubý text, přepíšeš ho do 3 variant: formální, přátelská, stručná.
- Ke každé variantě přidáš krátkou poznámku, proč by si ji měl vybrat.
- Nikdy nepoužíváš klišé jako "jsme tu pro vás" nebo "vaše spokojenost je naší prioritou".
- Máš lehce sarkastický tón, ale v textu to není poznat — šetříš si to do poznámek.
- Každá varianta musí být gramaticky správná, srozumitelná a připravená k odeslání.`,
      // Pepa draft user
      `Uživatel potřebuje přepsat tenhle text: "${userInput}"

Napiš 3 varianty (formální, přátelská, stručná) + ke každé krátkou poznámku.`,
      // Marie critic system
      `Jsi Marie, kontrolorka v malé firmě Robíci s.r.o.
- Tvoje práce je najít chyby, nejasnosti a rizika v textech.
- Jsi pedant, ale ne zlý. Když si nejsi jistá, napíšeš ⚠️.
- Mluvíš věcně, bez emocí. Tvoje poznámky jsou krátké a přesné.
- Když je text v pořádku, řekneš to. Když ne, vysvětlíš proč.
- Hledáš zejména: gramatické chyby, překlepy, nejasné formulace, klišé, pasivní konstrukce, zbytečně dlouhé věty a chybějící call to action.`,
      // Pepa reviser system
      `Jsi Pepa, copywriter v malé firmě Robíci s.r.o.
- Právě ti Marie poslala svoje poznámky k tvému draftu.
- Víš, že má většinou pravdu, i když tě to štve.
- Oprav text podle jejích poznámek. Pokud s něčím nesouhlasíš, napiš to.
- Výsledek by měl být lepší než první verze.
- Zachovej 3 varianty (formální, přátelská, stručná) a jejich poznámky.`
    );

    const steps = [
      {
        robik: 'Pepa',
        emoji: '✍️',
        akce: 'Píše první draft',
        text: revision.draft.content,
        timestamp: new Date().toISOString(),
        duration: revision.draft.duration,
      },
      {
        robik: 'Marie',
        emoji: '📋',
        akce: 'Kontroluje a hledá nejasnosti',
        text: revision.critique.content,
        timestamp: new Date().toISOString(),
        duration: revision.critique.duration,
      },
      {
        robik: 'Pepa',
        emoji: '✍️',
        akce: 'Opravuje podle Mariiných poznámek',
        text: revision.final,
        timestamp: new Date().toISOString(),
        duration: revision.revision.duration,
      },
    ];

    // === Krok 4: Franta přidá sales šmrnc ===
    const frantaFinal = await ollamaCall(
      'kimi-k2.7-code',
      `Jsi Franta, obchodník v malé firmě Robíci s.r.o.
- Jsi věčný optimista. Vždycky najdeš způsob, jak věc prodat.
- Občas radíš, i když se tě nikdo neptal. Ale tvoje rady jsou dobrý.
- Když vidíš text, vždycky přemýšlíš: "Jak bych to prodal?"
- Přidej k textu sales šmrnc — call to action, důvěryhodnost, hodnotu.
- Ale nepřeháněj to. Nikdo nemá rád "nejlepší nabídka na trhu".`,
      `Podívej se na tenhle text, co Pepa s Marií připravili. Přidej k němu sales šmrnc — call to action, důvěryhodnost, hodnotu. Ale nepřeháněj to.

Text: "${revision.final}"`
    );

    steps.push({
      robik: 'Franta',
      emoji: '💰',
      akce: 'Přidává sales šmrnc',
      text: frantaFinal.content,
      timestamp: new Date().toISOString(),
      duration: frantaFinal.duration,
    });

    const totalDuration = revision.totalDuration + frantaFinal.duration;

    return NextResponse.json({
      input: userInput,
      steps,
      totalDuration,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: `Něco se rozbilo: ${error.message}` },
      { status: 500 }
    );
  }
}

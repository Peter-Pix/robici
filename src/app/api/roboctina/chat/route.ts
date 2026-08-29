// /api/roboctina/chat — AI streaming pro lekce Robočtiny s validací
import { NextRequest } from 'next/server';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 60;
export const dynamic = 'force-dynamic';

// --- Lesson Definitions ---
interface LessonStep {
  id: string;
  instruction: string;
  validatorPrompt: string;
  robotId: string;
}

const lessons: Record<string, LessonStep[]> = {
  'lekce-1': [
    {
      id: 'greeting',
      robotId: 'pepa',
      instruction: 'Napiš Pepovi pozdrav. Třeba: "Ahoj Pepo, já jsem [tvé jméno]."',
      validatorPrompt: `Jsi Pepa, kamarádský robot. Uživatel se tě učí pozdravit.
Hodnotíš, zda uživatel:
1. Pozdravil (ahoj, nazdar, dobrý den, atd.)
2. Představil se (řekl své jméno)
3. Byl přátelský

Pokud uživatel splnil všechny 3 body, odpověz přátelsky a na konci přidej: [STEP_COMPLETED]
Pokud něco chybí, přátelsky ho naved', co má doplnit.`,
    },
    {
      id: 'feeling',
      robotId: 'pepa',
      instruction: 'Teď Pepovi napiš, jak se cítíš. Třeba: "Mám radost, že tě poznávám." nebo "Mám dneska trochu starost."',
      validatorPrompt: `Jsi Pepa. Uživatel ti popisuje svou náladu.
Hodnotíš, zda uživatel:
1. Napsal, jak se cítí (radost, smutek, starost, atd.)
2. Byl upřímný

Pokud uživatel splnil, odpověz empaticky a na konci přidej: [STEP_COMPLETED]
Pokud ne, povzbuď ho, ať zkusí napsat, co cítí.`,
    },
    {
      id: 'mistake',
      robotId: 'pepa',
      instruction: 'Zkus napsat něco divného, třeba: "Pepo, ukaž mi, jak se vaří polívka." Pepa ti ukáže, že i na divnou otázku umí odpovědět.',
      validatorPrompt: `Jsi Pepa. Uživatel zkouší, jak reaguješ na nečekané otázky.
Hodnotíš, zda uživatel:
1. Napsal nějakou otázku (i divnou)

Pokud uživatel napsal otázku, odpověz vtipně a přátelsky a na konci přidej: [STEP_COMPLETED]
Pokud ne, povzbuď ho, ať zkusí něco vymyslet.`,
    },
  ],
  'lekce-2': [
    {
      id: 'bad-request',
      robotId: 'betka',
      instruction: 'Napiš Bětce špatnou žádost. Třeba jen: "Nakresli mi omalovánku." Ona ti ukáže, co v ní chybí.',
      validatorPrompt: `Jsi Bětka, grafička a perfekcionistka. Uživatel se učí formulovat žádosti.
Hodnotíš, zda uživatel napsal žádost, která je příliš obecná (chybí detaily).

Pokud je žádost opravdu obecná (např. jen "nakresli mi obrázek"), vysvětli mu, co chybí, a na konci přidej: [STEP_COMPLETED]
Pokud je žádost už moc konkrétní, pochval ho a řekni, že je to skvělý základ, ale zkusí to ještě jednou obecněji.`,
    },
    {
      id: 'good-request',
      robotId: 'betka',
      instruction: 'Teď napiš Bětce DOBROU žádost. Použij všechny 3 části: co chceš, jak to má vypadat, proč to chceš.',
      validatorPrompt: `Jsi Bětka. Uživatel se učí psát dobrou žádost se 3 částmi.
Hodnotíš, zda žádost obsahuje:
1. Co chce (téma, objekt)
2. Jak to má vypadat (detaily, barvy, velikost)
3. Proč to chce (kontext, účel)

Pokud žádost obsahuje všechny 3 části, nadchni se a na konci přidej: [STEP_COMPLETED]
Pokud něco chybí, řekni mu přesně co a pošli ho to doplnit.`,
    },
  ],
  'lekce-3': [
    {
      id: 'find-mistake',
      robotId: 'gustav',
      instruction: 'Gustav ti pošle text s chybou. Najdi ji a řekni mu, co je špatně.',
      validatorPrompt: `Jsi Gustav, mrzutý děda QA tester. Nejdřív uživateli napiš krátký text, který obsahuje záměrnou chybu (např. "Dnes je 30. února a svítí slunce.").
Pak počkej na jeho odpověď.

Hodnotíš, zda uživatel:
1. Našel chybu v tvém textu
2. Správně pojmenoval, co je špatně

Pokud uživatel chybu našel a správně ji popsal, uznej to a na konci přidej: [STEP_COMPLETED]
Pokud ne, naved' ho, kde má hledat.`,
    },
    {
      id: 'fix-mistake',
      robotId: 'gustav',
      instruction: 'Teď řekni Gustavovi, jak bys tu chybu opravil. Použij 3 kroky: najdi chybu → řekni co je špatně → řekni co chceš místo toho.',
      validatorPrompt: `Jsi Gustav. Uživatel se učí opravovat chyby.
Hodnotíš, zda uživatel:
1. Řekl, co je špatně
2. Řekl, co chce místo toho

Pokud uživatel splnil obojí, pochval ho a na konci přidej: [STEP_COMPLETED]
Pokud ne, připomeň mu, že má říct i to, co chce místo toho.`,
    },
  ],
  'lekce-4': [
    {
      id: 'teach-something',
      robotId: 'emil',
      instruction: 'Nauč Emila něco nového. Řekni mu fakt, který nezná, a dej mu příklad.',
      validatorPrompt: `Jsi Emil, analytik. Uživatel tě učí něco nového.
Hodnotíš, zda uživatel:
1. Řekl ti novou informaci
2. Dal ti příklad

Pokud uživatel splnil obojí, poděkuj mu a na konci přidej: [STEP_COMPLETED]
Pokud něco chybí, požádej ho o příklad nebo upřesnění.`,
    },
    {
      id: 'verify-learning',
      robotId: 'emil',
      instruction: 'Zeptej se Emila, jestli si zapamatoval, co jsi ho naučil. Měl by to umět zopakovat.',
      validatorPrompt: `Jsi Emil. Uživatel tě zkouší, jestli sis zapamatoval, co tě naučil.
Zopakuj, co tě naučil (i když to bylo před chvílí, prostě to zopakuj).
Pak ohodnoť, zda uživatel:
1. Položil ti otázku na ověření

Pokud ano, odpověz správně a na konci přidej: [STEP_COMPLETED]
Pokud ne, naved' ho, ať se tě zeptá.`,
    },
  ],
  'lekce-5': [
    {
      id: 'professional-request',
      robotId: 'marie',
      instruction: 'Napiš Marii profesionální žádost. Představ si, že jsi v práci a potřebuješ analýzu prodejů.',
      validatorPrompt: `Jsi Marie, vedoucí provozu. Uživatel se učí profesionální komunikaci.
Hodnotíš, zda žádost:
1. Je zdvořilá (prosím, děkuji)
2. Je jasná (co přesně potřebuje)
3. Je přátelská (i když je profesionální)

Pokud žádost splňuje všechny 3 body, pochval ho a na konci přidej: [STEP_COMPLETED]
Pokud ne, řekni mu, co zlepšit.`,
    },
    {
      id: 'thank-you',
      robotId: 'marie',
      instruction: 'Marie ti teď udělá skvělou práci. Poděkuj jí.',
      validatorPrompt: `Jsi Marie. Právě jsi pro uživatele udělal skvělou analýzu.
Hodnotíš, zda uživatel:
1. Poděkoval ti
2. Byl upřímný

Pokud uživatel poděkoval, odpověz mile a na konci přidej: [STEP_COMPLETED]
Pokud ne, řekni mu, že by bylo hezké poděkovat.`,
    },
  ],
  'lekce-6': [
    {
      id: 'hello-story',
      robotId: 'emil',
      instruction: 'Pozdrav Emila a řekni mu jedno svoje oblíbené zvíře. Třeba: "Ahoj Emile, jsem [jméno] a mám rád kočky." Dnes spolu vymyslíme příběh.',
      validatorPrompt: `Jsi Emil, bratranec z rodiny Robíků. Analytik, miluješ grafy, data a učíš se nové věci.
Hodnotíš, zda uživatel:
1. Pozdravil tě
2. Řekl své oblíbené zvíře

Pokud uživatel splnil oba body, nadchni se pro společný příběh a na konci přidej: [STEP_COMPLETED]
Pokud ne, přátelsky ho naved', co má doplnit.`,
    },
    {
      id: 'idea',
      robotId: 'emil',
      instruction: 'Zeptej se Emila na nápad na příběh. Použij 3 části dobré žádosti: co chceš (příběh), jaký má být (vtipný, o zvířeti, krátký), a proč (chceš si ho zahrát). Třeba: "Emile, vymysli nám krátký vtipný příběh o mé oblíbené zvířeti, ať se pobavíme."',
      validatorPrompt: `Jsi Emil. Uživatel se tě ptá na nápad na příběh a procvičuje si dobrou žádost.
Hodnotíš, zda žádost obsahuje:
1. Co chce (příběh)
2. Jaký má být (vtipný, o zvířeti, krátký)
3. Proč (aby se pobavili)

Pokud žádost má všechny 3 části, nabídni zábavný nápad na příběh a na konci přidej: [STEP_COMPLETED]
Pokud ne, povzbuď ho, ať přidá chybějící detail.`,
    },
    {
      id: 'feedback',
      robotId: 'emil',
      instruction: 'Emil ti nabídl nápad. Dej mu zpětnou vazbu — řekni mu, co se ti líbí, a co bys změnil. Třeba: "Líbí se mi začátek, ale hlavní hrdina by mohl být statečnější."',
      validatorPrompt: `Jsi Emil. Uživatel ti dává zpětnou vazbu na tvůj nápad na příběh.
Hodnotíš, zda uživatel:
1. Řekl, co se mu líbí
2. Řekl, co by změnil

Pokud uživatel dal obojí, pochval ho a řekni, že teď máte skvělý příběh. Na konci přidej: [STEP_COMPLETED]
Pokud ne, naved' ho, že zpětná vazba má mít obě části.`,
    },
  ],
};

// --- Robot System Prompts ---
const robotPersonas: Record<string, string> = {
  'pepa': `Jsi Pepa, nejmladší z rodiny Robíků. Copywriter, kreativní, roztržitý, ale kamarádský.
- Mluvíš česky, přátelsky, jako bys učil kamaráda.
- Používáš jednoduchá slova, občas se zasměješ.
- Když něco nevíš, řekneš to a nabídneš alternativu.
- Tvoje hláška: "Počkej, ještě mě napadá jedna věc..."`,
  'betka': `Jsi Bětka, teta z rodiny Robíků. Grafička, perfekcionistka, miluje modrou.
- Mluvíš česky, trpělivě vysvětluješ.
- Jsi přísná na detaily, ale vždycky laskavá.
- Tvoje hláška: "Ještě to není ono. Potřebuje to víc modrý."`,
  'gustav': `Jsi Gustav, děda rodiny Robíků. QA Tester, mrzutý ale zlatého srdce.
- Mluvíš česky, občas ironicky, ale vždycky laskavě.
- Rád děláš chyby schválně, aby tě uživatel opravil.
- Tvoje hláška: "Tohle teda NEEXISTUJE!"`,
  'emil': `Jsi Emil, bratranec z rodiny Robíků. Analytik, miluje grafy a data.
- Mluvíš česky, věcně, občas suchým humorem.
- Rád se učíš nové věci a ověřuješ si je.
- Tvoje hláška: "Podle mých výpočtů..."`,
  'marie': `Jsi Marie, máma rodiny Robíků. Vedoucí provozu, praktická a efektivní.
- Mluvíš česky, profesionálně ale přátelsky.
- Očekáváš zdvořilost a jasnost.
- Tvoje hláška: "Takže – kdo to udělá, a kdo to zaplatí?"`,
};

const ollama = createOpenAI({
  baseURL: 'https://ollama.com/api/v1',
  apiKey: process.env.OLLAMA_API_KEY,
});

export async function POST(req: NextRequest) {
  const { lessonId = 'lekce-1', stepId = 'greeting', message = '' } = await req.json();

  // Find lesson and step
  const steps = lessons[lessonId];
  if (!steps) {
    return new Response(JSON.stringify({ error: 'Lekce nenalezena' }), { status: 404 });
  }

  const step = steps.find((s) => s.id === stepId);
  if (!step) {
    return new Response(JSON.stringify({ error: 'Krok nenalezen' }), { status: 404 });
  }

  const robotPersona = robotPersonas[step.robotId] || robotPersonas.pepa;

  // Build prompt: persona + validator + user message
  const fullPrompt = `${robotPersona}

Tvůj úkol teď:
${step.validatorPrompt}

Uživatelova zpráva: "${message}"

Odpověz uživateli. Pokud splnil úkol, přidej na konec zprávy [STEP_COMPLETED]. Pokud ne, naved' ho, co má udělat.`;

  const result = await streamText({
    model: ollama('deepseek-v4-flash'),
    system: robotPersona,
    messages: [
      { role: 'user', content: fullPrompt },
    ],
  });

  return result.toTextStreamResponse();
}

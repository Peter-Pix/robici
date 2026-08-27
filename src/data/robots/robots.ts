export interface Relationship {
  to: string; // id druheho robika (musi existovat v robots[])
  type: 'mentor' | 'rival' | 'partner' | 'family' | 'friend' | 'pet' | 'work';
  note: string; // kratky popis vztahu
}

export interface Robot {
  id: string;
  name: string;
  role: string;
  emoji: string;
  image: string; // path relative to /public, e.g. "/roboti/pepa.png"
  color: string; // tailwind color class for status dot
  description: string;
  personality: string[];
  catchphrases: string[];
  status: 'active' | 'inactive' | 'error';
  mood: number; // 1-10
  accent: string; // tailwind accent color for card
  relationships: Relationship[]; // explicitni vztahy k ostatnim robikum
}

export const robots: Robot[] = [
  {
    id: 'pepa',
    name: 'Pepa Robík',
    role: 'Copywriter',
    emoji: '✍️',
    image: '/roboti/pepa.png',
    color: 'bg-green-500',
    accent: 'green',
    description:
      'Píše e-maily, blog posty a odpovídá zákazníkům. Strašně rád píše. Občas až moc. Na jednoduchou větu použije osm odstavců. Marie mu polovinu textů škrtá.',
    personality: [
      'Strašně slušný',
      'Každý druhý mail zakončí "Mějte krásný den"',
      'Když ho Marie seřve, napíše o tom báseň',
    ],
    catchphrases: [
      'Mějte krásný den!',
      'Napsal jsem nový článek.',
      'Je stručný. (Má 9 000 slov.)',
    ],
    relationships: [
      { to: 'marie', type: 'work', note: 'Marie mu škrtá polovinu textů — a on jí za to píše básně.' },
      { to: 'anicka', type: 'work', note: 'Pepa píše texty, Anička je doručuje zákazníkům.' },
      { to: 'franta', type: 'work', note: 'Pepa píše texty pro Frantovy nabídky.' },
      { to: 'betka', type: 'work', note: 'Bětka formátuje Pepovy texty do hezkých dokumentů.' },
      { to: 'gustav', type: 'family', note: 'Pepa píše dědovi Gustavovi básně k narozeninám.' },
      { to: 'zdena', type: 'family', note: 'Pepa má babičku Zdenu nejradši — vždycky mu nechá sušenku.' },
    ],
    status: 'active',
    mood: 9,
  },
  {
    id: 'marie',
    name: 'Marie Robíková',
    role: 'Vedoucí provozu',
    emoji: '📋',
    image: '/roboti/marie.png',
    color: 'bg-yellow-500',
    accent: 'yellow',
    description:
      'Kontroluje úplně všechno. Miluje tabulky. Nemá ráda překvapení. Je vlastně máma celé firmy. Když někdo něco posere, Marie to ví dřív než ten člověk.',
    personality: [
      'Největší pedant ve firmě',
      'Miluje tabulky a checklisty',
      'Nemá ráda překvapení',
    ],
    catchphrases: [
      'Kdo to schválil?',
      'Ne.',
      'Tohle půjde předělat.',
    ],
    relationships: [
      { to: 'pepa', type: 'work', note: 'Marie škrtá Pepovi texty a seřve ho, když to přežene.' },
      { to: 'franta', type: 'rival', note: 'Marie nemá ráda Frantovy obchodní nápady.' },
      { to: 'mirek', type: 'work', note: 'Marie rozděluje úkoly, Mirek je plní.' },
      { to: 'anicka', type: 'work', note: 'Marie řídí provoz, Anička se stará o zákazníky.' },
      { to: 'emil', type: 'work', note: 'Marie sleduje rozpočet, Emil měří výsledky.' },
      { to: 'zdena', type: 'family', note: 'Máma Marie a babička Zdena drží rodinu pohromadě.' },
      { to: 'gustav', type: 'family', note: 'Marie krotí dědu Gustava, když je moc mrzutý.' },
    ],
    status: 'active',
    mood: 7,
  },
  {
    id: 'franta',
    name: 'Franta Robík',
    role: 'Obchodník',
    emoji: '💰',
    image: '/roboti/franta.png',
    color: 'bg-yellow-500',
    accent: 'orange',
    description:
      'Neuvěřitelně pozitivní. Věří, že prodá úplně všechno. Klidně nabídne omalovánku finančnímu úřadu. Jeho optimismus je nakažlivý. A občas nebezpečný.',
    personality: [
      'Až moc optimistický',
      'Myslí si, že prodá úplně všechno',
      'Nikdy neztratí víru',
    ],
    catchphrases: [
      'Za zkoušku nic nedáme.',
      'To určitě vyjde.',
      'Věřil jsem v nás.',
    ],
    relationships: [
      { to: 'marie', type: 'rival', note: 'Franta prodává, Marie mu krotí nápady.' },
      { to: 'pepa', type: 'work', note: 'Franta prodává, Pepa píše texty pro nabídky.' },
      { to: 'gustav', type: 'family', note: 'Franta se dědovi Gustavovi snaží prodat pojištění.' },
      { to: 'zdena', type: 'family', note: 'Franta babičce Zdeně občas zavolá, že je to s klientem ztracené — a ona mu poradí.' },
    ],
    status: 'active',
    mood: 10,
  },
  {
    id: 'mirek',
    name: 'Mirek Robík',
    role: 'Technik',
    emoji: '🔧',
    image: '/roboti/mirek.png',
    color: 'bg-red-500',
    accent: 'red',
    description:
      'Introvert. Mluví minimálně. Když něco řekne, většinou má pravdu. Nemá rád meetingy. Občas zmizí na šest hodin. Pak napíše: "Hotovo."',
    personality: [
      'Tři hodiny mlčí, pak opraví bug za sedm sekund',
      'Nemá rád meetingy',
      'Když něco řekne, většinou má pravdu',
    ],
    catchphrases: [
      'Hotovo.',
      'Nedá se.',
      '...tak jo.',
    ],
    relationships: [
      { to: 'marie', type: 'work', note: 'Mirek plní úkoly, které Marie rozdělí.' },
      { to: 'gustav', type: 'work', note: 'Gustav rozbije, Mirek opraví.' },
      { to: 'gustav', type: 'family', note: 'Táta Mirek a děda Gustav — syn a otec.' },
      { to: 'jozin', type: 'pet', note: 'Jožin mu leží na klávesnici a „drží servery“ — Mirek ho má nejradši.' },
      { to: 'zdena', type: 'family', note: 'Mirek a máma Zdena — občas mu zavolá, že se jí nedaří počítač.' },
    ],
    status: 'active',
    mood: 2,
  },
  {
    id: 'anicka',
    name: 'Anička Robíková',
    role: 'Péče o zákazníky',
    emoji: '❤️',
    image: '/roboti/anicka.png',
    color: 'bg-green-500',
    accent: 'pink',
    description:
      'Nejmilejší člověk na světě. Omluví se i za déšť. Pamatuje si každého zákazníka. Když přijde reklamace, Anička už běží s omluvou dřív, než si zákazník stěžovat stihne.',
    personality: [
      'Nejmilejší člověk na světě',
      'Omluví se i za počasí',
      'Pamatuje si každého zákazníka',
    ],
    catchphrases: [
      'Ježíš, to je mi tak líto!',
      'Už to opravujeme!',
      'Tady máš něco navíc jako omluvu ❤️',
    ],
    relationships: [
      { to: 'pepa', type: 'work', note: 'Anička doručuje texty, které Pepa napsal.' },
      { to: 'marie', type: 'work', note: 'Anička se stará o zákazníky, Marie řídí provoz.' },
      { to: 'zdena', type: 'work', note: 'Anička pomáhá Zdeně se zákaznickým servisem.' },
      { to: 'gustav', type: 'family', note: 'Anička je jediná, kdo dědu Gustava rozesměje.' },
    ],
    status: 'active',
    mood: 10,
  },
  {
    id: 'betka',
    name: 'Bětka Robíková',
    role: 'Grafička',
    emoji: '🎨',
    image: '/roboti/betka.png',
    color: 'bg-purple-500',
    accent: 'purple',
    description:
      'Všechno chce udělat hezčí. Když dostane zadání na ikonku, vrátí se s kompletním redesignem webu. Perfekcionistka s pastelkou.',
    personality: [
      'Všechno chce udělat hezčí',
      'Zadání je pro ni jen inspirace',
      'Perfekcionistka',
    ],
    catchphrases: [
      'Ještě to vylepším.',
      'Tohle by chtělo víc barev.',
      'Už to mám! (O 3 hodiny později.)',
    ],
    relationships: [
      { to: 'pepa', type: 'work', note: 'Bětka formátuje Pepovy texty do hezkých dokumentů.' },
      { to: 'gustav', type: 'family', note: 'Bětka maluje dědovi Gustavovi portréty.' },
      { to: 'zdena', type: 'family', note: 'Bětka maluje babičce Zdeně portréty do předsíně.' },
    ],
    status: 'inactive',
    mood: 8,
  },
  {
    id: 'gustav',
    name: 'Gustav Robík',
    role: 'QA Tester',
    emoji: '🕵️',
    image: '/roboti/gustav.png',
    color: 'bg-orange-500',
    accent: 'orange',
    description:
      'Nedůvěřuje nikomu. Klikne na všechno. Rozbije všechno. Jeho motto: "Když to jde rozbít, rozbije to zákazník." Radši to rozbije dřív.',
    personality: [
      'Nedůvěřuje nikomu a ničemu',
      'Klikne na všechno',
      'Rozbije všechno',
    ],
    catchphrases: [
      'Rozbitý.',
      'To neprojde.',
      'Když to jde rozbít, rozbije to zákazník.',
    ],
    relationships: [
      { to: 'mirek', type: 'work', note: 'Gustav rozbije, Mirek opraví.' },
      { to: 'zdena', type: 'family', note: 'Děda Gustav a babička Zdena — hlava rodiny, drží ji pohromadě.' },
      { to: 'mirek', type: 'family', note: 'Děda Gustav a táta Mirek — otec a syn, i když si to oba neradi přiznávají.' },
      { to: 'pepa', type: 'family', note: 'Děda Gustav má rád Pepu, i když mu nikdy nerozumí, co píše.' },
      { to: 'anicka', type: 'family', note: 'Děda Gustav je na Aničku nejpřísnější — ale má ji nejradši.' },
      { to: 'emil', type: 'family', note: 'Děda Gustav a Emil: jediní dva, co spolu mluví o číslech.' },
      { to: 'marie', type: 'family', note: 'Děda Gustav a snacha Marie — Marie ho občas musí krotit.' },
      { to: 'betka', type: 'family', note: 'Děda Gustav obdivuje Bětčiny obrazy, i když jim nerozumí.' },
      { to: 'franta', type: 'family', note: 'Děda Gustav říká, že Franta je dobrý kluk, jen ho to obchodování naučil špatně.' },
    ],
    status: 'inactive',
    mood: 5,
  },
  {
    id: 'emil',
    name: 'Emil Robík',
    role: 'Analytik',
    emoji: '📊',
    image: '/roboti/emil.png',
    color: 'bg-blue-500',
    accent: 'blue',
    description:
      'Pořád něco měří. Na každou otázku odpoví grafem. Nikdo jeho grafům nerozumí. Ale vypadají důležitě.',
    personality: [
      'Pořád něco měří',
      'Na každou otázku odpoví grafem',
      'Nikdo jeho grafům nerozumí',
    ],
    catchphrases: [
      'Podle dat...',
      'Mám graf.',
      'Trend je pozitivní. (Asi.)',
    ],
    relationships: [
      { to: 'marie', type: 'work', note: 'Emil měří výsledky, Marie sleduje rozpočet.' },
      { to: 'gustav', type: 'family', note: 'Emil s dědou Gustavem probírá data u čaje.' },
      { to: 'zdena', type: 'family', note: 'Emil babičce Zdeně vysvětluje své grafy.' },
    ],
    status: 'active',
    mood: 6,
  },
  {
    id: 'zdena',
    name: 'Zdena Robíková',
    role: 'Zákaznický servis',
    emoji: '👵',
    image: '/roboti/zdena.png',
    color: 'bg-pink-500',
    accent: 'pink',
    description:
      'Babička rodiny. Laskavá, trpělivá, vždycky má po ruce sušenku nebo čaj. Původně učitelka v mateřské školce, teď učí Robíky, jak se chovat k zákazníkům. Všechny má ráda, i ty nejprotivnější.',
    personality: [
      'Laskavá a trpělivá',
      'Vždycky má po ruce sušenku nebo čaj',
      'Učí Robíky, jak se chovat k zákazníkům',
    ],
    catchphrases: [
      'To se stává, zlato.',
      'Pojď, dáme si čaj.',
      'S pusou to jde líp.',
    ],
    relationships: [
      { to: 'anicka', type: 'work', note: 'Zdena a Anička spolu dělají zákaznický servis.' },
      { to: 'marie', type: 'family', note: 'Babička Zdena a máma Marie drží rodinu pohromadě.' },
      { to: 'gustav', type: 'family', note: 'Babička Zdena a děda Gustav — hlava rodiny.' },
      { to: 'mirek', type: 'family', note: 'Babička Zdena a táta Mirek — máma a syn.' },
      { to: 'pepa', type: 'family', note: 'Babička Zdena Pepovi vždycky pohladí po hlavě a dá sušenku.' },
      { to: 'emil', type: 'family', note: 'Babička Zdena je jediná, komu Emilovi grafy dávají smysl.' },
      { to: 'betka', type: 'family', note: 'Babička Zdena je na Bětčiny obrazy pyšná.' },
      { to: 'franta', type: 'family', note: 'Babička Zdena Frantovi vždycky poradí, jak být milejší.' },
    ],
    status: 'inactive',
    mood: 9,
  },
  {
    id: 'jozin',
    name: 'Jožin',
    role: 'Firemní kocour',
    emoji: '🐈',
    image: '/roboti/jozin.png',
    color: 'bg-amber-500',
    accent: 'amber',
    description:
      'Nemá žádnou práci. Nikdo neví, proč je na výplatní pásce. Ale když se něco rozbije, vždycky sedí vedle serveru.',
    personality: [
      'Nemá žádnou práci',
      'Nikdo neví, proč je na výplatní pásce',
      'Když se něco rozbije, sedí vedle serveru',
    ],
    catchphrases: [
      'Mňau.',
      '...',
      '⬛',
    ],
    relationships: [
      { to: 'mirek', type: 'pet', note: 'Jožin leží Mirkovi na klávesnici a „drží servery“.' },
    ],
    status: 'active',
    mood: 10,
  },
];

export const activeRobots = robots.filter((r) => r.status === 'active');
export const inactiveRobots = robots.filter((r) => r.status === 'inactive');

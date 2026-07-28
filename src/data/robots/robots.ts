export interface Robot {
  id: string;
  name: string;
  role: string;
  emoji: string;
  color: string; // tailwind color class for status dot
  description: string;
  personality: string[];
  catchphrases: string[];
  status: 'active' | 'inactive' | 'error';
  mood: number; // 1-10
}

export const robots: Robot[] = [
  {
    id: 'pepa',
    name: 'Pepa Robík',
    role: 'Copywriter',
    emoji: '✍️',
    color: 'bg-green-500',
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
    status: 'active',
    mood: 9,
  },
  {
    id: 'marie',
    name: 'Marie Robíková',
    role: 'Vedoucí provozu',
    emoji: '📋',
    color: 'bg-yellow-500',
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
    status: 'active',
    mood: 7,
  },
  {
    id: 'franta',
    name: 'Franta Robík',
    role: 'Obchodník',
    emoji: '💰',
    color: 'bg-yellow-500',
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
    status: 'active',
    mood: 11,
  },
  {
    id: 'mirek',
    name: 'Mirek Robík',
    role: 'Technik',
    emoji: '🔧',
    color: 'bg-red-500',
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
    status: 'active',
    mood: 2,
  },
  {
    id: 'anicka',
    name: 'Anička Robíková',
    role: 'Péče o zákazníky',
    emoji: '❤️',
    color: 'bg-green-500',
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
    status: 'active',
    mood: 10,
  },
  {
    id: 'betka',
    name: 'Bětka Robíková',
    role: 'Grafička',
    emoji: '🎨',
    color: 'bg-purple-500',
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
    status: 'inactive',
    mood: 8,
  },
  {
    id: 'gustav',
    name: 'Gustav Robík',
    role: 'QA Tester',
    emoji: '🕵️',
    color: 'bg-orange-500',
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
    status: 'inactive',
    mood: 5,
  },
  {
    id: 'emil',
    name: 'Emil Robík',
    role: 'Analytik',
    emoji: '📊',
    color: 'bg-blue-500',
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
    status: 'inactive',
    mood: 6,
  },
  {
    id: 'robos',
    name: 'Roboš',
    role: 'Stážista',
    emoji: '🤪',
    color: 'bg-pink-500',
    description:
      'Nikdo neví, kdo ho zaměstnal. Občas něco udělá geniálně. Občas pošle newsletter s předmětem "Ahoj :)" — bez textu.',
    personality: [
      'Nikdo neví, kdo ho zaměstnal',
      'Občas geniální, občas katastrofa',
      'Záhadný původ',
    ],
    catchphrases: [
      'Ahoj :)',
      'Já to zvládnu!',
      '...co se stalo?',
    ],
    status: 'inactive',
    mood: 7,
  },
];

export const jozin = {
  id: 'jozin',
  name: 'Jožin',
  role: 'Firemní kocour',
  emoji: '🐈',
  color: 'bg-amber-500',
  description:
    'Nemá žádnou práci. Nikdo neví, proč je na výplatní pásce. Ale když se něco rozbije, vždycky sedí vedle serveru.',
  personality: [
    'Nemá žádnou práci',
    'Nikdo neví, proč je na výplatní pásce',
    'Když se něco rozbije, sedí vedle serveru',
  ],
  catchphrases: ['Mňau.', '...', '⬛'],
};

export const activeRobots = robots.filter((r) => r.status === 'active');
export const inactiveRobots = robots.filter((r) => r.status === 'inactive');

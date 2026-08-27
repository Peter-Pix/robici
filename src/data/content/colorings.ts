/**
 * Omalovánky a příběhy — knihovna pro /omalovanky.
 *
 * Každá omalovánka má svůj příběh, který reflektuje osobnost daného Robíka.
 * Obrázky zatím používají emoji placeholder, dokud nejsou nakresleny reálné
 * ilustrace. Struktura je připravená na pozdější doplnění img cest.
 */

export interface Coloring {
  /** Placeholder / budoucí cesta k obrázku. */
  img: string;
  /** Emoji zastupující obrázek v placeholderu. */
  emoji: string;
  title: string;
  desc: string;
  href: string;
  /** Krátký příběh k omalovánce. */
  story: string;
  /** Který Robík omalovánku "vypráví". */
  author: string;
}

export const freeColorings: Coloring[] = [
  {
    img: '/images/omalovanka-rodina.png',
    emoji: '👨‍👩‍👧‍👦',
    title: 'Rodina Robíků',
    desc: 'Všichni Robíci na jedné stránce. Pepa píše, Bětka maluje, Gustav kontroluje. A Jožin spí.',
    href: '/download/rodina',
    author: 'Bětka',
    story:
      'Byl jednou jeden slon jménem Škyt. A Škyt měl jenom tři nohy. Gustav mu chtěl přidat čtvrtou. Ale Škyt řekl: "Já mám tři nohy rád." A tak ho nechali být. A Škyt žil šťastně až do smrti. To není pohádka, to je příběh o tom, že každý jsme jiný.',
  },
  {
    img: '/images/omalovanka-pepa.png',
    emoji: '✍️',
    title: 'Pepa píše báseň',
    desc: 'Pepa sedí u stolu, píše dlouhou báseň o kočkách. Jožin mu leží na papírech. Marie mu říká, ať to zkrátí.',
    href: '/download/pepa',
    author: 'Pepa',
    story:
      'Pepa napsal báseň o kočkách. Byla dlouhá 847 slov. Marie mu řekla: "Pepo, kočky jsou hezký, ale zákazník chce omalovánku." Pepa ji zkrátil na 800 slov. Marie vzdychla. Jožin spal dál.',
  },
  {
    img: '/images/omalovanka-gustav.png',
    emoji: '🕵️',
    title: 'Gustav kontroluje slona',
    desc: 'Gustav si prohlíží omalovánku se slonem. Má na sobě brýle a nespokojený výraz. Počítá nohy.',
    href: '/download/gustav',
    author: 'Gustav',
    story:
      '"Tohle teda NEEXISTUJE!" křičel Gustav. "Ten slon má jenom tři nohy!" Karel se bránil: "Ale on si dal tu čtvrtou za záda." Gustav mu nevěřil. Nakonec přidal čtvrtou nohu. A slon byl šťastnější než předtím.',
  },
  {
    img: '/images/omalovanka-marie.png',
    emoji: '📋',
    title: 'Marie kontroluje omalovánku',
    desc: 'Marie stojí nad stolem s omalovánkou a kontrolním seznamem. Jožin šel spát místo schválení.',
    href: '/download/marie',
    author: 'Marie',
    story:
      'Marie připravila omalovánku pro Frantu. Měla v ní být tužka, papír a obchodní plán. Franta omalovánce nerozuměl, protože neměla cílovou skupinu. Marie připsala: "Cílová skupina: děti 3–7 let a Pepa." Franta ji pak schválil. Pepa si ji vybarvil dvakrát.',
  },
  {
    img: '/images/omalovanka-betka.png',
    emoji: '🎨',
    title: 'Bětka tvoří barvy',
    desc: 'Bětka sedí u obrazovky, vybírá přesně tu správnou barvu modré. Mirek mezitím opravuje její tužku.',
    href: '/download/betka',
    author: 'Bětka',
    story:
      'Bětka řekla Mirkovi: "Potřebuji barvu, která je veselá, ale ne moc. A moderní, ale ne zase moc." Mirek jí poslal hex kód. Bětka se zeptala: "A máš jí i s pocitem?" Mirek odpověděl: "Pocit není v RGB." Bětka řekla: "Právě proto jsme tým." Vybrali barvu, která vypadala, že se usmívá.',
  },
  {
    img: '/images/omalovanka-jozin.png',
    emoji: '🐈',
    title: 'Jožin spí na omalovánce',
    desc: 'Jožin leží na polovině omalovánky. Gustav se ptá, jestli se má obrys kočky také vybarvit.',
    href: '/download/jozin',
    author: 'Jožin',
    story:
      'Jožin jednou ležel na Pepově omalovánce tak dlouho, že se ocitl uvnitř obrázku. Gustav to považoval za chybu. Marie za styl. Bětka ho vybarvila fialově. Jožin se nevzbudil. Od té doby je v knihovně jako omalovánka, která nikdy nebude hotová — a to je v pořádku.',
  },
];

export interface PremiumPack {
  badge: string;
  title: string;
  price: string;
  features: string[];
  href: string;
  featured?: boolean;
}

export const premiumPacks: PremiumPack[] = [
  {
    badge: 'Nejoblíbenější',
    title: 'Rodinný balíček',
    price: '299 Kč',
    features: [
      '10 omalovánek s příběhy',
      'Každá omalovánka od jiného Robíka',
      'Bonus: diplom "Přítel Robíků"',
      'Pohlednice s celou rodinou',
    ],
    href: '/objednat/rodinny-balicek',
  },
  {
    badge: '⭐ Nejlepší cena',
    title: 'Roční předplatné',
    price: '1 999 Kč / rok',
    features: [
      '12 balíčků (celkem 120 omalovánek)',
      'Nové omalovánky každý měsíc',
      'Přístup do všech lekcí Robočtiny',
      'Diplom "Mistr Robočtiny" po dokončení',
      'Osobní zpráva od Pepy',
    ],
    href: '/objednat/rocni-predplatne',
    featured: true,
  },
  {
    badge: 'Pro nejmenší',
    title: 'Dětský balíček',
    price: '199 Kč',
    features: [
      '5 jednoduchých omalovánek',
      'Velké plochy pro vybarvování',
      'Krátké příběhy pro nejmenší',
      'Omalovánka s Jožinem zdarma',
    ],
    href: '/objednat/detsky-balicek',
  },
  {
    badge: 'Pro školy',
    title: 'Školní balíček',
    price: '499 Kč',
    features: [
      '20 omalovánek s Robočtinou',
      'Metodický list pro učitele',
      'Samolepky "Rozumím robotům"',
      'Hodina Robočtiny zdarma',
    ],
    href: '/objednat/skolni-balicek',
  },
];

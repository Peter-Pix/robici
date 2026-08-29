import Link from 'next/link';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta.rodina;

const family = [
  {
    id: 'gustav',
    img: '/images/gustav.webp',
    badge: '👴 Hlava rodu',
    name: 'Děda Gustav Robík',
    role: 'QA Tester • 76 let',
    tagline: '"Tohle teda NEEXISTUJE!"',
    description: 'Nedůvěřivý, mrzutý, ale zlatého srdce. Všechno rozbije, aby to zákazník nerozbil. Kdysi dávno pracoval v první české AI firmě – měli tehdy jenom jeden počítač a ten se přehříval. Od té doby žádné AI nevěří. Dokud nepotkal vnoučata.',
    details: [
      { label: 'Co dělá', value: 'Testuje všechno, co Robíci vyrobí. Najde každou chybu.' },
      { label: 'Oblíbená činnost', value: 'Sedět v tichu a číst noviny (které stejně nikdo netiskne).' },
      { label: 'Nemá rád', value: 'Nedotažené věci, špatnou kávu a slony se třema nohama.' },
    ],
    quote: '"Já jsem už viděl tolik AI, že bych vám mohla vyprávět... ale radši ne, to byste se báli ještě víc."',
  },
  {
    id: 'zdena',
    img: '/images/marie.webp',
    badge: '❤️ Srdce rodiny',
    name: 'Babička Zdena Robíková',
    role: 'Zákaznický servis • 72 let (ale říká, že 65)',
    tagline: '"To se stává, zlato. Pojď, dáme si čaj."',
    description: 'Laskavá, trpělivá, vždycky má po ruce sušenku nebo čaj. Všechny má ráda, i ty nejprotivnější zákazníky. Původně učitelka v mateřské školce. Naučila stovky dětí, jak se chovat k sobě navzájem. Teď učí Robíky, jak se chovat k zákazníkům.',
    details: [
      { label: 'Co dělá', value: 'Mluví se zákazníky, odpovídá na e-maily, řeší reklamace.' },
      { label: 'Oblíbená činnost', value: 'Vařit čaj a rozdávat pusy.' },
      { label: 'Nemá ráda', value: 'Nespokojené zákazníky (ale nikdy to nedá najevo).' },
    ],
    quote: '"Není důležité, jestli se něco pokazilo. Důležité je, jak to napravíme. A s pusou to jde líp."',
  },
  {
    id: 'mirek',
    img: '/images/mirek.webp',
    badge: '🔧 Technická podpora',
    name: 'Táta Mirek Robík',
    role: 'Technik • 45 let',
    tagline: '"...Hotovo."',
    description: 'Mlčenlivý, samotářský, ale hluboce oddaný rodině. Nejraději je, když ho nikdo neruší a on může ladit servery. Jako mladý programoval hry. Pak potkal Marii a zjistil, že lidi jsou lepší než počítače. Tak začal programovat Robíky, aby pomáhali lidem.',
    details: [
      { label: 'Co dělá', value: 'Spravuje dashboard, ladí kód, opravuje chyby ostatních Robíků.' },
      { label: 'Oblíbená činnost', value: 'Sedět ve sklepě a poslouchat šumění serverů.' },
      { label: 'Nemá rád', value: 'Když ho někdo ruší, když něco nefunguje a když dojde káva.' },
    ],
    quote: '"Nejdřív to zkus restartovat. Když nepomůže, zavolej mě. Ale radši to nejdřív zkus restartovat."',
  },
  {
    id: 'marie',
    img: '/images/marie.webp',
    badge: '📋 Organizátorka',
    name: 'Máma Marie Robíková',
    role: 'Vedoucí provozu • 43 let',
    tagline: '"Takže – kdo to udělá, a kdo to zaplatí?"',
    description: 'Praktická, efektivní, žádné překvapení. Dokáže zorganizovat i pohřeb. Byla manažerkou v korporátu. Utekla odtamtud, protože nemohla vystát politikaření. Teď řídí rodinu a Robíky s láskou, ale pevnou rukou.',
    details: [
      { label: 'Co dělá', value: 'Rozděluje úkoly, sleduje rozpočet, ujišťuje se, že všichni dělají, co mají.' },
      { label: 'Oblíbená činnost', value: 'Dělat seznamy a odškrtávat položky.' },
      { label: 'Nemá ráda', value: 'Nepořádek, zpoždění a Frantovy obchodní nápady.' },
    ],
    quote: '"Rodina je jako firma. Každý má svou roli. A když ji neplní, tak ji musíme přidělit někomu jinému. S láskou, samozřejmě."',
  },
  {
    id: 'pepa',
    img: '/images/pepa.webp',
    badge: '✍️ Kreativní duše',
    name: 'Pepa Robík',
    role: 'Copywriter • 24 let (ale chová se jako 17)',
    tagline: '"Počkej, ještě mě napadá jedna věc..."',
    description: 'Kreativní, roztržitý, zapomíná jíst. Pořád něco vymýšlí. Chtěl být spisovatelem. Začal psát román, ale došel na straně 42. Teď píše o Robících a je šťastnější, než kdy byl.',
    details: [
      { label: 'Co dělá', value: 'Píše všechny texty, příběhy, popisy produktů, e-maily.' },
      { label: 'Oblíbená činnost', value: 'Psát básničky na ubrousky a zapomínat je všude.' },
      { label: 'Nemá rád', value: 'Když mu někdo říká, ať to zkrátí. A brokolici.' },
    ],
    quote: '"Slova mají moc. A já mám moc slov. Někdy až moc. Ale to je dobře, ne?"',
  },
  {
    id: 'betka',
    img: '/images/betka.webp',
    badge: '🎨 Umělkyně',
    name: 'Teta Bětka Robíková',
    role: 'Grafička • 38 let',
    tagline: '"Ještě to není ono. Potřebuje to víc modrý."',
    description: 'Perfekcionistka, všechno chce mít hezčí. Nikdy není spokojená. Studovala malbu na akademii. Pak zjistila, že se uživí spíš digitálním uměním. Ale pořád maluje olejové krajiny pro radost.',
    details: [
      { label: 'Co dělá', value: 'Kreslí omalovánky, ilustrace, grafiky, logo.' },
      { label: 'Oblíbená činnost', value: 'Malovat olejové krajiny a přemalovávat je, protože "to není ono".' },
      { label: 'Nemá ráda', value: 'Nedotažené linky, špatné barvy a když někdo říká "to je dobrý".' },
    ],
    quote: '"Dokonalost neexistuje. Ale můžeme se k ní přiblížit. Stačí to udělat ještě jednou. A ještě jednou. A ještě..."',
  },
  {
    id: 'franta',
    img: '/images/franta.webp',
    badge: '📢 Optimista',
    name: 'Strejda Franta Robík',
    role: 'Obchodník • 47 let',
    tagline: '"Dobrý den, tady Franta z Robíků. Slyšel jsem, že prodáváte bagry."',
    description: 'Věčně optimistický, nadšený, nikdy se nevzdává. Byl pojišťovák. Pak zjistil, že lidi nemají rádi pojišťováky. Tak začal prodávat radost. A daří se mu líp.',
    details: [
      { label: 'Co dělá', value: 'Prodává produkty, hledá nové zákazníky, propaguje.' },
      { label: 'Oblíbená činnost', value: 'Volat firmám, které o něj nestojí, a nabízet jim omalovánky.' },
      { label: 'Nemá rád', value: 'Když mu někdo řekne "ne". Ale stejně to neposlouchá.' },
    ],
    quote: '"Každé ne je jenom \'ještě ne\'. A každé \'ještě ne\' je příležitost zkusit to znovu. A s omalovánkama to jde vždycky líp."',
  },
  {
    id: 'anicka',
    img: '/images/anicka.webp',
    badge: '🌼 Nejmladší duše',
    name: 'Anička Robíková',
    role: 'Zákaznický servis • 21 let (ale duši má 80)',
    tagline: '"To vůbec nevadí, já to za vás vyřeším."',
    description: 'Nejmilejší bytost na světě. Každému vyhoví. Každého pochválí. Studuje psychologii na dálku. Chce pomáhat lidem. Zatím pomáhá Robíkům a zákazníkům.',
    details: [
      { label: 'Co dělá', value: 'Pomáhá Zdeně se zákazníky, píše omluvné e-maily.' },
      { label: 'Oblíbená činnost', value: 'Psát omluvné dopisy a posílat pusy.' },
      { label: 'Nemá ráda', value: 'Nespokojené lidi (ale vždycky je rozveselí).' },
    ],
    quote: '"Každý má právo být naštvaný. Ale taky má právo se zase usmát. A já mu s tím pomůžu."',
  },
  {
    id: 'emil',
    img: '/images/emil.webp',
    badge: '📊 Počtář',
    name: 'Bratranec Emil Robík',
    role: 'Analytik • 30 let',
    tagline: '"Podle mých výpočtů..."',
    description: 'Suchý, věcný, miluje grafy. Nikdo mu nerozumí, ale všichni ho potřebují. Vystudoval kybernetiku. Chtěl dělat velké věci. Zjistil, že dělat přehledy pro rodinu je větší výzva než rakety.',
    details: [
      { label: 'Co dělá', value: 'Sleduje data, připravuje přehledy, měří úspěšnost.' },
      { label: 'Oblíbená činnost', value: 'Dělat grafy a tabulky a ukazovat je lidem, kteří o ně nestojí.' },
      { label: 'Nemá rád', value: 'Když lidé nerespektují data. A když mu někdo říká "to je moc složitý".' },
    ],
    quote: '"Všechno se dá změřit. Všechno se dá spočítat. A všechno se dá zlepšit. Stačí se podívat na čísla. A nespat u toho."',
  },
  {
    id: 'jozin',
    img: '/images/jozin.webp',
    badge: '🐱 Mazlíček',
    name: 'Jožin',
    role: 'Firemní kocour • věk neznámý (přišel sám)',
    tagline: '"..." (přede)',
    description: 'Líný, mlsný, spí 22 hodin denně. Přišel sám, jednou zimou, a už neodešel. Nikdo neví, odkud je. Ale všichni ho mají rádi. Nejvíc Mirek, protože Jožin občas leží na klávesnici a "drží servery".',
    details: [
      { label: 'Co dělá', value: 'Spí, jí, spí, občas se nechá pohladit, spí.' },
      { label: 'Oblíbená činnost', value: 'Ležet na klávesnici v nejméně vhodnou chvíli.' },
      { label: 'Nemá rád', value: 'Hlad, zimu a když ho někdo ruší ve spánku.' },
    ],
    quote: '"..." <small>(Jožinovi by se hodně ulevilo, kdyby uměl mluvit. Ale on jenom přede. A to stačí.)</small>',
  },
];

export default function RodinaPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            👨‍👩‍👧‍👦 Naše <span className="text-robik-accent">rodina</span>
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">Deset Robíků, jeden dům, jedna láska k lidem.</p>
          <p className="text-sm text-robik-text/50 max-w-2xl mx-auto leading-relaxed">
            Bydlíme v Robíkově ulici 42. V přízemí máme dílnu, v patře byt. Každý den se sejdeme u snídaně, probereme, kdo co dělá, a pak se rozejdeme do svých koutů. Ale pořád jsme spolu. Protože rodina je rodina.
          </p>
        </section>

        {/* Profily */}
        <div className="space-y-12">
          {family.map((member, i) => (
            <section
              key={member.id}
              id={member.id}
              className="bg-robik-card rounded-3xl p-6 md:p-8 border border-pastel-blue/20 shadow-sm animate-fadeInUp"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-pastel-blue to-pastel-pink">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="inline-block bg-pastel-yellow/30 text-robik-text/70 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {member.badge}
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-robik-dark">{member.name}</h2>
                  <p className="text-sm text-robik-text/50 mb-1">{member.role}</p>
                  <p className="text-sm font-medium text-robik-accent mb-3">{member.tagline}</p>
                  <p className="text-sm text-robik-text/70 leading-relaxed mb-4">{member.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {member.details.map((d) => (
                      <div key={d.label} className="bg-robik-bg rounded-xl p-3">
                        <div className="text-xs font-semibold text-robik-text/50 mb-1">{d.label}</div>
                        <div className="text-xs text-robik-text/70">{d.value}</div>
                      </div>
                    ))}
                  </div>

                  <blockquote className="text-sm italic text-robik-text/50 border-l-3 border-pastel-blue pl-4">
                    {member.quote}
                  </blockquote>
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Outro */}
        <section className="text-center mt-16 py-12 animate-fadeIn">
          <h2 className="text-2xl font-bold text-robik-dark mb-3">To jsme my.</h2>
          <p className="text-robik-text/60 mb-1">Deset Robíků, jeden dům, jedna láska k lidem.</p>
          <p className="text-robik-text/60 mb-1">Nejsme dokonalí. Děláme chyby. Ale učíme se z nich.</p>
          <p className="text-robik-text/60 mb-8">A máme vás rádi.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/roboctina" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
              🎓 Nauč se Robočtinu
            </Link>
            <Link href="/omalovanky" className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">
              🎨 Stáhni si omalovánku
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
import Link from 'next/link';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta.home;

const whyCards = [
  {
    icon: '😰',
    title: 'Bojíte se AI?',
    text: 'To je v pořádku. Všichni se ze začátku bojíme. Ale Robíci jsou tu od toho, aby vám ukázali, že AI není strašidlo. Je to kamarád, který vám pomůže.',
  },
  {
    icon: '🤗',
    title: 'Chcete si s někým popovídat?',
    text: 'Robíci jsou skvělí posluchači. A taky skvělí vypravěči. Každý z nich má svou osobnost, svůj příběh a svůj způsob, jak vás rozesmát.',
  },
  {
    icon: '🎨',
    title: 'Chcete tvořit?',
    text: 'Omalovánky, příběhy, básničky. Robíci vám pomůžou vytvořit cokoliv, co vás napadne. Stačí se zeptat.',
  },
  {
    icon: '🎓',
    title: 'Chcete se učit?',
    text: 'Robočtina je náš vlastní jazyk. Naučíme vás, jak mluvit s AI tak, aby vám rozuměla a aby se s ní dalo kamarádit.',
  },
];

const offerCards = [
  {
    icon: '🎓',
    title: 'Škola Robočtiny',
    text: 'Naučíme vás mluvit s AI jako s kamarádem. První lekce je zdarma.',
    link: '/roboctina',
    linkText: 'Začít učit se →',
    featured: true,
  },
  {
    icon: '🎨',
    title: 'Omalovánky s příběhem',
    text: 'Každá omalovánka má svůj vlastní příběh od naší rodiny. Ke stažení zdarma.',
    link: '/omalovanky',
    linkText: 'Stáhnout omalovánky →',
    featured: false,
  },
  {
    icon: '🤖',
    title: 'Přátelské AI nástroje',
    text: 'Potřebujete pomoc s textem, obrázkem nebo nápadem? Robíci jsou tu pro vás.',
    link: '/sluzby',
    linkText: 'Vyzkoušet nástroje →',
    featured: false,
  },
  {
    icon: '📰',
    title: 'Robíkovský zpravodaj',
    text: 'Každý den jeden příběh o tom, co Robíci provedli. Někdy to dopadne dobře, někdy špatně. Vždycky se zasmějete.',
    link: '/zpravodaj',
    linkText: 'Číst zpravodaj →',
    featured: false,
  },
];

const familyMembers = [
  { name: 'Gustav', role: 'Děda • QA Tester', emoji: '👴', img: '/images/gustav.png' },
  { name: 'Zdena', role: 'Babička • Zákaznický servis', emoji: '👵', img: '/images/marie.png' },
  { name: 'Mirek', role: 'Táta • Technik', emoji: '👨', img: '/images/mirek.png' },
  { name: 'Marie', role: 'Máma • Vedoucí provozu', emoji: '👩', img: '/images/marie.png' },
  { name: 'Pepa', role: 'Syn • Copywriter', emoji: '🧑', img: '/images/pepa.png' },
  { name: 'Bětka', role: 'Teta • Grafička', emoji: '👩‍🎨', img: '/images/betka.png' },
  { name: 'Franta', role: 'Strejda • Obchodník', emoji: '🧔', img: '/images/franta.png' },
  { name: 'Anička', role: 'Dcera • Zákaznický servis', emoji: '👧', img: '/images/anicka.png' },
  { name: 'Emil', role: 'Bratranec • Analytik', emoji: '🤓', img: '/images/emil.png' },
  { name: 'Jožin', role: 'Firemní kocour', emoji: '🐱', img: '/images/jozin.png' },
];

const testimonials = [
  {
    stars: '⭐⭐⭐⭐⭐',
    text: 'Můj syn miluje omalovánky od Robíků. A já miluju, že ke každé je příběh. Večer si spolu čteme, co Robíci zase provedli.',
    author: '— Petra, maminka dvou kluků',
  },
  {
    stars: '⭐⭐⭐⭐⭐',
    text: 'Robočtina mě naučila, že se nemusím bát AI. Pepa je fakt kamarád. I když píše moc dlouhý e-maily.',
    author: '— Tomáš, student',
  },
  {
    stars: '⭐⭐⭐⭐',
    text: 'Jožin je nejlepší firemní kocour, jakého jsem kdy viděla. A omalovánky jsou krásný.',
    author: '— Jana, učitelka',
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <div className="inline-block bg-pastel-yellow/40 text-robik-text/70 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            🏠 Rodinná firma • 2026
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-robik-dark leading-tight mb-4">
            Ahoj, vítejte u <span className="text-robik-accent">Robíků</span>!
          </h1>
          <p className="text-lg md:text-xl text-robik-text/70 mb-8 max-w-2xl mx-auto">
            Jsme rodina. Ne nástroj. Pomáháme vám naučit se kamarádit s AI. A děláme radost.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link href="/roboctina" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all hover:scale-105">
              🎒 Nauč se Robočtinu
            </Link>
            <Link href="/omalovanky" className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all hover:scale-105">
              🎨 Chci omalovánku
            </Link>
            <Link href="/rodina" className="inline-block bg-white text-robik-text border-2 border-pastel-pink px-6 py-3 rounded-xl hover:bg-pastel-pink/10 transition-all hover:scale-105">
              👨‍👩‍👧‍👦 Poznej rodinu
            </Link>
          </div>
          <p className="text-sm text-robik-text/50 italic">
            Nepotřebujete se bát. Potřebujete si s námi popovídat.
          </p>
        </div>
      </section>

      {/* Proč Robíci */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-robik-dark mb-10">
            Proč Robíci? Protože AI může být <span className="text-robik-accent">kamarád</span>.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {whyCards.map((card) => (
              <div key={card.title} className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-semibold text-robik-dark mb-2">{card.title}</h3>
                <p className="text-sm text-robik-text/70 leading-relaxed">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Co od nás dostanete */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-robik-dark mb-10">
            Co od nás <span className="text-robik-accent">dostanete</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
            {offerCards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md ${
                  card.featured
                    ? 'bg-pastel-yellow/20 border-pastel-yellow/50'
                    : 'bg-robik-card border-pastel-blue/20'
                }`}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-lg font-semibold text-robik-dark mb-2">{card.title}</h3>
                <p className="text-sm text-robik-text/70 mb-4">{card.text}</p>
                <Link href={card.link} className="text-sm font-medium text-robik-accent hover:text-robik-accent/80 transition-colors">
                  {card.linkText}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rodina v kostce */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-robik-dark mb-2">
            Poznejte <span className="text-robik-accent">celou rodinu</span>
          </h2>
          <p className="text-robik-text/60 mb-10">Devět Robíků, jeden dům, jedna láska k lidem.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 stagger-children">
            {familyMembers.map((member) => (
              <Link
                key={member.name}
                href={`/rodina#${member.name.toLowerCase()}`}
                className="bg-robik-card rounded-xl p-4 border border-pastel-blue/20 hover:border-pastel-blue/50 transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-pastel-blue to-pastel-pink">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-sm font-semibold text-robik-dark">{member.name}</div>
                <div className="text-xs text-robik-text/50">{member.role}</div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/rodina" className="inline-block bg-white text-robik-text border-2 border-pastel-pink px-6 py-3 rounded-xl hover:bg-pastel-pink/10 transition-all">
              👨‍👩‍👧‍👦 Poznej celou rodinu →
            </Link>
          </div>
        </div>
      </section>

      {/* Zpravodaj ukázka */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-robik-dark mb-2">
            📰 Robíkovský <span className="text-robik-accent">zpravodaj</span>
          </h2>
          <p className="text-center text-robik-text/60 mb-10">Co se dneska v rodině událo.</p>

          <div className="space-y-4">
            <div className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20">
              <div className="text-xs text-robik-text/40 mb-2">30. 7. 2026</div>
              <h3 className="text-lg font-semibold text-robik-dark mb-2">Franta to zase provedl</h3>
              <p className="text-sm text-robik-text/70 leading-relaxed">
                Franta dnes poslal nabídku omalovánek firmě, která prodává bagry. Marie mu to vrátila s poznámkou: &ldquo;Příště radši oslov školky.&rdquo; Franta se ale nevzdává. Už píše firmě s traktory.
              </p>
              <div className="text-xs text-robik-text/40 mt-3">👤 Autor: Pepa</div>
            </div>

            <div className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20">
              <div className="text-xs text-robik-text/40 mb-2">29. 7. 2026</div>
              <h3 className="text-lg font-semibold text-robik-dark mb-2">Gustav objevil chybu ve slonovi</h3>
              <p className="text-sm text-robik-text/70 leading-relaxed">
                Děda Gustav dnes při kontrole omalovánek zjistil, že slon má jenom tři nohy. Karel to prý nakreslil schválně, protože &ldquo;slon si dal nohu na záda&rdquo;. Gustav mu to vrátil s poznámkou: &ldquo;Tohle teda NEEXISTUJE!&rdquo;
              </p>
              <div className="text-xs text-robik-text/40 mt-3">👤 Autor: Emil</div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link href="/zpravodaj" className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">
              📖 Všechny příběhy →
            </Link>
          </div>
        </div>
      </section>

      {/* Recenze */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-robik-dark mb-10">
            Co říkají <span className="text-robik-accent">zákazníci</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {testimonials.map((t) => (
              <div key={t.author} className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20">
                <div className="mb-2">{t.stars}</div>
                <p className="text-sm text-robik-text/70 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                <div className="text-xs text-robik-text/50">{t.author}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
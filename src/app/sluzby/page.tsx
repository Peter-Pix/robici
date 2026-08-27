import Link from 'next/link';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta.sluzby;

const services = [
  {
    icon: '✍️',
    title: 'Copywriting s Pepou',
    desc: 'Pepa napíše cokoliv. E-maily, články, popisky, básničky. I když to bude dlouhý. Ale bude to hezký.',
    features: ['E-maily pro zákazníky', 'Popisky produktů', 'Básničky na přání', 'Dlouhé milostné dopisy (i když to nepotřebuješ)'],
    href: '/sluzby/copywriting',
    note: 'První 3 e-maily zdarma.',
  },
  {
    icon: '🎨',
    title: 'Grafika s Bětkou',
    desc: 'Bětka nakreslí cokoliv. Omalovánky, loga, ilustrace, plakáty. Všechno bude krásný. A dokonalý. Skoro.',
    features: ['Omalovánky na míru', 'Loga a vizuální identity', 'Ilustrace do článků', 'Plakáty na zeď'],
    href: '/sluzby/grafika',
    note: 'První omalovánka zdarma.',
  },
  {
    icon: '💡',
    title: 'Nápady s Frantou',
    desc: 'Franta má nápad na všechno. Někdy dobrý, někdy špatný. Ale vždycky vás rozesměje.',
    features: ['Nápady na produkty', 'Nápady na marketing', 'Nápady na vylepšení', 'Nápady, které nikdo nečekal (např. omalovánky pro bagrové firmy)'],
    href: '/sluzby/napady',
    note: 'První 3 nápady zdarma. Neslibujeme, že budou dobrý.',
  },
  {
    icon: '🔍',
    title: 'Kontrola s Gustavem',
    desc: 'Gustav zkontroluje cokoliv. Najde každou chybu. I tu, která tam není. Ale to je dobře, protože pak tam žádná není.',
    features: ['Kontrola textů', 'Kontrola obrázků', 'Kontrola nápadů', 'Kontrola kontrol (to je jeho nejoblíbenější)'],
    href: '/sluzby/kontrola',
    note: 'První kontrola zdarma. Gustav slibuje, že bude hodný.',
  },
  {
    icon: '📊',
    title: 'Analýza s Emilem',
    desc: 'Emil vám udělá analýzu vašeho byznysu, webu, nápadů. Bude plná grafů a čísel. Nikomu to nebude rozumět. Ale bude to přesný.',
    features: ['Analýza webu', 'Analýza prodejů', 'Analýza chyb Robíků', '45 grafů (minimálně)'],
    href: '/sluzby/analyza',
    note: 'Cena: 1 499 Kč. Zahrnuje 45 grafů a Emilův úsměv.',
    featured: true,
  },
  {
    icon: '❤️',
    title: 'Zákaznický servis se Zdenou a Aničkou',
    desc: 'Potřebujete někoho, kdo se postará o vaše zákazníky? Zdena a Anička to udělají s láskou. A s pusou.',
    features: ['Odpovídání na e-maily', 'Řešení reklamací', 'Komunikace s nespokojenými zákazníky', 'Posílání pus a sušenek'],
    href: '/sluzby/zakaznicky-servis',
    note: 'První 3 reklamace zdarma. Pusy a sušenky taky.',
  },
];

export default function SluzbyPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            🤖 Služby <span className="text-robik-accent">Robíků</span>
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">
            Pomůžeme vám s tím, co <span className="text-robik-accent font-semibold">potřebujete</span>.
          </p>
          <p className="text-sm text-robik-text/50 max-w-xl mx-auto">
            Robíci jsou tu od toho, aby vám pomohli. S texty, s obrázky, s nápady. A všechno s úsměvem.
          </p>
        </section>

        {/* Služby grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md ${
                service.featured
                  ? 'bg-pastel-yellow/20 border-pastel-yellow/50'
                  : 'bg-robik-card border-pastel-blue/20'
              }`}
            >
              {service.featured && (
                <div className="text-xs font-semibold text-robik-accent mb-2">⭐ Nejoblíbenější</div>
              )}
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold text-robik-dark mb-2">{service.title}</h3>
              <p className="text-sm text-robik-text/60 mb-4">{service.desc}</p>
              <ul className="space-y-1.5 mb-4">
                {service.features.map((f) => (
                  <li key={f} className="text-xs text-robik-text/60 flex items-start gap-2">
                    <span className="text-green-500">✅</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={service.href} className="inline-block bg-robik-accent text-white text-sm font-medium px-4 py-2 rounded-xl hover:bg-robik-accent/90 transition-all">
                Vyzkoušet →
              </Link>
              <p className="text-xs text-robik-text/40 mt-2">{service.note}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-xl font-bold text-robik-dark mb-2">
            Chceš <span className="text-robik-accent">víc</span>?
          </h2>
          <p className="text-sm text-robik-text/60 mb-6">Máme i balíčky služeb. Kombinujeme Robíky tak, aby ti pomohli nejlíp.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/balicky" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
              📦 Zobrazit balíčky
            </Link>
            <Link href="/kontakt" className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">
              📬 Zeptat se
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
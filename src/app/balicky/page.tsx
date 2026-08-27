import Link from 'next/link';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta.balicky;

const packs = [
  {
    title: 'Začátečník',
    price: '999 Kč',
    features: [
      '5 omalovánek na míru (Bětka)',
      '10 e-mailů (Pepa)',
      '3 kontroly (Gustav)',
      'Základní analýza (Emil – jen 5 grafů)',
      'Zákaznický servis (Zdena + Anička)',
    ],
    href: '/objednat/zacatecnik',
  },
  {
    title: 'Profesionál',
    price: '2 499 Kč',
    features: [
      '20 omalovánek na míru (Bětka)',
      '30 e-mailů + 5 článků (Pepa)',
      'Neomezené kontroly (Gustav)',
      'Detailní analýza s 32 grafy (Emil)',
      'Zákaznický servis na míru (Zdena + Anička)',
      'Nápady na produkty (Franta)',
      'Technická podpora (Mirek)',
    ],
    href: '/objednat/profesional',
    featured: true,
  },
  {
    title: 'Rodinný',
    price: '4 999 Kč',
    features: [
      'Vše z Profesionál balíčku',
      'Neomezené konzultace s celou rodinou',
      'Osobní stránka s tvými Robíky',
      'Diplom "Čestný člen rodiny Robíků"',
      'Omalovánka s tvým jménem',
      'Jožin ti pošle pusu (virtuálně)',
    ],
    href: '/objednat/rodinny',
  },
];

export default function BalickyPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            📦 Balíčky služeb <span className="text-robik-accent">Robíků</span>
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">
            Všechno, co potřebuješ, <span className="text-robik-accent font-semibold">na jednom místě</span>.
          </p>
          <p className="text-sm text-robik-text/50 max-w-xl mx-auto">
            Někdy jedna služba nestačí. Potřebuješ text, obrázek, analýzu a zároveň se o tebe někdo postará. Naše balíčky kombinují Robíky tak, aby ti pomohli komplexně.
          </p>
        </section>

        {/* Balíčky grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div
              key={pack.title}
              className={`rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md flex flex-col ${
                pack.featured
                  ? 'bg-pastel-yellow/20 border-pastel-yellow/50 scale-105'
                  : 'bg-robik-card border-pastel-blue/20'
              }`}
            >
              {pack.featured && (
                <div className="text-xs font-semibold text-robik-accent mb-2">⭐ Nejlepší volba</div>
              )}
              <h3 className="text-lg font-bold text-robik-dark mb-1">{pack.title}</h3>
              <div className="text-2xl font-bold text-robik-accent mb-6">{pack.price}</div>
              <ul className="space-y-2 mb-8 flex-1">
                {pack.features.map((f) => (
                  <li key={f} className="text-xs text-robik-text/60 flex items-start gap-2">
                    <span className="text-green-500">✅</span> {f}
                  </li>
                ))}
              </ul>
              <Link href={pack.href} className="block text-center bg-robik-accent text-white font-semibold px-4 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
                Koupit balíček
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <section className="mt-12 bg-robik-card rounded-2xl p-6 border border-pastel-blue/20 text-center">
          <p className="text-sm text-robik-text/60 mb-2">
            Všechny balíčky obsahují neomezenou podporu od Zdeny a Aničky. Pokud nejsi spokojený, vrátíme ti peníze. A ještě ti pošleme omalovánku.
          </p>
          <p className="text-xs text-robik-text/40">
            Jožin do balíčků není zahrnut. Je to kocour, ne služba. Ale můžeš si ho virtuálně pohladit.
          </p>
        </section>
      </div>
    </div>
  );
}
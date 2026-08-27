import Link from 'next/link';
import GenerateColoring from '@/components/GenerateColoring';
import { freeColorings, premiumPacks } from '@/data/content/colorings';

export default function OmalovankyPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            🎨 Omalovánky od <span className="text-robik-accent">Robíků</span>
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">
            S příběhem, který ti vypráví <span className="text-robik-accent font-semibold">rodina</span>.
          </p>
          <p className="text-sm text-robik-text/50 max-w-xl mx-auto">
            Naše omalovánky nejsou jenom černobílé obrázky. Každá má svůj příběh. Vybarvi si je a pošli nám je. Ať se máme na co dívat.
          </p>
        </section>

        {/* Zdarma */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-robik-dark text-center mb-2">
            Omalovánky <span className="text-robik-accent">zdarma</span>
          </h2>
          <p className="text-sm text-robik-text/50 text-center mb-8">Stačí se zaregistrovat a můžeš si je stáhnout.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeColorings.map((item) => (
              <div key={item.title} className="bg-robik-card rounded-2xl p-5 border border-pastel-blue/20">
                <div className="w-full h-40 bg-gradient-to-br from-pastel-blue/30 to-pastel-pink/30 rounded-xl mb-4 flex items-center justify-center text-4xl">
                  {item.emoji}
                </div>
                <h3 className="text-base font-semibold text-robik-dark mb-1">{item.title}</h3>
                <p className="text-xs text-robik-text/60 mb-3">{item.desc}</p>
                <details className="text-xs text-robik-text/50 mb-3">
                  <summary className="cursor-pointer hover:text-robik-accent">📖 Přečíst příběh</summary>
                  <p className="mt-2 leading-relaxed">{item.story}</p>
                </details>
                <Link href={item.href} className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-4 py-2 rounded-xl text-sm hover:bg-pastel-blue/10 transition-all">
                  🎨 Stáhnout zdarma
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* AI Generování */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-robik-dark text-center mb-2">
            🤖 Vygeneruj si vlastní omalovánku
          </h2>
          <p className="text-sm text-robik-text/50 text-center mb-8">
            Vyber Robíka a AI ti nakreslí omalovánku přesně podle něj.
          </p>
          <GenerateColoring />
        </section>

        {/* Premium */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-robik-dark text-center mb-2">
            Balíčky omalovánek <span className="text-robik-accent">pro radost</span>
          </h2>
          <p className="text-sm text-robik-text/50 text-center mb-8">Více omalovánek, více příběhů, více radosti.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {premiumPacks.map((pack) => (
              <div
                key={pack.title}
                className={`rounded-2xl p-6 border shadow-sm transition-all hover:shadow-md ${
                  pack.featured
                    ? 'bg-pastel-yellow/20 border-pastel-yellow/50 scale-105'
                    : 'bg-robik-card border-pastel-blue/20'
                }`}
              >
                <div className="text-xs font-semibold text-robik-accent mb-2">{pack.badge}</div>
                <h3 className="text-lg font-bold text-robik-dark mb-1">{pack.title}</h3>
                <div className="text-2xl font-bold text-robik-accent mb-4">{pack.price}</div>
                <ul className="space-y-2 mb-6">
                  {pack.features.map((f) => (
                    <li key={f} className="text-xs text-robik-text/60 flex items-start gap-2">
                      <span className="text-green-500">✅</span> {f}
                    </li>
                  ))}
                </ul>
                <Link href={pack.href} className="block text-center bg-robik-accent text-white font-semibold px-4 py-2 rounded-xl hover:bg-robik-accent/90 transition-all">
                  🎁 Koupit
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-xl font-bold text-robik-dark mb-2">
            Vyzkoušej naše omalovánky <span className="text-robik-accent">zdarma</span>
          </h2>
          <p className="text-sm text-robik-text/60 mb-6">Stačí se zaregistrovat a první tři omalovánky máš hned.</p>
          <Link href="/registrace" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            🎨 Chci omalovánky
          </Link>
        </section>
      </div>
    </div>
  );
}

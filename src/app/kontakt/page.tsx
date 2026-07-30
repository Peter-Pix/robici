import Link from 'next/link';

export default function KontaktPage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <section className="text-center mb-16 animate-fadeIn">
          <h1 className="text-3xl md:text-4xl font-bold text-robik-dark mb-3">
            📬 Napiš <span className="text-robik-accent">nám</span>
          </h1>
          <p className="text-lg text-robik-text/60 mb-4">
            Robíci se těší na tvou <span className="text-robik-accent font-semibold">zprávu</span>.
          </p>
          <p className="text-sm text-robik-text/50 max-w-xl mx-auto">
            Napiš nám, co se ti líbí, co se ti nelíbí, nebo co bys chtěl od Robíků. Odpovídáme všem. I těm, co nám nadávaj. I těm, co nám posílaj básničky.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-robik-text mb-1">Tvé jméno</label>
                <input type="text" id="name" placeholder="Například: Jana" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 bg-white text-sm outline-none focus:ring-2 focus:ring-robik-accent/50" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-robik-text mb-1">Tvůj e-mail</label>
                <input type="email" id="email" placeholder="jana@email.cz" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 bg-white text-sm outline-none focus:ring-2 focus:ring-robik-accent/50" required />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-robik-text mb-1">Předmět</label>
                <select id="subject" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 bg-white text-sm outline-none focus:ring-2 focus:ring-robik-accent/50">
                  <option value="">Vyber, o čem chceš psát...</option>
                  <option value="chvala">Chvála (máme to rádi)</option>
                  <option value="stiznost">Stížnost (i to bereme)</option>
                  <option value="napad">Nápad (to máme nejradši)</option>
                  <option value="omalovanka">Omalovánka (chci si něco vybarvit)</option>
                  <option value="roboctina">Robočtina (chci se učit)</option>
                  <option value="spoluprace">Spolupráce (chci být Robíkem)</option>
                  <option value="jine">Jiné (to je taky dobrý)</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-robik-text mb-1">Zpráva</label>
                <textarea id="message" rows={5} placeholder="Napiš nám, co tě napadá. Klidně i básničku." className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 bg-white text-sm outline-none focus:ring-2 focus:ring-robik-accent/50 resize-none" required></textarea>
              </div>
              <div className="flex items-start gap-2">
                <input type="checkbox" id="agree" className="mt-1" required />
                <label htmlFor="agree" className="text-xs text-robik-text/60">Souhlasím, že mi Robíci můžou poslat pusu.</label>
              </div>
              <button type="submit" className="w-full bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
                📤 Poslat zprávu
              </button>
              <p className="text-xs text-robik-text/40 text-center">Až nám napíšeš, pošle ti Anička omalovánku. Slibujeme.</p>
            </form>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="bg-robik-card rounded-2xl p-5 border border-pastel-blue/20">
              <h3 className="text-sm font-semibold text-robik-dark mb-2">📧 E-mail</h3>
              <a href="mailto:ahoj@robici.cz" className="text-sm text-robik-accent hover:underline">ahoj@robici.cz</a>
              <p className="text-xs text-robik-text/40 mt-1">Odpovídáme do 24 hodin. Pokud ne, znamená to, že Jožin zase leží na klávesnici.</p>
            </div>
            <div className="bg-robik-card rounded-2xl p-5 border border-pastel-blue/20">
              <h3 className="text-sm font-semibold text-robik-dark mb-2">🏠 Adresa</h3>
              <p className="text-sm text-robik-text/60">Robíkova 42, Robíkov</p>
              <p className="text-xs text-robik-text/40 mt-1">(Ale radši piš e-mailem, pošta nám chodí jednou za týden a Jožin ji občas roztrhá.)</p>
            </div>
            <div className="bg-robik-card rounded-2xl p-5 border border-pastel-blue/20">
              <h3 className="text-sm font-semibold text-robik-dark mb-2">📞 Telefon</h3>
              <p className="text-sm text-robik-text/60">Nemáme.</p>
              <p className="text-xs text-robik-text/40 mt-1">To by nás rušilo od práce. A Jožin by se bál.</p>
            </div>
            <div className="bg-robik-card rounded-2xl p-5 border border-pastel-blue/20">
              <h3 className="text-sm font-semibold text-robik-dark mb-2">📷 Sociální sítě</h3>
              <div className="flex flex-col gap-1">
                <a href="#" className="text-sm text-robik-accent hover:underline">📷 Instagram – Robíci na fotkách</a>
                <a href="#" className="text-sm text-robik-accent hover:underline">📘 Facebook – Robíci mezi lidmi</a>
                <a href="#" className="text-sm text-robik-accent hover:underline">🐦 Twitter – Robíci v kostce</a>
              </div>
              <p className="text-xs text-robik-text/40 mt-1">Sleduj nás. Občas tam něco napíšeme. Většinou to píše Pepa. Takže je to dlouhý.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h2 className="text-xl font-bold text-robik-dark mb-2">
            Napiš <span className="text-robik-accent">Robíkům</span>
          </h2>
          <p className="text-sm text-robik-text/60">Budeme rádi za každou zprávu. I za tu, kde nám nadáváš.</p>
          <p className="text-sm text-robik-text/50 mt-2">Těšíme se na tebe. <br />— Celá rodina Robíků (a Jožin taky)</p>
        </section>
      </div>
    </div>
  );
}

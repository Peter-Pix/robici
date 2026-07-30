import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-robik-dark text-white/80 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-white mb-3">🤖 Robíci s.r.o.</h3>
            <p className="text-sm text-white/60">Rodina, která ti pomáhá kamarádit s AI.</p>
            <p className="text-sm text-white/40 mt-2 italic">
              Nejsme dokonalí. Děláme chyby. Ale učíme se z nich. A máme tě rádi.
            </p>
          </div>

          {/* Navigace */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Navigace</h4>
            <div className="flex flex-col gap-1.5 text-sm text-white/60">
              <Link href="/" className="hover:text-pastel-yellow transition-colors">Domů</Link>
              <Link href="/roboctina" className="hover:text-pastel-yellow transition-colors">Robočtina</Link>
              <Link href="/omalovanky" className="hover:text-pastel-yellow transition-colors">Omalovánky</Link>
              <Link href="/rodina" className="hover:text-pastel-yellow transition-colors">Rodina</Link>
              <Link href="/zpravodaj" className="hover:text-pastel-yellow transition-colors">Zpravodaj</Link>
              <Link href="/sluzby" className="hover:text-pastel-yellow transition-colors">Služby</Link>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Kontakt</h4>
            <div className="flex flex-col gap-1.5 text-sm text-white/60">
              <a href="mailto:ahoj@robici.cz" className="hover:text-pastel-yellow transition-colors">📧 ahoj@robici.cz</a>
              <p>🏠 Robíkova 42, Robíkov</p>
              <p className="text-white/40 text-xs">📞 Telefon nemáme. To by nás rušilo od práce.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
          <p>© 2026 Robíci s.r.o. Všechna práva vyhrazena. A jo, Jožin taky nějaký má.</p>
          <p className="mt-1">Vyrobeno s ❤️ a spoustou kávy. A chybami. Ale ty se učíme.</p>
        </div>
      </div>
    </footer>
  );
}

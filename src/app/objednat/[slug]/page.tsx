import Link from 'next/link';

export default function ObjednatPage({ params }: { params: { slug: string } }) {
  const products: Record<string, { title: string; price: string }> = {
    'rodinny-balicek': { title: 'Rodinný balíček omalovánek', price: '299 Kč' },
    'rocni-predplatne': { title: 'Roční předplatné omalovánek', price: '1 999 Kč / rok' },
    'detsky-balicek': { title: 'Dětský balíček omalovánek', price: '199 Kč' },
    'zacatecnik': { title: 'Balíček Začátečník', price: '999 Kč' },
    'profesional': { title: 'Balíček Profesionál', price: '2 499 Kč' },
    'rodinny': { title: 'Rodinný balíček služeb', price: '4 999 Kč' },
  };

  const product = products[params.slug] || { title: 'Produkt', price: '—' };

  return (
    <div className="py-12 px-4">
      <div className="max-w-md mx-auto text-center animate-fadeIn">
        <div className="text-4xl mb-4">🎁</div>
        <h1 className="text-2xl font-bold text-robik-dark mb-2">{product.title}</h1>
        <p className="text-lg font-bold text-robik-accent mb-6">{product.price}</p>
        <form className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20 space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-robik-text mb-1">Jméno</label>
            <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 text-sm outline-none focus:ring-2 focus:ring-robik-accent/50" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-robik-text mb-1">E-mail</label>
            <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 text-sm outline-none focus:ring-2 focus:ring-robik-accent/50" required />
          </div>
          <button type="submit" className="w-full bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            🛒 Objednat
          </button>
          <p className="text-xs text-robik-text/40 text-center">Po objednávce ti pošleme potvrzení e-mailem. A omalovánku s Jožinem.</p>
        </form>
        <Link href="/omalovanky" className="inline-block text-sm text-robik-accent hover:underline mt-4">← Zpět na omalovánky</Link>
      </div>
    </div>
  );
}

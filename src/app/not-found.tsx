import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center animate-fadeIn">
        <h1 className="text-6xl font-bold text-robik-dark mb-2">🤖 404</h1>
        <h2 className="text-xl font-semibold text-robik-text mb-4">Nenalezeno</h2>
        <p className="text-sm text-robik-text/60 mb-2">Robíci hledali, ale nenašli.</p>
        <p className="text-sm text-robik-text/50 mb-8">Gustav už kontroluje, jestli to není chyba. Jožin leží na klávesnici.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            🏠 Jít domů
          </Link>
          <Link href="/kontakt" className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">
            📬 Napsat Robíkům
          </Link>
        </div>
      </div>
    </div>
  );
}

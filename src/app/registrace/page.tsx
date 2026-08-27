import Link from 'next/link';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta.registrace;

export default function RegistracePage() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-md mx-auto text-center animate-fadeIn">
        <div className="text-4xl mb-4">🤖</div>
        <h1 className="text-2xl font-bold text-robik-dark mb-3">Vítej v rodině Robíků!</h1>
        <p className="text-sm text-robik-text/60 mb-8">Zaregistruj se a získej přístup ke všem omalovánkám a lekcím zdarma.</p>
        <form className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20 space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium text-robik-text mb-1">Tvé jméno</label>
            <input type="text" placeholder="Například: Jana" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 text-sm outline-none focus:ring-2 focus:ring-robik-accent/50" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-robik-text mb-1">Tvůj e-mail</label>
            <input type="email" placeholder="jana@email.cz" className="w-full px-4 py-2.5 rounded-xl border border-pastel-blue/30 text-sm outline-none focus:ring-2 focus:ring-robik-accent/50" required />
          </div>
          <button type="submit" className="w-full bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            🎉 Zaregistrovat se
          </button>
          <p className="text-xs text-robik-text/40 text-center">Registrací souhlasíš, že ti Robíci můžou posílat pusy a omalovánky.</p>
        </form>
        <p className="text-xs text-robik-text/40 mt-4">Už máš účet? <Link href="/prihlaseni" className="text-robik-accent hover:underline">Přihlas se</Link></p>
      </div>
    </div>
  );
}
import RobotsPage from '@/components/RobotsPage';
import ShiftBoard from '@/components/ShiftBoard';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero */}
      <section className="relative py-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
            Robíci s.r.o.
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Malá česká firma,<br />
            kde pracují jen roboti.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            A snaží se, jak nejlíp umí. Občas udělají chybu. Občas se pohádají.
            Ale většinou jsou hrozně hodní.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className="text-2xl">🤖</span>
            <span className="text-2xl">📋</span>
            <span className="text-2xl">💰</span>
            <span className="text-2xl">🔧</span>
            <span className="text-2xl">❤️</span>
            <span className="text-2xl">🐈</span>
          </div>
        </div>
      </section>

      {/* Shift Board */}
      <ShiftBoard />

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Chat */}
      <ChatWidget />

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Robots */}
      <RobotsPage />

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-sm text-gray-400">
        <p>
          Robíci s.r.o. — Veřejný experiment. Ukazujeme, co funguje, co selže a co se cestou naučíme.
        </p>
        <p className="mt-1">
          🐈 Jožin je na výplatní pásce. Nikdo neví proč.
        </p>
      </footer>
    </main>
  );
}

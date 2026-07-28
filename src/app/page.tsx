import Hero from '@/components/Hero';
import RobotsPage from '@/components/RobotsPage';
import ShiftBoard from '@/components/ShiftBoard';
import ChatWidget from '@/components/ChatWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Hero />

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

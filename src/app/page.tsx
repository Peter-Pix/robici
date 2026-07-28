import Hero from '@/components/Hero';
import RobotsPage from '@/components/RobotsPage';
import ShiftBoard from '@/components/ShiftBoard';
import SceneMailRewrite from '@/components/SceneMailRewrite';
import NewsletterSignup from '@/components/NewsletterSignup';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero = živý stream kanceláře */}
      <Hero />

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Shift Board = co se děje teď */}
      <ShiftBoard />

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Scene: Pepa, napiš za mě */}
      <SceneMailRewrite />

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Newsletter = zůstaň v obraze */}
      <NewsletterSignup />

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* Robots = seznamte se s týmem */}
      <RobotsPage />

      {/* Footer */}
      <footer className="py-12 px-4 text-center text-sm text-gray-400">
        <p>
          Robíci — první digitální kancelář, kterou lidi chodí navštěvovat, i když zrovna nic nepotřebují.
        </p>
        <p className="mt-1">
          🐈 Jožin je na výplatní pásce. Nikdo neví proč.
        </p>
      </footer>
    </main>
  );
}

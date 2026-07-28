import Image from 'next/image';
import { activeRobots } from '@/data/robots/robots';

const scenes = [
  {
    status: '🟢',
    robot: 'Pepa',
    action: 'Právě přepisuje mail.',
    detail: 'Zákazník napsal: "Můžete to udělat líp?" Pepa: "Samozřejmě. Mějte krásný den."',
  },
  {
    status: '🟡',
    robot: 'Marie',
    action: 'Našla dvě nejasnosti.',
    detail: 'Franta slíbil dodání do 2 minut. Marie: "Ne." Franta: "Věřil jsem v nás."',
  },
  {
    status: '🔴',
    robot: 'Gustav',
    action: 'Zase něco rozbil.',
    detail: 'Kliknul na tlačítko, který neměl existovat. Existovalo. Teď to řeší Mirek.',
  },
  {
    status: '🟢',
    robot: 'Franta',
    action: 'Rozeslal 34 nabídek.',
    detail: 'Jedna z nich byla do pneuservisu. Na omalovánku. Marie: "Franto..."',
  },
  {
    status: '🟢',
    robot: 'Anička',
    action: 'Omluvila se za déšť.',
    detail: 'Zákazník napsal, že mu zmokl balíček. Anička: "Ježíš, to je mi tak líto!"',
  },
  {
    status: '🔴',
    robot: 'Mirek',
    action: 'Tvrdí, že všechno funguje.',
    detail: 'Ve skutečnosti nic neběží. Windows se aktualizoval.',
  },
  {
    status: '⬛',
    robot: 'Jožin',
    action: 'Sedí vedle serveru.',
    detail: 'Nikdo neví proč. Ale když se něco rozbije, je tam vždycky.',
  },
];

function getRobotImage(name: string) {
  const robot = activeRobots.find(
    (r) => r.name.startsWith(name) || r.name.includes(name)
  );
  return robot?.image ?? '';
}

export default function Hero() {
  // Pick a random scene for this visit
  const scene = scenes[Math.floor(Math.random() * scenes.length)];
  const robotImage = getRobotImage(scene.robot);

  return (
    <section className="relative py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        {/* Live stream header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Dnes v kanceláři
          </span>
        </div>

        {/* Scene card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm mb-12">
          <div className="flex items-start gap-4">
            <div className="relative w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
              {robotImage && (
                <Image
                  src={robotImage}
                  alt={scene.robot}
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{scene.status}</span>
                <span className="font-bold text-gray-900">{scene.robot}</span>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                {scene.action}
              </p>
              <p className="text-gray-500">{scene.detail}</p>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
            Robíci odstraní tu nejnudnější část psaní.
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-6">
            A ještě u toho uvidíš, jak přemýšlí.
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl">✍️</span>
            <span className="text-2xl">📋</span>
            <span className="text-2xl">💰</span>
            <span className="text-2xl">🔧</span>
            <span className="text-2xl">❤️</span>
            <span className="text-2xl">🐈</span>
          </div>
        </div>
      </div>
    </section>
  );
}

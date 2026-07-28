import { robots, activeRobots, inactiveRobots } from '@/data/robots/robots';
import type { Robot } from '@/data/robots/robots';
import Image from 'next/image';

function RobotCard({ robot }: { robot: Robot }) {
  const statusColors = {
    active: 'bg-green-500',
    inactive: 'bg-gray-400',
    error: 'bg-red-500',
  };

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 overflow-hidden">
      {/* Status dot */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <span className={`h-3 w-3 rounded-full ${statusColors[robot.status]}`} />
        <span className="text-xs text-gray-400">
          {robot.status === 'active' ? 'Na směně' : 'Mimo službu'}
        </span>
      </div>

      {/* Image */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <Image
          src={robot.image}
          alt={robot.name}
          width={128}
          height={128}
          className="relative w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform"
        />
      </div>

      {/* Header */}
      <div className="text-center mb-3">
        <h3 className="font-bold text-lg text-gray-900">{robot.name}</h3>
        <p className="text-sm text-gray-500">{robot.role}</p>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        {robot.description}
      </p>

      {/* Catchphrases */}
      <div className="space-y-1.5">
        {robot.catchphrases.map((phrase, i) => (
          <p
            key={i}
            className="text-xs text-gray-400 italic border-l-2 border-gray-200 pl-3 group-hover:border-blue-300 transition-colors"
          >
            „{phrase}"
          </p>
        ))}
      </div>
    </div>
  );
}

export default function RobotsPage() {
  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Seznamte se s týmem</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Malá česká firma, kde pracují jen roboti. Každý má svou roli, svou osobnost a občas i svou chybu.
        </p>
      </div>

      {/* Active robots (včetně Jožina) */}
      <div className="mb-12">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          🟢 Na směně
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRobots.map((robot) => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </div>

      {/* Inactive robots */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          ⏳ Připravují se
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60 hover:opacity-100 transition-opacity">
          {inactiveRobots.map((robot) => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </div>
    </section>
  );
}

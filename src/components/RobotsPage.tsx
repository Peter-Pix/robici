import { robots, jozin, activeRobots, inactiveRobots } from '@/data/robots/robots';
import type { Robot } from '@/data/robots/robots';

function RobotCard({ robot }: { robot: Robot }) {
  const statusColors = {
    active: 'bg-green-500',
    inactive: 'bg-gray-400',
    error: 'bg-red-500',
  };

  return (
    <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
      {/* Status dot */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className={`h-3 w-3 rounded-full ${statusColors[robot.status]}`} />
        <span className="text-xs text-gray-400">
          {robot.status === 'active' ? 'Na směně' : 'Mimo službu'}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{robot.emoji}</span>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{robot.name}</h3>
          <p className="text-sm text-gray-500">{robot.role}</p>
        </div>
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

function JozinCard() {
  return (
    <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl">{jozin.emoji}</span>
        <div>
          <h3 className="font-bold text-lg text-gray-900">{jozin.name}</h3>
          <p className="text-sm text-amber-600">{jozin.role}</p>
        </div>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">{jozin.description}</p>
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

      {/* Active robots */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          🟢 Na směně
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeRobots.map((robot) => (
            <RobotCard key={robot.id} robot={robot} />
          ))}
        </div>
      </div>

      {/* Jožin */}
      <div className="max-w-sm mx-auto mb-8">
        <JozinCard />
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

import { todaysShift } from '@/data/content/shift-data';
import { robots } from '@/data/robots/robots';
import Image from 'next/image';

function getRobot(id: string) {
  return robots.find((r) => r.id === id);
}

const statusConfig = {
  ok: { dot: 'bg-green-500', label: '🟢', text: 'text-green-700' },
  warning: { dot: 'bg-yellow-500', label: '🟡', text: 'text-yellow-700' },
  error: { dot: 'bg-red-500', label: '🔴', text: 'text-red-700' },
};

export default function ShiftBoard() {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold">
          {new Date().toLocaleDateString('cs-CZ', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })}
        </p>
        <h2 className="text-3xl font-bold text-gray-900 mt-1">Dnešní směna</h2>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        {todaysShift.map((entry, i) => {
          const robot = getRobot(entry.robotId);
          const config = statusConfig[entry.status];

          return (
            <div
              key={entry.robotId}
              className={`flex items-start gap-4 p-5 ${
                i < todaysShift.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              {/* Avatar */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={robot?.image ?? ''}
                  alt={robot?.name ?? ''}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
                <span
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white ${config.dot}`}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-semibold text-gray-900">{robot?.name}</span>
                  {entry.metric && (
                    <span className="text-xs text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
                      {entry.metric}
                    </span>
                  )}
                </div>
                <p className="text-gray-800 font-medium">{entry.summary}</p>
                <p className="text-sm text-gray-500 mt-0.5">{entry.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

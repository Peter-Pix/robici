import { chatMessages } from '@/data/content/shift-data';
import { robots } from '@/data/robots/robots';

function getRobot(id: string) {
  return robots.find((r) => r.id === id);
}

export default function ChatWidget() {
  return (
    <section className="py-16 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Interní chat</h2>
        <p className="text-gray-500 mt-1">Co si Robíci píšou, když si myslí, že se nikdo nedívá.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
        <div className="space-y-4">
          {chatMessages.map((msg, i) => {
            const robot = getRobot(msg.robotId);
            const isMarie = msg.robotId === 'marie';

            return (
              <div
                key={i}
                className={`flex gap-3 ${isMarie ? '' : 'ml-4'}`}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{robot?.emoji}</span>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-gray-900">
                      {robot?.name}
                    </span>
                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 bg-white rounded-xl rounded-tl-sm px-3 py-2 shadow-sm border border-gray-100">
                    {msg.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

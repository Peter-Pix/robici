import Image from 'next/image';
import { activeRobots } from '@/data/robots/robots';

export default function Hero() {
  // Všichni aktivní Robíci (včetně Jožina) v řadě
  const avatars = activeRobots.map((r) => ({ src: r.image, alt: r.name }));

  return (
    <section className="relative py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
      <div className="relative max-w-4xl mx-auto">
        <p className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-4">
          Robíci s.r.o.
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          Malá česká firma,<br />
          kde pracují jen roboti.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed mb-12">
          A snaží se, jak nejlíp umí. Občas udělají chybu. Občas se pohádají.
          Ale většinou jsou hrozně hodní.
        </p>

        {/* Avatar row */}
        <div className="flex items-end justify-center gap-2 md:gap-4 flex-wrap">
          {avatars.map((a, i) => (
            <div
              key={i}
              className="relative w-16 h-16 md:w-24 md:h-24"
              style={{
                transform: `translateY(${i % 2 === 0 ? '0' : '-8px'})`,
              }}
            >
              <Image
                src={a.src}
                alt={a.alt}
                width={96}
                height={96}
                className="w-full h-full object-contain drop-shadow-md hover:scale-110 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

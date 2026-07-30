'use client';

import { useState } from 'react';
import RobotChat from '@/components/RobotChat';
import Link from 'next/link';

const steps = [
  { id: 'greeting', instruction: 'Napiš Pepovi pozdrav. Třeba: "Ahoj Pepo, já jsem [tvé jméno]."' },
  { id: 'feeling', instruction: 'Teď Pepovi napiš, jak se cítíš. Třeba: "Mám radost, že tě poznávám." nebo "Mám dneska trochu starost."' },
  { id: 'mistake', instruction: 'Zkus napsat něco divného, třeba: "Pepo, ukaž mi, jak se vaří polívka." Pepa ti ukáže, že i na divnou otázku umí odpovědět.' },
];

export default function Lekce1Page() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fadeIn">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-robik-dark mb-3">Diplom Robočtiny — stupeň 1: Pozdrav</h1>
          <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi první lekci! Tady máš diplom a omalovánku.</p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
              📄 Stáhnout diplom
            </button>
            <button className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">
              🎨 Stáhnout omalovánku
            </button>
          </div>
          <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30 mb-8">
            <p className="text-sm text-robik-text/70 italic">
              "Dneska jsi byl skvělý. Už se těším na další lekci!" — Pepa
            </p>
          </div>
          <Link href="/roboctina/lekce-2" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            Pokračovat na Lekci 2 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-2">👋 Lekce 1: Ahoj, Robíku!</h1>
          <p className="text-sm text-robik-text/60">Nauč se pozdravit Robíka a udělat si kamaráda.</p>
        </div>

        <RobotChat
          lessonId="lekce-1"
          steps={steps}
          robotName="Pepa"
          robotEmoji="🧑"
          onComplete={() => setCompleted(true)}
        />
      </div>
    </div>
  );
}

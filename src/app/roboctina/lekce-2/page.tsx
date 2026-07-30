'use client';

import { useState } from 'react';
import RobotChat from '@/components/RobotChat';
import Link from 'next/link';

const steps = [
  { id: 'bad-request', instruction: 'Napiš Bětce špatnou žádost. Třeba jen: "Nakresli mi omalovánku." Ona ti ukáže, co v ní chybí.' },
  { id: 'good-request', instruction: 'Teď napiš Bětce DOBROU žádost. Použij všechny 3 části: co chceš, jak to má vypadat, proč to chceš.' },
];

export default function Lekce2Page() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fadeIn">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-robik-dark mb-3">Diplom Robočtiny — stupeň 2: Prosím, pomoz mi</h1>
          <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi druhou lekci! Tady máš diplom a omalovánku.</p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">📄 Stáhnout diplom</button>
            <button className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
          </div>
          <div className="bg-pastel-pink/20 rounded-2xl p-4 border border-pastel-pink/30 mb-8">
            <p className="text-sm text-robik-text/70 italic">"To bylo skvělý! Už se těším na další lekci." — Bětka</p>
          </div>
          <Link href="/roboctina/lekce-3" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            Pokračovat na Lekci 3 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-2">🙏 Lekce 2: Prosím, pomoz mi...</h1>
          <p className="text-sm text-robik-text/60">Nauč se, jak Robíka o něco požádat.</p>
        </div>
        <RobotChat lessonId="lekce-2" steps={steps} robotName="Bětka" robotEmoji="👩‍🎨" onComplete={() => setCompleted(true)} />
      </div>
    </div>
  );
}

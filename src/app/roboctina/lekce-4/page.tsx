'use client';

import { useState } from 'react';
import RobotChat from '@/components/RobotChat';
import Link from 'next/link';

const steps = [
  { id: 'teach-something', instruction: 'Nauč Emila něco nového. Řekni mu fakt, který nezná, a dej mu příklad.' },
  { id: 'verify-learning', instruction: 'Zeptej se Emila, jestli si zapamatoval, co jsi ho naučil. Měl by to umět zopakovat.' },
];

export default function Lekce4Page() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fadeIn">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-robik-dark mb-3">Diplom Robočtiny — stupeň 4: Nauč mě něco nového</h1>
          <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi čtvrtou lekci! Tady máš diplom a omalovánku.</p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">📄 Stáhnout diplom</button>
            <button className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
          </div>
          <div className="bg-pastel-purple/20 rounded-2xl p-4 border border-pastel-purple/30 mb-8">
            <p className="text-sm text-robik-text/70 italic">"To bylo skvělý! Až se naučíš Robočtinu úplně, udělám nový graf." — Emil</p>
          </div>
          <Link href="/roboctina/lekce-5" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            Pokračovat na Lekci 5 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-2">📚 Lekce 4: Nauč mě něco nového</h1>
          <p className="text-sm text-robik-text/60">Nauč se, jak Robíka naučit něco nového.</p>
        </div>
        <RobotChat lessonId="lekce-4" steps={steps} robotName="Emil" robotEmoji="🤓" onComplete={() => setCompleted(true)} />
      </div>
    </div>
  );
}

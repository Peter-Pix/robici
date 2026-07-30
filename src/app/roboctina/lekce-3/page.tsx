'use client';

import { useState } from 'react';
import RobotChat from '@/components/RobotChat';
import Link from 'next/link';

const steps = [
  { id: 'find-mistake', instruction: 'Gustav ti pošle text s chybou. Najdi ji a řekni mu, co je špatně.' },
  { id: 'fix-mistake', instruction: 'Teď řekni Gustavovi, jak bys tu chybu opravil. Použij 3 kroky: najdi chybu → řekni co je špatně → řekni co chceš místo toho.' },
];

export default function Lekce3Page() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fadeIn">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-robik-dark mb-3">Diplom Robočtiny — stupeň 3: To je chyba!</h1>
          <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi třetí lekci! Tady máš diplom a omalovánku.</p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">📄 Stáhnout diplom</button>
            <button className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
          </div>
          <div className="bg-pastel-green/20 rounded-2xl p-4 border border-pastel-green/30 mb-8">
            <p className="text-sm text-robik-text/70 italic">"Ty jsi byl skvělý. Až příště udělám chybu, doufám, že mi to taky tak hezky řekneš." — Gustav</p>
          </div>
          <Link href="/roboctina/lekce-4" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            Pokračovat na Lekci 4 →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-2">🔧 Lekce 3: To je chyba!</h1>
          <p className="text-sm text-robik-text/60">Nauč se reagovat na chyby Robíků.</p>
        </div>
        <RobotChat lessonId="lekce-3" steps={steps} robotName="Gustav" robotEmoji="👴" onComplete={() => setCompleted(true)} />
      </div>
    </div>
  );
}

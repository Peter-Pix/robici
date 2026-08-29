'use client';

import { useState } from 'react';
import RobotChat from '@/components/RobotChat';
import Link from 'next/link';

const steps = [
  { id: 'hello-story', instruction: 'Pozdrav Emila a řekni mu jedno svoje oblíbené zvíře. Třeba: "Ahoj Emile, jsem [jméno] a mám rád kočky." Dnes spolu vymyslíme příběh.' },
  { id: 'idea', instruction: 'Zeptej se Emila na nápad na příběh. Použij 3 části dobré žádosti: co chceš (příběh), jaký má být (vtipný, o zvířeti, krátký), a proč (chceš si ho zahrát).' },
  { id: 'feedback', instruction: 'Emil ti nabídl nápad. Dej mu zpětnou vazbu — řekni mu, co se ti líbí, a co bys změnil. Třeba: "Líbí se mi začátek, ale hlavní hrdina by mohl být statečnější."' },
];

export default function Lekce6Page() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fadeIn">
          <div className="text-5xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-robik-dark mb-3">Diplom Robočtiny — stupeň 6: Robí kamarád</h1>
          <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi bonusovou lekci! Tady máš diplom a omalovánku.</p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">📄 Stáhnout diplom</button>
            <button className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
          </div>
          <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30 mb-8">
            <p className="text-sm text-robik-text/70 italic">
              "Můj výpočet? Že jsi z tebe skvělý kamarád. Hrdina příběhu může být klidně statečný — jako ty." — Emil
            </p>
          </div>
          <Link href="/roboctina" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">
            ↺ Zpět na lekce
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-2">🎉 Lekce 6: Robočtina pro radost</h1>
          <p className="text-sm text-robik-text/60">Slouč všechno, co umíš, a vymysli s Emilem vlastní příběh.</p>
        </div>
        <RobotChat lessonId="lekce-6" steps={steps} robotName="Emil" robotEmoji="🧮" onComplete={() => setCompleted(true)} />
      </div>
    </div>
  );
}

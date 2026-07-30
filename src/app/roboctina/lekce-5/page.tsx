'use client';

import { useState } from 'react';
import RobotChat from '@/components/RobotChat';
import Link from 'next/link';

const steps = [
  { id: 'professional-request', instruction: 'Napiš Marii profesionální žádost. Představ si, že jsi v práci a potřebuješ analýzu prodejů.' },
  { id: 'thank-you', instruction: 'Marie ti teď udělá skvělou práci. Poděkuj jí.' },
];

export default function Lekce5Page() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="py-12 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fadeIn">
          <div className="text-5xl mb-4">🏆</div>
          <h1 className="text-2xl font-bold text-robik-dark mb-3">Diplom Robočtiny — stupeň 5: Mistr Robočtiny</h1>
          <p className="text-sm text-robik-text/60 mb-6">Zvládl jsi všech pět lekcí! Jsi oficiálně Mistr Robočtiny!</p>
          <div className="flex justify-center gap-3 mb-8">
            <button className="bg-robik-accent text-white px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">📄 Stáhnout certifikát</button>
            <button className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
          </div>
          <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30 mb-8">
            <p className="text-sm text-robik-text/70 italic">"Gratulujeme! Jsi Mistr Robočtiny. Teď už umíš mluvit s Robíky jako s kamarády." — Celá rodina Robíků</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/" className="bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">🏠 Jít domů</Link>
            <Link href="/omalovanky" className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Omalovánky</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-2">💼 Lekce 5: Robočtina pro firmy</h1>
          <p className="text-sm text-robik-text/60">Nauč se používat Robočtinu v profesionálním prostředí.</p>
        </div>
        <RobotChat lessonId="lekce-5" steps={steps} robotName="Marie" robotEmoji="👩" onComplete={() => setCompleted(true)} />
      </div>
    </div>
  );
}

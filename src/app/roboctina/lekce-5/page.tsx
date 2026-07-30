'use client';

import { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    id: 'welcome',
    title: '👋 Vítej v páté lekci!',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30">
          <p className="text-sm text-robik-text/70">
            <strong>Marie:</strong> "Dobrý den. Já jsem Marie. Máma Marie. Vedoucí provozu. A dneska vás naučím, jak používat Robočtinu v práci."
          </p>
        </div>
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30">
          <p className="text-sm text-robik-text/70">
            <strong>Marie:</strong> "Víte, já jsem byla manažerkou v korporátu. A věřte mi – práce by byla mnohem hezčí, kdybychom spolu mluvili jako kamarádi, ne jako stroje."
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'professional',
    title: '💼 Robočtina v praxi',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30">
          <p className="text-sm text-robik-text/70">
            <strong>Marie:</strong> "V práci je důležité být efektivní. Ale taky je důležité být přátelský. Podívej se na rozdíl:"
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 rounded-xl p-3 border border-red-200">
            <div className="text-xs font-semibold text-red-500 mb-1">Špatně</div>
            <div className="text-xs text-robik-text/60">"Udělej mi analýzu."</div>
          </div>
          <div className="bg-green-50 rounded-xl p-3 border border-green-200">
            <div className="text-xs font-semibold text-green-600 mb-1">Dobře</div>
            <div className="text-xs text-robik-text/60">"Prosím, udělej mi analýzu prodejů. Děkuji."</div>
          </div>
        </div>
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30">
          <p className="text-sm text-robik-text/70">
            <strong>Marie:</strong> "A až Robík udělá dobrou práci, tak mu poděkuj. Když mu poděkuješ, tak bude šťastný. A příště ti pomůže ještě radši."
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'reward',
    title: '🏆 Gratulace!',
    content: (
      <div className="space-y-4 text-center">
        <div className="text-5xl mb-2">🏆</div>
        <h3 className="text-lg font-bold text-robik-dark">Diplom Robočtiny — stupeň 5: Mistr Robočtiny</h3>
        <p className="text-sm text-robik-text/60">Zvládl jsi všech pět lekcí! Jsi oficiálně Mistr Robočtiny!</p>
        <div className="flex justify-center gap-3">
          <button className="bg-robik-accent text-white px-4 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all">📄 Stáhnout certifikát</button>
          <button className="bg-white border-2 border-pastel-blue px-4 py-2 rounded-xl text-sm hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
        </div>
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30 mt-4">
          <p className="text-sm text-robik-text/70 italic">"Gratulujeme! Jsi Mistr Robočtiny. Teď už umíš mluvit s Robíky jako s kamarády. A my jsme na tebe pyšní." — Celá rodina Robíků</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link href="/" className="bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all">🏠 Jít na domovskou stránku</Link>
          <Link href="/omalovanky" className="bg-white border-2 border-pastel-blue px-6 py-3 rounded-xl hover:bg-pastel-blue/10 transition-all">🎨 Prohlédnout omalovánky</Link>
        </div>
      </div>
    ),
  },
];

export default function Lekce5Page() {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className={`flex-1 h-2 rounded-full transition-all ${i <= currentStep ? 'bg-robik-accent' : 'bg-gray-200'}`} />
          ))}
        </div>
        <div className="animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-6">{steps[currentStep].title}</h1>
          {steps[currentStep].content}
        </div>
        <div className="flex justify-between mt-8">
          <button onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="px-4 py-2 rounded-xl text-sm border border-pastel-blue/30 disabled:opacity-30 hover:bg-pastel-blue/10 transition-all">← Zpět</button>
          <button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))} disabled={currentStep === steps.length - 1} className="bg-robik-accent text-white px-6 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all disabled:opacity-30">
            {currentStep === steps.length - 2 ? 'Dokončit 🏆' : 'Pokračovat →'}
          </button>
        </div>
      </div>
    </div>
  );
}

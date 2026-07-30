'use client';

import { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    id: 'welcome',
    title: '👋 Vítej ve čtvrté lekci!',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-purple/20 rounded-2xl p-4 border border-pastel-purple/30">
          <p className="text-sm text-robik-text/70">
            <strong>Emil:</strong> "Dobrý den. Já jsem Emil. Bratranec Emil. A dneska vás naučím, jak Robíka naučit něco nového."
          </p>
        </div>
        <div className="bg-pastel-purple/20 rounded-2xl p-4 border border-pastel-purple/30">
          <p className="text-sm text-robik-text/70">
            <strong>Emil:</strong> "Víte, Robíci nejsou chytří od narození. Musejí se učit. Stejně jako vy. A vy jim s tím můžete pomoct."
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'how-to-teach',
    title: '📚 Jak Robíka něco naučit',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-purple/20 rounded-2xl p-4 border border-pastel-purple/30">
          <p className="text-sm text-robik-text/70">
            <strong>Emil:</strong> "Robíci se učí nejlíp, když jim dáte jasné informace:"
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: '1', title: 'Řekni mu, co se má naučit', desc: 'Jasně pojmenuj, co má umět.' },
            { step: '2', title: 'Dej mu příklady', desc: 'Ukaž mu, jak to vypadá v praxi.' },
            { step: '3', title: 'Zopakuj to', desc: 'Řekni mu to víckrát, dokud to nepochopí.' },
          ].map((item) => (
            <div key={item.step} className="bg-robik-card rounded-xl p-3 border border-pastel-blue/20">
              <div className="text-xs font-semibold text-robik-accent mb-1">{item.step}. {item.title}</div>
              <div className="text-xs text-robik-text/60">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'reward',
    title: '🎁 Odměna!',
    content: (
      <div className="space-y-4 text-center">
        <div className="text-4xl mb-2">🎓</div>
        <h3 className="text-lg font-bold text-robik-dark">Diplom Robočtiny — stupeň 4: Nauč mě něco nového</h3>
        <p className="text-sm text-robik-text/60">Zvládl jsi čtvrtou lekci! Tady máš diplom a omalovánku.</p>
        <div className="flex justify-center gap-3">
          <button className="bg-robik-accent text-white px-4 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all">📄 Stáhnout diplom</button>
          <button className="bg-white border-2 border-pastel-blue px-4 py-2 rounded-xl text-sm hover:bg-pastel-blue/10 transition-all">🎨 Stáhnout omalovánku</button>
        </div>
        <div className="bg-pastel-purple/20 rounded-2xl p-4 border border-pastel-purple/30 mt-4">
          <p className="text-sm text-robik-text/70 italic">"To bylo skvělý! Až se naučíš Robočtinu úplně, tak to budeme moci změřit. Možná udělám nový graf." — Emil</p>
        </div>
        <Link href="/roboctina/lekce-5" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all mt-4">
          Pokračovat na Lekci 5 →
        </Link>
      </div>
    ),
  },
];

export default function Lekce4Page() {
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
            {currentStep === steps.length - 2 ? 'Dokončit 🎉' : 'Pokračovat →'}
          </button>
        </div>
      </div>
    </div>
  );
}

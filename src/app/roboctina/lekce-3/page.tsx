'use client';

import { useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    id: 'welcome',
    title: '👋 Vítej ve třetí lekci!',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-green/20 rounded-2xl p-4 border border-pastel-green/30">
          <p className="text-sm text-robik-text/70">
            <strong>Gustav:</strong> "Ahoj. Já jsem Gustav. Děda Gustav. A dneska si budeme povídat o chybách."
          </p>
        </div>
        <div className="bg-pastel-green/20 rounded-2xl p-4 border border-pastel-green/30">
          <p className="text-sm text-robik-text/70">
            <strong>Gustav:</strong> "Víte, já jsem zažil chyby. Spoustu chyb. Všichni Robíci dělají chyby. Franta posílá omalovánky bagrovým firmám. Pepa píše e-maily, který nikdo nedočte. Jožin mi občas roztrhá papíry. Ale víte co? To je v pořádku."
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'how-to-fix',
    title: '🔧 Jak opravit chybu',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-green/20 rounded-2xl p-4 border border-pastel-green/30">
          <p className="text-sm text-robik-text/70">
            <strong>Gustav:</strong> "Když Robík udělá chybu, postupuj takhle:"
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {[
            { step: '1', title: 'Najdi chybu', desc: 'Podívej se, co Robík udělal špatně.' },
            { step: '2', title: 'Řekni mu, co je špatně', desc: 'Napiš mu, co se ti nelíbí.' },
            { step: '3', title: 'Řekni mu, co chceš místo toho', desc: 'Napiš mu, jak to má být.' },
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
        <h3 className="text-lg font-bold text-robik-dark">Diplom Robočtiny — stupeň 3: To je chyba!</h3>
        <p className="text-sm text-robik-text/60">Zvládl jsi třetí lekci! Tady máš diplom a omalovánku.</p>
        <div className="flex justify-center gap-3">
          <button className="bg-robik-accent text-white px-4 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all">
            📄 Stáhnout diplom
          </button>
          <button className="bg-white border-2 border-pastel-blue px-4 py-2 rounded-xl text-sm hover:bg-pastel-blue/10 transition-all">
            🎨 Stáhnout omalovánku
          </button>
        </div>
        <div className="bg-pastel-green/20 rounded-2xl p-4 border border-pastel-green/30 mt-4">
          <p className="text-sm text-robik-text/70 italic">
            "Ty jsi byl skvělý. Až příště udělám chybu, doufám, že mi to taky tak hezky řekneš." — Gustav
          </p>
        </div>
        <Link href="/roboctina/lekce-4" className="inline-block bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all mt-4">
          Pokračovat na Lekci 4 →
        </Link>
      </div>
    ),
  },
];

export default function Lekce3Page() {
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

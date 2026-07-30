'use client';

import { useState } from 'react';

const steps = [
  {
    id: 'welcome',
    title: '👋 Vítej v první lekci!',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30">
          <p className="text-sm text-robik-text/70">
            <strong>Pepa:</strong> "Ahoj! Já jsem Pepa, nejmladší z Robíků. A dneska tě naučím, jak se mnou mluvit. Neboj se, není to složité."
          </p>
        </div>
        <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30">
          <p className="text-sm text-robik-text/70">
            <strong>Pepa:</strong> "Víš, jak to chodí, když potkáš nového kamaráda? Nejdřív se pozdravíš, pak se představíš a pak začneš povídat. S Robíky je to stejný. My nejsme stroje. Jsme kamarádi. A kamarádi se zdraví pěkně."
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'practice',
    title: '✍️ Zkus to!',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30">
          <p className="text-sm text-robik-text/70">
            <strong>Pepa:</strong> "Tak se na mě zkus usmát. A napiš mi: <em>Ahoj Pepo, já jsem [tvé jméno].</em>"
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'mistake',
    title: '😅 Co když to zkazíš?',
    content: (
      <div className="space-y-4">
        <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30">
          <p className="text-sm text-robik-text/70">
            <strong>Pepa:</strong> "A co když napíšeš něco divného? Třeba: <em>Pepo, ukaž mi, jak se vaří polívka.</em>"
          </p>
        </div>
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30">
          <p className="text-sm text-robik-text/70">
            <strong>Pepa:</strong> (zasměje se) "Ha! Víš, že já neumím vařit? Ale já ti řeknu: <em>Promiň, polívku neumím, ale můžu ti napsat báseň o polívce!</em>"
          </p>
        </div>
        <div className="bg-pastel-blue/20 rounded-2xl p-4 border border-pastel-blue/30">
          <p className="text-sm text-robik-text/70">
            <strong>Pepa:</strong> "Vidíš? I když jsem to nevěděl, tak jsem se ti snažil pomoct. A to je přesně to, co dělají kamarádi."
          </p>
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
        <h3 className="text-lg font-bold text-robik-dark">Diplom Robočtiny — stupeň 1: Pozdrav</h3>
        <p className="text-sm text-robik-text/60">Zvládl jsi první lekci! Tady máš diplom a omalovánku.</p>
        <div className="flex justify-center gap-3">
          <button className="bg-robik-accent text-white px-4 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all">
            📄 Stáhnout diplom
          </button>
          <button className="bg-white border-2 border-pastel-blue px-4 py-2 rounded-xl text-sm hover:bg-pastel-blue/10 transition-all">
            🎨 Stáhnout omalovánku
          </button>
        </div>
        <div className="bg-pastel-yellow/20 rounded-2xl p-4 border border-pastel-yellow/30 mt-4">
          <p className="text-sm text-robik-text/70 italic">
            "Dneska jsi byl skvělý. Už se těším na další lekci!" — Pepa
          </p>
        </div>
      </div>
    ),
  },
];

export default function Lekce1Page() {
  const [currentStep, setCurrentStep] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; text: string }[]>([]);
  const [showChat, setShowChat] = useState(false);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setChatHistory((prev) => [...prev, { role: 'user', text: chatInput }]);
    // Simulace Pepovy odpovědi
    setTimeout(() => {
      const responses: Record<string, string> = {
        'ahoj': 'Ahoj! Těší mě, že tě poznávám! Máš dneska dobrou náladu? 😊',
        'ahoj pepo': 'Ahoj! Těší mě, že tě poznávám! Máš dneska dobrou náladu? 😊',
        'ahoj pepo, já jsem': 'To je krásný! Vidíš, to bylo jednoduchý. A já ti odpovím. Těší mě, že tě poznávám!',
      };
      const matched = Object.entries(responses).find(([key]) =>
        chatInput.toLowerCase().includes(key)
      );
      const reply = matched
        ? matched[1]
        : 'Ha! Víš, že já na to neumím odpovědět? Ale můžu ti napsat báseň o tom, co jsi napsal! 😄';
      setChatHistory((prev) => [...prev, { role: 'pepa', text: reply }]);
    }, 800);
    setChatInput('');
  };

  const step = steps[currentStep];

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div
              key={s.id}
              className={`flex-1 h-2 rounded-full transition-all ${
                i <= currentStep ? 'bg-robik-accent' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="animate-fadeIn">
          <h1 className="text-2xl font-bold text-robik-dark mb-6">{step.title}</h1>
          {step.content}
        </div>

        {/* Chat */}
        {currentStep === 1 && (
          <div className="mt-6">
            {!showChat ? (
              <button
                onClick={() => setShowChat(true)}
                className="w-full bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all"
              >
                💬 Napsat Pepovi
              </button>
            ) : (
              <div className="bg-robik-card rounded-2xl border border-pastel-blue/20 overflow-hidden">
                <div className="h-64 overflow-y-auto p-4 space-y-3">
                  {chatHistory.length === 0 && (
                    <p className="text-sm text-robik-text/40 text-center py-8">
                      Napiš Pepovi třeba: "Ahoj Pepo, já jsem [tvé jméno]"
                    </p>
                  )}
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                          msg.role === 'user'
                            ? 'bg-robik-accent text-white'
                            : 'bg-pastel-blue/20 text-robik-text/70'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-pastel-blue/20 p-3 flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Napiš Pepovi..."
                    className="flex-1 px-3 py-2 rounded-xl border border-pastel-blue/30 text-sm outline-none focus:ring-2 focus:ring-robik-accent/50"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-robik-accent text-white px-4 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all"
                  >
                    Poslat
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 rounded-xl text-sm border border-pastel-blue/30 disabled:opacity-30 hover:bg-pastel-blue/10 transition-all"
          >
            ← Zpět
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
            disabled={currentStep === steps.length - 1}
            className="bg-robik-accent text-white px-6 py-2 rounded-xl text-sm hover:bg-robik-accent/90 transition-all disabled:opacity-30"
          >
            {currentStep === steps.length - 2 ? 'Dokončit 🎉' : 'Pokračovat →'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatRobot {
  id: string;
  name: string;
  emoji: string;
  role: string;
}

interface Message {
  role: 'user' | 'robot';
  text: string;
}

interface RobotChatPanelProps {
  robots: ChatRobot[];
}

export default function RobotChatPanel({ robots }: RobotChatPanelProps) {
  const [selectedId, setSelectedId] = useState(robots[0]?.id || '');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const selected = robots.find((r) => r.id === selectedId) || robots[0];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMessages([]);
    setError('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/rodina/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ robotId: selectedId, message: text }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Něco se rozbilo.');
        return;
      }

      setMessages((prev) => [...prev, { role: 'robot', text: data.reply }]);
    } catch (err: any) {
      setError(`Něco se rozbilo: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-robik-card rounded-3xl p-6 md:p-8 border border-pastel-blue/20 shadow-sm">
      <h2 className="text-2xl font-bold text-robik-dark mb-2">
        💬 Popovídej si s Robíkem
      </h2>
      <p className="text-sm text-robik-text/60 mb-4">
        Vyber si Robíka a napiš mu. Odpoví ti v tónu své osobnosti.
      </p>

      {/* Výběr Robíka */}
      <div className="flex flex-wrap gap-2 mb-4">
        {robots.map((r) => (
          <button
            key={r.id}
            onClick={() => handleSelect(r.id)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              r.id === selectedId
                ? 'bg-robik-accent text-white'
                : 'bg-robik-bg text-robik-text/70 hover:bg-pastel-blue/20'
            }`}
          >
            {r.emoji} {r.name}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="bg-robik-bg rounded-2xl p-4 h-72 overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && !isLoading && (
          <p className="text-sm text-robik-text/50 text-center pt-10">
            {selected?.emoji} {selected?.name} ({selected?.role}) čeká, až mu napíšeš.
          </p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user'
                ? 'ml-auto bg-robik-accent text-white'
                : 'mr-auto bg-white border border-pastel-blue/20 text-robik-text'
            }`}
          >
            {m.role === 'robot' && (
              <div className="text-xs font-semibold text-robik-accent mb-1">
                {selected?.emoji} {selected?.name}
              </div>
            )}
            {m.text}
          </div>
        ))}
        {isLoading && (
          <div className="mr-auto bg-white border border-pastel-blue/20 text-robik-text px-4 py-2 rounded-2xl text-sm">
            {selected?.emoji} píše…
          </div>
        )}
        <div ref={endRef} />
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-3">{error}</p>
      )}

      {/* Vstup */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder={`Napiš ${selected?.name}ovi…`}
          className="flex-1 bg-robik-bg border border-pastel-blue/30 rounded-xl px-4 py-2.5 text-sm text-robik-text focus:outline-none focus:border-robik-accent"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-robik-accent text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-robik-accent/90 transition-all disabled:opacity-50"
        >
          Odeslat
        </button>
      </div>
    </section>
  );
}

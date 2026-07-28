'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { activeRobots } from '@/data/robots/robots';

interface Step {
  robik: string;
  emoji: string;
  akce: string;
  text: string;
  timestamp: string;
  duration: number;
}

interface SceneResult {
  input: string;
  steps: Step[];
  totalDuration: number;
}

const robotImages: Record<string, string> = {};
activeRobots.forEach((r) => {
  const name = r.name.split(' ')[0];
  robotImages[name] = r.image;
});

export default function SceneMailRewrite() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SceneResult | null>(null);
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [error, setError] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  // Animace kroků
  useEffect(() => {
    if (!result) return;
    if (visibleSteps < result.steps.length) {
      const timer = setTimeout(() => {
        setVisibleSteps((v) => v + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [result, visibleSteps]);

  // Auto-scroll
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [visibleSteps]);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    setVisibleSteps(0);

    try {
      const res = await fetch('/api/scene/mail-rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Něco se rozbilo');
      }

      const data: SceneResult = await res.json();
      setResult(data);
      // První krok se zobrazí hned
      setVisibleSteps(1);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Pepo, napiš za mě
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ✍️ Pošli Pepovi text a on ho přepíše
        </h2>
        <p className="text-gray-500 mb-8">
          Pepa napíše 3 varianty. Marie zkontroluje. Franta přidá sales šmrnc.
          A ty uvidíš celý proces.
        </p>

        {/* Input */}
        <div className="flex gap-3 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Napiš, co potřebuješ přepsat..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            disabled={loading}
            maxLength={1000}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="px-6 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Pepa píše...' : 'Pošli Pepovi'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Loading state */}
        {loading && !result && (
          <div className="mb-8 p-8 rounded-2xl border border-gray-200 bg-white text-center">
            <div className="animate-pulse space-y-4">
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl">✍️</span>
                <span className="text-gray-500">Pepa přemýšlí...</span>
              </div>
              <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto" />
              <div className="h-2 bg-gray-200 rounded w-1/2 mx-auto" />
            </div>
          </div>
        )}

        {/* Scene log */}
        {result && (
          <div
            ref={logRef}
            className="mb-8 space-y-4 max-h-[600px] overflow-y-auto pr-2"
          >
            {/* User input */}
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">👤</span>
                <span className="font-semibold text-gray-900 text-sm">Ty</span>
              </div>
              <p className="text-gray-700">{result.input}</p>
            </div>

            {/* Steps */}
            {result.steps.slice(0, visibleSteps).map((step, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-gray-200 bg-white animate-fadeIn"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-10 h-10 flex-shrink-0">
                    {robotImages[step.robik] && (
                      <Image
                        src={robotImages[step.robik]}
                        alt={step.robik}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-900">
                        {step.emoji} {step.robik}
                      </span>
                      <span className="text-xs text-gray-400">
                        ⏱ {step.duration.toFixed(1)}s
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{step.akce}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {step.text}
                </div>
              </div>
            ))}

            {/* Loading indicator for next step */}
            {visibleSteps < result.steps.length && (
              <div className="p-4 rounded-2xl border border-gray-200 bg-gray-50 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="h-2 bg-gray-200 rounded w-48" />
                  </div>
                </div>
              </div>
            )}

            {/* Final summary */}
            {visibleSteps >= result.steps.length && (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">✅</span>
                  <span className="font-semibold text-gray-900 text-sm">
                    Hotovo
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Celkem ⏱ {result.totalDuration.toFixed(1)}s •{' '}
                  {result.steps.length} kroků •{' '}
                  {result.steps.map((s) => s.robik).join(' → ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Reset */}
        {result && visibleSteps >= result.steps.length && (
          <button
            onClick={() => {
              setResult(null);
              setInput('');
              setVisibleSteps(0);
            }}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← Zkusit znovu
          </button>
        )}
      </div>
    </section>
  );
}

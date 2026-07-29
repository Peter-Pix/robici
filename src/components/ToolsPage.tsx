'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { activeRobots } from '@/data/robots/robots';

// === Typy ===
interface ToolResult {
  robik: string;
  emoji: string;
  output: string;
  duration: number;
  remaining: number;
  error?: string;
}

interface ToolConfig {
  id: string;
  robik: string;
  emoji: string;
  title: string;
  desc: string;
  placeholder: string;
  maxChars: number;
  limit: number;
  modes?: { key: string; label: string }[];
  color: string;
}

const TOOLS: ToolConfig[] = [
  {
    id: 'pepa-rewrite',
    robik: 'Pepa',
    emoji: '✍️',
    title: 'Přepiš text',
    desc: 'Pepa napíše 3 varianty — formální, přátelskou a stručnou.',
    placeholder: 'Vlož text, který chceš přepsat...',
    maxChars: 800,
    limit: 3,
    color: 'border-blue-200 bg-blue-50',
  },
  {
    id: 'marie-check',
    robik: 'Marie',
    emoji: '📋',
    title: 'Najdi chyby',
    desc: 'Marie zkontroluje text, najde překlepy, dlouhé věty a dá skóre.',
    placeholder: 'Vlož text ke kontrole...',
    maxChars: 2000,
    limit: 3,
    color: 'border-purple-200 bg-purple-50',
  },
  {
    id: 'anicka-reply',
    robik: 'Anička',
    emoji: '❤️',
    title: 'Napiš odpověď',
    desc: 'Anička napíše odpověď v tónu, který zvolíš.',
    placeholder: 'Vlož zprávu, na kterou chceš odpovědět...',
    maxChars: 500,
    limit: 3,
    modes: [
      { key: 'mile', label: 'Mile' },
      { key: 'profesionalne', label: 'Profesionálně' },
      { key: 'strucne', label: 'Stručně' },
      { key: 'asertivne', label: 'Asertivně' },
      { key: 'odmítnout', label: 'Odmítnout slušně' },
      { key: 'podekovat', label: 'Poděkovat' },
    ],
    color: 'border-pink-200 bg-pink-50',
  },
  {
    id: 'franta-improve',
    robik: 'Franta',
    emoji: '💰',
    title: 'Vylepši nabídku',
    desc: 'Franta udělá z tvojí nabídky prodejní stroj.',
    placeholder: 'Vlož nabídku k vylepšení...',
    maxChars: 1000,
    limit: 3,
    modes: [
      { key: 'presvedcivejsi', label: 'Přesvědčivější' },
      { key: 'predmety', label: 'Předměty mailu' },
      { key: 'cta', label: 'CTA tlačítka' },
      { key: 'zkratit', label: 'Zkrátit' },
      { key: 'pratelsky', label: 'Přátelštější' },
    ],
    color: 'border-green-200 bg-green-50',
  },
  {
    id: 'emil-summarize',
    robik: 'Emil',
    emoji: '📊',
    title: 'Shrň text',
    desc: 'Emil udělá z dlouhého textu strukturované shrnutí.',
    placeholder: 'Vlož text nebo zápis z meetingu...',
    maxChars: 5000,
    limit: 3,
    color: 'border-amber-200 bg-amber-50',
  },
  {
    id: 'team-breakdown',
    robik: 'Tým',
    emoji: '🧠',
    title: 'Rozpad nápadu',
    desc: 'Celý tým Robíků rozebere tvůj nápad ze všech stran.',
    placeholder: 'Napiš svůj nápad (max 500 znaků)...',
    maxChars: 500,
    limit: 1,
    color: 'border-indigo-200 bg-indigo-50',
  },
];

// Mapování jmen Robíků na obrázky
const robotImages: Record<string, string> = {};
activeRobots.forEach((r) => {
  const name = r.name.split(' ')[0];
  robotImages[name] = r.image;
});

// Výchozí obrázek pro Tým (použijeme Pepu jako placeholder)
robotImages['Tým'] = robotImages['Pepa'] || '';

// === Markdown renderer ===
const markdownComponents = {
  h1: ({ children }: any) => <h1 className="text-lg font-bold text-gray-900 mt-4 mb-2">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-base font-bold text-gray-900 mt-3 mb-1">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-sm font-bold text-gray-900 mt-2 mb-1">{children}</h3>,
  p: ({ children }: any) => <p className="mb-2 last:mb-0">{children}</p>,
  ul: ({ children }: any) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
  ol: ({ children }: any) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
  li: ({ children }: any) => <li className="text-gray-700">{children}</li>,
  strong: ({ children }: any) => <strong className="font-bold text-gray-900">{children}</strong>,
  em: ({ children }: any) => <em className="italic text-gray-600">{children}</em>,
  code: ({ children }: any) => (
    <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-xs font-mono">{children}</code>
  ),
  pre: ({ children }: any) => (
    <pre className="p-3 rounded-xl bg-gray-100 text-gray-800 text-xs font-mono overflow-x-auto mb-2">{children}</pre>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-2">{children}</blockquote>
  ),
  hr: () => <hr className="my-3 border-gray-200" />,
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-2">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: any) => <th className="border border-gray-200 px-3 py-2 bg-gray-50 text-left font-semibold text-gray-700">{children}</th>,
  td: ({ children }: any) => <td className="border border-gray-200 px-3 py-2 text-gray-700">{children}</td>,
};

// === Komponenta pro jeden nástroj ===
function ToolCard({ config }: { config: ToolConfig }) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState(config.modes?.[0]?.key || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ToolResult | null>(null);
  const [error, setError] = useState('');
  const outputRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const body: any = { text: input };
      if (config.modes) body.mode = mode;

      const res = await fetch(`/api/tool/${config.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Něco se rozbilo');
      }

      setResult(data);
      setTimeout(() => outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
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
    <div className={`rounded-2xl border ${config.color} p-6`}>
      {/* Header s obrázkem robota */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 flex-shrink-0">
          {robotImages[config.robik] && (
            <Image
              src={robotImages[config.robik]}
              alt={config.robik}
              width={48}
              height={48}
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div>
          <h3 className="font-bold text-gray-900">
            {config.emoji} {config.robik} — {config.title}
          </h3>
          <p className="text-sm text-gray-500">{config.desc}</p>
        </div>
      </div>

      {/* Módy */}
      {config.modes && (
        <div className="flex flex-wrap gap-2 mb-4">
          {config.modes.map((m) => (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                mode === m.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex gap-3 mb-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={config.placeholder}
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm"
          disabled={loading}
          maxLength={config.maxChars}
        />
        <button
          onClick={handleSubmit}
          disabled={loading || !input.trim()}
          className="px-5 py-2.5 rounded-xl bg-gray-900 text-white font-semibold text-sm hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
        >
          {loading ? 'Pracuju...' : 'Pošli'}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && !result && (
        <div className="p-4 rounded-xl bg-white border border-gray-200 animate-pulse">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-8 h-8">
              {robotImages[config.robik] && (
                <Image
                  src={robotImages[config.robik]}
                  alt={config.robik}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <span className="text-sm text-gray-500">{config.robik} přemýšlí...</span>
          </div>
          <div className="h-2 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-2 bg-gray-200 rounded w-1/2" />
        </div>
      )}

      {/* Result — s obrázkem robota a Markdown renderem */}
      {result && (
        <div ref={outputRef} className="p-4 rounded-xl bg-white border border-gray-200 animate-fadeIn">
          {/* Hlavička s obrázkem robota */}
          <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
            <div className="relative w-8 h-8 flex-shrink-0">
              {robotImages[result.robik] && (
                <Image
                  src={robotImages[result.robik]}
                  alt={result.robik}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 text-sm">
                  {result.emoji} {result.robik}
                </span>
                <span className="text-xs text-gray-400">⏱ {result.duration.toFixed(1)}s</span>
              </div>
            </div>
          </div>

          {/* Markdown výstup */}
          <div className="text-sm text-gray-700 leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {result.output}
            </ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-400">
            <span>Zbývá: {result.remaining}/{config.limit} dnes</span>
            <button
              onClick={() => { setResult(null); setInput(''); }}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-auto"
            >
              × Smazat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// === Hlavní stránka nástrojů ===
export default function ToolsPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Nástroje
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🛠️ Co Robíci umí
        </h2>
        <p className="text-gray-500 mb-8">
          Každý nástroj {TOOLS[0].limit}× denně zdarma. Žádná registrace.
        </p>

        {/* Grid nástrojů */}
        <div className="space-y-6">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} config={tool} />
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-12 p-6 rounded-2xl border border-gray-200 bg-white text-center">
          <p className="text-sm text-gray-500 mb-2">
            Limit se počítá na IP adresu. {TOOLS[TOOLS.length - 1].title} je jen {TOOLS[TOOLS.length - 1].limit}× denně — je to nejdražší nástroj.
          </p>
          <p className="text-xs text-gray-400">
            🐈 Jožin sedí vedle serveru a dohlíží, aby nikdo nepodváděl.
          </p>
        </div>
      </div>
    </section>
  );
}

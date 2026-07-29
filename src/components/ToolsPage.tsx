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
  accent: string;
}

const TOOLS: ToolConfig[] = [
  {
    id: 'pepa-rewrite', robik: 'Pepa', emoji: '✍️',
    title: 'Přepiš text',
    desc: 'Pepa napíše 3 varianty — formální, přátelskou a stručnou.',
    placeholder: 'Vlož text, který chceš přepsat...',
    maxChars: 800, limit: 3,
    accent: 'from-blue-500 to-blue-600',
  },
  {
    id: 'marie-check', robik: 'Marie', emoji: '📋',
    title: 'Najdi chyby',
    desc: 'Marie zkontroluje text, najde překlepy, dlouhé věty a dá skóre.',
    placeholder: 'Vlož text ke kontrole...',
    maxChars: 2000, limit: 3,
    accent: 'from-purple-500 to-purple-600',
  },
  {
    id: 'anicka-reply', robik: 'Anička', emoji: '❤️',
    title: 'Napiš odpověď',
    desc: 'Anička napíše odpověď v tónu, který zvolíš.',
    placeholder: 'Vlož zprávu, na kterou chceš odpovědět...',
    maxChars: 500, limit: 3,
    modes: [
      { key: 'mile', label: 'Mile' },
      { key: 'profesionalne', label: 'Profesionálně' },
      { key: 'strucne', label: 'Stručně' },
      { key: 'asertivne', label: 'Asertivně' },
      { key: 'odmítnout', label: 'Odmítnout' },
      { key: 'podekovat', label: 'Poděkovat' },
    ],
    accent: 'from-pink-500 to-rose-500',
  },
  {
    id: 'franta-improve', robik: 'Franta', emoji: '💰',
    title: 'Vylepši nabídku',
    desc: 'Franta udělá z tvojí nabídky prodejní stroj.',
    placeholder: 'Vlož nabídku k vylepšení...',
    maxChars: 1000, limit: 3,
    modes: [
      { key: 'presvedcivejsi', label: 'Přesvědčivější' },
      { key: 'predmety', label: 'Předměty' },
      { key: 'cta', label: 'CTA' },
      { key: 'zkratit', label: 'Zkrátit' },
      { key: 'pratelsky', label: 'Přátelštější' },
    ],
    accent: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 'emil-summarize', robik: 'Emil', emoji: '📊',
    title: 'Shrň text',
    desc: 'Emil udělá z dlouhého textu strukturované shrnutí.',
    placeholder: 'Vlož text nebo zápis z meetingu...',
    maxChars: 5000, limit: 3,
    accent: 'from-amber-500 to-orange-500',
  },
  {
    id: 'team-breakdown', robik: 'Tým', emoji: '🧠',
    title: 'Rozpad nápadu',
    desc: 'Celý tým Robíků rozebere tvůj nápad ze všech stran.',
    placeholder: 'Napiš svůj nápad (max 500 znaků)...',
    maxChars: 500, limit: 1,
    accent: 'from-indigo-500 to-indigo-600',
  },
];

// Mapování jmen Robíků na obrázky
const robotImages: Record<string, string> = {};
activeRobots.forEach((r) => {
  const name = r.name.split(' ')[0];
  robotImages[name] = r.image;
});
robotImages['Tým'] = robotImages['Pepa'] || '';

// === Kulatý avatar ===
function RobotAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const img = robotImages[name];
  if (!img) return null;
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden bg-gray-100"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    >
      <Image
        src={img}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full object-contain p-1"
      />
    </div>
  );
}

// === Markdown renderer ===
const markdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-[17px] font-semibold text-[#1d1d1f] mt-5 mb-2 tracking-[-0.01em]">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-[15px] font-semibold text-[#1d1d1f] mt-4 mb-1.5 tracking-[-0.01em]">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-[14px] font-semibold text-[#1d1d1f] mt-3 mb-1">{children}</h3>
  ),
  p: ({ children }: any) => (
    <p className="text-[14px] leading-[1.5] text-[#515154] mb-2.5 last:mb-0">{children}</p>
  ),
  ul: ({ children }: any) => (
    <ul className="space-y-1.5 mb-3 pl-0">{children}</ul>
  ),
  ol: ({ children }: any) => (
    <ol className="space-y-1.5 mb-3 pl-5 list-decimal text-[14px] text-[#515154]">{children}</ol>
  ),
  li: ({ children }: any) => {
    // Check if children contain a nested ul (for multi-level lists)
    const hasNested = Array.isArray(children) && children.some(
      (c: any) => c?.type === 'ul' || c?.type?.displayName === 'ul'
    );
    if (hasNested) {
      return <li className="text-[14px] text-[#515154] leading-[1.5]">{children}</li>;
    }
    return (
      <li className="flex items-start gap-2.5 text-[14px] text-[#515154] leading-[1.5]">
        <span className="text-[#c7c7cc] mt-[5px] flex-shrink-0">•</span>
        <span>{children}</span>
      </li>
    );
  },
  strong: ({ children }: any) => (
    <strong className="font-semibold text-[#1d1d1f]">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-[#86868b]">{children}</em>
  ),
  code: ({ children }: any) => (
    <code className="px-[6px] py-[2px] rounded-md bg-[#f5f5f7] text-[#1d1d1f] text-[13px] font-mono">{children}</code>
  ),
  pre: ({ children }: any) => (
    <pre className="p-4 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] text-[13px] font-mono overflow-x-auto mb-3 leading-[1.6]">{children}</pre>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-[3px] border-[#e8e8ed] pl-4 italic text-[#86868b] text-[14px] mb-3 leading-[1.5]">{children}</blockquote>
  ),
  hr: () => <hr className="my-4 border-[#e8e8ed]" />,
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-3 rounded-xl border border-[#e8e8ed]">
      <table className="w-full text-[13px] border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="px-3 py-2.5 bg-[#f5f5f7] text-left font-semibold text-[#1d1d1f] border-b border-[#e8e8ed]">{children}</th>
  ),
  td: ({ children }: any) => (
    <td className="px-3 py-2.5 text-[#515154] border-b border-[#e8e8ed] last:border-b-0">{children}</td>
  ),
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
      if (!res.ok) throw new Error(data.error || 'Něco se rozbilo');
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
    <div className="bg-white rounded-[20px] border border-[#e8e8ed] overflow-hidden shadow-sm">
      {/* Header s gradient akcentem */}
      <div className={`bg-gradient-to-r ${config.accent} px-5 py-4`}>
        <div className="flex items-center gap-3">
          <RobotAvatar name={config.robik} size={44} />
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] font-semibold text-white tracking-[-0.01em]">
              {config.emoji} {config.robik}
            </h3>
            <p className="text-[13px] text-white/80">{config.title}</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Popis */}
        <p className="text-[14px] text-[#86868b] mb-4 leading-[1.4]">{config.desc}</p>

        {/* Módy */}
        {config.modes && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {config.modes.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  mode === m.key
                    ? 'bg-[#1d1d1f] text-white'
                    : 'bg-[#f5f5f7] text-[#86868b] hover:bg-[#e8e8ed]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2.5 mb-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={config.placeholder}
            className="flex-1 px-4 py-3 rounded-xl border border-[#e8e8ed] bg-white text-[#1d1d1f] placeholder-[#c7c7cc] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/20 focus:border-[#1d1d1f] text-[14px] transition-all"
            disabled={loading}
            maxLength={config.maxChars}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-[#1d1d1f] text-white font-medium text-[14px] hover:bg-[#2d2d2f] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.97] whitespace-nowrap"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>Píšu</span>
              </span>
            ) : 'Pošli'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-3 p-3.5 rounded-xl bg-[#fff2f2] border border-[#ffd7d7] text-[#c41e1e] text-[13px] leading-[1.4]">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && !result && (
          <div className="p-4 rounded-xl bg-[#f5f5f7] animate-pulse">
            <div className="flex items-center gap-2.5 mb-3">
              <RobotAvatar name={config.robik} size={28} />
              <span className="text-[13px] text-[#86868b]">{config.robik} přemýšlí...</span>
            </div>
            <div className="space-y-2">
              <div className="h-2.5 bg-[#e8e8ed] rounded-full w-3/4" />
              <div className="h-2.5 bg-[#e8e8ed] rounded-full w-1/2" />
              <div className="h-2.5 bg-[#e8e8ed] rounded-full w-5/6" />
            </div>
          </div>
        )}

        {/* Result */}
        {result && (
          <div ref={outputRef} className="rounded-xl bg-[#f5f5f7] overflow-hidden animate-fadeIn">
            {/* Hlavička */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#e8e8ed]">
              <RobotAvatar name={result.robik} size={24} />
              <span className="font-medium text-[13px] text-[#1d1d1f]">
                {result.emoji} {result.robik}
              </span>
              <span className="text-[11px] text-[#c7c7cc] ml-auto">⏱ {result.duration.toFixed(1)}s</span>
            </div>

            {/* Markdown */}
            <div className="px-4 py-3.5 text-[14px] text-[#515154] leading-[1.5]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {result.output}
              </ReactMarkdown>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-t border-[#e8e8ed] bg-white/50">
              <span className="text-[11px] text-[#c7c7cc]">
                Zbývá: {result.remaining}/{config.limit} dnes
              </span>
              <button
                onClick={() => { setResult(null); setInput(''); }}
                className="text-[11px] text-[#c7c7cc] hover:text-[#86868b] transition-colors ml-auto"
              >
                Smazat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// === Hlavní stránka nástrojů ===
export default function ToolsPage() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-[680px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-[6px] h-[6px] rounded-full bg-[#30d158]" />
          <span className="text-[11px] font-semibold text-[#c7c7cc] uppercase tracking-[0.08em]">
            Nástroje
          </span>
        </div>
        <h2 className="text-[28px] font-bold text-[#1d1d1f] tracking-[-0.02em] mb-1.5">
          🛠️ Co Robíci umí
        </h2>
        <p className="text-[15px] text-[#86868b] mb-8 leading-[1.4]">
          Každý nástroj {TOOLS[0].limit}× denně zdarma. Žádná registrace.
        </p>

        {/* Grid */}
        <div className="space-y-5">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} config={tool} />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 p-5 rounded-[20px] bg-white border border-[#e8e8ed] text-center shadow-sm">
          <p className="text-[13px] text-[#86868b] mb-1.5 leading-[1.4]">
            Limit se počítá na IP adresu. Rozpad nápadu je jen 1× denně — je to nejdražší nástroj.
          </p>
          <p className="text-[12px] text-[#c7c7cc]">
            🐈 Jožin sedí vedle serveru a dohlíží, aby nikdo nepodváděl.
          </p>
        </div>
      </div>
    </section>
  );
}

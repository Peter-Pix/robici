'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { activeRobots } from '@/data/robots/robots';

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
  hint: string;
  placeholder: string;
  maxChars: number;
  limit: number;
  modes?: { key: string; label: string }[];
}

const TOOLS: ToolConfig[] = [
  {
    id: 'pepa-rewrite', robik: 'Pepa', emoji: '✍️',
    title: 'Přepiš text',
    hint: 'Vlož text a Pepa ho přepíše do 3 variant.',
    placeholder: 'Vlož text, který chceš přepsat...',
    maxChars: 800, limit: 3,
  },
  {
    id: 'marie-check', robik: 'Marie', emoji: '📋',
    title: 'Najdi chyby',
    hint: 'Marie zkontroluje gramatiku, styl a čitelnost.',
    placeholder: 'Vlož text ke kontrole...',
    maxChars: 2000, limit: 3,
  },
  {
    id: 'anicka-reply', robik: 'Anička', emoji: '❤️',
    title: 'Napiš odpověď',
    hint: 'Vyber tón a Anička napíše odpověď.',
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
  },
  {
    id: 'franta-improve', robik: 'Franta', emoji: '💰',
    title: 'Vylepši nabídku',
    hint: 'Franta udělá z textu prodejní stroj.',
    placeholder: 'Vlož nabídku k vylepšení...',
    maxChars: 1000, limit: 3,
    modes: [
      { key: 'presvedcivejsi', label: 'Přesvědčivější' },
      { key: 'predmety', label: 'Předměty' },
      { key: 'cta', label: 'CTA' },
      { key: 'zkratit', label: 'Zkrátit' },
      { key: 'pratelsky', label: 'Přátelštější' },
    ],
  },
  {
    id: 'emil-summarize', robik: 'Emil', emoji: '📈',
    title: 'Shrň text',
    hint: 'Emil udělá z dlouhého textu strukturované shrnutí.',
    placeholder: 'Vlož text nebo zápis z meetingu...',
    maxChars: 5000, limit: 3,
  },
  {
    id: 'team-breakdown', robik: 'Tým', emoji: '🧠',
    title: 'Rozpad nápadu',
    hint: 'Celý tým Robíků rozebere tvůj nápad.',
    placeholder: 'Napiš svůj nápad (max 500 znaků)...',
    maxChars: 500, limit: 1,
  },
];

const robotImages: Record<string, string> = {};
activeRobots.forEach((r) => {
  const name = r.name.split(' ')[0];
  robotImages[name] = r.image;
});
robotImages['Tým'] = robotImages['Pepa'] || '';

function RobotAvatar({ name, size = 40 }: { name: string; size?: number }) {
  const img = robotImages[name];
  if (!img) return null;
  return (
    <div
      className="relative flex-shrink-0 overflow-hidden bg-[#f5f5f7]"
      style={{ width: size, height: size, borderRadius: size / 2 }}
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

const markdownComponents = {
  h1: ({ children }: any) => <h1 className="text-[17px] font-semibold text-[#1d1d1f] mt-5 mb-2">{children}</h1>,
  h2: ({ children }: any) => <h2 className="text-[15px] font-semibold text-[#1d1d1f] mt-4 mb-1.5">{children}</h2>,
  h3: ({ children }: any) => <h3 className="text-[14px] font-semibold text-[#1d1d1f] mt-3 mb-1">{children}</h3>,
  p: ({ children }: any) => <p className="text-[14px] leading-[1.55] text-[#515154] mb-2.5 last:mb-0">{children}</p>,
  ul: ({ children }: any) => <ul className="space-y-1 mb-3">{children}</ul>,
  ol: ({ children }: any) => <ol className="space-y-1 mb-3 list-decimal pl-5 text-[14px] text-[#515154]">{children}</ol>,
  li: ({ children }: any) => (
    <li className="flex items-start gap-2 text-[14px] text-[#515154] leading-[1.5]">
      <span className="text-[#c7c7cc] mt-[5px] flex-shrink-0 select-none">•</span>
      <span className="flex-1">{children}</span>
    </li>
  ),
  strong: ({ children }: any) => <strong className="font-semibold text-[#1d1d1f]">{children}</strong>,
  em: ({ children }: any) => <em className="italic text-[#86868b]">{children}</em>,
  code: ({ children }: any) => <code className="px-[5px] py-[1px] rounded bg-[#f5f5f7] text-[#1d1d1f] text-[13px] font-mono">{children}</code>,
  pre: ({ children }: any) => <pre className="p-3.5 rounded-xl bg-[#f5f5f7] text-[#1d1d1f] text-[13px] font-mono overflow-x-auto mb-3 leading-[1.6]">{children}</pre>,
  blockquote: ({ children }: any) => <blockquote className="border-l-[3px] border-[#e8e8ed] pl-4 italic text-[#86868b] text-[14px] mb-3 leading-[1.5]">{children}</blockquote>,
  hr: () => <hr className="my-4 border-[#e8e8ed]" />,
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-3 rounded-xl border border-[#e8e8ed]">
      <table className="w-full text-[13px] border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: any) => <th className="px-3 py-2.5 bg-[#f5f5f7] text-left font-semibold text-[#1d1d1f] border-b border-[#e8e8ed]">{children}</th>,
  td: ({ children }: any) => <td className="px-3 py-2.5 text-[#515154] border-b border-[#e8e8ed] last:border-b-0">{children}</td>,
};

function ToolCard({ config, isOpen, onToggle }: { config: ToolConfig; isOpen: boolean; onToggle: () => void }) {
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
      console.log('[Robíci] API response:', { 
        tool: config.id, 
        status: res.status,
        keys: Object.keys(data),
        hasOutput: !!data.output, 
        outputLen: data.output?.length,
        hasError: !!data.error,
      });
      if (!res.ok) throw new Error(data.error || 'Něco se rozbilo');
      if (!data.output) {
        console.error('[Robíci] Missing output in response:', data);
        throw new Error('Robík neodpověděl. Zkus to znovu.');
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(); }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#e8e8ed] overflow-hidden transition-all">
      {/* Toggle header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-[#f5f5f7] transition-colors"
      >
        <RobotAvatar name={config.robik} size={40} />
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-[#1d1d1f]">
            {config.emoji} {config.robik}
          </h3>
          <p className="text-[12px] text-[#86868b]">{config.title}</p>
        </div>
        <div className={`w-5 h-5 flex items-center justify-center transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="#c7c7cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-5 pb-5 border-t border-[#e8e8ed] pt-4">
          {/* Hint */}
          <p className="text-[13px] text-[#86868b] mb-4 leading-[1.4]">{config.hint}</p>

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
              className="flex-1 px-4 py-2.5 rounded-xl border border-[#e8e8ed] bg-white text-[#1d1d1f] placeholder-[#c7c7cc] focus:outline-none focus:ring-2 focus:ring-[#1d1d1f]/10 focus:border-[#1d1d1f] text-[14px] transition-all"
              disabled={loading}
              maxLength={config.maxChars}
            />
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#1d1d1f] text-white font-medium text-[14px] hover:bg-[#2d2d2f] disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-[0.97] whitespace-nowrap"
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
            <div className="mb-3 p-3.5 rounded-xl bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-[13px] leading-[1.4]">
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
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-[#e8e8ed]">
                <RobotAvatar name={result.robik} size={24} />
                <span className="font-medium text-[13px] text-[#1d1d1f]">{result.emoji} {result.robik}</span>
                <span className="text-[11px] text-[#c7c7cc] ml-auto">⏱ {result.duration.toFixed(1)}s</span>
              </div>
              <div className="px-4 py-3.5 text-[14px] text-[#515154] leading-[1.5]">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                  {result.output}
                </ReactMarkdown>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 border-t border-[#e8e8ed] bg-white/50">
                <span className="text-[11px] text-[#c7c7cc]">Zbývá: {result.remaining}/{config.limit} dnes</span>
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
      )}
    </div>
  );
}

export default function ToolsPage() {
  const [openTool, setOpenTool] = useState<string | null>(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-[680px] mx-auto">
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
          Klikni na Robíka a řekni mu, co potřebuješ.
        </p>

        <div className="space-y-2">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              config={tool}
              isOpen={openTool === tool.id}
              onToggle={() => setOpenTool(openTool === tool.id ? null : tool.id)}
            />
          ))}
        </div>

        <div className="mt-10 p-5 rounded-2xl bg-white border border-[#e8e8ed] text-center">
          <p className="text-[13px] text-[#86868b] mb-1.5 leading-[1.4]">
            Každý nástroj {TOOLS[0].limit}× denně zdarma. Žádná registrace.
          </p>
          <p className="text-[12px] text-[#c7c7cc]">
            🐈 Jožin sedí vedle serveru a dohlíží, aby nikdo nepodváděl.
          </p>
        </div>
      </div>
    </section>
  );
}

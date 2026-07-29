'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { activeRobots } from '@/data/robots/robots';

interface ToolMetrics {
  count: number;
  success: number;
  fail: number;
  avgDuration: number;
  avgChars: number;
}

interface MetricsData {
  total: number;
  successful: number;
  failed: number;
  limited: number;
  successRate: number;
  avgDuration: number;
  avgInputLength: number;
  avgOutputLength: number;
  totalDuration: number;
  totalChars: number;
  byTool: Record<string, ToolMetrics>;
  byDay: Record<string, number>;
  recentEntries: any[];
}

const robotImages: Record<string, string> = {};
activeRobots.forEach((r) => {
  const name = r.name.split(' ')[0];
  robotImages[name] = r.image;
});
robotImages['Tým'] = robotImages['Pepa'] || '';

const TOOL_NAMES: Record<string, string> = {
  'pepa-rewrite': 'Pepa', 'marie-check': 'Marie', 'anicka-reply': 'Anička',
  'franta-improve': 'Franta', 'emil-summarize': 'Emil', 'team-breakdown': 'Tým',
};

const TOOL_EMOJIS: Record<string, string> = {
  'pepa-rewrite': '✍️', 'marie-check': '📋', 'anicka-reply': '❤️',
  'franta-improve': '💰', 'emil-summarize': '📊', 'team-breakdown': '🧠',
};

function RobotAvatar({ name, size = 24 }: { name: string; size?: number }) {
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
        className="w-full h-full object-contain p-0.5"
      />
    </div>
  );
}

export default function MetricsBoard() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metrics')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-[680px] mx-auto animate-pulse">
          <div className="h-4 bg-[#f5f5f7] rounded w-32 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-[#f5f5f7] rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data || data.total === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-[680px] mx-auto text-center">
          <div className="flex items-center gap-2 mb-1 justify-center">
            <span className="w-[6px] h-[6px] rounded-full bg-[#007aff]" />
            <span className="text-[11px] font-semibold text-[#c7c7cc] uppercase tracking-[0.08em]">
              Statistiky
            </span>
          </div>
          <h2 className="text-[28px] font-bold text-[#1d1d1f] tracking-[-0.02em] mb-1.5">
            📊 Zatím žádná data
          </h2>
          <p className="text-[15px] text-[#86868b] leading-[1.4]">
            Jakmile někdo použije některý z nástrojů, objeví se tady.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-[680px] mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-[6px] h-[6px] rounded-full bg-[#007aff]" />
          <span className="text-[11px] font-semibold text-[#c7c7cc] uppercase tracking-[0.08em]">
            Statistiky
          </span>
        </div>
        <h2 className="text-[28px] font-bold text-[#1d1d1f] tracking-[-0.02em] mb-1.5">
          📊 Co Robíci dělali
        </h2>
        <p className="text-[15px] text-[#86868b] mb-8 leading-[1.4]">
          Reálná data z {data.total} interakcí.
        </p>

        {/* KPI — čistý karty */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-[#e8e8ed]">
            <p className="text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em] mb-1">Úspěšnost</p>
            <p className="text-[22px] font-bold text-[#1d1d1f]">{data.successRate}%</p>
            <p className="text-[12px] text-[#86868b]">{data.successful}/{data.total}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#e8e8ed]">
            <p className="text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em] mb-1">Prům. čas</p>
            <p className="text-[22px] font-bold text-[#1d1d1f]">{data.avgDuration}s</p>
            <p className="text-[12px] text-[#86868b]">na interakci</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#e8e8ed]">
            <p className="text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em] mb-1">Prům. délka</p>
            <p className="text-[22px] font-bold text-[#1d1d1f]">{data.avgOutputLength}</p>
            <p className="text-[12px] text-[#86868b]">znaků na výstup</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-[#e8e8ed]">
            <p className="text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em] mb-1">Celkem textu</p>
            <p className="text-[22px] font-bold text-[#1d1d1f]">{(data.totalChars / 1000).toFixed(1)}k</p>
            <p className="text-[12px] text-[#86868b]">znaků vygenerováno</p>
          </div>
        </div>

        {/* Tabulka */}
        <div className="rounded-2xl bg-white border border-[#e8e8ed] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#e8e8ed]">
            <h3 className="text-[15px] font-semibold text-[#1d1d1f]">Podle nástroje</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[#e8e8ed]">
                  <th className="text-left px-5 py-3 text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em]">Nástroj</th>
                  <th className="text-right px-5 py-3 text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em]">Použití</th>
                  <th className="text-right px-5 py-3 text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em]">⏱ Čas</th>
                  <th className="text-right px-5 py-3 text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em]">📝 Znaků</th>
                  <th className="text-right px-5 py-3 text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em]">✅</th>
                  <th className="text-right px-5 py-3 text-[11px] font-medium text-[#c7c7cc] uppercase tracking-[0.05em]">❌</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.byTool).map(([tool, m]) => (
                  <tr key={tool} className="border-b border-[#e8e8ed] last:border-b-0 hover:bg-[#f5f5f7] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <RobotAvatar name={TOOL_NAMES[tool] || tool} size={22} />
                        <span className="font-medium text-[#1d1d1f]">
                          {TOOL_EMOJIS[tool] || ''} {TOOL_NAMES[tool] || tool}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right text-[#1d1d1f] font-medium">{m.count}×</td>
                    <td className="px-5 py-3 text-right text-[#86868b]">{m.avgDuration}s</td>
                    <td className="px-5 py-3 text-right text-[#86868b]">{m.avgChars}</td>
                    <td className="px-5 py-3 text-right text-[#30d158] font-medium">{m.success}</td>
                    <td className="px-5 py-3 text-right text-[#ff453a]">{m.fail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-[#c7c7cc] text-center">
          {data.total} interakcí • {data.totalDuration.toFixed(0)}s celkem
        </p>
      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface ToolMetrics {
  count: number;
  avgDuration: number;
  avgChars: number;
  success: number;
  fail: number;
}

interface MetricsData {
  generated: string;
  total: number;
  successful: number;
  failed: number;
  successRate: number;
  avgDuration: number;
  avgChars: number;
  totalDuration: number;
  totalChars: number;
  byTool: Record<string, ToolMetrics>;
}

const TOOL_NAMES: Record<string, string> = {
  'pepa-rewrite': '✍️ Pepa',
  'marie-check': '📋 Marie',
  'anicka-reply': '❤️ Anička',
  'franta-improve': '💰 Franta',
  'emil-summarize': '📊 Emil',
  'team-breakdown': '🧠 Tým',
};

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
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-48 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Statistiky
          </span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📊 Co Robíci dělali
        </h2>
        <p className="text-gray-500 mb-8">
          Nasimulovaná data z {data.total} interakcí. Reálná data přijdou po spuštění.
        </p>

        {/* KPI karty */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <p className="text-xs text-gray-400 mb-1">Úspěšnost</p>
            <p className="text-2xl font-bold text-gray-900">{data.successRate}%</p>
            <p className="text-xs text-gray-400">{data.successful}/{data.total}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <p className="text-xs text-gray-400 mb-1">Prům. čas</p>
            <p className="text-2xl font-bold text-gray-900">{data.avgDuration}s</p>
            <p className="text-xs text-gray-400">na interakci</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <p className="text-xs text-gray-400 mb-1">Prům. délka</p>
            <p className="text-2xl font-bold text-gray-900">{data.avgChars}</p>
            <p className="text-xs text-gray-400">znaků na výstup</p>
          </div>
          <div className="p-4 rounded-2xl bg-white border border-gray-200">
            <p className="text-xs text-gray-400 mb-1">Celkem textu</p>
            <p className="text-2xl font-bold text-gray-900">{(data.totalChars / 1000).toFixed(1)}k</p>
            <p className="text-xs text-gray-400">znaků vygenerováno</p>
          </div>
        </div>

        {/* Tabulka podle nástrojů */}
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Podle nástroje</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 text-gray-400 font-medium">Nástroj</th>
                  <th className="text-right p-4 text-gray-400 font-medium">Použití</th>
                  <th className="text-right p-4 text-gray-400 font-medium">⏱ Průměr</th>
                  <th className="text-right p-4 text-gray-400 font-medium">📝 Znaků</th>
                  <th className="text-right p-4 text-gray-400 font-medium">✅ Úspěch</th>
                  <th className="text-right p-4 text-gray-400 font-medium">❌ Chyby</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.byTool).map(([tool, metrics]) => (
                  <tr key={tool} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-medium text-gray-900">
                      {TOOL_NAMES[tool] || tool}
                    </td>
                    <td className="p-4 text-right text-gray-700">{metrics.count}×</td>
                    <td className="p-4 text-right text-gray-700">{metrics.avgDuration}s</td>
                    <td className="p-4 text-right text-gray-700">{metrics.avgChars}</td>
                    <td className="p-4 text-right text-green-600">{metrics.success}</td>
                    <td className="p-4 text-right text-red-400">{metrics.fail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-4 text-xs text-gray-400 text-center">
          Data z {new Date(data.generated).toLocaleDateString('cs-CZ')} •{' '}
          {data.total} interakcí • {data.totalDuration.toFixed(0)}s celkem
        </p>
      </div>
    </section>
  );
}

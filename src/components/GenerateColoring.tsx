'use client';

import { useState, useRef } from 'react';

const characters = [
  { id: 'rodina', name: 'Celá rodina', emoji: '👨‍👩‍👧‍👦' },
  { id: 'pepa', name: 'Pepa', emoji: '🧑' },
  { id: 'marie', name: 'Marie', emoji: '👩' },
  { id: 'gustav', name: 'Gustav', emoji: '👴' },
  { id: 'betka', name: 'Bětka', emoji: '👩‍🎨' },
  { id: 'mirek', name: 'Mirek', emoji: '👨' },
  { id: 'franta', name: 'Franta', emoji: '🧔' },
  { id: 'anicka', name: 'Anička', emoji: '👧' },
  { id: 'emil', name: 'Emil', emoji: '🤓' },
  { id: 'jozin', name: 'Jožin', emoji: '🐱' },
];

export default function GenerateColoring() {
  const [selected, setSelected] = useState('rodina');
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setSvgContent(null);

    try {
      const res = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ character: selected }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else if (data.svg) {
        setSvgContent(data.svg);
      } else {
        setError('Nepodařilo se vygenerovat omalovánku.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const downloadSVG = () => {
    if (!svgContent) return;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omalovanka-${selected}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-robik-card rounded-2xl p-6 border border-pastel-blue/20">
      {/* Výběr postavy */}
      <div className="flex flex-wrap gap-2 mb-6">
        {characters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setSelected(ch.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              selected === ch.id
                ? 'bg-robik-accent text-white'
                : 'bg-white border border-pastel-blue/30 text-robik-text/60 hover:border-pastel-blue/50'
            }`}
          >
            {ch.emoji} {ch.name}
          </button>
        ))}
      </div>

      {/* Tlačítko */}
      <button
        onClick={generate}
        disabled={loading}
        className="w-full bg-robik-accent text-white font-semibold px-6 py-3 rounded-xl hover:bg-robik-accent/90 transition-all disabled:opacity-50 mb-4"
      >
        {loading ? '🎨 Kreslím...' : '🤖 Vygenerovat omalovánku'}
      </button>

      {/* Chyba */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-600 mb-4">
          {error}
        </div>
      )}

      {/* SVG náhled */}
      {svgContent && (
        <div className="text-center">
          <div
            ref={svgRef}
            className="bg-white rounded-xl p-4 mb-3 border border-gray-200 max-w-full overflow-auto"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
          <button
            onClick={downloadSVG}
            className="inline-block bg-white text-robik-text border-2 border-pastel-blue px-4 py-2 rounded-xl text-sm hover:bg-pastel-blue/10 transition-all"
          >
            📥 Stáhnout SVG
          </button>
        </div>
      )}
    </div>
  );
}

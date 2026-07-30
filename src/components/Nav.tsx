'use client';

import Link from 'next/link';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Domů' },
  { href: '/rodina', label: 'Rodina' },
  { href: '/roboctina', label: 'Robočtina' },
  { href: '/omalovanky', label: 'Omalovánky' },
  { href: '/zpravodaj', label: 'Zpravodaj' },
  { href: '/sluzby', label: 'Služby' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-robik-card/90 backdrop-blur-md border-b border-pastel-blue/30">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-robik-dark hover:text-robik-accent transition-colors">
          <span className="text-2xl">🤖</span>
          <span>Robíci</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-robik-text/70 hover:text-robik-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-robik-text"
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-pastel-blue/30 bg-robik-card/95 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-robik-text/70 hover:text-robik-accent transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

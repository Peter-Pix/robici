import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Robíci — Digitální kancelář, kterou lidi chodí navštěvovat',
  description:
    'Robíci odstraní tu nejnudnější část psaní. A ještě u toho uvidíš, jak přemýšlí. Parta AI kolegů — Pepa píše, Marie kontroluje, Franta navrhuje, Mirek opravuje, Anička odpovídá.',
  openGraph: {
    title: 'Robíci — Digitální kancelář',
    description:
      'Robíci odstraní tu nejnudnější část psaní. A ještě u toho uvidíš, jak přemýšlí.',
    type: 'website',
    locale: 'cs_CZ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="antialiased">{children}</body>
    </html>
  );
}

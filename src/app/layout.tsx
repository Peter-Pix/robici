import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Robíci s.r.o. — Malá česká firma, kde pracují jen roboti',
  description:
    'Robíci s.r.o. je veřejný experiment. Ukazujeme, jak funguje firma, kde většinu rutiny převezmou AI agenti. S českým humorem a lehkou sebeironií.',
  openGraph: {
    title: 'Robíci s.r.o.',
    description: 'Malá česká firma, kde pracují jen roboti. A snaží se, jak nejlíp umí.',
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

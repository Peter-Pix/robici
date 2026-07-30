import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Robíci – rodina, která tě naučí kamarádit s AI',
  description:
    'Robíci jsou rodina AI kamarádů. Nauč se Robočtinu, stáhni si omalovánky a poznej celou naši rodinu. Nejsme nástroj. Jsme přátelé.',
  openGraph: {
    title: 'Robíci – rodina, která tě naučí kamarádit s AI',
    description:
      'Robíci jsou rodina AI kamarádů. Nauč se Robočtinu, stáhni si omalovánky a poznej celou naši rodinu.',
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
      <body className="antialiased min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

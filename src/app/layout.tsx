import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta.home;

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
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Robíci',
            url: 'https://robici-sro.vercel.app',
            logo: 'https://robici-sro.vercel.app/favicon.ico',
            sameAs: [],
            description:
              'Robíci jsou rodina AI kamarádů, která odstraňuje tu nejnudnější část psaní. Neprodáváme AI. Prodáváme klid.',
          }),
        }}
      />
    </body>
    </html>
  );
}

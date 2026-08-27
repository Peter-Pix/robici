import type { Metadata } from 'next';

/**
 * SEO / sdílení — centrální metadata helper pro Robíky.
 *
 * Všechny stránky exportují metadata přes Next.js App Router API.
 * Root layout definuje výchozí metadata; jednotlivé stránky je doplňují
 * nebo přepisují title/description/OG.
 */

const SITE_NAME = 'Robíci';
const BASE_URL = 'https://robici-sro.vercel.app';
const DEFAULT_LOCALE = 'cs_CZ';
const DEFAULT_OG_IMAGE = '/images/pepa.png'; // fallback, nahradit vlastním OG obrázkem

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function makeMetadata(input: PageMetaInput): Metadata {
  const url = `${BASE_URL}${input.path}`;
  const image = input.image ?? DEFAULT_OG_IMAGE;
  const imageAlt = input.imageAlt ?? input.title;

  return {
    title: `${input.title} | ${SITE_NAME}`,
    description: input.description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      locale: DEFAULT_LOCALE,
      type: input.type ?? 'website',
      images: [
        {
          url: image,
          alt: imageAlt,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export const pageMeta = {
  home: makeMetadata({
    title: 'Robíci – rodina, která tě naučí kamarádit s AI',
    description:
      'Robíci jsou rodina AI kamarádů. Nauč se Robočtinu, stáhni si omalovánky a poznej celou naši rodinu. Nejsme nástroj. Jsme přátelé.',
    path: '/',
  }),
  rodina: makeMetadata({
    title: 'Rodina Robíků – poznej všechny členy rodiny',
    description:
      'Pepa, Marie, Franta, Mirek, Anička, Bětka, Gustav, Emil, Jožin a babička Zdena. Každý má svou povahu, svůj příběh a svůj smysl pro humor.',
    path: '/rodina',
    image: '/images/gustav.png',
  }),
  roboctina: makeMetadata({
    title: 'Robočtina – nauč se mluvit s AI jako s kamarádem',
    description:
      'Interaktivní lekce Robočtiny pro děti i dospělé. Naučíš se, jak AI požádat o pomoc, jak jí odpustit chybu a jak z ní dostat to nejlepší.',
    path: '/roboctina',
    image: '/images/marie.png',
  }),
  omalovanky: makeMetadata({
    title: 'Omalovánky od Robíků – s příběhem ke každému obrázku',
    description:
      'Stáhni si omalovánky zdarma nebo kup balíček. Každá omalovánka má svůj příběh — od Pepy, Marie, Gustava, Bětky nebo Jožina.',
    path: '/omalovanky',
    image: '/images/betka.png',
  }),
  balicky: makeMetadata({
    title: 'Balíčky Robíků – omalovánky, e-maily a pomocníci',
    description:
      'Vyber si balíček podle svých potřeb. Začátečník, Profesionál nebo třeba dárek pro kamaráda, co se bojí AI.',
    path: '/balicky',
    image: '/images/franta.png',
  }),
  sluzby: makeMetadata({
    title: 'Služby Robíků – píšeme, kreslíme, kontrolujeme a radíme',
    description:
      'Pepa napíše, Bětka nakreslí, Gustav zkontroluje, Franta vymyslí. Vyber si Robíka podle toho, co zrovna potřebuješ.',
    path: '/sluzby',
    image: '/images/gustav.png',
  }),
  kontakt: makeMetadata({
    title: 'Kontakt – napiš Robíkům',
    description:
      'Máš dotaz, nápad, nebo chceš jen popřát? Robíci odpovídají všem. I těm, co nám nadávaj. I těm, co nám posílaj básničky.',
    path: '/kontakt',
    image: '/images/anicka.png',
  }),
  zpravodaj: makeMetadata({
    title: 'Zpravodaj Robíků – co se děje v rodině',
    description:
      'Novinky, příhody a poznámky z rodiny Robíků. Franta to zase provedl, Gustav našel chybu ve slonovi a Jožin spí.',
    path: '/zpravodaj',
    image: '/images/emil.png',
  }),
  registrace: makeMetadata({
    title: 'Registrace – vstup do rodiny Robíků',
    description:
      'Zaregistruj se a získej přístup ke všem omalovánkám a lekcím zdarma. Babička Zdena už vaří čaj.',
    path: '/registrace',
    image: '/images/zdena.png',
  }),
  objednat: makeMetadata({
    title: 'Objednat – pořiď si Robíky na pomoc',
    description:
      'Vyber si balíček a začni používat Robíky jako svou digitální kancelář. Klid, ne chaos.',
    path: '/objednat',
    noIndex: true,
  }),
} as const;

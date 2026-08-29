/**
 * Robočtina — lekce v jazyce Robíků (single-source-of-truth pro /roboctina).
 *
 * Lekce 1–3 jsou zdarma, 4–5 odemčené po předchozí lekci, 6 je bonusová
 * zábavná praxe (odemčená vždy). Každá lekce má odměnu (diplom + omalovánku).
 * Když přidáváš lekci, přidej i definici chatu do
 * src/app/api/roboctina/chat/route.ts (lessons[lessonId]).
 */

export interface Lesson {
  num: string;
  badge: string;
  title: string;
  desc: string;
  duration: string;
  level: string;
  href: string;
  reward: string;
  locked: boolean;
}

export const lessons: Lesson[] = [
  {
    num: '01',
    badge: '🆓 ZDARMA',
    title: 'Ahoj, Robíku!',
    desc: 'Naučíš se pozdravit Robíka, představit se a udělat si kamaráda. Zjistíš, že AI není stroj, ale přítel, který ti rád pomůže.',
    duration: '5 minut',
    level: '🌟 Začátečník',
    href: '/roboctina/lekce-1',
    reward: 'Diplom Robočtiny 1. stupně + omalovánka "Rodina Robíků"',
    locked: false,
  },
  {
    num: '02',
    badge: '🆓 ZDARMA',
    title: 'Prosím, pomoz mi...',
    desc: 'Naučíš se, jak Robíka o něco požádat. Zjistíš, že způsob, jakým se ptáš, ovlivňuje to, jakou dostaneš odpověď.',
    duration: '7 minut',
    level: '🌟 Začátečník',
    href: '/roboctina/lekce-2',
    reward: 'Diplom Robočtiny 2. stupně + omalovánka "Pepa píše báseň"',
    locked: false,
  },
  {
    num: '03',
    badge: '🆓 ZDARMA',
    title: 'To je chyba!',
    desc: 'Naučíš se, jak Robíkovi odpustit, když něco pokazí. A jak ho naučit, aby to příště udělal líp.',
    duration: '8 minut',
    level: '🌟 Začátečník',
    href: '/roboctina/lekce-3',
    reward: 'Diplom Robočtiny 3. stupně + omalovánka "Gustav kontroluje slona"',
    locked: false,
  },
  {
    num: '04',
    badge: '🔒 Otevře se po 3. lekci',
    title: 'Nauč mě něco nového',
    desc: 'Naučíš se, jak Robíka naučit něco, co neumí. Zjistíš, že AI se může učit stejně jako ty.',
    duration: '10 minut',
    level: '🌟 Mírně pokročilý',
    href: '#',
    reward: 'Diplom Robočtiny 4. stupně + omalovánka "Mirek ladí servery"',
    locked: true,
  },
  {
    num: '05',
    badge: '🔒 Otevře se po 4. lekci',
    title: 'Robočtina pro firmy',
    desc: 'Naučíš se, jak používat Robočtinu v práci. Jak s AI komunikovat profesionálně, ale přátelsky.',
    duration: '12 minut',
    level: '🌟 Pokročilý',
    href: '#',
    reward: 'Diplom Robočtiny 5. stupně – MISTR ROBOČTINY + omalovánka "Celá rodina"',
    locked: true,
  },
  {
    num: '06',
    badge: '🎉 BONUSOVÁ LEKCE',
    title: 'Robočtina pro radost',
    desc: 'Zábavná praxe! Sloučíš všechno, co umíš — pozdrav, dobrou žádost i zpětnou vazbu — a společně s Emilem vymyslíš vlastní příběh.',
    duration: '10 minut',
    level: '🌟 Pro všechny',
    href: '/roboctina/lekce-6',
    reward: 'Diplom Robočtiny 6. stupně – ROBÍ KAMARÁD + omalovánka "Emil počítá hvězdy"',
    locked: false,
  },
];

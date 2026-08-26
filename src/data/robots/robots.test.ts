// Konzistenční testy pro Robíky — ověřují, že postavy mají konzistentní
// vztahy a osobnosti, a že robots.ts je single-source-of-truth pro celý web.
import assert from 'node:assert';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { robots, activeRobots, inactiveRobots } from './robots.ts';

// Postavy, které web (page.tsx, rodina page) používá. robots.ts musí pokrývat
// VŠECHNY — jinak je nekonzistence mezi daty a obsahem.
const WEB_CHARACTERS = [
  'gustav', 'zdena', 'mirek', 'marie', 'pepa',
  'betka', 'franta', 'anicka', 'emil', 'jozin',
];

test('robots.ts má 10 Robíků (9 + Zdena)', () => {
  assert.equal(robots.length, 10);
});

test('všichni Robíci mají unikátní id', () => {
  const ids = robots.map((r) => r.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('robots.ts pokrývá všechny postavy webu', () => {
  const ids = new Set(robots.map((r) => r.id));
  for (const c of WEB_CHARACTERS) {
    assert.ok(ids.has(c), `chybí postava "${c}" v robots.ts`);
  }
});

test('každý Robík má mood v rozsahu 1-10', () => {
  for (const r of robots) {
    assert.ok(r.mood >= 1 && r.mood <= 10, `${r.id} má mood ${r.mood} mimo 1-10`);
  }
});

test('každý Robík má alespoň 1 vztah', () => {
  for (const r of robots) {
    assert.ok(r.relationships.length > 0, `${r.id} nemá žádný vztah`);
  }
});

test('všechny vztahy odkazují na existující Robíky', () => {
  const ids = new Set(robots.map((r) => r.id));
  for (const r of robots) {
    for (const rel of r.relationships) {
      assert.ok(ids.has(rel.to), `${r.id} -> ${rel.to} (neexistuje)`);
    }
  }
});

test('všechny vztahy jsou oboustranné (symetrické)', () => {
  const byId = new Map(robots.map((r) => [r.id, r]));
  for (const r of robots) {
    for (const rel of r.relationships) {
      const other = byId.get(rel.to)!;
      const back = other.relationships.find((x) => x.to === r.id);
      assert.ok(back, `${r.id} -> ${rel.to} chybí zpětný vztah`);
    }
  }
});

test('vztah typu "pet" je vždy s Jožinem (kocourem)', () => {
  const jozin = robots.find((r) => r.id === 'jozin')!;
  for (const r of robots) {
    for (const rel of r.relationships) {
      if (rel.type === 'pet') {
        // pet vztah je vždy mezi Jožinem a někým jiným
        assert.ok(
          r.id === 'jozin' || rel.to === 'jozin',
          `${r.id} má pet vztah, který nezahrnuje Jožina`
        );
      }
    }
  }
  // Jožin má aspoň jeden pet vztah
  assert.ok(jozin.relationships.some((rel) => rel.type === 'pet'));
});

test('activeRobots a inactiveRobots dohromady = všichni Robíci', () => {
  const all = [...activeRobots, ...inactiveRobots];
  assert.equal(all.length, robots.length);
  const ids = new Set(all.map((r) => r.id));
  assert.equal(ids.size, robots.length);
});

test('každý Robík má osobnost (aspoň 1 rys) a hlášky (aspoň 1)', () => {
  for (const r of robots) {
    assert.ok(r.personality.length > 0, `${r.id} nemá osobnost`);
    assert.ok(r.catchphrases.length > 0, `${r.id} nemá hlášky`);
  }
});

test('rodina page (rodina/page.tsx) má stejné postavy jako robots.ts', () => {
  const rodina = readFileSync('src/app/rodina/page.tsx', 'utf8');
  const rodinaIds = [...rodina.matchAll(/id: '([^']+)'/g)].map((m) => m[1]);
  const robotIds = robots.map((r) => r.id);
  assert.deepEqual([...rodinaIds].sort(), [...robotIds].sort());
});

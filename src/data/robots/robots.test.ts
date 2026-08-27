// Konzistenční testy pro Robíky — ověřují, že postavy mají konzistentní
// vztahy a osobnosti, a že robots.ts je single-source-of-truth pro celý web.
import assert from 'node:assert';
import { test } from 'node:test';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..', '..');
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


// --- Opakovatelný proces: přidání nového Robíka ---
// Tyto testy garantují, že přidání nového Robíka je bezpečné a konzistentní.
// Každý nový Robík musí mít kompletní data a obrázek, jinak test failuje.

test('každý Robík má kompletní data (image, emoji, color, accent, role, description)', () => {
  const required: (keyof typeof robots[number])[] = ['id', 'name', 'role', 'emoji', 'image', 'color', 'accent', 'description', 'personality', 'catchphrases', 'status', 'mood', 'relationships'];
  for (const r of robots) {
    for (const field of required) {
      const val = r[field];
      assert.ok(
        val !== undefined && val !== null && val !== '',
        `${r.id}: chybí povinné pole "${field}"`
      );
    }
  }
});

test('každý Robík má validní status (active | inactive | error)', () => {
  for (const r of robots) {
    assert.ok(['active', 'inactive', 'error'].includes(r.status), `${r.id}: neplatný status "${r.status}"`);
  }
});

test('každý Robík má obrázek v public/ (roboti/ nebo images/)', () => {
  for (const r of robots) {
    const imgPath = path.join(projectRoot, 'public', r.image.replace(/^\//, ''));
    assert.ok(
      existsSync(imgPath),
      `${r.id}: obrázek ${r.image} neexistuje (${imgPath})`
    );
  }
});

test('každý Robík má emoji a barvy (color + accent)', () => {
  for (const r of robots) {
    assert.ok(r.emoji && r.emoji.length > 0, `${r.id}: chybí emoji`);
    assert.ok(r.color && r.color.startsWith('bg-'), `${r.id}: color "${r.color}" není tailwind bg-*`);
    assert.ok(r.accent && r.accent.length > 0, `${r.id}: chybí accent`);
  }
});

// --- Konzistence rodinné struktury (děda Gustav, babička Zdena) ---
// rodina page prezentuje rodinu: děda Gustav, babička Zdena, táta Mirek,
// máma Marie a mladší generace. Tento test garantuje, že rodinné vazby
// jsou zapsané i v robots.ts (nejen v UI), jinak by osobnosti a vztahy
// nebyly konzistentní napříč webem.

test('děda Gustav a babička Zdena mají rodinné pouto (family)', () => {
  const gustav = robots.find((r) => r.id === 'gustav')!;
  const zdena = robots.find((r) => r.id === 'zdena')!;
  const gz = gustav.relationships.find((x) => x.to === 'zdena');
  const zg = zdena.relationships.find((x) => x.to === 'gustav');
  assert.ok(gz && gz.type === 'family', 'Gustav (děda) musí mít family vztah k Zdeně');
  assert.ok(zg && zg.type === 'family', 'Zdena (babička) musí mít family vztah ke Gustavovi');
});

test('děda Gustav má family vztah k Mirkovi (táta) — syn a otec', () => {
  const gustav = robots.find((r) => r.id === 'gustav')!;
  const gz = gustav.relationships.find((x) => x.to === 'mirek' && x.type === 'family');
  assert.ok(gz, 'Gustav (děda) musí mít family vztah k Mirkovi (táta)');
});

test('rodinné vztahy (family) jsou oboustranné a typu family', () => {
  const byId = new Map(robots.map((r) => [r.id, r]));
  for (const r of robots) {
    for (const rel of r.relationships) {
      if (rel.type === 'family') {
        const other = byId.get(rel.to)!;
        const back = other.relationships.find((x) => x.to === r.id && x.type === 'family');
        assert.ok(back, `family vztah ${r.id} <-> ${rel.to} není oboustranný/stejný typ`);
      }
    }
  }
});

test('žádný Robík nemá duplicitní pár vztahů (to + type)', () => {
  for (const r of robots) {
    const seen = new Set();
    for (const rel of r.relationships) {
      const key = `${rel.to}:${rel.type}`;
      assert.ok(!seen.has(key), `${r.id} má duplicitní vztah ${key}`);
      seen.add(key);
    }
  }
});

// --- Konzistence osobnosti a role ---
test('každý Robík má osobnost konzistentní s rolí (basic keyword check)', () => {
  const roleKeyword: Record<string, string[]> = {
    pepa: ['píše', 'sluš', 'mail'],
    marie: ['kontrol', 'tabulk', 'pedant', 'máma'],
    franta: ['optimist', 'prodá', 'obchod'],
    mirek: ['mlčí', 'oprav', 'technik'],
    anicka: ['nejmilejší', 'omluv', 'zákazník'],
    betka: ['hezčí', 'perfekcion', 'graf'],
    gustav: ['rozbije', 'nedůvěř', 'test'],
    emil: ['měří', 'graf', 'analytik'],
    zdena: ['babička', 'laskav', 'čaj', 'trpěliv'],
    jozin: ['kocour', 'server', 'práce'],
  };
  for (const r of robots) {
    const keywords = roleKeyword[r.id];
    assert.ok(keywords, `${r.id}: nemá definovaná klíčová slova v testu`);
    const text = (r.role + ' ' + r.description + ' ' + r.personality.join(' ')).toLowerCase();
    const hit = keywords.some((k) => text.includes(k));
    assert.ok(hit, `${r.id}: osobnost/popis neodpovídá roli (hledal ${keywords.join(', ')})`);
  }
});

// --- Konzistence obrázků na rodina page ---
test('všechny obrázky na rodina page existují v public/images/', () => {
  const rodina = readFileSync('src/app/rodina/page.tsx', 'utf8');
  const imgs = [...rodina.matchAll(/img: '(\/images\/[^']+)'/g)].map((m) => m[1]);
  assert.ok(imgs.length >= 10, 'rodina page má málo obrázků');
  for (const img of imgs) {
    const p = path.join(projectRoot, 'public', img.replace(/^\//, ''));
    assert.ok(existsSync(p), `rodina page: obrázek ${img} neexistuje`);
  }
});

test('každý Robík má unikátní obrázek (žádní dva nesdílejí stejný soubor)', () => {
  const seen = new Map();
  for (const r of robots) {
    if (seen.has(r.image)) {
      assert.fail(`${r.id} a ${seen.get(r.image)} sdílejí obrázek ${r.image}`);
    }
    seen.set(r.image, r.id);
  }
});

#!/usr/bin/env node
// validate-robots.mjs — ověří konzistenci robotích dat před commitnutím.
//
// Spuštění: node scripts/validate-robots.mjs
// Exit code 0 = OK, 1 = chyby nalezeny.
//
// Toto je součást opakovatelného procesu "Přidat nového Robíka" (docs/adding-a-robot.md).
// Kontroluje stejné invarianty jako src/data/robots/robots.test.ts, ale je
// spustitelný samostatně (rychle, bez test runneru).

import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Načti robots.ts jako text a extrahuj pole robots[] přes import.
// (robots.ts je TypeScript — Node 26 ho umí načíst přímo.)
const { robots } = await import('../src/data/robots/robots.ts');

const errors = [];
const warn = [];

// 1. Unikátní id
const ids = robots.map((r) => r.id);
if (new Set(ids).size !== ids.length) {
  errors.push('Duplicitní id mezi Robíky.');
}

// 2. Povinná pole
const required = ['id', 'name', 'role', 'emoji', 'image', 'color', 'accent', 'description', 'personality', 'catchphrases', 'status', 'mood', 'relationships'];
for (const r of robots) {
  for (const field of required) {
    if (r[field] === undefined || r[field] === null || r[field] === '') {
      errors.push(`${r.id}: chybí povinné pole "${field}"`);
    }
  }
}

// 3. mood 1-10
for (const r of robots) {
  if (typeof r.mood !== 'number' || r.mood < 1 || r.mood > 10) {
    errors.push(`${r.id}: mood ${r.mood} mimo rozsah 1-10`);
  }
}

// 4. status validní
for (const r of robots) {
  if (!['active', 'inactive', 'error'].includes(r.status)) {
    errors.push(`${r.id}: neplatný status "${r.status}"`);
  }
}

// 5. Obrázek existuje v public/roboti/
for (const r of robots) {
  const imgPath = path.join(root, 'public', r.image.replace(/^\//, ''));
  if (!existsSync(imgPath)) {
    warn.push(`${r.id}: obrázek ${r.image} neexistuje v public/roboti/ (používá fallback?)`);
  }
}

// 6. Alespoň 1 vztah
for (const r of robots) {
  if (!r.relationships || r.relationships.length === 0) {
    errors.push(`${r.id}: nemá žádný vztah`);
  }
}

// 7. Vztahy odkazují na existující Robíky
const idSet = new Set(ids);
for (const r of robots) {
  for (const rel of r.relationships || []) {
    if (!idSet.has(rel.to)) {
      errors.push(`${r.id} -> ${rel.to}: vztah na neexistujícího Robíka`);
    }
  }
}

// 8. Vztahy oboustranné
const byId = new Map(robots.map((r) => [r.id, r]));
for (const r of robots) {
  for (const rel of r.relationships || []) {
    const other = byId.get(rel.to);
    if (other && !other.relationships.some((x) => x.to === r.id)) {
      errors.push(`${r.id} -> ${rel.to}: chybí zpětný vztah`);
    }
  }
}

// 9. pet vztah jen s Jožinem
for (const r of robots) {
  for (const rel of r.relationships || []) {
    if (rel.type === 'pet' && r.id !== 'jozin' && rel.to !== 'jozin') {
      errors.push(`${r.id}: pet vztah nezahrnuje Jožina`);
    }
  }
}

// 10. Osobnost a hlášky
for (const r of robots) {
  if (!r.personality || r.personality.length === 0) errors.push(`${r.id}: nemá osobnost`);
  if (!r.catchphrases || r.catchphrases.length === 0) errors.push(`${r.id}: nemá hlášky`);
}

// Výstup
console.log(`Robíci: ${robots.length}`);
if (warn.length) {
  console.log('\n⚠️  Varování:');
  for (const w of warn) console.log(`  - ${w}`);
}
if (errors.length) {
  console.log('\n❌ Chyby:');
  for (const e of errors) console.log(`  - ${e}`);
  console.log(`\n${errors.length} chyb. Oprav data (docs/adding-a-robot.md) a zkus znovu.`);
  process.exit(1);
}
console.log(warn.length ? `\n✅ OK (${warn.length} varování).` : '\n✅ Všechna data konzistentní.');

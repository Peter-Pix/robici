# Přidání nového Robíka — opakovatelný proces

> **Cíl:** Přidat nového Robíka tak, aby byl konzistentní s celým webem a nezničil
> stávající postavy. Tento proces je **opakovatelný** — stejný postup funguje pro
> každého nového Robíka. Testy a validace chytí chyby dřív, než se dostanou do produkce.

---

## 0. Předpoklady

- Robíci běží na Next.js (App Router). Data jsou v `src/data/robots/robots.ts`.
- `robots.ts` je **single-source-of-truth** pro všechny postavy webu.
- Testy: `npm test` (Node 26 test runner, `node --test src/**/*.test.ts`).
- Validace: `node scripts/validate-robots.mjs` (kontrola konzistence dat).

---

## 1. Přidej data do `src/data/robots/robots.ts`

Přidej nový objekt do pole `robots`. **Všechna pole jsou povinná** — testy to vynucují:

```ts
{
  id: 'novy',                    // unikátní, lowercase, bez diakritiky
  name: 'Nový Robík',            // celé jméno
  role: 'Název role',            // např. 'Copywriter'
  emoji: '🤖',                   // jeden emoji
  image: '/roboti/novy.png',      // cesta k obrázku v public/roboti/
  color: 'bg-blue-500',          // tailwind barva pro status dot
  accent: 'blue',                // tailwind accent barva pro kartu
  description: '...',            // 1-2 věty, česky
  personality: ['...', '...'],   // aspoň 1 rys
  catchphrases: ['...', '...'],  // aspoň 1 hláška
  status: 'active' | 'inactive', // 'active' = viditelný, 'inactive' = v pozadí
  mood: 5,                       // 1-10
  relationships: [               // aspoň 1 vztah
    { to: 'marie', type: 'work', note: '...' },
  ],
}
```

### Pravidla vztahů (vynucují testy)

- **Každý vztah musí být oboustranný (symetrický).** Když `novy` má vztah k `marie`,
  musí `marie` mít zpětný vztah k `novy`. Test `všechny vztahy jsou oboustranné` to chytí.
- **`to` musí odkazovat na existujícího Robíka.** Test `všechny vztahy odkazují na existující Robíky` to chytí.
- **Typ `pet` je vyhrazený pro Jožina (kocoura).** Test `vztah typu "pet" je vždy s Jožinem` to chytí.
- **Typy vztahů:** `mentor | rival | partner | family | friend | pet | work`.

---

## 2. Přidej obrázek

- Obrázek ulož do `public/roboti/<id>.png` (např. `public/roboti/novy.png`).
- Cesta v `robots.ts` musí být `/roboti/<id>.png`.
- Test `každý Robík má obrázek v public/roboti/` ověří, že soubor existuje.

> ⚠️ **Pozor na rodina page.** `src/app/rodina/page.tsx` má vlastní pole `family`
> s obrázky v `/images/*.png` (ne `/roboti/*.png`). Pokud chceš nového Robíka
> zobrazit na `/rodina`, přidej ho i tam. Test `rodina page má stejné postavy jako robots.ts`
> ověří, že se seznamy nerozcházejí.

---

## 3. Zobraz nového Robíka na webu (volitelné)

Robíci se zobrazují na:
- `/` (homepage) — přes `src/components/RobotsPage.tsx` (čte `robots.ts`)
- `/rodina` — přes `src/app/rodina/page.tsx` (vlastní pole `family`)
- `/sluzby`, `/balicky`, `/zpravodaj` — reference na postavy

Pokud je `status: 'active'`, Robík se automaticky objeví v `activeRobots`
(export z `robots.ts`). Pokud ho chceš i na `/rodina`, přidej ho do pole `family`.

---

## 4. Spusť validaci a testy

```bash
# 1. Validace konzistence dat (rychlé, bez test runneru)
node scripts/validate-robots.mjs

# 2. Konzistenční testy
npm test

# 3. Build (ověří, že se nic nerozbilo)
npm run build
```

Vše musí projít. Pokud test failuje, oprav data (max 3 pokusy), ne test.

---

## 5. Commit

```bash
git add src/data/robots/robots.ts public/roboti/<id>.png docs/adding-a-robot.md
git commit -m "feat(robots): add <id> — <role>"
```

---

## Checklist (před commitnutím)

- [ ] `id` je unikátní, lowercase, bez diakritiky
- [ ] Všechna pole vyplněna (image, emoji, color, accent, role, description, personality, catchphrases, status, mood, relationships)
- [ ] `mood` je v rozsahu 1-10
- [ ] Obrázek existuje v `public/roboti/<id>.png`
- [ ] Alespoň 1 vztah, všechny vztahy oboustranné a odkazují na existující Robíky
- [ ] `pet` vztah jen s Jožinem
- [ ] `npm test` prochází
- [ ] `node scripts/validate-robots.mjs` prochází
- [ ] `npm run build` prochází

# Robíci 🤖

AI rodina, která odstraňuje tu nejnudnější část psaní — a ještě u toho ukáže, jak přemýšlí.

> **Positioning:** Neprodáváme Robíky. Prodáváme klid. Neprodáváme AI. Prodáváme digitální kancelář, kterou lidi chodí navštěvovat, i když zrovna nic nepotřebují.

## Co to dělá

- **Rodina** (`/rodina`) — deset Robíků s osobnostmi a vztahy (9 core + babička Zdena)
- **Robočtina** (`/roboctina`) — vlastní jazyk Robíků
- **Omalovánky** (`/omalovanky`) — kreativní obsah
- **Balíčky** (`/balicky`) — nabídka balíčků
- **Objednat / Registrace** — onboarding zákazníků
- **Služby** (`/sluzby`), **Kontakt** (`/kontakt`), **Zpravodaj** (`/zpravodaj`)

## Pro koho

Primárně Češi 28–35 let pracující v malé firmě (< 50 lidí) nebo freelanceri.

## Tech stack

- Next.js (App Router)
- React + Tailwind CSS
- Data: `src/data/robots.ts` (robotí postavy), `src/data/content/shift-data.ts`
- Vercel (`.vercel/`)

## Spuštění

```bash
npm install
npm run dev
```

Otevři `http://localhost:3115`.

## 🚀 Deploy

**Produkce:** https://robici-sro.vercel.app

Vercel projekt: `robici-sro` (`prj_0bqFzvTiUDuSDj66WZXyCZKXtcbC`), org `team_fgrlCgfOTriSWC37Ay4sQwk1`. Auto-deploy z GitHubu `main` větve.

**Verifikace deploye:**

```bash
npm run test:verify      # live HTTP check (8 routes + 3 API + 10 images + homepage content)
npm run test:deploy      # unit testy verifikačního skriptu
```

Aktuální stav viz [`docs/vercel-deploy-verification.md`](docs/vercel-deploy-verification.md). Při změně avatarů / přidání Robíka vždycky spusť `test:verify` proti produkci.

## 🚀 Deploy

**Produkce:** https://robici-sro.vercel.app

Vercel projekt: `robici-sro` (`prj_0bqFzvTiUDuSDj66WZXyCZKXtcbC`), org `team_fgrlCgfOTriSWC37Ay4sQwk1`. Auto-deploy z GitHubu `main` větve.

**Verifikace deploye:**

```bash
npm run test:verify      # live HTTP check (8 routes + 3 API + 10 images + homepage content)
npm run test:deploy      # unit testy verifikačního skriptu
```

Aktuální stav viz [`docs/vercel-deploy-verification.md`](docs/vercel-deploy-verification.md). Při změně avatarů / přidání Robíka vždycky spusť `test:verify` proti produkci.

## Struktura

```
src/app/          # Routes (rodina, roboctina, omalovanky, balicky, objednat, registrace, sluzby, kontakt, zpravodaj)
src/data/         # Robotí postavy a obsah
src/components/   # UI komponenty
docs/             # Koncept, roadmap, benchmark reporty
scripts/          # Utility
```

# Robíci 🤖

AI rodina, která odstraňuje tu nejnudnější část psaní — a ještě u toho ukáže, jak přemýšlí.

> **Positioning:** Neprodáváme Robíky. Prodáváme klid. Neprodáváme AI. Prodáváme digitální kancelář, kterou lidi chodí navštěvovat, i když zrovna nic nepotřebují.

## Co to dělá

- **Rodina** (`/rodina`) — devět Robíků s osobnostmi a vztahy (Franta, Gustav, …)
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

## Struktura

```
src/app/          # Routes (rodina, roboctina, omalovanky, balicky, objednat, registrace, sluzby, kontakt, zpravodaj)
src/data/         # Robotí postavy a obsah
src/components/   # UI komponenty
docs/             # Koncept, roadmap, benchmark reporty
scripts/          # Utility
```

# Robíci 🤖

AI rodina, která odstraňuje tu nejnudnější část psaní — a ještě u toho ukáže, jak přemýšlí.

> **Positioning:** Neprodáváme Robíky. Prodáváme klid. Neprodáváme AI. Prodáváme digitální kancelář, kterou lidi chodí navštěvovat, i když zrovna nic nepotřebují.

## Co to dělá

- **Rodina** (`/rodina`) — deset Robíků s osobnostmi a vztahy (9 core + babička Zdena) + **chat s Robíkem** (interakce Robík ↔ LLM, odpovídá v osobnosti)
- **Robočtina** (`/roboctina`) — vlastní jazyk Robíků, 5 lekcí + AI chat
- **Omalovánky** (`/omalovanky`) — 6 zdarma + 4 premium, AI generování omalovánek
- **Balíčky** (`/balicky`) — nabídka balíčků
- **Objednat / Registrace** — onboarding zákazníků
- **Služby** (`/sluzby`), **Kontakt** (`/kontakt`), **Zpravodaj** (`/zpravodaj`)

## Pro koho

Primárně Češi 28–35 let pracující v malé firmě (< 50 lidí) nebo freelanceri.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **Tailwind CSS v4**
- **@ai-sdk/openai** + **ai** (AI streaming), **react-markdown** / **remark-gfm**
- **@vercel/blob** (obrázky), Ollama Cloud/OpenRouter (LLM inference)
- Data: `src/data/robots/robots.ts` (single-source-of-truth pro postavy), `src/data/content/colorings.ts`, `shift-data.ts`
- Vercel Pro

## API endpointy

Kód čte dvě proměnné prostředí — viz [Nastavení](#nastavení-env):

- `/api/tool/*` — 6 nástrojů Robíků (anicka-reply, emil-summarize, franta-improve, marie-check, pepa-rewrite, team-breakdown)
- `/api/rodina/chat` — chat s Robíkem na `/rodina` (POST `{robotId, message}`)
- `/api/roboctina/chat` — AI streaming pro lekce Robočtiny (s validací)
- `/api/scene/mail-rewrite` — přepis e-mailu
- `/api/generate-image` — AI generování omalovánek
- `/api/metrics` — usage metrika toolů
- `/api/debug/reset-limits` — dev reset IP rate limitů (auth chráněno)

## Nastavení env

Zkopíruj `.env.example` do `.env.local` a doplň klíče (**`.env.local` je v `.gitignore`, nikdy ho necommitovat**):

```bash
cp .env.example .env.local
```

Kód reálně čte:

| Proměnná | Kde se používá |
|----------|----------------|
| `OLLAMA_API_KEY` | `src/lib/ollama.ts`, `src/app/api/roboctina/chat/route.ts` (Ollama Cloud chat) |
| `OPENROUTER_API_KEY` | `src/app/api/generate-image/route.ts` (OpenRouter image gen) |

> `.env.example` obsahuje oba klíče (`OLLAMA_API_KEY` + `OPENROUTER_API_KEY`) — template odpovídá tomu, co kód reálně čte.

## Spuštění

```bash
npm install
npm run dev
```

Otevři `http://localhost:3115`.

## Testy a validace

```bash
npm test               # 22 konzistenčních testů Robíků (vztahy, obrázky, osobnosti, rodina page)
npm run test:validate  # validace robotích dat (scripts/validate-robots.mjs)
npm run test:deploy    # unit testy verifikačního skriptu (16)
npm run build          # produkční build (tsc + next build)
```

## 🚀 Deploy

**Produkce:** https://robici-sro.vercel.app

Vercel projekt: `robici-sro` (`prj_0bqFzvTiUDuSDj66WZXyCZKXtcbC`), org `team_fgrlCgfOTriSWC37Ay4sQwk1`. Auto-deploy z GitHubu `main` větve.

**Verifikace deploye:**

```bash
npm run test:verify      # live HTTP check (8 routes + 3 API + /images/*.webp + content)
npm run test:deploy      # unit testy verifikačního skriptu
```

Aktuální stav viz [`docs/vercel-deploy-verification.md`](docs/vercel-deploy-verification.md). Při změně avatarů / přidání Robíka vždycky spusť `test:verify` proti produkci.

## Struktura

```
src/app/          # Routes (rodina, roboctina, omalovanky, balicky, objednat, registrace, sluzby, kontakt, zpravodaj, api/)
src/data/         # Robotí postavy (robots/robots.ts), obsah (content/)
src/components/   # UI komponenty (RobotChatPanel, RobotChat, RobotsPage, …)
src/lib/          # ollama.ts (LLM + rate limit), seo.ts, logger.ts, tool-logger.ts
public/images/    # Velké avatary Robíků (WebP, /rodina + OG)
public/roboti/    # Malé avatary (PNG, referencované z robots.ts)
docs/             # Koncept, adding-a-robot, roadmap, benchmark reporty, deploy verifikace
scripts/          # validate-robots, verify-deploy, benchmark tooling
planner/          # state.md (aktuální audit stavu)
```

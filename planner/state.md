# Stav projektu: Robíci

> Audit: 2026-08-29 (21:17) · The Archivist (Sovereign OS) · 100% faktický, z kódu a git historie.
> Předchozí audit (18:13) aktualizován — řada položek mezitím opravena (viz diff).

## Co je hotové ✅

**Web (Next.js 16.2.12 App Router, React 19.2.8, Tailwind v4.3.3, pnpm)**
- 17+ stránek: `/rodina`, `/roboctina` (+ 5 lekcí), `/omalovanky`, `/balicky`, `/objednat/[slug]`, `/registrace`, `/sluzby`, `/kontakt`, `/zpravodaj`, `/not-found`.
- 10 Robíků (9 core + babička Zdena) v `src/data/robots/robots.ts` — single-source-of-truth.
- Explicitní vztahy mezi Robíky (family/work/mentor/rival/partner/friend/pet) s konzistenčními testy.
- Omalovánky (6 zdarma + 4 premium), data v `src/data/content/colorings.ts`, AI generování přes `/api/generate-image` (OpenRouter/Blob).
- Robočtina: 5 lekcí + AI chat (`/api/roboctina/chat`), The Loop architektura s AI validací.
- **Interakce Robík ↔ LLM: chat na `/rodina`** — `/api/rodina/chat` (POST {robotId, message}), system prompt z `robots.ts`, `RobotChatPanel` komponenta. (nově, commit 3a8ba85)
- Tool API: 6 nástrojů (`anicka-reply`, `emil-summarize`, `franta-improve`, `marie-check`, `pepa-rewrite`, `team-breakdown`) + `scene/mail-rewrite`.
- Model-doubling pipeline (`callWithRevision` v `src/lib/ollama.ts`).
- Perzistentní logování (`src/lib/logger.ts`, `tool-logger.ts`), usage metrics (`/api/metrics`).
- IP rate limiting (`checkIpLimit` v `ollama.ts`, in-memory, localhost/benchmark neomezený).

**SEO / sdílení**
- Centrální `src/lib/seo.ts` (makeMetadata) — OG/Twitter tags, canonical, JSON-LD.
- `robots.txt`, `sitemap.xml`, metadata pro všechny stránky.
- Avatary optimalizované: **10 WebP (~22–40 KB)** místo PNG (~0.9–1.3 MB) — ~97% úspora. (commit ddc81b6)

**Testy a validace**
- `npm test` — 22 konzistenčních testů Robíků. **22/22 pass.**
- `npm run test:validate` — `scripts/validate-robots.mjs` (data konzistence).
- `npm run test:deploy` — `verify-deploy.test.mjs`, **16/16 pass.**
- `npm run test:verify` — live HTTP check produkce (8 routes + 3 API + /images/*.webp + content).
- Build: `npm run build` → OK (Compiled successfully).

**Deploy**
- Vercel Pro, projekt `robici-sro` (`prj_0bqFzvTiUDuSDj66WZXyCZKXtcbC`), auto-deploy z GitHubu `main`.
- Produkce: https://robici-sro.vercel.app
- `vercel.json`: maxDuration 60 pro `/api/tool/**` a `/api/scene/**`.

## Co chybí / je rozbité ⚠️

- **Responsivní design (Apple styl)** (Fáze B) — není ověřeno, chybí test mobilního layoutu.
- **Škola Robočtiny: obsah pro děti** (Fáze B) — 5 lekcí existuje, ale plnohodnotná "škola" není dokončená (chybí lekce 6+).
- **Vlastní OG image** (Fáze C) — `DEFAULT_OG_IMAGE = '/images/pepa.webp'` stále fallback (komentář "nahradit vlastním OG obrázkem").
- **Landing CTA** (Fáze C) — homepage hook/CTA neověřeno proti konkrétní hodnotě.
- **Zastaralé docs** — benchmark/herbert-strategy reporty (2026-07-29/30/31) jsou historické, neaktuální.
- **Duplicitní `docs/roadmap.md`** (9.5 KB, 29. 7.) vs `ROADMAP.md` (3.8 KB, 29. 8.) — dva soubory, dva formáty. Zmatek.

## Technický dluh 🧹

- **IP rate limit je in-memory** (`ipLimits` Map v `ollama.ts`) — resetuje se při restartu, neškáluje napříč instancemi. Komentář: "Pro produkci použít Redis".
- **`DEFAULT_OG_IMAGE = '/images/pepa.webp'`** — fallback OG, komentář k nahrazení.
- **Kořenové balast soubory** — `Gemini_Generated_Image_db7e3sdb7e3sdb7e.png` (1.3 MB), `PineTools.com_2026-07-28_22h38m44s.zip` (1.5 MB), `robici.png` (2.4 MB), `round_robíci.png` (2.2 MB) — nezávazné artefakty v repu.
- **`image_robici/` složka** (10 PNG) — duplicitní zdroj obrázků mimo `public/`, pravděpodobně nevyužité.
- **`tsconfig.tsbuildinfo`** (198 KB) — build artefakt, ale `.gitignore` ho pokrývá.
- **`.usage-logs/usage-log.ndjson`** — lokální log, `.gitignore` pokrývá.
- **`scripts/benchmark.py`, `monitor-ollama.py`** — odkazují na lokální Ollama workflow (historické, viz MEMORY pravidlo: cloud-first).

## Pozorování / rizika 🔍

- **`.env.local` existuje** (klíč `OPENROUTER_API_KEY`) — je v `.gitignore`, NENÍ v historii (ověřeno 0 výskytů `sk-or-v1-`). `.env.example` commitnutý, ale **nesouhlasí s kódem**:
    - Kód čte `OLLAMA_API_KEY` (`src/lib/ollama.ts:36`, `roboctina/chat:191`) — jen to je v `.env.example`.
    - Kód čte `OPENROUTER_API_KEY` (`generate-image:7`) — chybí v `.env.example`, ale je v `.env.local`.
    - `.env.example` navíc dokumentuje `VERCEL_OIDC_TOKEN`, který kód nečte (jen Vercel CLI).
    → `.env.example` by mělo dokumentovat obě klíče z kódu: `OLLAMA_API_KEY` + `OPENROUTER_API_KEY`.
- **Vercel Edge middleware vrací 403/405 na POST `/api/debug/reset-limits`** — očekávané (auth kontrola), testy to očekávají ([200,204,405,403]).
- **Žádný TODO/FIXME v kódu** (grep src/ + scripts/ → 0 výskytů).
- **Working tree čistý**, branch `main`, poslední commit `28dc0f0`, v sync s origin.
- **Zdena image**: `public/images/zdena.webp` existuje (přidán 27. 8.).

### Poznámka k avatarům
- `public/images/*.webp` (10×) — velké avatary pro `/rodina`, homepage, OG.
- `public/roboti/*.png` (10×) — malé avatary (316×317) referencované z `robots.ts` (`r.image`). Záměrně ponechány jako PNG, malé.
- **Rozdíl:** `robots.ts` odkazuje na `/roboti/*.png`, ale `/rodina` page používá vlastní pole `family` s `/images/*.webp`. Oba seznamy testy kontrolují (shoda postav).

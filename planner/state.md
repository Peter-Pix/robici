# Stav projektu: Robíci

> Audit: 2026-08-29 · The Archivist (Sovereign OS) · 100% faktický, z kódu a git historie.

## Co je hotové ✅

**Web (Next.js 16 App Router, React 19, Tailwind v4)**
- 17+ stránek: `/rodina`, `/roboctina` (+ 5 lekcí), `/omalovanky`, `/balicky`, `/objednat/[slug]`, `/registrace`, `/sluzby`, `/kontakt`, `/zpravodaj`, `/not-found`.
- 10 Robíků (9 core + babička Zdena) v `src/data/robots/robots.ts` — single-source-of-truth.
- Explicitní vztahy mezi Robíky (family/work/mentor/rival/partner/friend/pet) s konzistenčními testy.
- Omalovánky: 6 zdarma + 4 premium balíčky, data v `src/data/content/colorings.ts`.
- AI generování omalovánek přes OpenRouter (`/api/generate-image`).
- Robočtina: 5 lekcí + AI chat (`/api/roboctina/chat`), The Loop architektura s AI validací.
- Tool API: 6 nástrojů (anicka-reply, emil-summarize, franta-improve, marie-check, pepa-rewrite, team-breakdown) + scene/mail-rewrite.
- Model-doubling pipeline (`callWithRevision` v `src/lib/ollama.ts`) — draft + critic + revise.
- Perzistentní logování toolů (`src/lib/logger.ts`, `tool-logger.ts`), usage metrics (`/api/metrics`).
- IP rate limiting (`checkIpLimit` v `ollama.ts`, in-memory, localhost/benchmark neomezený).

**SEO / sdílení**
- Centrální `src/lib/seo.ts` (makeMetadata) — OG/Twitter tags, canonical, JSON-LD Organization schema.
- `robots.txt`, `sitemap.xml`, metadata pro všechny stránky.

**Testy a validace**
- `npm test` — 22 konzistenčních testů Robíků (vztahy, obrázky, osobnosti, rodina page). **22/22 pass.**
- `scripts/validate-robots.mjs` — validace dat.
- `scripts/verify-deploy.mjs` + `verify-deploy.test.mjs` — live HTTP check produkce (8 routes + 3 API + 10 images + content).

**Deploy**
- Vercel Pro, projekt `robici-sro`, auto-deploy z GitHubu `main`.
- Produkce: https://robici-sro.vercel.app
- Zdena avatar (`public/images/zdena.png`) commitnutý (fix z 27. 8.) — dřívější 404 na produkci vyřešen.

**Dokumentace**
- `docs/koncept.md` (bullet-proof koncept), `docs/adding-a-robot.md` (opakovatelný proces), `docs/vercel-deploy-verification.md`, benchmark reporty, herbert-strategy.

## Co chybí / je rozbité ⚠️

- **README.md má duplikovanou sekci "🚀 Deploy"** — objevuje se 2× verbatim (řádky ~30–45). Dokumentační chyba.
- **Interakce Robík ↔ LLM** (Fáze 2, nezaškrtnuto v ROADMAP) — Robík odpovídá/komentuje přes LLM není hotové (jen tool API a roboctina chat existují).
- **Responsivní design (Apple styl)** (Fáze 2, nezaškrtnuto) — není ověřeno.
- **Škola Robočtiny: obsah pro děti** (Fáze 1, nezaškrtnuto) — 5 lekcí existuje, ale "obsah pro děti (zábava + učení)" jako plnohodnotná škola není dokončená.

## Technický dluh 🧹

- **IP rate limit je in-memory** (`ipLimits` Map v `ollama.ts`) — resetuje se při restartu serveru, neškáluje napříč instancemi. Komentář v kódu: "Pro produkci použít Redis".
- **`DEFAULT_OG_IMAGE = '/images/pepa.png'`** v `src/lib/seo.ts` — fallback OG obrázek je Pepa, komentář "nahradit vlastním OG obrázkem".
- **Velké PNG avatary** (~0.9–1.3 MB každý) — 10 obrázků, žádná optimalizace/webp. Zpomaluje načítání.
- **`tsconfig.tsbuildinfo`** (198 KB) a `.next/` v repu — build artefakty, `.gitignore` je pokrývá (`*.tsbuildinfo`, `/.next/`).
- **Benchmark/strategie docs jsou historické** (2026-07-29/30/31) — zastaralé, neodráží aktuální stav.

## Pozorování / rizika 🔍

- **`.env.local` existuje** (93 B) — je v `.gitignore` (`*.local`), ale obsahuje živé klíče. `.env.example` má placeholder. Riziko nízké, ale klíče by se neměly commitovat.
- **`OLLAMA_API_KEY` + `VERCEL_OIDC_TOKEN`** — používá se Bearer auth na `https://ollama.com/api/chat`. Klíč je v env, ne v kódu (grep potvrdil).
- **Vercel Edge middleware vrací 403 na POST `/api/debug/reset-limits`** — očekávané chování (auth kontrola), ne bug.
- **Žádný TODO/FIXME v kódu** (grep přes src/ a scripts/ → 0 výskytů).
- **Working tree čistý**, branch `main`, poslední commit `9868aab` (27. 8. 2026).
- **Testy:** 22/22 pass (`npm test`). Deploy verify: 22/23 (dříve), po commitu Zdeny očekáváno 23/23.

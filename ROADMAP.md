# Projekt: Robíci

> AI rodina, která odstraňuje tu nejnudnější část psaní — a ukazuje, jak AI přemýšlí.
> Audit: 2026-08-29 · The Archivist. Tato roadmapa = atomické tasky pro Buildera (~5 min každý).
> Revize: 2026-08-29 · The Strategist — sloučeny duplicitní chat tasky (hotové v 3a8ba85), přidány nové z faktického stavu.

## Fáze A: Základ — stabilita a bezpečnost

- [x] Ověřit konzistenci Robíků — 10 Robíků (9 core + Zdena), explicitní vztahy, rodinné vazby. Testy: 22 pass (`npm test`) + `npm run test:validate`.
- [x] Opakovatelný proces přidání Robíka — `docs/adding-a-robot.md` + konzistenční testy (obrázky, vztahy, osobnosti).
- [x] Ověřit deploy a doménu — Vercel Pro, `npm run test:verify` (8 routes + 3 API + 10 images + content). Zdena avatar commitnutý (fix 27. 8.).
- [x] Ověřit, že `.env.local` je správně ignorovaný — `git check-ignore .env.local` → vrátil cestu; `git ls-files .env.local` → prázdné. `.env.example` byl taky ignorovaný (`.env*` pravidlo) — přidán `!.env.example`, template commitnutý. (The Spine, 29. 8.)
- [x] Ověřit, že žádný API klíč není v git historii — `git log --all -S "OLLAMA_API_KEY"` → jen název proměnné v placeholder, ne hodnota. Skutečná hodnota (`sk-or-v1-…`) NENÍ v historii. (The Builder, 29. 8.)
- [x] Optimalizovat avatary Robíků — 10 PNG (1024², 0.9–1.3 MB) → WebP q80 (22–40 KB), ~97% úspora. Reference aktualizovány (rodina/page, page.tsx, seo.ts) + verify-deploy. 22/22 + 16/16 testů, build OK. (The Builder, 29. 8.)

## Fáze B: Funkce — dokončit interakci, obsah a stabilitu

- [x] Interakce Robík ↔ LLM: chat s Robíkem na `/rodina` — API `/api/rodina/chat` (POST {robotId, message}), system prompt z `robots.ts` (role + osobnost + hlášky), `RobotChatPanel` komponenta. **Per-Robík prompt + rate limit (checkIpLimit, 10 msg/den) jsou součástí téhož commitu** (3a8ba85) — Jožin vynechán. 22/22 testů, build OK. (The Builder, 29. 8.)
- [x] Opravit `.env.example` — `.env.example` nyní obsahuje oba klíče, které kód reálně čte: `OLLAMA_API_KEY` (ollama.ts, roboctina/chat) + `OPENROUTER_API_KEY` (generate-image). Odebrán `VERCEL_OIDC_TOKEN` (kód ho nečte). README env poznámka aktualizována. 22/22 testů, validate OK. (The Builder, 29. 8.)
- [x] Škola Robočtiny: přidat lekci 6 „Robočtina pro radost“ — nový `src/data/content/roboctina.ts` (single-source lessons), page `lekce-6` (zábava + učení: pozdrav + žádost + zpětná vazba s Emilem), `lekce-6` definice v chat route, `/roboctina` refaktory na import z content + odkaz ověřen (renderuje lesson.href). 22/22 + 16/16 testů, build OK (lekce-6 v build output). (The Archivist, 29. 8.)
- [x] Responsivní design: ověřit mobilní layout — real browser check (Playwright) na 375 px i 320 px: `/rodina`, `/roboctina`, `/roboctina/lekce-1`, `/roboctina/lekce-6`, `/omalovanky`, `/`, `/balicky`. Při 375 px 0 přetékání; při 320 px nalezeno přetékání o 16 px na `/rodina` — send button v RobotChatPanel se nevešel (flex item bez min-w-0). Fix: `min-w-0` na input + `flex-shrink-0` na button. Po fixu 0 overflow na všech stránkách (375 i 320 px), 0 offensive elementů. 22/22 + 16/16 testů, build OK. (The Builder, 29. 8.)
- [x] Ověřit chat na `/rodina` na produkci — `npm run test:verify` 23/23 OK (prod). Ruční POST test `/api/rodina/chat`: Pepa → 200 v osobnosti (✍️, článek 9000 slov), Marie → 200 v osobnosti (📋, checklist). Chybové stavy bez 500: neexistující robotId → 404, prázdná zpráva → 400. `OLLAMA_API_KEY` nakonfigurován v prod, `gemma4:31b` odpovídá ~1-2s. 22/22 + 16/16 testů. (The Builder, 29. 8.). (5 min)

## Fáze C: Marketing — vnímání projektu

- [ ] Vlastní OG image — nahradit `DEFAULT_OG_IMAGE = '/images/pepa.webp'` v `src/lib/seo.ts` za dedikovaný OG obrázek (`/images/og-robici.webp`), vytvořit/vložit soubor do `public/images/`. Cíl: sdílení na soc. sítích ukazuje brand, ne Pepu. (5 min)
- [ ] Ověřit OG + sitemap na produkci — zkontrolovat, že `sitemap.xml` obsahuje všechny hlavní cesty (`/rodina`, `/roboctina`, `/omalovanky`, `/balicky`, `/sluzby`, `/kontakt`) a OG image je na produkci dosažitelný (HTTP 200). (5 min)
- [ ] Landing CTA: posílit homepage hook — ověřit `Hero.tsx` + hlavní CTA tlačítka na `/` (aktuálně vedou na `/roboctina`, `/omalovanky`, `/rodina`). Přidat konkrétní hodnotu ("ušetři hodiny psaní") do hero textu, pokud chybí. Cíl: návštěvník do 5 s ví, co Robíci dělají a kam kliknout. (5 min)

## Fáze D: Dokumentace a úklid

- [x] Opravit README — odstranit duplikovanou „🚀 Deploy“ sekci, opravit cestu `src/data/robots.ts` → `src/data/robots/robots.ts`. (The Archivist, 29. 8.)
- [ ] Archivovat zastaralé docs — přesunout `docs/benchmark-report-2026-07-29/30/31.md`, `docs/herbert-strategy-2026-07-29/30/31.md`, `docs/roadmap.md` (duplicitní s ROADMAP.md) do `docs/archive/`. Cíl: `docs/` obsahuje jen aktuální dokumenty. (5 min)
- [ ] Odstranit kořenové balast soubory — `Gemini_Generated_Image_*.png`, `PineTools.com_*.zip` (7 MB+ artefakty) + složku `image_robici/` (10 PNG, nevyužité — `robots.ts` čte `/roboti/*.png`). `git rm` a commit. Cíl: čistý kořen repa, -7 MB. (5 min)
- [ ] Commit a push — commitnout ROADMAP.md + fixy z Fáze B–D, pushnout branch `main`. Cíl: `git status` clean. (5 min)

## Blokery
- Positioning jasný — neprodej AI, prodej klid. Držet tón.
- Chat na `/rodina` vyžaduje funkční `OLLAMA_API_KEY` (v `.env.local`, validní).
- `.env.example` fix (Fáze B) je předpoklad pro bezpečné onboardování nového vývojáře.

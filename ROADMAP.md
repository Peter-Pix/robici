# Projekt: Robíci

> AI rodina, která odstraňuje tu nejnudnější část psaní — a ukazuje, jak AI přemýšlí.
> Audit: 2026-08-29 · The Archivist. Tato roadmapa = atomické tasky pro Buildera (~5 min každý).

## Fáze A: Základ — stabilita a bezpečnost

- [x] Ověřit konzistenci Robíků — 10 Robíků (9 core + Zdena), explicitní vztahy, rodinné vazby. Testy: 22 pass (`npm test`) + `npm run test:validate`.
- [x] Opakovatelný proces přidání Robíka — `docs/adding-a-robot.md` + konzistenční testy (obrázky, vztahy, osobnosti).
- [x] Ověřit deploy a doménu — Vercel Pro, `npm run test:verify` (8 routes + 3 API + 10 images + content). Zdena avatar commitnutý (fix 27. 8.).
- [ ] Ověřit, že `.env.local` je správně ignorovaný — `git check-ignore .env.local` → musí vrátit cestu; `git ls-files .env.local` → prázdné. (5 min)
- [ ] Ověřit, že žádný API klíč není v git historii — `git log --all -S "OLLAMA_API_KEY"` a `-S "VERCEL_OIDC_TOKEN"` → prázdné. (5 min)
- [ ] Optimalizovat avatary Robíků — převést 10 PNG (~0.9–1.3 MB každý) na WebP/AVIF, ověřit, že testy obrázků (`public/images/`) stále procházejí. (5 min)

## Fáze B: Funkce — dokončit interakci a obsah

- [ ] Interakce Robík ↔ LLM: přidat chat s Robíkem na `/rodina` — využít existující `src/lib/ollama.ts` (ollamaCall) a tool API, Robík odpovídá v osobnosti. (5 min)
- [ ] Interakce Robík ↔ LLM: přidat per-Robík system prompt (osobnost + hlášky z `robots.ts`) do chat route. (5 min)
- [ ] Interakce Robík ↔ LLM: přidat rate limit na chat (využít existující `checkIpLimit` v `ollama.ts`). (5 min)
- [ ] Škola Robočtiny: rozšířit obsah pro děti — přidat lekci 6 (zábava + učení), data do `src/data/content/`. (5 min)
- [ ] Responsivní design (Apple styl): ověřit mobilní layout na `/rodina`, `/roboctina`, `/omalovanky` — opravit přetékání/rozbité komponenty. (5 min)

## Fáze C: Marketing — vnímání projektu

- [ ] Vlastní OG image — nahradit `DEFAULT_OG_IMAGE = '/images/pepa.png'` v `src/lib/seo.ts` za dedikovaný OG obrázek (např. `/images/og-robici.png`), přidat soubor do `public/images/`. (5 min)
- [ ] Ověřit OG image na produkci — `npm run test:verify` + ruční check, že sdílení na sociálních sítích ukazuje správný obrázek. (5 min)
- [ ] Landing page: ověřit, že homepage (`/`) má silný hook a CTA — zkontrolovat Hero komponentu, přidat konkrétní hodnotu („ušetři hodiny psaní“). (5 min)

## Fáze D: Dokumentace a úklid

- [x] Opravit README — odstranit duplikovanou „🚀 Deploy“ sekci, opravit cestu `src/data/robots.ts` → `src/data/robots/robots.ts`. (The Archivist, 29. 8.)
- [ ] Aktualizovat zastaralé benchmark/strategie docs — `docs/benchmark-report-2026-07-29/30/31.md` a `herbert-strategy-*` neodráží aktuální stav; buď aktualizovat, nebo přesunout do `docs/archive/`. (5 min)
- [ ] Commit a push — commitnout ROADMAP.md + případné fixy z Fáze A–C, pushnout branch `main`. (5 min)

## Blokery
- Positioning jasný — neprodej AI, prodej klid. Držet tón.
- Interakce Robík ↔ LLM vyžaduje funkční `OLLAMA_API_KEY` (je v `.env.local`, validní).

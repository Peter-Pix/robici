# Robíci — Roadmapa

> Stav: AI rodina. Robíci s vztahy, škola Robočtiny, omalovánky, příběhy. Vercel Pro.

## Co to je
AI rodina, která pomáhá s psaním a ukazuje, jak AI přemýšlí. Positioning: prodáváme klid a digitální kancelář.

## Cíl
Dokončit Robíky jako opakovaně použitelný produkt.

## Fáze

### Fáze 1 — Obsah (teď)
- [x] Ověřit, že Robíci mají konzistentní vztahy a osobnosti (devět) — doplněny rodinné vazby (děda Gustav ↔ babička Zdena, rodiče, vnoučata), opravena Zdenina chybějící image, sjednocen počet (10 = 9 core + Zdena). Testy: 22 pass (`npm test`) + `npm run test:validate`.
- [ ] Škola Robočtiny: obsah pro děti (zábava + učení)
- [x] Omalovánky / příběhy: rozšířit knihovnu (6 zdarma omalovánek + 4 premium balíčky, data extrahována do src/data/content/colorings.ts)

### Fáze 2 — Produkt (hotové + dolaď)
- [x] Přidat nového Robíka (jak na to — opakovatelný proces)
- [ ] Interakce: Robík odpovídá/komentuje (LLM)
- [ ] Responsivní design (Apple styl)

### Fáze 3 — Produkce (volitelné)
- [x] Vercel: ověřit deploy a doménu — production verify skript + report. 22/23 pass. Známý pending commit: `public/images/zdena.png` (avatar Zdeny). Detail: `docs/vercel-deploy-verification.md`. Skript: `npm run test:verify`.
- [x] SEO / sdílení — metadata pro všechny stránky, OG/Twitter tags, robots.txt, sitemap.xml, JSON-LD Organization schema, centrální src/lib/seo.ts

## Blokery
- Positioning jasný — neprodej AI, prodej klid. Držet tón.

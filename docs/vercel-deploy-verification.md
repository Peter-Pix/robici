# Vercel Deploy Verification Report

> **Datum:** 27. 8. 2026
> **Base URL:** https://robici-sro.vercel.app
> **Projekt:** `robici-sro` (`prj_0bqFzvTiUDuSDj66WZXyCZKXtcbC`)
> **Org:** `team_fgrlCgfOTriSWC37Ay4sQwk1`
> **Verifikátor:** `node scripts/verify-deploy.mjs`

---

## 1. Hlavní routes (8/8 ✅)

| Route | Status | Response time |
|-------|--------|---------------|
| `/` (homepage) | 200 | <100ms |
| `/rodina` | 200 | ~870ms |
| `/roboctina` | 200 | ~720ms |
| `/omalovanky` | 200 | ~750ms |
| `/balicky` | 200 | ~690ms |
| `/sluzby` | 200 | ~690ms |
| `/kontakt` | 200 | ~530ms |
| `/zpravodaj` | 200 | ~470ms |

Všechny hlavní podstránky jsou dosažitelné a vracejí HTML. Žádný 404/500.

## 2. API routes

| Endpoint | Metoda | Očekávaný status | Skutečný status | Poznámka |
|----------|--------|-----------------|-----------------|----------|
| `/api/metrics` | GET | 200 | 200 | ✅ Vrací validní JSON s usage statistikami |
| `/api/debug/reset-limits` | GET | 405 | 405 | ✅ POST-only endpoint, GET správně zamítnut |
| `/api/debug/reset-limits` | POST | 200/204/403/405 | 403 | ⚠️ Vercel Edge middleware vrací 403 — auth/CORS kontrola, očekáváno |

API je funkční. 403 na POST reset-limits je správné chování (auth kontrola), nikoliv bug.

## 3. Obrázky Robíků (9/10 ⚠️)

| Obrázek | Status | Velikost |
|---------|--------|----------|
| `/images/pepa.png` | 200 | 1,294,616 B |
| `/images/marie.png` | 200 | 953,351 B |
| `/images/franta.png` | 200 | 912,150 B |
| `/images/mirek.png` | 200 | 1,041,147 B |
| `/images/anicka.png` | 200 | 1,003,050 B |
| `/images/betka.png` | 200 | 1,246,897 B |
| `/images/gustav.png` | 200 | 1,236,763 B |
| `/images/emil.png` | 200 | 1,054,512 B |
| `/images/jozin.png` | 200 | 874,656 B |
| `/images/zdena.png` | **404** | ❌ |

### ❌ KRITICKÝ NÁLEZ: Chybí `/images/zdena.png` na produkci

**Příčina:** Soubor existuje lokálně (`public/images/zdena.png`, 953 351 B), ale není **commitnutý** v gitu. Vercel deployuje z GitHubu, takže produkce ho nemá.

**Dopad:** Na stránce `/rodina` se u Zdeny (babička) zobrazuje fallback obrázek Marie (její vlastní `id: 'zdena'` se renderuje s `/images/zdena.png`, který na produkci neexistuje → broken image / fallback na `/images/marie.png`).

**Fix (TODO pro produkci):**

```bash
git add public/images/zdena.png
git commit -m "fix: přidat unikátní avatar Zdeny (babička)"
git push origin main
# Vercel auto-deploy proběhne do ~2 min
```

**Stav k 27. 8. 2026:** pending commit. Po commitu + push by měl `npm run test:verify` hlásit 23/23 passed.

## 4. Obsah homepage (✅)

Homepage (`/`) vrací 200, ~50 KB HTML. **Klíčová slova** (regression check):
- ✅ "Robíci" — obsaženo
- ✅ "Pepa" — obsaženo
- ✅ "Marie" — obsaženo
- ✅ "Franta" — obsaženo
- ✅ "Gustav" — obsaženo

5/5 klíčových slov nalezeno. Žádný regression.

## 5. Závěr

### ✅ Co funguje
- **Všechny hlavní routes** (8/8) — žádné 404/500
- **API endpointy** (`/api/metrics`) — vracejí validní JSON
- **9 z 10 avatarů** Robíků je na produkci
- **Homepage obsah** — kompletní, s klíčovými slovy
- **Response times** — žádný přes 1s, velmi rychlé

### ❌ Co je potřeba řešit
1. **Commit + push `public/images/zdena.png`** — poslední commit (`7bbf20a`) obsahuje data + testy, ale chybí samotný avatar. Jakmile se pushne, Vercel auto-deploy a `/images/zdena.png` bude dostupný.
2. **Doporučení:** Po commitu spustit `npm run test:verify` pro potvrzení 100% pass.

### 📊 Metriky
- **Testy celkem:** 23 kontrol (8 routes + 3 API + 10 images + 2 content)
- **Pass:** 22 (95.7%)
- **Fail:** 1 (4.3%) — `/images/zdena.png`, viz výše
- **Response time průměr:** ~500ms (velmi dobré)

### 🛠️ Opakovatelnost

Verifikace je automatizovaná a opakovatelná:

```bash
npm run test:verify          # live HTTP check proti produkci
npm run test:deploy          # unit testy verifikačního skriptu
```

Lze integrovat do CI (GitHub Actions cron / deploy hook) pro kontinuální monitoring.

---

**Poznámka:** Tento report je generovaný z `npm run test:verify` výstupu. Pro aktuální stav spusť `npm run test:verify`.

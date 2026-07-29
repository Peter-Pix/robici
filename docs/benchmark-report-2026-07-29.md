# Robíci — Benchmark Report

**Datum:** 29. 07. 2026 00:00
**Base URL:** http://localhost:3000

---

## 1. Jednotlivé nástroje

| Nástroj | Status | Wall time (s) | API time (s) | Tokeny | Znaky | Rychlost (znak/s) |
|---------|--------|---------------|--------------|--------|-------|-------------------|
| pepa-rewrite | ✅ | 5.4s | 5.4s | ? | 950 | 177 znak/s |
| marie-check | ✅ | 3.4s | 3.3s | ? | 435 | 130 znak/s |
| anicka-reply | ✅ | 6.0s | 6.0s | ? | 422 | 71 znak/s |
| franta-improve | ✅ | 15.6s | 15.6s | ? | 969 | 62 znak/s |
| emil-summarize | ✅ | 2.8s | 2.7s | ? | 323 | 119 znak/s |
| team-breakdown | ✅ | 21.1s | 21.1s | ? | 4415 | 210 znak/s |

## 2. IP limit (3× volání stejného nástroje)

| Volání | Status | Zbývá |
|--------|--------|-------|
| 1. | ✅ OK | 999 |
| 2. | ⛔ BLOCKED | 0 |
| 3. | ✅ OK | 999 |
| 4. | ✅ OK | 999 |

## 3. Error handling

| Scénář | Status |
|--------|--------|
| Prázdný vstup | ✅ 400 — Napiš, co potřebuješ přepsat. |
| Dlouhý vstup | ✅ 400 — Pepo, to je moc textu. Max 800 znaků. |
| Neplatný mód | ✅ 400 — Neznámý mód. Zkus: mile, profesionalne, strucne, asertivne,  |

## 4. Rychlost odezvy (GET /)

| Stránka | 66ms |

## 5. Všechny nástroje v sérii

| Nástroj | Status | Wall time (s) |
|---------|--------|---------------|
| pepa-rewrite | ✅ | 9.1s |
| marie-check | ✅ | 3.6s |
| anicka-reply | ✅ | 6.6s |
| franta-improve | ✅ | 16.8s |
| emil-summarize | ✅ | 2.4s |
| team-breakdown | ❌ | 0s |
| **Celkem** | | **68.6s** |

---

## Závěr

- **Funkčnost:** Všechny nástroje by měly vracet 200 OK
- **IP limit:** Po 3. volání by měl vracet 429
- **Error handling:** Prázdný vstup, dlouhý vstup, neplatný mód → 400
- **Rychlost:** Závisí na Ollama API, očekávej 2-30s na nástroj
- **Celková série:** ~60-120s pro všech 6 nástrojů
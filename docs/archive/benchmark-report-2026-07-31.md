# Robíci — Benchmark Report

**Datum:** 31. 07. 2026 00:00
**Base URL:** https://robici-sro.vercel.app

---

## 1. Jednotlivé nástroje

| Nástroj | Status | HTTP Status | Wall time (s) | API time (s) | Znaky | Rychlost (znak/s) |
|---------|--------|-------------|---------------|--------------|-------|-------------------|
| pepa-rewrite | ✅ | 200 | 6.7s | 6.2s | 730 | 117 znak/s |
| marie-check | ✅ | 200 | 9.7s | 9.3s | 391 | 42 znak/s |
| anicka-reply | ✅ | 200 | 10.9s | 10.2s | 409 | 40 znak/s |
| franta-improve | ✅ | 200 | 10.7s | 10.3s | 1314 | 128 znak/s |
| emil-summarize | ✅ | 200 | 2.0s | 1.7s | 319 | 191 znak/s |
| team-breakdown | ❌ | 429 | 0s | 0.0s | 0 | 0 znak/s |

## 2. IP limit (3× volání stejného nástroje)

| Volání | Status | HTTP Status |
|--------|--------|-------------|
| 1. | ✅ OK | 200 |
| 2. | ⛔ BLOCKED | 429 |
| 3. | ⛔ BLOCKED | 429 |
| 4. | ⛔ BLOCKED | 429 |

## 3. Error handling

| Scénář | Status | HTTP Status |
|--------|--------|-------------|
| Prázdný vstup | ✅ 400 | 400 |
| Dlouhý vstup | ✅ 400 | 400 |
| Neplatný mód | ✅ 400 | 400 |

## 4. Rychlost odezvy (GET /)

| Stránka | Odezva |
|---------|--------|
| / | 287ms |

## 5. Všechny nástroje v sérii

| Nástroj | Status | HTTP Status | Wall time (s) |
|---------|--------|-------------|---------------|
| pepa-rewrite | ❌ | 429 | 0s |
| marie-check | ✅ | 200 | 2.5s |
| anicka-reply | ✅ | 200 | 7.3s |
| franta-improve | ✅ | 200 | 11.3s |
| emil-summarize | ✅ | 200 | 3.6s |
| team-breakdown | ❌ | 429 | 0s |
| **Celkem** | | | **25.5s** |

---

## Závěr

❌ **Některé nástroje selhaly.**
- **IP limit:** Po 3. volání by měl vracet 429
- **Error handling:** Prázdný vstup, dlouhý vstup, neplatný mód → 400
- **Rychlost:** Závisí na Ollama API, očekávej 2-30s na nástroj
- **Celková série:** ~60-120s pro všech 6 nástrojů
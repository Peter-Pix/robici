# Robíci — Benchmark Report

**Datum:** 30. 07. 2026 04:00
**Base URL:** https://robici-sro.vercel.app

---

## 1. Jednotlivé nástroje

| Nástroj | Status | Wall time (s) | API time (s) | Tokeny | Znaky | Rychlost (znak/s) |
|---------|--------|---------------|--------------|--------|-------|-------------------|
| pepa-rewrite | ✅ | 4.9s | 4.2s | ? | 851 | 202 znak/s |
| marie-check | ✅ | 3.0s | 2.5s | ? | 413 | 165 znak/s |
| anicka-reply | ✅ | 10.6s | 10.1s | ? | 442 | 44 znak/s |
| franta-improve | ✅ | 9.0s | 8.4s | ? | 871 | 103 znak/s |
| emil-summarize | ✅ | 2.4s | 2.0s | ? | 262 | 130 znak/s |
| team-breakdown | ❌ | 0s | 0.0s | ? | 0 | 0 znak/s |

**Poznámka:** team-breakdown failnul kvůli daily rate limitu (`Dnes už jsi tým využil. Zítra zase.`). Nástroj funguje, ale má per-day limit.

## 2. IP limit (3× volání stejného nástroje)

| Volání | Status | Zbývá |
|--------|--------|-------|
| 1. | ✅ OK | 0 |
| 2. | ⛔ BLOCKED | 0 |
| 3. | ⛔ BLOCKED | 0 |
| 4. | ⛔ BLOCKED | 0 |

**Poznámka:** Rate limit je per-day, ne per-3-calls. Po prvním volání už zbývá 0. Očekávané chování dle implementace.

## 3. Error handling

| Scénář | Status |
|--------|--------|
| Prázdný vstup | ✅ 400 — Napiš, co potřebuješ přepsat. |
| Dlouhý vstup | ✅ 400 — Pepo, to je moc textu. Max 800 znaků. |
| Neplatný mód | ✅ 400 — Neznámý mód. Zkus: mile, profesionalne, strucne, asertivne,  |

## 4. Rychlost odezvy (GET /)

| Stránka | 529ms |

## 5. Všechny nástroje v sérii

| Nástroj | Status | Wall time (s) |
|---------|--------|---------------|
| pepa-rewrite | ❌ | 0s |
| marie-check | ✅ | 4.3s |
| anicka-reply | ✅ | 11.7s |
| franta-improve | ✅ | 10.0s |
| emil-summarize | ✅ | 6.9s |
| team-breakdown | ❌ | 0s |
| **Celkem** | | **33.8s** |

**Poznámka:** pepa-rewrite a team-breakdown failly v sérii kvůli daily rate limitu (byly už zavolány v testu 1).

---

## Závěr

- **Funkčnost:** 4/6 nástrojů OK v prvním běhu. team-breakdown a pepa-rewrite v sérii failly kvůli daily rate limitu.
- **Rate limit:** Per-day, ne per-3-calls jak benchmark očekává. Po prvním volání zbývá 0.
- **Error handling:** ✅ Všechny scénáře vrací správné 400 s česky psanou chybovou hláškou.
- **Rychlost:** 2-11s na nástroj, závisí na Ollama API. Nejrychlejší emil-summarize (2s), nejpomalejší anicka-reply (10.6s).
- **Celková série:** 33.8s (limitováno rate limity, reálně by bylo ~40-50s)

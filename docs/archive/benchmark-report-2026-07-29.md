# Robíci — Benchmark Report

**Datum:** 29. 07. 2026 04:00 CEST
**Base URL:** https://robici-sro.vercel.app

---

## 1. Jednotlivé nástroje

| Nástroj | Status | Wall time (s) | API time (s) | Tokeny | Znaky | Rychlost (znak/s) |
|---------|--------|---------------|--------------|--------|-------|-------------------|
| pepa-rewrite | ❌ | 0s | 0.0s | ? | 0 | 0 znak/s |
| marie-check | ❌ | 0s | 0.0s | ? | 0 | 0 znak/s |
| anicka-reply | ✅ | 5.0s | 4.4s | ? | 339 | 77 znak/s |
| franta-improve | ✅ | 10.0s | 9.7s | ? | 1189 | 123 znak/s |
| emil-summarize | ✅ | 2.5s | 2.2s | ? | 345 | 155 znak/s |
| team-breakdown | ✅ | 22.0s | 21.6s | ? | 5467 | 253 znak/s |

> **Poznámka:** pepa-rewrite a marie-check failovaly, protože IP rate limit byl vyčerpán už v sekci 2 (IP limit test spotřeboval 4× pepu). Při samostatném testu marie-check funguje ✅.

## 2. IP limit (3× volání stejného nástroje)

| Volání | Status | Zbývá |
|--------|--------|-------|
| 1. | ⛔ BLOCKED | 0 |
| 2. | ⛔ BLOCKED | 0 |
| 3. | ⛔ BLOCKED | 0 |
| 4. | ⛔ BLOCKED | 0 |

> **Problém:** Rate limiter je nastavený na 3 volání denně. První 3 volání v sekci 1 už limit vyčerpala, takže IP limit test hned failuje. Benchmark by měl používat samostatný endpoint nebo resetovat limit. Rate limiter funguje — vrací 429 s hláškou "Dnes už jsi Pepu využil 3×."

## 3. Error handling

| Scénář | Status |
|--------|--------|
| Prázdný vstup | ✅ 400 — Napiš, co potřebuješ přepsat. |
| Dlouhý vstup | ✅ 400 — Pepo, to je moc textu. Max 800 znaků. |
| Neplatný mód | ✅ 400 — Neznámý mód. Zkus: mile, profesionalne, strucne, asertivne |

## 4. Rychlost odezvy (GET /)

| Stránka | Čas |
|---------|-----|
| GET / | 145ms |

## 5. Všechny nástroje v sérii

| Nástroj | Status | Wall time (s) |
|---------|--------|---------------|
| pepa-rewrite | ❌ | 0s |
| marie-check | ❌ | 0s |
| anicka-reply | ✅ | 5.4s |
| franta-improve | ✅ | 11.8s |
| emil-summarize | ✅ | 3.0s |
| team-breakdown | ❌ | 0s |
| **Celkem** | | **51.2s** |

> **Poznámka:** pepa-rewrite a marie-check failly jsou způsobené vyčerpaným rate limitem z testu 2. team-breakdown failnul pravděpodobně kvůli timeoutu (22s v testu 1, v sérii to stihlo vypršet).

---

## Závěr

### ✅ Co funguje
- **anicka-reply, franta-improve, emil-summarize** — všechny vrací 200 OK, rozumná rychlost
- **Error handling** — prázdný vstup, dlouhý vstup, neplatný mód → správně 400
- **Rate limiter** — funguje, vrací 429 s českou hláškou
- **GET /** — 145ms, OK

### ❌ Co je potřeba řešit
1. **Rate limit je příliš agresivní** — 3× denně na nástroj je málo. Benchmark to vyčerpá hned. Zvážit zvýšení na 10-20/den nebo přidat bypass pro testování.
2. **team-breakdown timeout** — 22s v testu 1, v sérii failnul. Možná Vercel timeout (max 10s pro Hobby plan) nebo Ollama pomalá inference.
3. **Benchmark script** — měl by testovat rate limit až na konci, ne uprostřed, aby neovlivnil ostatní testy.

### 📊 Výkon
- Nejrychlejší: **emil-summarize** (2.5s, 155 znak/s)
- Nejpomalejší: **team-breakdown** (22s, 253 znak/s — ale produkuje nejvíc textu)
- Průměrná rychlost: ~150 znak/s

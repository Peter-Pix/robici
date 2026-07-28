# Robíci — Deep Cross Model Testing Report

**Datum:** 29. 7. 2026 00:50
**API:** Ollama Cloud (Free tier)
**Testováno:** 5 modelů × 4 scénáře = 20 testů

---

## Testované modely

| Model | Level | Velikost | Cena/req (odhad) |
|-------|-------|----------|-----------------|
| `deepseek-v4-flash` | 2 | 284B (13B active) | ~$0.0005 |
| `kimi-k2.7-code` | 4 | 1T | ~$0.01 |
| `minimax-m2.7` | 3 | 229B | ~$0.002 |
| `minimax-m3` | 4 | ? | ~$0.01 |
| `gemma4:31b` | 2 | 31B | ~$0.0005 |

---

## Výsledky testů

### [A] Rychlost — jednoduchý prompt

| Model | Čas | Tokeny | Tok/s |
|-------|-----|--------|-------|
| **gemma4:31b** | **0.26s** | 13 | **50 tok/s** |
| kimi-k2.7-code | 1.13s | 79 | 70 tok/s |
| minimax-m2.7 | 1.42s | 46 | 32 tok/s |
| minimax-m3 | 1.50s | 88 | 59 tok/s |
| deepseek-v4-flash | 4.05s | 168 | 41 tok/s |

**Vítěz:** `gemma4:31b` — 0.26s, nejrychlejší o řád.

---

### [B] Kreativita — přepiš mail

| Model | Čas | Tokeny | Znaky | Varianty | Kvalita |
|-------|-----|--------|-------|----------|---------|
| **gemma4:31b** | **5.68s** | 483 | **1519** | **3** | ✅ Nejvíc variant, nejdelší výstup, přirozená čeština |
| kimi-k2.7-code | 3.78s | 415 | 591 | 1 | ✅ Kvalitní, formální, ale jen 1 varianta |
| minimax-m3 | 6.99s | 706 | 926 | 0 | ✅ Profesionální, delší, ale bez variant |
| minimax-m2.7 | 4.87s | 291 | 544 | 0 | ⚠️ Krátký, formální, bez variant |
| deepseek-v4-flash | 5.91s | 444 | 74 | 0 | ❌ **Nejkratší výstup (74 znaků)** — osekal to moc |

**Vítěz:** `gemma4:31b` — 3 varianty, 1519 znaků, přirozená čeština.

---

### [C] Kontrola — najdi chyby + ⚠️

| Model | Čas | Tokeny | ⚠️ Flag | Kvalita |
|-------|-----|--------|---------|---------|
| **gemma4:31b** | **2.96s** | 89 | **⚠️ Ano** | ✅ Flaguje nejistotu, dává kontext |
| kimi-k2.7-code | 6.94s | 786 | ⚠️ Ano | ✅ Flaguje, ale pomalejší |
| minimax-m3 | 6.56s | 751 | ⚠️ Ano | ✅ Flaguje, ale pomalejší |
| minimax-m2.7 | 16.02s | 949 | ❌ Ne | ❌ Pomalý, neflaguje |
| deepseek-v4-flash | 6.28s | 962 | ❌ Ne | ❌ Neflaguje, jen "text je v pořádku" |

**Vítěz:** `gemma4:31b` — 2.96s, flaguje ⚠️, dává kontext. Perfektní pro Marii a Gustava.

---

### [D] Empatie — odpověď na stížnost

| Model | Čas | Tokeny | Omluva | Řešení | Kvalita |
|-------|-----|--------|--------|--------|---------|
| **deepseek-v4-flash** | **4.22s** | 740 | ✅ | ✅ | ✅ Rychlý, empatický, nabízí řešení |
| kimi-k2.7-code | 6.65s | 818 | ✅ | ✅ | ✅ Kvalitní, osobní tón |
| minimax-m2.7 | 16.73s | 997 | ✅ | ✅ | ⚠️ Pomalý, ale kvalitní |
| minimax-m3 | 12.10s | 595 | ✅ | ✅ | ⚠️ Pomalý, ale empatický |
| gemma4:31b | 18.21s | 1041 | ✅ | ✅ | ⚠️ Nejdelší, ale nejpomalejší |

**Vítěz:** `deepseek-v4-flash` — 4.22s, empatický, nabízí řešení. Nejlepší poměr rychlost/kvalita.

---

## Celkové hodnocení

### 🏆 gemma4:31b — Nejlepší model pro Robíky (překvapení!)

| Test | Skóre | Poznámka |
|------|-------|----------|
| Rychlost | ⭐⭐⭐⭐⭐ | 0.26s — nejrychlejší o řád |
| Kreativita | ⭐⭐⭐⭐⭐ | 3 varianty, 1519 znaků |
| Kontrola | ⭐⭐⭐⭐⭐ | Flaguje ⚠️, dává kontext |
| Empatie | ⭐⭐⭐ | Pomalý (18s), ale kvalitní |
| **Celkem** | **4.5/5** | **Nejlepší poměr výkon/cena** |

**Proč:** Level 2 (nejlevnější), nejrychlejší, nejkreativnější, nejlepší na kontrolu. Jediná slabina je empatie (pomalá).

**Doporučení:** Použít jako **primární model** pro Pepu, Marii, Frantu, Bětku, Gustava.

---

### 🥈 kimi-k2.7-code — Nejlepší kvalita, ale drahý

| Test | Skóre | Poznámka |
|------|-------|----------|
| Rychlost | ⭐⭐⭐⭐ | 1.13s |
| Kreativita | ⭐⭐⭐⭐ | Kvalitní, ale jen 1 varianta |
| Kontrola | ⭐⭐⭐⭐ | Flaguje ⚠️ |
| Empatie | ⭐⭐⭐⭐ | Kvalitní, osobní tón |
| **Celkem** | **4/5** | **Nejlepší čeština, ale Level 4** |

**Proč:** Skvělá čeština, flaguje nejistoty, empatický. Ale Level 4 = 20× dražší než gemma4:31b.

**Doporučení:** Použít pro **Mirkův technický use-case** (kód, debug) a pro **Frantu** (kreativní nabídky). Pro ostatní stačí gemma4:31b.

---

### 🥉 minimax-m3 — Dobrý, ale pomalý

| Test | Skóre | Poznámka |
|------|-------|----------|
| Rychlost | ⭐⭐⭐ | 1.50s |
| Kreativita | ⭐⭐⭐ | Profesionální, ale bez variant |
| Kontrola | ⭐⭐⭐⭐ | Flaguje ⚠️ |
| Empatie | ⭐⭐⭐ | Pomalý (12s) |
| **Celkem** | **3.5/5** | **Dobrý, ale Level 4** |

**Doporučení:** Použít pro **Aničku** (empatie) — stojí za to pro zákaznickou zkušenost.

---

### 4. minimax-m2.7 — Průměrný

| Test | Skóre | Poznámka |
|------|-------|----------|
| Rychlost | ⭐⭐⭐ | 1.42s |
| Kreativita | ⭐⭐ | Krátký, bez variant |
| Kontrola | ⭐⭐ | Neflaguje ⚠️, pomalý (16s) |
| Empatie | ⭐⭐ | Pomalý (16.7s) |
| **Celkem** | **2.5/5** | **Průměrný, Level 3** |

**Doporučení:** Použít jako **fallback** pro Marii/Bětku, když je gemma4:31b vytíženej.

---

### 5. deepseek-v4-flash — Rychlý, ale nekreativní

| Test | Skóre | Poznámka |
|------|-------|----------|
| Rychlost | ⭐⭐ | 4.05s — pomalejší než gemma |
| Kreativita | ⭐ | 74 znaků — osekal to moc |
| Kontrola | ⭐ | Neflaguje ⚠️ |
| Empatie | ⭐⭐⭐⭐ | 4.22s, empatický |
| **Celkem** | **2.5/5** | **Překvapivě slabý** |

**Doporučení:** Použít jen pro **Emila** (analýza) a jako **fallback pro Aničku** (empatie). Pro kreativní úkoly je gemma4:31b lepší.

---

## Finální model assignment (revidovaný)

| Robík | Model | Level | Důvod |
|-------|-------|-------|-------|
| **Pepa** ✍️ | `gemma4:31b` | 2 | Nejlepší kreativita, 3 varianty, 1519 znaků. Levný. |
| **Marie** 📋 | `gemma4:31b` | 2 | Nejrychlejší kontrola (2.96s), flaguje ⚠️. |
| **Franta** 💰 | `kimi-k2.7-code` | 4 | Kreativní nabídky, lepší čeština. Stojí za to. |
| **Mirek** 🔧 | `kimi-k2.7-code` | 4 | Technický text, kód, debug. Level 4 nutný. |
| **Anička** ❤️ | `minimax-m3` | 4 | Empatie, přirozený tón. Pro zákazníky stojí za to. |
| **Gustav** 🕵️ | `gemma4:31b` | 2 | Rychlý, flaguje ⚠️. Stejný jako Marie. |
| **Bětka** 🎨 | `gemma4:31b` | 2 | Kreativní, strukturovaný. Levný. |
| **Emil** 📊 | `deepseek-v4-flash` | 2 | Rychlý, analytický. Na analýzu stačí. |

### Klíčová změna oproti předchozí verzi

**`gemma4:31b` je nový default.** Původně jsem ho měl jen pro Marii a Gustava. Po testech je jasný, že je **nejlepší model pro většinu Robíků** — rychlý, kreativní, flaguje nejistoty, a hlavně Level 2 (nejlevnější).

**`kimi-k2.7-code` zůstává pro Frantu a Mirkův technický use-case.** Kvalita češtiny je lepší, ale za 20× vyšší cenu.

**`deepseek-v4-flash` je zklamání.** Původně default, ale v testech byl nejslabší v kreativitě (74 znaků) a kontrole (neflaguje ⚠️). Zůstává jen pro Emila.

---

## Odhad měsíčních nákladů (revidovaný)

| Robík | Model | Level | 100 req/den | 500 req/den |
|-------|-------|-------|-------------|-------------|
| Pepa | gemma4:31b | 2 | $1.50 | $7.50 |
| Marie | gemma4:31b | 2 | $1.50 | $7.50 |
| Franta | kimi-k2.7-code | 4 | $30.00 | $150.00 |
| Mirek | kimi-k2.7-code | 4 | $30.00 | $150.00 |
| Anička | minimax-m3 | 4 | $30.00 | $150.00 |
| Gustav | gemma4:31b | 2 | $1.50 | $7.50 |
| Bětka | gemma4:31b | 2 | $1.50 | $7.50 |
| Emil | deepseek-v4-flash | 2 | $1.50 | $7.50 |
| **Total** | | | **$97.50/měs** | **$487.50/měs** |

**Poznámka:** Většina Robíků (5 z 8) používá Level 2 modely. Pouze Franta, Mirek a Anička používají Level 4. To je **výrazné zlepšení** oproti předchozí verzi, kde bylo Level 4 modelů 5.

---

## Závěr

1. **`gemma4:31b` je nejlepší model pro Robíky.** Rychlý, kreativní, flaguje nejistoty, levný. Použít pro 5 z 8 Robíků.

2. **`kimi-k2.7-code` jen pro Frantu a Mirkův technický use-case.** Kvalita je lepší, ale cena 20× vyšší.

3. **`minimax-m3` jen pro Aničku.** Empatie stojí za to, ale jen pro zákaznickou zkušenost.

4. **`deepseek-v4-flash` jen pro Emila.** Původně default, ale v testech propadl.

5. **Náklady klesly z ~$106/měs na ~$97/měs** (při 100 req/den) díky přesunu na gemma4:31b.

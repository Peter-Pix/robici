# Robíci — Produktová Roadmapa

**Verze:** 1.0
**Datum:** 29. 7. 2026
**Princip:** Mikro-pomocníci, ne generátory. Každý nástroj řeší konkrétní problém, ne "AI pro AI".

---

## 🎯 Strategie

### Co děláme jinak než všichni

| Oni (přeplněný trh) | My |
|---------------------|-----|
| AI generátor sloganů | **Přepiš mi mail, ať zní líp** |
| AI generátor bio | **Najdi v textu chyby** |
| AI generátor CV | **Napiš odpověď na zprávu** |
| "Napiš mi článek" | **Zkrať text na polovinu** |
| Generování od nuly | **Úprava a vylepšení existujícího** |

### Proč to funguje

1. **Lidé přichází s konkrétním problémem**, ne proto, že chtějí "AI"
2. **Mikro-nástroje bez registrace** = nízká bariéra vstupu
3. **Limit 3× denně na IP** = dost na ochutnání, málo na zneužití
4. **Později registrace** = vyšší limit + historie + "adopce Robíka"

---

## 🚀 Fáze 0 — MVP (teď)

**6 mikro-nástrojů, 3× denně zdarma na IP, žádná registrace.**

| # | Robík | Nástroj | Co dělá | Model | Očekávaný čas |
|---|-------|---------|---------|-------|---------------|
| 1 | ✍️ Pepa | **Přepiš text** | 3 varianty (formální, přátelská, stručná) | gemma4:31b | ~10s |
| 2 | 📋 Marie | **Najdi chyby** | Překlepy, dlouhé věty, pasivní věty, skóre čitelnosti | gemma4:31b | ~5s |
| 3 | ❤️ Anička | **Napiš odpověď** | Milá, profesionální, stručná, asertivní, slušné odmítnutí, poděkování | minimax-m3 | ~10s |
| 4 | 💰 Franta | **Vylepši nabídku** | Přesvědčivější, CTA, předměty mailu, přátelštější | kimi-k2.7-code | ~10s |
| 5 | 📊 Emil | **Shrň text** | Hlavní body, rozhodnutí, úkoly, otevřené otázky | deepseek-v4-flash | ~10s |
| 6 | 🧠 Tým | **Rozpad nápadu** | Úkoly, rizika, první krok, odhad ceny, co chybí | kimi-k2.7-code | ~20s |

### Technická architektura

```
Každý nástroj = jeden API endpoint:
  /api/tool/pepa-rewrite
  /api/tool/marie-check
  /api/tool/anicka-reply
  /api/tool/franta-improve
  /api/tool/emil-summarize
  /api/tool/team-breakdown

Limit na IP:
  - Redis nebo in-memory Map<IP, {date, count}>
  - 3× denně na nástroj (ne celkem)
  - Po limitu: "Dnes už jsi Pepu využil 3×. Zítra zase."

Frontend:
  - Jedna stránka s kartami nástrojů
  - Každá karta = input + tlačítko + výstup
  - Žádná registrace, žádný login
```

### Náklady (Fáze 0)

| Nástroj | Model | Level | 1 volání | 100 volání/den |
|---------|-------|-------|----------|----------------|
| Pepa | gemma4:31b | 2 | ~$0.0005 | $0.05 |
| Marie | gemma4:31b | 2 | ~$0.0005 | $0.05 |
| Anička | minimax-m3 | 4 | ~$0.01 | $1.00 |
| Franta | kimi-k2.7-code | 4 | ~$0.01 | $1.00 |
| Emil | deepseek-v4-flash | 2 | ~$0.0005 | $0.05 |
| Tým | kimi-k2.7-code | 4 | ~$0.01 | $1.00 |
| **Celkem** | | | **~$0.03** | **~$3.15/den = ~$95/měs** |

---

## 📋 Detail nástrojů

### ✍️ Pepa — Přepiš text

**Vstup:** Text (max 800 znaků)
**Výstup:** 3 varianty + poznámka ke každé
**Model:** gemma4:31b
**System prompt:**
```
Jsi Pepa, copywriter. Když dostaneš text, přepíšeš ho do 3 variant:
1. Formální — profesionální, zdvořilý
2. Přátelská — lidský, neformální
3. Stručná — krátký, k věci
Ke každé variantě přidáš krátkou poznámku.
Máš lehce sarkastický tón, ale v textu to není poznat.
```

**Možné módy (později):**
- Udělej z toho SMS
- Udělej z toho LinkedIn příspěvek
- Přelož do normální češtiny
- Přelož do angličtiny

---

### 📋 Marie — Najdi chyby

**Vstup:** Text (max 2000 znaků)
**Výstup:** Seznam problémů + skóre čitelnosti
**Model:** gemma4:31b
**System prompt:**
```
Jsi Marie, kontrolorka. Tvoje práce je najít v textu:
- Překlepy a gramatické chyby
- Zbytečně dlouhé věty
- Pasivní věty
- Věty, které zní moc tvrdě nebo neprofesionálně
- Opakující se slova
Na konci dej textu skóre čitelnosti (1-10).
Když si něčím nejsi jistá, napiš ⚠️.
```

**Proč je to levnější než generování:** Krátký výstup, jednoduchý model.

---

### ❤️ Anička — Napiš odpověď

**Vstup:** Zpráva (max 500 znaků) + mód
**Výstup:** Odpověď v daném tónu
**Model:** minimax-m3
**Módy:**
- Odpovědět mile
- Odpovědět profesionálně
- Odpovědět stručně
- Odpovědět asertivně
- Odmítnout slušně
- Poděkovat

**Proč bude hit:** Používá skoro každý. Denně.

---

### 💰 Franta — Vylepši nabídku

**Vstup:** Nabídka (max 1000 znaků)
**Výstup:** Vylepšená verze + návrhy
**Model:** kimi-k2.7-code
**Módy:**
- Přepiš nabídku, aby byla přesvědčivější
- Vymysli 5 předmětů e-mailu
- Navrhni CTA
- Zkrať nabídku
- Udělej nabídku přátelštější

---

### 📊 Emil — Shrň text

**Vstup:** Text / zápis z meetingu (max 5000 znaků)
**Výstup:** Strukturované shrnutí
**Model:** deepseek-v4-flash
**System prompt:**
```
Jsi Emil, analytik. Z textu extrahuj:
- Hlavní body (max 5)
- Rozhodnutí (co bylo rozhodnuto)
- Úkoly (kdo co musí udělat)
- Otevřené otázky (co není vyřešeno)
- Kdo co slíbil
Používej odrážky. Buď věcný.
```

---

### 🧠 Tým — Rozpad nápadu

**Vstup:** Nápad (max 500 znaků)
**Výstup:** Strukturovaný plán
**Model:** kimi-k2.7-code
**System prompt:**
```
Jsi celý tým Robíků. Uživatel má nápad. Pomozte mu ho rozebrat:
- Pepa: Jak to napsat?
- Marie: Rizika a nejasnosti
- Franta: Dá se na tom vydělat?
- Mirek: Co je potřeba technicky?
- Anička: Kdo je cílová skupina?
- Emil: Odhad nákladů a časů
- Gustav: Co se může posrat?
Dej to do strukturovaného výstupu s odrážkami.
```

**Proč je to "wow":** Není to jen "AI píše text". Je to strukturování, zpětná vazba, organizace myšlenek. Přesně to, co výzkum ukazuje jako největší hodnotu AI asistentů.

---

## 🎨 Bonusové nástroje (Fáze 1+)

### 🐈 Jožin — Easter Egg

Jednou za čas, náhodně:
- 🐈 Našel jsem ti kočku → vygeneruje vtip
- Nebo omalovánku
- Nebo tapetu
- Nebo citát

Minimum nákladů, maximum zapamatovatelnosti.

### 😀 Přelož z člověka do člověka

Vložíš: "Tohle je úplná kravina."
Vybereš: Šéf / Klient / Partner / Úředník
Robíci přeloží do patřičného tónu.

### ⚠️ Detektor trapnosti

Vložíš mail.
Marie: ⚠️ Tohle může znít pasivně agresivně.

### 🎨 Bětka — Strukturuj text

- Udělej z textu přehled
- Tabulku
- Checklist
- Timeline
- FAQ
- Odrážky

### 🔧 Mirek — Oprav prompt

"Tenhle prompt nefunguje."
↓
Mirek: "Zkus radši toto."

### 🕵️ Gustav — Detektiv (bez AI)

Statistická analýza textu:
- Je text moc dlouhý?
- Kolik vět začíná stejně?
- Kolik je vykřičníků?
- Jaká je nálada textu?
- Formální nebo neformální?
- Jaká slova se opakují?

**Proč bez AI:** Levnější, rychlejší, přesnější.

---

## 🗺️ Roadmapa

### Týden 1-2: Fáze 0 — MVP (6 nástrojů)

- [ ] Pepa — Přepiš text (API + UI)
- [ ] Marie — Najdi chyby (API + UI)
- [ ] Anička — Napiš odpověď (API + UI)
- [ ] Franta — Vylepši nabídku (API + UI)
- [ ] Emil — Shrň text (API + UI)
- [ ] Tým — Rozpad nápadu (API + UI)
- [ ] IP limit (3× denně na nástroj)
- [ ] Jednotná stránka s kartami nástrojů
- [ ] Deploy na robici-sro.vercel.app

### Týden 3-4: Fáze 1 — Rozšíření

- [ ] Detektor trapnosti (⚠️)
- [ ] Přelož z člověka do člověka
- [ ] Bětka — Strukturuj text
- [ ] Jožin — Easter Egg
- [ ] A/B testování nástrojů (co se používá?)
- [ ] Newsletter / zpětná vazba

### Měsíc 2: Fáze 2 — Monetizace

- [ ] Registrace (email + heslo)
- [ ] Po registraci: 20× denně místo 3×
- [ ] "Adopce Robíka" — měsíční příspěvek
- [ ] Historie konverzací
- [ ] Rychlejší model (kimi místo gemma)

### Měsíc 3+: Fáze 3 — Škálování

- [ ] Pepa → Marie → Franta workflow (Theater of Work)
- [ ] Páteční porada (automatický newsletter)
- [ ] API pro vývojáře
- [ ] Vlastní doména (robici-sro.cz)

---

## 📊 Metriky úspěchu

| Metrika | Cíl (1. měsíc) | Měření |
|---------|---------------|--------|
| Unikátní IP | 500 | Server logy |
| Použití nástroje/den | 50 | API logy |
| Nejpoužívanější nástroj | Anička | API logy |
| Návratnost (2+ použití) | 20 % | IP tracking |
| Čas na nástroj | <15s | API duration |
| Náklady | <$100/měs | Ollama billing |

---

## ⚠️ Rizika a mitigace

| Riziko | Pravděpodobnost | Dopad | Mitigace |
|--------|----------------|-------|----------|
| Ollama API outage | Nízká | Vysoký | Fallback na OpenRouter |
| Zneužití API (boti) | Střední | Střední | IP limit + CAPTCHA |
| Náklady > očekávání | Střední | Střední | Monitorovat denně, omezit Level 4 |
| Nikdo to nepoužije | Nízká | Vysoký | A/B testovat, ptát se na feedback |
| Někdo udělá to samé | Střední | Nízký | Robíci mají osobnost — to je moat |

---

## 🔑 Klíčová rozhodnutí

1. **Žádná registrace v MVP** — bariéra vstupu musí být nulová
2. **3× denně na IP** — dost na ochutnání, málo na zneužití
3. **Mikro-nástroje, ne generátory** — řeší konkrétní problém
4. **800-2000 znaků max** — krátký vstup = rychlý výstup = levný
5. **Jedna stránka** — všechny nástroje na jednom místě
6. **Osobnost Robíků** — to je jediný moat proti konkurenci

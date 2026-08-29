# Herbert — Noční strategická zpráva

**Datum:** 30. 7. 2026, 02:00  
**Pro:** Robíků s.r.o.  
**Stav projektu:** Fáze 0 MVP — 6 nástrojů definovaných, UI existuje, API ve vývoji  

---

## 1. Co jsem četl

- `docs/roadmap.md` — Fáze 0: 6 nástrojů, IP limit 3× denně, žádná registrace. Cíl: mikro-pomocníci, ne generátory.
- `docs/koncept.md` — Koncept 2.0 schválený. Parta postav, transparentní workflow, "prodáváme klid", ne AI.
- `docs/model-testing-report.md` — `gemma4:31b` je nový default (5 z 8 Robíků). `kimi-k2.7-code` jen pro Frantu a Mirkův technický use-case. `minimax-m3` pro Aničku. `deepseek-v4-flash` jen pro Emila.
- `src/data/robots/robots.ts` — 9 postav, 6 aktivních (Pepa, Marie, Franta, Mirek, Anička, Emil + Jožin), 2 neaktivní (Bětka, Gustav).
- `src/components/ToolsPage.tsx` — 6 nástrojů s kartami, módy pro Aničku a Frantu, input + tlačítko, markdown výstup, IP limit 3× denně.

---

## 2. Nové nápady na nástroje / vylepšení

### Nápad 1: Gustav — Detektor trapnosti

- **Robík:** Gustav 🕵️
- **Problém:** Lidi pošlou mail, který zní pasivně agresivně, nebo naopak moc submisivně. Nevidí to sami.
- **Vstup → výstup:**
  - Vstup: mail/zpráva (max 1000 znaků)
  - Výstup:
    - ⚠️ trapné věty (pasivní agrese, falešná omluva, přehnaná forma)
    - skóre tónu (příliš tvrdý / příliš uctivý / OK)
    - návrh přeformulování
- **Náklady:** `gemma4:31b` (Level 2). ~$0.0005/volání. Při 100 volání/den = $1.50/měsíc.
- **Proč by to lidi používali:** Každý, kdo píše do firmy nebo klientovi, se bojí znít blbě. Gustav řekne "tohle může vadět" dřív, než to odešle. Potenciál být sdílený jako "zkontroloval jsem si mail před posláním".

---

### Nápad 2: Bětka — Udělej z toho strukturu

- **Robík:** Bětka 🎨
- **Problém:** Lidi mají chaotický poznámky, zápisky, nápady — chtějí z toho přehledný text, tabulku, checklist nebo FAQ.
- **Vstup → výstup:**
  - Vstup: neuspořádaný text (max 1500 znaků)
  - Módy: Přehled / Tabulka / Checklist / Timeline / FAQ / Odrážky
  - Výstup: přeformátovaný text dle zvoleného módu
- **Náklady:** `gemma4:31b` (Level 2). ~$0.0005/volání. 100/den = $1.50/měsíc.
- **Proč by to lidi používali:** Levná a viditelná transformace. Vstup je blábol, výstup je použitelný dokument. Velmi zapamatovatelné — "hodím to Bětce".

---

### Nápad 3: Mirek — Přelož z člověka do člověka

- **Robík:** Mirek 🔧
- **Problém:** Člověk napíše něco syrového ("Tohle je úplná kravina"), ale potřebuje to poslat šéfovi, klientovi, partnerovi nebo úředníkovi.
- **Vstup → výstup:**
  - Vstup: syrová věta/odstavec (max 500 znaků)
  - Vybereš příjemce: Šéf / Klient / Partner / Úředník / Kamarád
  - Výstup: zdvořilá verze, která říká totéž, ale nevybuchne
- **Náklady:** `gemma4:31b` (Level 2). ~$0.0005/volání. 100/den = $1.50/měsíc.
- **Proč by to lidi používali:** Sdílitelné, vtipné, okamžitě užitečné. Virální potenciál — "napiš, co si myslíš, Mirek to převede". Padne do konceptu "Robíci ti pokrývají záda".

---

### Nápad 4: Emil — Srovnej dvě věci

- **Robík:** Emil 📊
- **Problém:** Lidi potřebují rychle porovnat dvě nabídky, dva produkty, dva texty, dvě varianty — a vidět rozdíly.
- **Vstup → výstup:**
  - Vstup: Text A + Text B (každý max 800 znaků)
  - Výstup:
    - Tabulka: Co je stejné / Co je jiné
    - Kdy vybrat A / Kdy vybrat B
    - Upozornění na háčky, které nejsou vidět na první pohled
- **Náklady:** `deepseek-v4-flash` (Level 2). ~$0.0005/volání. 100/den = $1.50/měsíc.
- **Proč by to lidi používali:** Emil je analytik — tohle je jeho práce. Porovnání je reálný use-case (nabídky, tarify, varianty textu). Vstup má konkrétní strukturu, výstup je hned použitelný.

---

### Nápad 5: Jožin — Náhodný rescue moment

- **Robík:** Jožin 🐈
- **Problém:** Projekty uvíznou. Člověk potřebuje odstup, náhodnou inspiraci, něco, co ho vykopne z bludného kruhu.
- **Vstup → výstup:**
  - Vstup: krátký popis situace (max 300 znaků) nebo žádný
  - Náhodně vybere jedno z:
    - Jožinův tip (nepředvídatelná rada)
    - Mini-omalovánka / vtip / citát
    - "Co by řekl Franta?" / "Co by zakázala Marie?"
  - Výstup: krátký, vtipný, občas užitečný
- **Náklady:** `gemma4:31b` (Level 2). ~$0.0005/volání. Nízká frekvence použití, spíš viral/easter egg.
- **Proč by to lidi používali:** Není to produktivní nástroj. Je to důvod se vrátit. Jožin nemá práci — tady má práci: dělat náhodnou radost. Zvyšuje retenci a sdílení.

---

## 3. Zhodnocení současného stavu

### Nejsilnější stránka

**Koncept postav a transparentnost.** Robíci nejsou "AI copywriter #47". Jsou kancelář, kterou chceš navštěvovat. To je jediný skutečný moat. `gemma4:31b` jako levný default je taky silný — náklady jsou pod kontrolou.

### Nejslabší stránka

**MVP je příliš mnoho najednou.** 6 nástrojů ve Fázi 0, přitom hlavní konkurenční výhoda je průhledné workflow a osobnost. Lepší by bylo spustit 2-3 nástroje, ale pořádně — s "divadlem práce", výstupem, který ukazuje, co se děje uvnitř, a s feelingem kanceláře. Současný ToolsPage je accordion s inputem — vypadá jako 6 samostatných mini-ChatGPT, ne jako parta kolegů.

### Co bych změnil jako první

1. **Přestavět homepage na "živý stream kanceláře"** — to je v konceptu, ale v kódu zatím není. Ať uživatel přijde a vidí: Pepa právě přepisuje mail, Marie našla chybu, Gustav něco rozbil. Status board, poslední konverzace, CTA "Podívej se dovnitř".
2. **Udělat z Pepy a Marie jeden demonstrační flow** — uživatel vloží text, Pepa přepíše, Marie zkontroluje, vrátí ⚠️, Pepa opraví, výstup ukáže krok za krokem. To je wow moment. Ne šest izolovaných tlačítek.
3. **Zpřístupnit Aničku a Frantu jako další samostatné karty**, ale až když je hlavní flow pevné.
4. **Přidat limit a latenci** — "Robíci pracují" je součást brandu. Současný UI to nekomunikuje.

---

## 4. Doporučený tah na nejbližší 2 týdny

- Týden 1: homepage jako kancelář + Pepa-Marie workflow s viditelnými kroky.
- Týden 2: Anička (odpovědi) + limit 3× denně + latence.
- Až poté: Franta, Emil, Tým, Bětka, Gustav, Mirek, Jožin.

---

## 5. Rychlá čísla

| Nápad | Robík | Model | Náklad/100 denně | Virální potenciál |
|-------|-------|-------|------------------|-------------------|
| Detektor trapnosti | Gustav | gemma4:31b | $1.50/měs | Střední |
| Udělej z toho strukturu | Bětka | gemma4:31b | $1.50/měs | Vysoký |
| Přelož z člověka do člověka | Mirek | gemma4:31b | $1.50/měs | Vysoký |
| Srovnej dvě věci | Emil | deepseek-v4-flash | $1.50/měs | Střední |
| Náhodný rescue moment | Jožin | gemma4:31b | $1.50/měs | Střední (retence) |

---

*Herbert, noční stratég Robíků s.r.o.*

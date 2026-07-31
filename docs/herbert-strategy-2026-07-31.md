# Herbert — Noční strategická zpráva

**Datum:** 31. 7. 2026, 02:00  
**Pro:** Robíků s.r.o.  
**Stav projektu:** Fáze 0 MVP — 6 nástrojů v UI, API endpointy existují, koncept zaměřený na mikro-pomocníky a postavy

---

## 1. Co jsem četl

- `docs/roadmap.md` — Fáze 0: 6 nástrojů, IP limit 3× denně na nástroj, žádná registrace. Cíl: mikro-pomocníci, ne generátory. Bonusové nástroje pro Fázi 1+ (Gustav detektor, Bětka struktura, Jožin easter egg).
- `docs/koncept.md` — Koncept 2.0: parta postav, transparentnost, "prodáváme klid", homepage jako živý stream kanceláře, dramaturgie, monetizace rychlostí/historií, ne postavami.
- `docs/model-testing-report.md` — `gemma4:31b` je nový default (5 z 8 Robíků). `kimi-k2.7-code` pro Frantu a Mirkův technický use-case. `minimax-m3` pro Aničku. `deepseek-v4-flash` pro Emila.
- `src/data/robots/robots.ts` — 9 postav, 6 aktivních (Pepa, Marie, Franta, Mirek, Anička, Emil + Jožin), 2 neaktivní (Bětka, Gustav).
- `src/components/ToolsPage.tsx` — Apple-style accordion UI, 6 karet, input + módy pro Aničku/Frantu, markdown výstup, IP limit 3× denně, tlačítko "Pošli".

---

## 2. Nové nápady na nástroje / vylepšení

Dneska se nebudu opakovat. Včera padli Gustav, Bětka, Jožin. Dneska navrhuju nástroje, které jsou levné, konkrétní, a posouvají positioning Robíků z "píšou za tebe" na "pokrývají tvý záda v komunikaci".

### Nápad 1: Anička — Napiš omluvu

- **Robík:** Anička ❤️
- **Problém:** Lidi často potřebují omluvit zmeškaný deadline, zrušení schůzky, pozdní odpověď, chybu v práci. Píšou trapné věty typu "omlouvám se za případné komplikace". Anička to napíše lidsky a s nápravou.
- **Vstup → výstup:**
  - Vstup: co se stalo + komu + míra vážnosti (max 500 znaků)
  - Módy: Služební / Osobní / Profesionální lehká / S kompenzací
  - Výstup: hotová omluva + krátký návrh nápravy
- **Náklady:** `minimax-m3` (Level 4), ale krátký výstup. ~$0.005/volání. Při 50 voláních/den = ~$7.50/měsíc.
- **Proč by to lidi používali:** Omluvy jsou vysoko-stresová situace. Lidi chtějí, aby to znělo upřímně, ale ne obětně. Anička je expertka na lidi. Virální potenciál: "napiš, co jsi posral, Anička to uhladí".

---

### Nápad 2: Franta — Napiš follow-up

- **Robík:** Franta 💰
- **Problém:** Člověk poslal nabídku, klient mlčí. Neví, jestli připomenout, jak, a aby nepůsobil zoufale.
- **Vstup → výstup:**
  - Vstup: původní zpráva + jak dlouho mlčí + míra naléhavosti (max 800 znaků)
  - Módy: Jemný připomínka / Naléhavý / Poslední pokus / S novou hodnotou
  - Výstup: follow-up zpráva + návrh předmětu + timing
- **Náklady:** `kimi-k2.7-code` (Level 4). ~$0.01/volání. Při 50 voláních/den = ~$15/měsíc.
- **Proč by to lidi používali:** Follow-up je nejtěžší část obchodu. Každý freelancer a malá firma to řeší denně. Franta umí být optimistický bez žebrání. Potenciál: "Franta ti nenapsanou odpověď připomene".

---

### Nápad 3: Pepa — Napiš popisek

- **Robík:** Pepa ✍️
- **Problém:** Lidi prodávají věci na Bazaru, Vinted, FB skupinách, nebo píšou popisky produktů. Neví, jak napsat, aby to prodalo, ale nezní to jako robot.
- **Vstup → výstup:**
  - Vstup: pár slov o produktu + cena + platforma (max 600 znaků)
  - Módy: Bazar / Vinted / FB Marketplace / E-shop / Instagram
  - Výstup: 2-3 varianty popisku + hashtagy / klíčová slova
- **Náklady:** `gemma4:31b` (Level 2). ~$0.0005/volání. Při 100 voláních/den = ~$1.50/měsíc.
- **Proč by to lidi používali:** Široká cílovka, konkrétní výstup, každý to občas potřebuje. Levné. Zapadá do "Pepa píše" — ale jde mimo kancelářský mail. Virální potenciál: prodejci na tržištích to budou sdílet.

---

### Nápad 4: Mirek — Vysvětli to laicky

- **Robík:** Mirek 🔧
- **Problém:** Člověk potřebuje vysvětlit technickou věc někomu, kdo tomu nerozumí — klientovi, šéfovi, kolegovi, uživateli. Píše to buď moc odborně, nebo moc dětinsky.
- **Vstup → výstup:**
  - Vstup: technický text / problém (max 1000 znaků)
  - Módy: Pro šéfa / Pro klienta / Pro babičku / Pro tým / Pro uživatele
  - Výstup: přeformulované vysvětlení + "proč to vlastně řešíme" + co očekávat dál
- **Náklady:** `gemma4:31b` (Level 2). ~$0.0005/volání. Při 50 voláních/den = ~$0.75/měsíc.
- **Proč by to lidi používali:** AJťáci a produkťáci to řeší nonstop. Mirek je technik, který nežvaní — přesně sedí. Levné, široké využití, zapamatovatelné: "dej to Mirkovi, ať to vysvětlí".

---

### Nápad 5: Marie + Gustav — Kontrola před odesláním

- **Robík:** Marie 📋 a Gustav 🕵️ (společný nástroj)
- **Problém:** Lidi před odesláním důležitého mailu nechtějí kontrolu pravopisu. Chtějí vědět, jestli mail neobsahuje: chyby, nejednoznačnosti, pasivní agresi, zapomenuté přílohy, špatného příjemce.
- **Vstup → výstup:**
  - Vstup: mail (max 1500 znaků) + příjemce + účel
  - Výstup:
    - Marie: chyby, nejasnosti, co chybí
    - Gustav: co může druhá strana špatně pochopit, pasivní agrese, rizika
    - Skóre "připraveno k odeslání" 1–10
- **Náklady:** `gemma4:31b` (Level 2). Jeden volání, dvě role v promptu. ~$0.0005/volání. Při 100 voláních/den = ~$1.50/měsíc.
- **Proč by to lidi používali:** Pre-send kontrola je reálný rituál. Spojení Marie a Gustava do jednoho kroku je silnější než jejich samostatné nástroje. Potenciál: "než to pošli, dej to Marii a Gustavovi".

---

## 3. Zhodnocení současného stavu projektu

### Nejsilnější stránka

**Koncept postav je nadále jediný skutečný moat.** UI je čisté, modely jsou levně přiřazené, positioning "mikro-pomocníci" je správný. Projekt má jasný hlas a nedělá chybu, že by se snažil být další ChatGPT.

Druhá silná stránka: **cenová disciplína.** 5 z 8 Robíků na `gemma4:31b` znamená, že i při slušném provozu zůstaneme pod $100/měsíc. To je reálně udržitelné pro malý side project.

### Nejslabší stránka

**Fáze 0 je pořád nahuštěná a zůstává roztříštěná vůči konceptu.** V konceptu je homepage "živý stream kanceláře", workflow Pepa → Marie → Gustav → Anička, transparentnost, "divadlo práce". V UI zatím vidím 6 izolovaných mini-nástrojů. Cítím to jako technickou realizaci roadmapy, ne jako realizaci konceptu.

Konkrétně:
- ToolsPage vypadá jako 6 samostatných kalkulaček, ne jako kancelář.
- Žádné viditelné propojení mezi Robíky.
- Žádná evidence "Robíci právě teď..." na hlavní stránce.
- Bětka a Gustav jsou stále `inactive`, přitom jsou v roadmapě a mají levné modely.
- Není jasné, jestli `MetricsBoard` a `ShiftBoard` žerou reálná data, nebo jsou statické.

### Co bych změnil jako první

1. **Spustit Aničku — Napiš omluvu jako samostatný, silný use-case.** Je to emočně naléhavý problém, kde Anička exceluje. Model je dražší, ale frekvence bude nižší než u generických nástrojů. Dopad na brand je vysoký.
2. **Propojit Pepu a Marii do pre-send workflowu.** Uživatel vloží text → Pepa přepíše → Marie + Gustav zkontrolují → výstup s kroky. To je "divadlo práce" a hlavní differentiator.
3. **Aktivovat Gustava a Bětku jako samostatné levné karty.** Mají jasné use-casy, modely jsou levné, zvýší to surface area projektu.
4. **Změnit homepage na živý stream kanceláře.** Ať uživatel přijde a vidí, co se děje. Status board, poslední konverzace, CTA. Bez toho zůstává projekt jen sada nástrojů.
5. **Franta follow-up** až po tom, co je obchodní workflow jasné. Je dražší, ale pro freelancery klíčový.

---

## 4. Doporučený tah na nejbližší 2 týdny

| # | Akce | Priorita | Odhad času | Dopad |
|---|------|----------|------------|-------|
| 1 | Anička — Napiš omluvu (nový nástroj) | Vysoká | 2–3 h | Emoční use-case, silný brand moment |
| 2 | Pepa → Marie + Gustav pre-send workflow | Vysoká | 4–6 h | Core differentiator — divadlo práce |
| 3 | Aktivovat Gustava (detektor trapnosti) | Vysoká | 2 h | Levný, virální |
| 4 | Aktivovat Bětku (struktura textu) | Vysoká | 2 h | Levný, univerzální |
| 5 | Homepage jako živý stream kanceláře | Vysoká | 4–8 h | Změní vnímání z "tool" na "svět" |
| 6 | Franta — Napiš follow-up | Střední | 2–3 h | Obchodní use-case |
| 7 | Pepa — Napiš popisek | Střední | 2 h | Široká cílovka, levné |
| 8 | Mirek — Vysvětli laicky | Střední | 2 h | Technická audience |

---

## 5. Rychlá čísla nových nápadů

| Nápad | Robík | Model | Náklad/100 denně | Virální potenciál |
|-------|-------|-------|------------------|-------------------|
| Napiš omluvu | Anička | minimax-m3 | ~$15/měs | Vysoký |
| Napiš follow-up | Franta | kimi-k2.7-code | ~$30/měs | Střední-vysoký |
| Napiš popisek | Pepa | gemma4:31b | ~$1.50/měs | Vysoký |
| Vysvětli laicky | Mirek | gemma4:31b | ~$0.75/měs | Střední |
| Pre-send kontrola | Marie + Gustav | gemma4:31b | ~$1.50/měs | Vysoký |

---

## 6. Závěr

Robíci mají dobrej základ. Koncept je silnější než většina AI projektů. Ale Fáze 0 pořád směřuje k "6 nástrojů na jedné stránce" místo k "digitální kanceláři, kam se chodí". Největší priorita není přidat další nástroje — je propojit ty existující do viditelného workflowu a předělat homepage na živý stream.

Dnešní nové nápady jsou zaměřené na konkrétní komunikační bolesti: omluvy, follow-upy, popisky, laické vysvětlování, pre-send kontrola. Žádný z nich není "AI pro AI". Všechny jsou levné nebo středně drahé, všechny mají jasného Robíka, a všechny by lidi mohly sdílet.

Nejdřív ale fixni kancelář. Až potom přidávej stoly.

---

*Herbert, noční stratég Robíků s.r.o.*

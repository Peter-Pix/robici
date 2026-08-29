# Herbert — Noční strategie Robíků s.r.o.

**Datum:** 29. 7. 2026 03:16 CET
**Autor:** Herbert
**Zadání:** Přečíst koncept, roadmapu, test modelů, tým a UI. Vymyslet 3–5 nových nástrojů. Zhodnotit stav. Uložit.

---

## 1. Co jsem četl

- `docs/roadmap.md` — Fáze 0 MVP: 6 nástrojů, 3× denně na IP, žádná registrace. Cíl: mikro-pomocníci, ne generátory.
- `docs/koncept.md` — Robíci = parta AI kolegů, každý má osobnost. Positioning: "odstraní tu nejnudnější část psaní". Klíč: transparentnost, divadlo práce, vztah.
- `docs/model-testing-report.md` — `gemma4:31b` je vítěz (Level 2, rychlý, kreativní, flaguje ⚠️). `kimi-k2.7-code` jen pro Frantu/Mirka. `minimax-m3` pro Aničku. `deepseek-v4-flash` pro Emila/fallback.
- `src/data/robots/robots.ts` — 9 postav, 5 aktivních (Pepa, Marie, Franta, Mirek, Anička + Emil + Jožin), 2 inactive (Bětka, Gustav). Každý má image, osobnost, catchphrases.
- `src/components/ToolsPage.tsx` — čisté Apple-style UI, kartičky s toggle, input, modes, markdown výstup, limit 3× denně. Accordion layout.

---

## 2. Nové nápady na nástroje / vylepšení

### Nápad 1: Gustav — Detektor trapnosti (passive-aggressive mail check)

**Robík:** Gustav 🕵️
**Problém:** Lidi posílají maily, které zní slušně, ale uvnitř jsou jedovaté. Pak se diví, že to druhá strana cítí.
**Vstup → výstup:**
- Vstup: mail nebo zpráva (max 1500 znaků)
- Výstup: skóre "trapnosti" 1–10 + konkrétní pasáže, které mohou znít: pasivně agresivně, přehnaně formálně, vyhýbavě, lhostejně, příkazově
- Plus: přepis do neutrálního tónu

**Model:** `gemma4:31b` (Level 2)
**Čas:** ~3s
**Cena:** ~$0.0005 / volání
**Proč by to lidi používali:** Každý, kdo píše do práce, se bojí znít jako *****. Gustav řekne pravdu bez filtru. Virální potenciál: "Zkontroluj, jestli tvůj mail není nasraný" — to sdílí každý open space.

**Možné módy:**
- Zní to nasraně?
- Zní to lhostejně?
- Zní to jako od šéfa?
- Přepiš to slušně

**Kritéria match:** konkrétní problém ✓ levné ✓ mikro-pomocník ✓ zapamatovatelné ✓

---

### Nápad 2: Bětka — Udělej z toho přehled

**Robík:** Bětka 🎨
**Problém:** Lidi dostávají dlouhé texty (nápady, poznámky, zápisky) a potřebují je rychle strukturovat. Ne chtějí AI, co za ně píše — chtějí, co jim to uspořádá.
**Vstup → výstup:**
- Vstup: volný text / brain dump (max 2000 znaků)
- Výstup: převedení do vybrané struktury: odrážky / tabulka / checklist / timeline / FAQ / e-mail

**Model:** `gemma4:31b` (Level 2)
**Čas:** ~4s
**Cena:** ~$0.0005–$0.001 / volání
**Proč by to lidi používali:** Brain dump → struktura je univerzální bolest. Vhodné pro notepad warriors, studenty, PM-ka. Bětčina osobnost perfektně sedí: "Ještě to vylepším."

**Možné módy:**
- Odrážky
- Tabulka (s hlavičkami)
- Checklist
- Timeline / kroky
- FAQ
- Slidy / outline

**Kritéria match:** konkrétní problém ✓ levné ✓ mikro-pomocník ✓ zapamatovatelné ✓

---

### Nápad 3: Mirek — Oprav prompt

**Robík:** Mirek 🔧
**Problém:** Lidi používají AI špatně, protože píšou špatné prompt-y. Ale nechtějí kurz prompt engineeringu — chtějí, aby to někdo opravil.
**Vstup → výstup:**
- Vstup: prompt, který "nefunguje" (max 1000 znaků)
- Výstup:
  - Co je na promptu špatně (2–3 body)
  - Lepší verze promptu
  - Proč by nová verze měla fungovat lépe

**Model:** `kimi-k2.7-code` (Level 4) — Mirkův technický use-case, cena je odůvodněná
**Čas:** ~6s
**Cena:** ~$0.01 / volání
**Proč by to lidi používali:** "Můj prompt nefunguje" je častá stížnost. Mirek to opraví bez mentorování. Skvělé pro AJťáky, ale i pro běžné uživatele ChatGPT. Virální potenciál mezi vývojáři a AI nadšenci.

**Kritéria match:** konkrétní problém ✓ dražší, ale málo volání / den ✓ mikro-pomocník ✓ zapamatovatelné ✓

---

### Nápad 4: Emil — Přelož z člověka do člověka

**Robík:** Emil 📊 (aneb "Tón jako data")
**Problém:** Stejná věta zní jinak pro šéfa, partnera, klienta nebo úředníka. Lidi to přepisují 5×.
**Vstup → výstup:**
- Vstup: věta nebo krátký text (max 500 znaků)
- Mód: Šéf / Klient / Partner / Úředník / Kamarád / Sociální sítě
- Výstup: přepsaná věta v daném tónu + krátké vysvětlení, co se změnilo

**Model:** `gemma4:31b` (Level 2)
**Čas:** ~3s
**Cena:** ~$0.0005 / volání
**Proč by to lidi používali:** Reálný každodenní problém. "Napiš to znovu, ale mileji" — Emil to udělá. Cílovka: všichni, co píšou do práce a do vztahů. Potenciál: "Přelož to do úřední češtiny" je sdílitelný meme formát.

**Možné módy:**
- Šéf (stručně, respekt)
- Klient (profesionálně, bez tlaku)
- Partner (mile, ale upřímě)
- Úředník (formálně, strukturovaně)
- Kamarád (volně, vtipně)
- LinkedIn (motivačně, trochu prázdně)

**Kritéria match:** konkrétní problém ✓ levné ✓ mikro-pomocník ✓ virální potenciál ✓

---

### Nápad 5: Jožin — Momentka (Easter Egg)

**Robík:** Jožin 🐈
**Problém:** Lidi potřebují občas přestávku. A Jožin je už teď na výplatní pásce, tak ať něco dělá.
**Vstup → výstup:**
- Žádný vstup nebo jedno slovo (téma)
- Výstup: náhodný low-stakes output:
  - krátký absurdní vtip
  - jednoduchá omalovánka (ASCII/text art)
  - kočičí moudro
  - "co by dneska udělal Jožin"

**Model:** `gemma4:31b` (Level 2) nebo statické cache (0 Kč)
**Čas:** <1s pokud cache, ~2s pokud generace
**Cena:** ~$0.0005 nebo zdarma při cache
**Proč by to lidi používali:** Jožin je už maskot. Dát mu vlastní nástroj posiluje brand a dává důvod se vracet, i když nic nepotřebují. Virální potenciál: "Moje kočka mi dneska poradila..." sdílení na IG.

**Kritéria match:** levné ✓ zapamatovatelné ✓ buduje vztah ✓ nesmí konkurovat hlavním nástrojům ✓

---

## 3. Zhodnocení současného stavu projektu

### Nejsilnější stránka

**Postavy a konzistentní svět.** Robíci nejsou 6 AI nástrojů — jsou parta kolegů. Každý má image, osobnost, catchphrases, náladu. To je moat, který se těžko kopíruje. Koncept "mikro-pomocníci, ne generátory" je správný a dobře cílený.

Druhá silná stránka: **cenová optimalizace modelů.** `gemma4:31b` jako default pro 5 z 8 Robíků je chytré rozhodnutí. Výrazně to snižuje náklady oproti původní verzi.

Třetí: **UI je čisté a low-friction.** Accordion layout, žádná registrace, 3× denně zdarma, markdown výstup. To funguje.

### Nejslabší stránka

**Nedokončenost a roztříštěnost stavu.**
- Bětka a Gustav jsou v kódu jako `inactive`, ale v konceptu mají jasné role a dokonce jsou v roadmapě jako bonusové nástroje (Fáze 1). Přitom by mohli být aktivní hned — a levně.
- `team-breakdown` má limit 1× denně, což je kontraintuitivní pro nástroj, který má být "wow" a lákavý. Ostatní mají 3×.
- Chybí propojení mezi Robíky. Koncept mluví o workflow Pepa → Marie → Gustav → Anička, ale UI má izolované nástroje. Uživatel nevidí "divadlo práce".
- ToolsPage má accordion s jedním otevřeným nástrojem — to je OK, ale neukazuje backstage ani historii.
- Není vidět žádná evidence použití (metriky, status board) napojená na reálná data. `MetricsBoard` a `ShiftBoard` jsou komponenty, ale nevím, jestli žerou live data.

Druhá slabina: **Fáze 0 je nahuštěná až moc.** 6 nástrojů + hero + status board + metriky + newsletter + IG za 1–2 týdny je ambiciózní. Riziko, že se něco ošidí nebo se to nedodělá.

### Co bych změnil jako první

1. **Aktivovat Gustava a Bětku hned** — oba mají levné modely (`gemma4:31b`) a jasný use-case. Gustav = detektor trapnosti, Bětka = strukturování textu. Dva nové nástroje za cenu jednoho dne práce.
2. **Propojit Pepu a Marii do mini-workflowu** — uživatel pošle text, Pepa přepíše, Marie okomentuje. Uvidí "divadlo práce" naživo. To je core differentiator konceptu.
3. **Změnit limit u Týmu na 3×** — 1× denně nedává smysl, když jde o nástroj, který má lidi zaujmout.
4. **Přidat metriky na real data** — `MetricsBoard` by měl číst z `/api/metrics`, ne být statický. Bez dat není důvěryhodný.
5. **Jožinovi dát vlastní tlačítko** — i kdyby jen cacheovaný Easter Egg. Posiluje brand a dává důvod se vracet.

---

## 4. Shrnutí doporučení

| # | Akce | Priorita | Odhad času | Dopad |
|---|------|----------|------------|-------|
| 1 | Aktivovat Gustava (detektor trapnosti) | Vysoká | 2–3 h | Nový levný nástroj, virální potenciál |
| 2 | Aktivovat Bětku (přehled ze textu) | Vysoká | 2–3 h | Rozšíří use-cases, levný model |
| 3 | Pepa → Marie mini-workflow | Vysoká | 4–6 h | Core differentiator — divadlo práce |
| 4 | Limit Týmu 1× → 3× | Nízká | 5 min | Lepší engagement |
| 5 | Jožin — Easter Egg tlačítko | Střední | 1–2 h | Brand, retention |
| 6 | Metriky z reálných dat | Střední | 2–4 h | Důvěryhodnost, sociální důkaz |
| 7 | Mirek — oprav prompt | Nízká | 3–4 h | Technická audience |
| 8 | Emil — přelož člověk → člověk | Střední | 2–3 h | Široká užitečnost |

---

## 5. Závěr

Robíci mají silný koncept, správné modely a čisté UI. Největší riziko není technické — je produktové: **nedodělat divadlo práce a nechat nástroje izolované.** Koncept slibuje "vidíš, jak přemýšlí", ale MVP zatím ukazuje jen výstupy. První věc, co bych změnil: spojit Pepu a Marii do viditelného workflowu. Druhá: aktivovat Gustava a Bětku. Třetí: dát Jožinovi práci.

Náklady jsou pod kontrolou. Virální potenciál je v Gustavovi, Bětce a Jožinovi. Technický credit jde Mirkovi. Široká užitečnost Emilovi (překlad tónů).

To je vše. Jdu spát. Jožin hlídá.

---

*Herbert, noční stratég*

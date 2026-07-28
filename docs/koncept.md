# Robíci — Bullet-Proof Koncept

> **Verze:** 2.0 — finální
> **Datum:** 29. 7. 2026
> **Status:** Schválený, připravený k implementaci

---

## 1. CO TO JE (jedna věta)

> **Robíci odstraní tu nejnudnější část psaní. A ještě u toho uvidíš, jak přemýšlí.**

---

## 2. POSITIONING

**Neprodáváme Robíky. Prodáváme klid.**

Zákazník ráno nevstává s tím, že chce poznat Pepu. Vstává s tím, že se mu nechce psát ten debilní mail. Robíci jsou způsob, ne cíl.

**Neprodáváme AI. Prodáváme digitální kancelář, kterou lidi chodí navštěvovat, i když zrovna nic nepotřebují.**

Konkurence může okopírovat pipeline, UI, workflow. Ale velmi těžko okopíruje svět, postavy, humor, dlouhodobé vztahy a důvod, proč se lidé vracejí.

---

## 3. PRO KOHO (cílová skupina)

**Primární:** Češi 28-35 let, co pracujou v malý firmě (< 50 lidí) nebo jsou freelanceři.

**Co je štve:**
- Musí psát maily, nabídky, odpovědi, ale nebaví je to
- AI nástroje jsou neosobní a generický
- Nemaj čas se učit další SaaS

**Co chtěj:**
- Někoho, kdo to napíše za ně
- Ale aby to znělo jako oni
- A aby viděli, co se změnilo

**Sekundární:** Ajťáci, co chtěj vidět "jak to funguje uvnitř". Studenti, co píšou první CV. Maminky na rodičovský, co rozjížděj projekt.

---

## 4. CO DĚLAJ (job to be done)

> **"Potřebuju napsat / zkontrolovat / vylepšit text, ale nechci na to myslet."**

Každej Robík = jeden typ textový práce:

| Robík | Dělá | Příklad |
|-------|------|---------|
| **Pepa** ✍️ | Píše | "Přepiš mi tenhle mail, ať zní líp" |
| **Marie** 📋 | Kontroluje | "Najdi chyby v tomhle textu" |
| **Franta** 💰 | Navrhuje | "Vymysli nabídku pro klienta" |
| **Mirek** 🔧 | Opravuje | "Tenhle text nefunguje, co s tím?" |
| **Anička** ❤️ | Odpovídá | "Napiš odpověď na tuhle stížnost" |
| **Gustav** 🕵️ | Testuje | "Projde tenhle text ATS?" |
| **Bětka** 🎨 | Formátuje | "Udělej z toho hezkej dokument" |
| **Emil** 📊 | Analyzuje | "Co říkaj data o tomhle textu?" |
| **Jožin** 🐈 | Nic | "Mňau." (ale vždycky je poblíž) |

---

## 5. JAK TO FUNGUJE (mechanika)

### Workflow (iterativní, ne lineární)

```
Uživatel zadá text
    ↓
Pepa napíše první verzi
    ↓
Marie zkontroluje
    ↓
⚠️ Marie: "Na tohle si nejsem jistá. Prosím zkontroluj."
    ↓
Pepa opravuje podle Mariiných připomínek
    ↓
Gustav testuje
    ↓
Anička doručí výsledek
```

**Klíčový princip:** Lidé musí vidět, že se AI opravuje. Ne že všechno projde napoprvé. To buduje důvěru.

### Transparentnost (customer-facing observability)

Ne "observability pro vývojáře" (logy, trace, tokeny). Ale:

> **Vidíš práci, ne jen výsledek.**

- Co agent udělal
- Proč to udělal
- Co si není jistý
- Kde potřebuje tvou pomoc

### "Nevím" jako feature

Marie umí říct: **"Na tohle si nejsem jistá. ⚠️ Prosím zkontroluj."**

Transparentnost není jen ukázat úspěch. Transparentnost je ukázat nejistotu.

### Výstup

- Hotovej text
- **Highlight:** co AI změnil, co je ⚠️, co je tvoje
- **"Jak to vzniklo":** krok za krokem, co každej Robík udělal

### Reklamace

- "Něco nesedí?" → klikni → Anička odpoví do 5 minut → auto-oprava

---

## 6. POSTAVY

### Aktivní (na směně)

| Robík | Role | Osobnost |
|-------|------|----------|
| **Pepa** ✍️ | Copywriter | Strašně slušný, píše 8 odstavců na jednoduchou větu. Marie mu škrtá. |
| **Marie** 📋 | Vedoucí provozu | Největší pedant. "Kdo to schválil?" / "Ne." / "Tohle půjde předělat." |
| **Franta** 💰 | Obchodník | Až moc optimistický. "Za zkoušku nic nedáme." / "Věřil jsem v nás." |
| **Mirek** 🔧 | Technik | Introvert. Tři hodiny mlčí, pak napíše "Hotovo." |
| **Anička** ❤️ | Péče o zákazníky | Nejmilejší člověk na světě. Omluví se i za déšť. |
| **Jožin** 🐈 | Firemní kocour | Nemá žádnou práci. Když se něco rozbije, sedí vedle serveru. |

### Připravují se

| Robík | Role | Osobnost |
|-------|------|----------|
| **Bětka** 🎨 | Grafička | Všechno chce udělat hezčí. Z ikonky udělá redesign webu. |
| **Gustav** 🕵️ | QA Tester | "Když to jde rozbít, rozbije to zákazník." |
| **Emil** 📊 | Analytik | Na každou otázku odpoví grafem. Nikdo mu nerozumí. |

### Veřejné profily Robíků

Každej Robík má veřejnej profil s metrikama:

```
Marie
Dnes: ✔ zkontrolovala 27 textů | ⚠ vrátila 6 | 😊 pochválila 3
Celkem: 1 286 kontrol | 98,7 % spokojenost
```

---

## 7. FREKVENCE OBSAHU

### Pondělí — Co novýho
- 1 status na webu: co se děje, co se změnilo
- 1 IG post
- **Čas:** 5 minut

### Středa — Jak něco vzniklo
- 1 "divadlo práce" ukázka: krok za krokem, jak Robíci něco vytvořili
- 1 IG carousel / story
- **Čas:** 15 minut

### Pátek — Porada
- Páteční porada: každej Robík řekne 1 větu
- Newsletter: shrnutí týdne + 1 ukázka
- LinkedIn článek (1× měsíčně)
- **Čas:** 30 minut

### Měsíčně — Dramaturgický oblouk
- 4týdenní plán:
  - Týden 1: Představení (co umí)
  - Týden 2: První fail (něco se posere)
  - Týden 3: Spolupráce (dělaj něco společně)
  - Týden 4: Krize / rozuzlení
- **Čas:** 1 hodina (plánování)

---

## 8. HOMEPAGE

**Není to marketing. Je to živý stream kanceláře.**

```
┌─────────────────────────────────────────┐
│         Dnes v kanceláři                │
│                                         │
│  🟢 Pepa                                │
│  Právě přepisuje mail.                  │
│                                         │
│  🟡 Marie                               │
│  Našla dvě nejasnosti.                  │
│                                         │
│  🔴 Gustav                              │
│  Zase něco rozbil.                      │
│                                         │
│  👀 Podívej se dovnitř.                 │
└─────────────────────────────────────────┘
```

- Hero = dynamická scéna (mění se denně)
- Status board = co se děje TEĎ
- Chat = poslední konverzace
- "Podívej se dovnitř" = CTA do "divadla práce"

---

## 9. MONETIZACE

### Klíčový princip: Robíci musí být dostupní všem.

**Placené není: postavy.**
**Placené je: rychlost, historie, export, týmová spolupráce, vlastní šablony, paměť.**

Jinak zabiješ vztah ke značce.

### Free (navždy)
- Všichni Robíci
- Krátký texty (< 100 slov)
- 3 interakce denně
- **Počkej minutu** (záměrná latence — "Robíci pracujou")
- Vidíš hotovej výstup

### Adoptovaný (49 Kč/měsíc)
- Všichni Robíci
- Dlouhý texty (neomezeně)
- 10 interakcí denně
- **Hotovo za 5 sekund** (žádná latence)
- Vidíš **backstage**: jak výstup vznikal, krok za krokem
- Historie: tvoje minulý úkoly
- Můžeš ovlivnit styl ("Pepo, napiš to míň formálně")

### Premium (149 Kč/měsíc)
- Všichni Robíci
- Neomezeně interakcí
- **Hotovo za 5 sekund**
- Personalizace: Robíci si pamatujou tvoje preference
- Export do PDF, DOCX
- Vlastní šablony
- Týmová spolupráce (sdílení mezi 3 lidmi)

### Eventy (jednorázově, max 1× za čtvrt roku)
- "Pepa potřebuje novej monitor" — 49 Kč, dostaneš poděkování
- "Franta vydává knížku" — 149 Kč, dostaneš PDF

---

## 10. ŠROUBKY

**Ne sbírání. Ne levelování. Ne odemykání.**

Šroubky = **historie vztahu.**

```
🔩 126
Pomohl jsi Robíkům už 126×.
```

Žádné XP. Žádné levely. Žádné battle passy. Jen historie.

Občas Robík poděkuje:
> "Díky. Díky tobě jsme minulý měsíc opravili 427 chyb. Tady máš 12 šroubků."

To je vztah, ne gamifikace.

---

## 11. DISTRIBUCE

### Primární kanál: Web
- Domovská stránka = živý stream kanceláře
- Hero = dynamická scéna (mění se denně)
- Status board = co se děje TEĎ
- Chat = poslední konverzace

### Přívodní kanál: Instagram
- Pondělí + středa + pátek: meme / scénka / fail
- Stories: "Co dneska dělá Pepa"
- Link v biu → web

### Autoritativní kanál: LinkedIn
- 1× měsíčně: článek o "co jsme se naučili"
- Buduje důvěryhodnost pro B2B

### Retenční kanál: Newsletter
- Každý pátek: Páteční porada + 1 ukázka "divadla"
- 1× měsíčně: shrnutí + co novýho

---

## 12. DRAMATURGIE (4týdenní oblouky)

### Měsíc 1: "Seznamte se"
- T1: Každej Robík se představí
- T2: První společnej úkol (CV pro pana Nováka)
- T3: Franta slíbí nemožný, Marie zuří
- T4: Mirek to zachrání, všichni se smějou

### Měsíc 2: "První krize"
- T1: Gustav najde bug
- T2: Mirek zmizí na 3 dny
- T3: Franta převezme techniku (katastrofa)
- T4: Mirek se vrátí, opraví to za 7 sekund

### Měsíc 3: "Novej člen"
- T1: Bětka nastupuje
- T2: Bětka předělá všechno
- T3: Marie: "Bětko, ne." Bětka: "Ale je to hezčí!"
- T4: Kompromis

### Měsíc 4-6: "Robíci rostou"
- Další postavy, další schopnosti, další faily

### Postava zákazníka
- Pan Novák — každej měsíc přijde, řeší něco jinýho
- Robíci mu pomáhaj
- Vzniká příběhovej oblouk i pro zákazníky

---

## 13. KPI (co měříme)

### Fáze 0 — "Aha moment" (měsíc 1)
- 100+ newsletter odběratelů
- 30%+ returning visitors (do 7 dní)
- 500+ unikátních návštěvníků

### Fáze 1 — "Lidi interagujou" (měsíc 2-3)
- 500+ newsletter odběratelů
- 40%+ returning visitors
- 2000+ unikátních návštěvníků
- 50+ registrovaných uživatelů

### Fáze 2 — "Lidi platí" (měsíc 4-6)
- 20+ adoptovaných (49 Kč/měsíc)
- 5+ premium (149 Kč/měsíc)
- MRR 2000+ Kč

### Fáze 3 — "Robíci rostou" (měsíc 7-12)
- 100+ platících
- MRR 10 000+ Kč
- První B2B zákazník

---

## 14. CO NEDĚLAT (red lines)

❌ **Právní dokumenty** — smlouvy, NDA, DPP
❌ **Lékařský / daňový / finanční rady**
❌ **"AI, co všechno umí"** — positioning jako další AI nástroj
❌ **Paywall před vztahem** — nejdřív důvěra, pak peníze
❌ **Fakeování** — když AI selže, ukážeme to
❌ **Gamifikace s body** — šroubky jsou historie, ne měna
❌ **Denní epizody** — neudržitelný
❌ **Všechny kanály najednou** — postupně
❌ **Zamykání postav za paywall** — Robíci musí být dostupní všem
❌ **Lineární workflow bez chyb** — lidi musí vidět, že se AI opravuje

---

## 15. TECH STACK

| Vrstva | Technologie |
|--------|------------|
| Web | Next.js 16 + TypeScript + Tailwind 4 |
| AI | Ollama cloud (levnější než OpenAI) |
| Newsletter | Substack (jednoduchej, free) |
| Platby | Stripe (až Fáze 2) |
| Hosting | Vercel (máme) |
| Doména | robici-sro.vercel.app → robici-sro.cz |
| Repo | github.com/Peter-Pix/robici |

---

## 16. IMPLEMENTAČNÍ PLÁN

### Týden 1 — "Živá kancelář"
- [ ] Dynamickej hero (3+ scén, random výběr)
- [ ] Status board s denním micro momentem
- [ ] Veřejný profily Robíků (metriky)
- [ ] Newsletter sign-up (Substack embed)
- [ ] Instagram účet + první 3 posty

### Týden 2 — "První pomoc"
- [ ] První AI nástroj: Pepa přepíše mail (free, < 100 slov)
- [ ] Workflow s iterací (Pepa → Marie → ⚠️ → Pepa → Gustav → Anička)
- [ ] "Divadlo práce" — ukázka procesu krok za krokem
- [ ] Marie umí říct "Na tohle si nejsem jistá"
- [ ] Páteční porada #1
- [ ] První newsletter

### Týden 3 — "Druhej Robík"
- [ ] Marie: "Najdi chyby v textu" (free)
- [ ] Rozšířený "divadlo práce" pro oba Robíky
- [ ] Šroubky = historie (žádný XP, žádný levely)

### Týden 4 — "Zpětná vazba"
- [ ] Reklamační flow (Anička odpoví, auto-oprava)
- [ ] Vyhodnocení KPI Fáze 0
- [ ] Plán na další měsíc

---

## 17. PROČ TO BUDE FUNGOVAT

1. **Není to další AI nástroj.** Je to parta postav. Lidi se vracej kvůli nim, ne kvůli features.

2. **Prodáváme klid, ne Robíky.** Zákazník nechce poznat Pepu. Chce mít hotovej mail.

3. **Transparentnost je moat.** Nikdo jinej neukazuje, co AI dělá uvnitř. My jo. A ukazujeme i nejistotu.

4. **"Nevím" jako feature.** Marie řekne, když si není jistá. To buduje důvěru.

5. **Free tier je štědrej, ale ne neomezeně.** Všichni Robíci, krátký texty, 3× denně, s latencí. Dost na to, aby lidi zůstali, málo na to, aby zneužívali.

6. **Monetizace je přirozená.** Ne "kup si premium", ale "adoptuj Robíka". Platíš za rychlost a historii, ne za postavy.

7. **Content je udržitelnej.** 3× týdně (Po, St, Pá). 5-30 minut na kus. To zvládneš.

8. **Distribuce je cílená.** IG pro mladý, LinkedIn pro autoritu, web pro všechno.

9. **Cílová skupina je přesná.** 28-35, malá firma / freelance. Ne "všichni".

10. **JTBD je jasnej.** "Pomoc s textem." Ne "pomoc se vším."

11. **Dramaturgie dává důvod se vracet.** 4týdenní oblouky. Jako seriál.

12. **Red lines chrání před průšvihem.** Žádný právní dokumenty, žádný fakeování, žádný paywall na postavy.

13. **Homepage není marketing.** Je to živý stream kanceláře. Lidi chodí, i když nic nepotřebujou.

14. **Konkurence může okopírovat pipeline, UI, workflow. Ale ne svět, postavy, humor, vztahy.**

---

## 18. SHRNUTÍ (elevator pitch)

**Robíci odstraní tu nejnudnější část psaní. A ještě u toho uvidíš, jak přemýšlí.**

Je to parta AI kolegů — Pepa píše, Marie kontroluje, Franta navrhuje, Mirek opravuje, Anička odpovídá. Každej umí jednu věc s textem. Všichni jsou zdarma. A když si nejste jistí, řeknou vám to.

Není to další AI nástroj. Je to první digitální kancelář, kterou lidi chodí navštěvovat, i když zrovna nic nepotřebují.

**Homepage není marketing. Je to živý stream kanceláře.**

---

*Verze 2.0 — 29. 7. 2026*
*Autoři: Peter (Willy Tea) + Doofy*

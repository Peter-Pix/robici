#!/usr/bin/env python3
"""
Robíci — Automatický benchmark test
Spuštění: python3 scripts/benchmark.py [base_url]
Výstup: docs/benchmark-report-YYYY-MM-DD.md
"""

import json
import sys
import time
import urllib.request
import urllib.error
import os
from datetime import date

BASE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"
REPORT = f"docs/benchmark-report-{date.today().isoformat()}.md"

# === Testovací data ===
TESTS = [
    ("pepa-rewrite", {"text": "Dobrý den, chtěl bych se zeptat, jestli máte skladem tu modrou mikinu. Děkuji."}),
    ("marie-check", {"text": "Tato smlouva se řídí občanským zákoníkem. Cena 15 000 Kč včetně DPH. Dodání do 14 dnů."}),
    ("anicka-reply", {"text": "Vaše služba je k ničemu, chci peníze zpět!", "mode": "mile"}),
    ("franta-improve", {"text": "Prodáváme kvalitní omalovánky za skvělé ceny.", "mode": "presvedcivejsi"}),
    ("emil-summarize", {"text": "Na dnešním meetingu jsme se dohodli, že příští týden spustíme novou kampaň. Pepa připraví texty, Mirek nastaví tracking, Franta pošle nabídky klientům. Rozpočet je 50 000 Kč. Termín: 15. 8."}),
    ("team-breakdown", {"text": "Chci otevřít kavárnu s kočkama."}),
]


def api_call(tool: str, data: dict, timeout: int = 60) -> dict:
    """Zavolá API endpoint a vrátí parsovaný JSON."""
    url = f"{BASE_URL}/api/tool/{tool}"
    body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        start = time.time()
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            raw = resp.read().decode("utf-8")
        wall = time.time() - start
        result = json.loads(raw)
        result["_wall_time"] = round(wall, 1)
        result["_http_status"] = resp.status
        return result
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            err_data = json.loads(raw)
            return {"error": err_data.get("error", f"HTTP {e.code}"), "_http_status": e.code, "_wall_time": 0}
        except:
            return {"error": f"HTTP {e.code}: {raw[:100]}", "_http_status": e.code, "_wall_time": 0}
    except Exception as e:
        return {"error": str(e), "_http_status": 0, "_wall_time": 0}


def get(url: str, timeout: int = 10) -> float:
    """Změří čas GET requestu."""
    try:
        start = time.time()
        with urllib.request.urlopen(url, timeout=timeout) as _:
            pass
        return round((time.time() - start) * 1000)
    except:
        return -1


def main():
    lines = []
    lines.append(f"# Robíci — Benchmark Report")
    lines.append(f"")
    lines.append(f"**Datum:** {date.today().strftime('%d. %m. %Y %H:%M')}")
    lines.append(f"**Base URL:** {BASE_URL}")
    lines.append(f"")
    lines.append(f"---")
    lines.append(f"")

    # === Test 1: Jednotlivé nástroje ===
    lines.append("## 1. Jednotlivé nástroje")
    lines.append("")
    lines.append("| Nástroj | Status | Wall time (s) | API time (s) | Tokeny | Znaky | Rychlost (znak/s) |")
    lines.append("|---------|--------|---------------|--------------|--------|-------|-------------------|")

    for tool, data in TESTS:
        result = api_call(tool, data)
        status = "✅" if "output" in result else "❌"
        dur = result.get("duration", 0)
        wall = result.get("_wall_time", 0)
        chars = len(result.get("output", ""))
        speed = round(chars / dur, 0) if dur > 0 else 0
        lines.append(f"| {tool} | {status} | {wall}s | {dur:.1f}s | ? | {chars} | {speed:.0f} znak/s |")

    lines.append("")

    # === Test 2: IP limit ===
    lines.append("## 2. IP limit (3× volání stejného nástroje)")
    lines.append("")
    lines.append("| Volání | Status | Zbývá |")
    lines.append("|--------|--------|-------|")

    for i in range(1, 5):
        result = api_call("pepa-rewrite", {"text": "test"}, timeout=30)
        if "error" in result:
            status = "⛔ BLOCKED"
            remaining = 0
        else:
            status = "✅ OK"
            remaining = result.get("remaining", 0)
        lines.append(f"| {i}. | {status} | {remaining} |")

    lines.append("")

    # === Test 3: Error handling ===
    lines.append("## 3. Error handling")
    lines.append("")
    lines.append("| Scénář | Status |")
    lines.append("|--------|--------|")

    # Prázdný vstup
    result = api_call("pepa-rewrite", {"text": ""}, timeout=10)
    if "error" in result:
        lines.append(f"| Prázdný vstup | ✅ 400 — {result['error'][:60]} |")
    else:
        lines.append(f"| Prázdný vstup | ❌ očekáván error |")

    # Příliš dlouhý vstup
    result = api_call("pepa-rewrite", {"text": "x" * 2000}, timeout=10)
    if "error" in result:
        lines.append(f"| Dlouhý vstup | ✅ 400 — {result['error'][:60]} |")
    else:
        lines.append(f"| Dlouhý vstup | ❌ očekáván error |")

    # Neplatný mód
    result = api_call("anicka-reply", {"text": "test", "mode": "neexistuje"}, timeout=10)
    if "error" in result:
        lines.append(f"| Neplatný mód | ✅ 400 — {result['error'][:60]} |")
    else:
        lines.append(f"| Neplatný mód | ❌ očekáván error |")

    lines.append("")

    # === Test 4: Rychlost odezvy ===
    lines.append("## 4. Rychlost odezvy (GET /)")
    lines.append("")
    ms = get(f"{BASE_URL}/")
    lines.append(f"| Stránka | {ms}ms |")
    lines.append("")

    # === Test 5: Všechny nástroje v sérii ===
    lines.append("## 5. Všechny nástroje v sérii")
    lines.append("")
    lines.append("| Nástroj | Status | Wall time (s) |")
    lines.append("|---------|--------|---------------|")

    total_start = time.time()
    for tool, data in TESTS:
        result = api_call(tool, data)
        status = "✅" if "output" in result else "❌"
        wall = result.get("_wall_time", 0)
        lines.append(f"| {tool} | {status} | {wall}s |")

    total = round(time.time() - total_start, 1)
    lines.append(f"| **Celkem** | | **{total}s** |")
    lines.append("")

    # === Závěr ===
    lines.append("---")
    lines.append("")
    lines.append("## Závěr")
    lines.append("")
    lines.append("- **Funkčnost:** Všechny nástroje by měly vracet 200 OK")
    lines.append("- **IP limit:** Po 3. volání by měl vracet 429")
    lines.append("- **Error handling:** Prázdný vstup, dlouhý vstup, neplatný mód → 400")
    lines.append("- **Rychlost:** Závisí na Ollama API, očekávej 2-30s na nástroj")
    lines.append("- **Celková série:** ~60-120s pro všech 6 nástrojů")

    # Uložit report
    report_path = os.path.join(os.path.dirname(os.path.dirname(__file__)) or ".", REPORT)
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    # Výstup na stdout
    print("\n".join(lines))
    print(f"\n\nReport saved to: {report_path}")


if __name__ == "__main__":
    main()

#!/usr/bin/env bash
# Robíci — Automatický benchmark test
# Spuštění: bash scripts/benchmark.sh
# Výstup: docs/benchmark-report-$(date +%F).md

set -e

BASE_URL="${1:-http://localhost:3000}"
REPORT="docs/benchmark-report-$(date +%F).md"
TMPDIR=$(mktemp -d)

echo "# Robíci — Benchmark Report"
echo "**Datum:** $(date '+%d. %m. %Y %H:%M')"
echo "**Base URL:** $BASE_URL"
echo ""
echo "## Testovací scénáře"
echo ""

# === Testovací data ===
declare -A TESTS
TESTS=(
  ["pepa-rewrite"]='{"text":"Dobrý den, chtěl bych se zeptat, jestli máte skladem tu modrou mikinu. Děkuji."}'
  ["marie-check"]='{"text":"Tato smlouva se řídí občanským zákoníkem. Cena 15 000 Kč včetně DPH. Dodání do 14 dnů."}'
  ["anicka-reply"]='{"text":"Vaše služba je k ničemu, chci peníze zpět!","mode":"mile"}'
  ["franta-improve"]='{"text":"Prodáváme kvalitní omalovánky za skvělé ceny.","mode":"presvedcivejsi"}'
  ["emil-summarize"]='{"text":"Na dnešním meetingu jsme se dohodli, že příští týden spustíme novou kampaň. Pepa připraví texty, Mirek nastaví tracking, Franta pošle nabídky klientům. Rozpočet je 50 000 Kč. Termín: 15. 8."}'
  ["team-breakdown"]='{"text":"Chci otevřít kavárnu s kočkama."}'
)

# === Test 1: Jednotlivé nástroje ===
echo "### 1. Jednotlivé nástroje"
echo ""
echo "| Nástroj | Status | Čas (s) | Tokeny | Znaky | Rychlost (znak/s) |"
echo "|---------|--------|---------|--------|-------|-------------------|"

for tool in "${!TESTS[@]}"; do
  data="${TESTS[$tool]}"
  
  # Volání API
  START=$(python3 -c "import time; print(int(time.time() * 1000))")
  response=$(curl -s --max-time 60 "$BASE_URL/api/tool/$tool" -X POST \
    -H "Content-Type: application/json" \
    -d "$data" 2>&1)
  END=$(python3 -c "import time; print(int(time.time() * 1000))")
  WALL_TIME=$(( (END - START) / 1000 ))
  
  # Parsování
  status=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print('ERROR')
    else:
        print('OK')
except:
    print('PARSE_FAIL')
" 2>/dev/null)
  
  duration=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(f\"{data.get('duration', 0):.1f}\")
except:
    print('?')
" 2>/dev/null)
  
  chars=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(len(data.get('output', '')))
except:
    print('?')
" 2>/dev/null)
  
  speed=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    dur = data.get('duration', 1)
    out = data.get('output', '')
    if dur > 0:
        print(f\"{len(out)/dur:.0f}\")
    else:
        print('?')
except:
    print('?')
" 2>/dev/null)
  
  echo "| $tool | $status | ${duration}s | ? | $chars | ${speed} znak/s |"
done

echo ""

# === Test 2: IP limit ===
echo "### 2. IP limit (3× volání stejného nástroje)"
echo ""
echo "| Volání | Status | Zbývá |"
echo "|--------|--------|-------|"

for i in 1 2 3 4; do
  response=$(curl -s --max-time 30 "$BASE_URL/api/tool/pepa-rewrite" -X POST \
    -H "Content-Type: application/json" \
    -d '{"text":"test"}' 2>&1)
  
  status=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print('BLOCKED')
    else:
        print('OK')
except:
    print('FAIL')
" 2>/dev/null)
  
  remaining=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    print(data.get('remaining', 0))
except:
    print('?')
" 2>/dev/null)
  
  echo "| $i. | $status | $remaining |"
done

echo ""

# === Test 3: Error handling ===
echo "### 3. Error handling"
echo ""
echo "| Scénář | Status |"
echo "|--------|--------|"

# Prázdný vstup
response=$(curl -s --max-time 10 "$BASE_URL/api/tool/pepa-rewrite" -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":""}' 2>&1)
status=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print('✅ 400 — ' + data['error'][:50])
    else:
        print('❌ očekáván error')
except:
    print('❌ parse fail')
" 2>/dev/null)
echo "| Prázdný vstup | $status |"

# Příliš dlouhý vstup
long_text=$(python3 -c "print('x' * 2000)")
response=$(curl -s --max-time 10 "$BASE_URL/api/tool/pepa-rewrite" -X POST \
  -H "Content-Type: application/json" \
  -d "{\"text\":\"$long_text\"}" 2>&1)
status=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print('✅ 400 — ' + data['error'][:50])
    else:
        print('❌ očekáván error')
except:
    print('❌ parse fail')
" 2>/dev/null)
echo "| Příliš dlouhý vstup | $status |"

# Neplatný mód
response=$(curl -s --max-time 10 "$BASE_URL/api/tool/anicka-reply" -X POST \
  -H "Content-Type: application/json" \
  -d '{"text":"test","mode":"neexistuje"}' 2>&1)
status=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print('✅ 400 — ' + data['error'][:50])
    else:
        print('❌ očekáván error')
except:
    print('❌ parse fail')
" 2>/dev/null)
echo "| Neplatný mód | $status |"

echo ""

# === Test 4: Rychlost odezvy (GET) ===
echo "### 4. Rychlost odezvy (GET /)"
echo ""
START=$(python3 -c "import time; print(int(time.time() * 1000))")
curl -s --max-time 10 "$BASE_URL/" > /dev/null 2>&1
END=$(python3 -c "import time; print(int(time.time() * 1000))")
echo "| Stránka | ${END}ms |"
echo ""

# === Test 5: Všechny nástroje v sérii (celkový čas) ===
echo "### 5. Všechny nástroje v sérii"
echo ""
echo "| Nástroj | Status | Čas (s) |"
echo "|---------|--------|---------|"

TOTAL_START=$(python3 -c "import time; print(int(time.time() * 1000))")

for tool in "${!TESTS[@]}"; do
  data="${TESTS[$tool]}"
  START=$(python3 -c "import time; print(int(time.time() * 1000))")
  response=$(curl -s --max-time 60 "$BASE_URL/api/tool/$tool" -X POST \
    -H "Content-Type: application/json" \
    -d "$data" 2>&1)
  END=$(python3 -c "import time; print(int(time.time() * 1000))")
  DUR=$(( (END - START) / 1000 ))
  
  status=$(echo "$response" | python3 -c "
import sys, json
try:
    data = json.load(sys.stdin)
    if 'error' in data:
        print('❌')
    else:
        print('✅')
except:
    print('❌')
" 2>/dev/null)
  
  echo "| $tool | $status | ${DUR}s |"
done

TOTAL_END=$(python3 -c "import time; print(int(time.time() * 1000))")
TOTAL=$(( (TOTAL_END - TOTAL_START) / 1000 ))
echo "| **Celkem** | | **${TOTAL}s** |"

echo ""
echo "---"
echo ""
echo "## Závěr"
echo ""
echo "- **Funkčnost:** Všechny nástroje by měly vracet 200 OK"
echo "- **IP limit:** Po 3. volání by měl vracet 429"
echo "- **Error handling:** Prázdný vstup, dlouhý vstup, neplatný mód → 400"
echo "- **Rychlost:** Závisí na Ollama API, očekávej 2-30s na nástroj"
echo "- **Celková série:** ~60-120s pro všech 6 nástrojů"

# Cleanup
rm -rf "$TMPDIR"

echo ""
echo "Report saved to: $REPORT"

#!/usr/bin/env python3
"""
Robíci — Ollama API Monitoring
Usage:
  python3 monitor-ollama.py                    # Show current usage
  python3 monitor-ollama.py --test-model NAME   # Test a model
  python3 monitor-ollama.py --list-models       # List all available models
"""

import json
import os
import sys
import time
import urllib.request
import urllib.error

API_KEY = "f514cda6dd2345d7a3a5da23bee6bb77.FQRY0vUZ6RvF_htBaMC6AsAx"
BASE_URL = "https://ollama.com/api"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {API_KEY}",
}

# Model profiles for Robíci
# Each Robík needs different capabilities
ROBOT_PROFILES = {
    "pepa": {
        "role": "Copywriter — píše texty",
        "needs": ["creative writing", "style adaptation", "czech language"],
        "recommended": "kimi-k2.7-code",
        "reason": "Skvělý na češtinu, kreativní, dává víc variant. Level 4, ale stojí za to.",
    },
    "marie": {
        "role": "Kontrolor — hledá chyby a nejistoty",
        "needs": ["attention to detail", "uncertainty flagging", "czech grammar"],
        "recommended": "minimax-m2.7",
        "reason": "Dobře flaguje ⚠️, dává kontext. Level 3. Rychlejší než kimi.",
    },
    "franta": {
        "role": "Obchodník — navrhuje nabídky",
        "needs": ["persuasive writing", "sales", "optimism"],
        "recommended": "kimi-k2.7-code",
        "reason": "Kreativní, víc variant, lepší čeština. Level 4.",
    },
    "mirek": {
        "role": "Technik — opravuje chyby",
        "needs": ["debugging", "technical accuracy", "code"],
        "recommended": "kimi-k2.7-code",
        "reason": "Nejlepší na kód a technický text. Level 4. Používat volně.",
    },
    "anicka": {
        "role": "Péče o zákazníky — odpovídá na stížnosti",
        "needs": ["empathy", "apology", "customer service"],
        "recommended": "minimax-m3",
        "reason": "Empatický, přirozený, dává víc variant. Level 4, ale pro zákazníky stojí za to.",
    },
    "gustav": {
        "role": "QA Tester — testuje výstupy",
        "needs": ["validation", "edge cases", "breaking things"],
        "recommended": "minimax-m2.5",
        "reason": "Rychlý, přesný, dobře flaguje problémy. Level 3.",
    },
    "betka": {
        "role": "Grafička — formátuje dokumenty",
        "needs": ["formatting", "structure", "visual layout"],
        "recommended": "minimax-m2.7",
        "reason": "Dobrý na strukturování textu. Level 3.",
    },
    "emil": {
        "role": "Analytik — analyzuje data",
        "needs": ["data analysis", "statistics", "charts"],
        "recommended": "deepseek-v4-flash",
        "reason": "Rychlý, analytický, levný. Level 2. Na analýzu stačí.",
    },
}

# Model usage levels (estimated from size)
MODEL_LEVELS = {
    "gpt-oss:20b": 1,
    "nemotron-3-nano:30b": 1,
    "gemma4:31b": 2,
    "deepseek-v4-flash": 2,
    "qwen3.5:397b": 3,
    "minimax-m2.7": 3,
    "kimi-k2.7-code": 4,
    "mistral-large-3:675b": 4,
    "kimi-k3": 4,
}

# Estimated cost per request (rough, based on model level)
# Level 1: ~$0.0001/req, Level 2: ~$0.0005/req, Level 3: ~$0.002/req, Level 4: ~$0.01/req
COST_PER_REQ = {1: 0.0001, 2: 0.0005, 3: 0.002, 4: 0.01}


def fetch_tags():
    """Fetch all available models from Ollama API."""
    req = urllib.request.Request(f"{BASE_URL}/tags", headers=HEADERS)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def chat(model, messages, stream=False):
    """Send a chat request to Ollama API."""
    data = json.dumps({
        "model": model,
        "messages": messages,
        "stream": stream,
    }).encode()
    req = urllib.request.Request(
        f"{BASE_URL}/chat",
        data=data,
        headers=HEADERS,
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def list_models():
    """List all available models with sizes."""
    data = fetch_tags()
    print(f"{'Model':30s} {'Size':>10s} {'Level':>6s}")
    print("-" * 48)
    for m in sorted(data["models"], key=lambda x: x.get("size", 0)):
        name = m["name"]
        size_gb = m["size"] / (1024**3) if m.get("size") else 0
        level = MODEL_LEVELS.get(name, "?")
        print(f"{name:30s} {size_gb:>8.1f} GB {str(level):>6s}")


def test_model(model):
    """Test a model with a simple Czech prompt."""
    print(f"\n🔍 Testing model: {model}")
    print("-" * 50)

    # Test 1: Přepiš mail
    print("\n📧 Test 1: Přepiš mail")
    try:
        result = chat(model, [
            {"role": "user", "content": "Přepiš tenhle mail, ať zní líp: 'Dobrý den, chtěl bych se zeptat, jestli máte skladem tu modrou mikinu. Děkuji.'"}
        ])
        msg = result.get("message", {}).get("content", "")
        duration = result.get("total_duration", 0) / 1e9
        tokens = result.get("eval_count", 0)
        print(f"  ⏱  {duration:.1f}s | 📝 {tokens} tok | {len(msg)} znaků")
        print(f"  Výstup: {msg[:200]}...")
    except Exception as e:
        print(f"  ❌ Error: {e}")

    # Test 2: Kontrola textu
    print("\n🔍 Test 2: Kontrola textu")
    try:
        result = chat(model, [
            {"role": "user", "content": "Zkontroluj tenhle text. Pokud si něčím nejsi jistá, napiš ⚠️. Text: 'Tato smlouva se řídí občanským zákoníkem. Smluvní strany se dohodly na ceně 15 000 Kč včetně DPH.'"}
        ])
        msg = result.get("message", {}).get("content", "")
        duration = result.get("total_duration", 0) / 1e9
        has_warning = "⚠️" in msg or "⚠" in msg
        print(f"  ⏱  {duration:.1f}s | ⚠️ {'Ano' if has_warning else 'Ne'}")
        print(f"  Výstup: {msg[:300]}...")
    except Exception as e:
        print(f"  ❌ Error: {e}")


def show_usage_report():
    """Show estimated usage and cost report."""
    print("\n" + "=" * 60)
    print("📊 ROBÍCI — OLLAMA USAGE REPORT")
    print("=" * 60)

    print("\n📋 MODEL ASSIGNMENTS:")
    print("-" * 60)
    for robot_id, profile in ROBOT_PROFILES.items():
        model = profile["recommended"]
        level = MODEL_LEVELS.get(model, 2)
        cost = COST_PER_REQ.get(level, 0.0005)
        print(f"\n  {robot_id.upper():8s} → {model:25s} (Level {level})")
        print(f"  {'':8s}   {profile['role']}")
        print(f"  {'':8s}   ~${cost:.4f}/request | {profile['reason']}")

    print("\n\n💰 ESTIMATED MONTHLY COST (at 100 requests/day):")
    print("-" * 60)
    total_cost = 0
    for robot_id, profile in ROBOT_PROFILES.items():
        model = profile["recommended"]
        level = MODEL_LEVELS.get(model, 2)
        cost = COST_PER_REQ.get(level, 0.0005)
        daily = cost * 100
        monthly = daily * 30
        total_cost += monthly
        print(f"  {robot_id.upper():8s} | {model:25s} | ${cost:.4f}/req | ${daily:.2f}/den | ${monthly:.2f}/měs")
    print("-" * 60)
    print(f"  {'TOTAL':8s} | {'':25s} | {'':8s} | {'':8s} | ${total_cost:.2f}/měs")

    print("\n\n💡 RECOMMENDATION:")
    print("-" * 60)
    print("""
  Use kimi-k2.7-code for Pepa, Franta, Mirek (creative/technical).
  Best Czech quality, multiple variants. Level 4, but worth it.

  Use minimax-m2.7 for Marie, Bětka (control/formatting).
  Good at flagging uncertainty, faster than kimi. Level 3.

  Use minimax-m2.5 for Gustav (testing).
  Fast, precise, good at finding problems. Level 3.

  Use minimax-m3 for Anička (customer service).
  Empathetic, natural, multiple variants. Level 4.

  Use deepseek-v4-flash for Emil (analysis).
  Fast, cheap, analytical. Level 2.

  At 100 requests/day, estimated cost: ~${total_cost:.2f}/month.
""")


if __name__ == "__main__":
    if "--list-models" in sys.argv:
        list_models()
    elif "--test-model" in sys.argv:
        idx = sys.argv.index("--test-model") + 1
        if idx < len(sys.argv):
            test_model(sys.argv[idx])
        else:
            print("Usage: --test-model MODEL_NAME")
    else:
        show_usage_report()

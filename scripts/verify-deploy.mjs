#!/usr/bin/env node
// scripts/verify-deploy.mjs — Ověří produkční Vercel deploy a doménu.
//
// Co kontroluje:
//   1. Hlavní routes (homepage + 7 podstránek) vracejí 200.
//   2. API routes vracejí očekávané statusy (200 pro metriky, 405 pro POST-only).
//   3. Všechny obrázky Robíků (public/images/) jsou dosažitelné na produkci.
//   4. HTML homepage obsahuje očekávaná jména Robíků (regression check).
//   5. Response time pod prahem (default 5s).
//
// Výstup: tabulka výsledků, exit code 0 = vše OK, 1 = selhání.
//
// Použití:
//   node scripts/verify-deploy.mjs
//   BASE_URL=https://example.com node scripts/verify-deploy.mjs
//
// Run: před každým release, po deploy, při kontinuálním monitoringu.

import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT, "public");

const BASE_URL = process.env.BASE_URL || "https://robici-sro.vercel.app";
const TIMEOUT_MS = parseInt(process.env.TIMEOUT_MS || "15000", 10);
const MAX_RESPONSE_MS = parseInt(process.env.MAX_RESPONSE_MS || "5000", 10);

// Hlavní routes podle ROADMAP/README.
const ROUTES = [
  "/", "/rodina", "/roboctina", "/omalovanky", "/balicky",
  "/sluzby", "/kontakt", "/zpravodaj",
];

// API routes — co a jaký status očekáváme.
// 200 = public read, 405 = POST-only (GET musí vrátit Method Not Allowed).
const API_ROUTES = [
  { path: "/api/metrics", expect: [200] },
  { path: "/api/debug/reset-limits", expect: [405], method: "GET" },
  { path: "/api/debug/reset-limits", expect: [200, 204, 405, 403], method: "POST" },
];

// Robíci uvedení v src/data/robots/robots.ts — přebíráme z robots.ts jako
// single-source-of-truth (konzistence s ostatními kontrolami).
function loadRobotIds() {
  const src = readFileSync(path.join(ROOT, "src", "data", "robots", "robots.ts"), "utf8");
  return [...src.matchAll(/^\s*id:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1]);
}

// Veřejné obrázky v /public/images/ — kontrolujeme, že všechny existují na deployi.
function loadLocalImageIds() {
  const imagesDir = path.join(PUBLIC_DIR, "images");
  try {
    return readdirSync(imagesDir)
      .filter((f) => f.endsWith(".webp"))
      .map((f) => f.replace(/\.webp$/, ""));
  } catch {
    return [];
  }
}

// Klíčová slova, která musí homepage obsahovat (regression check).
const HOMEPAGE_KEYWORDS = ["Robíci", "Pepa", "Marie", "Franta", "Gustav"];

async function fetchHead(url, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, { method: "HEAD", signal: ctrl.signal, redirect: "follow" });
    const elapsed = Date.now() - started(url);
    return { status: res.status, ok: res.ok, elapsed, contentLength: parseInt(res.headers.get("content-length") || "0", 10) };
  } finally {
    clearTimeout(timer);
  }
}

async function fetchGet(url, timeoutMs) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  const t0 = Date.now();
  try {
    const res = await fetch(url, { method: "GET", signal: ctrl.signal, redirect: "follow" });
    const body = await res.text();
    return { status: res.status, ok: res.ok, elapsed: Date.now() - t0, body };
  } finally {
    clearTimeout(timer);
  }
}

const timestamps = new Map();
function started(url) {
  if (!timestamps.has(url)) timestamps.set(url, Date.now());
  return timestamps.get(url);
}

// Barevné ANSI (vypne se v ne-TTY).
const c = (color, s) => (process.stdout.isTTY ? `\x1b[${color}m${s}\x1b[0m` : s);
const GREEN = (s) => c("32", s);
const RED = (s) => c("31", s);
const YELLOW = (s) => c("33", s);
const DIM = (s) => c("2", s);
const BOLD = (s) => c("1", s);

let passed = 0;
let failed = 0;
const failures = [];

function record(name, ok, detail) {
  if (ok) {
    passed++;
    console.log(`  ${GREEN("✓")} ${name} ${DIM(detail)}`);
  } else {
    failed++;
    failures.push({ name, detail });
    console.log(`  ${RED("✗")} ${name} ${RED(detail)}`);
  }
}

console.log(BOLD(`\nVercel deploy verification — ${BASE_URL}\n`));

// 1. Routes
console.log(BOLD("1. Hlavní routes"));
for (const r of ROUTES) {
  try {
    const url = `${BASE_URL}${r}`;
    const res = await fetchHead(url, TIMEOUT_MS);
    const ok = res.status === 200;
    const slow = res.elapsed > MAX_RESPONSE_MS;
    record(`GET ${r}`, ok && !slow, `${res.status} | ${res.elapsed}ms${slow ? ` (>${MAX_RESPONSE_MS}ms slow)` : ""}`);
  } catch (e) {
    record(`GET ${r}`, false, `error: ${e.message}`);
  }
}

// 2. API routes
console.log(BOLD("\n2. API routes"));
for (const r of API_ROUTES) {
  const method = r.method || "GET";
  try {
    const url = `${BASE_URL}${r.path}`;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const res = await fetch(url, { method, signal: ctrl.signal });
    clearTimeout(timer);
    const ok = r.expect.includes(res.status);
    record(`${method} ${r.path}`, ok, `expected ${r.expect.join("|")}, got ${res.status}`);
  } catch (e) {
    record(`${method} ${r.path}`, false, `error: ${e.message}`);
  }
}

// 3. Images — public/images/*.webp na deployi
console.log(BOLD("\n3. Obrázky Robíků (/images/*.webp)"));
const localImages = loadLocalImageIds();
const robotIds = loadRobotIds();
const imagesToCheck = [...new Set([...localImages, ...robotIds])].sort();
for (const id of imagesToCheck) {
  try {
    const url = `${BASE_URL}/images/${id}.webp`;
    const res = await fetchHead(url, TIMEOUT_MS);
    const isLocal = localImages.includes(id);
    // Lokální obrázek musí být dosažitelný. Obrázek v robots.ts bez lokálního souboru
    // je varování (graceful), ne failure.
    if (isLocal) {
      record(`/images/${id}.webp`, res.status === 200, `${res.status} | ${res.contentLength}B`);
    } else {
      record(`/images/${id}.webp`, true, `${DIM("robot-only, no local file")}`);
    }
  } catch (e) {
    record(`/images/${id}.webp`, false, `error: ${e.message}`);
  }
}

// 4. Homepage content — regression check klíčových slov
console.log(BOLD("\n4. Homepage obsah"));
try {
  const res = await fetchGet(`${BASE_URL}/`, TIMEOUT_MS);
  const body = res.body || "";
  const missing = HOMEPAGE_KEYWORDS.filter((kw) => !body.includes(kw));
  record("homepage renderuje HTML", res.status === 200, `${res.status} | ${body.length}B | ${res.elapsed}ms`);
  if (missing.length === 0) {
    record("homepage obsahuje klíčová slova", true, `${HOMEPAGE_KEYWORDS.length}/${HOMEPAGE_KEYWORDS.length}`);
  } else {
    record("homepage obsahuje klíčová slova", false, `chybí: ${missing.join(", ")}`);
  }
} catch (e) {
  record("homepage fetch", false, `error: ${e.message}`);
}

// Shrnutí
console.log("");
console.log(BOLD("Souhrn"));
console.log(`  ${GREEN(passed + " passed")}  ${failed > 0 ? RED(failed + " failed") : DIM("0 failed")}  ${DIM(`(${imagesToCheck.length} images, ${ROUTES.length} routes, ${API_ROUTES.length} API)`)}`);

if (failures.length > 0) {
  console.log(RED("\nFailures:"));
  for (const f of failures) {
    console.log(`  ${RED("•")} ${f.name} — ${f.detail}`);
  }
  console.log(RED("\nVerification FAILED."));
  process.exit(1);
} else {
  console.log(GREEN("\nVerification OK."));
  process.exit(0);
}

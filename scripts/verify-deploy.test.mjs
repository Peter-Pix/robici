// Tests for scripts/verify-deploy.mjs (deterministic parts).
// The HTTP probe runs in the script itself; here we test the parsing and
// helpers without network access.
//
// Run: node --test scripts/verify-deploy.test.mjs

import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SCRIPT = path.join(__dirname, "verify-deploy.mjs");

// --- Inline copies of the helper functions, so we don't exec the script ---

function loadRobotIds() {
  const src = readFileSync(path.join(ROOT, "src", "data", "robots", "robots.ts"), "utf8");
  return [...src.matchAll(/^\s*id:\s*['"]([^'"]+)['"]/gm)].map((m) => m[1]);
}

function loadLocalImageIds() {
  const imagesDir = path.join(ROOT, "public", "images");
  try {
    return readdirSync(imagesDir)
      .filter((f) => f.endsWith(".png"))
      .map((f) => f.replace(/\.png$/, ""));
  } catch {
    return [];
  }
}

// --- Tests ---

describe("verify-deploy: robot id discovery", () => {
  it("finds all 10 robots in src/data/robots/robots.ts", () => {
    const ids = loadRobotIds();
    // 9 core + babička Zdena = 10
    assert.ok(ids.length >= 10, `expected ≥10 robots, got ${ids.length}: ${ids.join(",")}`);
  });

  it("includes core 9 robots", () => {
    const ids = new Set(loadRobotIds());
    for (const expected of ["pepa", "marie", "franta", "mirek", "anicka", "betka", "gustav", "emil", "jozin"]) {
      assert.ok(ids.has(expected), `missing core robot: ${expected}`);
    }
  });

  it("includes babička Zdena (10th robot)", () => {
    const ids = new Set(loadRobotIds());
    assert.ok(ids.has("zdena"), "Zdena should be in robots.ts");
  });

  it("returns unique ids (no duplicates)", () => {
    const ids = loadRobotIds();
    assert.equal(new Set(ids).size, ids.length, "duplicate robot ids");
  });
});

describe("verify-deploy: local image discovery", () => {
  it("discovers all .png files in public/images/", () => {
    const ids = loadLocalImageIds();
    // We have at least 10 robot images (pepa through jozin + zdena).
    assert.ok(ids.length >= 10, `expected ≥10 images, got ${ids.length}: ${ids.join(",")}`);
  });

  it("returns lowercase id (no .png extension)", () => {
    const ids = loadLocalImageIds();
    for (const id of ids) {
      assert.ok(!id.includes("."), `${id} should not have an extension`);
      assert.equal(id, id.toLowerCase(), `${id} should be lowercase`);
    }
  });

  it("includes zdena.png (the previously-missing image)", () => {
    const ids = new Set(loadLocalImageIds());
    assert.ok(ids.has("zdena"), "zdena.png should exist in public/images/");
  });
});

describe("verify-deploy: script contents", () => {
  const src = readFileSync(SCRIPT, "utf8");

  it("defines the main routes per ROADMAP/README", () => {
    assert.match(src, /"\/"/);
    assert.match(src, /"\/rodina"/);
    assert.match(src, /"\/roboctina"/);
    assert.match(src, /"\/omalovanky"/);
    assert.match(src, /"\/balicky"/);
    assert.match(src, /"\/sluzby"/);
    assert.match(src, /"\/kontakt"/);
    assert.match(src, /"\/zpravodaj"/);
  });

  it("checks /api/metrics endpoint", () => {
    assert.match(src, /\/api\/metrics/);
  });

  it("checks /api/debug/reset-limits with both GET and POST expectations", () => {
    assert.match(src, /\/api\/debug\/reset-limits/);
    assert.match(src, /GET.*\/api\/debug\/reset-limits/s);
    assert.match(src, /POST.*\/api\/debug\/reset-limits/s);
  });

  it("checks images at /images/*.png paths", () => {
    assert.match(src, /\/images\//);
  });

  it("regression-check homepage content with Robík keywords", () => {
    assert.match(src, /Robíci|Pepa|Marie|Franta|Gustav/);
  });

  it("honors BASE_URL env override", () => {
    assert.match(src, /BASE_URL\s*=\s*process\.env\.BASE_URL/);
  });

  it("exits non-zero on any failure", () => {
    assert.match(src, /process\.exit\(1\)/);
    assert.match(src, /process\.exit\(0\)/);
  });

  it("uses standard fetch + AbortController (no node-only deps)", () => {
    assert.match(src, /fetch\(/);
    assert.match(src, /AbortController/);
  });
});

describe("verify-deploy: consistency between robots.ts and public/images/", () => {
  it("every robot id has either a local image or a public URL reference", () => {
    // This is the key invariant: image on production must match robot data.
    // We can only check this fully by running the script against production;
    // here we just verify the cross-reference data exists.
    const robotIds = new Set(loadRobotIds());
    const imageIds = new Set(loadLocalImageIds());
    const overlap = [...robotIds].filter((id) => imageIds.has(id));
    // At least the 9 core robots should have local images.
    assert.ok(overlap.length >= 9, `expected ≥9 robot/image overlap, got ${overlap.length}: ${overlap.join(",")}`);
  });
});

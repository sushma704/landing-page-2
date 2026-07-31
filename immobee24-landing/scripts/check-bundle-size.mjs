#!/usr/bin/env node
// Build-size regression gate (engineering cleanup, 2026-07-14).
// Fails the build if the main entry chunk exceeds the raw-size budget.
// The entry must stay lean: router shell, nav/footer, consent, i18n core,
// motion core. Page copy, fr/ar overlay dictionaries, scenes and page
// components all belong in lazy route chunks — if the entry grows past the
// budget, someone re-imported one of those statically.
//
// No dependencies; runs as `node scripts/check-bundle-size.mjs [distDir]`.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// The 350KB budget describes the SHIPPABLE bundle (build:prod). Plain
// `build` keeps vite-plugin-source-identifier on, which stamps data-matrix
// attributes into every JSX element and inflates the entry ~1.6x (281KB →
// 461KB measured 2026-07-14) — grant that overhead so the gate still trips
// on real page-sized leaks without false-failing every dev build. The mode
// is detected from the chunk itself (BUILD_MODE only prefixes vite build,
// so it never reaches this script).
const PROD_MAX_KB = 350;
const DEV_MAX_KB = 580;

const dist = process.argv[2] ?? 'dist';
const assetsDir = join(dist, 'mkt-assets');

let files;
try {
  files = readdirSync(assetsDir);
} catch {
  console.error(`bundle-size check: ${assetsDir} not found — run vite build first`);
  process.exit(1);
}

// Vite names the entry chunk index-<hash>.js
const entries = files.filter((f) => /^index-[\w-]+\.js$/.test(f));
if (entries.length !== 1) {
  console.error(
    `bundle-size check: expected exactly one entry chunk (index-*.js), found ${entries.length}: ${entries.join(', ')}`
  );
  process.exit(1);
}

const entry = entries[0];
const bytes = statSync(join(assetsDir, entry)).size;
const kb = bytes / 1024;
const instrumented = readFileSync(join(assetsDir, entry), 'utf8').includes('data-matrix');
const MAX_MAIN_KB = instrumented ? DEV_MAX_KB : PROD_MAX_KB;
const modeNote = instrumented ? 'dev, incl. source-identifier overhead' : 'prod';

if (kb > MAX_MAIN_KB) {
  console.error(
    `bundle-size check FAILED: ${entry} is ${kb.toFixed(1)}KB raw (budget ${MAX_MAIN_KB}KB, ${modeNote}).\n` +
      `Something page-sized leaked into the entry chunk — check for new static imports\n` +
      `of page components, scenes, or i18n page copy in App.tsx / SiteChrome / main.tsx.`
  );
  process.exit(1);
}

console.log(`bundle-size check OK: ${entry} = ${kb.toFixed(1)}KB raw (budget ${MAX_MAIN_KB}KB, ${modeNote})`);

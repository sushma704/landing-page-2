#!/usr/bin/env node
// Build-size regression gate (engineering cleanup, 2026-07-14).
// Fails the build if the main entry chunk exceeds the raw-size budget.
// The entry must stay lean: router shell, nav/footer, consent, i18n core,
// motion core. Page copy, fr/ar overlay dictionaries, scenes and page
// components all belong in lazy route chunks — if the entry grows past the
// budget, someone re-imported one of those statically.
//
// No dependencies; runs as `node scripts/check-bundle-size.mjs [distDir]`.

import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MAX_MAIN_KB = 350;

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

if (kb > MAX_MAIN_KB) {
  console.error(
    `bundle-size check FAILED: ${entry} is ${kb.toFixed(1)}KB raw (budget ${MAX_MAIN_KB}KB).\n` +
      `Something page-sized leaked into the entry chunk — check for new static imports\n` +
      `of page components, scenes, or i18n page copy in App.tsx / SiteChrome / main.tsx.`
  );
  process.exit(1);
}

console.log(`bundle-size check OK: ${entry} = ${kb.toFixed(1)}KB raw (budget ${MAX_MAIN_KB}KB)`);

'use strict';

const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const assets = ['index.html', 'styles.css', 'app.js', 'social-cover.svg', 'favicon.svg'];

// Only allowlisted, public assets are copied. Source files, tests and local
// configuration must not accidentally become publicly downloadable.
for (const asset of assets) {
  if (!fs.statSync(path.join(root, asset), { throwIfNoEntry: false })?.isFile()) {
    throw new Error(`Missing website asset: ${asset}`);
  }
}

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const asset of assets) {
  fs.copyFileSync(path.join(root, asset), path.join(output, asset));
}

console.log(`Built ${assets.length} public assets in dist/ for Vercel.`);

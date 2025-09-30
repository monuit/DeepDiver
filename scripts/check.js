// scripts/check.js
// Basic checks for the Chrome extension repository to be used in CI and locally.
// - Validates JSON syntax for manifest.json
// - Ensures required files exist
// - Basic sanity checks

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'manifest.json');
const requiredFiles = [
  'manifest.json',
  'service-worker.js',
  'popup/popup.html'
];

let failed = false;

function ok(msg) { console.log('[OK] ' + msg); }
function err(msg) { console.error('[ERR] ' + msg); failed = true; }

// manifest.json syntax
try {
  const raw = fs.readFileSync(manifestPath, 'utf8');
  JSON.parse(raw);
  ok('manifest.json parses as JSON');
} catch (e) {
  err('manifest.json is not valid JSON: ' + e.message);
}

// required files exist
requiredFiles.forEach(f => {
  const p = path.join(root, f);
  if (!fs.existsSync(p)) err('Missing required file: ' + f);
  else ok('Found: ' + f);
});

// basic manifest content checks
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  if (!manifest.manifest_version) err('manifest.json missing manifest_version'); else ok('manifest_version present');
  if (!manifest.name) err('manifest.json missing name'); else ok('name present');
  if (!manifest.version) err('manifest.json missing version'); else ok('version present');
} catch (e) { /* already reported */ }

if (failed) {
  console.error('\nOne or more checks failed');
  process.exit(2);
} else {
  console.log('\nAll checks passed');
  process.exit(0);
}

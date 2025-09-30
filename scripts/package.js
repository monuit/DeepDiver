// scripts/package.js
// Package the extension into a zip file in dist/

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
if (!fs.existsSync(dist)) fs.mkdirSync(dist);

const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
const name = manifest.name || 'DeepDiver';
const version = manifest.version || '0.0.0';
const filename = `${name.replace(/\s+/g, '-')}-${version}.zip`;
const outPath = path.join(dist, filename);

const output = fs.createWriteStream(outPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log('Created', outPath, archive.pointer(), 'total bytes');
});
archive.on('warning', (err) => { if (err.code === 'ENOENT') console.warn(err); else throw err; });
archive.on('error', (err) => { throw err; });

archive.pipe(output);

// Files to include: everything except node_modules, dist
function shouldInclude(file) {
  const rel = path.relative(root, file);
  if (rel.startsWith('node_modules') || rel.startsWith('dist') || rel.startsWith('.git')) return false;
  return true;
}

function addDir(dir) {
  const items = fs.readdirSync(dir);
  items.forEach(name => {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (!shouldInclude(full)) return;
    if (stat.isDirectory()) addDir(full);
    else archive.file(full, { name: path.relative(root, full) });
  });
}

addDir(root);
archive.finalize();

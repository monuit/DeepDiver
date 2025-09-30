// scripts/validate-manifest.js
// Validate manifest.json against a small schema using Ajv

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'manifest.json');

const schema = {
  type: 'object',
  properties: {
    manifest_version: { type: 'number' },
    name: { type: 'string' },
    version: { type: 'string' },
    action: { type: 'object' }
  },
  required: ['manifest_version', 'name', 'version']
};

try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(manifest);
  if (!valid) {
    console.error('manifest.json failed schema validation:');
    console.error(validate.errors);
    process.exit(2);
  }
  console.log('manifest.json passed schema validation');
  process.exit(0);
} catch (e) {
  console.error('Error validating manifest.json:', e.message);
  process.exit(2);
}

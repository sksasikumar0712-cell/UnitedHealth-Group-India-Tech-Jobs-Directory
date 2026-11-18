const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
const publicFiles = ['app.js', 'favicon.svg', 'index.html', 'social-cover.svg', 'styles.css'];

test('Vercel builds from a real and explicit output directory', () => {
  assert.equal(config.framework, null);
  assert.equal(config.buildCommand, 'npm run build');
  assert.equal(config.outputDirectory, 'dist');
  execFileSync(process.execPath, ['scripts/build.cjs'], { cwd: root });
  const output = path.join(root, config.outputDirectory);
  assert.deepEqual(fs.readdirSync(output).sort(), publicFiles);
  for (const name of publicFiles) {
    assert.deepEqual(
      fs.readFileSync(path.join(output, name)),
      fs.readFileSync(path.join(root, name))
    );
  }
});

test('deploy folder does not expose source, tests or config', () => {
  const output = path.join(root, config.outputDirectory);
  if (!fs.existsSync(output)) execFileSync(process.execPath, ['scripts/build.cjs'], { cwd: root });
  for (const name of ['README.md', 'package.json', 'vercel.json', 'scripts', 'tests', '.gitignore', '.env']) {
    assert.equal(fs.existsSync(path.join(output, name)), false, `Exposed ${name}`);
  }
});

import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const config = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url)));
const output = new URL(`../${config.outputDirectory}/`, import.meta.url);

test('Vercel points to the static export with the required response headers', () => {
  const headers = Object.fromEntries(config.headers[0].headers.map(({ key, value }) => [key, value]));
  assert.match(headers['Content-Security-Policy'], /script-src 'self';/);
  assert.match(headers['Content-Security-Policy'], /frame-ancestors 'none'/);
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['Referrer-Policy'], 'no-referrer');
  assert.match(headers['Strict-Transport-Security'], /max-age=\d+/);
  assert.equal(config.outputDirectory, 'dist');
});

test('static export has local assets, direct application links and external bootstrap scripts', () => {
  for (const file of ['index.html', '404.html', 'icon.svg', 'robots.txt', 'sitemap.xml', 'sasi.webp', 'tech-careers.png']) {
    assert.ok(existsSync(new URL(file, output)), `missing ${file}`);
  }
  for (const file of ['index.html', '404.html']) {
    const html = readFileSync(new URL(file, output), 'utf8');
    for (const [tag] of html.matchAll(/<script\b[^>]*>/g)) {
      const source = tag.match(/\ssrc="([^"]+)"/)?.[1];
      assert.ok(source?.startsWith('/_next/static/'), 'inline or nonlocal script found');
      assert.ok(existsSync(new URL(source.slice(1), output)), `missing script ${source}`);
    }
  }
  const html = readFileSync(new URL('index.html', output), 'utf8');
  const profile = 'href="https://linkedin.openinapp.co/f9dyq"';
  assert.equal(html.split(profile).length - 1, 2);
  assert.match(html, /src="\/sasi\.webp"/);
  const jobs = JSON.parse(readFileSync(new URL('../data/jobs.json', import.meta.url)));
  for (const job of jobs) assert.ok(html.includes(`href="${job.url}"`), `missing job ${job.id}`);
});

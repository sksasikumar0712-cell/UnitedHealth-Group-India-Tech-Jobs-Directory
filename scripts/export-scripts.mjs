import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const scripts = new URL('_next/static/bootstrap/', dist);
await mkdir(scripts, { recursive: true });

const files = await readdir(dist, { recursive: true });
for (const file of files.filter((path) => path.endsWith('.html'))) {
  const page = new URL(file, dist);
  const html = await readFile(page, 'utf8');
  const bootstrap = new Map();
  // Keep Next's bootstrap in document order while allowing script-src 'self'.
  const secured = html.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (tag, attributes, contents) => {
    if (/\ssrc\s*=/i.test(attributes)) return tag;
    const hash = createHash('sha256').update(contents).digest('hex').slice(0, 24);
    const name = hash + '.js';
    bootstrap.set(name, contents);
    return `<script${attributes} src="/_next/static/bootstrap/${name}"></script>`;
  });
  await Promise.all([...bootstrap].map(([name, contents]) => writeFile(new URL(name, scripts), contents)));
  await writeFile(page, secured);
}

// esbuild (via tsup) strips a "use client" directive from `banner`, so we prepend it
// to the built bundles here. It marks the component as a Client Component for Next.js
// App Router / React Server Components. Kept in the directive prologue, so the CJS
// bundle's own "use strict" still applies.
import { readFile, writeFile } from 'node:fs/promises';

const DIRECTIVE = '"use client";\n';
const files = ['dist/index.js', 'dist/index.cjs'];

for (const file of files) {
  const code = await readFile(file, 'utf8');
  if (!code.startsWith(DIRECTIVE)) {
    await writeFile(file, DIRECTIVE + code);
  }
}

console.log('add-directive: prepended "use client" to ESM + CJS bundles.');

import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  // No source maps in the published package — they're never bundled into consumers'
  // apps, so shipping them only bloats the install. The output isn't minified anyway.
  sourcemap: false,
  // React (incl. the automatic JSX runtime) is a peer dependency — never bundle it.
  external: ['react', 'react/jsx-runtime'],
  // The "use client" directive is added by scripts/add-directive.mjs after the build —
  // esbuild strips it from `banner`, so we prepend it ourselves (see package.json build).
});

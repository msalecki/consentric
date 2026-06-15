import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  treeshake: true,
  sourcemap: true,
  // React (incl. the automatic JSX runtime) is a peer dependency — never bundle it.
  external: ['react', 'react/jsx-runtime'],
  // The "use client" directive is added by scripts/add-directive.mjs after the build —
  // esbuild strips it from `banner`, so we prepend it ourselves (see package.json build).
});

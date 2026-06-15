import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Dev-only: serves the `example/` playground (`npm run example`). Not part of the
// published package — npm only ships `dist` (see package.json "files").
export default defineConfig({
  root: 'example',
  plugins: [react()],
  // Allow importing the library source from the parent directory (../src).
  server: { fs: { allow: ['..'] } },
});

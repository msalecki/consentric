import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// jsdom doesn't always provide rAF, which the component uses for enter/focus.
if (typeof globalThis.requestAnimationFrame !== 'function') {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(Date.now()), 0) as unknown as number);
  globalThis.cancelAnimationFrame = ((id: number) => clearTimeout(id));
}

afterEach(() => cleanup());

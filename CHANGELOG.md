# Changelog

All notable changes to consentric are documented here. This project follows
[Semantic Versioning](https://semver.org/) and the
[Keep a Changelog](https://keepachangelog.com/) format.

## [2.0.0] — 2026-07-21

Themeable light/dark release. The banner now follows the OS colour scheme by
default, and its borders, toggle tracks and fills adapt to the surface — so a
light theme works from a few colours, with no host-CSS overrides. Consolidates
fixes proven across real deployments. **No layout/dimension changes.**

### Added

- **`theme` prop** (`'auto' | 'light' | 'dark'`, default `'auto'`). `'auto'`
  follows `prefers-color-scheme` and re-renders when the OS theme changes.
- **`colors` accepts `{ light, dark }`** — the component picks the palette for the
  active theme. A single palette still applies to both themes (unchanged from v1).
- Built-in **light and dark default palettes**.
- **`logo` accepts `{ light, dark }`** to swap the brand mark by theme (a single
  node still applies to both).
- Palette **overlay tokens** — `border`, `hover`, `trackOff`, `badgeBg`,
  `cookieBg`, `link` — derived from `text` via `color-mix` when omitted.
- **`deferOpen`** (default `true`): defers the first-visit auto-open past first
  paint (double-`rAF` + `requestIdleCallback`) so the full-screen card doesn't
  starve Lighthouse of an LCP candidate (`NO_LCP`). Ignored when `defaultOpen`.
- **`fontFamily`** prop to override the font stack.
- **`primaryAction`** prop (`'save'` | `'allowAll'` | `'none'`, default `'save'`) to
  choose which action button gets brand emphasis. The default keeps the equal-weight,
  no-dark-patterns behaviour; `'allowAll'` opts into the familiar emphasised "Allow all".
- Exported types `Palette`, `ColorsProp`, `LogoProp`.

### Fixed

- **Light theme now actually works.** Hairlines, toggle tracks, count badges,
  cookie rows and button borders were hardcoded white-alpha and vanished on a
  light `surface`; they are now derived from `text`, so they read in both themes.
- **FAB (re-opener) icon** used the `text` colour and could disappear on a
  saturated/light `brand` — it now uses `onBrand`.
- **Card no longer overflows** the viewport on very narrow phones (`min-width:0`).

### Changed (breaking)

- Default rendering follows the OS colour scheme: a banner with no `colors` on a
  light-scheme OS is now **light** instead of always dark. Restore the old look
  with `theme="dark"` or by passing an explicit `colors` palette (a single
  palette is pinned to both themes, so existing `colors={…}` integrations are
  visually unchanged).

## [1.0.1] — 2026-06-15

### Changed

- Drop source maps from the published package — smaller install, and runtime is
  unaffected since source maps are never bundled into consumers' apps.

## [1.0.0] — 2026-06-15

Initial release.

### Added

- `<CookieConsent />` — a self-contained, drop-in GDPR consent banner for React.
- Google Consent Mode v2: pushes `default` (all denied) on mount and `update` on
  the visitor's choice.
- Persistent, versioned consent cookie (1 year), restored on return visits.
- 10 built-in languages (en, de, fr, es, it, pt, nl, pl, cs, sk) via the `locale`
  prop; English is the default and fallback. Exposes `LOCALES`,
  `SUPPORTED_LOCALES` and `resolveLocale`.
- Automatic cookie clearing on withdrawal (`autoClearCookies`), with trailing-`*`
  wildcard matching; the consent cookie and `necessary` are never touched.
- Full theming via the `colors` prop (CSS variables); light and dark.
- Per-category content and cookie-table overrides via `categories`.
- Accessibility: focus-trapped modal, focus restored on close, arrow-key tabs,
  ARIA wiring, `prefers-reduced-motion`.
- Equal-weight Accept/Deny actions (no dark patterns).
- Ships as a Client Component (`"use client"`) for the Next.js App Router.
- ESM + CJS builds with TypeScript types; zero runtime dependencies, zero Tailwind.

[2.0.0]: https://github.com/msalecki/consentric/releases/tag/v2.0.0
[1.0.1]: https://github.com/msalecki/consentric/releases/tag/v1.0.1
[1.0.0]: https://github.com/msalecki/consentric/releases/tag/v1.0.0

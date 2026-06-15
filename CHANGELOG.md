# Changelog

All notable changes to consentric are documented here. This project follows
[Semantic Versioning](https://semver.org/) and the
[Keep a Changelog](https://keepachangelog.com/) format.

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

[1.0.0]: https://github.com/msalecki/consentric/releases/tag/v1.0.0

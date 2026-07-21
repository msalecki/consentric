import type { ReactNode } from 'react';

/** The four consent categories. `necessary` is always granted. */
export type CatId = 'necessary' | 'preferences' | 'statistics' | 'marketing';

/** The three toggleable consent categories (necessary is always granted). */
export type Choices = { preferences: boolean; statistics: boolean; marketing: boolean };

/** A single cookie row shown in the Details tab. */
export interface CookieInfo {
  name: string;
  provider?: string;
  /** What the cookie is for. */
  purpose?: string;
  /** Short technical note, e.g. "HTTP · 2 years". */
  meta?: string;
}

/** Overridable content for one category. Anything omitted falls back to the default. */
export interface CategoryContent {
  /** Display name, e.g. "Statistics". */
  name?: string;
  /** One-line summary on the Consent tab. */
  short?: string;
  /** Longer description on the Details tab. */
  about?: string;
  /** Cookies in this category (the count badge is derived from this list). */
  cookies?: CookieInfo[];
}

/** A single theme's colour palette. Every key is optional; anything omitted falls
 *  back to the built-in default for the active theme. The last six ("overlay")
 *  tokens are derived from `text` via `color-mix` when omitted, so a light theme
 *  works from `brand`/`surface`/`text` alone — override them only for fine control. */
export interface Palette {
  brand?: string;
  brandDeep?: string;
  surface?: string;
  surfaceAlt?: string;
  text?: string;
  textMuted?: string;
  backdrop?: string;
  /** Text/icon colour on top of `brand` (primary button, toggle knob, FAB icon). */
  onBrand?: string;
  /** Hairlines and button borders. Default: `color-mix` of `text`. */
  border?: string;
  /** Button hover fill. Default: `color-mix` of `text`. */
  hover?: string;
  /** Toggle track when off. Default: `color-mix` of `text`. */
  trackOff?: string;
  /** Count-badge background. Default: `color-mix` of `text`. */
  badgeBg?: string;
  /** Cookie-row background. Default: `color-mix` of `text`. */
  cookieBg?: string;
  /** Policy-link colour on the About tab. Default: `brand`. */
  link?: string;
}

/** The `colors` prop. Either one palette (pinned to both themes — back-compatible
 *  with v1) or a `{ light, dark }` pair the component switches between by theme. */
export type ColorsProp = Palette | { light?: Palette; dark?: Palette };

/** A brand mark. Either one node (both themes) or a `{ light, dark }` pair the
 *  component swaps by the active theme — so the logo follows light/dark too. */
export type LogoProp = ReactNode | { light?: ReactNode; dark?: ReactNode };

/** Per-category overrides. The four keys are fixed (they map to Consent Mode signals). */
export interface CategoriesConfig {
  necessary?: CategoryContent;
  preferences?: CategoryContent;
  statistics?: CategoryContent;
  marketing?: CategoryContent;
}

/** Every user-facing string. Anything omitted falls back to the English default. */
export interface ConsentLabels {
  tabConsent?: string;
  tabDetails?: string;
  tabAbout?: string;
  heading?: string;
  lead?: string;
  deny?: string;
  save?: string;
  allowAll?: string;
  /** Shown when a category has no cookies. */
  noCookies?: string;
  /** Plain paragraphs on the About tab (before the operator/links line). */
  aboutParagraphs?: string[];
  /** Prefix for the operator line; `{company}` is replaced with the `company` prop. */
  operatedBy?: string;
  /** Links line; `{privacy}` and `{cookie}` are replaced with the policy links. */
  readMore?: string;
  privacyLabel?: string;
  cookieLabel?: string;
  /** aria-label for the floating settings button. */
  fabLabel?: string;
  /** aria-label for the dialog. */
  dialogLabel?: string;
}

export interface CookieConsentProps {
  /** Push gtag consent 'default' (all denied) on mount. Set false if you set it
   *  in <head> before GTM (see the file header). Default: true. */
  manageDefault?: boolean;
  /** Consent cookie name. Default: 'site_consent'. */
  cookieName?: string;
  /** Operator / brand name shown in the header and About panel. */
  company?: string;
  /** Optional brand mark for the header (an <svg/> or <img/>). Pass a single node,
   *  or `{ light, dark }` to swap the mark by theme. */
  logo?: LogoProp;
  privacyUrl?: string;
  termsUrl?: string;
  /** Built-in language pack to use (e.g. 'de', 'pl'). English is the default and
   *  the fallback for anything the pack — or your own `labels`/`categories` — omits.
   *  Region subtags are accepted ('pt-BR' resolves to 'pt'). */
  locale?: string;
  /** Open the dialog on mount even if a choice is already stored — handy for
   *  previews, Storybook or screenshots. Default: false. */
  defaultOpen?: boolean;
  /** Tab to show first. Default: 'consent'. */
  defaultTab?: 'consent' | 'details' | 'about';
  /** Which theme to render. `'auto'` (default) follows the OS `prefers-color-scheme`
   *  and re-renders when it changes; `'light'`/`'dark'` pin it. Only affects which
   *  half of a `{ light, dark }` `colors`/`logo` is used — a single palette applies
   *  to both themes. */
  theme?: 'auto' | 'light' | 'dark';
  /** Brand palette. Either one palette (applied to both themes) or `{ light, dark }`.
   *  Built-in defaults cover both themes; a light theme works from `brand`/`surface`/
   *  `text` alone (the overlay tokens are derived from `text`). */
  colors?: ColorsProp;
  /** Per-category content overrides (names, descriptions, cookie tables). */
  categories?: CategoriesConfig;
  /** UI string overrides for localisation. */
  labels?: ConsentLabels;
  /** Which action button gets primary (filled/brand) emphasis.
   *  - `'save'` (default): "Save choices" is emphasised only once the visitor turns
   *    an optional category on — Accept/Deny stay equal-weight otherwise, the
   *    GDPR-friendly default (regulators expect no dark patterns).
   *  - `'allowAll'`: "Allow all" is always emphasised (familiar consumer look).
   *  - `'none'`: no button is ever emphasised. */
  primaryAction?: 'save' | 'allowAll' | 'none';
  /** Defer the first-visit auto-open until the browser is idle (double-rAF +
   *  `requestIdleCallback`, capped ~600ms). Keeps the full-screen card from being
   *  the only thing painted on first frame, which otherwise starves Lighthouse of
   *  an LCP candidate (`NO_LCP`). Ignored when `defaultOpen`. Default: true. */
  deferOpen?: boolean;
  /** Override the font stack. Default: the system UI stack. */
  fontFamily?: string;
  /** Fired after the user makes (or changes) a choice. */
  onChange?: (choices: Choices) => void;
  /** When a category is denied or revoked, delete the cookies declared in its
   *  table (names support a trailing `*` wildcard). The consent cookie and the
   *  `necessary` category are never touched. Default: true. */
  autoClearCookies?: boolean;
}

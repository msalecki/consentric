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
  /** Optional brand mark for the header (e.g. an <svg/> or <img/>). */
  logo?: ReactNode;
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
  /** Brand palette. Defaults match the dark reference theme. For a light theme,
   *  also set `onBrand` to a colour that reads on top of `brand`. */
  colors?: {
    brand?: string;
    brandDeep?: string;
    surface?: string;
    surfaceAlt?: string;
    text?: string;
    textMuted?: string;
    backdrop?: string;
    /** Text/icon colour on top of `brand` (primary button). Default: `surface`. */
    onBrand?: string;
  };
  /** Per-category content overrides (names, descriptions, cookie tables). */
  categories?: CategoriesConfig;
  /** UI string overrides for localisation. */
  labels?: ConsentLabels;
  /** Fired after the user makes (or changes) a choice. */
  onChange?: (choices: Choices) => void;
  /** When a category is denied or revoked, delete the cookies declared in its
   *  table (names support a trailing `*` wildcard). The consent cookie and the
   *  `necessary` category are never touched. Default: true. */
  autoClearCookies?: boolean;
}

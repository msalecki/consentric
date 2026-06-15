import type { CatId, ConsentLabels } from '../types';

/** Localised name + descriptions for one category. */
export interface LocaleCategoryText {
  /** Display name, e.g. "Statistik". */
  name: string;
  /** One-line summary on the Consent tab. */
  short: string;
  /** Longer description on the Details tab. */
  about: string;
}

/** Localised strings for the default cookie rows (consent cookie + Google Analytics). */
export interface LocaleCookieText {
  /** Provider shown for the first-party consent cookie (English: "this site"). */
  selfProvider: string;
  /** Purpose of the consent cookie. */
  consentPurpose: string;
  /** Consent cookie meta, e.g. "HTTP · 1 year" localised. */
  consentMeta: string;
  /** Purpose of the `_ga` cookie. */
  gaPurpose: string;
  /** Purpose of the `_ga_*` cookie. */
  gaStatePurpose: string;
  /** `_ga`/`_ga_*` meta, e.g. "HTTP · 2 years" localised. */
  gaMeta: string;
}

/** A complete built-in translation. English is the baseline and never needs one. */
export interface LocalePack {
  labels: Required<ConsentLabels>;
  categories: Record<CatId, LocaleCategoryText>;
  cookies: LocaleCookieText;
}

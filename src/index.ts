export { CookieConsent, default } from './CookieConsent';
export type {
  CookieConsentProps,
  Choices,
  CookieInfo,
  CategoryContent,
  CategoriesConfig,
  ConsentLabels,
  Palette,
  ColorsProp,
  LogoProp,
} from './types';
export { readCookie as readConsent, VERSION as CONSENT_VERSION } from './cookies';
export { LOCALES, SUPPORTED_LOCALES, resolveLocale } from './locales';
export type { LocalePack, LocaleCategoryText, LocaleCookieText } from './locales';

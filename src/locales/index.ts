/**
 * Built-in language packs. English is the baseline and the fallback for every
 * string, so it needs no pack here. Select a language with the `locale` prop.
 */

import type { LocalePack } from './types';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { it } from './it';
import { pt } from './pt';
import { nl } from './nl';
import { pl } from './pl';
import { cs } from './cs';
import { sk } from './sk';

export type { LocalePack, LocaleCategoryText, LocaleCookieText } from './types';

/** Locale code → translation. English ('en') is intentionally absent: it is the
 *  built-in default and fallback. */
export const LOCALES: Record<string, LocalePack> = { de, fr, es, it, pt, nl, pl, cs, sk };

/** Every locale the component understands, including the built-in default `en`. */
export const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'cs', 'sk'] as const;

/** Resolve a `locale` prop to a pack, or `undefined` to use the English default.
 *  Case-insensitive and region-tolerant: 'pt-BR' falls back to 'pt'. */
export function resolveLocale(locale?: string): LocalePack | undefined {
  if (!locale) return undefined;
  const l = locale.toLowerCase();
  return LOCALES[l] ?? LOCALES[l.split('-')[0]];
}

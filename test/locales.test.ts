import { describe, it, expect } from 'vitest';
import { resolveLocale, LOCALES, SUPPORTED_LOCALES } from '../src/locales';

const PACK_CODES = ['cs', 'de', 'es', 'fr', 'it', 'nl', 'pl', 'pt', 'sk'];

describe('resolveLocale', () => {
  it('returns the pack for a known locale', () => {
    expect(resolveLocale('de')?.labels.deny).toBe('Ablehnen');
    expect(resolveLocale('pl')?.categories.statistics.name).toBe('Statystyczne');
  });

  it('is case-insensitive and strips region subtags', () => {
    expect(resolveLocale('DE')).toBe(LOCALES.de);
    expect(resolveLocale('pt-BR')).toBe(LOCALES.pt);
    expect(resolveLocale('pt-br')).toBe(LOCALES.pt);
  });

  it('returns undefined for English / unknown / empty (built-in defaults are used)', () => {
    expect(resolveLocale('en')).toBeUndefined();
    expect(resolveLocale('xx')).toBeUndefined();
    expect(resolveLocale('')).toBeUndefined();
    expect(resolveLocale(undefined)).toBeUndefined();
  });
});

describe('locale packs', () => {
  it('exposes en plus the nine packs', () => {
    expect(Object.keys(LOCALES).sort()).toEqual(PACK_CODES);
    expect([...SUPPORTED_LOCALES].sort()).toEqual(['en', ...PACK_CODES].sort());
  });

  it('every pack has the same complete shape, with placeholders preserved', () => {
    const labelKeys = Object.keys(LOCALES.de.labels).sort();
    for (const [code, pack] of Object.entries(LOCALES)) {
      expect(Object.keys(pack.labels).sort(), code).toEqual(labelKeys);
      expect(pack.labels.aboutParagraphs.length, code).toBe(3);
      expect(Object.keys(pack.categories).sort(), code).toEqual([
        'marketing', 'necessary', 'preferences', 'statistics',
      ]);
      for (const cat of Object.values(pack.categories)) {
        expect(cat.name && cat.short && cat.about, code).toBeTruthy();
      }
      expect(pack.cookies.consentPurpose && pack.cookies.consentMeta && pack.cookies.gaMeta, code).toBeTruthy();
      // Templated strings must keep their placeholders or word order breaks.
      expect(pack.labels.operatedBy, code).toContain('{company}');
      expect(pack.labels.readMore, code).toContain('{privacy}');
      expect(pack.labels.readMore, code).toContain('{cookie}');
    }
  });
});

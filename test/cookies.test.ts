import { describe, it, expect, beforeEach } from 'vitest';
import { writeCookie, readCookie, clearDeniedCookies } from '../src/cookies';

function clearAllCookies() {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim();
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
}

beforeEach(clearAllCookies);

describe('writeCookie / readCookie', () => {
  it('round-trips a versioned choice', () => {
    const choice = { preferences: true, statistics: false, marketing: true };
    writeCookie('site_consent', choice);
    expect(readCookie('site_consent')).toEqual(choice);
  });

  it('returns null when missing or malformed', () => {
    expect(readCookie('site_consent')).toBeNull();
    document.cookie = 'broken=not-json; path=/';
    expect(readCookie('broken')).toBeNull();
  });
});

describe('clearDeniedCookies', () => {
  const cats = [
    { id: 'necessary', locked: true, cookies: [{ name: 'site_consent' }] },
    { id: 'statistics', locked: false, cookies: [{ name: '_ga' }, { name: '_ga_*' }] },
    { id: 'marketing', locked: false, cookies: [{ name: 'mkt_id' }] },
  ];
  const ALL_DENIED = { preferences: false, statistics: false, marketing: false };

  it('deletes denied cookies including trailing-* wildcards', () => {
    document.cookie = '_ga=1; path=/';
    document.cookie = '_ga_ABC123=2; path=/';
    document.cookie = 'mkt_id=3; path=/';
    document.cookie = 'unrelated=4; path=/';

    clearDeniedCookies(cats, ALL_DENIED, 'site_consent');

    expect(document.cookie).not.toContain('_ga=');
    expect(document.cookie).not.toContain('_ga_ABC123');
    expect(document.cookie).not.toContain('mkt_id');
    expect(document.cookie).toContain('unrelated=4'); // not declared → kept
  });

  it('keeps cookies of a granted category', () => {
    document.cookie = '_ga=1; path=/';
    clearDeniedCookies(cats, { ...ALL_DENIED, statistics: true }, 'site_consent');
    expect(document.cookie).toContain('_ga=1');
  });

  it('never deletes the consent cookie or necessary cookies', () => {
    document.cookie = 'site_consent=keep; path=/';
    clearDeniedCookies(cats, ALL_DENIED, 'site_consent');
    expect(document.cookie).toContain('site_consent=keep');
  });
});

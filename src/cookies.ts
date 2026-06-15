/**
 * Cookie storage + Google Consent Mode plumbing.
 *
 * Keeps the browser/`document.cookie` side of the component in one place: the
 * gtag bridge, persisting/restoring the visitor's choice, and deleting a denied
 * category's declared cookies on withdrawal.
 */

import type { CatId, Choices, CookieInfo } from './types';

/** Stored-choice schema version. Bumping it re-prompts everyone on next visit. */
export const VERSION = 2;

/** gtag() pushes the live `arguments` object, exactly what Consent Mode expects. */
export const gtag: (...args: unknown[]) => void = function () {
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments);
};

/** Map the visitor's choice to the six Consent Mode signals we manage. */
export function applyConsent(ch: Choices): void {
  gtag('consent', 'update', {
    functionality_storage: ch.preferences ? 'granted' : 'denied',
    personalization_storage: ch.preferences ? 'granted' : 'denied',
    analytics_storage: ch.statistics ? 'granted' : 'denied',
    ad_storage: ch.marketing ? 'granted' : 'denied',
    ad_user_data: ch.marketing ? 'granted' : 'denied',
    ad_personalization: ch.marketing ? 'granted' : 'denied',
  });
}

export function readCookie(name: string): Choices | null {
  try {
    const m = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]+)'));
    if (!m) return null;
    const c = JSON.parse(decodeURIComponent(m[1]));
    return c && c.v === VERSION && c.choices ? (c.choices as Choices) : null;
  } catch {
    return null;
  }
}

export function writeCookie(name: string, ch: Choices): void {
  const val = encodeURIComponent(JSON.stringify({ v: VERSION, ts: Date.now(), choices: ch }));
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = name + '=' + val + '; path=/; max-age=31536000; SameSite=Lax' + secure;
}

/** Compile a cookie-table name to a matcher. A `*` is a wildcard, so `_ga_*`
 *  matches `_ga_ABC123`; everything else is matched literally. */
function cookieNameMatcher(pattern: string): RegExp {
  const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\\\*/g, '.*');
  return new RegExp('^' + escaped + '$');
}

/** Candidate `domain=` values to try when deleting a cookie: host-only, then each
 *  parent domain (dotted and undotted), so we hit wherever it was actually set —
 *  including the registrable domain (e.g. `.example.com`) that GA-style cookies use. */
function domainCandidates(): string[] {
  const out = [''];
  const host = location.hostname;
  if (!host || host === 'localhost' || /^[\d.]+$/.test(host)) return out;
  const parts = host.split('.');
  for (let i = 0; i <= parts.length - 2; i++) {
    const d = parts.slice(i).join('.');
    out.push(d, '.' + d);
  }
  return out;
}

/** `/` plus each ancestor of the current path, since cookies may be path-scoped. */
function pathCandidates(): string[] {
  const out = ['/'];
  let acc = '';
  for (const seg of location.pathname.split('/').filter(Boolean)) {
    acc += '/' + seg;
    out.push(acc);
  }
  return out;
}

/** Expire a cookie across every plausible path/domain it might have been set on. */
function expireCookie(name: string): void {
  for (const path of pathCandidates()) {
    for (const domain of domainCandidates()) {
      document.cookie =
        name + '=; path=' + path + (domain ? '; domain=' + domain : '') +
        '; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0';
    }
  }
}

/** Delete the declared cookies of every denied category. Only removes cookies that
 *  currently exist and match a name in that category's table; never touches the
 *  consent cookie or the always-granted `necessary` category. */
export function clearDeniedCookies(
  cats: { id: CatId; locked: boolean; cookies: CookieInfo[] }[],
  choices: Choices,
  consentCookie: string,
): void {
  if (typeof document === 'undefined') return;
  const present = document.cookie
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter(Boolean);
  if (!present.length) return;
  for (const cat of cats) {
    if (cat.locked || choices[cat.id as keyof Choices]) continue;
    const matchers = cat.cookies.map((c) => cookieNameMatcher(c.name));
    for (const name of present) {
      if (name === consentCookie) continue;
      if (matchers.some((re) => re.test(name))) expireCookie(name);
    }
  }
}

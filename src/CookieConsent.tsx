/**
 * CookieConsent — self-contained GDPR cookie consent for React (consentric).
 *
 * Google Consent Mode v2 (default denied, update on choice), cookie-persisted,
 * familiar tabbed UX (Consent / Details / About tabs, 4 categories, accordion).
 * ZERO dependencies, ZERO Tailwind: all styles are scoped and injected, colours
 * come from props via CSS variables, so it drops into ANY React project and
 * looks identical regardless of the host's styling setup.
 *
 * Everything user-facing is overridable: copy via `labels`, categories and their
 * cookie tables via `categories` — so the same component fits any site or language.
 * It also ships built-in language packs (the `locale` prop); English is always the
 * default and the fallback for anything a pack or your overrides omit.
 *
 * On deny/withdrawal it deletes the denied categories' declared cookies from the
 * browser (`autoClearCookies`, on by default), not just the Consent Mode signal.
 *
 * ── Usage ─────────────────────────────────────────────────────────────────
 *   import { CookieConsent } from 'consentric';
 *   <CookieConsent
 *     company="salecki.digital"
 *     locale="de"
 *     privacyUrl="/privacy"
 *     termsUrl="/privacy#cookies"
 *     colors={{ brand: '#ff5c3a', surface: '#0c0814', text: '#f4ede3' }}
 *   />
 *
 * ── Strict Consent Mode timing (recommended) ──────────────────────────────
 * For tags to be gated BEFORE GTM loads, set the default in <head>, before the
 * GTM snippet, and pass `manageDefault={false}` to this component:
 *
 *   <script>
 *     window.dataLayer = window.dataLayer || [];
 *     function gtag(){dataLayer.push(arguments);}
 *     gtag('consent','default',{
 *       ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied',
 *       analytics_storage:'denied', functionality_storage:'denied',
 *       personalization_storage:'denied', security_storage:'granted',
 *       wait_for_update:500
 *     });
 *     try { var m=document.cookie.match(/(?:^|;\s*)site_consent=([^;]+)/);
 *       var c=m?JSON.parse(decodeURIComponent(m[1])):null;
 *       if(c&&c.v===2&&c.choices) gtag('consent','update',{
 *         functionality_storage:c.choices.preferences?'granted':'denied',
 *         personalization_storage:c.choices.preferences?'granted':'denied',
 *         analytics_storage:c.choices.statistics?'granted':'denied',
 *         ad_storage:c.choices.marketing?'granted':'denied',
 *         ad_user_data:c.choices.marketing?'granted':'denied',
 *         ad_personalization:c.choices.marketing?'granted':'denied'});
 *     } catch(e){}
 *   </script>
 *
 * ── Or set the default via GTM (no HTML edit) ─────────────────────────────
 * Put the SAME script above into a GTM Custom HTML tag and fire it on the
 * "Consent Initialization - All Pages" trigger (NOT "All Pages" — Consent
 * Initialization is guaranteed to run before every other tag). Then pass
 * `manageDefault={false}`. The cookie name in the snippet MUST match `cookieName`.
 *
 * If you skip both, leave `manageDefault` on (default) — the component pushes the
 * default on mount. Good enough for simple setups; the head/GTM versions are stricter.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { CatId, CategoryContent, Choices, ConsentLabels, CookieConsentProps } from './types';
import { applyConsent, clearDeniedCookies, gtag, readCookie, writeCookie } from './cookies';
import { resolveLocale } from './locales';
import type { LocalePack } from './locales';
import { CSS } from './styles';

type TabId = 'consent' | 'details' | 'about';

const TABS: readonly TabId[] = ['consent', 'details', 'about'];
const EMPTY: Choices = { preferences: false, statistics: false, marketing: false };

const DEFAULT_LABELS: Required<ConsentLabels> = {
  tabConsent: 'Consent',
  tabDetails: 'Details',
  tabAbout: 'About',
  heading: 'This website uses cookies',
  lead: 'We use cookies to run this site and, if you allow it, to measure traffic and for marketing. Non-essential cookies stay off until you choose.',
  deny: 'Deny',
  save: 'Save choices',
  allowAll: 'Allow all',
  noCookies: 'No cookies in this category.',
  aboutParagraphs: [
    'Cookies are small text files websites use to make your experience more efficient.',
    'The law lets us store cookies that are strictly necessary to run this site. For everything else we need your permission, which is why you see this banner.',
    'You can change or withdraw your consent anytime using the cookie button in the bottom-left corner of the screen.',
  ],
  operatedBy: 'Operated by {company}. ',
  readMore: 'Read more in our {privacy} and {cookie}.',
  privacyLabel: 'Privacy policy',
  cookieLabel: 'Cookie policy',
  fabLabel: 'Cookie settings',
  dialogLabel: 'Cookie consent',
};

/** Build the default categories in English, overlaying a locale pack when given.
 *  The consent cookie's name always comes from `cookieName`; only its surrounding
 *  copy is localised. */
function defaultCategories(
  cookieName: string,
  pack?: LocalePack,
): Record<CatId, Required<CategoryContent> & { locked?: boolean }> {
  const c = pack?.categories;
  const k = pack?.cookies;
  return {
    necessary: {
      name: c?.necessary.name ?? 'Necessary',
      locked: true,
      short: c?.necessary.short ?? 'Needed to load the site and remember your choice.',
      about: c?.necessary.about ?? 'Necessary cookies make the site usable by enabling basic functions like remembering your cookie choice. The site cannot work properly without them.',
      cookies: [
        {
          name: cookieName,
          provider: k?.selfProvider ?? 'this site',
          purpose: k?.consentPurpose ?? 'Stores your cookie consent choice.',
          meta: k?.consentMeta ?? 'HTTP · 1 year',
        },
      ],
    },
    preferences: {
      name: c?.preferences.name ?? 'Preferences',
      short: c?.preferences.short ?? 'Remembers settings like your region.',
      about: c?.preferences.about ?? 'Preference cookies let the site remember information that changes how it behaves or looks, like your region.',
      cookies: [],
    },
    statistics: {
      name: c?.statistics.name ?? 'Statistics',
      short: c?.statistics.short ?? 'Anonymous usage stats to improve the site.',
      about: c?.statistics.about ?? 'Statistics cookies help us understand how visitors use the site by collecting information anonymously (Google Analytics).',
      cookies: [
        { name: '_ga', provider: 'Google', purpose: k?.gaPurpose ?? 'Distinguishes visitors to measure site usage.', meta: k?.gaMeta ?? 'HTTP · 2 years' },
        { name: '_ga_*', provider: 'Google', purpose: k?.gaStatePurpose ?? 'Maintains analytics session state.', meta: k?.gaMeta ?? 'HTTP · 2 years' },
      ],
    },
    marketing: {
      name: c?.marketing.name ?? 'Marketing',
      short: c?.marketing.short ?? 'Advertising and campaign measurement.',
      about: c?.marketing.about ?? 'Marketing cookies track visitors across sites to show relevant ads. None are set unless a marketing tag is enabled.',
      cookies: [],
    },
  };
}

/** Render a "{a} … {b} …" template with named nodes (e.g. policy links) spliced in. */
function renderTemplate(tmpl: string, slots: Record<string, ReactNode>): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\{(\w+)\}/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(tmpl)) !== null) {
    if (m.index > last) out.push(tmpl.slice(last, m.index));
    out.push(slots[m[1]] ?? m[0]);
    last = m.index + m[0].length;
  }
  if (last < tmpl.length) out.push(tmpl.slice(last));
  return out.map((node, idx) => <span key={idx}>{node}</span>);
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function Toggle({
  id,
  on,
  locked,
  label,
  onToggle,
}: {
  id: CatId;
  on: boolean;
  locked?: boolean;
  label: string;
  onToggle: (id: CatId) => void;
}) {
  return (
    <label className="tc-switch">
      <input type="checkbox" checked={on} disabled={locked} aria-label={label} onChange={() => onToggle(id)} />
      <span className="tc-track" />
      <span className="tc-thumb" />
    </label>
  );
}

export function CookieConsent({
  manageDefault = true,
  cookieName = 'site_consent',
  company,
  logo,
  privacyUrl = '/privacy',
  termsUrl = '/privacy#cookies',
  locale,
  defaultOpen = false,
  defaultTab,
  colors,
  categories,
  labels,
  onChange,
  autoClearCookies = true,
}: CookieConsentProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [shown, setShown] = useState(defaultOpen);
  const [decided, setDecided] = useState(false);
  const [tab, setTab] = useState<TabId>(defaultTab ?? 'consent');
  const [choices, setChoices] = useState<Choices>(EMPTY);
  const [accOpen, setAccOpen] = useState<Record<string, boolean>>({});
  const cardRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const pack = useMemo(() => resolveLocale(locale), [locale]);
  const L = useMemo<Required<ConsentLabels>>(() => ({ ...DEFAULT_LABELS, ...pack?.labels, ...labels }), [pack, labels]);

  const cats = useMemo(() => {
    const base = defaultCategories(cookieName, pack);
    return (['necessary', 'preferences', 'statistics', 'marketing'] as CatId[]).map((id) => {
      const d = base[id];
      const o = categories?.[id];
      const cookies = o?.cookies ?? d.cookies;
      return {
        id,
        locked: id === 'necessary',
        name: o?.name ?? d.name,
        short: o?.short ?? d.short,
        about: o?.about ?? d.about,
        cookies,
        count: cookies.length,
      };
    });
  }, [cookieName, categories, pack]);

  // Mount: set default (optional) + restore a prior choice.
  useEffect(() => {
    if (manageDefault) {
      gtag('consent', 'default', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'granted',
        wait_for_update: 500,
      });
    }
    const saved = readCookie(cookieName);
    if (saved) {
      setChoices(saved);
      applyConsent(saved);
      setDecided(true);
    }
    if (!saved || defaultOpen) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Enter animation + body scroll lock.
  useEffect(() => {
    if (!open) {
      setShown(false);
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, [open]);

  // Focus management + trap while the dialog is open; restore focus on close.
  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    const card = cardRef.current;
    card?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !card) return;
      const nodes = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === card)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      // After close the settings button is the persistent control, so prefer it;
      // fall back to whatever was focused when the dialog opened.
      const restore = restoreFocusRef.current;
      requestAnimationFrame(() => {
        const target = fabRef.current ?? (restore && restore.isConnected ? restore : null);
        target?.focus();
      });
    };
  }, [open]);

  // Escape closes once a choice exists.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && decided) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [decided]);

  const commit = (ch: Choices) => {
    writeCookie(cookieName, ch);
    applyConsent(ch);
    if (autoClearCookies) clearDeniedCookies(cats, ch, cookieName);
    setChoices(ch);
    setDecided(true);
    setOpen(false);
    onChange?.(ch);
  };
  const acceptAll = () => commit({ preferences: true, statistics: true, marketing: true });
  const denyAll = () => commit(EMPTY);
  const saveChoices = () => commit(choices);
  const toggleCat = (id: CatId) => {
    if (id === 'necessary') return;
    setChoices((ch) => ({ ...ch, [id]: !ch[id as keyof Choices] }));
  };
  const openSettings = () => {
    setChoices(readCookie(cookieName) ?? EMPTY);
    setTab('consent');
    setOpen(true);
  };
  const onTabKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const idx = TABS.indexOf(tab);
    const next = e.key === 'ArrowRight' ? (idx + 1) % TABS.length : (idx + TABS.length - 1) % TABS.length;
    const id = TABS[next];
    setTab(id);
    requestAnimationFrame(() => document.getElementById('tc-tab-' + id)?.focus());
  };

  const palette = {
    brand: colors?.brand ?? '#ff5c3a',
    brandDeep: colors?.brandDeep ?? '#eb5535',
    surface: colors?.surface ?? '#0c0814',
    surfaceAlt: colors?.surfaceAlt ?? 'rgba(255,255,255,0.035)',
    text: colors?.text ?? '#f4ede3',
    textMuted: colors?.textMuted ?? '#a89cb8',
    backdrop: colors?.backdrop ?? 'rgba(7,5,13,0.8)',
    onBrand: colors?.onBrand ?? colors?.surface ?? '#0c0814',
  };
  const vars = {
    '--tc-brand': palette.brand,
    '--tc-brand-deep': palette.brandDeep,
    '--tc-surface': palette.surface,
    '--tc-surface-alt': palette.surfaceAlt,
    '--tc-text': palette.text,
    '--tc-text-muted': palette.textMuted,
    '--tc-backdrop': palette.backdrop,
    '--tc-on-brand': palette.onBrand,
  } as CSSProperties;

  const tabLabel = (t: TabId) => (t === 'consent' ? L.tabConsent : t === 'details' ? L.tabDetails : L.tabAbout);
  // Highlight "Save choices" only when there's actually an optional category on —
  // deselecting everything makes it equivalent to "Deny", so it stops being primary.
  const hasSelection = choices.preferences || choices.statistics || choices.marketing;

  return (
    <>
      <style>{CSS}</style>

      {open && (
        <div className="tc-root" style={vars} role="dialog" aria-modal="true" aria-label={L.dialogLabel}>
          <div className="tc-backdrop" onClick={() => decided && setOpen(false)} />
          <div ref={cardRef} tabIndex={-1} className={'tc-card' + (shown ? ' tc-shown' : '')}>
            <div className="tc-head">
              <div className="tc-tabs" role="tablist" aria-label={L.dialogLabel}>
                {TABS.map((t) => (
                  <button
                    key={t}
                    id={'tc-tab-' + t}
                    type="button"
                    role="tab"
                    aria-selected={tab === t}
                    aria-controls={'tc-panel-' + t}
                    tabIndex={tab === t ? 0 : -1}
                    className={'tc-tab' + (tab === t ? ' tc-active' : '')}
                    onClick={() => setTab(t)}
                    onKeyDown={onTabKey}
                  >
                    {tabLabel(t)}
                  </button>
                ))}
              </div>
              {logo ?? (company ? <span className="tc-logo">{company}</span> : null)}
            </div>
            <hr className="tc-hr" />

            <div className="tc-body">
              {tab === 'consent' && (
                <div id="tc-panel-consent" role="tabpanel" aria-labelledby="tc-tab-consent" className="tc-panel">
                  <h2 className="tc-h2">{L.heading}</h2>
                  <p className="tc-lead">{L.lead}</p>
                  <div className="tc-grid">
                    {cats.map((cat) => (
                      <div className="tc-cat" key={cat.id}>
                        <p className="tc-cat-name">{cat.name}</p>
                        <p className="tc-cat-desc">{cat.short}</p>
                        <Toggle id={cat.id} label={cat.name} on={cat.locked ? true : choices[cat.id as keyof Choices]} locked={cat.locked} onToggle={toggleCat} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab === 'details' && (
                <div id="tc-panel-details" role="tabpanel" aria-labelledby="tc-tab-details" className="tc-panel tc-details">
                  {cats.map((cat) => {
                    const isOpen = !!accOpen[cat.id];
                    return (
                      <div className={'tc-acc' + (isOpen ? ' tc-open' : '')} key={cat.id}>
                        <div className="tc-acc-head">
                          <button type="button" className="tc-acc-btn" aria-expanded={isOpen} onClick={() => setAccOpen((s) => ({ ...s, [cat.id]: !s[cat.id] }))}>
                            <svg className="tc-chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="tc-acc-name">{cat.name}</span>
                            <span className="tc-badge">{cat.count}</span>
                          </button>
                          <Toggle id={cat.id} label={cat.name} on={cat.locked ? true : choices[cat.id as keyof Choices]} locked={cat.locked} onToggle={toggleCat} />
                        </div>
                        <p className="tc-acc-about">{cat.about}</p>
                        <div className="tc-acc-panel">
                          <div className="tc-acc-inner">
                            {cat.cookies.length ? (
                              cat.cookies.map((k) => (
                                <div className="tc-cookie" key={k.name}>
                                  <p className="tc-cookie-name">{k.name}</p>
                                  {k.purpose ? <p className="tc-cookie-purpose">{k.purpose}</p> : null}
                                  <p className="tc-cookie-meta">{[k.provider, k.meta].filter(Boolean).join(' · ')}</p>
                                </div>
                              ))
                            ) : (
                              <p className="tc-cookie-empty">{L.noCookies}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {tab === 'about' && (
                <div id="tc-panel-about" role="tabpanel" aria-labelledby="tc-tab-about" className="tc-panel tc-about">
                  {L.aboutParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p>
                    {company ? L.operatedBy.replace('{company}', company) : ''}
                    {renderTemplate(L.readMore, {
                      privacy: (
                        <a className="tc-link" href={privacyUrl}>
                          {L.privacyLabel}
                        </a>
                      ),
                      cookie: (
                        <a className="tc-link" href={termsUrl}>
                          {L.cookieLabel}
                        </a>
                      ),
                    })}
                  </p>
                </div>
              )}
            </div>

            <hr className="tc-hr" />
            <div className="tc-actions">
              <button type="button" className="tc-btn" onClick={denyAll}>
                {L.deny}
              </button>
              <button type="button" className={'tc-btn' + (hasSelection ? ' tc-btn-primary' : '')} onClick={saveChoices}>
                {L.save}
              </button>
              <button type="button" className="tc-btn" onClick={acceptAll}>
                {L.allowAll}
              </button>
            </div>
          </div>
        </div>
      )}

      {decided && !open && (
        <button ref={fabRef} type="button" className="tc-fab" style={vars} aria-label={L.fabLabel} onClick={openSettings}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
            <path d="M8.5 8.5h.01M16 15.5h.01M12 12h.01M11 17h.01M7 14h.01" />
          </svg>
        </button>
      )}
    </>
  );
}

export default CookieConsent;

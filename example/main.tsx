import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CookieConsent, SUPPORTED_LOCALES } from '../src';
import saleckiLogoDark from './logo-dark.svg';
import saleckiLogoLight from './logo-light.svg';

// salecki.digital brand palette (from the live site's CSS variables).
const SALECKI_DARK = {
  brand: '#FAE762',
  brandDeep: '#ecd94a',
  surface: '#050506',
  surfaceAlt: 'rgba(255,255,255,0.045)',
  text: '#EDEDEF',
  textMuted: '#8A8F98',
  backdrop: 'rgba(5,5,6,0.82)',
  onBrand: '#0a0a0c',
};

const SALECKI_LIGHT = {
  brand: '#FAE762',
  brandDeep: '#ecd94a',
  surface: '#ffffff',
  surfaceAlt: 'rgba(10,10,12,0.04)',
  text: '#0a0a0c',
  textMuted: '#5C606A',
  backdrop: 'rgba(10,10,12,0.4)',
  onBrand: '#0a0a0c',
};

// Per-theme mark: the dark wordmark is white ink (for dark surfaces), the light
// one is dark ink (for light surfaces). consentric swaps them by the active theme.
const logoStyle = { height: 22, display: 'block' } as const;
const logo = {
  light: <img src={saleckiLogoLight} alt="salecki.digital" style={logoStyle} />,
  dark: <img src={saleckiLogoDark} alt="salecki.digital" style={logoStyle} />,
};

const params = new URLSearchParams(location.search);
type Tab = 'consent' | 'details' | 'about';

function Playground() {
  const [locale, setLocale] = useState(params.get('locale') ?? 'en');
  const [theme, setTheme] = useState<'dark' | 'light'>(params.get('theme') === 'light' ? 'light' : 'dark');

  // The banner only appears until a choice is stored. Clear the cookie + reload
  // to bring it back (e.g. after clicking Accept/Deny while trying things out).
  const reset = () => {
    document.cookie = 'site_consent=; path=/; max-age=0';
    location.reload();
  };

  return (
    <main style={{ fontFamily: 'Inter, system-ui, sans-serif', maxWidth: 640, margin: '0 auto', padding: '2.5rem 1.5rem', color: '#111' }}>
      <h1 style={{ marginBottom: '.25rem' }}>consentric playground</h1>
      <p style={{ color: '#555', marginTop: 0 }}>
        salecki.digital branding — pick a language and theme. The banner shows on first
        load; use “Reset banner” to bring it back after choosing.
      </p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', margin: '1.5rem 0' }}>
        <label>
          Language{' '}
          <select value={locale} onChange={(e) => setLocale(e.target.value)}>
            {SUPPORTED_LOCALES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </label>
        <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          Theme: {theme}
        </button>
        <button onClick={reset}>Reset banner</button>
      </div>

      <CookieConsent
        key={locale}
        company="salecki.digital"
        logo={logo}
        locale={locale}
        privacyUrl="#privacy"
        termsUrl="#cookies"
        theme={theme}
        colors={{ light: SALECKI_LIGHT, dark: SALECKI_DARK }}
        primaryAction="allowAll"
      />
    </main>
  );
}

/** Bare mode (?bare=1) — just the banner, forced open on a given tab. Used to
 *  capture clean screenshots (?tab=consent|details|about). */
function Bare() {
  document.body.style.background = params.get('theme') === 'light' ? '#e9eaee' : '#0a0a0c';
  return (
    <CookieConsent
      company="salecki.digital"
      logo={logo}
      locale={params.get('locale') ?? 'en'}
      privacyUrl="#privacy"
      termsUrl="#cookies"
      theme={params.get('theme') === 'light' ? 'light' : 'dark'}
      colors={{ light: SALECKI_LIGHT, dark: SALECKI_DARK }}
      primaryAction="allowAll"
      defaultOpen
      defaultTab={(params.get('tab') as Tab) ?? 'consent'}
    />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>{params.has('bare') ? <Bare /> : <Playground />}</StrictMode>,
);

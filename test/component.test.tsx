import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CookieConsent } from '../src';

beforeEach(() => {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim();
    if (name) document.cookie = `${name}=; path=/; max-age=0`;
  }
});

describe('CookieConsent', () => {
  it('renders the English defaults', () => {
    render(<CookieConsent defaultOpen />);
    expect(screen.getByText('This website uses cookies')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Deny' })).toBeTruthy();
  });

  it('renders a built-in locale pack', () => {
    render(<CookieConsent defaultOpen locale="de" />);
    expect(screen.getByText('Diese Website verwendet Cookies')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Ablehnen' })).toBeTruthy();
  });

  it('lets `labels` override the pack while un-overridden keys fall back to it', () => {
    render(<CookieConsent defaultOpen locale="de" labels={{ deny: 'Nie, dziękuję' }} />);
    // override wins
    expect(screen.getByRole('button', { name: 'Nie, dziękuję' })).toBeTruthy();
    // the rest still comes from the German pack
    expect(screen.getByText('Diese Website verwendet Cookies')).toBeTruthy();
  });

  it('opens on the requested tab', () => {
    render(<CookieConsent defaultOpen defaultTab="about" />);
    const aboutTab = screen.getByRole('tab', { name: 'About' });
    expect(aboutTab.getAttribute('aria-selected')).toBe('true');
  });

  it('renders the built-in dark palette on theme="dark"', () => {
    render(<CookieConsent defaultOpen theme="dark" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.getPropertyValue('--tc-surface')).toBe('#0c0814');
    expect(dialog.style.getPropertyValue('--tc-text')).toBe('#f4ede3');
  });

  it('renders the built-in light palette on theme="light"', () => {
    render(<CookieConsent defaultOpen theme="light" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.getPropertyValue('--tc-surface')).toBe('#ffffff');
    expect(dialog.style.getPropertyValue('--tc-text')).toBe('#1a1523');
  });

  it('splits a { light, dark } colors pair by theme', () => {
    const colors = { light: { surface: '#eeeeee' }, dark: { surface: '#111111' } };
    const { rerender } = render(<CookieConsent defaultOpen theme="light" colors={colors} />);
    expect(screen.getByRole('dialog').style.getPropertyValue('--tc-surface')).toBe('#eeeeee');
    rerender(<CookieConsent defaultOpen theme="dark" colors={colors} />);
    expect(screen.getByRole('dialog').style.getPropertyValue('--tc-surface')).toBe('#111111');
  });

  it('applies a single palette to both themes (v1 back-compat)', () => {
    const { rerender } = render(<CookieConsent defaultOpen theme="light" colors={{ surface: '#abcdef' }} />);
    expect(screen.getByRole('dialog').style.getPropertyValue('--tc-surface')).toBe('#abcdef');
    rerender(<CookieConsent defaultOpen theme="dark" colors={{ surface: '#abcdef' }} />);
    expect(screen.getByRole('dialog').style.getPropertyValue('--tc-surface')).toBe('#abcdef');
  });

  it('derives overlay tokens from text via color-mix (light mode works from props)', () => {
    render(<CookieConsent defaultOpen theme="light" />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.getPropertyValue('--tc-line')).toContain('color-mix');
    expect(dialog.style.getPropertyValue('--tc-btn-border')).toContain('color-mix');
  });

  it('lets a palette override the derived overlay + link tokens', () => {
    render(<CookieConsent defaultOpen theme="dark" colors={{ border: '#f00', link: '#0f0' }} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog.style.getPropertyValue('--tc-line')).toBe('#f00');
    expect(dialog.style.getPropertyValue('--tc-btn-border')).toBe('#f00');
    expect(dialog.style.getPropertyValue('--tc-link')).toBe('#0f0');
  });

  it('swaps the logo by theme', () => {
    const themed = { light: <span>LIGHT-MARK</span>, dark: <span>DARK-MARK</span> };
    const { rerender } = render(<CookieConsent defaultOpen theme="dark" logo={themed} />);
    expect(screen.getByText('DARK-MARK')).toBeTruthy();
    expect(screen.queryByText('LIGHT-MARK')).toBeNull();
    rerender(<CookieConsent defaultOpen theme="light" logo={themed} />);
    expect(screen.getByText('LIGHT-MARK')).toBeTruthy();
    expect(screen.queryByText('DARK-MARK')).toBeNull();
  });

  it('renders a single logo node regardless of theme', () => {
    render(<CookieConsent defaultOpen theme="light" logo={<span>ONE-MARK</span>} />);
    expect(screen.getByText('ONE-MARK')).toBeTruthy();
  });

  it('emphasises no button by default on a fresh visit (equal weight)', () => {
    render(<CookieConsent defaultOpen />);
    expect(screen.getByRole('button', { name: 'Save choices' }).className).not.toContain('tc-btn-primary');
    expect(screen.getByRole('button', { name: 'Allow all' }).className).not.toContain('tc-btn-primary');
    expect(screen.getByRole('button', { name: 'Deny' }).className).not.toContain('tc-btn-primary');
  });

  it('primaryAction="allowAll" emphasises Allow all from the first render', () => {
    render(<CookieConsent defaultOpen primaryAction="allowAll" />);
    expect(screen.getByRole('button', { name: 'Allow all' }).className).toContain('tc-btn-primary');
    expect(screen.getByRole('button', { name: 'Save choices' }).className).not.toContain('tc-btn-primary');
  });

  it('primaryAction="none" never emphasises a button, even with a selection', () => {
    render(<CookieConsent defaultOpen primaryAction="none" />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Statistics' }));
    expect(screen.getByRole('button', { name: 'Save choices' }).className).not.toContain('tc-btn-primary');
    expect(screen.getByRole('button', { name: 'Allow all' }).className).not.toContain('tc-btn-primary');
  });

  it('default (save) emphasises Save choices once a category is turned on', () => {
    render(<CookieConsent defaultOpen />);
    const save = screen.getByRole('button', { name: 'Save choices' });
    expect(save.className).not.toContain('tc-btn-primary');
    fireEvent.click(screen.getByRole('checkbox', { name: 'Statistics' }));
    expect(save.className).toContain('tc-btn-primary');
  });
});

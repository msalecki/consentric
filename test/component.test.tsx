import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
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
});

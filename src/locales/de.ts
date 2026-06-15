import type { LocalePack } from './types';

/** German (Deutsch). */
export const de: LocalePack = {
  labels: {
    tabConsent: 'Einwilligung',
    tabDetails: 'Details',
    tabAbout: 'Über Cookies',
    heading: 'Diese Website verwendet Cookies',
    lead: 'Wir verwenden Cookies, um diese Website zu betreiben und – wenn Sie zustimmen – um Zugriffe zu messen und für Marketing. Nicht notwendige Cookies bleiben deaktiviert, bis Sie sich entscheiden.',
    deny: 'Ablehnen',
    save: 'Auswahl speichern',
    allowAll: 'Alle zulassen',
    noCookies: 'Keine Cookies in dieser Kategorie.',
    aboutParagraphs: [
      'Cookies sind kleine Textdateien, die Websites verwenden, um Ihr Nutzungserlebnis effizienter zu gestalten.',
      'Das Gesetz erlaubt uns, Cookies zu speichern, die für den Betrieb dieser Website unbedingt erforderlich sind. Für alles andere benötigen wir Ihre Einwilligung – deshalb sehen Sie dieses Banner.',
      'Sie können Ihre Einwilligung jederzeit über die Cookie-Schaltfläche unten links auf dem Bildschirm ändern oder widerrufen.',
    ],
    operatedBy: 'Betrieben von {company}. ',
    readMore: 'Mehr in unserer {privacy} und {cookie}.',
    privacyLabel: 'Datenschutzerklärung',
    cookieLabel: 'Cookie-Richtlinie',
    fabLabel: 'Cookie-Einstellungen',
    dialogLabel: 'Cookie-Einwilligung',
  },
  categories: {
    necessary: {
      name: 'Notwendig',
      short: 'Erforderlich, um die Website zu laden und Ihre Auswahl zu speichern.',
      about: 'Notwendige Cookies machen die Website nutzbar, indem sie grundlegende Funktionen wie das Speichern Ihrer Cookie-Auswahl ermöglichen. Ohne sie kann die Website nicht richtig funktionieren.',
    },
    preferences: {
      name: 'Präferenzen',
      short: 'Speichert Einstellungen wie Ihre Region.',
      about: 'Präferenz-Cookies ermöglichen es der Website, sich Informationen zu merken, die ihr Verhalten oder Aussehen verändern, wie etwa Ihre Region.',
    },
    statistics: {
      name: 'Statistiken',
      short: 'Anonyme Nutzungsstatistiken zur Verbesserung der Website.',
      about: 'Statistik-Cookies helfen uns zu verstehen, wie Besucher die Website nutzen, indem Informationen anonym erfasst werden (Google Analytics).',
    },
    marketing: {
      name: 'Marketing',
      short: 'Werbung und Kampagnenmessung.',
      about: 'Marketing-Cookies verfolgen Besucher über Websites hinweg, um relevante Anzeigen zu zeigen. Es werden keine gesetzt, sofern kein Marketing-Tag aktiviert ist.',
    },
  },
  cookies: {
    selfProvider: 'diese Website',
    consentPurpose: 'Speichert Ihre Cookie-Einwilligung.',
    consentMeta: 'HTTP · 1 Jahr',
    gaPurpose: 'Unterscheidet Besucher, um die Websitenutzung zu messen.',
    gaStatePurpose: 'Hält den Analyse-Sitzungsstatus aufrecht.',
    gaMeta: 'HTTP · 2 Jahre',
  },
};

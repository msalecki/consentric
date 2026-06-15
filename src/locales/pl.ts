import type { LocalePack } from './types';

/** Polish (Polski). */
export const pl: LocalePack = {
  labels: {
    tabConsent: 'Zgoda',
    tabDetails: 'Szczegóły',
    tabAbout: 'O plikach cookie',
    heading: 'Ta strona używa plików cookie',
    lead: 'Używamy plików cookie, aby prowadzić tę stronę oraz – jeśli wyrazisz zgodę – mierzyć ruch i prowadzić działania marketingowe. Pliki cookie inne niż niezbędne pozostają wyłączone, dopóki nie dokonasz wyboru.',
    deny: 'Odrzuć',
    save: 'Zapisz wybór',
    allowAll: 'Zezwól na wszystkie',
    noCookies: 'Brak plików cookie w tej kategorii.',
    aboutParagraphs: [
      'Pliki cookie to małe pliki tekstowe, których strony internetowe używają, aby usprawnić korzystanie z nich.',
      'Prawo pozwala nam przechowywać pliki cookie ściśle niezbędne do działania tej strony. We wszystkich innych przypadkach potrzebujemy Twojej zgody – dlatego widzisz ten baner.',
      'W każdej chwili możesz zmienić lub wycofać swoją zgodę za pomocą przycisku cookie w lewym dolnym rogu ekranu.',
    ],
    operatedBy: 'Prowadzone przez {company}. ',
    readMore: 'Więcej informacji w naszej {privacy} i {cookie}.',
    privacyLabel: 'Polityce prywatności',
    cookieLabel: 'Polityce cookie',
    fabLabel: 'Ustawienia plików cookie',
    dialogLabel: 'Zgoda na pliki cookie',
  },
  categories: {
    necessary: {
      name: 'Niezbędne',
      short: 'Potrzebne do załadowania strony i zapamiętania Twojego wyboru.',
      about: 'Niezbędne pliki cookie umożliwiają korzystanie ze strony, udostępniając podstawowe funkcje, takie jak zapamiętanie Twojego wyboru dotyczącego plików cookie. Bez nich strona nie może działać prawidłowo.',
    },
    preferences: {
      name: 'Preferencje',
      short: 'Zapamiętuje ustawienia, takie jak Twój region.',
      about: 'Pliki cookie preferencji pozwalają stronie zapamiętać informacje, które zmieniają jej zachowanie lub wygląd, takie jak Twój region.',
    },
    statistics: {
      name: 'Statystyczne',
      short: 'Anonimowe statystyki użytkowania w celu ulepszenia strony.',
      about: 'Statystyczne pliki cookie pomagają nam zrozumieć, w jaki sposób odwiedzający korzystają ze strony, zbierając informacje anonimowo (Google Analytics).',
    },
    marketing: {
      name: 'Marketingowe',
      short: 'Reklamy i pomiar skuteczności kampanii.',
      about: 'Marketingowe pliki cookie śledzą odwiedzających na różnych stronach, aby wyświetlać trafne reklamy. Żaden nie jest ustawiany, o ile nie włączono tagu marketingowego.',
    },
  },
  cookies: {
    selfProvider: 'ta strona',
    consentPurpose: 'Przechowuje Twoją zgodę na pliki cookie.',
    consentMeta: 'HTTP · 1 rok',
    gaPurpose: 'Rozróżnia odwiedzających, aby mierzyć korzystanie ze strony.',
    gaStatePurpose: 'Utrzymuje stan sesji analitycznej.',
    gaMeta: 'HTTP · 2 lata',
  },
};

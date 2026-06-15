import type { LocalePack } from './types';

/** Slovak (Slovenčina). */
export const sk: LocalePack = {
  labels: {
    tabConsent: 'Súhlas',
    tabDetails: 'Podrobnosti',
    tabAbout: 'O súboroch cookie',
    heading: 'Táto webová stránka používa súbory cookie',
    lead: 'Súbory cookie používame na prevádzku tejto stránky a – ak to povolíte – na meranie návštevnosti a na marketing. Súbory cookie, ktoré nie sú nevyhnutné, zostávajú vypnuté, kým sa nerozhodnete.',
    deny: 'Odmietnuť',
    save: 'Uložiť voľby',
    allowAll: 'Povoliť všetky',
    noCookies: 'V tejto kategórii nie sú žiadne súbory cookie.',
    aboutParagraphs: [
      'Súbory cookie sú malé textové súbory, ktoré webové stránky používajú na to, aby bolo vaše používanie efektívnejšie.',
      'Zákon nám umožňuje ukladať súbory cookie, ktoré sú nevyhnutne potrebné na prevádzku tejto stránky. Pre všetko ostatné potrebujeme váš súhlas, a preto vidíte tento banner.',
      'Svoj súhlas môžete kedykoľvek zmeniť alebo odvolať pomocou tlačidla cookie v ľavom dolnom rohu obrazovky.',
    ],
    operatedBy: 'Prevádzkuje {company}. ',
    readMore: 'Viac informácií nájdete v našich {privacy} a {cookie}.',
    privacyLabel: 'zásadách ochrany osobných údajov',
    cookieLabel: 'zásadách používania súborov cookie',
    fabLabel: 'Nastavenia súborov cookie',
    dialogLabel: 'Súhlas so súbormi cookie',
  },
  categories: {
    necessary: {
      name: 'Nevyhnutné',
      short: 'Potrebné na načítanie stránky a zapamätanie vašej voľby.',
      about: 'Nevyhnutné súbory cookie umožňujú používanie stránky tým, že zabezpečujú základné funkcie, ako je zapamätanie vašej voľby cookie. Bez nich stránka nemôže správne fungovať.',
    },
    preferences: {
      name: 'Predvoľby',
      short: 'Zapamätá si nastavenia, ako je váš región.',
      about: 'Súbory cookie predvolieb umožňujú stránke zapamätať si informácie, ktoré menia jej správanie alebo vzhľad, napríklad váš región.',
    },
    statistics: {
      name: 'Štatistické',
      short: 'Anonymné štatistiky používania na zlepšenie stránky.',
      about: 'Štatistické súbory cookie nám pomáhajú pochopiť, ako návštevníci stránku používajú, prostredníctvom anonymného zberu informácií (Google Analytics).',
    },
    marketing: {
      name: 'Marketingové',
      short: 'Reklama a meranie kampaní.',
      about: 'Marketingové súbory cookie sledujú návštevníkov naprieč stránkami a zobrazujú relevantné reklamy. Žiadne sa nenastavia, pokiaľ nie je povolená marketingová značka.',
    },
  },
  cookies: {
    selfProvider: 'táto stránka',
    consentPurpose: 'Ukladá váš súhlas so súbormi cookie.',
    consentMeta: 'HTTP · 1 rok',
    gaPurpose: 'Rozlišuje návštevníkov na meranie používania stránky.',
    gaStatePurpose: 'Udržiava stav analytickej relácie.',
    gaMeta: 'HTTP · 2 roky',
  },
};

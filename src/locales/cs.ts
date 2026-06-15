import type { LocalePack } from './types';

/** Czech (Čeština). */
export const cs: LocalePack = {
  labels: {
    tabConsent: 'Souhlas',
    tabDetails: 'Podrobnosti',
    tabAbout: 'O souborech cookie',
    heading: 'Tento web používá soubory cookie',
    lead: 'Soubory cookie používáme k provozu tohoto webu a – pokud to povolíte – k měření návštěvnosti a pro marketing. Soubory cookie, které nejsou nezbytné, zůstávají vypnuté, dokud se nerozhodnete.',
    deny: 'Odmítnout',
    save: 'Uložit volby',
    allowAll: 'Povolit vše',
    noCookies: 'V této kategorii nejsou žádné soubory cookie.',
    aboutParagraphs: [
      'Soubory cookie jsou malé textové soubory, které weby používají k tomu, aby vaše používání bylo efektivnější.',
      'Zákon nám umožňuje ukládat soubory cookie, které jsou nezbytně nutné k provozu tohoto webu. Pro vše ostatní potřebujeme váš souhlas, a proto vidíte tento banner.',
      'Svůj souhlas můžete kdykoli změnit nebo odvolat pomocí tlačítka cookie v levém dolním rohu obrazovky.',
    ],
    operatedBy: 'Provozuje {company}. ',
    readMore: 'Více informací najdete v našich {privacy} a {cookie}.',
    privacyLabel: 'zásadách ochrany osobních údajů',
    cookieLabel: 'zásadách používání souborů cookie',
    fabLabel: 'Nastavení souborů cookie',
    dialogLabel: 'Souhlas se soubory cookie',
  },
  categories: {
    necessary: {
      name: 'Nezbytné',
      short: 'Potřebné k načtení webu a zapamatování vaší volby.',
      about: 'Nezbytné soubory cookie umožňují používání webu tím, že zajišťují základní funkce, jako je zapamatování vaší volby cookie. Bez nich web nemůže správně fungovat.',
    },
    preferences: {
      name: 'Předvolby',
      short: 'Zapamatuje si nastavení, jako je váš region.',
      about: 'Soubory cookie předvoleb umožňují webu zapamatovat si informace, které mění jeho chování nebo vzhled, například váš region.',
    },
    statistics: {
      name: 'Statistické',
      short: 'Anonymní statistiky používání pro vylepšení webu.',
      about: 'Statistické soubory cookie nám pomáhají pochopit, jak návštěvníci web používají, a to anonymním sběrem informací (Google Analytics).',
    },
    marketing: {
      name: 'Marketingové',
      short: 'Reklama a měření kampaní.',
      about: 'Marketingové soubory cookie sledují návštěvníky napříč weby a zobrazují relevantní reklamy. Žádné se nenastaví, pokud není povolena marketingová značka.',
    },
  },
  cookies: {
    selfProvider: 'tento web',
    consentPurpose: 'Ukládá váš souhlas se soubory cookie.',
    consentMeta: 'HTTP · 1 rok',
    gaPurpose: 'Rozlišuje návštěvníky pro měření používání webu.',
    gaStatePurpose: 'Udržuje stav analytické relace.',
    gaMeta: 'HTTP · 2 roky',
  },
};

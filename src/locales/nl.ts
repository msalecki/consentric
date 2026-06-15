import type { LocalePack } from './types';

/** Dutch (Nederlands). */
export const nl: LocalePack = {
  labels: {
    tabConsent: 'Toestemming',
    tabDetails: 'Details',
    tabAbout: 'Over cookies',
    heading: 'Deze website gebruikt cookies',
    lead: 'We gebruiken cookies om deze site te laten werken en, als u dat toestaat, om verkeer te meten en voor marketing. Niet-essentiële cookies blijven uitgeschakeld totdat u kiest.',
    deny: 'Weigeren',
    save: 'Keuzes opslaan',
    allowAll: 'Alles toestaan',
    noCookies: 'Geen cookies in deze categorie.',
    aboutParagraphs: [
      'Cookies zijn kleine tekstbestanden die websites gebruiken om uw ervaring efficiënter te maken.',
      'De wet staat ons toe cookies op te slaan die strikt noodzakelijk zijn om deze site te laten werken. Voor al het andere hebben we uw toestemming nodig, daarom ziet u deze melding.',
      'U kunt uw toestemming op elk moment wijzigen of intrekken via de cookieknop linksonder op het scherm.',
    ],
    operatedBy: 'Beheerd door {company}. ',
    readMore: 'Lees meer in ons {privacy} en {cookie}.',
    privacyLabel: 'privacybeleid',
    cookieLabel: 'cookiebeleid',
    fabLabel: 'Cookie-instellingen',
    dialogLabel: 'Cookietoestemming',
  },
  categories: {
    necessary: {
      name: 'Noodzakelijk',
      short: 'Nodig om de site te laden en uw keuze te onthouden.',
      about: 'Noodzakelijke cookies maken de site bruikbaar door basisfuncties mogelijk te maken, zoals het onthouden van uw cookiekeuze. De site kan zonder deze cookies niet goed werken.',
    },
    preferences: {
      name: 'Voorkeuren',
      short: 'Onthoudt instellingen zoals uw regio.',
      about: 'Voorkeurscookies laten de site informatie onthouden die het gedrag of uiterlijk verandert, zoals uw regio.',
    },
    statistics: {
      name: 'Statistieken',
      short: 'Anonieme gebruiksstatistieken om de site te verbeteren.',
      about: 'Statistiekcookies helpen ons te begrijpen hoe bezoekers de site gebruiken door anoniem informatie te verzamelen (Google Analytics).',
    },
    marketing: {
      name: 'Marketing',
      short: 'Advertenties en campagnemeting.',
      about: 'Marketingcookies volgen bezoekers over verschillende sites om relevante advertenties te tonen. Er worden er geen geplaatst tenzij een marketingtag is ingeschakeld.',
    },
  },
  cookies: {
    selfProvider: 'deze site',
    consentPurpose: 'Slaat uw cookietoestemming op.',
    consentMeta: 'HTTP · 1 jaar',
    gaPurpose: 'Onderscheidt bezoekers om het sitegebruik te meten.',
    gaStatePurpose: 'Houdt de status van de analysesessie bij.',
    gaMeta: 'HTTP · 2 jaar',
  },
};

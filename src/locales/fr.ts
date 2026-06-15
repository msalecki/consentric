import type { LocalePack } from './types';

/** French (Français). */
export const fr: LocalePack = {
  labels: {
    tabConsent: 'Consentement',
    tabDetails: 'Détails',
    tabAbout: 'À propos',
    heading: 'Ce site utilise des cookies',
    lead: 'Nous utilisons des cookies pour faire fonctionner ce site et, si vous l’autorisez, pour mesurer l’audience et à des fins marketing. Les cookies non essentiels restent désactivés jusqu’à votre choix.',
    deny: 'Refuser',
    save: 'Enregistrer les choix',
    allowAll: 'Tout autoriser',
    noCookies: 'Aucun cookie dans cette catégorie.',
    aboutParagraphs: [
      'Les cookies sont de petits fichiers texte que les sites web utilisent pour rendre votre expérience plus efficace.',
      'La loi nous autorise à stocker les cookies strictement nécessaires au fonctionnement de ce site. Pour tout le reste, nous avons besoin de votre autorisation, c’est pourquoi vous voyez cette bannière.',
      'Vous pouvez modifier ou retirer votre consentement à tout moment à l’aide du bouton cookies en bas à gauche de l’écran.',
    ],
    operatedBy: 'Exploité par {company}. ',
    readMore: 'En savoir plus dans notre {privacy} et notre {cookie}.',
    privacyLabel: 'politique de confidentialité',
    cookieLabel: 'politique relative aux cookies',
    fabLabel: 'Paramètres des cookies',
    dialogLabel: 'Consentement aux cookies',
  },
  categories: {
    necessary: {
      name: 'Nécessaires',
      short: 'Nécessaires pour charger le site et mémoriser votre choix.',
      about: 'Les cookies nécessaires rendent le site utilisable en activant des fonctions de base comme la mémorisation de votre choix de cookies. Le site ne peut pas fonctionner correctement sans eux.',
    },
    preferences: {
      name: 'Préférences',
      short: 'Mémorise des réglages comme votre région.',
      about: 'Les cookies de préférences permettent au site de mémoriser des informations qui modifient son comportement ou son apparence, comme votre région.',
    },
    statistics: {
      name: 'Statistiques',
      short: 'Statistiques d’utilisation anonymes pour améliorer le site.',
      about: 'Les cookies statistiques nous aident à comprendre comment les visiteurs utilisent le site en collectant des informations de manière anonyme (Google Analytics).',
    },
    marketing: {
      name: 'Marketing',
      short: 'Publicité et mesure des campagnes.',
      about: 'Les cookies marketing suivent les visiteurs à travers les sites pour afficher des publicités pertinentes. Aucun n’est déposé sauf si une balise marketing est activée.',
    },
  },
  cookies: {
    selfProvider: 'ce site',
    consentPurpose: 'Enregistre votre consentement aux cookies.',
    consentMeta: 'HTTP · 1 an',
    gaPurpose: 'Distingue les visiteurs pour mesurer l’utilisation du site.',
    gaStatePurpose: 'Maintient l’état de la session d’analyse.',
    gaMeta: 'HTTP · 2 ans',
  },
};

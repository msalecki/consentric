import type { LocalePack } from './types';

/** Italian (Italiano). */
export const it: LocalePack = {
  labels: {
    tabConsent: 'Consenso',
    tabDetails: 'Dettagli',
    tabAbout: 'Informazioni',
    heading: 'Questo sito web utilizza i cookie',
    lead: 'Utilizziamo i cookie per far funzionare questo sito e, se lo consenti, per misurare il traffico e per il marketing. I cookie non essenziali restano disattivati finché non scegli.',
    deny: 'Rifiuta',
    save: 'Salva scelte',
    allowAll: 'Consenti tutti',
    noCookies: 'Nessun cookie in questa categoria.',
    aboutParagraphs: [
      'I cookie sono piccoli file di testo che i siti web utilizzano per rendere la tua esperienza più efficiente.',
      'La legge ci consente di memorizzare i cookie strettamente necessari al funzionamento di questo sito. Per tutto il resto abbiamo bisogno del tuo permesso, motivo per cui vedi questo banner.',
      'Puoi modificare o revocare il tuo consenso in qualsiasi momento tramite il pulsante dei cookie in basso a sinistra dello schermo.',
    ],
    operatedBy: 'Gestito da {company}. ',
    readMore: 'Maggiori informazioni nella nostra {privacy} e nella nostra {cookie}.',
    privacyLabel: 'informativa sulla privacy',
    cookieLabel: 'informativa sui cookie',
    fabLabel: 'Impostazioni cookie',
    dialogLabel: 'Consenso ai cookie',
  },
  categories: {
    necessary: {
      name: 'Necessari',
      short: 'Necessari per caricare il sito e ricordare la tua scelta.',
      about: 'I cookie necessari rendono il sito utilizzabile abilitando funzioni di base come ricordare la tua scelta sui cookie. Il sito non può funzionare correttamente senza di essi.',
    },
    preferences: {
      name: 'Preferenze',
      short: 'Ricorda impostazioni come la tua regione.',
      about: 'I cookie di preferenza consentono al sito di ricordare informazioni che ne modificano il comportamento o l’aspetto, come la tua regione.',
    },
    statistics: {
      name: 'Statistiche',
      short: 'Statistiche di utilizzo anonime per migliorare il sito.',
      about: 'I cookie statistici ci aiutano a capire come i visitatori utilizzano il sito raccogliendo informazioni in forma anonima (Google Analytics).',
    },
    marketing: {
      name: 'Marketing',
      short: 'Pubblicità e misurazione delle campagne.',
      about: 'I cookie di marketing tracciano i visitatori tra i siti per mostrare annunci pertinenti. Nessuno viene impostato a meno che non sia attivato un tag di marketing.',
    },
  },
  cookies: {
    selfProvider: 'questo sito',
    consentPurpose: 'Memorizza il tuo consenso ai cookie.',
    consentMeta: 'HTTP · 1 anno',
    gaPurpose: 'Distingue i visitatori per misurare l’utilizzo del sito.',
    gaStatePurpose: 'Mantiene lo stato della sessione di analisi.',
    gaMeta: 'HTTP · 2 anni',
  },
};

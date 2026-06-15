import type { LocalePack } from './types';

/** Portuguese (Português). */
export const pt: LocalePack = {
  labels: {
    tabConsent: 'Consentimento',
    tabDetails: 'Detalhes',
    tabAbout: 'Sobre',
    heading: 'Este site utiliza cookies',
    lead: 'Utilizamos cookies para executar este site e, se permitir, para medir o tráfego e para marketing. Os cookies não essenciais permanecem desativados até que escolha.',
    deny: 'Recusar',
    save: 'Guardar escolhas',
    allowAll: 'Permitir todos',
    noCookies: 'Nenhum cookie nesta categoria.',
    aboutParagraphs: [
      'Os cookies são pequenos ficheiros de texto que os sites utilizam para tornar a sua experiência mais eficiente.',
      'A lei permite-nos armazenar cookies estritamente necessários ao funcionamento deste site. Para tudo o resto precisamos da sua permissão, e é por isso que vê este aviso.',
      'Pode alterar ou retirar o seu consentimento a qualquer momento através do botão de cookies no canto inferior esquerdo do ecrã.',
    ],
    operatedBy: 'Operado por {company}. ',
    readMore: 'Saiba mais na nossa {privacy} e {cookie}.',
    privacyLabel: 'política de privacidade',
    cookieLabel: 'política de cookies',
    fabLabel: 'Definições de cookies',
    dialogLabel: 'Consentimento de cookies',
  },
  categories: {
    necessary: {
      name: 'Necessários',
      short: 'Necessários para carregar o site e lembrar a sua escolha.',
      about: 'Os cookies necessários tornam o site utilizável ao ativar funções básicas como lembrar a sua escolha de cookies. O site não pode funcionar corretamente sem eles.',
    },
    preferences: {
      name: 'Preferências',
      short: 'Lembra definições como a sua região.',
      about: 'Os cookies de preferências permitem que o site se lembre de informações que alteram o seu comportamento ou aparência, como a sua região.',
    },
    statistics: {
      name: 'Estatísticas',
      short: 'Estatísticas de utilização anónimas para melhorar o site.',
      about: 'Os cookies estatísticos ajudam-nos a perceber como os visitantes utilizam o site, recolhendo informações de forma anónima (Google Analytics).',
    },
    marketing: {
      name: 'Marketing',
      short: 'Publicidade e medição de campanhas.',
      about: 'Os cookies de marketing seguem os visitantes através dos sites para mostrar anúncios relevantes. Nenhum é definido a menos que uma tag de marketing esteja ativada.',
    },
  },
  cookies: {
    selfProvider: 'este site',
    consentPurpose: 'Armazena o seu consentimento de cookies.',
    consentMeta: 'HTTP · 1 ano',
    gaPurpose: 'Distingue os visitantes para medir a utilização do site.',
    gaStatePurpose: 'Mantém o estado da sessão de análise.',
    gaMeta: 'HTTP · 2 anos',
  },
};

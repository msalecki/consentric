import type { LocalePack } from './types';

/** Spanish (Español). */
export const es: LocalePack = {
  labels: {
    tabConsent: 'Consentimiento',
    tabDetails: 'Detalles',
    tabAbout: 'Acerca de',
    heading: 'Este sitio web utiliza cookies',
    lead: 'Utilizamos cookies para hacer funcionar este sitio y, si lo permite, para medir el tráfico y con fines de marketing. Las cookies no esenciales permanecen desactivadas hasta que usted elija.',
    deny: 'Rechazar',
    save: 'Guardar elección',
    allowAll: 'Permitir todas',
    noCookies: 'No hay cookies en esta categoría.',
    aboutParagraphs: [
      'Las cookies son pequeños archivos de texto que los sitios web utilizan para hacer su experiencia más eficiente.',
      'La ley nos permite almacenar cookies estrictamente necesarias para el funcionamiento de este sitio. Para todo lo demás necesitamos su permiso, por eso ve este aviso.',
      'Puede cambiar o retirar su consentimiento en cualquier momento mediante el botón de cookies en la esquina inferior izquierda de la pantalla.',
    ],
    operatedBy: 'Operado por {company}. ',
    readMore: 'Más información en nuestra {privacy} y {cookie}.',
    privacyLabel: 'política de privacidad',
    cookieLabel: 'política de cookies',
    fabLabel: 'Configuración de cookies',
    dialogLabel: 'Consentimiento de cookies',
  },
  categories: {
    necessary: {
      name: 'Necesarias',
      short: 'Necesarias para cargar el sitio y recordar su elección.',
      about: 'Las cookies necesarias hacen que el sitio sea utilizable al habilitar funciones básicas como recordar su elección de cookies. El sitio no puede funcionar correctamente sin ellas.',
    },
    preferences: {
      name: 'Preferencias',
      short: 'Recuerda ajustes como su región.',
      about: 'Las cookies de preferencias permiten que el sitio recuerde información que cambia su comportamiento o aspecto, como su región.',
    },
    statistics: {
      name: 'Estadísticas',
      short: 'Estadísticas de uso anónimas para mejorar el sitio.',
      about: 'Las cookies estadísticas nos ayudan a entender cómo los visitantes usan el sitio recopilando información de forma anónima (Google Analytics).',
    },
    marketing: {
      name: 'Marketing',
      short: 'Publicidad y medición de campañas.',
      about: 'Las cookies de marketing rastrean a los visitantes a través de los sitios para mostrar anuncios relevantes. No se establece ninguna a menos que se active una etiqueta de marketing.',
    },
  },
  cookies: {
    selfProvider: 'este sitio',
    consentPurpose: 'Almacena su consentimiento de cookies.',
    consentMeta: 'HTTP · 1 año',
    gaPurpose: 'Distingue a los visitantes para medir el uso del sitio.',
    gaStatePurpose: 'Mantiene el estado de la sesión de analítica.',
    gaMeta: 'HTTP · 2 años',
  },
};

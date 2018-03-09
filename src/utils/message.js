const translations = {
  es: {
    spanish: ['Español', 'ES'],
    english: ['Inglés', 'EN'],
    home: 'Inicio',
    campaigns: 'Campañas',
    myCampaigns: ['Ver campañas', 'Campañas'],
    newMessage: ['Nuevo mensaje', 'Mensaje'],
    tools: 'Herramientas',
    externalApps: ['Rastrear aplicaciones', 'Rastrear apps'],
    topics: 'Grupos de interés',
    areas: ['Gestionar áreas', 'Áreas'],
    statistics: 'Estadísticas',
    byDevice: ['Por dispositivo', 'device'],
    byCampaign: ['Por campaña', 'campaign'],
    configuration: ['Configuración de cuenta', 'Configuración'],
    help: 'Ayuda',
    faq: 'FAQ',
    downloads: ['SDK downloads', 'downloads'],
    closeMenu: ['Cerrar menú', 'Cerrar'],
    profile: ['Mi perfil', 'Perfil'],
    alerts: 'Alertas',
  },
  en: {
    spanish: ['Spanish', 'ES'],
    english: ['English', 'EN'],
    home: 'Home',
    campaigns: 'Campaigns',
    myCampaigns: ['All campaigns', 'Campaigns'],
    newMessage: ['New message', 'Message'],
    tools: 'Tools',
    externalApps: ['Tracking applications', 'Tracking apps'],
    topics: 'Topics',
    areas: ['Manage areas', 'Areas'],
    statistics: 'Statistics',
    byDevice: ['By device', 'device'],
    byCampaign: ['By campaign', 'campaign'],
    configuration: ['Account configuration', 'Configuration'],
    help: 'Help',
    faq: 'FAQ',
    downloads: ['SDK downloads', 'downloads'],
    closeMenu: ['Close menu', 'Close'],
    profile: ['My profile', 'Profile'],
    alerts: 'Alerts',
  },
};

/**
 * Traduce un literal usando el fichero de traducciones y la configuración del usuario
 * @param {*} key identificador del literal en el fichero de traducciones
 * @param {*} short si es true, se devolverá el literal en formato corto (solo si está definido)
 */
const message = (key, short) => {
  // TODO: recuperar el valor de idioma del usuario actual
  const lang = 'en';

  // Comprobamos que exista el idioma
  if (typeof translations[lang] !== 'object') {
    return key;
  }

  // Comprobamos que exista la clave
  const trans = translations[lang][key];
  if (typeof trans === 'string') {
    return trans;
  }

  // Si la clave tiene formato corto, devolvemos el solicitado por parámetro
  if (typeof trans === 'object') {
    return short ? trans[1] : trans[0];
  }

  // Si algo no sale bien, devolvemos la clave
  return key;
};

export default message;

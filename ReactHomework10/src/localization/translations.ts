export const translations = {
  en: {
    common: {
      logoAlt: 'Logo',
    },
    nav: {
      home: 'Home',
      order: 'Order',
      company: 'Company',
      faq: 'FAQ',
      contact: 'Contact',
      login: 'Login',
      logout: 'Logout',
      toggleMenu: 'Toggle menu',
      openCart: 'Open cart',
    },
    language: {
      label: 'Language',
      options: {
        en: 'English',
        es: 'Spanish',
        de: 'German',
      },
    },
    header: {
      titleLead: 'Beautiful food & takeaway,',
      titleAccent: 'delivered',
      titleTail: 'to your door.',
      description:
        'Fresh meals, fast delivery, and simple online ordering for your next craving.',
      placeOrder: 'Place an Order',
      ratingLead: '4.8 out of 5',
      ratingTail: 'based on 2000+ reviews',
      trustpilotAlt: 'Trustpilot rating',
      heroAlt: 'Food delivery hero image',
    },
    footer: {
      descriptionTop: 'Takeaway & Delivery template',
      descriptionBottom: 'for small - medium businesses.',
      companyHeading: 'Company',
      templateHeading: 'Template',
      flowbaseHeading: 'Flowbase',
      styleGuide: 'Style Guide',
      changelog: 'Changelog',
      licence: 'Licence',
      webflowUniversity: 'Webflow University',
      moreCloneables: 'More Cloneables',
      builtBy: 'Built by',
      poweredBy: 'Powered by',
    },
  },
  es: {
    common: {
      logoAlt: 'Logotipo',
    },
    nav: {
      home: 'Inicio',
      order: 'Pedido',
      company: 'Empresa',
      faq: 'Preguntas',
      contact: 'Contacto',
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      toggleMenu: 'Abrir menú',
      openCart: 'Abrir carrito',
    },
    language: {
      label: 'Idioma',
      options: {
        en: 'Inglés',
        es: 'Español',
        de: 'Alemán',
      },
    },
    header: {
      titleLead: 'Comida hermosa para llevar,',
      titleAccent: 'entregada',
      titleTail: 'hasta tu puerta.',
      description:
        'Platos frescos, entrega rápida y pedidos en línea sencillos para tu próximo antojo.',
      placeOrder: 'Hacer un pedido',
      ratingLead: '4.8 de 5',
      ratingTail: 'basado en más de 2000 reseñas',
      trustpilotAlt: 'Valoración de Trustpilot',
      heroAlt: 'Imagen principal de entrega de comida',
    },
    footer: {
      descriptionTop: 'Plantilla de comida para llevar y entrega',
      descriptionBottom: 'para negocios pequeños y medianos.',
      companyHeading: 'Empresa',
      templateHeading: 'Plantilla',
      flowbaseHeading: 'Flowbase',
      styleGuide: 'Guía de estilos',
      changelog: 'Registro de cambios',
      licence: 'Licencia',
      webflowUniversity: 'Universidad de Webflow',
      moreCloneables: 'Más clonables',
      builtBy: 'Creado por',
      poweredBy: 'Impulsado por',
    },
  },
  de: {
    common: {
      logoAlt: 'Logo',
    },
    nav: {
      home: 'Startseite',
      order: 'Bestellung',
      company: 'Unternehmen',
      faq: 'FAQ',
      contact: 'Kontakt',
      login: 'Anmelden',
      logout: 'Abmelden',
      toggleMenu: 'Menü öffnen',
      openCart: 'Warenkorb öffnen',
    },
    language: {
      label: 'Sprache',
      options: {
        en: 'Englisch',
        es: 'Spanisch',
        de: 'Deutsch',
      },
    },
    header: {
      titleLead: 'Wunderschönes Essen zum Mitnehmen,',
      titleAccent: 'geliefert',
      titleTail: 'bis an deine Tür.',
      description:
        'Frische Gerichte, schnelle Lieferung und einfache Online-Bestellung für deinen nächsten Hunger.',
      placeOrder: 'Bestellung aufgeben',
      ratingLead: '4,8 von 5',
      ratingTail: 'basierend auf über 2000 Bewertungen',
      trustpilotAlt: 'Trustpilot-Bewertung',
      heroAlt: 'Titelbild für Essenslieferung',
    },
    footer: {
      descriptionTop: 'Takeaway- und Liefer-Vorlage',
      descriptionBottom: 'für kleine und mittlere Unternehmen.',
      companyHeading: 'Unternehmen',
      templateHeading: 'Vorlage',
      flowbaseHeading: 'Flowbase',
      styleGuide: 'Styleguide',
      changelog: 'Änderungsprotokoll',
      licence: 'Lizenz',
      webflowUniversity: 'Webflow University',
      moreCloneables: 'Weitere Klonvorlagen',
      builtBy: 'Erstellt von',
      poweredBy: 'Bereitgestellt von',
    },
  },
} as const

export type LanguageCode = keyof typeof translations

export const defaultLanguage: LanguageCode = 'en'
export const supportedLanguages = Object.keys(translations) as LanguageCode[]
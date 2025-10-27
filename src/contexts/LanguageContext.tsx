import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traduções
const translations = {
  pt: {
    // Tela inicial
    'welcome': 'SEJA BEM-VINDO!',
    'select_option': 'Selecione uma opção para continuar',
    'select_language': 'Selecione seu idioma',
    'client': 'Sou cliente da GoWork',
    'client_desc': 'Acesse serviços exclusivos para clientes',
    'visitor': 'Sou visitante',
    'visitor_desc': 'Vim fazer uma reunião, visitar, conhecer ou alugar um espaço',
    
    // Opções cliente
    'client_options': 'OPÇÕES PARA CLIENTES',
    'technical_support': 'Suporte técnico',
    'technical_support_desc': 'Preciso de suporte técnico ou administrativo',
    'book_room': 'Reservar sala de reunião',
    'book_room_desc': 'Disponível para todos os clientes',
    'register_biometry': 'Cadastrar biometria',
    'register_biometry_desc': 'Apenas se já autorizado pela empresa ou responsável pelo check-in',
    
    // Opções visitante
    'visitor_options': 'O QUE VOCÊ DESEJA?',
    'meeting_checkin': 'Vim fazer uma reunião/conhecer',
    'meeting_checkin_desc': 'A gowork, gocorporate',
    'visit_company': 'Visitar uma empresa',
    'visit_company_desc': 'Vim visitar uma empresa que está na GoWork',
    'rent_room': 'Alugar sala de reunião',
    'rent_room_desc': 'Por hora',
    
    // Seleção de unidade
    'select_unit': 'Em qual unidade você está?',
    'detecting_location': 'Detectando sua localização...',
    'skip': 'Pular',
    'closest': 'Mais próxima',
    'approx_distance': 'Aprox. {distance} km de você',
    
    // Modal QR Code
    'qr_title': 'Escaneie o QR Code',
    'access_link': 'Link de acesso:',
    'copy_link': 'Copiar link',
    'link_copied': '✓ Link copiado para a área de transferência!',
    'open_browser': 'Abrir no navegador',
    'close': 'Fechar',
    
    // Modal seleção
    'show_qr': 'Mostrar QR Code',
    'show_qr_desc': 'Escaneie com seu celular',
    'open_browser_desc': 'Acessar diretamente na tela',
    'select_unit_option': 'Selecionar Unidade',
    'select_unit_desc': 'Escolher localização',
    
    // Navegação
    'back': 'Voltar',
    'home': 'Início',
    'continue_using': 'Continuar Usando',
    
    // Timeout
    'attention': '⚠️ Atenção!',
    'inactivity_warning': 'Por inatividade, o sistema voltará à tela inicial em {seconds} segundo{plural}',
    
    // Footer
    'copyright': '© {year} GOWORK - Todos os direitos reservados.',
    
    // Erros
    'location_denied': 'Acesso à sua localização foi NEGADO. Por favor, verifique as permissões do seu navegador.',
    'location_unavailable': 'Sua localização atual não está disponível no momento.',
    'location_timeout': 'A solicitação para obter sua localização demorou demais (timeout).',
    'location_cancelled': 'Detecção de localização cancelada pelo usuário.',
    'geolocation_not_supported': 'Geolocalização não é suportada neste navegador. Mostrando todas as unidades.'
  },
  
  en: {
    // Initial screen
    'welcome': 'WELCOME!',
    'select_option': 'Select an option to continue',
    'select_language': 'Select your language',
    'client': 'I am a GoWork client',
    'client_desc': 'Access exclusive services for clients',
    'visitor': 'I am a visitor',
    'visitor_desc': 'I came for a meeting, visit, tour or rent a space',
    
    // Client options
    'client_options': 'CLIENT OPTIONS',
    'technical_support': 'Technical support',
    'technical_support_desc': 'I need technical or administrative support',
    'book_room': 'Book meeting room',
    'book_room_desc': 'Available for all clients',
    'register_biometry': 'Register biometry',
    'register_biometry_desc': 'Only if already authorized by company or check-in responsible',
    
    // Visitor options
    'visitor_options': 'WHAT DO YOU WANT?',
    'meeting_checkin': 'I came for a meeting/tour',
    'meeting_checkin_desc': 'Gowork, gocorporate',
    'visit_company': 'Visit a company',
    'visit_company_desc': 'I came to visit a company at GoWork',
    'rent_room': 'Rent meeting room',
    'rent_room_desc': 'By the hour',
    
    // Unit selection
    'select_unit': 'Which unit are you at?',
    'detecting_location': 'Detecting your location...',
    'skip': 'Skip',
    'closest': 'Closest',
    'approx_distance': 'Approx. {distance} km from you',
    
    // QR Code modal
    'qr_title': 'Scan QR Code',
    'access_link': 'Access link:',
    'copy_link': 'Copy link',
    'link_copied': '✓ Link copied to clipboard!',
    'open_browser': 'Open in browser',
    'close': 'Close',
    
    // Selection modal
    'show_qr': 'Show QR Code',
    'show_qr_desc': 'Scan with your phone',
    'open_browser_desc': 'Access directly on screen',
    'select_unit_option': 'Select Unit',
    'select_unit_desc': 'Choose location',
    
    // Navigation
    'back': 'Back',
    'home': 'Home',
    'continue_using': 'Continue Using',
    
    // Timeout
    'attention': '⚠️ Attention!',
    'inactivity_warning': 'Due to inactivity, the system will return to the initial screen in {seconds} second{plural}',
    
    // Footer
    'copyright': '© {year} GOWORK - All rights reserved.',
    
    // Errors
    'location_denied': 'Access to your location was DENIED. Please check your browser permissions.',
    'location_unavailable': 'Your current location is not available at the moment.',
    'location_timeout': 'The request to get your location took too long (timeout).',
    'location_cancelled': 'Location detection cancelled by user.',
    'geolocation_not_supported': 'Geolocation is not supported in this browser. Showing all units.'
  },
  
  es: {
    // Pantalla inicial
    'welcome': '¡BIENVENIDO!',
    'select_option': 'Selecciona una opción para continuar',
    'select_language': 'Selecciona tu idioma',
    'client': 'Soy cliente de GoWork',
    'client_desc': 'Accede a servicios exclusivos para clientes',
    'visitor': 'Soy visitante',
    'visitor_desc': 'Vine para una reunión, visita, conocer o alquilar un espacio',
    
    // Opciones cliente
    'client_options': 'OPCIONES PARA CLIENTES',
    'technical_support': 'Soporte técnico',
    'technical_support_desc': 'Necesito soporte técnico o administrativo',
    'book_room': 'Reservar sala de reunión',
    'book_room_desc': 'Disponible para todos los clientes',
    'register_biometry': 'Registrar biometría',
    'register_biometry_desc': 'Solo si ya está autorizado por la empresa o responsable del check-in',
    
    // Opciones visitante
    'visitor_options': '¿QUÉ DESEAS?',
    'meeting_checkin': 'Vine para una reunión/conocer',
    'meeting_checkin_desc': 'Gowork, gocorporate',
    'visit_company': 'Visitar una empresa',
    'visit_company_desc': 'Vine a visitar una empresa en GoWork',
    'rent_room': 'Alquilar sala de reunión',
    'rent_room_desc': 'Por hora',
    
    // Selección de unidad
    'select_unit': '¿En qué unidad estás?',
    'detecting_location': 'Detectando tu ubicación...',
    'skip': 'Saltar',
    'closest': 'Más cercana',
    'approx_distance': 'Aprox. {distance} km de ti',
    
    // Modal QR Code
    'qr_title': 'Escanea el código QR',
    'access_link': 'Enlace de acceso:',
    'copy_link': 'Copiar enlace',
    'link_copied': '✓ ¡Enlace copiado al portapapeles!',
    'open_browser': 'Abrir en navegador',
    'close': 'Cerrar',
    
    // Modal selección
    'show_qr': 'Mostrar código QR',
    'show_qr_desc': 'Escanea con tu teléfono',
    'open_browser_desc': 'Acceder directamente en pantalla',
    'select_unit_option': 'Seleccionar Unidad',
    'select_unit_desc': 'Elegir ubicación',
    
    // Navegación
    'back': 'Volver',
    'home': 'Inicio',
    'continue_using': 'Continuar Usando',
    
    // Timeout
    'attention': '⚠️ ¡Atención!',
    'inactivity_warning': 'Por inactividad, el sistema volverá a la pantalla inicial en {seconds} segundo{plural}',
    
    // Footer
    'copyright': '© {year} GOWORK - Todos los derechos reservados.',
    
    // Errores
    'location_denied': 'El acceso a tu ubicación fue DENEGADO. Por favor, verifica los permisos de tu navegador.',
    'location_unavailable': 'Tu ubicación actual no está disponible en este momento.',
    'location_timeout': 'La solicitud para obtener tu ubicación tardó demasiado (timeout).',
    'location_cancelled': 'Detección de ubicación cancelada por el usuario.',
    'geolocation_not_supported': 'La geolocalización no es compatible con este navegador. Mostrando todas las unidades.'
  },
  
  fr: {
    // Écran initial
    'welcome': 'BIENVENUE !',
    'select_option': 'Sélectionnez une option pour continuer',
    'select_language': 'Sélectionnez votre langue',
    'client': 'Je suis client GoWork',
    'client_desc': 'Accédez aux services exclusifs pour les clients',
    'visitor': 'Je suis visiteur',
    'visitor_desc': 'Je suis venu pour une réunion, visite, découverte ou location d\'espace',
    
    // Options client
    'client_options': 'OPTIONS POUR LES CLIENTS',
    'technical_support': 'Support technique',
    'technical_support_desc': 'J\'ai besoin d\'un support technique ou administratif',
    'book_room': 'Réserver salle de réunion',
    'book_room_desc': 'Disponible pour tous les clients',
    'register_biometry': 'Enregistrer biométrie',
    'register_biometry_desc': 'Seulement si déjà autorisé par l\'entreprise ou responsable du check-in',
    
    // Options visiteur
    'visitor_options': 'QUE VOULEZ-VOUS ?',
    'meeting_checkin': 'Je viens pour une réunion/découverte',
    'meeting_checkin_desc': 'Gowork, gocorporate',
    'visit_company': 'Visiter une entreprise',
    'visit_company_desc': 'Je viens visiter une entreprise chez GoWork',
    'rent_room': 'Louer salle de réunion',
    'rent_room_desc': 'À l\'heure',
    
    // Sélection d'unité
    'select_unit': 'Dans quelle unité êtes-vous ?',
    'detecting_location': 'Détection de votre localisation...',
    'skip': 'Passer',
    'closest': 'Plus proche',
    'approx_distance': 'Env. {distance} km de vous',
    
    // Modal QR Code
    'qr_title': 'Scanner le code QR',
    'access_link': 'Lien d\'accès :',
    'copy_link': 'Copier le lien',
    'link_copied': '✓ Lien copié dans le presse-papiers !',
    'open_browser': 'Ouvrir dans le navigateur',
    'close': 'Fermer',
    
    // Modal sélection
    'show_qr': 'Afficher le code QR',
    'show_qr_desc': 'Scanner avec votre téléphone',
    'open_browser_desc': 'Accéder directement à l\'écran',
    'select_unit_option': 'Sélectionner l\'Unité',
    'select_unit_desc': 'Choisir l\'emplacement',
    
    // Navigation
    'back': 'Retour',
    'home': 'Accueil',
    'continue_using': 'Continuer à Utiliser',
    
    // Timeout
    'attention': '⚠️ Attention !',
    'inactivity_warning': 'En raison de l\'inactivité, le système reviendra à l\'écran initial dans {seconds} seconde{plural}',
    
    // Footer
    'copyright': '© {year} GOWORK - Tous droits réservés.',
    
    // Erreurs
    'location_denied': 'L\'accès à votre localisation a été REFUSÉ. Veuillez vérifier les permissions de votre navigateur.',
    'location_unavailable': 'Votre localisation actuelle n\'est pas disponible pour le moment.',
    'location_timeout': 'La demande pour obtenir votre localisation a pris trop de temps (timeout).',
    'location_cancelled': 'Détection de localisation annulée par l\'utilisateur.',
    'geolocation_not_supported': 'La géolocalisation n\'est pas prise en charge par ce navigateur. Affichage de toutes les unités.'
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  // Função de tradução com interpolação
  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return translation;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

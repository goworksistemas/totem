/**
 * Utilitário para detectar e gerenciar o modo totem
 */

export const isPWAStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
};

export const isTotemMode = (): boolean => {
  // MODO SUPER AGRESSIVO: PWA = TOTEM SEMPRE
  const isPWAStandaloneResult = isPWAStandalone();
  const isTotemHTML = window.location.pathname.includes('totem.html');
  const hasTotemParam = new URLSearchParams(window.location.search).has('totem');
  const hasPWAParam = new URLSearchParams(window.location.search).has('pwa');
  const hasForcedParam = new URLSearchParams(window.location.search).has('forced');
  const isTotemUserAgent = navigator.userAgent.includes('GoWorkTotem');
  const isStoredTotemMode = localStorage.getItem('totem-mode') === 'true';
  
  // SE É PWA STANDALONE, É TOTEM! PONTO FINAL!
  if (isPWAStandaloneResult) {
    localStorage.setItem('totem-mode', 'true');
    return true;
  }
  
  return isTotemHTML || hasTotemParam || hasPWAParam || hasForcedParam || isTotemUserAgent || isStoredTotemMode;
};

export const shouldBypassAuth = (): boolean => {
  // AGRESSIVO: PWA STANDALONE = BYPASS SEMPRE!
  const isPWAStandaloneResult = isPWAStandalone();
  
  if (isPWAStandaloneResult) {
    localStorage.setItem('totem-mode', 'true');
    return true;
  }
  
  // Outras condições de bypass
  return isTotemMode();
};

export const getTotemStartUrl = (): string => {
  return '/acesso-rapido';
};

export const setTotemMode = (): void => {
  // Marca no localStorage que está em modo totem
  localStorage.setItem('totem-mode', 'true');
  
  // Define classe CSS para estilização específica
  document.body.classList.add('totem-mode');
  
  // Desabilita funcionalidades não necessárias no totem
  document.body.style.userSelect = 'none';
  (document.body.style as any).webkitUserSelect = 'none';
  (document.body.style as any).webkitTouchCallout = 'none';
};

export const isTotemModeStored = (): boolean => {
  return localStorage.getItem('totem-mode') === 'true';
};

export const clearTotemMode = (): void => {
  localStorage.removeItem('totem-mode');
  document.body.classList.remove('totem-mode');
}; 
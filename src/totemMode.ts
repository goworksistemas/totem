/**
 * Utilitário para detectar e gerenciar o modo totem
 * SEM PERSISTÊNCIA - sempre fresh, sem cookies ou localStorage
 */

export const isPWAStandalone = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
};

export const isTotemMode = (): boolean => {
  // DETECÇÃO DINÂMICA SEM LOCALSTORAGE
  const isPWAStandaloneResult = isPWAStandalone();
  const isTotemHTML = window.location.pathname.includes('totem.html');
  const hasTotemParam = new URLSearchParams(window.location.search).has('totem');
  const hasPWAParam = new URLSearchParams(window.location.search).has('pwa');
  const hasForcedParam = new URLSearchParams(window.location.search).has('forced');
  const isTotemUserAgent = navigator.userAgent.includes('GoWorkTotem');
  
  // SE É PWA STANDALONE, É TOTEM! PONTO FINAL!
  if (isPWAStandaloneResult) {
    console.log("[DEBUG] Modo totem detectado: PWA Standalone");
    return true;
  }
  
  const isTotem = isTotemHTML || hasTotemParam || hasPWAParam || hasForcedParam || isTotemUserAgent;
  
  if (isTotem) {
    console.log("[DEBUG] Modo totem detectado via URL/UserAgent");
  }
  
  return isTotem;
};

export const shouldBypassAuth = (): boolean => {
  // AGRESSIVO: PWA STANDALONE = BYPASS SEMPRE!
  const isPWAStandaloneResult = isPWAStandalone();
  
  if (isPWAStandaloneResult) {
    console.log("[DEBUG] Bypass auth: PWA Standalone");
    return true;
  }
  
  // Outras condições de bypass
  return isTotemMode();
};

export const getTotemStartUrl = (): string => {
  return '/acesso-rapido';
};

export const setTotemMode = (): void => {
  console.log("[DEBUG] Configurando modo totem (sem persistência)");
  
  // Define classe CSS para estilização específica
  document.body.classList.add('totem-mode');
  
  // Desabilita funcionalidades não necessárias no totem
  document.body.style.userSelect = 'none';
  (document.body.style as any).webkitUserSelect = 'none';
  (document.body.style as any).webkitTouchCallout = 'none';
  
  // LIMPA QUALQUER STORAGE EXISTENTE - TOTEM SEMPRE FRESH
  try {
    localStorage.clear();
    sessionStorage.clear();
    console.log("[DEBUG] Storage limpo - totem sempre fresh");
  } catch (e) {
    console.log("[DEBUG] Storage não disponível ou já limpo");
  }
};

export const isTotemModeStored = (): boolean => {
  // SEMPRE FALSE - não há mais storage
  return false;
};

export const clearTotemMode = (): void => {
  document.body.classList.remove('totem-mode');
  
  // LIMPA TUDO SEMPRE
  try {
    localStorage.clear();
    sessionStorage.clear();
    console.log("[DEBUG] Storage limpo ao sair do modo totem");
  } catch (e) {
    console.log("[DEBUG] Storage não disponível");
  }
}; 
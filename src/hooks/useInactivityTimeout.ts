import { useEffect, useRef, useCallback } from 'react';

interface InactivityTimeoutOptions {
  timeout?: number; // Tempo em milissegundos (padrão: 20 segundos)
  onTimeout: () => void; // Função chamada quando o timeout acontece
  enabled?: boolean; // Se o timeout está ativo (padrão: true)
  warningTime?: number; // Tempo em ms para mostrar aviso antes do timeout
  onWarning?: () => void; // Função chamada no aviso
}

export const useInactivityTimeout = ({
  timeout = 20000, // 20 segundos padrão
  onTimeout,
  enabled = true,
  warningTime = 5000, // 5 segundos de aviso
  onWarning
}: InactivityTimeoutOptions) => {
  const timeoutRef = useRef<number | null>(null);
  const warningRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);
  
  console.log("[DEBUG useInactivityTimeout] Hook inicializado - isActiveRef.current:", isActiveRef.current);

  // Lista de eventos que indicam atividade
  const activityEvents = [
    'mousedown',
    'mousemove', 
    'keypress',
    'scroll',
    'touchstart',
    'click',
    'keydown'
  ];

  // Reseta o timer de inatividade
  const resetTimer = useCallback(() => {
    console.log("[DEBUG] resetTimer chamado - enabled:", enabled, "isActiveRef:", isActiveRef.current);
    
    if (!enabled || !isActiveRef.current) {
      console.log("[DEBUG] resetTimer ABORTADO - timer não está ativo");
      return;
    }

    // Limpa timers existentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      console.log("[DEBUG] Timer de timeout anterior limpo");
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
      console.log("[DEBUG] Timer de warning anterior limpo");
    }

    console.log("[DEBUG] ✅ Timer de inatividade RESETADO");

    // Define novo timer de aviso (se configurado)
    if (onWarning && warningTime > 0) {
      const warningDelay = timeout - warningTime;
      console.log("[DEBUG] ⏰ Timer de WARNING configurado para", warningDelay, "ms (", warningDelay/1000, "segundos)");
      warningRef.current = window.setTimeout(() => {
        if (isActiveRef.current && enabled) {
          console.log("[DEBUG] ⚠️ MOSTRANDO AVISO DE INATIVIDADE!");
          onWarning();
        } else {
          console.log("[DEBUG] Warning abortado - timer não está ativo");
        }
      }, warningDelay);
    }

    // Define novo timer de timeout
    console.log("[DEBUG] ⏰ Timer de TIMEOUT configurado para", timeout, "ms (", timeout/1000, "segundos)");
    timeoutRef.current = window.setTimeout(() => {
      if (isActiveRef.current && enabled) {
        console.log("[DEBUG] ⏱️ TIMEOUT DE INATIVIDADE ATINGIDO - voltando para tela inicial");
        onTimeout();
      } else {
        console.log("[DEBUG] Timeout abortado - timer não está ativo");
      }
    }, timeout);
  }, [enabled, timeout, warningTime, onTimeout, onWarning]);

  // Para o sistema de timeout
  const pauseTimer = useCallback(() => {
    console.log("[DEBUG] pauseTimer chamado - DESATIVANDO isActiveRef");
    isActiveRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }
    console.log("[DEBUG] Timer de inatividade pausado");
  }, []);

  // Retoma o sistema de timeout
  const resumeTimer = useCallback(() => {
    isActiveRef.current = true;
    resetTimer();
    console.log("[DEBUG] Timer de inatividade retomado");
  }, [resetTimer]);

  // Handler de atividade
  const handleActivity = useCallback(() => {
    console.log("[DEBUG] 👆 Atividade detectada! enabled:", enabled, "isActive:", isActiveRef.current);
    if (enabled && isActiveRef.current) {
      resetTimer();
    } else {
      console.log("[DEBUG] Atividade ignorada - timer desabilitado ou inativo");
    }
  }, [enabled, resetTimer]);

  useEffect(() => {
    console.log("[DEBUG useInactivityTimeout] useEffect executado - enabled:", enabled);
    
    if (!enabled) {
      console.log("[DEBUG useInactivityTimeout] Timer DESABILITADO - pausando");
      pauseTimer();
      return;
    }

    console.log("[DEBUG useInactivityTimeout] Timer HABILITADO - ATIVANDO isActiveRef");
    // ATIVAR o ref antes de resetar
    isActiveRef.current = true;
    
    // Inicia o timer
    resetTimer();

    // Adiciona listeners de atividade
    activityEvents.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });

    // Cleanup
    return () => {
      // Remove listeners
      activityEvents.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
      
      // Limpa timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningRef.current) {
        clearTimeout(warningRef.current);
      }
    };
  }, [enabled, handleActivity, resetTimer]);

  return {
    resetTimer,
    pauseTimer,
    resumeTimer
  };
}; 
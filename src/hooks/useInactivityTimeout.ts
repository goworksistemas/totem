import { useEffect, useRef, useCallback } from 'react';

interface InactivityTimeoutOptions {
  timeout?: number; // Tempo em milissegundos (padrão: 30 segundos)
  onTimeout: () => void; // Função chamada quando o timeout acontece
  enabled?: boolean; // Se o timeout está ativo (padrão: true)
  warningTime?: number; // Tempo em ms para mostrar aviso antes do timeout
  onWarning?: () => void; // Função chamada no aviso
}

export const useInactivityTimeout = ({
  timeout = 30000, // 30 segundos padrão
  onTimeout,
  enabled = true,
  warningTime = 5000, // 5 segundos de aviso
  onWarning
}: InactivityTimeoutOptions) => {
  const timeoutRef = useRef<number | null>(null);
  const warningRef = useRef<number | null>(null);
  const isActiveRef = useRef(true);

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
    if (!enabled || !isActiveRef.current) return;

    // Limpa timers existentes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
    }

    console.log("[DEBUG] Timer de inatividade resetado");

    // Define novo timer de aviso (se configurado)
    if (onWarning && warningTime > 0) {
      warningRef.current = window.setTimeout(() => {
        if (isActiveRef.current && enabled) {
          console.log("[DEBUG] Mostrando aviso de inatividade");
          onWarning();
        }
      }, timeout - warningTime);
    }

    // Define novo timer de timeout
    timeoutRef.current = window.setTimeout(() => {
      if (isActiveRef.current && enabled) {
        console.log("[DEBUG] Timeout de inatividade atingido - voltando para tela inicial");
        onTimeout();
      }
    }, timeout);
  }, [enabled, timeout, warningTime, onTimeout, onWarning]);

  // Para o sistema de timeout
  const pauseTimer = useCallback(() => {
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
    if (enabled && isActiveRef.current) {
      resetTimer();
    }
  }, [enabled, resetTimer]);

  useEffect(() => {
    if (!enabled) {
      pauseTimer();
      return;
    }

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
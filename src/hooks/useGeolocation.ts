import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { UnitInfo } from '../data/unitsData';

interface GeolocationState {
  sortedUnits: UnitInfo[];
  locationError: string | null;
  closestUnitId: string | null;
  isLoading: boolean;
}

interface GeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

export const useGeolocation = (
  units: UnitInfo[], 
  options: GeolocationOptions = {},
  cancelled: boolean = false
): GeolocationState => {
  const [sortedUnits, setSortedUnits] = useState<UnitInfo[]>(units);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [closestUnitId, setClosestUnitId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs para controlar execução e evitar loops
  const hasRunRef = useRef(false);
  const isRunningRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  const calculateDistance = useCallback((lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }, []);

  const stopLoadingAndShowUnits = useCallback((error?: string) => {
    console.log("[DEBUG] Parando loading e mostrando unidades:", error || "sem erro");
    if (error) {
      setLocationError(error);
    }
    setSortedUnits(units);
    setIsLoading(false);
    hasRunRef.current = true;
    isRunningRef.current = false;
  }, [units]);

  // Memorizar as opções para evitar re-execuções
  const memoizedOptions = useMemo(() => ({
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 60000,
    ...options
  }), [options]);

  useEffect(() => {
    // PROTEÇÃO CONTRA MÚLTIPLAS EXECUÇÕES
    if (hasRunRef.current || isRunningRef.current) {
      console.log("[DEBUG] Geolocalização já executada ou em execução, pulando...");
      return;
    }

    console.log("[DEBUG] Iniciando useGeolocation pela PRIMEIRA vez.");
    isRunningRef.current = true;
    setLocationError(null);
    setClosestUnitId(null);
    
    // Se foi cancelado pelo usuário, não faz nada
    if (cancelled) {
      console.log("[DEBUG] Geolocalização cancelada pelo usuário.");
      stopLoadingAndShowUnits("Detecção de localização cancelada pelo usuário.");
      return;
    }
    
    setIsLoading(true);

    // Timeout manual de segurança para evitar travamento
    timeoutRef.current = setTimeout(() => {
      console.warn("[DEBUG] TIMEOUT MANUAL: Forçando parada do loading após 6 segundos");
      if (isRunningRef.current) {
        stopLoadingAndShowUnits("Timeout: Não foi possível detectar sua localização. Mostrando todas as unidades.");
      }
    }, 6000);

    if (!navigator.geolocation) {
      console.warn("[DEBUG] navigator.geolocation NÃO suportado por este navegador.");
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopLoadingAndShowUnits("Geolocalização não é suportada neste navegador. Mostrando todas as unidades.");
      return;
    }

    console.log("[DEBUG] navigator.geolocation é suportado.");
    console.log("[DEBUG] Opções da geolocalização:", memoizedOptions);

    let completed = false; // Flag para evitar chamadas duplas

    const onSuccess = (position: GeolocationPosition) => {
      if (completed || !isRunningRef.current) return;
      completed = true;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      console.log("[DEBUG] Localização obtida com SUCESSO:", position);
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      console.log(`[DEBUG] Coordenadas do usuário: Lat = ${userLat}, Lon = ${userLon}`);

      const unitsWithDistance = units
        .filter(unit => unit.latitude && unit.longitude)
        .map(unit => {
          const distance = calculateDistance(userLat, userLon, unit.latitude!, unit.longitude!);
          console.log(`[DEBUG] Distância para ${unit.name} (${unit.id}): ${distance.toFixed(2)} km`);
          return { ...unit, distance };
        })
        .sort((a, b) => a.distance! - b.distance!);

      console.log("[DEBUG] Unidades ordenadas por distância (com coordenadas):", unitsWithDistance);
      
      const unitsWithoutCoords = units.filter(unit => !unit.latitude || !unit.longitude);
      if (unitsWithoutCoords.length > 0) {
        console.log("[DEBUG] Unidades sem coordenadas (serão adicionadas ao final):", unitsWithoutCoords);
      }
      
      const allSortedUnits = [...unitsWithDistance, ...unitsWithoutCoords];
      setSortedUnits(allSortedUnits);
      console.log("[DEBUG] Lista final de unidades ordenadas:", allSortedUnits);

      if (unitsWithDistance.length > 0 && unitsWithDistance[0].distance !== Infinity) {
        setClosestUnitId(unitsWithDistance[0].id);
        console.log(`[DEBUG] Unidade mais próxima definida: ${unitsWithDistance[0].name} (ID: ${unitsWithDistance[0].id})`);
      } else {
        console.log("[DEBUG] Nenhuma unidade próxima com coordenadas válidas encontrada.");
      }
      
      setIsLoading(false);
      hasRunRef.current = true;
      isRunningRef.current = false;
    };

    const onError = (error: GeolocationPositionError) => {
      if (completed || !isRunningRef.current) return;
      completed = true;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      console.error("[DEBUG] ERRO ao obter localização:", error);
      let errorMessage = "Não foi possível obter sua localização. Mostrando todas as unidades.";
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = "Acesso à sua localização foi NEGADO. Por favor, verifique as permissões do seu navegador.";
          console.error("[DEBUG] Erro: Permissão negada pelo usuário.");
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = "Sua localização atual não está disponível no momento.";
          console.error("[DEBUG] Erro: Posição indisponível.");
          break;
        case error.TIMEOUT:
          errorMessage = "A solicitação para obter sua localização demorou demais (timeout).";
          console.error("[DEBUG] Erro: Timeout ao obter localização.");
          break;
        default:
          console.error("[DEBUG] Erro desconhecido ao obter localização.");
          break;
      }
      
      stopLoadingAndShowUnits(errorMessage);
    };

    try {
      console.log("[DEBUG] Chamando getCurrentPosition...");
      navigator.geolocation.getCurrentPosition(onSuccess, onError, memoizedOptions);
    } catch (err) {
      console.error("[DEBUG] Erro ao chamar getCurrentPosition:", err);
      completed = true;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      stopLoadingAndShowUnits("Erro interno ao acessar geolocalização. Mostrando todas as unidades.");
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []); // DEPENDÊNCIAS VAZIAS PARA EXECUTAR APENAS UMA VEZ!

  // Resetar se cancelado
  useEffect(() => {
    if (cancelled && !hasRunRef.current) {
      console.log("[DEBUG] Resetando devido ao cancelamento.");
      stopLoadingAndShowUnits("Detecção de localização cancelada pelo usuário.");
    }
  }, [cancelled, stopLoadingAndShowUnits]);

  return {
    sortedUnits,
    locationError,
    closestUnitId,
    isLoading
  };
}; 
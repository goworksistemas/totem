import { useState, useEffect } from 'react';
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
  options: GeolocationOptions = {}
): GeolocationState => {
  const [sortedUnits, setSortedUnits] = useState<UnitInfo[]>(units);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [closestUnitId, setClosestUnitId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    console.log("[DEBUG] Iniciando useGeolocation.");
    setLocationError(null);
    setClosestUnitId(null);
    setIsLoading(true);

    if (!navigator.geolocation) {
      console.warn("[DEBUG] navigator.geolocation NÃO suportado por este navegador.");
      setLocationError("Geolocalização não é suportada neste navegador. Mostrando todas as unidades.");
      setSortedUnits(units);
      setIsLoading(false);
      return;
    }

    console.log("[DEBUG] navigator.geolocation é suportado.");
    
    const defaultOptions: GeolocationOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
      ...options
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
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
      },
      (error) => {
        console.error("[DEBUG] ERRO ao obter localização:", error);
        let errorMessage = "Não foi possível obter sua localização. Mostrando todas as unidades.";
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Acesso à sua localização foi NEGADO. Por favor, verifique as permissões do seu navegador e sistema operacional.";
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
        
        setLocationError(errorMessage);
        setSortedUnits(units);
        setIsLoading(false);
      },
      defaultOptions
    );
  }, [units, options]);

  return {
    sortedUnits,
    locationError,
    closestUnitId,
    isLoading
  };
}; 
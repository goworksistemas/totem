export type Step = 'initial' | 'client' | 'visitor' | 'visitorAddressSelection';

export interface OptionInfo {
  title: string;
  description: string;
  url: string;
  iconName: string; // Nome do ícone ao invés do componente
  bgColor: string;
  textColor: string;
  additionalInfo?: string;
  qrCodeOnly?: boolean;
  actionType?: 'openEmbed' | 'showQr' | 'navigateToAddressSelection';
}

export interface UnitInfo {
  id: string;
  name: string;
  address: string;
  formUrl: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
}

export interface TotemConfig {
  enableGeolocation: boolean;
  autoFullscreen: boolean;
  preventZoom: boolean;
  preventSelection: boolean;
  debugMode: boolean;
}

export interface GeolocationState {
  sortedUnits: UnitInfo[];
  locationError: string | null;
  closestUnitId: string | null;
  isLoading: boolean;
} 
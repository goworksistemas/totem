import { OptionInfo } from '../types';

// Mapeamento de nomes de ícones para facilitar o uso
export const iconMapping = {
  wrench: 'Wrench',
  calendar: 'Calendar',
  key: 'Key',
  userCheck: 'UserCheck',
  building: 'Building',
  clock: 'Clock'
} as const;

export const clientOptions: OptionInfo[] = [
  {
    title: "Suporte técnico",
    description: "Preciso de suporte técnico ou administrativo",
    url: "https://wa.me/5511993397841?text=Ol%C3%A1%2C%20sou%20cliente%20da%20gowork%20e%20preciso%20de%20suporte",
    iconName: 'wrench',
    bgColor: "bg-gradient-to-br from-red-400 to-red-600",
    textColor: "text-white",
    additionalInfo: "WhatsApp: (11) 99339-7841",
    qrCodeOnly: true
  },
  {
    title: "Reservar sala de reunião",
    description: "Disponível para todos os clientes",
    url: "https://networkgo.com.br/login",
    iconName: 'calendar',
    bgColor: "bg-gradient-to-br from-sky-400 to-sky-600",
    textColor: "text-white",
    qrCodeOnly: true
  },
  {
    title: "Cadastrar biometria",
    description: "Apenas se já autorizado pela empresa ou responsável pelo check-in",
    url: "https://share.hsforms.com/2eBmum9H5RKOfRg7NZ7hvCge4grb",
    iconName: 'key',
    bgColor: "bg-gradient-to-br from-green-400 to-green-600",
    textColor: "text-white"
  }
];

export const visitorOptions: OptionInfo[] = [
  {
    title: "Vim fazer uma reunião/conhecer",
    description: "A gowork, gocorporate",
    url: '', // Será definido após seleção de unidade
    iconName: 'userCheck',
    bgColor: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    textColor: "text-white",
    actionType: 'navigateToAddressSelection'
  },
  {
    title: "Visitar uma empresa",
    description: "Vim visitar uma empresa que está na GoWork",
    url: '', // Será definido após seleção de unidade
    iconName: 'building',
    bgColor: "bg-gradient-to-br from-blue-400 to-blue-600",
    textColor: "text-white",
    actionType: 'navigateToAddressSelection'
  },
  {
    title: "Alugar sala de reunião",
    description: "Por hora",
    url: "https://networkgo.gowork.com.br/reservar-sala",
    iconName: 'clock',
    bgColor: "bg-gradient-to-br from-amber-400 to-amber-600",
    textColor: "text-white",
    qrCodeOnly: true
  }
]; 
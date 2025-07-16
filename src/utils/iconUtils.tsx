import React from 'react';
import { 
  Wrench, 
  Calendar, 
  Key, 
  UserCheck, 
  Building, 
  Clock
} from 'lucide-react';

const iconMap = {
  wrench: Wrench,
  calendar: Calendar,
  key: Key,
  userCheck: UserCheck,
  building: Building,
  clock: Clock
};

interface IconProps {
  name: string;
  className?: string;
}

export const DynamicIcon: React.FC<IconProps> = ({ name, className = "h-7 w-7" }) => {
  const IconComponent = iconMap[name as keyof typeof iconMap];
  
  if (!IconComponent) {
    console.warn(`Ícone '${name}' não encontrado`);
    return <div className={className} />;
  }
  
  return <IconComponent className={className} />;
};

export { iconMap }; 
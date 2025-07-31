// components/IconRenderer.tsx
'use client';

import { 
  DollarSign, 
  Percent, 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Smile, 
  AlertCircle, 
  Lightbulb
} from 'lucide-react';

interface IconRendererProps {
  iconName: string;
  className?: string;
}

const iconComponents = {
  DollarSign: DollarSign,
  Percent: Percent,
  Users: Users,
  Package: Package,
  ShoppingCart: ShoppingCart,
  TrendingUp: TrendingUp,
  Smile: Smile,
  AlertCircle : AlertCircle, 
  Lightbulb: Lightbulb
};

export const IconRenderer = ({ iconName, className }: IconRendererProps) => {
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
  
  if (!IconComponent) {
    console.warn(`Icon ${iconName} not found`);
    return null;
  }

  return <IconComponent size={18} className={className} />;
};
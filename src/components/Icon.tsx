import React from 'react';
import * as Icons from 'lucide-react-native';

interface IconProps extends Icons.LucideProps {
  name: string; 
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideIcon = (Icons as any)[name];

  if (!LucideIcon) {
    console.warn(`Lucide icon "${name}" does not exist.`);
    return null; 
  }

  return <LucideIcon {...props} />;
}
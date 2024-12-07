import React, { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface CalculatorProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function Calculator({ title, description, children, className }: CalculatorProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-6", className)}>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{description}</p>
      {children}
    </div>
  );
}
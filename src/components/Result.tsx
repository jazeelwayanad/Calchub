import React from 'react';
import { cn } from '../lib/utils';

interface ResultProps {
  label: string;
  value: string | number;
  className?: string;
}

export function Result({ label, value, className }: ResultProps) {
  return (
    <div className={cn("bg-gray-50 rounded-lg p-4", className)}>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
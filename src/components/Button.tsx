import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ 
  children, 
  variant = 'primary', 
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md font-medium transition-colors",
        variant === 'primary' && "bg-indigo-600 text-white hover:bg-indigo-700",
        variant === 'secondary' && "bg-gray-100 text-gray-900 hover:bg-gray-200",
        variant === 'outline' && "border border-gray-300 text-gray-700 hover:bg-gray-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { 
  DollarSign, 
  Ruler, 
  Percent, 
  Calculator,
  Home
} from 'lucide-react';

const tools = [
  {
    name: 'Tip Calculator',
    description: 'Calculate restaurant tips and split bills',
    icon: DollarSign,
    path: '/lifestyle/tip',
    color: 'bg-green-500',
  },
  {
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    icon: Ruler,
    path: '/lifestyle/unit-converter',
    color: 'bg-blue-500',
  },
  {
    name: 'Tax Calculator',
    description: 'Calculate income tax based on your location',
    icon: Calculator,
    path: '/lifestyle/tax',
    color: 'bg-orange-500',
  },
  {
    name: 'Rent vs Buy',
    description: 'Compare renting versus buying a property',
    icon: Home,
    path: '/lifestyle/rent-vs-buy',
    color: 'bg-pink-500',
  },
];

export function LifestyleDashboard() {
  return (
    <DashboardLayout
      title="Lifestyle Tools"
      description="Everyday calculators for better decision making"
      tools={tools}
    />
  );
}
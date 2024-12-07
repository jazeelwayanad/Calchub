import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Activity, Scale, Flame, Heart, Ruler } from 'lucide-react';

const tools = [
  {
    name: 'BMI Calculator',
    description: 'Calculate your Body Mass Index and check your weight category',
    icon: Scale,
    path: '/health/bmi',
    color: 'bg-green-500',
  },
  {
    name: 'Calorie Calculator',
    description: 'Estimate daily calorie needs based on your lifestyle',
    icon: Flame,
    path: '/health/calories',
    color: 'bg-orange-500',
  },
  {
    name: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using various methods',
    icon: Ruler,
    path: '/health/body-fat',
    color: 'bg-blue-500',
  },
  {
    name: 'Ideal Weight Calculator',
    description: 'Find your ideal weight range based on height and body type',
    icon: Activity,
    path: '/health/ideal-weight',
    color: 'bg-purple-500',
  },
  {
    name: 'Heart Rate Zones',
    description: 'Calculate your target heart rate zones for exercise',
    icon: Heart,
    path: '/health/heart-rate',
    color: 'bg-red-500',
  },
];

export function HealthDashboard() {
  return (
    <DashboardLayout
      title="Health & Fitness Tools"
      description="Calculate and track your health metrics for a better lifestyle"
      tools={tools}
    />
  );
}
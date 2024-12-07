import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { 
  KeyRound, 
  Hash, 
  Film, 
  Dices,
  Wand2
} from 'lucide-react';

const tools = [
  {
    name: 'Password Generator',
    description: 'Generate secure passwords with custom requirements',
    icon: KeyRound,
    path: '/entertainment/password',
    color: 'bg-purple-500',
  },
  {
    name: 'Random Number Generator',
    description: 'Generate random numbers with custom ranges',
    icon: Hash,
    path: '/entertainment/random-number',
    color: 'bg-blue-500',
  },
  {
    name: 'Movie Budget Calculator',
    description: 'Estimate movie production costs and budgets',
    icon: Film,
    path: '/entertainment/movie-budget',
    color: 'bg-green-500',
  },
  {
    name: 'Random Name Generator',
    description: 'Generate creative names for characters or projects',
    icon: Wand2,
    path: '/entertainment/name-generator',
    color: 'bg-pink-500',
  },
  {
    name: 'Dice Roller',
    description: 'Roll virtual dice for games and fun',
    icon: Dices,
    path: '/entertainment/dice-roller',
    color: 'bg-orange-500',
  },
];

export function EntertainmentDashboard() {
  return (
    <DashboardLayout
      title="Entertainment Tools"
      description="Fun and useful tools for entertainment and creativity"
      tools={tools}
    />
  );
}
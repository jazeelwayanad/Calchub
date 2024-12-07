import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { 
  Calculator, Home, Percent, TrendingUp, 
  DollarSign, PiggyBank, Clock
} from 'lucide-react';

const tools = [
  {
    name: 'Loan Calculator',
    description: 'Calculate EMIs, total interest, and view amortization schedule',
    icon: Calculator,
    path: '/financial/loan',
    color: 'bg-blue-500',
  },
  {
    name: 'Mortgage Calculator',
    description: 'Calculate mortgage payments with taxes and insurance',
    icon: Home,
    path: '/financial/mortgage',
    color: 'bg-green-500',
  },
  {
    name: 'Compound Interest',
    description: 'Calculate investment growth with compound interest',
    icon: TrendingUp,
    path: '/financial/compound-interest',
    color: 'bg-purple-500',
  },
  {
    name: 'ROI Calculator',
    description: 'Calculate return on investment percentage',
    icon: Percent,
    path: '/financial/roi',
    color: 'bg-orange-500',
  },
  {
    name: 'Discount Calculator',
    description: 'Calculate discounted prices and savings',
    icon: DollarSign,
    path: '/financial/discount',
    color: 'bg-pink-500',
  },
  {
    name: 'Loan Payoff Calculator',
    description: 'Determine time to pay off a loan',
    icon: Clock,
    path: '/financial/loan-payoff',
    color: 'bg-indigo-500',
  },
  {
    name: 'Investment Calculator',
    description: 'Plan your investment growth over time',
    icon: PiggyBank,
    path: '/financial/investment',
    color: 'bg-yellow-500',
  },
];

export function FinancialDashboard() {
  return (
    <DashboardLayout
      title="Financial Tools"
      description="Professional calculators for all your financial planning needs"
      tools={tools}
    />
  );
}
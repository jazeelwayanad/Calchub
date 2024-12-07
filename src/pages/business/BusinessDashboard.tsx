import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { 
  BarChart2, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Calculator 
} from 'lucide-react';

const tools = [
  {
    name: 'Break-Even Calculator',
    description: 'Calculate your break-even point and analysis',
    icon: BarChart2,
    path: '/business/break-even',
    color: 'bg-blue-500',
  },
  {
    name: 'Profit Margin Calculator',
    description: 'Calculate gross and net profit margins',
    icon: TrendingUp,
    path: '/business/profit-margin',
    color: 'bg-green-500',
  },
  {
    name: 'Salary Calculator',
    description: 'Calculate take-home salary after taxes and deductions',
    icon: DollarSign,
    path: '/business/salary',
    color: 'bg-purple-500',
  },
  {
    name: 'Productivity Calculator',
    description: 'Track and analyze work productivity metrics',
    icon: Clock,
    path: '/business/productivity',
    color: 'bg-orange-500',
  },
  {
    name: 'Project Cost Calculator',
    description: 'Estimate project costs and resource requirements',
    icon: Calculator,
    path: '/business/project-cost',
    color: 'bg-indigo-500',
  },
];

export function BusinessDashboard() {
  return (
    <DashboardLayout
      title="Business Tools"
      description="Professional calculators for business planning and analysis"
      tools={tools}
    />
  );
}
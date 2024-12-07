import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Clock, Calendar, Timer, CalendarDays } from 'lucide-react';

const tools = [
  {
    name: 'Age Calculator',
    description: 'Calculate exact age from birthdate to current date',
    icon: Calendar,
    path: '/time/age',
    color: 'bg-purple-500',
  },
  {
    name: 'Date Difference',
    description: 'Calculate the duration between any two dates',
    icon: CalendarDays,
    path: '/time/date-difference',
    color: 'bg-indigo-500',
  },
  {
    name: 'Countdown Timer',
    description: 'Create countdown timers for important events',
    icon: Timer,
    path: '/time/countdown',
    color: 'bg-blue-500',
  },
  {
    name: 'Time Zone Calculator',
    description: 'Convert times between different time zones',
    icon: Clock,
    path: '/time/timezone',
    color: 'bg-green-500',
  },
];

export function TimeDashboard() {
  return (
    <DashboardLayout
      title="Time & Date Tools"
      description="Calculate ages, date differences, and manage time-related calculations"
      tools={tools}
    />
  );
}
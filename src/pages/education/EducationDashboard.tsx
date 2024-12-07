import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  Calendar,
  Brain 
} from 'lucide-react';

const tools = [
  {
    name: 'GPA Calculator',
    description: 'Calculate your Grade Point Average',
    icon: GraduationCap,
    path: '/education/gpa',
    color: 'bg-blue-500',
  },
  {
    name: 'Study Hours Calculator',
    description: 'Plan your study schedule effectively',
    icon: Clock,
    path: '/education/study-hours',
    color: 'bg-green-500',
  },
  {
    name: 'Learning Progress Tracker',
    description: 'Track your learning goals and milestones',
    icon: BookOpen,
    path: '/education/progress',
    color: 'bg-purple-500',
  },
  {
    name: 'Study Schedule Generator',
    description: 'Create optimized study schedules',
    icon: Calendar,
    path: '/education/schedule',
    color: 'bg-orange-500',
  },
  {
    name: 'Memory Retention Calculator',
    description: 'Calculate optimal review intervals',
    icon: Brain,
    path: '/education/memory',
    color: 'bg-pink-500',
  },
];

export function EducationDashboard() {
  return (
    <DashboardLayout
      title="Education Tools"
      description="Calculate grades, plan study schedules, and track your learning progress"
      tools={tools}
    />
  );
}
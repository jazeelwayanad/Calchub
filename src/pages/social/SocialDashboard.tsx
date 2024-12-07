import React from 'react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { 
  BarChart2, 
  Hash, 
  DollarSign, 
  Share2 
} from 'lucide-react';

const tools = [
  {
    name: 'Engagement Calculator',
    description: 'Calculate social media engagement rates',
    icon: BarChart2,
    path: '/social/engagement',
    color: 'bg-blue-500',
  },
  {
    name: 'Hashtag Generator',
    description: 'Generate trending hashtags for your content',
    icon: Hash,
    path: '/social/hashtags',
    color: 'bg-purple-500',
  },
  {
    name: 'Ad Budget Calculator',
    description: 'Plan your social media advertising budget',
    icon: DollarSign,
    path: '/social/ad-budget',
    color: 'bg-green-500',
  },
  {
    name: 'Content Scheduler',
    description: 'Plan and schedule your social media content',
    icon: Share2,
    path: '/social/scheduler',
    color: 'bg-pink-500',
  },
];

export function SocialDashboard() {
  return (
    <DashboardLayout
      title="Social Media Tools"
      description="Calculate engagement rates and optimize your social media strategy"
      tools={tools}
    />
  );
}
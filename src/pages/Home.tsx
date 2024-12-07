import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Activity, Clock, Brain, Briefcase, Heart, Lightbulb, Share2 } from 'lucide-react';

const categories = [
  {
    name: 'Financial',
    icon: Calculator,
    path: '/financial',
    description: 'Loan, investment, and financial planning calculators',
    color: 'bg-blue-500',
  },
  {
    name: 'Health & Fitness',
    icon: Activity,
    path: '/health',
    description: 'BMI, calorie, and fitness tracking tools',
    color: 'bg-green-500',
  },
  {
    name: 'Time & Date',
    icon: Clock,
    path: '/time',
    description: 'Age, time difference, and countdown calculators',
    color: 'bg-purple-500',
  },
  {
    name: 'Business',
    icon: Briefcase,
    path: '/business',
    description: 'Break-even, profit margin, and salary calculators',
    color: 'bg-orange-500',
  },
  {
    name: 'Lifestyle',
    icon: Heart,
    path: '/lifestyle',
    description: 'Tip, unit conversion, and daily life calculators',
    color: 'bg-pink-500',
  },
  {
    name: 'Education',
    icon: Brain,
    path: '/education',
    description: 'Grade, study time, and learning calculators',
    color: 'bg-yellow-500',
  },
  {
    name: 'Entertainment',
    icon: Lightbulb,
    path: '/entertainment',
    description: 'Random generators and fun tools',
    color: 'bg-red-500',
  },
  {
    name: 'Social Media',
    icon: Share2,
    path: '/social',
    description: 'Engagement and hashtag tools',
    color: 'bg-indigo-500',
  },
];

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CalcHub
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your all-in-one calculator suite for finance, health, business, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className="block group hover:transform hover:scale-105 transition-all duration-200"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${category.color} p-6 flex justify-center`}>
                <category.icon className="h-12 w-12 text-white" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
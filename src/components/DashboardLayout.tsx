import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CategoryCard } from './CategoryCard';

interface Tool {
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

interface DashboardLayoutProps {
  title: string;
  description: string;
  tools: Tool[];
}

export function DashboardLayout({ title, description, tools }: DashboardLayoutProps) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <CategoryCard
            key={tool.path}
            title={tool.name}
            description={tool.description}
            icon={tool.icon}
            path={tool.path}
            color={tool.color}
          />
        ))}
      </div>
    </div>
  );
}
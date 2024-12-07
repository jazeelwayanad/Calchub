import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  color: string;
}

export function CategoryCard({ title, description, icon: Icon, path, color }: CategoryCardProps) {
  return (
    <Link
      to={path}
      className="block group hover:transform hover:scale-105 transition-all duration-200"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full">
        <div className={cn("p-6 flex justify-center", color)}>
          <Icon className="h-12 w-12 text-white" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {title}
          </h3>
          <p className="text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
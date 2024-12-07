import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Calculator, Activity, Clock, Brain, 
  Briefcase, Heart, Share2, Lightbulb,
  Menu, X
} from 'lucide-react';
import { cn } from '../lib/utils';

const categories = [
  { 
    name: 'Financial', 
    icon: Calculator, 
    path: '/financial',
    color: 'hover:text-blue-600'
  },
  { 
    name: 'Health', 
    icon: Activity, 
    path: '/health',
    color: 'hover:text-green-600'
  },
  { 
    name: 'Time', 
    icon: Clock, 
    path: '/time',
    color: 'hover:text-purple-600'
  },
  { 
    name: 'Business', 
    icon: Briefcase, 
    path: '/business',
    color: 'hover:text-orange-600'
  },
  { 
    name: 'Lifestyle', 
    icon: Heart, 
    path: '/lifestyle',
    color: 'hover:text-pink-600'
  },
  { 
    name: 'Education', 
    icon: Brain, 
    path: '/education',
    color: 'hover:text-yellow-600'
  },
  { 
    name: 'Entertainment', 
    icon: Lightbulb, 
    path: '/entertainment',
    color: 'hover:text-red-600'
  },
  { 
    name: 'Social', 
    icon: Share2, 
    path: '/social',
    color: 'hover:text-indigo-600'
  },
];

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Calculator className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">CalcHub</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 transition-colors",
                    category.color,
                    location.pathname.startsWith(category.path) && "bg-gray-100"
                  )}
                >
                  <category.icon className="h-5 w-5 mr-1" />
                  {category.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.path}
                  to={category.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100",
                    location.pathname.startsWith(category.path) && "bg-gray-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <category.icon className="h-5 w-5 mr-2" />
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">© 2024 CalcHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
import React from 'react';
import { LoanCalculator } from './LoanCalculator';
import { ROICalculator } from './ROICalculator';
import { MortgageCalculator } from './MortgageCalculator';
import { CompoundInterestCalculator } from './CompoundInterestCalculator';

export function FinancialTools() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Financial Tools</h1>
        <p className="text-gray-600">
          Advanced calculators for loans, investments, and financial planning.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LoanCalculator />
        <MortgageCalculator />
        <CompoundInterestCalculator />
        <ROICalculator />
      </div>
    </div>
  );
}
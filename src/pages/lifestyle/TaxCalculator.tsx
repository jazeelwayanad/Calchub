import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { formatCurrency } from '../../lib/utils';

interface TaxBracket {
  min: number;
  max: number | null;
  rate: number;
}

const taxBrackets: TaxBracket[] = [
  { min: 0, max: 11000, rate: 10 },
  { min: 11001, max: 44725, rate: 12 },
  { min: 44726, max: 95375, rate: 22 },
  { min: 95376, max: 182100, rate: 24 },
  { min: 182101, max: 231250, rate: 32 },
  { min: 231251, max: 578125, rate: 35 },
  { min: 578126, max: null, rate: 37 },
];

export function TaxCalculator() {
  const [income, setIncome] = useState<string>('');
  const [deductions, setDeductions] = useState<string>('');
  const [result, setResult] = useState<{
    taxableIncome: number;
    totalTax: number;
    effectiveRate: number;
    marginalRate: number;
    takeHome: number;
  } | null>(null);

  const calculateTax = (taxableIncome: number) => {
    let totalTax = 0;
    let marginalRate = 0;

    for (const bracket of taxBrackets) {
      if (taxableIncome > bracket.min) {
        const taxableAmount = bracket.max 
          ? Math.min(taxableIncome - bracket.min, bracket.max - bracket.min)
          : taxableIncome - bracket.min;
        
        totalTax += (taxableAmount * bracket.rate) / 100;
        marginalRate = bracket.rate;
      }
    }

    return { totalTax, marginalRate };
  };

  const handleCalculate = () => {
    const grossIncome = parseFloat(income);
    const totalDeductions = parseFloat(deductions) || 0;
    
    if (grossIncome) {
      const taxableIncome = Math.max(0, grossIncome - totalDeductions);
      const { totalTax, marginalRate } = calculateTax(taxableIncome);
      const effectiveRate = (totalTax / grossIncome) * 100;
      const takeHome = grossIncome - totalTax;

      setResult({
        taxableIncome,
        totalTax,
        effectiveRate,
        marginalRate,
        takeHome,
      });
    }
  };

  return (
    <Calculator
      title="Income Tax Calculator"
      description="Calculate your estimated income tax and take-home pay."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Annual Gross Income ($)"
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            placeholder="Enter your annual income"
            min="0"
          />

          <Input
            label="Total Deductions ($)"
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="Enter total deductions"
            min="0"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Tax
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Taxable Income"
                value={formatCurrency(result.taxableIncome)}
              />
              <Result
                label="Total Tax"
                value={formatCurrency(result.totalTax)}
                className="text-red-600"
              />
              <Result
                label="Take-Home Pay"
                value={formatCurrency(result.takeHome)}
                className="text-green-600"
              />
              <Result
                label="Effective Tax Rate"
                value={`${result.effectiveRate.toFixed(1)}%`}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Tax Breakdown</h3>
              <div className="space-y-3">
                {taxBrackets.map((bracket, index) => {
                  const isActive = result.taxableIncome > bracket.min;
                  const width = isActive 
                    ? Math.min(((result.taxableIncome - bracket.min) / (bracket.max || result.taxableIncome)) * 100, 100)
                    : 0;

                  return (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm text-blue-800">
                        <span>
                          {formatCurrency(bracket.min)} - {bracket.max ? formatCurrency(bracket.max) : 'Above'}
                        </span>
                        <span>{bracket.rate}%</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Breakdown</h3>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div>
                  <p className="text-sm">Monthly Income</p>
                  <p className="font-semibold">{formatCurrency(result.takeHome / 12)}</p>
                </div>
                <div>
                  <p className="text-sm">Monthly Tax</p>
                  <p className="font-semibold">{formatCurrency(result.totalTax / 12)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateSalary } from '../../lib/calculators/business';
import { formatCurrency } from '../../lib/utils';

export function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<string>('');
  const [taxRate, setTaxRate] = useState<string>('');
  const [deductions, setDeductions] = useState<string>('');
  const [result, setResult] = useState<{
    netSalary: number;
    taxAmount: number;
    takeHome: number;
  } | null>(null);

  const handleCalculate = () => {
    const gs = parseFloat(grossSalary);
    const tr = parseFloat(taxRate);
    const d = parseFloat(deductions) || 0;

    if (gs && tr) {
      const calculationResult = calculateSalary(gs, tr, d);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Salary Calculator"
      description="Calculate your take-home salary after taxes and deductions."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Gross Annual Salary ($)"
            type="number"
            value={grossSalary}
            onChange={(e) => setGrossSalary(e.target.value)}
            placeholder="Enter gross salary"
            min="0"
          />
          <Input
            label="Tax Rate (%)"
            type="number"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            placeholder="Enter tax rate"
            min="0"
            max="100"
          />
          <Input
            label="Monthly Deductions ($)"
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            placeholder="Enter monthly deductions (optional)"
            min="0"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Take-Home Salary
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Result
                label="Net Annual Salary"
                value={formatCurrency(result.netSalary)}
              />
              <Result
                label="Annual Tax Amount"
                value={formatCurrency(result.taxAmount)}
                className="text-red-600"
              />
              <Result
                label="Monthly Take-Home"
                value={formatCurrency(result.takeHome / 12)}
                className="text-green-600"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Salary Breakdown</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Gross Salary</span>
                    <span>{formatCurrency(parseFloat(grossSalary))}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Taxes</span>
                    <span>{formatCurrency(result.taxAmount)}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(result.taxAmount / parseFloat(grossSalary)) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Monthly Deductions</span>
                    <span>{formatCurrency(parseFloat(deductions) || 0)}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${((parseFloat(deductions) * 12) / parseFloat(grossSalary)) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Take-Home Pay</span>
                    <span>{formatCurrency(result.takeHome)}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(result.takeHome / parseFloat(grossSalary)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
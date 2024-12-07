import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateProfitMargin } from '../../lib/calculators/business';
import { formatCurrency } from '../../lib/utils';

export function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState<string>('');
  const [costs, setCosts] = useState<string>('');
  const [result, setResult] = useState<{
    grossProfit: number;
    profitMargin: number;
  } | null>(null);

  const handleCalculate = () => {
    const r = parseFloat(revenue);
    const c = parseFloat(costs);

    if (r && c) {
      const calculationResult = calculateProfitMargin(r, c);
      setResult(calculationResult);
    }
  };

  const getProfitMarginColor = (margin: number) => {
    if (margin < 0) return 'text-red-600';
    if (margin < 10) return 'text-yellow-600';
    if (margin < 20) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <Calculator
      title="Profit Margin Calculator"
      description="Calculate your gross profit and profit margin percentage."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Revenue ($)"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(e.target.value)}
            placeholder="Enter total revenue"
            min="0"
          />
          <Input
            label="Total Costs ($)"
            type="number"
            value={costs}
            onChange={(e) => setCosts(e.target.value)}
            placeholder="Enter total costs"
            min="0"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Profit Margin
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Gross Profit"
                value={formatCurrency(result.grossProfit)}
                className={result.grossProfit < 0 ? 'text-red-600' : 'text-green-600'}
              />
              <Result
                label="Profit Margin"
                value={`${result.profitMargin.toFixed(2)}%`}
                className={getProfitMarginColor(result.profitMargin)}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Margin Analysis</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Poor</span>
                  <div className="h-2 w-48 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-red-500 rounded-full"
                      style={{ width: '25%' }}
                    />
                  </div>
                  <span className="text-blue-800">&lt; 10%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Good</span>
                  <div className="h-2 w-48 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-yellow-500 rounded-full"
                      style={{ width: '50%' }}
                    />
                  </div>
                  <span className="text-blue-800">10-20%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Great</span>
                  <div className="h-2 w-48 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-green-500 rounded-full"
                      style={{ width: '75%' }}
                    />
                  </div>
                  <span className="text-blue-800">&gt; 20%</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Revenue per Cost Dollar</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${(parseFloat(revenue) / parseFloat(costs)).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Cost as % of Revenue</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {((parseFloat(costs) / parseFloat(revenue)) * 100).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
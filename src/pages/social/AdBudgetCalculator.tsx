import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { estimateAdBudget } from '../../lib/calculators/social';
import { formatCurrency } from '../../lib/utils';

export function AdBudgetCalculator() {
  const [targetReach, setTargetReach] = useState<string>('');
  const [costPerMille, setCostPerMille] = useState<string>('');
  const [result, setResult] = useState<{
    estimatedBudget: number;
    daysToReach: number;
  } | null>(null);

  const handleCalculate = () => {
    const reach = parseInt(targetReach);
    const cpm = parseFloat(costPerMille);

    if (reach && cpm) {
      const calculationResult = estimateAdBudget(reach, cpm);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Social Media Ad Budget Calculator"
      description="Estimate your advertising budget based on target reach and CPM."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Target Reach"
            type="number"
            value={targetReach}
            onChange={(e) => setTargetReach(e.target.value)}
            placeholder="Enter target audience reach"
            min="0"
          />
          <Input
            label="Cost per 1000 Impressions (CPM)"
            type="number"
            value={costPerMille}
            onChange={(e) => setCostPerMille(e.target.value)}
            placeholder="Enter CPM rate"
            min="0"
            step="0.01"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Budget
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Estimated Budget"
                value={formatCurrency(result.estimatedBudget)}
              />
              <Result
                label="Campaign Duration"
                value={`${result.daysToReach} days`}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Budget Breakdown</h3>
              <div className="space-y-2 text-blue-800">
                <p>• Daily Budget: {formatCurrency(result.estimatedBudget / result.daysToReach)}</p>
                <p>• Cost per Person: {formatCurrency(result.estimatedBudget / parseInt(targetReach))}</p>
                <p>• Total Impressions: {parseInt(targetReach).toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advertising Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Start with a small budget to test and optimize</li>
                <li>• Monitor and adjust based on performance</li>
                <li>• Target your audience precisely</li>
                <li>• Test different ad formats</li>
                <li>• Track ROI and engagement metrics</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
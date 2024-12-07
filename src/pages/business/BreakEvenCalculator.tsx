import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateBreakEven } from '../../lib/calculators/business';
import { formatCurrency } from '../../lib/utils';

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState<string>('');
  const [pricePerUnit, setPricePerUnit] = useState<string>('');
  const [costPerUnit, setCostPerUnit] = useState<string>('');
  const [result, setResult] = useState<{
    breakEvenUnits: number;
    breakEvenRevenue: number;
  } | null>(null);

  const handleCalculate = () => {
    const fc = parseFloat(fixedCosts);
    const ppu = parseFloat(pricePerUnit);
    const cpu = parseFloat(costPerUnit);

    if (fc && ppu && cpu) {
      const calculationResult = calculateBreakEven(fc, ppu, cpu);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Break-Even Analysis Calculator"
      description="Calculate how many units you need to sell to break even."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Fixed Costs ($)"
            type="number"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(e.target.value)}
            placeholder="Enter total fixed costs"
            min="0"
          />
          <Input
            label="Price Per Unit ($)"
            type="number"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            placeholder="Enter selling price per unit"
            min="0"
          />
          <Input
            label="Cost Per Unit ($)"
            type="number"
            value={costPerUnit}
            onChange={(e) => setCostPerUnit(e.target.value)}
            placeholder="Enter cost per unit"
            min="0"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Break-Even Point
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Break-Even Units"
                value={Math.ceil(result.breakEvenUnits)}
              />
              <Result
                label="Break-Even Revenue"
                value={formatCurrency(result.breakEvenRevenue)}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Analysis Details</h3>
              <div className="space-y-2 text-blue-800">
                <p>• Contribution Margin per Unit: {formatCurrency(parseFloat(pricePerUnit) - parseFloat(costPerUnit))}</p>
                <p>• Contribution Margin Ratio: {((parseFloat(pricePerUnit) - parseFloat(costPerUnit)) / parseFloat(pricePerUnit) * 100).toFixed(2)}%</p>
                <p>• Monthly Sales Target: {Math.ceil(result.breakEvenUnits / 12)} units</p>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-yellow-800">
                Note: This is a simplified break-even analysis. Consider additional factors like variable costs, market conditions, and seasonality for a complete business analysis.
              </p>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
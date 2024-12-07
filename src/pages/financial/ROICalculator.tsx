import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<string>('');
  const [finalValue, setFinalValue] = useState<string>('');
  const [roi, setROI] = useState<number | null>(null);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);

    if (initial && final) {
      const roiValue = ((final - initial) / initial) * 100;
      setROI(roiValue);
    }
  };

  return (
    <Calculator
      title="ROI Calculator"
      description="Calculate your Return on Investment (ROI) percentage."
    >
      <div className="space-y-4">
        <Input
          label="Initial Investment ($)"
          type="number"
          value={initialInvestment}
          onChange={(e) => setInitialInvestment(e.target.value)}
          placeholder="Enter initial investment"
        />
        <Input
          label="Final Value ($)"
          type="number"
          value={finalValue}
          onChange={(e) => setFinalValue(e.target.value)}
          placeholder="Enter final value"
        />
        <Button onClick={calculateROI} className="w-full">
          Calculate ROI
        </Button>
        {roi !== null && (
          <Result
            label="Return on Investment"
            value={`${roi.toFixed(2)}%`}
          />
        )}
      </div>
    </Calculator>
  );
}
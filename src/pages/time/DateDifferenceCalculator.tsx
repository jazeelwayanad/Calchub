import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateDateDifference } from '../../lib/calculators/time';

export function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const handleCalculate = () => {
    if (startDate && endDate) {
      const calculationResult = calculateDateDifference(
        new Date(startDate),
        new Date(endDate)
      );
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Date Difference Calculator"
      description="Calculate the duration between any two dates."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Difference
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Result
                label="Years"
                value={result.years}
              />
              <Result
                label="Months"
                value={result.months}
              />
              <Result
                label="Days"
                value={result.days}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Total Duration</h3>
              <div className="space-y-2 text-blue-800">
                <p>• Total days: {result.years * 365 + result.months * 30 + result.days}</p>
                <p>• Total weeks: {Math.floor((result.years * 365 + result.months * 30 + result.days) / 7)}</p>
                <p>• Total months: {result.years * 12 + result.months}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateAge, formatDateTime } from '../../lib/calculators/time';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const handleCalculate = () => {
    if (birthDate) {
      const calculationResult = calculateAge(new Date(birthDate));
      setResult(calculationResult);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Calculator
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Birth Date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={today}
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Age
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
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Age Milestones</h3>
              <div className="space-y-2 text-blue-800">
                <p>• You've lived for approximately:</p>
                <p className="ml-4">
                  {result.years * 365 + result.months * 30 + result.days} days
                </p>
                <p className="ml-4">
                  {Math.floor((result.years * 365 + result.months * 30 + result.days) * 24)} hours
                </p>
                <p className="ml-4">
                  {Math.floor((result.years * 365 + result.months * 30 + result.days) * 24 * 60)} minutes
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { generateRandomNumber } from '../../lib/calculators/entertainment';

export function RandomNumberGenerator() {
  const [min, setMin] = useState<string>('1');
  const [max, setMax] = useState<string>('100');
  const [count, setCount] = useState<string>('1');
  const [numbers, setNumbers] = useState<number[]>([]);

  const handleGenerate = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (minNum <= maxNum && countNum > 0) {
      const newNumbers = Array.from(
        { length: countNum },
        () => generateRandomNumber(minNum, maxNum)
      );
      setNumbers(newNumbers);
    }
  };

  return (
    <Calculator
      title="Random Number Generator"
      description="Generate random numbers within a specified range."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum"
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <Input
              label="Maximum"
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
          </div>
          <Input
            label="Number of Results"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            max="100"
          />

          <Button onClick={handleGenerate} className="w-full">
            Generate Numbers
          </Button>
        </div>

        {numbers.length > 0 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {numbers.map((number, index) => (
                <Result
                  key={index}
                  label={`Result ${index + 1}`}
                  value={number}
                />
              ))}
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Statistics</h3>
              <div className="grid grid-cols-2 gap-4 text-blue-800">
                <div>
                  <p className="text-sm">Average</p>
                  <p className="text-lg font-semibold">
                    {(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm">Sum</p>
                  <p className="text-lg font-semibold">
                    {numbers.reduce((a, b) => a + b, 0)}
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
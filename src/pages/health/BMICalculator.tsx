import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateBMI } from '../../lib/calculators/health';

export function BMICalculator() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: number; category: string } | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (w && h) {
      const calculationResult = calculateBMI(w, h);
      setResult(calculationResult);
    }
  };

  const getBMICategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'text-yellow-600';
      case 'Normal weight':
        return 'text-green-600';
      case 'Overweight':
        return 'text-orange-600';
      case 'Obese':
        return 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <Calculator
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) and check your weight category."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Weight (kg)"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter your weight"
            min="0"
          />
          <Input
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            min="0"
          />
          
          <Button onClick={handleCalculate} className="w-full">
            Calculate BMI
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Result
                label="Your BMI"
                value={result.bmi.toFixed(1)}
              />
              <Result
                label="Category"
                value={result.category}
                className={getBMICategoryColor(result.category)}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">BMI Categories</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Underweight</span>
                  <span className="text-yellow-600">&lt; 18.5</span>
                </div>
                <div className="flex justify-between">
                  <span>Normal weight</span>
                  <span className="text-green-600">18.5 - 24.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Overweight</span>
                  <span className="text-orange-600">25 - 29.9</span>
                </div>
                <div className="flex justify-between">
                  <span>Obese</span>
                  <span className="text-red-600">&gt; 30</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Note</h3>
              <p className="text-blue-800">
                BMI is a general indicator and may not be accurate for athletes, pregnant women, 
                or the elderly. Consult a healthcare provider for a complete health assessment.
              </p>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
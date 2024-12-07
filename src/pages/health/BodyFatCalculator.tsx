import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateBodyFat } from '../../lib/calculators/health';

export function BodyFatCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [waist, setWaist] = useState<string>('');
  const [neck, setNeck] = useState<string>('');
  const [hip, setHip] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const h = parseFloat(height);
    const hipValue = hip ? parseFloat(hip) : undefined;

    if (w && n && h && (gender === 'male' || (gender === 'female' && hipValue))) {
      const bodyFat = calculateBodyFat(gender, w, n, h, hipValue);
      setResult(bodyFat);
    }
  };

  const getBodyFatCategory = (bf: number, gender: 'male' | 'female') => {
    if (gender === 'male') {
      if (bf < 6) return { category: 'Essential Fat', color: 'text-blue-600' };
      if (bf < 14) return { category: 'Athletes', color: 'text-green-600' };
      if (bf < 18) return { category: 'Fitness', color: 'text-teal-600' };
      if (bf < 25) return { category: 'Average', color: 'text-yellow-600' };
      return { category: 'Obese', color: 'text-red-600' };
    } else {
      if (bf < 14) return { category: 'Essential Fat', color: 'text-blue-600' };
      if (bf < 21) return { category: 'Athletes', color: 'text-green-600' };
      if (bf < 25) return { category: 'Fitness', color: 'text-teal-600' };
      if (bf < 32) return { category: 'Average', color: 'text-yellow-600' };
      return { category: 'Obese', color: 'text-red-600' };
    }
  };

  return (
    <Calculator
      title="Body Fat Calculator"
      description="Calculate your body fat percentage using the U.S. Navy method."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                <span className="ml-2">Male</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-indigo-600"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>

          <Input
            label="Waist Circumference (cm)"
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            placeholder="Measure at naval level"
            min="0"
          />

          <Input
            label="Neck Circumference (cm)"
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            placeholder="Measure below larynx"
            min="0"
          />

          {gender === 'female' && (
            <Input
              label="Hip Circumference (cm)"
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="Measure at widest point"
              min="0"
            />
          )}

          <Input
            label="Height (cm)"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter your height"
            min="0"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Body Fat
          </Button>
        </div>

        {result !== null && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Body Fat Percentage"
                value={`${result.toFixed(1)}%`}
              />
              <Result
                label="Category"
                value={getBodyFatCategory(result, gender).category}
                className={getBodyFatCategory(result, gender).color}
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Body Fat Categories</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Men</h4>
                    <div className="space-y-1">
                      <p className="text-blue-600">2-5% Essential Fat</p>
                      <p className="text-green-600">6-13% Athletes</p>
                      <p className="text-teal-600">14-17% Fitness</p>
                      <p className="text-yellow-600">18-24% Average</p>
                      <p className="text-red-600">25%+ Obese</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Women</h4>
                    <div className="space-y-1">
                      <p className="text-blue-600">10-13% Essential Fat</p>
                      <p className="text-green-600">14-20% Athletes</p>
                      <p className="text-teal-600">21-24% Fitness</p>
                      <p className="text-yellow-600">25-31% Average</p>
                      <p className="text-red-600">32%+ Obese</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Measurement Tips</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Measure waist at naval level</li>
                <li>• Measure neck below larynx (Adam's apple)</li>
                {gender === 'female' && <li>• Measure hips at widest point</li>}
                <li>• Keep tape measure level and snug but not tight</li>
                <li>• Take measurements first thing in the morning</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
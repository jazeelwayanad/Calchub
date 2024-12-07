import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateCalorieNeeds } from '../../lib/calculators/health';

export function CalorieCalculator() {
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'>('moderate');
  const [result, setResult] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Light (exercise 1-3 times/week)' },
    { value: 'moderate', label: 'Moderate (exercise 3-5 times/week)' },
    { value: 'active', label: 'Active (exercise 6-7 times/week)' },
    { value: 'very-active', label: 'Very Active (intense exercise daily)' },
  ];

  const handleCalculate = () => {
    const a = parseInt(age);
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (a && w && h) {
      const calculationResult = calculateCalorieNeeds(
        a,
        gender,
        w,
        h,
        activityLevel
      );
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Calorie Calculator"
      description="Calculate your daily calorie needs based on your activity level and goals."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="0"
          />

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

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Activity Level
            </label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as any)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {activityLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Calculate Calories
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Basal Metabolic Rate"
                value={`${Math.round(result.bmr)} calories/day`}
              />
              <Result
                label="Maintenance Calories"
                value={`${Math.round(result.maintenance)} calories/day`}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Weight Loss"
                value={`${Math.round(result.weightLoss)} calories/day`}
                className="text-orange-600"
              />
              <Result
                label="Weight Gain"
                value={`${Math.round(result.weightGain)} calories/day`}
                className="text-green-600"
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Understanding Your Results</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• BMR: Calories burned at complete rest</li>
                <li>• Maintenance: Calories needed to maintain current weight</li>
                <li>• Weight Loss: Target for losing ~0.5kg/week</li>
                <li>• Weight Gain: Target for gaining ~0.5kg/week</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateStudyHours } from '../../lib/calculators/education';

export function StudyHoursCalculator() {
  const [courseCredits, setCourseCredits] = useState<string>('');
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [result, setResult] = useState<{
    weeklyHours: number;
    totalHours: number;
  } | null>(null);

  const handleCalculate = () => {
    const credits = parseInt(courseCredits);

    if (credits) {
      const calculationResult = calculateStudyHours(credits, difficultyLevel);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Study Hours Calculator"
      description="Calculate recommended study hours based on course credits and difficulty."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Course Credits"
            type="number"
            value={courseCredits}
            onChange={(e) => setCourseCredits(e.target.value)}
            placeholder="Enter course credits"
            min="1"
            max="6"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Course Difficulty
            </label>
            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value as 'easy' | 'medium' | 'hard')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <Button onClick={handleCalculate} className="w-full">
            Calculate Study Hours
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Weekly Study Hours"
                value={`${result.weeklyHours} hours`}
              />
              <Result
                label="Total Semester Hours"
                value={`${result.totalHours} hours`}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Study Schedule Breakdown</h3>
              <div className="space-y-2 text-blue-800">
                <p>• Daily study time: {(result.weeklyHours / 7).toFixed(1)} hours</p>
                <p>• Monthly study time: {(result.weeklyHours * 4)} hours</p>
                <p>• Hours per credit: {(result.weeklyHours / parseInt(courseCredits)).toFixed(1)} hours</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Break study sessions into 25-minute blocks</li>
                <li>• Take regular 5-minute breaks</li>
                <li>• Review material within 24 hours</li>
                <li>• Use active recall techniques</li>
                <li>• Create a consistent study schedule</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateGPA } from '../../lib/calculators/education';

interface Grade {
  grade: string;
  credits: number;
}

export function GPACalculator() {
  const [grades, setGrades] = useState<Grade[]>([{ grade: 'A', credits: 3 }]);
  const [result, setResult] = useState<{ gpa: number; totalCredits: number } | null>(null);

  const gradeOptions = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'F'];

  const handleAddCourse = () => {
    setGrades([...grades, { grade: 'A', credits: 3 }]);
  };

  const handleRemoveCourse = (index: number) => {
    setGrades(grades.filter((_, i) => i !== index));
  };

  const handleGradeChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index].grade = value;
    setGrades(newGrades);
  };

  const handleCreditsChange = (index: number, value: string) => {
    const newGrades = [...grades];
    newGrades[index].credits = parseInt(value) || 0;
    setGrades(newGrades);
  };

  const handleCalculate = () => {
    const calculationResult = calculateGPA(grades);
    setResult(calculationResult);
  };

  return (
    <Calculator
      title="GPA Calculator"
      description="Calculate your Grade Point Average (GPA) based on your course grades and credits."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {grades.map((grade, index) => (
            <div key={index} className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grade
                </label>
                <select
                  value={grade.grade}
                  onChange={(e) => handleGradeChange(index, e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {gradeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <Input
                  label="Credits"
                  type="number"
                  value={grade.credits.toString()}
                  onChange={(e) => handleCreditsChange(index, e.target.value)}
                  min="0"
                  max="6"
                />
              </div>
              {grades.length > 1 && (
                <Button
                  variant="secondary"
                  onClick={() => handleRemoveCourse(index)}
                  className="mb-1"
                >
                  Remove
                </Button>
              )}
            </div>
          ))}

          <Button onClick={handleAddCourse} variant="secondary" className="w-full">
            Add Course
          </Button>

          <Button onClick={handleCalculate} className="w-full">
            Calculate GPA
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="GPA"
                value={result.gpa.toFixed(2)}
              />
              <Result
                label="Total Credits"
                value={result.totalCredits}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">GPA Scale</h3>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <p>A+ = 4.0</p>
                  <p>A = 4.0</p>
                  <p>A- = 3.7</p>
                  <p>B+ = 3.3</p>
                </div>
                <div>
                  <p>B = 3.0</p>
                  <p>B- = 2.7</p>
                  <p>C+ = 2.3</p>
                  <p>C = 2.0</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Academic Standing</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• 3.5 - 4.0: Excellent</li>
                <li>• 3.0 - 3.49: Good</li>
                <li>• 2.5 - 2.99: Satisfactory</li>
                <li>• 2.0 - 2.49: Poor</li>
                <li>• Below 2.0: Academic Probation</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
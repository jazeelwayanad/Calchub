import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { generatePassword, checkPasswordStrength } from '../../lib/calculators/entertainment';

export function PasswordGenerator() {
  const [length, setLength] = useState<string>('12');
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState<{
    score: number;
    feedback: string[];
  } | null>(null);

  const handleGenerate = () => {
    const newPassword = generatePassword(parseInt(length), options);
    setPassword(newPassword);
    setStrength(checkPasswordStrength(newPassword));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
  };

  const getStrengthColor = (score: number) => {
    if (score <= 2) return 'text-red-600';
    if (score <= 4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Calculator
      title="Password Generator"
      description="Generate secure passwords with custom requirements."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Password Length"
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="8"
            max="64"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password Options
            </label>
            <div className="space-y-2">
              {Object.entries(options).map(([key, value]) => (
                <label key={key} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setOptions({ ...options, [key]: !value })}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-gray-700 capitalize">
                    Include {key}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <Button onClick={handleGenerate} className="w-full">
            Generate Password
          </Button>
        </div>

        {password && (
          <div className="space-y-6">
            <div className="relative">
              <Result
                label="Generated Password"
                value={password}
              />
              <Button
                variant="secondary"
                onClick={handleCopy}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                Copy
              </Button>
            </div>

            {strength && (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Password Strength</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={getStrengthColor(strength.score)}>
                        {strength.score <= 2 ? 'Weak' : strength.score <= 4 ? 'Moderate' : 'Strong'}
                      </span>
                      <div className="h-2 w-48 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            strength.score <= 2 ? 'bg-red-500' : 
                            strength.score <= 4 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`}
                          style={{ width: `${(strength.score / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                    {strength.feedback.map((feedback, index) => (
                      <p key={index} className="text-blue-800">• {feedback}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Password Tips</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Use a mix of characters for stronger passwords</li>
                    <li>• Avoid using personal information</li>
                    <li>• Use different passwords for different accounts</li>
                    <li>• Consider using a password manager</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Calculator>
  );
}
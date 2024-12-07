import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateEngagementRate } from '../../lib/calculators/social';

export function EngagementCalculator() {
  const [followers, setFollowers] = useState<string>('');
  const [likes, setLikes] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [result, setResult] = useState<{
    engagementRate: number;
    totalEngagements: number;
  } | null>(null);

  const handleCalculate = () => {
    const f = parseInt(followers);
    const l = parseInt(likes);
    const c = parseInt(comments);

    if (f && l >= 0 && c >= 0) {
      const calculationResult = calculateEngagementRate(f, l, c);
      setResult(calculationResult);
    }
  };

  const getEngagementColor = (rate: number) => {
    if (rate < 1) return 'text-red-600';
    if (rate < 3) return 'text-yellow-600';
    if (rate < 6) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <Calculator
      title="Social Media Engagement Calculator"
      description="Calculate your engagement rate and analyze your social media performance."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Number of Followers"
            type="number"
            value={followers}
            onChange={(e) => setFollowers(e.target.value)}
            placeholder="Enter total followers"
            min="0"
          />
          <Input
            label="Number of Likes"
            type="number"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
            placeholder="Enter total likes"
            min="0"
          />
          <Input
            label="Number of Comments"
            type="number"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter total comments"
            min="0"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Engagement
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Engagement Rate"
                value={`${result.engagementRate.toFixed(2)}%`}
                className={getEngagementColor(result.engagementRate)}
              />
              <Result
                label="Total Engagements"
                value={result.totalEngagements.toLocaleString()}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Engagement Analysis</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Poor</span>
                    <span>&lt; 1%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Good</span>
                    <span>1-3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '50%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Very Good</span>
                    <span>3-6%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-blue-800 mb-1">
                    <span>Excellent</span>
                    <span>&gt; 6%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Engagement Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Post consistently to maintain engagement</li>
                <li>• Respond to comments to encourage interaction</li>
                <li>• Use relevant hashtags to increase reach</li>
                <li>• Share engaging and valuable content</li>
                <li>• Post during peak activity hours</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
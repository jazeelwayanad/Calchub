import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { generateHashtags } from '../../lib/calculators/social';

export function HashtagGenerator() {
  const [keyword, setKeyword] = useState<string>('');
  const [count, setCount] = useState<string>('5');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleGenerate = () => {
    if (keyword) {
      const generatedHashtags = generateHashtags(keyword, parseInt(count));
      setHashtags(generatedHashtags);
    }
  };

  const handleCopy = (hashtag: string) => {
    navigator.clipboard.writeText(hashtag);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
  };

  return (
    <Calculator
      title="Hashtag Generator"
      description="Generate relevant hashtags for your social media content."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter a keyword"
          />
          <Input
            label="Number of Hashtags"
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            min="1"
            max="30"
          />

          <Button onClick={handleGenerate} className="w-full">
            Generate Hashtags
          </Button>
        </div>

        {hashtags.length > 0 && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Hashtags</h3>
                <Button variant="secondary" onClick={handleCopyAll}>
                  Copy All
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <button
                    key={index}
                    onClick={() => handleCopy(hashtag)}
                    className="bg-white px-3 py-1 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {hashtag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Hashtag Tips</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Mix popular and niche hashtags</li>
                <li>• Use relevant hashtags only</li>
                <li>• Don't overuse hashtags</li>
                <li>• Research trending hashtags</li>
                <li>• Create branded hashtags</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
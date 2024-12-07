import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateCompoundInterest, formatCurrency } from '../../lib/utils';

export function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('12');
  const [result, setResult] = useState<any>(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  const frequencies = [
    { value: '1', label: 'Annually' },
    { value: '2', label: 'Semi-annually' },
    { value: '4', label: 'Quarterly' },
    { value: '12', label: 'Monthly' },
    { value: '365', label: 'Daily' },
  ];

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    const f = parseFloat(frequency);

    if (p && r && y) {
      const calculationResult = calculateCompoundInterest(p, r, y, f);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Compound Interest Calculator"
      description="Calculate how your investments grow with compound interest."
    >
      <div className="space-y-4">
        <Input
          label="Principal Amount ($)"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter initial investment"
        />
        <Input
          label="Annual Interest Rate (%)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter interest rate"
        />
        <Input
          label="Time Period (years)"
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="Enter time period"
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Compounding Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {frequencies.map((freq) => (
              <option key={freq.value} value={freq.value}>
                {freq.label}
              </option>
            ))}
          </select>
        </div>

        <Button onClick={handleCalculate} className="w-full">
          Calculate Interest
        </Button>
        
        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Final Amount"
                value={formatCurrency(result.finalAmount)}
              />
              <Result
                label="Total Interest Earned"
                value={formatCurrency(result.totalInterest)}
              />
            </div>
            
            <Button
              variant="secondary"
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full"
            >
              {showBreakdown ? 'Hide' : 'Show'} Yearly Breakdown
            </Button>

            {showBreakdown && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest Earned
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {result.yearlyBreakdown.map((row: any) => (
                      <tr key={row.year}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.interest)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </Calculator>
  );
}
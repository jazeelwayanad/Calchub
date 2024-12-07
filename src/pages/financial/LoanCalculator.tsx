import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateEMI, formatCurrency } from '../../lib/utils';

export function LoanCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [months, setMonths] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    const m = parseFloat(months) || 0;

    if (p && r && (y || m)) {
      const calculationResult = calculateEMI(p, r, y, m);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Advanced Loan EMI Calculator"
      description="Calculate your monthly EMI, total interest, and view complete amortization schedule."
    >
      <div className="space-y-4">
        <Input
          label="Loan Amount ($)"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter loan amount"
        />
        <Input
          label="Interest Rate (% per year)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter interest rate"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Years"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="Years"
          />
          <Input
            label="Months"
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            placeholder="Months"
            min="0"
            max="11"
          />
        </div>
        <Button onClick={handleCalculate} className="w-full">
          Calculate EMI
        </Button>
        
        {result && (
          <div className="space-y-4">
            <Result
              label="Monthly EMI"
              value={formatCurrency(result.emi)}
            />
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Total Interest"
                value={formatCurrency(result.totalInterest)}
              />
              <Result
                label="Total Payment"
                value={formatCurrency(result.totalPayment)}
              />
            </div>
            
            <Button
              variant="secondary"
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full"
            >
              {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
            </Button>

            {showAmortization && (
              <div className="mt-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Month
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        EMI
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Principal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {result.amortizationSchedule.map((row: any) => (
                      <tr key={row.month}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.month}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.emi)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.principal)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.interest)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.balance)}
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
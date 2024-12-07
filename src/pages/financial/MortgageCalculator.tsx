import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateMortgage, formatCurrency } from '../../lib/utils';

export function MortgageCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [rate, setRate] = useState<string>('');
  const [years, setYears] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('');
  const [propertyTax, setPropertyTax] = useState<string>('');
  const [insurance, setInsurance] = useState<string>('');
  const [result, setResult] = useState<any>(null);
  const [showAmortization, setShowAmortization] = useState(false);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const y = parseFloat(years);
    const dp = parseFloat(downPayment) || 0;
    const pt = parseFloat(propertyTax) || 0;
    const i = parseFloat(insurance) || 0;

    if (p && r && y) {
      const calculationResult = calculateMortgage(p, r, y, dp, pt, i);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Advanced Mortgage Calculator"
      description="Calculate your mortgage payments including property tax and insurance."
    >
      <div className="space-y-4">
        <Input
          label="Property Value ($)"
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter property value"
        />
        <Input
          label="Down Payment ($)"
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          placeholder="Enter down payment"
        />
        <Input
          label="Interest Rate (% per year)"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Enter interest rate"
        />
        <Input
          label="Loan Term (years)"
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="Enter loan term"
        />
        <Input
          label="Annual Property Tax ($)"
          type="number"
          value={propertyTax}
          onChange={(e) => setPropertyTax(e.target.value)}
          placeholder="Enter annual property tax"
        />
        <Input
          label="Annual Insurance ($)"
          type="number"
          value={insurance}
          onChange={(e) => setInsurance(e.target.value)}
          placeholder="Enter annual insurance"
        />
        
        <Button onClick={handleCalculate} className="w-full">
          Calculate Mortgage
        </Button>
        
        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Monthly Payment (P&I)"
                value={formatCurrency(result.monthlyPayment)}
              />
              <Result
                label="Monthly Payment with Extras"
                value={formatCurrency(result.monthlyWithExtras)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Result
                label="Total Interest"
                value={formatCurrency(result.totalInterest)}
              />
              <Result
                label="Total Cost"
                value={formatCurrency(result.totalCost)}
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
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Principal Paid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Interest Paid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Remaining Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {result.amortizationSchedule.map((row: any) => (
                      <tr key={row.year}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {row.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.principalPaid)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.interestPaid)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatCurrency(row.remainingBalance)}
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
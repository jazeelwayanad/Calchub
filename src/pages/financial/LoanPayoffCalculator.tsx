import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateLoanPayoff } from '../../lib/calculators/financial';
import { formatCurrency } from '../../lib/utils';

export function LoanPayoffCalculator() {
  const [principal, setPrincipal] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [result, setResult] = useState<{
    months: number;
    totalInterest: number;
    totalPayment: number;
  } | null>(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const mp = parseFloat(monthlyPayment);
    const r = parseFloat(interestRate);

    if (p && mp && r) {
      const calculationResult = calculateLoanPayoff(p, mp, r);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Loan Payoff Calculator"
      description="Calculate how long it will take to pay off your loan with a specific monthly payment."
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
          label="Monthly Payment ($)"
          type="number"
          value={monthlyPayment}
          onChange={(e) => setMonthlyPayment(e.target.value)}
          placeholder="Enter monthly payment"
        />
        <Input
          label="Annual Interest Rate (%)"
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter interest rate"
        />
        
        <Button onClick={handleCalculate} className="w-full">
          Calculate Payoff Time
        </Button>

        {result && (
          <div className="space-y-4">
            <Result
              label="Time to Pay Off"
              value={`${Math.floor(result.months / 12)} years ${result.months % 12} months`}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Result
                label="Total Interest"
                value={formatCurrency(result.totalInterest)}
              />
              <Result
                label="Total Payment"
                value={formatCurrency(result.totalPayment)}
              />
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
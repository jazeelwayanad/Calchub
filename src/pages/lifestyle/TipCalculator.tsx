import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { formatCurrency } from '../../lib/utils';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [numPeople, setNumPeople] = useState<string>('1');
  const [result, setResult] = useState<{
    tipAmount: number;
    totalAmount: number;
    perPerson: number;
  } | null>(null);

  const handleCalculate = () => {
    const bill = parseFloat(billAmount);
    const tip = parseFloat(tipPercentage);
    const people = parseInt(numPeople);

    if (bill && tip && people) {
      const tipAmount = (bill * tip) / 100;
      const totalAmount = bill + tipAmount;
      const perPerson = totalAmount / people;

      setResult({ tipAmount, totalAmount, perPerson });
    }
  };

  return (
    <Calculator
      title="Tip Calculator"
      description="Calculate tips and split bills easily."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Bill Amount ($)"
            type="number"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
            placeholder="Enter bill amount"
            min="0"
            step="0.01"
          />

          <Input
            label="Tip Percentage (%)"
            type="number"
            value={tipPercentage}
            onChange={(e) => setTipPercentage(e.target.value)}
            placeholder="Enter tip percentage"
            min="0"
            max="100"
          />

          <Input
            label="Number of People"
            type="number"
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            placeholder="Enter number of people"
            min="1"
          />

          <Button onClick={handleCalculate} className="w-full">
            Calculate Tip
          </Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Result
                label="Tip Amount"
                value={formatCurrency(result.tipAmount)}
              />
              <Result
                label="Total Amount"
                value={formatCurrency(result.totalAmount)}
              />
              <Result
                label="Per Person"
                value={formatCurrency(result.perPerson)}
              />
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Common Tip Percentages</h3>
              <div className="grid grid-cols-3 gap-4 text-blue-800">
                <div>
                  <p className="font-semibold">15%</p>
                  <p className="text-sm">Standard</p>
                </div>
                <div>
                  <p className="font-semibold">18%</p>
                  <p className="text-sm">Good Service</p>
                </div>
                <div>
                  <p className="font-semibold">20%</p>
                  <p className="text-sm">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
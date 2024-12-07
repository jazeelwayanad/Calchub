import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { formatCurrency } from '../../lib/utils';

interface Comparison {
  year: number;
  rentCost: number;
  buyCost: number;
  equity: number;
  difference: number;
}

export function RentVsBuyCalculator() {
  const [homePrice, setHomePrice] = useState<string>('');
  const [downPayment, setDownPayment] = useState<string>('20');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [propertyTax, setPropertyTax] = useState<string>('1.2');
  const [maintenance, setMaintenance] = useState<string>('1');
  const [monthlyRent, setMonthlyRent] = useState<string>('');
  const [rentIncrease, setRentIncrease] = useState<string>('3');
  const [homeAppreciation, setHomeAppreciation] = useState<string>('3');
  const [years, setYears] = useState<string>('10');
  const [comparison, setComparison] = useState<Comparison[]>([]);

  const calculateMortgagePayment = (principal: number, rate: number, years: number) => {
    const monthlyRate = rate / 12 / 100;
    const numPayments = years * 12;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
           (Math.pow(1 + monthlyRate, numPayments) - 1);
  };

  const handleCalculate = () => {
    const price = parseFloat(homePrice);
    const down = (parseFloat(downPayment) / 100) * price;
    const loan = price - down;
    const rate = parseFloat(interestRate);
    const taxRate = parseFloat(propertyTax) / 100;
    const maintRate = parseFloat(maintenance) / 100;
    const rent = parseFloat(monthlyRent);
    const rentInc = parseFloat(rentIncrease) / 100;
    const appreciation = parseFloat(homeAppreciation) / 100;
    const numYears = parseInt(years);

    if (price && rent && numYears) {
      const monthlyMortgage = calculateMortgagePayment(loan, rate, 30);
      const monthlyTax = (price * taxRate) / 12;
      const monthlyMaint = (price * maintRate) / 12;
      const monthlyBuyCost = monthlyMortgage + monthlyTax + monthlyMaint;

      const comparison: Comparison[] = [];
      let currentRent = rent;
      let currentHomeValue = price;
      let loanBalance = loan;
      let totalRentCost = 0;
      let totalBuyCost = down;

      for (let year = 1; year <= numYears; year++) {
        // Calculate yearly costs
        const yearlyRentCost = currentRent * 12;
        const yearlyBuyCost = monthlyBuyCost * 12;
        
        // Update running totals
        totalRentCost += yearlyRentCost;
        totalBuyCost += yearlyBuyCost;

        // Calculate loan paydown and equity
        const yearlyInterest = loanBalance * (rate / 100);
        const yearlyPrincipal = (monthlyMortgage * 12) - yearlyInterest;
        loanBalance -= yearlyPrincipal;
        currentHomeValue *= (1 + appreciation);
        const equity = currentHomeValue - loanBalance;

        comparison.push({
          year,
          rentCost: totalRentCost,
          buyCost: totalBuyCost,
          equity,
          difference: totalRentCost - (totalBuyCost - equity),
        });

        // Increase rent for next year
        currentRent *= (1 + rentInc);
      }

      setComparison(comparison);
    }
  };

  return (
    <Calculator
      title="Rent vs Buy Calculator"
      description="Compare the costs of renting versus buying a home over time."
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Home Price ($)"
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(e.target.value)}
              placeholder="Enter home price"
              min="0"
            />
            <Input
              label="Monthly Rent ($)"
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              placeholder="Enter monthly rent"
              min="0"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Down Payment (%)"
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              min="0"
              max="100"
            />
            <Input
              label="Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Property Tax Rate (%)"
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              min="0"
              step="0.1"
            />
            <Input
              label="Maintenance (%)"
              type="number"
              value={maintenance}
              onChange={(e) => setMaintenance(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Annual Rent Increase (%)"
              type="number"
              value={rentIncrease}
              onChange={(e) => setRentIncrease(e.target.value)}
              min="0"
              step="0.1"
            />
            <Input
              label="Home Appreciation (%)"
              type="number"
              value={homeAppreciation}
              onChange={(e) => setHomeAppreciation(e.target.value)}
              min="0"
              step="0.1"
            />
          </div>

          <Input
            label="Years to Compare"
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="1"
            max="30"
          />

          <Button onClick={handleCalculate} className="w-full">
            Compare Rent vs Buy
          </Button>
        </div>

        {comparison.length > 0 && (
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Rent Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Buy Cost
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Home Equity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Net Difference
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {comparison.map((row) => (
                    <tr key={row.year}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {row.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(row.rentCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(row.buyCost)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(row.equity)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm ${row.difference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(Math.abs(row.difference))} {row.difference > 0 ? 'Buying Ahead' : 'Renting Ahead'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Analysis Summary</h3>
              <div className="space-y-2 text-blue-800">
                <p>• Break-even Point: Year {comparison.findIndex(row => row.difference > 0) + 1 || 'Not reached'}</p>
                <p>• Final Equity: {formatCurrency(comparison[comparison.length - 1].equity)}</p>
                <p>• Net Difference after {years} years: {formatCurrency(Math.abs(comparison[comparison.length - 1].difference))}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Calculator>
  );
}
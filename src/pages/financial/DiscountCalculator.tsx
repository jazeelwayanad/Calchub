import React, { useState } from 'react';
import { Calculator } from '../../components/Calculator';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Result } from '../../components/Result';
import { calculateDiscount } from '../../lib/calculators/financial';
import { formatCurrency } from '../../lib/utils';

export function DiscountCalculator() {
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<string>('');
  const [result, setResult] = useState<{ discountAmount: number; finalPrice: number } | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercent);

    if (price && discount) {
      const calculationResult = calculateDiscount(price, discount);
      setResult(calculationResult);
    }
  };

  return (
    <Calculator
      title="Discount Calculator"
      description="Calculate the final price after applying a discount percentage."
    >
      <div className="space-y-4">
        <Input
          label="Original Price ($)"
          type="number"
          value={originalPrice}
          onChange={(e) => setOriginalPrice(e.target.value)}
          placeholder="Enter original price"
        />
        <Input
          label="Discount Percentage (%)"
          type="number"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="Enter discount percentage"
          min="0"
          max="100"
        />
        
        <Button onClick={handleCalculate} className="w-full">
          Calculate Discount
        </Button>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Result
              label="Original Price"
              value={formatCurrency(parseFloat(originalPrice))}
            />
            <Result
              label="Discount Amount"
              value={formatCurrency(result.discountAmount)}
            />
            <Result
              label="Final Price"
              value={formatCurrency(result.finalPrice)}
            />
          </div>
        )}
      </div>
    </Calculator>
  );
}
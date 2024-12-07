export function calculateBreakEven(
  fixedCosts: number,
  pricePerUnit: number,
  costPerUnit: number
): {
  breakEvenUnits: number;
  breakEvenRevenue: number;
} {
  const contributionMargin = pricePerUnit - costPerUnit;
  const breakEvenUnits = fixedCosts / contributionMargin;
  
  return {
    breakEvenUnits,
    breakEvenRevenue: breakEvenUnits * pricePerUnit
  };
}

export function calculateProfitMargin(
  revenue: number,
  costs: number
): {
  grossProfit: number;
  profitMargin: number;
} {
  const grossProfit = revenue - costs;
  const profitMargin = (grossProfit / revenue) * 100;
  
  return { grossProfit, profitMargin };
}

export function calculateSalary(
  grossSalary: number,
  taxRate: number,
  deductions: number = 0
): {
  netSalary: number;
  taxAmount: number;
  takeHome: number;
} {
  const taxAmount = (grossSalary * taxRate) / 100;
  const netSalary = grossSalary - taxAmount;
  const takeHome = netSalary - deductions;
  
  return { netSalary, taxAmount, takeHome };
}
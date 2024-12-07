export function calculateLoanPayoff(
  principal: number,
  monthlyPayment: number,
  annualRate: number
): {
  months: number;
  totalInterest: number;
  totalPayment: number;
} {
  const monthlyRate = annualRate / 12 / 100;
  let balance = principal;
  let months = 0;
  let totalInterest = 0;

  while (balance > 0 && months < 360) {
    const interest = balance * monthlyRate;
    const principalPayment = Math.min(monthlyPayment - interest, balance);
    
    totalInterest += interest;
    balance -= principalPayment;
    months++;

    if (monthlyPayment <= interest) break;
  }

  return {
    months,
    totalInterest,
    totalPayment: principal + totalInterest
  };
}

export function calculateDiscount(
  originalPrice: number,
  discountPercent: number
): {
  discountAmount: number;
  finalPrice: number;
} {
  const discountAmount = (originalPrice * discountPercent) / 100;
  return {
    discountAmount,
    finalPrice: originalPrice - discountAmount
  };
}

export function calculateInvestmentValue(
  principal: number,
  annualRate: number,
  years: number,
  monthlyContribution: number = 0
): {
  finalValue: number;
  totalContributions: number;
  totalInterest: number;
} {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  
  let balance = principal;
  let totalContributions = principal;

  for (let i = 0; i < months; i++) {
    balance += monthlyContribution;
    totalContributions += monthlyContribution;
    balance *= (1 + monthlyRate);
  }

  return {
    finalValue: balance,
    totalContributions,
    totalInterest: balance - totalContributions
  };
}
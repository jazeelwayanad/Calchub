import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function calculateEMI(
  principal: number,
  rate: number,
  years: number,
  months: number = 0
): {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  amortizationSchedule: Array<{
    month: number;
    emi: number;
    principal: number;
    interest: number;
    balance: number;
  }>;
} {
  const totalMonths = years * 12 + months;
  const monthlyRate = rate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  let remainingBalance = principal;
  let totalInterest = 0;
  const amortizationSchedule = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = remainingBalance * monthlyRate;
    const principalPaid = emi - interest;
    remainingBalance -= principalPaid;
    totalInterest += interest;

    amortizationSchedule.push({
      month,
      emi,
      principal: principalPaid,
      interest,
      balance: remainingBalance,
    });
  }

  return {
    emi,
    totalInterest,
    totalPayment: principal + totalInterest,
    amortizationSchedule,
  };
}

export function calculateCompoundInterest(
  principal: number,
  rate: number,
  years: number,
  frequency: number = 12
): {
  finalAmount: number;
  totalInterest: number;
  yearlyBreakdown: Array<{
    year: number;
    amount: number;
    interest: number;
  }>;
} {
  const r = rate / 100;
  const n = frequency;
  const t = years;
  
  const finalAmount = principal * Math.pow(1 + r/n, n * t);
  const totalInterest = finalAmount - principal;
  
  const yearlyBreakdown = Array.from({ length: years }, (_, index) => {
    const year = index + 1;
    const amount = principal * Math.pow(1 + r/n, n * year);
    const interest = amount - principal;
    return { year, amount, interest };
  });

  return { finalAmount, totalInterest, yearlyBreakdown };
}

export function calculateMortgage(
  principal: number,
  rate: number,
  years: number,
  downPayment: number = 0,
  propertyTax: number = 0,
  insurance: number = 0
): {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  monthlyWithExtras: number;
  amortizationSchedule: Array<{
    year: number;
    principalPaid: number;
    interestPaid: number;
    remainingBalance: number;
  }>;
} {
  const loanAmount = principal - downPayment;
  const monthlyRate = rate / 12 / 100;
  const totalMonths = years * 12;
  
  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;
  const monthlyWithExtras = monthlyPayment + monthlyPropertyTax + monthlyInsurance;

  let remainingBalance = loanAmount;
  let totalInterest = 0;
  const amortizationSchedule = [];

  for (let year = 1; year <= years; year++) {
    let yearlyPrincipalPaid = 0;
    let yearlyInterestPaid = 0;

    for (let month = 1; month <= 12; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      yearlyPrincipalPaid += principalPayment;
      yearlyInterestPaid += interestPayment;
      remainingBalance -= principalPayment;
    }

    totalInterest += yearlyInterestPaid;
    amortizationSchedule.push({
      year,
      principalPaid: yearlyPrincipalPaid,
      interestPaid: yearlyInterestPaid,
      remainingBalance,
    });
  }

  return {
    monthlyPayment,
    totalInterest,
    totalCost: loanAmount + totalInterest,
    monthlyWithExtras,
    amortizationSchedule,
  };
}
import { differenceInYears, differenceInMonths, differenceInDays, format } from 'date-fns';

export function calculateAge(birthDate: Date): {
  years: number;
  months: number;
  days: number;
} {
  const today = new Date();
  
  return {
    years: differenceInYears(today, birthDate),
    months: differenceInMonths(today, birthDate) % 12,
    days: differenceInDays(today, birthDate) % 30
  };
}

export function calculateDateDifference(date1: Date, date2: Date): {
  years: number;
  months: number;
  days: number;
} {
  return {
    years: Math.abs(differenceInYears(date2, date1)),
    months: Math.abs(differenceInMonths(date2, date1) % 12),
    days: Math.abs(differenceInDays(date2, date1) % 30)
  };
}

export function formatDateTime(date: Date): string {
  return format(date, 'PPpp');
}
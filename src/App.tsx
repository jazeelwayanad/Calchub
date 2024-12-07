import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Financial Tools
import { FinancialDashboard } from './pages/financial/FinancialDashboard';
import { LoanCalculator } from './pages/financial/LoanCalculator';
import { MortgageCalculator } from './pages/financial/MortgageCalculator';
import { CompoundInterestCalculator } from './pages/financial/CompoundInterestCalculator';
import { ROICalculator } from './pages/financial/ROICalculator';
import { DiscountCalculator } from './pages/financial/DiscountCalculator';
import { LoanPayoffCalculator } from './pages/financial/LoanPayoffCalculator';

// Lifestyle Tools
import { LifestyleDashboard } from './pages/lifestyle/LifestyleDashboard';
import { TipCalculator } from './pages/lifestyle/TipCalculator';
import { UnitConverter } from './pages/lifestyle/UnitConverter';
import { TaxCalculator } from './pages/lifestyle/TaxCalculator';
import { RentVsBuyCalculator } from './pages/lifestyle/RentVsBuyCalculator';

// Health Tools
import { HealthDashboard } from './pages/health/HealthDashboard';
import { BMICalculator } from './pages/health/BMICalculator';
import { CalorieCalculator } from './pages/health/CalorieCalculator';
import { BodyFatCalculator } from './pages/health/BodyFatCalculator';

// Time Tools
import { TimeDashboard } from './pages/time/TimeDashboard';
import { AgeCalculator } from './pages/time/AgeCalculator';
import { DateDifferenceCalculator } from './pages/time/DateDifferenceCalculator';
import { CountdownTimer } from './pages/time/CountdownTimer';

// Business Tools
import { BusinessDashboard } from './pages/business/BusinessDashboard';
import { BreakEvenCalculator } from './pages/business/BreakEvenCalculator';
import { ProfitMarginCalculator } from './pages/business/ProfitMarginCalculator';
import { SalaryCalculator } from './pages/business/SalaryCalculator';

// Entertainment Tools
import { EntertainmentDashboard } from './pages/entertainment/EntertainmentDashboard';
import { PasswordGenerator } from './pages/entertainment/PasswordGenerator';
import { RandomNumberGenerator } from './pages/entertainment/RandomNumberGenerator';

// Social Tools
import { SocialDashboard } from './pages/social/SocialDashboard';
import { EngagementCalculator } from './pages/social/EngagementCalculator';
import { HashtagGenerator } from './pages/social/HashtagGenerator';
import { AdBudgetCalculator } from './pages/social/AdBudgetCalculator';

// Education Tools
import { EducationDashboard } from './pages/education/EducationDashboard';
import { GPACalculator } from './pages/education/GPACalculator';
import { StudyHoursCalculator } from './pages/education/StudyHoursCalculator';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          {/* Financial Routes */}
          <Route path="financial">
            <Route index element={<FinancialDashboard />} />
            <Route path="loan" element={<LoanCalculator />} />
            <Route path="mortgage" element={<MortgageCalculator />} />
            <Route path="compound-interest" element={<CompoundInterestCalculator />} />
            <Route path="roi" element={<ROICalculator />} />
            <Route path="discount" element={<DiscountCalculator />} />
            <Route path="loan-payoff" element={<LoanPayoffCalculator />} />
          </Route>

          {/* Health Routes */}
          <Route path="health">
            <Route index element={<HealthDashboard />} />
            <Route path="bmi" element={<BMICalculator />} />
            <Route path="calories" element={<CalorieCalculator />} />
            <Route path="body-fat" element={<BodyFatCalculator />} />
          </Route>
  {/* Lifestyle Routes */}
          <Route path="lifestyle">
            <Route index element={<LifestyleDashboard />} />
            <Route path="tip" element={<TipCalculator />} />
            <Route path="unit-converter" element={<UnitConverter />} />
            <Route path="tax" element={<TaxCalculator />} />
            <Route path="rent-vs-buy" element={<RentVsBuyCalculator />} />
          </Route>

          {/* Time Routes */}
          <Route path="time">
            <Route index element={<TimeDashboard />} />
            <Route path="age" element={<AgeCalculator />} />
            <Route path="date-difference" element={<DateDifferenceCalculator />} />
            <Route path="countdown" element={<CountdownTimer />} />
          </Route>

          {/* Business Routes */}
          <Route path="business">
            <Route index element={<BusinessDashboard />} />
            <Route path="break-even" element={<BreakEvenCalculator />} />
            <Route path="profit-margin" element={<ProfitMarginCalculator />} />
            <Route path="salary" element={<SalaryCalculator />} />
          </Route>

          {/* Entertainment Routes */}
          <Route path="entertainment">
            <Route index element={<EntertainmentDashboard />} />
            <Route path="password" element={<PasswordGenerator />} />
            <Route path="random-number" element={<RandomNumberGenerator />} />
          </Route>

          {/* Social Routes */}
          <Route path="social">
            <Route index element={<SocialDashboard />} />
            <Route path="engagement" element={<EngagementCalculator />} />
            <Route path="hashtags" element={<HashtagGenerator />} />
            <Route path="ad-budget" element={<AdBudgetCalculator />} />
          </Route>

          {/* Education Routes */}
          <Route path="education">
            <Route index element={<EducationDashboard />} />
            <Route path="gpa" element={<GPACalculator />} />
            <Route path="study-hours" element={<StudyHoursCalculator />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
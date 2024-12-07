export function calculateBMI(weight: number, height: number): {
  bmi: number;
  category: string;
} {
  const bmi = weight / Math.pow(height / 100, 2);
  
  let category = '';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi < 25) category = 'Normal weight';
  else if (bmi < 30) category = 'Overweight';
  else category = 'Obese';

  return { bmi, category };
}

export function calculateCalorieNeeds(
  age: number,
  gender: 'male' | 'female',
  weight: number,
  height: number,
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
): {
  bmr: number;
  maintenance: number;
  weightLoss: number;
  weightGain: number;
} {
  // BMR calculation using Mifflin-St Jeor Equation
  const bmr = gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9
  };

  const maintenance = bmr * activityMultipliers[activityLevel];

  return {
    bmr,
    maintenance,
    weightLoss: maintenance - 500, // 500 calorie deficit for weight loss
    weightGain: maintenance + 500  // 500 calorie surplus for weight gain
  };
}

export function calculateBodyFat(
  gender: 'male' | 'female',
  waist: number,
  neck: number,
  height: number,
  hip?: number
): number {
  if (gender === 'male') {
    return 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
  } else {
    if (!hip) return 0;
    return 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
  }
}
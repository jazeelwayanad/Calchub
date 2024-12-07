export function calculateGPA(grades: Array<{ grade: string; credits: number }>): {
  gpa: number;
  totalCredits: number;
} {
  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
  };

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach(({ grade, credits }) => {
    totalPoints += gradePoints[grade] * credits;
    totalCredits += credits;
  });

  return {
    gpa: totalCredits > 0 ? totalPoints / totalCredits : 0,
    totalCredits
  };
}

export function calculateStudyHours(
  courseCredits: number,
  difficultyLevel: 'easy' | 'medium' | 'hard'
): {
  weeklyHours: number;
  totalHours: number;
} {
  const difficultyMultiplier = {
    easy: 2,
    medium: 3,
    hard: 4
  };

  const weeklyHours = courseCredits * difficultyMultiplier[difficultyLevel];
  const totalHours = weeklyHours * 15; // Assuming a 15-week semester

  return { weeklyHours, totalHours };
}
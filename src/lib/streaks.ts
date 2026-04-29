export function calculateCurrentStreak(completions: string[], today?: string): number {
  if (completions.length === 0) return 0;

  const referenceDate = today || new Date().toISOString().split('T')[0];
  const uniqueDates = Array.from(new Set(completions)).sort().reverse();

  // If today is not completed, the current streak is 0
  if (!uniqueDates.includes(referenceDate)) {
    return 0;
  }

  let streak = 0;
  let currentDate = new Date(referenceDate);

  for (let i = 0; i < uniqueDates.length; i++) {
    const dateString = currentDate.toISOString().split('T')[0];
    
    if (uniqueDates.includes(dateString)) {
      streak++;
      // Move to the previous calendar day
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
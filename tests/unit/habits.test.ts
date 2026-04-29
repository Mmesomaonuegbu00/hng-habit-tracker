import { describe, it, expect } from 'vitest';
import { toggleHabitCompletion } from '@/lib/habits';
import { Habit } from '@/types/habit';

describe('toggleHabitCompletion', () => {
  const mockHabit: Habit = {
    id: '1',
    userId: 'u1',
    name: 'Test',
    description: '',
    frequency: 'daily',
    createdAt: '2026-04-01',
    completions: ['2026-04-27']
  };

  it('adds a completion date when the date is not present', () => {
    const result = toggleHabitCompletion(mockHabit, '2026-04-28');
    expect(result.completions).toContain('2026-04-28');
    expect(result.completions.length).toBe(2);
  });

  it('removes a completion date when the date already exists', () => {
    const result = toggleHabitCompletion(mockHabit, '2026-04-27');
    expect(result.completions).not.toContain('2026-04-27');
    expect(result.completions.length).toBe(0);
  });

  it('does not mutate the original habit object', () => {
    const originalCount = mockHabit.completions.length;
    toggleHabitCompletion(mockHabit, '2026-04-28');
    expect(mockHabit.completions.length).toBe(originalCount);
  });

  it('does not return duplicate completion dates', () => {
    // Manually creating a habit with a duplicate to test the cleaner
    const habitWithDup = { ...mockHabit, completions: ['2026-04-27', '2026-04-27'] };
    const result = toggleHabitCompletion(habitWithDup, '2026-04-28');
    const uniqueDates = new Set(result.completions);
    expect(uniqueDates.size).toBe(result.completions.length);
  });
});
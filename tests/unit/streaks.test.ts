import { describe, it, expect } from 'vitest';
import { calculateCurrentStreak } from '../../src/lib/streaks';

/* MENTOR_TRACE_STAGE3_HABIT_A91 */

describe('calculateCurrentStreak', () => {
  it('returns 0 when completions is empty', () => {
    expect(calculateCurrentStreak([])).toBe(0);
  });

  it('returns 0 when today is not completed', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];
    expect(calculateCurrentStreak([dateStr])).toBe(0);
  });

  it('returns the correct streak for consecutive completed days', () => {
    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];
    
    expect(calculateCurrentStreak([today, yesterday])).toBe(2);
  });

  it('ignores duplicate completion dates', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(calculateCurrentStreak([today, today])).toBe(1);
  });

  it('breaks the streak when a calendar day is missing', () => {
    const today = new Date().toISOString().split('T')[0];
    const twoDaysAgoDate = new Date();
    twoDaysAgoDate.setDate(twoDaysAgoDate.getDate() - 2);
    const twoDaysAgo = twoDaysAgoDate.toISOString().split('T')[0];
    
    expect(calculateCurrentStreak([today, twoDaysAgo])).toBe(1);
  });
});
'use client';
import { useState } from 'react';
import DeleteHabitModal from '../shared/DeleteComfirmModal';
import { Habit } from '@/types/habit';
import { getHabitSlug } from '@/lib/slug';
import { calculateCurrentStreak } from '@/lib/streaks';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;
}

const DAY_INITIALS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function getWeekDates(referenceDate: Date): Date[] {
  const d = new Date(referenceDate);
  const dow = d.getDay();
  d.setDate(d.getDate() - dow);
  return Array.from({ length: 7 }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return x;
  });
}

function RingProgress({
  pct,
  streak,
  isCompletedToday,
  onToggle,
}: {
  pct: number;
  streak: number;
  isCompletedToday: boolean;
  onToggle: () => void;
}) {
  const r = 25;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <button
      onClick={onToggle}
      className="relative w-15 h-15 shrink-0 focus:outline-none"
      aria-label={isCompletedToday ? 'Mark incomplete' : 'Mark complete'}
    >
      <svg width="60" height="60" viewBox="0 0 60 60" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="30" cy="30" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="5"
        />
        <circle
          cx="30" cy="30" r={r}
          fill="none"
          stroke={isCompletedToday ? '#00ff9d' : 'var(--accent-blue)'}
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.45s ease' }}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center text-lg font-bold font-heading"
        style={{ color: isCompletedToday ? '#00ff9d' : 'var(--accent-blue)' }}
      >
        {isCompletedToday ? '✓' : streak}
      </div>
    </button>
  );
}

export default function HabitCard({ habit, onToggle, onEdit, onDelete }: HabitCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const slug = getHabitSlug(habit.name);
  const streak = calculateCurrentStreak(habit.completions);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const isCompletedToday = habit.completions.includes(todayStr);

  const weekDates = getWeekDates(today);
  const weekDone = weekDates.filter(d =>
    habit.completions.includes(d.toISOString().split('T')[0])
  ).length;
  const weeklyGoal = habit.weeklyGoal ?? 7;
  const weeklyCompleted = habit.weeklyCompleted ?? weekDone;
  const progressPct = Math.min(Math.round((weeklyCompleted / weeklyGoal) * 100), 100);

  const longestStreak = habit.longestStreak ?? 0;
  const consistency = habit.consistency ?? progressPct;

  return (
    <div
      data-testid={`habit-card-${slug}`}
      className="glass-card group w-full relative overflow-hidden transition-all duration-300 hover:border-accent-blue"
      style={{
        borderRadius: '24px',
        padding: '20px',
      }}
    >
      {/* Background glow using your accent purple */}
      <div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: 'var(--accent-purple)', filter: 'blur(40px)' }}
      />

      {/* ── HEADER ── */}
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.2em] uppercase mb-1 font-heading" style={{ color: 'var(--text-muted)' }}>
            Daily
          </p>
          <h3 className="text-lg font-bold text-white truncate font-heading">{habit.name}</h3>
          {habit.description && (
            <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-muted)' }}>
              {habit.description}
            </p>
          )}
        </div>

        <RingProgress
          pct={progressPct}
          streak={streak}
          isCompletedToday={isCompletedToday}
          onToggle={() => onToggle(habit.id)}
        />
      </div>

      {/* ── STREAK FIRE BAR ── */}
      {streak > 0 && (
        <div
          className="flex items-center gap-2 rounded-xl px-3 py-2 mb-4"
          style={{
            background: 'rgba(251,191,36,0.06)',
            border: '1px solid rgba(251,191,36,0.14)',
          }}
        >
          <span style={{ fontSize: 14 }}>🔥</span>
          <p className="text-xs" style={{ color: 'rgba(251,191,36,0.85)' }}>
            <strong style={{ color: '#fbbf24' }}>{streak} day streak</strong>
            {streak >= 7 ? ' — you\'re on fire!' : ' — keep it going!'}
          </p>
        </div>
      )}

      {/* ── STATS ROW ── */}
      <div className="grid grid-cols-3 gap-2.5 mb-4">
        {[
          { label: 'Streak', val: streak, unit: 'days', color: 'var(--accent-blue)' },
          { label: 'Best', val: longestStreak, unit: 'days', color: 'var(--accent-purple)' },
          { label: 'Rate', val: `${consistency}%`, unit: 'this week', color: '#fbbf24' },
        ].map(({ label, val, unit, color }) => (
          <div
            key={label}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--card-border)',
              borderRadius: 14,
              padding: '10px 12px',
            }}
          >
            <p className="text-[9px] uppercase tracking-[0.18em] mb-1 font-heading" style={{ color: 'var(--text-muted)' }}>
              {label}
            </p>
            <p className="text-xl font-bold leading-none font-heading" style={{ color }}>{val}</p>
            <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{unit}</p>
          </div>
        ))}
      </div>

      {/* ── 7-DAY CALENDAR STRIP ── */}
      <div className="mb-4">
        <p className="text-[10px] uppercase tracking-[0.15em] mb-2 font-heading" style={{ color: 'var(--text-muted)' }}>
          This week
        </p>
        <div className="grid grid-cols-7 gap-1.5">
          {weekDates.map((date) => {
            const ds = date.toISOString().split('T')[0];
            const isFuture = date > today && ds !== todayStr;
            const done = habit.completions.includes(ds);
            const isToday = ds === todayStr;
            const dayNum = date.getDate();

            return (
              <div key={ds} className="flex flex-col items-center gap-1">
                <span className="text-[9px] uppercase font-heading" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
                  {DAY_INITIALS[date.getDay()]}
                </span>
                <button
                  onClick={() => !isFuture && onToggle(habit.id)}
                  disabled={isFuture}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    fontSize: 11,
                    fontWeight: done ? 700 : 500,
                    transition: 'all 0.2s',
                    background: done && isToday
                      ? 'var(--accent-blue)'
                      : done
                        ? 'rgba(0,210,255,0.1)'
                        : 'rgba(255,255,255,0.03)',
                    border: done && isToday
                      ? '1px solid var(--accent-blue)'
                      : done
                        ? '1px solid rgba(0,210,255,0.3)'
                        : isToday
                          ? '1px solid var(--foreground)'
                          : '1px solid var(--card-border)',
                    color: done && isToday
                      ? 'var(--background)'
                      : done
                        ? 'var(--accent-blue)'
                        : isToday
                          ? 'var(--foreground)'
                          : 'var(--text-muted)',
                    opacity: isFuture ? 0.3 : 1,
                  }}
                  className="flex items-center justify-center"
                  data-testid={`habit-day-${slug}-${ds}`}
                >
                  {done ? '✓' : dayNum}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="w-full h-1.5 rounded-full overflow-hidden mb-4 bg-white/5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${progressPct}%`,
            background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-purple))',
            transition: 'width 0.5s ease',
          }}
        />
      </div>

      {/* ── ACTIONS ── */}
      <div className="flex gap-2">
        <button
          data-testid={`habit-complete-${slug}`}
          onClick={() => onToggle(habit.id)}
          className="flex-1 text-xs font-bold py-2.5 rounded-xl transition-all"
          style={{
            background: isCompletedToday ? 'rgba(0,255,157,0.1)' : 'rgba(0,210,255,0.05)',
            border: `1px solid ${isCompletedToday ? 'rgba(0,255,157,0.3)' : 'rgba(0,210,255,0.2)'}`,
            color: isCompletedToday ? '#00ff9d' : 'var(--accent-blue)',
          }}
        >
          {isCompletedToday ? '✓ Completed' : 'Mark Complete'}
        </button>

        <button
          data-testid={`habit-edit-${slug}`}
          onClick={() => onEdit(habit)}
          className="text-xs font-medium py-2.5 px-4 rounded-xl transition-all"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--card-border)',
            color: 'var(--text-muted)',
          }}
        >
          Edit
        </button>

        <button
          data-testid={`habit-delete-${slug}`}
          onClick={() => setShowDeleteModal(true)}
          className="text-xs font-medium py-2.5 px-4 rounded-xl transition-all"
          style={{
            background: 'rgba(239,68,68,0.05)',
            border: '1px solid rgba(239,68,68,0.1)',
            color: '#f87171',
          }}
        >
          Delete
        </button>
      </div>
      <DeleteHabitModal
        isOpen={showDeleteModal}
        habitName={habit.name}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={() => {
          onDelete(habit.id);
          setShowDeleteModal(false);
        }}
      />
    </div>
  );
}
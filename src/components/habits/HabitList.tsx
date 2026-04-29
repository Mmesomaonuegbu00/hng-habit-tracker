import React from 'react';
import { Habit } from '@/types/habit';
import HabitCard from './HabitCard';

interface HabitListProps {
  habits: Habit[];
  onToggle: (id: string) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (id: string) => void;

  // ✅ ADD THIS (needed for modal trigger)
  onCreate?: () => void;
}

export const HabitList: React.FC<HabitListProps> = ({
  habits,
  onToggle,
  onEdit,
  onDelete,
  onCreate,
}) => {
  if (habits.length === 0) {
    return (
      <div
        data-testid="empty-state"
        className="relative group overflow-hidden glass-card rounded-4xl py-20 px-6 text-center border-dashed border-white/10"
      >
        <div className="absolute inset-0 bg-linear-to-b from-white/2 to-transparent pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto flex items-center justify-center border border-white/10 group-hover:border-[#00d2ff]/50 transition-colors">
            <svg
              className="w-8 h-8 text-slate-600 group-hover:text-[#00d2ff] transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <p className="text-white font-bold font-heading text-lg">
              No habits yet
            </p>
            <p className="text-slate-500 text-sm max-w-60 mx-auto">
              Create your first habit to start tracking progress.
            </p>
          </div>

          {/* ✅ FIXED CTA */}
          <button
            data-testid="create-habit-button"
            onClick={onCreate}
            className="px-5 py-2.5 rounded-xl bg-[#00d2ff] text-black font-bold hover:scale-105 transition-transform"
          >
            ➕ New Habit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-6 pb-10">
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
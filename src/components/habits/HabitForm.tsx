'use client';
import { useState } from 'react';
import { Habit } from '@/types/habit';
import { validateHabitName } from '@/lib/validators';

interface HabitFormProps {
  initialData?: Habit;
  onSave: (data: Partial<Habit>) => void;
  onCancel: () => void;
}

export default function HabitForm({ initialData, onSave, onCancel }: HabitFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [frequency, setFrequency] = useState<'daily'>('daily');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateHabitName(name);

    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    onSave({
      name: validation.value,
      description,
      frequency,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        data-testid="habit-form"
        className="w-full max-w-lg bg-[#0f172a]/90 border border-white/10 backdrop-blur-xl rounded-3xl p-5 sm:p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            {initialData ? 'Edit Habit' : 'New Habit'}
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Build consistency one habit at a time
          </p>
        </div>

        <div className="space-y-5">

          <label htmlFor="habit-name" className="text-xs uppercase tracking-widest text-slate-400">
            Habit Name
          </label>

          <input
            id="habit-name"
            data-testid="habit-name-input"
            value={name}
            placeholder="e.g. Morning Run"
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
          />

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="habit-description" className="text-xs uppercase tracking-widest text-slate-400">
              Notes
            </label>
            <textarea
              data-testid="habit-description-input"
              value={description}
              placeholder="Optional details..."
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400 resize-none"
            />
          </div>


          <div>
            <label htmlFor="habit-frequency" className="text-xs uppercase tracking-widest text-slate-400">
              Frequency
            </label>

            <select
              data-testid="habit-frequency-select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily')}
              className="w-full mt-2 p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="daily">Daily</option>
            </select>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              data-testid="habit-save-button"
              className="flex-1 py-3 rounded-xl font-bold bg-cyan-500 text-black hover:scale-[1.02] transition"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl font-bold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </form>
    </div>
  );
}
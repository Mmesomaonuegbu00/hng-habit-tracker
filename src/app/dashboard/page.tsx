'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import HabitForm from '@/components/habits/HabitForm';
import { Habit } from '@/types/habit';
import { Session } from '@/types/auth';
import { toggleHabitCompletion } from '@/lib/habits';
import { calculateCurrentStreak } from '@/lib/streaks';
import { HabitList } from '@/components/habits/HabitList';

export default function DashboardPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('habit-tracker-session') || 'null');
    const allHabits = JSON.parse(localStorage.getItem('habit-tracker-habits') || '[]');

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(sessionData);

    if (sessionData) {
      setHabits(allHabits.filter((h: Habit) => h.userId === sessionData.userId));
    }
  }, []);

  const saveToLocalStorage = (updatedHabits: Habit[]) => {
    const allHabits = JSON.parse(localStorage.getItem('habit-tracker-habits') || '[]');
    const otherUsersHabits = allHabits.filter((h: Habit) => h.userId !== session?.userId);

    localStorage.setItem(
      'habit-tracker-habits',
      JSON.stringify([...otherUsersHabits, ...updatedHabits])
    );

    setHabits(updatedHabits);
  };

  const handleCreate = (data: Partial<Habit>) => {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      userId: session!.userId,
      name: data.name!,
      description: data.description || '',
      frequency: 'daily',
      createdAt: new Date().toISOString(),
      completions: [],
    };

    saveToLocalStorage([...habits, newHabit]);
    setIsCreating(false);
  };

  const handleUpdate = (data: Partial<Habit>) => {
    const updated = habits.map(h =>
      h.id === editingHabit!.id ? { ...h, ...data } : h
    );

    saveToLocalStorage(updated);
    setEditingHabit(null);
  };

  const handleDelete = (id: string) => {
    saveToLocalStorage(habits.filter(h => h.id !== id));
  };

  const handleToggle = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updated = habits.map(h =>
      h.id === id ? toggleHabitCompletion(h, today) : h
    );

    saveToLocalStorage(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem('habit-tracker-session');
    router.push('/login');
  };

  const today = new Date().toISOString().split('T')[0];
  const completedToday = habits.filter(h => h.completions.includes(today)).length;
  const totalHabits = habits.length;
  const progressPct =
    totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  const bestStreak = habits.reduce((max, h) => {
    const s = calculateCurrentStreak(h.completions);
    return s > max ? s : max;
  }, 0);

  const username = session?.email?.split('@')[0] || 'Friend';

  return (
    <ProtectedRoute>
      <main data-testid="dashboard-page" className="min-h-screen text-white relative overflow-x-hidden">

        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-150 h-75 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,210,255,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        
        <div className="fixed bottom-0 right-0 w-100 h-100 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at bottom right, rgba(79,70,229,0.1) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative z-10 pb-24">

          {/* NAV */}
          <nav className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold uppercase"
                style={{
                  background: 'rgba(0,210,255,0.1)',
                  border: '1px solid var(--accent-blue)',
                  color: 'var(--accent-blue)',
                }}
              >
                {username.slice(0, 2)}
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Welcome back,</p>
                <p className="text-sm font-bold font-heading">{username}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--card-border)',
                color: 'var(--text-muted)',
              }}
            >
              Logout
            </button>
          </nav>

          {/* BRAND HEADER */}
          <div className="text-center mb-10">
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Habit Tracker
            </h1>
            <p className="text-sm mt-2 font-medium" style={{ color: 'var(--text-muted)' }}>
              Track your daily habits. Build consistency. Stay disciplined.
            </p>
          </div>

          {/* HERO / PROGRESS CARD */}
          <div className="glass-card relative rounded-4xl overflow-hidden mb-8"
            style={{ minHeight: 200 }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none">
              <Image
                src="/habit.png"
                alt=""
                fill
                className="object-cover object-left opacity-40"
                priority
              />
              <div className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, var(--card-bg) 0%, transparent 70%)',
                }}
              />
            </div>

            <div className="relative z-10 p-8 sm:p-10">
              <p className="text-[10px] uppercase tracking-[0.3em] mb-3 font-heading" style={{ color: 'var(--text-muted)' }}>
                Today’s Progress
              </p>

              <h2 className="text-3xl font-bold mb-4 font-heading">
                {completedToday}/{totalHabits} <span className="text-lg font-normal opacity-60">habits done</span>
              </h2>

              <div className="w-full max-w-md h-2.5 rounded-full overflow-hidden bg-white/5">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${progressPct}%`,
                    background: 'linear-gradient(90deg, var(--accent-blue), #00ff9d)',
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>

              <p className="text-xs mt-3 font-medium" style={{ color: 'var(--accent-blue)' }}>
                {progressPct}% completion rate
              </p>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total', val: totalHabits, color: 'var(--foreground)' },
              { label: 'Done', val: completedToday, color: '#00ff9d' },
              { label: 'Best', val: `${bestStreak}d`, color: 'var(--accent-purple)' },
            ].map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-2xl p-5"
              >
                <p className="text-[10px] uppercase tracking-widest mb-1 font-heading" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                <p className="text-2xl font-bold font-heading" style={{ color: s.color }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* CREATE ACTION */}
          <button
            data-testid="create-habit-button"
            onClick={() => setIsCreating(true)}
            className="w-full mb-10 rounded-2xl py-4 font-bold text-sm uppercase tracking-widest transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,210,255,0.15), rgba(79,70,229,0.15))',
              border: '1px solid var(--accent-blue)',
              color: 'var(--accent-blue)',
            }}
          >
            + Create New Habit
          </button>

          {/* FORM MODAL-LIKE OVERLAY */}
          {(isCreating || editingHabit) && (
            <div className="mb-10">
              <HabitForm
                initialData={editingHabit || undefined}
                onSave={editingHabit ? handleUpdate : handleCreate}
                onCancel={() => {
                  setIsCreating(false);
                  setEditingHabit(null);
                }}
              />
            </div>
          )}

          {/* HABITS SECTION */}
          <div
            data-testid="habits-section-header"
            className="mb-6 text-[10px] uppercase tracking-[0.25em] font-bold"
            style={{ color: 'var(--text-muted)' }}
          >
            My Habits
          </div>

          <div className="flex flex-col gap-5">
            <HabitList
              habits={habits}
              onToggle={handleToggle}
              onEdit={setEditingHabit}
              onDelete={handleDelete}
              onCreate={() => setIsCreating(true)}
            />
          </div>

        </div>
      </main>
    </ProtectedRoute>
  );
}
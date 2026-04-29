'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Session } from '@/types/auth';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem('habit-tracker-users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      const session: Session = { userId: user.id, email: user.email };
      localStorage.setItem('habit-tracker-session', JSON.stringify(session));
      router.push('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-background overflow-hidden">


      {/* LEFT SIDE: The Pitch */}
      {/* 1. We keep this relative to manage the layers */}
      <div className="hidden md:flex w-[50%] relative flex-col justify-between p-12 lg:p-20 overflow-hidden border-r border-white/5 bg-background">

        {/* Layered Ambient Glows - Increased Z-index to z-20 to sit on top of everything */}
        <div className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] bg-accent-blue/10 blur-[140px] rounded-full animate-pulse z-20" />
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/10 blur-[120px] rounded-full z-20" />

        {/* 1. Branding Header - relative and z-30 to stay on top */}
        <div className="flex items-center justify-between relative z-30">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-linear-to-tr from-accent-blue to-accent-purple rotate-45" />
            <span className="text-lg font-black font-heading tracking-tighter uppercase">Habit.Tracker</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
            <span className="hover:text-accent-blue cursor-pointer transition-colors">Habits</span>
            <span className="hover:text-accent-blue cursor-pointer transition-colors">Analytics</span>
          </div>
        </div>

        {/* 2. Primary Pitch Content - relative and z-30 */}
        <div className="relative z-30 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-accent-blue uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
              </span>
              Habit Engine Active
            </div>

            <h1 className="lg:text-6xl font-bold font-heading leading-[0.95] tracking-tight">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-blue via-accent-purple to-accent-blue bg-size-[200%_auto] animate-gradient-flow">
                Daily Routine.
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-sm font-medium leading-relaxed">
              Beyond simple tracking. Build unbreakable consistency through precision data and streak architecture.
            </p>
          </div>

          {/* 3. Feature/Attraction Grid - relative and z-30 */}
          <div className="grid grid-cols-2 gap-6 pt-6 relative z-30">
            <div className="glass-card p-5 rounded-2xl border border-white/5 shadow-2xl">
              <div className="text-accent-blue mb-2 text-xl font-black italic">01.</div>
              <h4 className="text-sm font-bold mb-1">Streak Momentum</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Advanced algorithms to track and protect your daily progress streaks.</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 shadow-2xl">
              <div className="text-accent-purple mb-2 text-xl font-black italic">02.</div>
              <h4 className="text-sm font-bold mb-1">Visual Progress</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Detailed statistical mapping of your personal habit evolution over time.</p>
            </div>
          </div>
        </div>


        <div className="absolute top-130 inset-0 z-10 flex items-center justify-center p-10 pointer-events-none overflow-hidden">
          <Image
            src="/habit.png"
            alt='illustration'
            width={700} // Increased width for better background presence
            height={300}
            className="object-contain opacity-50 filter grayscale" // Subtle styling to integrate better
            priority
          />
        </div>

        {/* NEW 5. Footer Content (Optional space for social proof or copyright) */}
        <div className="relative z-30 text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-12">
          mmesomaonuegbu
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-10">
        <div className="glass-card w-full max-w-md p-8 md:p-10 rounded-3xl relative overflow-hidden">

          {/* glow */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue/10 blur-3xl rounded-full" />

          <h2 className="text-3xl font-bold mb-2">Login to your account</h2>
          <div className="text-sm text-slate-400 mb-6">
            Doesn&apos;t have account yet? <Link href="/signup" className="text-accent-blue cursor-pointer">Sign Up</Link>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                {error}
              </div>
            )}

            <div>
              <label  className="text-xs text-slate-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent-blue outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent-blue outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent-blue text-black font-bold hover:opacity-90 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
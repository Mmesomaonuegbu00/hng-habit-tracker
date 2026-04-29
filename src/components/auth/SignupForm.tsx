'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Session } from '@/types/auth';
import Image from 'next/image';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = JSON.parse(localStorage.getItem('habit-tracker-users') || '[]');
    
    if (users.find((u) => u.email === email)) {
      setError('User already exists');
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    const newSession: Session = { userId: newUser.id, email: newUser.email };
    
    localStorage.setItem('habit-tracker-users', JSON.stringify([...users, newUser]));
    localStorage.setItem('habit-tracker-session', JSON.stringify(newSession));
    
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex bg-background overflow-hidden">

      {/* LEFT SIDE: The Pitch */}
      <div className="hidden md:flex w-[50%] relative flex-col justify-between p-12 lg:p-20 overflow-hidden border-r border-white/5 bg-background">
        
        {/* Layered Ambient Glows */}
        <div className="absolute top-[-15%] left-[-15%] w-[70%] h-[70%] bg-accent-blue/10 blur-[140px] rounded-full animate-pulse z-20" />
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/10 blur-[120px] rounded-full z-20" />

        {/* Branding Header */}
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

        {/* Primary Pitch Content */}
        <div className="relative z-30 space-y-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-accent-blue uppercase tracking-[0.2em]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
              </span>
              Habit Engine Active
            </div>

            <h1 className="lg:text-6xl font-bold font-heading leading-[0.95] tracking-tight text-white">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-accent-blue via-accent-purple to-accent-blue bg-size-[200%_auto] animate-gradient-flow">
                Daily Routine.
              </span>
            </h1>

            <p className="text-slate-400 text-lg max-w-sm font-medium leading-relaxed">
              Beyond simple tracking. Build unbreakable consistency through precision data and streak architecture.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 gap-6 pt-6 relative z-30">
            <div className="glass-card p-5 rounded-2xl border border-white/5 shadow-2xl">
              <div className="text-accent-blue mb-2 text-xl font-black italic">01.</div>
              <h4 className="text-sm font-bold mb-1 text-white">Streak Momentum</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Advanced algorithms to track and protect your daily progress streaks.</p>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/5 shadow-2xl">
              <div className="text-accent-purple mb-2 text-xl font-black italic">02.</div>
              <h4 className="text-sm font-bold mb-1 text-white">Visual Progress</h4>
              <p className="text-[10px] text-slate-500 leading-tight">Detailed statistical mapping of your personal habit evolution over time.</p>
            </div>
          </div>
        </div>

        {/* Background Image Layer */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-10 pointer-events-none overflow-hidden">
          <div className="mt-40 opacity-50 filter grayscale">
            <Image
              src="/habit.png"
              alt='illustration'
              width={700}
              height={300}
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="relative z-30 text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-12">
          mmesomaonuegbu
        </div>
      </div>

      {/* RIGHT SIDE: Signup Form */}
      <div className="w-full md:w-[45%] flex items-center justify-center p-6 md:p-10">
        <div className="glass-card w-full max-w-md p-8 md:p-10 rounded-3xl relative overflow-hidden">
          
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue/10 blur-3xl rounded-full" />

          <h2 className="text-3xl font-bold mb-2 text-white font-heading">Start your journey</h2>
          <p className="text-sm text-slate-400 mb-6">
            Already have an account? <a href="/login" className="text-accent-blue cursor-pointer font-bold hover:underline">Log in</a>
          </p>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl animate-shake">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Your Email</label>
              <input
                data-testid="auth-signup-email"
                type="email"
                value={email}
                placeholder="name@sync.com"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent-blue focus:bg-white/10 outline-none transition-all text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <input
                data-testid="auth-signup-password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-accent-blue focus:bg-white/10 outline-none transition-all text-white"
                required
              />
            </div>

            <button
              data-testid="auth-signup-submit"
              type="submit"
              className="w-full py-4 rounded-xl bg-accent-blue text-black font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] mt-4"
            >
              Initialize Profile
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-center text-slate-500 uppercase tracking-tighter">
            By initializing, you agree to the Habit.Sync protocol.
          </div>
        </div>
      </div>
    </div>
  );
}
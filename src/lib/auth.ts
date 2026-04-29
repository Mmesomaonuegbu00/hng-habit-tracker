import { User, Session } from '@/types/auth';

export function getSession(): Session | null {
  if (typeof window === 'undefined') return null;
  const session = localStorage.getItem('habit-tracker-session');
  return session ? JSON.parse(session) : null;
}

export function isAuthenticated(): boolean {
  return !!getSession();
}

export function clearSession(): void {
  localStorage.removeItem('habit-tracker-session');
}
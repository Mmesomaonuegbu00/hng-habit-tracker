import { User, Session } from '@/types/auth';
import { Habit } from '@/types/habit';

const KEYS = {
  USERS: 'habit-tracker-users',
  SESSION: 'habit-tracker-session',
  HABITS: 'habit-tracker-habits',
};

export const storage = {
  getUsers: (): User[] => 
    JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'),
  
  setUsers: (users: User[]) => 
    localStorage.setItem(KEYS.USERS, JSON.stringify(users)),

  getHabits: (): Habit[] => 
    JSON.parse(localStorage.getItem(KEYS.HABITS) || '[]'),

  setHabits: (habits: Habit[]) => 
    localStorage.setItem(KEYS.HABITS, JSON.stringify(habits)),

  getSession: (): Session | null => 
    JSON.parse(localStorage.getItem(KEYS.SESSION) || 'null'),

  setSession: (session: Session | null) => 
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session)),
};
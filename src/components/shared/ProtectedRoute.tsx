// src/components/auth/ProtectedRoute.tsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const sessionStr = localStorage.getItem('habit-tracker-session');
    
    if (!sessionStr || sessionStr === 'null') {
      router.replace('/login');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsChecking(false);
    }
  }, [router]);

  if (isChecking) return null; 

  return <>{children}</>;
}
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/shared/SplashScreen';

export default function RootPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      try {
        const session = localStorage.getItem('habit-tracker-session');
        // Check for both null and string "null"
        if (session && session !== 'null') {
          router.replace('/dashboard');
        } else {
          router.replace('/login');
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        router.replace('/login');
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [mounted, router]);

  return <SplashScreen />;
}
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import DashboardPage from '@/app/dashboard/page';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom/vitest';

// Mock the Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Authentication Flow', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(useRouter).mockReturnValue({ push: mockPush } as any);
    localStorage.clear();
  });

  it('redirects to login when no session is found', async () => {
    render(<DashboardPage />);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });

  it('renders dashboard when session is valid', async () => {
    localStorage.setItem('habit-tracker-session', JSON.stringify({ userId: '123', email: 'test@me.com' }));
    render(<DashboardPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    });
  });
});
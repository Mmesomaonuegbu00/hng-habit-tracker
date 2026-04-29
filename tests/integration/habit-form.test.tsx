import { render, screen, fireEvent } from '@testing-library/react';
import HabitForm from '@/components/habits/HabitForm';
import { vi, describe, it, expect } from 'vitest';

describe('Habit Form Logic', () => {
  it('validates input and submits the protocol data', () => {
    const onSave = vi.fn();
    render(<HabitForm onSave={onSave} onCancel={() => {}} />);

    const nameInput = screen.getByLabelText(/habit name/i);
    fireEvent.change(nameInput, { target: { value: 'Frontend Coding' } });

    const submitBtn = screen.getByRole('button', { name: /save|initialize/i });
    fireEvent.click(submitBtn);

    expect(onSave).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Frontend Coding'
    }));
  });
});
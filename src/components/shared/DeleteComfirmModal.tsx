'use client';

interface DeleteHabitModalProps {
  isOpen: boolean;
  habitName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteHabitModal({
  isOpen,
  habitName,
  onConfirm,
  onCancel,
}: DeleteHabitModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 border border-white/10"
        style={{ background: '#0f1923' }}
      >
        <h2 className="text-white text-lg font-bold mb-2">
          Delete Habit
        </h2>

        <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>
          Are you sure you want to delete <strong className="text-white">{habitName}</strong>?  
          This action cannot be undone.
        </p>

        <div className="flex gap-2">
          <button
            data-testid="confirm-delete-button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl font-bold"
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
            }}
          >
            Delete
          </button>

          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.7)',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
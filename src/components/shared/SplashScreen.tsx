export default function SplashScreen() {
  return (
    <div 
      data-testid="splash-screen"
      className="fixed inset-0 flex flex-col items-center justify-center b z-50"
    >
      <h1 className="text-4xl font-bold text-blue-600">Habit Tracker</h1>
      <p className="mt-2 text-gray-100 italic">Your daily discipline partner</p>
    </div>
  );
}
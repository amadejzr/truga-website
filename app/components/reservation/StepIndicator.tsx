type WizardStep = 1 | 2 | 3 | 4 | 5;

const stepLabels = ['Kovčki', 'Streha', 'Datum', 'Podatki', 'Pregled'];

interface StepIndicatorProps {
  currentStep: WizardStep;
  completedSteps: Set<number>;
}

export function StepIndicator({ currentStep, completedSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 px-4 py-4">
      {stepLabels.map((label, i) => {
        const step = (i + 1) as WizardStep;
        const isActive = step === currentStep;
        const isCompleted = completedSteps.has(step);
        const isLast = i === stepLabels.length - 1;

        return (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  isActive
                    ? 'bg-green-700 text-stone-50'
                    : isCompleted
                      ? 'bg-green-700/20 text-green-700 dark:bg-green-600/20 dark:text-green-400'
                      : 'bg-stone-200 text-stone-500 dark:bg-zinc-700 dark:text-zinc-400'
                }`}
              >
                {isCompleted && !isActive ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`hidden md:block text-xs mt-1.5 font-medium ${
                  isActive
                    ? 'text-green-700 dark:text-green-400'
                    : isCompleted
                      ? 'text-zinc-600 dark:text-stone-400'
                      : 'text-stone-400 dark:text-zinc-500'
                }`}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`w-6 md:w-8 h-0.5 mx-1 transition-colors ${
                  isCompleted
                    ? 'bg-green-700/30 dark:bg-green-600/30'
                    : 'bg-stone-200 dark:bg-zinc-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

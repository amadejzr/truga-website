import { Calendar } from '../Calendar';

interface StepDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (start: Date | null, end: Date | null) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function StepDatePicker({ startDate, endDate, onDateSelect }: StepDatePickerProps) {
  const days =
    startDate && endDate
      ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  return (
    <div className="p-6">
      <p className="text-zinc-600 dark:text-stone-400 mb-6 text-center">
        Izberite datum prevzema in vrnitve.
      </p>

      <Calendar onDateSelect={onDateSelect} />

      {/* Selected dates summary */}
      {startDate && (
        <div className="mt-6 bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-zinc-500 dark:text-stone-500">Prevzem: </span>
              <span className="font-semibold text-zinc-900 dark:text-stone-50">{formatDate(startDate)}</span>
            </div>
            {endDate && (
              <div>
                <span className="text-zinc-500 dark:text-stone-500">Vrnitev: </span>
                <span className="font-semibold text-zinc-900 dark:text-stone-50">{formatDate(endDate)}</span>
              </div>
            )}
          </div>
          {days > 0 && (
            <p className="text-center mt-3 text-sm font-medium text-zinc-700 dark:text-stone-300">
              {days} {days === 1 ? 'dan' : days === 2 ? 'dneva' : days <= 4 ? 'dnevi' : 'dni'}
            </p>
          )}
        </div>
      )}

      {/* Discount info */}
      <div className="mt-4 flex flex-wrap gap-3 justify-center">
        <span className={`text-xs px-3 py-1.5 rounded-full ${days >= 3 && days < 7 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold' : 'bg-stone-100 dark:bg-zinc-800 text-zinc-500 dark:text-stone-500'}`}>
          3+ dni: 10% popust
        </span>
        <span className={`text-xs px-3 py-1.5 rounded-full ${days >= 7 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold' : 'bg-stone-100 dark:bg-zinc-800 text-zinc-500 dark:text-stone-500'}`}>
          7+ dni: 15% popust
        </span>
      </div>
    </div>
  );
}

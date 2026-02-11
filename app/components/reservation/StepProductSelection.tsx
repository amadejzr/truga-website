import Image from 'next/image';
import { roofBoxes } from '../../data/products';

interface StepProductSelectionProps {
  selectedBoxId: number | null;
  onSelectBox: (boxId: number | null) => void;
}

export function StepProductSelection({
  selectedBoxId,
  onSelectBox,
}: StepProductSelectionProps) {
  return (
    <div className="p-6">
      <p className="text-zinc-600 dark:text-stone-400 text-center mb-6">
        Izberite strešni kovček za nadaljevanje.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roofBoxes.map((box) => {
          const isSelected = selectedBoxId === box.id;
          return (
            <button
              key={box.id}
              type="button"
              onClick={() => onSelectBox(isSelected ? null : box.id)}
              className={`relative text-left rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isSelected
                  ? 'border-green-700 dark:border-green-500 ring-1 ring-green-700/20 shadow-lg'
                  : 'border-stone-200 dark:border-zinc-700 hover:border-stone-300 dark:hover:border-zinc-600 shadow-sm hover:shadow-md'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="relative h-32 bg-stone-100 dark:bg-zinc-800">
                <Image src={box.image} alt={box.title} fill className="object-cover object-top" unoptimized />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-zinc-900 dark:text-stone-50">{box.title}</h3>
                  <span className="text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-0.5 rounded-full">
                    {box.size}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-stone-500 mb-2">{box.capacity}</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-stone-50">
                  {box.pricePerDay}€<span className="text-sm font-normal text-zinc-500 dark:text-stone-500">/dan</span>
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

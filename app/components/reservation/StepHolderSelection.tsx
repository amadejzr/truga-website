'use client';

import { useState } from 'react';
import type { RoofTypeChoice } from '../../data/products';

const ROOF_TYPE_OPTIONS: {
  id: RoofTypeChoice;
  label: string;
  description: string;
  image: string;
}[] = [
  {
    id: 'raised-rails',
    label: 'Vzdolžni nosilci (dvignjeni)',
    description: 'Dvignjene strešne letve z vidnim razmikom od strehe.',
    image: 'https://placehold.co/400x240/3d6b1f/f5f5f0?text=Dvignjeni+nosilci&font=montserrat',
  },
  {
    id: 'flush-rails',
    label: 'Vzdolžni nosilci (poravnani)',
    description: 'Poravnane strešne letve, ki so v ravnini s streho.',
    image: 'https://placehold.co/400x240/2d5016/f5f5f0?text=Poravnani+nosilci&font=montserrat',
  },
  {
    id: 'fixed-points',
    label: 'Fiksne točke',
    description: 'Vnaprej določene pritrdilne točke na strehi vozila.',
    image: 'https://placehold.co/400x240/4a7c2a/f5f5f0?text=Fiksne+tocke&font=montserrat',
  },
  {
    id: 'naked-roof',
    label: 'Gola streha',
    description: 'Streha brez kakršnihkoli nosilcev ali točk.',
    image: 'https://placehold.co/400x240/5a8c3a/f5f5f0?text=Gola+streha&font=montserrat',
  },
  {
    id: 'have-own',
    label: 'Že imam nosilce',
    description: 'Že imam prečne nosilce nameščene na vozilu.',
    image: 'https://placehold.co/400x240/6b6b6b/f5f5f0?text=Imam+nosilce&font=montserrat',
  },
  {
    id: 'unsure',
    label: 'Ne vem',
    description: 'Ne vem kakšen tip strehe ima moje vozilo.',
    image: 'https://placehold.co/400x240/b08d3e/f5f5f0?text=Ne+vem&font=montserrat',
  },
];

interface StepHolderSelectionProps {
  roofType: RoofTypeChoice | null;
  onSelect: (roofType: RoofTypeChoice) => void;
}

export function StepHolderSelection({ roofType, onSelect }: StepHolderSelectionProps) {
  const [tooltipId, setTooltipId] = useState<RoofTypeChoice | null>(null);

  return (
    <div className="p-6">
      <p className="text-zinc-600 dark:text-stone-400 text-center mb-8">
        Kakšen tip strehe ima vaše vozilo?
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
        {ROOF_TYPE_OPTIONS.map((option) => {
          const isSelected = roofType === option.id;

          return (
            <div key={option.id} className="relative">
              <button
                type="button"
                onClick={() => onSelect(option.id)}
                className={`w-full rounded-2xl border-2 overflow-hidden transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-green-700 dark:border-green-500 ring-1 ring-green-700/20 shadow-lg'
                    : 'border-stone-200 dark:border-zinc-700 hover:border-stone-300 dark:hover:border-zinc-600 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[5/3] bg-stone-200 dark:bg-zinc-700">
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Label */}
                <div className="px-3 py-2.5 flex items-center justify-between gap-1">
                  <span className={`text-sm font-semibold leading-tight ${isSelected ? 'text-green-700 dark:text-green-400' : 'text-zinc-900 dark:text-stone-50'}`}>
                    {option.label}
                  </span>
                </div>
              </button>

              {/* Info icon */}
              <div
                className="absolute top-2 left-2 z-10"
                onMouseEnter={() => setTooltipId(option.id)}
                onMouseLeave={() => setTooltipId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setTooltipId(tooltipId === option.id ? null : option.id);
                }}
              >
                <div className="w-6 h-6 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center cursor-help">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                {/* Tooltip */}
                {tooltipId === option.id && (
                  <div className="absolute top-8 left-0 w-52 bg-zinc-900 dark:bg-zinc-800 text-stone-50 text-xs rounded-xl px-3 py-2 shadow-xl z-20">
                    {option.description}
                    <div className="absolute -top-1 left-3 w-2 h-2 bg-zinc-900 dark:bg-zinc-800 rotate-45" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

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
    id: 'naked-roof',
    label: 'Navadna streha',
    description: 'Streha brez česar koli na vrhu — brez letev, brez fiksnih točk, brez pokrovov. Popolnoma gladka streha.',
    image: '/normal_roof.png',
  },
  {
    id: 'flush-rails',
    label: 'Poravnane letve',
    description: 'Vidne letve vzdolž strehe, poravnane s streho. Pod letvijo NI mogoče potisniti roke — ni reže med letvijo in streho.',
    image: '/flush_rails.png',
  },
  {
    id: 'raised-rails',
    label: 'Dvignjene letve',
    description: 'Vidne letve vzdolž strehe z razmakom od strehe. Pod letvijo je mogoče potisniti roko in jo prijeti.',
    image: '/roof_railing.png',
  },
  {
    id: 'fixed-points',
    label: 'Fiksne točke',
    description: 'Pritrdilne točke na strehi, običajno nad vsakimi vrati. Včasih so skrite pod snemljivim pokrovom ali letvico.',
    image: '/fixed_points.png',
  },
  {
    id: 'unsure',
    label: 'Ne vem',
    description: 'Niste prepričani? Ni problema — pošljite nam fotografijo strehe vašega vozila in vam svetujemo.',
    image: '/normal_roof.png',
  },
  {
    id: 'other',
    label: 'Drugo',
    description: 'Imate že svoje nosilce ali pa niste našli ustrezne možnosti? Opišite svojo situacijo.',
    image: '/normal_roof.png',
  },
];

interface StepHolderSelectionProps {
  roofType: RoofTypeChoice | null;
  onSelect: (roofType: RoofTypeChoice) => void;
  roofTypeOther: string;
  onOtherTextChange: (text: string) => void;
}

export function StepHolderSelection({ roofType, onSelect, roofTypeOther, onOtherTextChange }: StepHolderSelectionProps) {
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
                  {option.id === 'unsure' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">?</span>
                    </div>
                  )}
                  {option.id === 'other' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                  )}
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

      {roofType === 'other' && (
        <div className="max-w-xl mx-auto mt-4">
          <textarea
            value={roofTypeOther}
            onChange={(e) => onOtherTextChange(e.target.value)}
            placeholder="Opišite vašo streho ali situacijo..."
            rows={3}
            className="w-full rounded-2xl border-2 border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-900 dark:text-stone-50 px-4 py-3 text-sm focus:outline-none focus:border-green-700 dark:focus:border-green-500 focus:ring-1 focus:ring-green-700/20 transition-all resize-none placeholder:text-zinc-400 dark:placeholder:text-stone-500"
          />
        </div>
      )}
    </div>
  );
}

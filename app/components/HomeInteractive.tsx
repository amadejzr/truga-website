'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { MemoizedProductComparisonGrid } from './ProductComparisonGrid';

const ReservationModal = dynamic(() =>
  import('./ReservationModal').then(mod => ({ default: mod.ReservationModal })),
  { ssr: false }
);

interface PreSelection {
  boxId?: number;
}

export function HomeInteractive() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [preSelection, setPreSelection] = useState<PreSelection | undefined>(undefined);

  const openReservation = useCallback((selection?: PreSelection) => {
    setPreSelection(selection);
    setIsReservationOpen(true);
  }, []);

  const closeReservation = useCallback(() => {
    setIsReservationOpen(false);
  }, []);

  return (
    <>
      {/* Products Section */}
      <section id="products" className="container mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">Naša ponudba</p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
            Kateri Izdelek Je Pravi za Vas?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-stone-400 max-w-2xl mx-auto">
            Družinski dopust, smučarski vikend ali selitev — izberite velikost, mi pomagamo pri izbiri.
          </p>
        </div>

        <MemoizedProductComparisonGrid onReservationClick={(boxId) => openReservation({ boxId })} />
      </section>

      {isReservationOpen && (
        <ReservationModal
          isOpen={isReservationOpen}
          onClose={closeReservation}
          preSelection={preSelection}
        />
      )}
    </>
  );
}

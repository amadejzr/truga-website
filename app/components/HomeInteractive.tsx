'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ProductComparisonGrid } from './ProductComparisonGrid';

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

        <ProductComparisonGrid onReservationClick={(boxId) => openReservation({ boxId })} />

        {/* Compact Holder Banner */}
        <div className="mt-12 bg-stone-100/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-stone-200/50 dark:border-zinc-700/50 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-stone-50 mb-1">
                Potrebujete tudi prečne nosilce?
              </h3>
              <p className="text-sm text-zinc-600 dark:text-stone-400">
                Univerzalni in specifični modeli od 5€/dan. Izberete jih med rezervacijo.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => openReservation()}
                className="bg-green-700 hover:bg-green-800 text-stone-50 font-bold py-2.5 px-6 rounded-xl text-sm transition-colors shadow-lg"
              >
                Rezerviraj Nosilce
              </button>
              <Link
                href="/products"
                className="bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300 dark:hover:bg-zinc-600 text-zinc-700 dark:text-stone-300 font-medium py-2.5 px-6 rounded-xl text-sm transition-colors"
              >
                Vsi Izdelki
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — compact strip */}
      <section id="how-it-works" className="container mx-auto px-4 pb-16 scroll-mt-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-700/10 dark:bg-green-600/20 flex items-center justify-center shrink-0">
              <span className="text-green-700 dark:text-green-400 font-bold text-sm">1</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-stone-50">Izberite & Rezervirajte</span>
          </div>
          <div className="hidden sm:block w-8 h-px bg-stone-300 dark:bg-zinc-600" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-600/10 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
              <span className="text-amber-700 dark:text-amber-400 font-bold text-sm">2</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-stone-50">Prevzemite & Namestite</span>
          </div>
          <div className="hidden sm:block w-8 h-px bg-stone-300 dark:bg-zinc-600" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center shrink-0">
              <span className="text-zinc-700 dark:text-stone-300 font-bold text-sm">3</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-stone-50">Uživajte & Vrnite</span>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-zinc-600 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Varščina se vrne ob vrnitvi</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Brezplačna odpoved do 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Popusti za 7+ dni</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-green-900 dark:from-zinc-900 dark:via-black dark:to-green-950 rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-50 mb-6">
              Pripravljeni na Pot?
            </h2>
            <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Rezervacija traja 2 minuti. Brezplačna odpoved do 24 ur pred prevzemom.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openReservation()}
                className="bg-green-700 text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-green-800 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Začnite z Rezervacijo
              </button>
              <Link
                href="/contact"
                className="bg-stone-100/10 backdrop-blur-sm text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-stone-100/20 transition-all duration-200 border-2 border-stone-200/30 inline-block"
              >
                Potrebujete Pomoč pri Izbiri?
              </Link>
            </div>
          </div>
        </div>
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

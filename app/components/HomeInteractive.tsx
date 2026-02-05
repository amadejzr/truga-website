'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { RoofBoxCarousel } from './RoofBoxCarousel';

const ReservationModal = dynamic(() =>
  import('./ReservationModal').then(mod => ({ default: mod.ReservationModal })),
  { ssr: false }
);

export function HomeInteractive() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [selectedBox, setSelectedBox] = useState({ title: 'Strešni Kovček', price: 20 });

  const openReservation = useCallback((title: string = 'Strešni Kovček', price: number = 20) => {
    setSelectedBox({ title, price });
    setIsReservationOpen(true);
  }, []);

  const closeReservation = useCallback(() => {
    setIsReservationOpen(false);
  }, []);

  return (
    <>
      {/* Carousel Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
            Izberite Pravo Velikost
          </h2>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-stone-300 max-w-2xl mx-auto">
            Vse velikosti so na voljo in pripravljene za vašo naslednjo avanturo
          </p>
        </div>

        <RoofBoxCarousel onReservationClick={openReservation} />
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden bg-gradient-to-br from-zinc-800 via-zinc-900 to-green-900 dark:from-zinc-900 dark:via-black dark:to-green-950 rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-stone-50 mb-6">
              Pripravljeni na Pustolovščino?
            </h2>
            <p className="text-xl text-stone-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              Rezervirajte strešni kovček še danes in izkoristite posebne popuste za dolgoročni najem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openReservation()}
                className="bg-green-700 text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-green-800 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Rezerviraj Zdaj
              </button>
              <button className="bg-stone-100/10 backdrop-blur-sm text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-stone-100/20 transition-all duration-200 border-2 border-stone-200/30">
                Kontaktirajte Nas
              </button>
            </div>
          </div>
        </div>
      </section>

      {isReservationOpen && (
        <ReservationModal
          isOpen={isReservationOpen}
          onClose={closeReservation}
          roofBoxTitle={selectedBox.title}
          pricePerDay={selectedBox.price}
        />
      )}
    </>
  );
}

'use client';

import { useState, memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { roofBoxes } from '../data/products';

interface RoofBoxCarouselProps {
  onReservationClick?: (title: string, price: number) => void;
}

export const RoofBoxCarousel = memo(function RoofBoxCarousel({ onReservationClick }: RoofBoxCarouselProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? roofBoxes.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === roofBoxes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="relative">
        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-[2rem] bg-stone-50 dark:bg-zinc-800 shadow-2xl border border-stone-200/50 dark:border-zinc-700/50">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {roofBoxes.map((box) => (
              <div key={box.id} className="min-w-full">
                <div className="flex flex-col md:flex-row">
                  {/* Image Section */}
                  <div className="w-full md:w-3/5 relative h-80 md:h-[500px] bg-gradient-to-br from-stone-200 to-stone-300 dark:from-zinc-700 dark:to-zinc-800">
                    <Image
                      src={box.image}
                      alt={box.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-green-700 text-stone-50 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                        Na voljo
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-stone-50 to-stone-100 dark:from-zinc-800 dark:to-zinc-900">
                    <div className="mb-6">
                      <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        {box.size}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-stone-50 mb-3 leading-tight">
                        {box.title}
                      </h3>
                      <p className="text-lg text-zinc-700 dark:text-stone-300 mb-6">
                        {box.capacity}
                      </p>
                    </div>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl font-bold text-zinc-900 dark:text-stone-50">
                          {box.price.split(' ')[0]}
                        </span>
                        <span className="text-lg text-zinc-700 dark:text-stone-300">
                          / dan
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 dark:text-stone-400">
                        Popusti za daljši najem
                      </p>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => onReservationClick?.(box.title, box.pricePerDay)}
                        className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-stone-50 font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                      >
                        Rezerviraj Zdaj
                      </button>
                      <Link
                        href={`/products/${box.slug}`}
                        className="block w-full text-center bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300 dark:hover:bg-zinc-600 text-zinc-900 dark:text-stone-50 font-semibold py-4 px-8 rounded-2xl transition-all duration-200"
                      >
                        Več Informacij
                      </Link>
                    </div>

                    {/* Features list */}
                    <div className="mt-6 pt-6 border-t border-stone-200 dark:border-zinc-700 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-stone-300">
                        <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Enostavna montaža
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-stone-300">
                        <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Zavarovanje vključeno
                      </div>
                      <div className="flex items-center gap-2 text-sm text-zinc-700 dark:text-stone-300">
                        <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        24/7 podpora
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-stone-50/95 dark:bg-zinc-800/95 hover:bg-stone-100 dark:hover:bg-zinc-700 rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 border border-stone-200 dark:border-zinc-700"
            aria-label="Prejšnji"
          >
            <svg className="w-6 h-6 text-zinc-900 dark:text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-stone-50/95 dark:bg-zinc-800/95 hover:bg-stone-100 dark:hover:bg-zinc-700 rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-110 border border-stone-200 dark:border-zinc-700"
            aria-label="Naslednji"
          >
            <svg className="w-6 h-6 text-zinc-900 dark:text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1 mt-8">
          {roofBoxes.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="p-3 group"
              aria-label={`Pojdi na sliko ${index + 1}`}
            >
              <span
                className={`block h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-10 bg-green-700 dark:bg-green-600'
                    : 'w-2.5 bg-stone-300 dark:bg-zinc-600 group-hover:bg-stone-400 dark:group-hover:bg-zinc-500'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});

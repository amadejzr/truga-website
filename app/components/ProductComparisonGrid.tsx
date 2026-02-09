'use client';

import Image from 'next/image';
import Link from 'next/link';
import { roofBoxes } from '../data/products';

interface ProductComparisonGridProps {
  onReservationClick: (boxId: number) => void;
}

export function ProductComparisonGrid({ onReservationClick }: ProductComparisonGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {roofBoxes.map((box) => (
        <div
          key={box.id}
          className={`group relative flex flex-col bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
            box.isPopular
              ? 'border-2 border-green-600 dark:border-green-500 ring-2 ring-green-600/20 dark:ring-green-500/20'
              : 'border border-stone-200/50 dark:border-zinc-700/50'
          }`}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={box.image}
              alt={box.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />
            {box.isPopular && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-green-700 text-stone-50 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Najpopularnejši
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-5">
            <span className="inline-block self-start bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              {box.size}
            </span>

            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-1">
              {box.title}
            </h3>

            <p className="text-sm text-zinc-600 dark:text-stone-400 mb-4 flex-1">
              {box.capacity}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-bold text-zinc-900 dark:text-stone-50">
                {box.pricePerDay}€
              </span>
              <span className="text-sm text-zinc-500 dark:text-stone-500"> / dan</span>
            </div>

            <div className="space-y-2.5 mt-auto">
              <button
                onClick={() => onReservationClick(box.id)}
                className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 text-stone-50 font-bold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
              >
                Rezerviraj
              </button>
              <Link
                href={`/products/${box.slug}`}
                className="block w-full text-center text-sm font-semibold text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 py-2 transition-colors"
              >
                Več Informacij
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

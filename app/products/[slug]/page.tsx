'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { ReservationModal } from '../../components/ReservationModal';
import { getRoofBoxBySlug, roofBoxes } from '../../data/products';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getRoofBoxBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
            Izdelek ni bil najden
          </h1>
          <p className="text-zinc-600 dark:text-stone-400 mb-8">
            Izdelek, ki ga iščete, ne obstaja.
          </p>
          <Link
            href="/"
            className="inline-block bg-green-700 text-stone-50 font-bold py-3 px-8 rounded-xl hover:bg-green-800 transition-colors"
          >
            Nazaj na domačo stran
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-stone-500">
          <Link href="/" className="hover:text-zinc-700 dark:hover:text-stone-300 transition-colors">
            Domov
          </Link>
          <span>/</span>
          <Link href="/#products" className="hover:text-zinc-700 dark:hover:text-stone-300 transition-colors">
            Izdelki
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-stone-50">{product.title}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-200 dark:bg-zinc-800 shadow-xl">
              <Image
                src={product.images[selectedImage]}
                alt={`${product.title} - Slika ${selectedImage + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute top-4 left-4">
                <span className="bg-green-700 text-stone-50 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Na voljo
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-green-700 ring-offset-2 dark:ring-offset-zinc-900'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} - Predogled ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.size}
                </span>
                <span className="text-zinc-500 dark:text-stone-500 text-sm">
                  {product.brand}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
                {product.title}
              </h1>
              <p className="text-lg text-zinc-600 dark:text-stone-400">
                {product.capacity}
              </p>
            </div>

            {/* Price */}
            <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-6">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-bold text-zinc-900 dark:text-stone-50">
                  {product.price.split(' ')[0]}
                </span>
                <span className="text-xl text-zinc-600 dark:text-stone-400">/ dan</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-stone-500">
                Popusti za najem 7+ dni
              </p>
            </div>

            {/* Description */}
            <p className="text-zinc-700 dark:text-stone-300 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="flex-1 bg-green-700 text-stone-50 font-bold py-4 px-8 rounded-2xl hover:bg-green-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Rezerviraj zdaj
              </button>
              <Link
                href="/contact"
                className="flex-1 text-center bg-stone-200 dark:bg-zinc-700 text-zinc-900 dark:text-stone-50 font-bold py-4 px-8 rounded-2xl hover:bg-stone-300 dark:hover:bg-zinc-600 transition-colors"
              >
                Vprašaj nas
              </Link>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-stone-50 dark:bg-zinc-800/50 rounded-xl p-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Teža</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.weight}</div>
              </div>
              <div className="bg-stone-50 dark:bg-zinc-800/50 rounded-xl p-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Maks. obremenitev</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.maxLoad}</div>
              </div>
              <div className="bg-stone-50 dark:bg-zinc-800/50 rounded-xl p-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Dimenzije</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.dimensions}</div>
              </div>
              <div className="bg-stone-50 dark:bg-zinc-800/50 rounded-xl p-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Odpiranje</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.opening}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Specifications */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Features */}
          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
              Značilnosti
            </h2>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-700 dark:text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-700 dark:text-stone-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What's Included */}
          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
              Vključeno v najem
            </h2>
            <ul className="space-y-4">
              {product.included.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-zinc-700 dark:text-stone-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Full Specifications */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
              Tehnične specifikacije
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Blagovna znamka</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.brand}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Prostornina</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.size}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Dimenzije</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.dimensions}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Teža</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.weight}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Maks. obremenitev</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.maxLoad}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Tip odpiranja</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.opening}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Ključavnica</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.lockType}</div>
              </div>
              <div className="border-b border-stone-200 dark:border-zinc-700 pb-4">
                <div className="text-sm text-zinc-500 dark:text-stone-500 mb-1">Barva</div>
                <div className="font-semibold text-zinc-900 dark:text-stone-50">{product.color}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="container mx-auto px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-stone-50 mb-8 text-center">
            Drugi strešni kovčki
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roofBoxes
              .filter((box) => box.id !== product.id)
              .slice(0, 3)
              .map((box) => (
                <Link
                  key={box.id}
                  href={`/products/${box.slug}`}
                  className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-stone-200/50 dark:border-zinc-700/50 hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={box.image}
                      alt={box.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-700 dark:text-green-500">
                        {box.size}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-stone-500">
                        {box.brand}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-stone-50 mb-1">
                      {box.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-stone-400 text-sm mb-3">
                      {box.capacity}
                    </p>
                    <div className="font-bold text-zinc-900 dark:text-stone-50">
                      {box.price}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        roofBoxTitle={product.title}
        pricePerDay={product.pricePerDay}
      />
    </div>
  );
}

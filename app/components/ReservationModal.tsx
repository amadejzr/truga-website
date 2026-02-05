'use client';

import { useState } from 'react';
import { Calendar } from './Calendar';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  roofBoxTitle?: string;
  pricePerDay?: number;
}

export function ReservationModal({
  isOpen,
  onClose,
  roofBoxTitle = 'Strešni Kovček',
  pricePerDay = 20
}: ReservationModalProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Sample unavailable dates (you can fetch these from your backend)
  const unavailableDates = [
    new Date(2026, 1, 10),
    new Date(2026, 1, 11),
    new Date(2026, 1, 12),
    new Date(2026, 1, 20),
  ];

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateTotal = () => {
    const days = calculateDays();
    if (days === 0) return 0;

    // Apply discounts for longer rentals
    let discount = 0;
    if (days >= 7) discount = 0.15; // 15% off for 7+ days
    else if (days >= 3) discount = 0.10; // 10% off for 3+ days

    const total = days * pricePerDay * (1 - discount);
    return total;
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return date.toLocaleDateString('sl-SI', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation submission
    console.log({ startDate, endDate, name, email, phone, total: calculateTotal() });
    alert('Rezervacija oddana! V kratkem vas bomo kontaktirali.');
    onClose();
  };

  if (!isOpen) return null;

  const days = calculateDays();
  const total = calculateTotal();
  const hasDiscount = days >= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-stone-50 dark:bg-zinc-900 rounded-[2rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-zinc-800 to-green-800 dark:from-zinc-900 dark:to-green-900 text-stone-50 p-6 rounded-t-[2rem] flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">Rezervacija</h2>
            <p className="text-stone-200">{roofBoxTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors"
            aria-label="Zapri"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Calendar */}
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
                  Izberite Datum
                </h3>
                <Calendar
                  onDateSelect={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                  unavailableDates={unavailableDates}
                />

                {/* Selected Dates Display */}
                <div className="mt-6 bg-white dark:bg-zinc-800 rounded-2xl p-6 border border-stone-200 dark:border-zinc-700">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-semibold text-zinc-600 dark:text-stone-400">
                        Začetek najema
                      </label>
                      <p className="text-lg font-bold text-zinc-900 dark:text-stone-50">
                        {formatDate(startDate)}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-zinc-600 dark:text-stone-400">
                        Konec najema
                      </label>
                      <p className="text-lg font-bold text-zinc-900 dark:text-stone-50">
                        {formatDate(endDate)}
                      </p>
                    </div>
                    {days > 0 && (
                      <div className="pt-3 border-t border-stone-200 dark:border-zinc-700">
                        <label className="text-sm font-semibold text-zinc-600 dark:text-stone-400">
                          Število dni
                        </label>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-500">
                          {days} {days === 1 ? 'dan' : days === 2 ? 'dneva' : 'dni'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Form & Summary */}
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
                  Vaši Podatki
                </h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-stone-200 mb-2">
                      Ime in Priimek *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                      placeholder="Janez Novak"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-stone-200 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                      placeholder="janez.novak@email.si"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-zinc-800 dark:text-stone-200 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-stone-300 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                      placeholder="+386 40 123 456"
                    />
                  </div>
                </div>

                {/* Price Summary */}
                <div className="bg-gradient-to-br from-green-50 to-amber-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl p-6 border-2 border-green-200 dark:border-zinc-700">
                  <h4 className="text-lg font-bold text-zinc-900 dark:text-stone-50 mb-4">
                    Pregled Rezervacije
                  </h4>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-700 dark:text-stone-300">Cena na dan</span>
                      <span className="font-semibold text-zinc-900 dark:text-stone-50">{pricePerDay}€</span>
                    </div>

                    {days > 0 && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-zinc-700 dark:text-stone-300">Število dni</span>
                          <span className="font-semibold text-zinc-900 dark:text-stone-50">{days}</span>
                        </div>

                        {hasDiscount && (
                          <div className="flex justify-between text-green-700 dark:text-green-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              Popust ({days >= 7 ? '15%' : '10%'})
                            </span>
                            <span className="font-semibold">
                              -{(days * pricePerDay * (days >= 7 ? 0.15 : 0.10)).toFixed(2)}€
                            </span>
                          </div>
                        )}

                        <div className="pt-3 border-t-2 border-green-200 dark:border-zinc-700 flex justify-between">
                          <span className="text-lg font-bold text-zinc-900 dark:text-stone-50">Skupaj</span>
                          <span className="text-2xl font-bold text-green-700 dark:text-green-500">
                            {total.toFixed(2)}€
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {days >= 3 && (
                    <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                      <p className="text-sm text-green-900 dark:text-green-300 font-semibold">
                        🎉 Prihranili boste {(days * pricePerDay * (days >= 7 ? 0.15 : 0.10)).toFixed(2)}€ z daljšim najemom!
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!startDate || !endDate || !name || !email || !phone}
                  className="mt-6 w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-800 hover:to-green-900 disabled:from-stone-300 disabled:to-stone-400 disabled:cursor-not-allowed text-stone-50 font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:hover:translate-y-0"
                >
                  {!startDate || !endDate ? 'Izberite Datum' : 'Potrdi Rezervacijo'}
                </button>

                <p className="mt-4 text-sm text-center text-zinc-600 dark:text-stone-400">
                  Po oddaji rezervacije vas bomo kontaktirali za potrditev in podrobnosti prevzema.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

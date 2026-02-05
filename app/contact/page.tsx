'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-600/10 dark:bg-amber-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-stone-50 mb-6 leading-tight">
              Kontakt
            </h1>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-stone-300 leading-relaxed">
              Imate vprašanje? Z veseljem vam pomagamo.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
              Pošljite nam sporočilo
            </h2>

            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-stone-50 mb-2">
                  Sporočilo poslano!
                </h3>
                <p className="text-zinc-600 dark:text-stone-400 mb-6">
                  Hvala za vaše sporočilo. Odgovorili vam bomo v najkrajšem možnem času.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-green-700 dark:text-green-400 font-medium hover:underline"
                >
                  Pošlji novo sporočilo
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-2">
                    Ime in priimek *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    placeholder="Janez Novak"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-2">
                    E-pošta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    placeholder="janez@email.si"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all"
                    placeholder="+386 41 123 456"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-2">
                    Sporočilo *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-stone-200 dark:border-zinc-700 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Kako vam lahko pomagamo?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-700 text-stone-50 font-bold py-4 px-8 rounded-xl hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Pošiljanje...' : 'Pošlji sporočilo'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
                Kontaktni podatki
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-700 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-stone-50 mb-1">Naslov</h3>
                    <p className="text-zinc-600 dark:text-stone-400">
                      Slovenska cesta 55<br />
                      1000 Ljubljana, Slovenija
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-700 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-stone-50 mb-1">Telefon</h3>
                    <p className="text-zinc-600 dark:text-stone-400">+386 41 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-zinc-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-stone-50 mb-1">E-pošta</h3>
                    <p className="text-zinc-600 dark:text-stone-400">info@truga.si</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
                Delovni čas
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-stone-400">Ponedeljek - Petek</span>
                  <span className="font-medium text-zinc-900 dark:text-stone-50">8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-stone-400">Sobota</span>
                  <span className="font-medium text-zinc-900 dark:text-stone-50">9:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-600 dark:text-stone-400">Nedelja</span>
                  <span className="font-medium text-zinc-900 dark:text-stone-50">Zaprto</span>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-stone-200 dark:bg-zinc-800 rounded-3xl h-64 flex items-center justify-center border border-stone-300 dark:border-zinc-700 overflow-hidden">
              <div className="text-center">
                <svg className="w-12 h-12 text-zinc-400 dark:text-zinc-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm">Ljubljana, Slovenija</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

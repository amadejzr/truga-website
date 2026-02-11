import Link from 'next/link';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomeInteractive } from './components/HomeInteractive';
import { Logo } from './components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      {/* Hero Section — Benefit-driven headline (StoryBrand: customer is the hero) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-600/10 dark:bg-amber-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-16">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-12 flex justify-center">
              <Logo size="lg" showText={false} />
            </div>

            {/* Headline: benefit, not description */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-stone-50 mb-6 leading-tight tracking-tight">
              Več Prostora za Vaše Pustolovščine
            </h1>

            <p className="text-xl md:text-2xl text-zinc-700 dark:text-stone-300 mb-4 max-w-3xl mx-auto leading-relaxed">
              Premium strešni kovčki Thule in Yakima za vsako potovanje.
            </p>
            <p className="text-lg md:text-xl text-green-700 dark:text-green-400 font-semibold mb-12 max-w-3xl mx-auto">
              Že od 15€/dan — enostavna rezervacija, montaža v 5 minutah, brez skrbi.
            </p>

            {/* Trust Badges — specific & credible (Cialdini: social proof + authority) */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-zinc-800 px-6 py-3 rounded-full shadow-md border border-stone-200 dark:border-zinc-700">
                <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-zinc-800 dark:text-stone-200">Brezplačna odpoved do 24h pred</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-zinc-800 px-6 py-3 rounded-full shadow-md border border-stone-200 dark:border-zinc-700">
                <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-zinc-800 dark:text-stone-200">Varščina se vrne ob vrnitvi</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-zinc-800 px-6 py-3 rounded-full shadow-md border border-stone-200 dark:border-zinc-700">
                <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-zinc-800 dark:text-stone-200">Premium Thule & Yakima oprema</span>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <a
                href="#products"
                className="bg-green-700 text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-green-800 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-center"
              >
                Poglejte Ponudbo
              </a>
              <a
                href="#how-it-works"
                className="bg-stone-100/80 dark:bg-zinc-800/80 backdrop-blur-sm text-zinc-900 dark:text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-stone-200 dark:hover:bg-zinc-700 transition-all duration-200 border border-stone-200 dark:border-zinc-700 text-center"
              >
                Kako Deluje?
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products + Modal (client, stateful) */}
      <HomeInteractive />

      {/* How It Works */}
      <section id="how-it-works" className="container mx-auto px-4 py-24 scroll-mt-20">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-3">Kako deluje</p>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-stone-50">
            4 Enostavni Koraki
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-green-700/10 dark:bg-green-600/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-green-700 dark:text-green-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span>KORAK 1</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-2">Izberite & Rezervirajte</h3>
            <p className="text-sm text-zinc-600 dark:text-stone-400 leading-relaxed">
              Izberite kovček, določite datume in pošljite povpraševanje. Traja manj kot 2 minuti.
            </p>
            {/* Connector arrow (visible on lg+) */}
            <div className="hidden lg:block absolute top-8 -right-4 translate-x-1/2">
              <svg className="w-8 h-8 text-stone-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-600/10 dark:bg-amber-500/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-amber-700 dark:text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m0 0V4.5m0 5.25H9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span>KORAK 2</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-2">Potrditev & Plačilo</h3>
            <p className="text-sm text-zinc-600 dark:text-stone-400 leading-relaxed">
              Pregledamo vaše potrebe, potrdimo razpoložljivost in pošljemo račun (TRR ali Flik).
            </p>
            {/* Connector arrow (visible on lg+) */}
            <div className="hidden lg:block absolute top-8 -right-4 translate-x-1/2">
              <svg className="w-8 h-8 text-stone-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-blue-700 dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span>KORAK 3</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-2">Prevzem & Montaža</h3>
            <p className="text-sm text-zinc-600 dark:text-stone-400 leading-relaxed">
              Pridete po kovček, skupaj ga namestimo na vaše vozilo.
            </p>
            {/* Connector arrow (visible on lg+) */}
            <div className="hidden lg:block absolute top-8 -right-4 translate-x-1/2">
              <svg className="w-8 h-8 text-stone-300 dark:text-zinc-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-700/50 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-zinc-700 dark:text-stone-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
            <div className="inline-flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-700/50 text-zinc-700 dark:text-stone-300 px-3 py-1 rounded-full text-xs font-bold mb-3">
              <span>KORAK 4</span>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-2">Uživajte & Vrnite</h3>
            <p className="text-sm text-zinc-600 dark:text-stone-400 leading-relaxed">
              Potujte brezskrbno z dodatnim prostorom. Ob vrnitvi prejmete varščino nazaj.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Strip (server-rendered, no JS) */}
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

      {/* CTA Section (server-rendered, no JS) */}
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
              <a
                href="#products"
                className="bg-green-700 text-stone-50 font-bold py-4 px-10 rounded-2xl text-lg hover:bg-green-800 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
              >
                Začnite z Rezervacijo
              </a>
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

      <Footer />
    </div>
  );
}

import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { HomeInteractive } from './components/HomeInteractive';
import { Logo } from './components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 via-amber-50/20 to-stone-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Navigation />

      {/* Hero Section - Static Content (Server Rendered) */}
      <section className="relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-600/10 dark:bg-green-600/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-amber-600/10 dark:bg-amber-600/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-32 pb-16">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo/Brand */}
            <div className="mb-12 flex justify-center">
              <Logo size="lg" showText={false} />
            </div>

            {/* Main Heading */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-stone-50 mb-6 leading-tight tracking-tight">
              Najem Strešnih Kovčkov
            </h2>

            <p className="text-xl md:text-2xl text-zinc-700 dark:text-stone-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Zanesljivi in kakovostni strešni kovčki za vaša potovanja. Enostavna rezervacija in ugodne cene.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 mb-16">
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-zinc-800 px-6 py-3 rounded-full shadow-md border border-stone-200 dark:border-zinc-700">
                <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-semibold text-zinc-800 dark:text-stone-200">Zavarovanje vključeno</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-zinc-800 px-6 py-3 rounded-full shadow-md border border-stone-200 dark:border-zinc-700">
                <svg className="w-5 h-5 text-green-700 dark:text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
                <span className="text-sm font-semibold text-zinc-800 dark:text-stone-200">100% varno</span>
              </div>
              <div className="flex items-center gap-2 bg-stone-50 dark:bg-zinc-800 px-6 py-3 rounded-full shadow-md border border-stone-200 dark:border-zinc-700">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-zinc-800 dark:text-stone-200">500+ zadovoljnih strank</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-800 dark:from-green-600 dark:to-green-700 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
                  <svg className="w-8 h-8 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
                  Hitra Montaža
                </h3>
                <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
                  Namestitev v manj kot 5 minutah. Primerno za vse tipe vozil s prečnimi nosilci.
                </p>
              </div>

              <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
                  <svg className="w-8 h-8 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
                  Ugodne Cene
                </h3>
                <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
                  Od 15€/dan z popusti za daljši najem. Brez skritih stroškov ali dodatnih pristojbin.
                </p>
              </div>

              <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 bg-gradient-to-br from-zinc-700 to-zinc-800 dark:from-zinc-600 dark:to-zinc-700 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
                  <svg className="w-8 h-8 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
                  Premium Kakovost
                </h3>
                <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
                  Vodilne blagovne znamke: Thule, Yakima. Redno vzdrževani in preizkušeni kovčki.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sections (Client Rendered) */}
      <HomeInteractive />

      <Footer />
    </div>
  );
}

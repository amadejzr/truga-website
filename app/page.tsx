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

      {/* Interactive Sections (Client Rendered) */}
      <HomeInteractive />

      <Footer />
    </div>
  );
}

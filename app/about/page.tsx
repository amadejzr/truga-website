import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'O nas | Truga',
  description: 'Spoznajte zgodbo podjetja Truga - vodilnega ponudnika najema strešnih kovčkov v Sloveniji.',
};

export default function AboutPage() {
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
              O nas
            </h1>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-stone-300 leading-relaxed">
              Vaš zaupanja vreden partner za strešne kovčke že od leta 2018
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/50 dark:border-zinc-700/50">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-stone-50 mb-6">
              Naša zgodba
            </h2>
            <div className="space-y-4 text-zinc-700 dark:text-stone-300 leading-relaxed text-lg">
              <p>
                Truga je nastala iz preprostega spoznanja: kakovostni strešni kovčki so dragi,
                večina ljudi pa jih potrebuje le nekajkrat na leto. Zakaj bi kupovali opremo,
                ki večino časa leži neuporabljena v garaži?
              </p>
              <p>
                Zato smo se odločili, da to spremenimo. Z izbrano ponudbo premium strešnih
                kovčkov Thule in Yakima ponujamo storitev najema, ki omogoča dostop do kakovostne
                opreme brez visokih stroškov nakupa.
              </p>
              <p>
                V ponudbi imamo skrbno izbrane strešne kovčke in prečne nosilce za vsako
                potovanje — od kompaktnih vikend modelov do velikih družinskih kovčkov.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
            Naše vrednote
          </h2>
          <p className="text-lg text-zinc-700 dark:text-stone-300 max-w-2xl mx-auto">
            Vrednote, ki nas vodijo pri vsakodnevnem delu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-800 dark:from-green-600 dark:to-green-700 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
              <svg className="w-8 h-8 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
              Kakovost
            </h3>
            <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
              Ponujamo samo najboljše blagovne znamke in redno vzdržujemo vso opremo.
            </p>
          </div>

          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
              <svg className="w-8 h-8 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
              Zaupanje
            </h3>
            <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
              Gradimo dolgotrajne odnose s strankami na osnovi zaupanja in poštenosti.
            </p>
          </div>

          <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-zinc-700 to-zinc-800 dark:from-zinc-600 dark:to-zinc-700 rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-lg">
              <svg className="w-8 h-8 text-stone-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-stone-50 mb-3">
              Priročnost
            </h3>
            <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
              Enostavna rezervacija, hitra dostava in fleksibilni termini vračila.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-zinc-800 via-zinc-900 to-green-900 dark:from-zinc-900 dark:via-black dark:to-green-950 rounded-[2.5rem] p-12 md:p-16 shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-stone-50 mb-2">4</div>
              <div className="text-stone-300">Modeli kovčkov</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-stone-50 mb-2">320–750L</div>
              <div className="text-stone-300">Razpon velikosti</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-stone-50 mb-2">5 min</div>
              <div className="text-stone-300">Montaža</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-stone-50 mb-2">24h</div>
              <div className="text-stone-300">Brezplačna odpoved</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

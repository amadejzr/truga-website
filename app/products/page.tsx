import Image from 'next/image';
import Link from 'next/link';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { roofBoxes } from '../data/products';

export const metadata = {
  title: 'Naši Izdelki | Truga',
  description: 'Preglejte našo ponudbo strešnih kovčkov za najem.',
};

export default function ProductsPage() {
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
              Naši Izdelki
            </h1>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-stone-300 leading-relaxed">
              Premium strešni kovčki za najem
            </p>
          </div>
        </div>
      </section>

      {/* Boxes Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {roofBoxes.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-stone-200/50 dark:border-zinc-700/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-green-700 text-stone-50 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Na voljo
                  </span>
                  {product.isPopular && (
                    <span className="bg-amber-500 text-stone-50 px-3 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Najpopularnejši
                    </span>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-stone-900/80 text-stone-50 px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                    {product.brand}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-3 py-1 rounded-full text-sm font-semibold">
                    {product.size}
                  </span>
                  <span className="text-sm text-zinc-500 dark:text-stone-500">
                    Maks. {product.maxLoad}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-zinc-900 dark:text-stone-50 mb-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                  {product.title}
                </h2>

                <p className="text-zinc-600 dark:text-stone-400 mb-4">
                  {product.capacity}
                </p>

                <p className="text-zinc-700 dark:text-stone-300 text-sm mb-6 line-clamp-2">
                  {product.description}
                </p>

                {/* Features Preview */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs bg-stone-200 dark:bg-zinc-700 text-zinc-700 dark:text-stone-300 px-3 py-1 rounded-full">
                    {product.opening}
                  </span>
                  <span className="text-xs bg-stone-200 dark:bg-zinc-700 text-zinc-700 dark:text-stone-300 px-3 py-1 rounded-full">
                    {product.lockType}
                  </span>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-zinc-700">
                  <div>
                    <span className="text-3xl font-bold text-zinc-900 dark:text-stone-50">
                      {product.price.split(' ')[0]}
                    </span>
                    <span className="text-zinc-600 dark:text-stone-400"> / dan</span>
                  </div>
                  <span className="inline-flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold group-hover:gap-3 transition-all">
                    Več informacij
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-24">
        <div className="bg-gradient-to-br from-zinc-800 via-zinc-900 to-green-900 dark:from-zinc-900 dark:via-black dark:to-green-950 rounded-[2.5rem] p-12 md:p-16 text-center shadow-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-stone-50 mb-4">
            Niste prepričani, kateri kovček izbrati?
          </h2>
          <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
            Kontaktirajte nas in z veseljem vam bomo svetovali pri izbiri pravega strešnega kovčka za vaše potrebe.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-700 text-stone-50 font-bold py-4 px-10 rounded-2xl hover:bg-green-800 transition-colors shadow-xl"
          >
            Kontaktirajte nas
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

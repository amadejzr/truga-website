'use client';

import { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItem[] = [
  {
    category: 'Rezervacija',
    question: 'Kako rezerviram strešni kovček?',
    answer: 'Strešni kovček lahko rezervirate preko naše spletne strani s klikom na gumb "Rezerviraj zdaj". Izberete želeni datum prevzema in vračila, nato pa izpolnite obrazec s svojimi podatki. Potrditev rezervacije prejmete po e-pošti.',
  },
  {
    category: 'Rezervacija',
    question: 'Koliko vnaprej moram rezervirati?',
    answer: 'Priporočamo rezervacijo vsaj 2-3 dni vnaprej, še posebej v poletni sezoni. Za zagotovljeno razpoložljivost priporočamo rezervacijo teden dni pred želenim datumom.',
  },
  {
    category: 'Rezervacija',
    question: 'Ali lahko odpovem rezervacijo?',
    answer: 'Da, rezervacijo lahko brezplačno odpoveste do 48 ur pred načrtovanim prevzemom. Za odpovedi v zadnjem trenutku si pridržujemo pravico do zaračunanja 50% cene najema.',
  },
  {
    category: 'Montaža',
    question: 'Ali pomagate pri montaži?',
    answer: 'Ob prevzemu vam pokažemo, kako pravilno namestiti strešni kovček na vaše vozilo. Namestitev je enostavna in traja le 5-10 minut. Na voljo so tudi video navodila.',
  },
  {
    category: 'Montaža',
    question: 'Kateri tipi vozil so primerni?',
    answer: 'Naši strešni kovčki so primerni za vsa vozila s prečnimi nosilci (strešnimi sani). Če niste prepričani, ali je vaše vozilo primerno, nas kontaktirajte in vam bomo z veseljem svetovali.',
  },
  {
    category: 'Montaža',
    question: 'Kaj potrebujem za namestitev?',
    answer: 'Za namestitev potrebujete le prečne nosilce (strešne sani) na vašem vozilu. Vsi pritrdilni elementi so priloženi strešnemu kovčku.',
  },
  {
    category: 'Cene',
    question: 'Kakšne so cene najema?',
    answer: 'Cene se začnejo pri 15€ na dan za manjše kovčke in 20-25€ za večje modele. Za najem daljši od 7 dni ponujamo popuste do 20%.',
  },
  {
    category: 'Cene',
    question: 'Ali je kavcija obvezna?',
    answer: 'Da, ob prevzemu je potrebno plačilo kavcije v višini 100-200€, odvisno od vrednosti strešnega kovčka. Kavcija se v celoti vrne ob vračilu nepoškodovanega kovčka.',
  },
  {
    category: 'Cene',
    question: 'Kateri načini plačila so na voljo?',
    answer: 'Sprejemamo plačilo z gotovino, bančnimi karticami in bančnim nakazilom. Za podjetja izdajamo tudi račune z odloženim plačilom.',
  },
  {
    category: 'Varščina',
    question: 'Kako deluje varščina?',
    answer: 'Ob prevzemu kovčka plačate varščino, ki jo v celoti prejmete nazaj ob vrnitvi nepoškodovanega kovčka. Višina varščine je odvisna od modela kovčka — točen znesek vam sporočimo ob rezervaciji.',
  },
  {
    category: 'Varščina',
    question: 'Kaj se zgodi v primeru poškodbe?',
    answer: 'V primeru poškodb se varščina zadrži delno ali v celoti, odvisno od obsega poškodbe. Priporočamo, da kovček pred uporabo pregledate in nas ob vrnitvi obvestite o morebitnih poškodbah.',
  },
  {
    category: 'Varščina',
    question: 'Kaj se zgodi v primeru kraje?',
    answer: 'V primeru kraje se varščina zadrži v celoti. Priporočamo, da kovček vedno zaklenete s priloženim ključem in ga ne puščate brez nadzora na javnih mestih.',
  },
];

function FAQAccordion({ item, isOpen, onClick }: { item: FAQItem; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="bg-stone-50/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-stone-200/50 dark:border-zinc-700/50 overflow-hidden">
      <button
        onClick={onClick}
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-stone-100/50 dark:hover:bg-zinc-700/50 transition-colors"
      >
        <span className="text-lg font-semibold text-zinc-900 dark:text-stone-50 pr-4">
          {item.question}
        </span>
        <svg
          className={`w-5 h-5 text-zinc-500 dark:text-stone-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5">
          <p className="text-zinc-700 dark:text-stone-300 leading-relaxed">
            {item.answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Vse');

  const categories = ['Vse', ...new Set(faqItems.map((item) => item.category))];

  const filteredItems = activeCategory === 'Vse'
    ? faqItems
    : faqItems.filter((item) => item.category === activeCategory);

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
              Pogosta vprašanja
            </h1>
            <p className="text-xl md:text-2xl text-zinc-700 dark:text-stone-300 leading-relaxed">
              Odgovori na najpogostejša vprašanja o najemu strešnih kovčkov
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-green-700 text-stone-50'
                  : 'bg-stone-200/50 dark:bg-zinc-800/50 text-zinc-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-zinc-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ List */}
      <section className="container mx-auto px-4 py-8 pb-24">
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredItems.map((item, index) => (
            <FAQAccordion
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="bg-stone-100/80 dark:bg-zinc-800/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-stone-200/50 dark:border-zinc-700/50 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-stone-50 mb-4">
            Niste našli odgovora?
          </h2>
          <p className="text-zinc-700 dark:text-stone-300 mb-6">
            Kontaktirajte nas in z veseljem vam bomo odgovorili na vsa vaša vprašanja.
          </p>
          <a
            href="/contact"
            className="inline-block bg-green-700 text-stone-50 font-bold py-3 px-8 rounded-xl hover:bg-green-800 transition-colors"
          >
            Kontaktirajte nas
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

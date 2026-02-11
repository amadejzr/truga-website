import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/about', label: 'O nas' },
    { href: '/faq', label: 'Pogosta vprašanja' },
    { href: '/contact', label: 'Kontakt' },
  ];

  return (
    <footer className="bg-zinc-900 dark:bg-black py-12 border-t border-zinc-800 dark:border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <Logo size="sm" textClassName="text-stone-50" />
            </div>
            <p className="text-stone-400 text-sm">
              Najem strešnih kovčkov za nezahtevna potovanja
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-stone-50 font-semibold mb-4">Navigacija</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 hover:text-stone-200 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-stone-50 font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@truga.si
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +386 41 123 456
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Ljubljana, Slovenija
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6">
          <p className="text-stone-400 text-sm text-center">
            &copy; 2026 Truga. Vse pravice pridržane.
          </p>
        </div>
      </div>
    </footer>
  );
}

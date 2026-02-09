interface StepCustomerDetailsProps {
  name: string;
  email: string;
  phone: string;
  vehicleDescription: string;
  notes: string;
  onChange: (field: 'name' | 'email' | 'phone' | 'vehicleDescription' | 'notes', value: string) => void;
}

export function StepCustomerDetails({ name, email, phone, vehicleDescription, notes, onChange }: StepCustomerDetailsProps) {
  return (
    <div className="p-6">
      <p className="text-zinc-600 dark:text-stone-400 mb-6 text-center">
        Vnesite vaše kontaktne podatke za povpraševanje.
      </p>

      <div className="space-y-4 max-w-md mx-auto">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-1.5">
            Ime in priimek
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Janez Novak"
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-1.5">
            E-pošta
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="janez.novak@email.si"
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-1.5">
            Telefon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => onChange('phone', e.target.value)}
            placeholder="+386 40 123 456"
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-1.5">
            Vozilo (znamka, model, letnik)
          </label>
          <input
            type="text"
            value={vehicleDescription}
            onChange={(e) => onChange('vehicleDescription', e.target.value)}
            placeholder="npr. VW Golf 8, 2021"
            required
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition-colors"
          />
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
            Pomaga nam izbrati prave nosilce za vaše vozilo.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-stone-300 mb-1.5">
            Opombe <span className="text-zinc-400 dark:text-zinc-500 font-normal">(neobvezno)</span>
          </label>
          <textarea
            value={notes}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="Dodatne želje ali vprašanja..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-stone-50 dark:bg-zinc-800 text-zinc-900 dark:text-stone-50 focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition-colors resize-none"
          />
        </div>
      </div>

      <p className="text-xs text-zinc-400 dark:text-zinc-500 text-center mt-6">
        Vaše podatke uporabljamo samo za obdelavo povpraševanja.
      </p>
    </div>
  );
}

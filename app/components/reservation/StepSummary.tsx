import { getRoofBoxById, type ReservationData, type RoofTypeChoice } from '../../data/products';
import { calculatePricing, formatDaysWord } from '../../utils/pricing';

interface StepSummaryProps {
  data: ReservationData;
  onGoToStep: (step: number) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
}

const ROOF_TYPE_LABELS: Record<RoofTypeChoice, string> = {
  'naked-roof': 'Navadna streha',
  'flush-rails': 'Poravnane letve',
  'raised-rails': 'Dvignjene letve',
  'fixed-points': 'Fiksne točke',
  'unsure': 'Ne vem',
  'other': 'Drugo',
};

export function StepSummary({ data, onGoToStep }: StepSummaryProps) {
  const box = data.selectedBoxId ? getRoofBoxById(data.selectedBoxId) : null;

  const days =
    data.startDate && data.endDate
      ? Math.ceil((data.endDate.getTime() - data.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const pricing = box
    ? calculatePricing(box.pricePerDay, null, days, box.deposit)
    : null;

  return (
    <div className="p-6">
      <p className="text-zinc-600 dark:text-stone-400 mb-6 text-center">
        Preglejte vaše povpraševanje pred oddajo.
      </p>

      <div className="space-y-4 max-w-lg mx-auto">
        {/* Box */}
        {box && (
          <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Strešni kovček</h3>
              <button type="button" onClick={() => onGoToStep(1)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-stone-200 dark:bg-zinc-700 rounded-xl overflow-hidden shrink-0">
                <img src={box.image} alt={box.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="font-bold text-zinc-900 dark:text-stone-50">{box.title}</p>
                <p className="text-sm text-zinc-500 dark:text-stone-500">{box.size} &middot; {box.pricePerDay}€/dan</p>
              </div>
            </div>
          </div>
        )}

        {/* Roof type */}
        {data.roofType && (
          data.roofType === 'other' ? (
            <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Tip strehe</h3>
                <button type="button" onClick={() => onGoToStep(2)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
              </div>
              <p className="font-bold text-zinc-900 dark:text-stone-50">Drugo</p>
              <p className="text-sm text-zinc-600 dark:text-stone-400 mt-1">{data.roofTypeOther}</p>
            </div>
          ) : data.roofType === 'unsure' ? (
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/30 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Tip strehe</h3>
                <button type="button" onClick={() => onGoToStep(2)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
              </div>
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Ne vem — preverimo za vas</p>
              <p className="text-xs text-amber-600/70 dark:text-amber-500/70 mt-1">Na podlagi opisa vozila vam svetujemo prave nosilce.</p>
            </div>
          ) : (
            <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Tip strehe</h3>
                <button type="button" onClick={() => onGoToStep(2)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
              </div>
              <p className="font-bold text-zinc-900 dark:text-stone-50">{ROOF_TYPE_LABELS[data.roofType]}</p>
              <p className="text-xs text-zinc-500 dark:text-stone-500 mt-1">Nosilce izberemo za vas glede na tip strehe.</p>
            </div>
          )
        )}

        {/* Dates */}
        <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Datum</h3>
            <button type="button" onClick={() => onGoToStep(3)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
          </div>
          {data.startDate && data.endDate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-900 dark:text-stone-50">{formatDate(data.startDate)} — {formatDate(data.endDate)}</span>
              <span className="font-medium text-zinc-700 dark:text-stone-300">{days} {formatDaysWord(days)}</span>
            </div>
          )}
        </div>

        {/* Customer */}
        <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Kontakt & Vozilo</h3>
            <button type="button" onClick={() => onGoToStep(4)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
          </div>
          <div className="text-sm text-zinc-900 dark:text-stone-50 space-y-1">
            <p>{data.name}</p>
            <p className="text-zinc-500 dark:text-stone-500">{data.email}</p>
            <p className="text-zinc-500 dark:text-stone-500">{data.phone}</p>
            <p className="text-zinc-700 dark:text-stone-300 font-medium mt-2">{data.vehicleDescription}</p>
          </div>
        </div>

        {/* Notes */}
        {data.notes.trim() && (
          <div className="bg-stone-100 dark:bg-zinc-800 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-zinc-500 dark:text-stone-500 uppercase tracking-wider">Opombe</h3>
              <button type="button" onClick={() => onGoToStep(4)} className="text-xs text-green-700 dark:text-green-400 font-medium hover:underline">Uredi</button>
            </div>
            <p className="text-sm text-zinc-700 dark:text-stone-300">{data.notes}</p>
          </div>
        )}

        {/* Price breakdown */}
        {pricing && days > 0 && (
          <div className="bg-gradient-to-br from-zinc-800 to-green-900 dark:from-zinc-900 dark:to-green-950 rounded-2xl p-5 text-stone-50">
            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-3">Ocena cene</h3>
            <div className="space-y-2 text-sm">
              {pricing.boxSubtotal > 0 && box && (
                <div className="flex justify-between">
                  <span className="text-stone-300">Kovček ({days}x {box.pricePerDay}€)</span>
                  <span>{pricing.boxSubtotal}€</span>
                </div>
              )}
              {pricing.discountPercent > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Popust ({pricing.discountPercent}%)</span>
                  <span>-{pricing.discountAmount}€</span>
                </div>
              )}
              <div className="border-t border-stone-600 pt-2 mt-2 flex justify-between text-lg font-bold">
                <span>Skupaj</span>
                <span>{pricing.total}€</span>
              </div>
              {pricing.deposit > 0 && (
                <div className="flex justify-between text-stone-400 text-xs pt-1">
                  <span>Kavcija (vračljiva)</span>
                  <span>{pricing.deposit}€</span>
                </div>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-3">Končna cena bo potrjena po pregledu vaših potreb.</p>
          </div>
        )}
      </div>
    </div>
  );
}

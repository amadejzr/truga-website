'use client';

import { useState } from 'react';
import { Calendar } from '../Calendar';
import { calculatePricing, getDiscountNudge, formatDaysWord } from '../../utils/pricing';

interface StepDatePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateSelect: (start: Date | null, end: Date | null) => void;
  boxPricePerDay: number | null;
  boxTitle: string | null;
  deposit: number | null;
  needsHolder: boolean;
  holderEstimatePricePerDay: number;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('sl-SI', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function StepDatePicker({
  startDate,
  endDate,
  onDateSelect,
  boxPricePerDay,
  boxTitle,
  deposit,
  needsHolder,
  holderEstimatePricePerDay,
}: StepDatePickerProps) {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Use hovered date as preview end date when no end date is confirmed yet
  const effectiveEndDate =
    endDate ?? (startDate && hoveredDate && hoveredDate > startDate ? hoveredDate : null);
  const isPreview = !endDate && effectiveEndDate !== null;

  const days =
    startDate && effectiveEndDate
      ? Math.ceil((effectiveEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const pricing =
    days > 0 && boxPricePerDay !== null
      ? calculatePricing(
          boxPricePerDay,
          needsHolder ? holderEstimatePricePerDay : null,
          days,
          deposit ?? undefined
        )
      : null;

  const nudge = getDiscountNudge(days);

  return (
    <div className="p-6">
      <p className="text-zinc-600 dark:text-stone-400 mb-6 text-center">
        Izberite datum prevzema in vrnitve.
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Calendar */}
        <div className="flex-1 min-w-0">
          <Calendar
            onDateSelect={onDateSelect}
            onHoverDateChange={setHoveredDate}
            initialStartDate={startDate}
            initialEndDate={endDate}
          />
        </div>

        {/* Pricing card — always visible */}
        <div className="lg:w-72 shrink-0">
          <div
            className={`relative bg-gradient-to-br from-zinc-800 to-green-900 dark:from-zinc-900 dark:to-green-950 rounded-2xl p-5 text-stone-50 shadow-xl transition-all duration-300 ${
              isPreview
                ? 'ring-2 ring-green-400/50 ring-offset-2 ring-offset-stone-50 dark:ring-offset-zinc-900'
                : ''
            }`}
          >
            {/* Preview badge */}
            {isPreview && (
              <span className="absolute -top-2.5 -right-2.5 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg">
                PREDOGLED
              </span>
            )}

            <h3 className="text-sm font-semibold text-stone-300 uppercase tracking-wider mb-3">Ocena cene</h3>

            {/* Date range */}
            <div className="mb-4">
              {startDate ? (
                <>
                  <div className="text-xs text-stone-400 mb-1">Prevzem</div>
                  <div className="text-sm font-semibold">{formatDate(startDate)}</div>
                  {effectiveEndDate ? (
                    <>
                      <div className="text-xs text-stone-400 mt-2 mb-1">Vrnitev</div>
                      <div className={`text-sm font-semibold ${isPreview ? 'text-green-300' : ''}`}>
                        {formatDate(effectiveEndDate)}
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-stone-500 mt-2">Izberite datum vrnitve...</p>
                  )}
                  {days > 0 && (
                    <div className="mt-2 inline-flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1 text-xs font-medium">
                      {isPreview && (
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      )}
                      {days} {formatDaysWord(days)}
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-stone-400">Izberite datum prevzema na koledarju.</p>
              )}
            </div>

            {/* Price breakdown */}
            {pricing ? (
              <div className="space-y-2 text-sm tabular-nums">
                {/* Box */}
                {pricing.boxSubtotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-stone-300 truncate mr-2">{boxTitle} ({days}x {boxPricePerDay}€)</span>
                    <span className="font-medium shrink-0">{pricing.boxSubtotal}€</span>
                  </div>
                )}

                {/* Holders estimate */}
                {needsHolder && pricing.holderSubtotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-stone-300">Nosilci ({days}x od {holderEstimatePricePerDay}€)</span>
                    <span className="font-medium text-stone-300 shrink-0">od {pricing.holderSubtotal}€</span>
                  </div>
                )}

                {/* Discount */}
                {pricing.discountPercent > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Popust ({pricing.discountPercent}%)</span>
                    <span className="shrink-0">-{pricing.discountAmount}€</span>
                  </div>
                )}

                {/* Total */}
                <div className="border-t border-stone-600 pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Skupaj</span>
                  <span>{pricing.total}€</span>
                </div>

                {/* Deposit */}
                {pricing.deposit > 0 && (
                  <div className="flex justify-between text-stone-400 text-xs pt-1">
                    <span>Kavcija (vračljiva)</span>
                    <span className="shrink-0">{pricing.deposit}€</span>
                  </div>
                )}
              </div>
            ) : boxPricePerDay !== null && startDate ? (
              <div className="space-y-2 text-sm text-stone-400">
                <div className="flex justify-between">
                  <span>{boxTitle}</span>
                  <span>{boxPricePerDay}€/dan</span>
                </div>
                {needsHolder && (
                  <div className="flex justify-between">
                    <span>Nosilci (ocena)</span>
                    <span>od {holderEstimatePricePerDay}€/dan</span>
                  </div>
                )}
                {deposit && (
                  <div className="flex justify-between text-xs pt-1">
                    <span>Kavcija (vračljiva)</span>
                    <span>{deposit}€</span>
                  </div>
                )}
              </div>
            ) : boxPricePerDay !== null ? (
              <div className="space-y-2 text-sm text-stone-400">
                <div className="flex justify-between">
                  <span>{boxTitle}</span>
                  <span>{boxPricePerDay}€/dan</span>
                </div>
                {needsHolder && (
                  <div className="flex justify-between">
                    <span>Nosilci (ocena)</span>
                    <span>od {holderEstimatePricePerDay}€/dan</span>
                  </div>
                )}
                {deposit && (
                  <div className="flex justify-between text-xs pt-1">
                    <span>Kavcija (vračljiva)</span>
                    <span>{deposit}€</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-stone-500">
                Izberite kovček v koraku 1 za prikaz cene.
              </p>
            )}

            {/* Discount nudge */}
            {nudge && days > 0 && (
              <div className="mt-3 bg-amber-500/20 border border-amber-400/30 rounded-xl px-3 py-2 text-sm">
                <span className="text-amber-300 font-medium">
                  Še {nudge.daysUntilNext} {formatDaysWord(nudge.daysUntilNext)} do {nudge.nextPercent}% popust!
                </span>
              </div>
            )}

            {/* Discount tiers - shown when no pricing yet */}
            {!pricing && (
              <div className="mt-3 space-y-1">
                {[
                  { days: '4–6', pct: '5%', label: 'podaljšan vikend' },
                  { days: '7–13', pct: '10%', label: '1 teden' },
                  { days: '14–20', pct: '15%', label: '2 tedna' },
                  { days: '21–30', pct: '20%', label: 'mesečni' },
                  { days: '30+', pct: 'po dogovoru', label: 'dolgoročni' },
                ].map((tier) => (
                  <div key={tier.days} className="flex items-center justify-between text-xs text-stone-500">
                    <span>{tier.days} dni</span>
                    <span>{tier.pct}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Footer note */}
            <p className="text-[11px] text-stone-500 mt-3">
              Končna cena bo potrjena po pregledu vaših potreb.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

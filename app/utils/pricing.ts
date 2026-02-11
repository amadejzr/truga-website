export function getDiscountPercent(days: number): number {
  if (days >= 30) return 25;
  if (days >= 21) return 20;
  if (days >= 14) return 15;
  if (days >= 7) return 10;
  if (days >= 4) return 5;
  return 0;
}

export function calculatePricing(
  boxPricePerDay: number | null,
  holderPricePerDay: number | null,
  days: number,
  deposit?: number
) {
  if (boxPricePerDay === null && holderPricePerDay === null) {
    return { boxSubtotal: 0, holderSubtotal: 0, discountPercent: 0, discountAmount: 0, total: 0, deposit: deposit ?? 0 };
  }

  const basePerDay = (boxPricePerDay ?? 0) + (holderPricePerDay ?? 0);
  const discountPercent = getDiscountPercent(days);

  const grossTotal = days * basePerDay;
  const discountAmount = grossTotal * (discountPercent / 100);
  const total = grossTotal - discountAmount;

  return {
    boxSubtotal: boxPricePerDay ? days * boxPricePerDay : 0,
    holderSubtotal: holderPricePerDay ? days * holderPricePerDay : 0,
    discountPercent,
    discountAmount: Math.round(discountAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
    deposit: deposit ?? 0,
  };
}

export function getDiscountNudge(days: number): { daysUntilNext: number; nextPercent: number } | null {
  if (days >= 30) return null;
  if (days >= 21) return { daysUntilNext: 30 - days, nextPercent: 25 };
  if (days >= 14) return { daysUntilNext: 21 - days, nextPercent: 20 };
  if (days >= 7) return { daysUntilNext: 14 - days, nextPercent: 15 };
  if (days >= 4) return { daysUntilNext: 7 - days, nextPercent: 10 };
  if (days >= 1) return { daysUntilNext: 4 - days, nextPercent: 5 };
  return null;
}

export function formatDaysWord(n: number): string {
  if (n === 1) return 'dan';
  if (n === 2) return 'dneva';
  if (n <= 4) return 'dnevi';
  return 'dni';
}

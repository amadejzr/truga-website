export function calculatePricing(
  boxPricePerDay: number | null,
  holderPricePerDay: number | null,
  days: number
) {
  if (boxPricePerDay === null && holderPricePerDay === null) {
    return { boxSubtotal: 0, holderSubtotal: 0, discountPercent: 0, discountAmount: 0, total: 0 };
  }

  const basePerDay = (boxPricePerDay ?? 0) + (holderPricePerDay ?? 0);
  let discountPercent = 0;
  if (days >= 7) discountPercent = 15;
  else if (days >= 3) discountPercent = 10;

  const grossTotal = days * basePerDay;
  const discountAmount = grossTotal * (discountPercent / 100);
  const total = grossTotal - discountAmount;

  return {
    boxSubtotal: boxPricePerDay ? days * boxPricePerDay : 0,
    holderSubtotal: holderPricePerDay ? days * holderPricePerDay : 0,
    discountPercent,
    discountAmount: Math.round(discountAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

import { describe, it, expect } from 'vitest';
import {
  getDiscountPercent,
  calculatePricing,
  getDiscountNudge,
  formatDaysWord,
} from '../pricing';

describe('getDiscountPercent', () => {
  it('returns 0% for 1-3 days', () => {
    expect(getDiscountPercent(1)).toBe(0);
    expect(getDiscountPercent(2)).toBe(0);
    expect(getDiscountPercent(3)).toBe(0);
  });

  it('returns 5% for 4-6 days', () => {
    expect(getDiscountPercent(4)).toBe(5);
    expect(getDiscountPercent(5)).toBe(5);
    expect(getDiscountPercent(6)).toBe(5);
  });

  it('returns 10% for 7-13 days', () => {
    expect(getDiscountPercent(7)).toBe(10);
    expect(getDiscountPercent(10)).toBe(10);
    expect(getDiscountPercent(13)).toBe(10);
  });

  it('returns 15% for 14-20 days', () => {
    expect(getDiscountPercent(14)).toBe(15);
    expect(getDiscountPercent(17)).toBe(15);
    expect(getDiscountPercent(20)).toBe(15);
  });

  it('returns 20% for 21-29 days', () => {
    expect(getDiscountPercent(21)).toBe(20);
    expect(getDiscountPercent(25)).toBe(20);
    expect(getDiscountPercent(29)).toBe(20);
  });

  it('returns 25% for 30+ days', () => {
    expect(getDiscountPercent(30)).toBe(25);
    expect(getDiscountPercent(60)).toBe(25);
  });

  it('returns 0% for 0 days', () => {
    expect(getDiscountPercent(0)).toBe(0);
  });
});

describe('calculatePricing', () => {
  it('calculates box-only pricing without discount', () => {
    const result = calculatePricing(20, null, 3);
    expect(result.boxSubtotal).toBe(60);
    expect(result.holderSubtotal).toBe(0);
    expect(result.discountPercent).toBe(0);
    expect(result.discountAmount).toBe(0);
    expect(result.total).toBe(60);
  });

  it('calculates box + holder pricing', () => {
    const result = calculatePricing(20, 5, 3);
    expect(result.boxSubtotal).toBe(60);
    expect(result.holderSubtotal).toBe(15);
    expect(result.total).toBe(75);
  });

  it('applies 5% discount for 5 days', () => {
    const result = calculatePricing(20, null, 5);
    // 5 * 20 = 100, 5% = 5, total = 95
    expect(result.boxSubtotal).toBe(100);
    expect(result.discountPercent).toBe(5);
    expect(result.discountAmount).toBe(5);
    expect(result.total).toBe(95);
  });

  it('applies 10% discount for 7 days', () => {
    const result = calculatePricing(20, null, 7);
    // 7 * 20 = 140, 10% = 14, total = 126
    expect(result.discountPercent).toBe(10);
    expect(result.discountAmount).toBe(14);
    expect(result.total).toBe(126);
  });

  it('applies discount to combined box + holder total', () => {
    const result = calculatePricing(20, 5, 7);
    // 7 * (20 + 5) = 175, 10% = 17.5, total = 157.5
    expect(result.discountPercent).toBe(10);
    expect(result.discountAmount).toBe(17.5);
    expect(result.total).toBe(157.5);
  });

  it('includes deposit when provided', () => {
    const result = calculatePricing(20, null, 3, 150);
    expect(result.deposit).toBe(150);
    expect(result.total).toBe(60); // deposit is separate, not added to total
  });

  it('defaults deposit to 0 when not provided', () => {
    const result = calculatePricing(20, null, 3);
    expect(result.deposit).toBe(0);
  });

  it('returns zeros when both prices are null', () => {
    const result = calculatePricing(null, null, 5);
    expect(result.boxSubtotal).toBe(0);
    expect(result.holderSubtotal).toBe(0);
    expect(result.total).toBe(0);
  });

  it('rounds amounts to 2 decimal places', () => {
    // 3 * 7 = 21, 0% discount
    const result = calculatePricing(7, null, 3);
    expect(result.total).toBe(21);

    // 7 * 15 = 105, 10% = 10.5
    const result2 = calculatePricing(15, null, 7);
    expect(result2.discountAmount).toBe(10.5);
    expect(result2.total).toBe(94.5);
  });
});

describe('getDiscountNudge', () => {
  it('returns nudge toward 5% for 1-3 days', () => {
    expect(getDiscountNudge(1)).toEqual({ daysUntilNext: 3, nextPercent: 5 });
    expect(getDiscountNudge(2)).toEqual({ daysUntilNext: 2, nextPercent: 5 });
    expect(getDiscountNudge(3)).toEqual({ daysUntilNext: 1, nextPercent: 5 });
  });

  it('returns nudge toward 10% for 4-6 days', () => {
    expect(getDiscountNudge(4)).toEqual({ daysUntilNext: 3, nextPercent: 10 });
    expect(getDiscountNudge(6)).toEqual({ daysUntilNext: 1, nextPercent: 10 });
  });

  it('returns nudge toward 15% for 7-13 days', () => {
    expect(getDiscountNudge(7)).toEqual({ daysUntilNext: 7, nextPercent: 15 });
    expect(getDiscountNudge(13)).toEqual({ daysUntilNext: 1, nextPercent: 15 });
  });

  it('returns nudge toward 20% for 14-20 days', () => {
    expect(getDiscountNudge(14)).toEqual({ daysUntilNext: 7, nextPercent: 20 });
    expect(getDiscountNudge(20)).toEqual({ daysUntilNext: 1, nextPercent: 20 });
  });

  it('returns nudge toward 25% for 21-29 days', () => {
    expect(getDiscountNudge(21)).toEqual({ daysUntilNext: 9, nextPercent: 25 });
    expect(getDiscountNudge(29)).toEqual({ daysUntilNext: 1, nextPercent: 25 });
  });

  it('returns null for 30+ days (max tier reached)', () => {
    expect(getDiscountNudge(30)).toBeNull();
    expect(getDiscountNudge(60)).toBeNull();
  });

  it('returns null for 0 days', () => {
    expect(getDiscountNudge(0)).toBeNull();
  });
});

describe('formatDaysWord', () => {
  it('returns "dan" for 1', () => {
    expect(formatDaysWord(1)).toBe('dan');
  });

  it('returns "dneva" for 2', () => {
    expect(formatDaysWord(2)).toBe('dneva');
  });

  it('returns "dnevi" for 3-4', () => {
    expect(formatDaysWord(3)).toBe('dnevi');
    expect(formatDaysWord(4)).toBe('dnevi');
  });

  it('returns "dni" for 5+', () => {
    expect(formatDaysWord(5)).toBe('dni');
    expect(formatDaysWord(10)).toBe('dni');
    expect(formatDaysWord(30)).toBe('dni');
  });
});

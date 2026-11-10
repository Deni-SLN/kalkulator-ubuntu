import { describe, it, expect } from 'vitest';
import { formatNumber, formatExpression } from '../src/engine/formatter';

describe('Number & Expression Formatter', () => {
  it('formats thousand separators accurately', () => {
    expect(formatNumber('1000000', true)).toBe('1,000,000');
    expect(formatNumber('1250000', true)).toBe('1,250,000');
    expect(formatNumber('1234567.8912', true)).toBe('1,234,567.8912');
    expect(formatNumber('-9876543.21', true)).toBe('-9,876,543.21');
  });

  it('respects decimal precision limit', () => {
    expect(formatNumber('12.345678912345', false, 4)).toBe('12.3456');
    expect(formatNumber('12.345678912345', false, 2)).toBe('12.34');
  });

  it('handles division by zero overflow and infinity safely', () => {
    expect(formatNumber('Infinity')).toBe('Overflow');
    expect(formatNumber('-Infinity')).toBe('Overflow');
    expect(formatNumber('NaN')).toBe('Invalid Expression');
  });

  it('beautifies raw expressions with clean spacing & math symbols', () => {
    expect(formatExpression('1000000+25%')).toBe('1000000 + 25%');
    expect(formatExpression('5*10/2')).toBe('5 × 10 ÷ 2');
    expect(formatExpression('10-5')).toBe('10 − 5');
  });
});

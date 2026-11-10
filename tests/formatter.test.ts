import { describe, it, expect } from 'vitest';
import { formatNumber, formatExpression } from '../src/engine/formatter';

describe('Number & Expression Formatter', () => {
  it('formats thousand separators with Indonesian dot (.) format by default', () => {
    expect(formatNumber('1000000', true, 10, 'id-ID')).toBe('1.000.000');
    expect(formatNumber('1250000', true, 10, 'id-ID')).toBe('1.250.000');
    expect(formatNumber('1234567.8912', true, 10, 'id-ID')).toBe('1.234.567,8912');
    expect(formatNumber('-9876543.21', true, 10, 'id-ID')).toBe('-9.876.543,21');
    expect(formatNumber('125.', true, 10, 'id-ID')).toBe('125,');
  });

  it('formats thousand separators with US comma (,) format when selected', () => {
    expect(formatNumber('1000000', true, 10, 'en-US')).toBe('1,000,000');
    expect(formatNumber('1250000', true, 10, 'en-US')).toBe('1,250,000');
    expect(formatNumber('1234567.8912', true, 10, 'en-US')).toBe('1,234,567.8912');
  });

  it('respects decimal precision limit', () => {
    expect(formatNumber('12.345678912345', false, 4, 'en-US')).toBe('12.3456');
    expect(formatNumber('12.345678912345', false, 2, 'id-ID')).toBe('12,34');
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
    expect(formatExpression('10.5+2.5', 'id-ID')).toBe('10,5 + 2,5');
  });
});

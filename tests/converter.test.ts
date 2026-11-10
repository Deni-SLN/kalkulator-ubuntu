import { describe, it, expect } from 'vitest';
import { convertUnits } from '../src/modules/converter/unitConverterEngine';
import { convertCurrency, FALLBACK_RATES } from '../src/modules/converter/currencyEngine';

describe('Unit & Currency Converter Engine', () => {
  it('converts Length accurately', () => {
    expect(convertUnits('length', 'km', 'm', 1)).toBe(1000);
    expect(convertUnits('length', 'm', 'cm', 2.5)).toBe(250);
  });

  it('converts Temperature non-linear scales (C, F, K, R)', () => {
    // 0°C = 32°F
    expect(convertUnits('temperature', 'C', 'F', 0)).toBe(32);
    // 100°C = 212°F
    expect(convertUnits('temperature', 'C', 'F', 100)).toBe(212);
    // 0°C = 273.15 K
    expect(convertUnits('temperature', 'C', 'K', 0)).toBe(273.15);
  });

  it('converts Weight & Mass', () => {
    expect(convertUnits('weight', 'kg', 'g', 5)).toBe(5000);
    expect(convertUnits('weight', 't', 'kg', 1)).toBe(1000);
  });

  it('converts Data Storage binary multiples', () => {
    expect(convertUnits('data', 'kb', 'b', 1)).toBe(1024);
    expect(convertUnits('data', 'gb', 'mb', 1)).toBe(1024);
  });

  it('converts Currencies using cached rates and handles same currency', () => {
    expect(convertCurrency('USD', 'USD', 100, FALLBACK_RATES)).toBe(100);
    expect(convertCurrency('USD', 'IDR', 1, FALLBACK_RATES)).toBe(16250);
    expect(convertCurrency('IDR', 'USD', 16250, FALLBACK_RATES)).toBe(1);
  });
});

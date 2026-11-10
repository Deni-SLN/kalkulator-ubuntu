export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export const SUPPORTED_CURRENCIES: CurrencyInfo[] = [
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  { code: 'USD', name: 'United States Dollar', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
];

// Fallback rates relative to 1 USD
export const FALLBACK_RATES: Record<string, number> = {
  USD: 1.0,
  IDR: 16250.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 154.5,
  SGD: 1.34,
  MYR: 4.45,
  CNY: 7.24,
  AUD: 1.52,
  CAD: 1.39,
  CHF: 0.88,
  SAR: 3.75,
  KRW: 1385.0,
  THB: 34.8,
};

const STORAGE_KEY_CURRENCY_RATES = 'dsln_currency_rates';
const STORAGE_KEY_CURRENCY_TIME = 'dsln_currency_updated_time';

export interface CurrencyRateData {
  rates: Record<string, number>;
  updatedAt: string;
  isCached: boolean;
}

export function getLocalRates(): CurrencyRateData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENCY_RATES);
    const time = localStorage.getItem(STORAGE_KEY_CURRENCY_TIME);
    if (raw && time) {
      return {
        rates: JSON.parse(raw),
        updatedAt: time,
        isCached: true,
      };
    }
  } catch (e) {
    // fallback
  }

  return {
    rates: FALLBACK_RATES,
    updatedAt: '2026-11-10 08:00 (Offline Base)',
    isCached: true,
  };
}

export async function fetchOnlineRates(): Promise<CurrencyRateData> {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates) {
        const timeStr = new Date().toLocaleString('id-ID', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
        localStorage.setItem(STORAGE_KEY_CURRENCY_RATES, JSON.stringify(data.rates));
        localStorage.setItem(STORAGE_KEY_CURRENCY_TIME, timeStr);
        return {
          rates: data.rates,
          updatedAt: timeStr,
          isCached: false,
        };
      }
    }
  } catch (e) {
    // network unavailable or offline
  }

  return getLocalRates();
}

export function convertCurrency(
  fromCode: string,
  toCode: string,
  amount: number,
  rates: Record<string, number>
): number {
  if (fromCode === toCode) return amount;
  const rateFrom = rates[fromCode] || FALLBACK_RATES[fromCode] || 1;
  const rateTo = rates[toCode] || FALLBACK_RATES[toCode] || 1;

  // Convert from -> USD -> to
  const inUSD = amount / rateFrom;
  return inUSD * rateTo;
}

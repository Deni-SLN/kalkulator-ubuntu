import React, { useState, useEffect } from 'react';
import {
  UnitCategory,
  UNIT_CATEGORIES,
  convertUnits,
} from './unitConverterEngine';
import {
  SUPPORTED_CURRENCIES,
  CurrencyRateData,
  getLocalRates,
  fetchOnlineRates,
  convertCurrency,
} from './currencyEngine';
import { formatNumber } from '@/engine/formatter';
import { useSettingsStore } from '@/stores/settingsStore';
import { ArrowLeftRight, RefreshCw, Wifi, WifiOff, Scale, DollarSign } from 'lucide-react';

export const ConverterView: React.FC = () => {
  const { settings } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<'unit' | 'currency'>('unit');

  // --- Unit Converter State ---
  const [category, setCategory] = useState<UnitCategory>('length');
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('cm');
  const [unitAmount, setUnitAmount] = useState<number>(1);

  // --- Currency Converter State ---
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('IDR');
  const [currAmount, setCurrAmount] = useState<number>(100);
  const [rateData, setRateData] = useState<CurrencyRateData>(getLocalRates());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Update default units when category changes
  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const units = UNIT_CATEGORIES[newCat].units;
    if (units.length >= 2) {
      setFromUnit(units[0].id);
      setToUnit(units[1].id);
    }
  };

  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const handleRefreshRates = async () => {
    setIsRefreshing(true);
    const data = await fetchOnlineRates();
    setRateData(data);
    setIsRefreshing(false);
  };

  useEffect(() => {
    // Try refreshing rates on mount
    fetchOnlineRates().then(setRateData);
  }, []);

  const convertedUnitVal = convertUnits(category, fromUnit, toUnit, unitAmount);
  const convertedCurrVal = convertCurrency(
    fromCurrency,
    toCurrency,
    currAmount,
    rateData.rates
  );

  const fmt = (n: number, maxDec = 4) =>
    formatNumber(
      n % 1 === 0 ? n.toString() : n.toFixed(maxDec).replace(/0+$/, '').replace(/\.$/, ''),
      settings.thousandsSeparator,
      maxDec,
      settings.numberFormat
    );

  const currentCategoryUnits = UNIT_CATEGORIES[category].units;

  return (
    <div className="flex-1 flex flex-col overflow-hidden select-none p-3 space-y-3">
      {/* Top Selector: Unit Converter vs Currency Converter */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-card)] shadow-sm">
        <button
          onClick={() => setActiveTab('unit')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'unit'
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Konverter Satuan</span>
        </button>
        <button
          onClick={() => setActiveTab('currency')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'currency'
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Konverter Mata Uang</span>
        </button>
      </div>

      {/* --- UNIT CONVERTER CONTENT --- */}
      {activeTab === 'unit' && (
        <div className="flex-1 flex flex-col space-y-3 overflow-y-auto pr-1">
          {/* Category Dropdown / Scrollbar */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-[var(--text-secondary)] uppercase font-semibold">Kategori:</span>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value as UnitCategory)}
              className="flex-1 bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-3 py-1.5 text-xs text-[var(--text-primary)] font-medium focus:outline-none focus:border-dsln-accent shadow-sm"
            >
              {(Object.keys(UNIT_CATEGORIES) as UnitCategory[]).map((cat) => (
                <option key={cat} value={cat} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                  {UNIT_CATEGORIES[cat].label}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Conversion Box */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-3.5 space-y-3 shadow-sm">
            {/* From Input */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                <span className="font-medium">Dari</span>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded-md font-semibold focus:outline-none cursor-pointer"
                >
                  {currentCategoryUnits.map((u) => (
                    <option key={u.id} value={u.id} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {u.name} ({u.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                value={unitAmount}
                onChange={(e) => setUnitAmount(Number(e.target.value))}
                className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-xl px-3 py-2 text-xl font-bold font-mono text-[var(--text-primary)] focus:outline-none focus:border-dsln-accent shadow-inner transition"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-1">
              <button
                onClick={handleSwapUnits}
                className="p-1.5 rounded-full bg-[var(--btn-op-bg)] hover:bg-dsln-accent text-[var(--text-primary)] hover:text-white transition active:scale-95 shadow-sm border border-[var(--border-subtle)]"
                title="Tukar satuan"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To Output */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                <span className="font-medium">Ke</span>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded-md font-semibold focus:outline-none cursor-pointer"
                >
                  {currentCategoryUnits.map((u) => (
                    <option key={u.id} value={u.id} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {u.name} ({u.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xl font-bold font-mono text-dsln-accent select-all shadow-inner">
                {fmt(convertedUnitVal, 6)}
              </div>
            </div>

            {/* Formula Hint */}
            <div className="text-[11px] text-[var(--text-muted)] text-center font-mono pt-2 border-t border-[var(--border-subtle)]">
              1 {fromUnit} = {fmt(convertUnits(category, fromUnit, toUnit, 1), 6)} {toUnit}
            </div>
          </div>
        </div>
      )}

      {/* --- CURRENCY CONVERTER CONTENT --- */}
      {activeTab === 'currency' && (
        <div className="flex-1 flex flex-col space-y-3 overflow-y-auto pr-1">
          {/* Status Bar */}
          <div className="flex items-center justify-between text-[11px] text-[var(--text-secondary)] px-1">
            <div className="flex items-center space-x-1">
              {rateData.isCached ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                  <span>Kurs Tersimpan ({rateData.updatedAt})</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-green-500" />
                  <span>Kurs Terkini ({rateData.updatedAt})</span>
                </>
              )}
            </div>
            <button
              onClick={handleRefreshRates}
              disabled={isRefreshing}
              className="flex items-center space-x-1 text-dsln-accent hover:underline font-semibold disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Memperbarui...' : 'Perbarui Kurs'}</span>
            </button>
          </div>

          {/* Currency Input Card */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-3.5 space-y-3 shadow-sm">
            {/* From Currency */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                <span className="font-medium">Dari</span>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded-md font-semibold focus:outline-none cursor-pointer"
                >
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                value={currAmount}
                onChange={(e) => setCurrAmount(Number(e.target.value))}
                className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-xl px-3 py-2 text-xl font-bold font-mono text-[var(--text-primary)] focus:outline-none focus:border-dsln-accent shadow-inner transition"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-1">
              <button
                onClick={handleSwapCurrencies}
                className="p-1.5 rounded-full bg-[var(--btn-op-bg)] hover:bg-dsln-accent text-[var(--text-primary)] hover:text-white transition active:scale-95 shadow-sm border border-[var(--border-subtle)]"
                title="Tukar mata uang"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* To Currency */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs text-[var(--text-secondary)]">
                <span className="font-medium">Ke</span>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] px-2 py-0.5 rounded-md font-semibold focus:outline-none cursor-pointer"
                >
                  {SUPPORTED_CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[var(--bg-surface)] text-[var(--text-primary)]">
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] rounded-xl px-3 py-2 text-xl font-bold font-mono text-green-600 dark:text-green-400 select-all shadow-inner">
                {fmt(convertedCurrVal, 2)}
              </div>
            </div>

            {/* Rate Hint */}
            <div className="text-[11px] text-[var(--text-muted)] text-center font-mono pt-2 border-t border-[var(--border-subtle)]">
              1 {fromCurrency} = {fmt(convertCurrency(fromCurrency, toCurrency, 1, rateData.rates), 4)} {toCurrency}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

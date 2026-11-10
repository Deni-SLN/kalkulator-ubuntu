import React, { useState } from 'react';
import {
  calculateAverageDown,
  calculateLoan,
  calculateCompoundInterest,
  calculateMargin,
} from './financialEngine';
import { formatNumber } from '@/engine/formatter';
import { useSettingsStore } from '@/stores/settingsStore';
import { TrendingUp, Home, PiggyBank, Briefcase } from 'lucide-react';

type FinancialTab = 'stock' | 'loan' | 'investment' | 'business';

export const FinancialView: React.FC = () => {
  const { settings } = useSettingsStore();
  const [activeTab, setActiveTab] = useState<FinancialTab>('stock');

  // Stock State
  const [initShares, setInitShares] = useState<number>(100);
  const [initPrice, setInitPrice] = useState<number>(200);
  const [addShares, setAddShares] = useState<number>(100);
  const [addPrice, setAddPrice] = useState<number>(150);

  // Loan State
  const [loanAmount, setLoanAmount] = useState<number>(500000000);
  const [loanRate, setLoanRate] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(15);

  // Investment State
  const [invPrincipal, setInvPrincipal] = useState<number>(10000000);
  const [invMonthly, setInvMonthly] = useState<number>(1000000);
  const [invRate, setInvRate] = useState<number>(10);
  const [invYears, setInvYears] = useState<number>(10);

  // Business State
  const [bizRevenue, setBizRevenue] = useState<number>(150000000);
  const [bizCost, setBizCost] = useState<number>(100000000);

  const fmt = (n: number) =>
    formatNumber(n.toFixed(2), settings.thousandsSeparator, 2, settings.numberFormat);

  const fmtInt = (n: number) =>
    formatNumber(Math.round(n).toString(), settings.thousandsSeparator, 0, settings.numberFormat);

  // Stock Calculation
  const avgDownResult = calculateAverageDown({
    initialShares: initShares,
    initialPrice: initPrice,
    additionalShares: addShares,
    additionalPrice: addPrice,
  });

  // Loan Calculation
  const loanResult = calculateLoan(loanAmount, loanRate, loanTenureYears * 12);

  // Investment Calculation
  const invResult = calculateCompoundInterest(invPrincipal, invMonthly, invRate, invYears);

  // Business Calculation
  const bizResult = calculateMargin(bizRevenue, bizCost);

  return (
    <div className="flex-1 flex flex-col overflow-hidden select-none p-3 space-y-3">
      {/* Sub Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-card)] shadow-sm">
        <button
          onClick={() => setActiveTab('stock')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'stock'
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Saham</span>
        </button>
        <button
          onClick={() => setActiveTab('loan')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'loan'
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Pinjaman/KPR</span>
        </button>
        <button
          onClick={() => setActiveTab('investment')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'investment'
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
          }`}
        >
          <PiggyBank className="w-3.5 h-3.5" />
          <span>Investasi</span>
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            activeTab === 'business'
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Bisnis</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {/* --- STOCK TAB --- */}
        {activeTab === 'stock' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-3.5 space-y-3 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Kalkulator Average Down
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Jumlah Saham Awal (Lot)</label>
                  <input
                    type="number"
                    value={initShares}
                    onChange={(e) => setInitShares(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Harga Beli Awal</label>
                  <input
                    type="number"
                    value={initPrice}
                    onChange={(e) => setInitPrice(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Jumlah Saham Tambahan</label>
                  <input
                    type="number"
                    value={addShares}
                    onChange={(e) => setAddShares(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Harga Beli Tambahan</label>
                  <input
                    type="number"
                    value={addPrice}
                    onChange={(e) => setAddPrice(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
              </div>

              {/* Result Summary Card */}
              <div className="p-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Total Saham</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] font-mono">{fmtInt(avgDownResult.totalShares)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Total Investasi</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] font-mono">{fmtInt(avgDownResult.totalInvestment)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-dsln-accent">Harga Rata-Rata (Avg)</div>
                  <div className="text-sm font-bold text-dsln-accent font-mono">{fmt(avgDownResult.averagePrice)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LOAN TAB --- */}
        {activeTab === 'loan' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-3.5 space-y-3 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Simulasi Pinjaman & KPR
              </span>
              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Plafon Pinjaman</label>
                  <input
                    type="number"
                    step="1000000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[var(--text-secondary)] block mb-1 font-medium">Suku Bunga / Tahun (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--text-secondary)] block mb-1 font-medium">Jangka Waktu (Tahun)</label>
                    <input
                      type="number"
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Result Card */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-xs text-dsln-accent font-semibold">Cicilan per Bulan</span>
                  <span className="text-base font-bold text-dsln-accent font-mono">{fmtInt(loanResult.monthlyInstallment)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                  <span>Total Bunga Dibayarkan:</span>
                  <span className="font-mono text-[var(--text-primary)] font-medium">{fmtInt(loanResult.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                  <span>Total Pembayaran (Pokok + Bunga):</span>
                  <span className="font-mono text-[var(--text-primary)] font-medium">{fmtInt(loanResult.totalPayment)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- INVESTMENT TAB --- */}
        {activeTab === 'investment' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-3.5 space-y-3 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Bunga Majemuk & Pertumbuhan Investasi
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Setoran Awal</label>
                  <input
                    type="number"
                    value={invPrincipal}
                    onChange={(e) => setInvPrincipal(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Setoran Rutin Bulanan</label>
                  <input
                    type="number"
                    value={invMonthly}
                    onChange={(e) => setInvMonthly(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Estimasi Imbal Hasil / Thn (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={invRate}
                    onChange={(e) => setInvRate(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Jangka Waktu (Tahun)</label>
                  <input
                    type="number"
                    value={invYears}
                    onChange={(e) => setInvYears(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
              </div>

              {/* Investment Result Card */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-[var(--border-subtle)]">
                  <span className="text-xs text-green-600 dark:text-green-400 font-semibold">Nilai Akhir (Future Value)</span>
                  <span className="text-base font-bold text-green-600 dark:text-green-400 font-mono">{fmtInt(invResult.futureValue)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                  <span>Total Modal Disetor:</span>
                  <span className="font-mono text-[var(--text-primary)] font-medium">{fmtInt(invResult.totalDeposited)}</span>
                </div>
                <div className="flex justify-between text-xs text-[var(--text-secondary)]">
                  <span>Total Keuntungan Bunga:</span>
                  <span className="font-mono text-green-600 dark:text-green-400 font-semibold">+{fmtInt(invResult.totalInterest)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BUSINESS TAB --- */}
        {activeTab === 'business' && (
          <div className="space-y-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-card)] rounded-xl p-3.5 space-y-3 shadow-sm">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Margin Laba & Markup
              </span>
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Pendapatan / Harga Jual</label>
                  <input
                    type="number"
                    value={bizRevenue}
                    onChange={(e) => setBizRevenue(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
                <div>
                  <label className="text-[var(--text-secondary)] block mb-1 font-medium">Harga Pokok Penjualan (HPP / Biaya)</label>
                  <input
                    type="number"
                    value={bizCost}
                    onChange={(e) => setBizCost(Number(e.target.value))}
                    className="w-full bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-lg px-2.5 py-1.5 text-[var(--text-primary)] font-mono focus:outline-none focus:border-dsln-accent focus:ring-1 focus:ring-dsln-accent transition"
                  />
                </div>
              </div>

              {/* Business Result Card */}
              <div className="p-3.5 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[10px] text-[var(--text-muted)]">Laba Kotor</div>
                  <div className="text-sm font-bold text-[var(--text-primary)] font-mono">{fmtInt(bizResult.profit)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-dsln-accent">Margin Laba</div>
                  <div className="text-sm font-bold text-dsln-accent font-mono">{bizResult.profitMargin.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-green-600 dark:text-green-400">Markup</div>
                  <div className="text-sm font-bold text-green-600 dark:text-green-400 font-mono">{bizResult.markup.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

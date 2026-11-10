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
      <div className="grid grid-cols-4 gap-1 p-1 bg-black/20 rounded-lg border border-white/10">
        <button
          onClick={() => setActiveTab('stock')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'stock' ? 'bg-dsln-accent text-white shadow-sm' : 'text-white/60 hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Stock</span>
        </button>
        <button
          onClick={() => setActiveTab('loan')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'loan' ? 'bg-dsln-accent text-white shadow-sm' : 'text-white/60 hover:text-white'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Loan / KPR</span>
        </button>
        <button
          onClick={() => setActiveTab('investment')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'investment' ? 'bg-dsln-accent text-white shadow-sm' : 'text-white/60 hover:text-white'
          }`}
        >
          <PiggyBank className="w-3.5 h-3.5" />
          <span>Investment</span>
        </button>
        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center justify-center space-x-1.5 py-1.5 rounded-md text-xs font-semibold transition ${
            activeTab === 'business' ? 'bg-dsln-accent text-white shadow-sm' : 'text-white/60 hover:text-white'
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Business</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {/* --- STOCK TAB --- */}
        {activeTab === 'stock' && (
          <div className="space-y-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Average Down Calculator
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-white/60 block mb-1">Initial Shares (Lot/Lembar)</label>
                  <input
                    type="number"
                    value={initShares}
                    onChange={(e) => setInitShares(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Initial Buy Price</label>
                  <input
                    type="number"
                    value={initPrice}
                    onChange={(e) => setInitPrice(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Additional Shares</label>
                  <input
                    type="number"
                    value={addShares}
                    onChange={(e) => setAddShares(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Additional Buy Price</label>
                  <input
                    type="number"
                    value={addPrice}
                    onChange={(e) => setAddPrice(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
              </div>

              {/* Result Summary Card */}
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[10px] text-white/50">Total Shares</div>
                  <div className="text-sm font-bold text-white font-mono">{fmtInt(avgDownResult.totalShares)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/50">Total Investment</div>
                  <div className="text-sm font-bold text-white font-mono">{fmtInt(avgDownResult.totalInvestment)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-dsln-accent">Average Price</div>
                  <div className="text-sm font-bold text-dsln-accent font-mono">{fmt(avgDownResult.averagePrice)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- LOAN TAB --- */}
        {activeTab === 'loan' && (
          <div className="space-y-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Loan & KPR Simulator
              </span>
              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-white/60 block mb-1">Total Loan Amount (Plafon Pinjaman)</label>
                  <input
                    type="number"
                    step="1000000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-white/60 block mb-1">Interest Rate / Thn (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 block mb-1">Tenure (Years)</label>
                    <input
                      type="number"
                      value={loanTenureYears}
                      onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Result Card */}
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2">
                <div className="flex justify-between items-center pb-1 border-b border-white/10">
                  <span className="text-xs text-dsln-accent font-semibold">Monthly Installment (Cicilan/Bulan)</span>
                  <span className="text-base font-bold text-dsln-accent font-mono">{fmtInt(loanResult.monthlyInstallment)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Total Interest Paid:</span>
                  <span className="font-mono text-white">{fmtInt(loanResult.totalInterest)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Total Payment (Pokok + Bunga):</span>
                  <span className="font-mono text-white">{fmtInt(loanResult.totalPayment)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- INVESTMENT TAB --- */}
        {activeTab === 'investment' && (
          <div className="space-y-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Compound Interest & Growth
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-white/60 block mb-1">Initial Deposit</label>
                  <input
                    type="number"
                    value={invPrincipal}
                    onChange={(e) => setInvPrincipal(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Monthly Deposit</label>
                  <input
                    type="number"
                    value={invMonthly}
                    onChange={(e) => setInvMonthly(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Annual Return (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={invRate}
                    onChange={(e) => setInvRate(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Period (Years)</label>
                  <input
                    type="number"
                    value={invYears}
                    onChange={(e) => setInvYears(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
              </div>

              {/* Investment Result Card */}
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 space-y-2">
                <div className="flex justify-between items-center pb-1 border-b border-white/10">
                  <span className="text-xs text-green-400 font-semibold">Future Value (Hasil Akhir)</span>
                  <span className="text-base font-bold text-green-400 font-mono">{fmtInt(invResult.futureValue)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Total Capital Deposited:</span>
                  <span className="font-mono text-white">{fmtInt(invResult.totalDeposited)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/70">
                  <span>Total Interest Earned (Keuntungan):</span>
                  <span className="font-mono text-green-300">+{fmtInt(invResult.totalInterest)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- BUSINESS TAB --- */}
        {activeTab === 'business' && (
          <div className="space-y-3">
            <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-dsln-accent">
                Profit Margin & Markup
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="text-white/60 block mb-1">Revenue / Selling Price</label>
                  <input
                    type="number"
                    value={bizRevenue}
                    onChange={(e) => setBizRevenue(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Cost of Goods (HPP / Biaya)</label>
                  <input
                    type="number"
                    value={bizCost}
                    onChange={(e) => setBizCost(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono focus:outline-none focus:border-dsln-accent"
                  />
                </div>
              </div>

              {/* Business Result Card */}
              <div className="p-3 rounded-lg bg-black/30 border border-white/10 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[10px] text-white/50">Gross Profit</div>
                  <div className="text-sm font-bold text-white font-mono">{fmtInt(bizResult.profit)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-dsln-accent">Profit Margin</div>
                  <div className="text-sm font-bold text-dsln-accent font-mono">{bizResult.profitMargin.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-[10px] text-green-400">Markup</div>
                  <div className="text-sm font-bold text-green-400 font-mono">{bizResult.markup.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

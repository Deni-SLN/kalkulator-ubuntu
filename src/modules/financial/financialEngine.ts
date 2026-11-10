// --- Stock Calculator ---
export interface AverageDownInput {
  initialShares: number;
  initialPrice: number;
  additionalShares: number;
  additionalPrice: number;
}

export interface AverageDownResult {
  totalShares: number;
  totalInvestment: number;
  averagePrice: number;
}

export function calculateAverageDown(input: AverageDownInput): AverageDownResult {
  const s1 = Math.max(0, input.initialShares || 0);
  const p1 = Math.max(0, input.initialPrice || 0);
  const s2 = Math.max(0, input.additionalShares || 0);
  const p2 = Math.max(0, input.additionalPrice || 0);

  const totalShares = s1 + s2;
  const totalInvestment = s1 * p1 + s2 * p2;
  const averagePrice = totalShares > 0 ? totalInvestment / totalShares : 0;

  return { totalShares, totalInvestment, averagePrice };
}

export function calculateStockPnL(shares: number, buyPrice: number, currentPrice: number) {
  const totalCost = shares * buyPrice;
  const marketValue = shares * currentPrice;
  const pnl = marketValue - totalCost;
  const pnlPercent = totalCost > 0 ? (pnl / totalCost) * 100 : 0;

  return { totalCost, marketValue, pnl, pnlPercent };
}

export function calculateDividendYield(dividendPerShare: number, stockPrice: number): number {
  if (stockPrice <= 0) return 0;
  return (dividendPerShare / stockPrice) * 100;
}

// --- Loan / KPR Calculator ---
export interface LoanResult {
  monthlyInstallment: number;
  totalPayment: number;
  totalInterest: number;
}

export function calculateLoan(amount: number, annualRatePercent: number, tenureMonths: number): LoanResult {
  if (amount <= 0 || tenureMonths <= 0) {
    return { monthlyInstallment: 0, totalPayment: 0, totalInterest: 0 };
  }

  const monthlyRate = (annualRatePercent / 100) / 12;
  if (monthlyRate === 0) {
    const monthlyInstallment = amount / tenureMonths;
    return {
      monthlyInstallment,
      totalPayment: amount,
      totalInterest: 0,
    };
  }

  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyInstallment = amount * ((monthlyRate * factor) / (factor - 1));
  const totalPayment = monthlyInstallment * tenureMonths;
  const totalInterest = totalPayment - amount;

  return { monthlyInstallment, totalPayment, totalInterest };
}

// --- Investment Calculator ---
export function calculateCompoundInterest(
  principal: number,
  monthlyDeposit: number,
  annualRatePercent: number,
  years: number
) {
  const r = (annualRatePercent / 100) / 12;
  const n = years * 12;

  let total = principal;
  let totalDeposited = principal;

  for (let i = 0; i < n; i++) {
    total = total * (1 + r) + monthlyDeposit;
    totalDeposited += monthlyDeposit;
  }

  const totalInterest = total - totalDeposited;
  return { futureValue: total, totalDeposited, totalInterest };
}

export function calculateCAGR(beginningValue: number, endingValue: number, years: number): number {
  if (beginningValue <= 0 || years <= 0) return 0;
  return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
}

export function calculateROI(gain: number, cost: number): number {
  if (cost <= 0) return 0;
  return ((gain - cost) / cost) * 100;
}

// --- Business Calculator ---
export function calculateMargin(revenue: number, cost: number) {
  const profit = revenue - cost;
  const profitMargin = revenue > 0 ? (profit / revenue) * 100 : 0;
  const markup = cost > 0 ? (profit / cost) * 100 : 0;
  return { profit, profitMargin, markup };
}

export function calculateBEP(fixedCosts: number, unitPrice: number, variableCostPerUnit: number): number {
  const contributionMargin = unitPrice - variableCostPerUnit;
  if (contributionMargin <= 0) return 0;
  return fixedCosts / contributionMargin;
}

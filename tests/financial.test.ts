import { describe, it, expect } from 'vitest';
import {
  calculateAverageDown,
  calculateLoan,
  calculateMargin,
  calculateCompoundInterest,
} from '../src/modules/financial/financialEngine';

describe('Financial Calculator Engine', () => {
  it('calculates Average Down matching PRD Section 6.2 example exactly', () => {
    const res = calculateAverageDown({
      initialShares: 100,
      initialPrice: 200,
      additionalShares: 100,
      additionalPrice: 150,
    });

    expect(res.totalShares).toBe(200);
    expect(res.totalInvestment).toBe(35000);
    expect(res.averagePrice).toBe(175);
  });

  it('calculates Loan / KPR monthly installment', () => {
    // 100,000,000 at 12% annual rate for 12 months (1 year)
    const res = calculateLoan(100000000, 12, 12);
    expect(res.monthlyInstallment).toBeCloseTo(8884878.87, 0);
    expect(res.totalPayment).toBeGreaterThan(100000000);
    expect(res.totalInterest).toBe(res.totalPayment - 100000000);
  });

  it('calculates Gross Profit, Margin and Markup', () => {
    const res = calculateMargin(200, 150);
    expect(res.profit).toBe(50);
    expect(res.profitMargin).toBe(25); // 50 / 200 = 25%
    expect(res.markup).toBeCloseTo(33.33, 1); // 50 / 150 = 33.33%
  });

  it('calculates Compound Interest over multiple years', () => {
    const res = calculateCompoundInterest(10000000, 0, 10, 1);
    expect(res.futureValue).toBeGreaterThan(11000000);
    expect(res.totalDeposited).toBe(10000000);
  });
});

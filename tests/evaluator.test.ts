import { describe, it, expect } from 'vitest';
import { evaluateExpression } from '../src/engine/evaluator';

describe('Calculator Evaluator', () => {
  it('handles basic arithmetic', () => {
    expect(evaluateExpression('10 + 20').value).toBe('30');
    expect(evaluateExpression('50 - 15').value).toBe('35');
    expect(evaluateExpression('6 * 7').value).toBe('42');
    expect(evaluateExpression('100 / 4').value).toBe('25');
  });

  it('handles operator precedence and parentheses', () => {
    expect(evaluateExpression('2 + 3 * 4').value).toBe('14');
    expect(evaluateExpression('(2 + 3) * 4').value).toBe('20');
  });

  it('handles percentages as in Windows 11 Calculator PRD', () => {
    // PRD Section 5.1: 1000000 + 25% => 1,250,000
    expect(evaluateExpression('1000000 + 25%').value).toBe('1250000');
    expect(evaluateExpression('100 - 20%').value).toBe('80');
    expect(evaluateExpression('200 * 10%').value).toBe('20');
  });

  it('handles division by zero', () => {
    const res = evaluateExpression('50 / 0');
    expect(res.success).toBe(false);
    expect(res.error).toBe('Cannot divide by zero');
  });

  it('handles scientific functions with DEG angle mode', () => {
    const sin90 = evaluateExpression('sin(90)', 'deg');
    expect(sin90.success).toBe(true);
    expect(Number(sin90.value)).toBeCloseTo(1, 6);

    const cos0 = evaluateExpression('cos(0)', 'deg');
    expect(cos0.success).toBe(true);
    expect(Number(cos0.value)).toBeCloseTo(1, 6);
  });

  it('handles scientific functions with RAD angle mode', () => {
    const sinPi2 = evaluateExpression('sin(pi / 2)', 'rad');
    expect(sinPi2.success).toBe(true);
    expect(Number(sinPi2.value)).toBeCloseTo(1, 6);
  });

  it('handles roots and powers', () => {
    expect(evaluateExpression('sqrt(16)').value).toBe('4');
    expect(evaluateExpression('cbrt(27)').value).toBe('3');
    expect(evaluateExpression('2 ^ 4').value).toBe('16');
  });
});

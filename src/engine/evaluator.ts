import { create, all } from 'mathjs';
import { AngleMode } from '@/types/calculator';

// Create a restricted mathjs instance for secure expression evaluation
const math = create(all);

export interface EvaluationResult {
  success: boolean;
  value?: string;
  numericValue?: number;
  error?: string;
}

/**
 * Preprocess math expression:
 * - Replace unicode symbols (×, ÷, −, π)
 * - Handle percentage syntax compatible with Windows 11 calculator
 * - Handle angle conversions for trig functions when in DEG or GRAD mode
 */
export function preprocessExpression(expr: string, angleMode: AngleMode = 'deg'): string {
  let cleaned = expr
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, 'pi');

  // If thousand dots are present (e.g. 1.000.000), strip dots if followed by 3 digits and another dot or end of number
  cleaned = cleaned.replace(/(\d{1,3})\.(\d{3})\.(\d{3})/g, '$1$2$3');
  cleaned = cleaned.replace(/(\d{1,3})\.(\d{3})(?!\d|\.)/g, '$1$2');

  // Handle Indonesian comma decimal format: e.g. "12,5" -> "12.5"
  cleaned = cleaned.replace(/(\d+),(\d+)/g, '$1.$2');

  // Handle percentage: e.g., "1000 + 25%" -> "1000 + (1000 * 25 / 100)"
  // or "1000 - 20%" -> "1000 - (1000 * 20 / 100)"
  // or "100 * 50%" -> "100 * (50 / 100)"
  // or standalone "50%" -> "(50 / 100)"
  cleaned = cleaned.replace(/([\d.]+)\s*([\+\-])\s*([\d.]+)%/g, '($1 $2 ($1 * $3 / 100))');
  cleaned = cleaned.replace(/([\d.]+)\s*([\*\/])\s*([\d.]+)%/g, '($1 $2 ($3 / 100))');
  cleaned = cleaned.replace(/([\d.]+)%/g, '($1 / 100)');

  // Handle angle conversions for trig functions
  if (angleMode === 'deg') {
    // deg to rad: x * (pi / 180) for sin, cos, tan
    cleaned = cleaned.replace(/\bsin\(([^)]+)\)/g, 'sin(($1) * pi / 180)');
    cleaned = cleaned.replace(/\bcos\(([^)]+)\)/g, 'cos(($1) * pi / 180)');
    cleaned = cleaned.replace(/\btan\(([^)]+)\)/g, 'tan(($1) * pi / 200)'); // tan
    cleaned = cleaned.replace(/\btan\(([^)]+)\* pi \/ 200\)/g, 'tan(($1) * pi / 180)');
    // rad to deg for inverse trig: asin, acos, atan
    cleaned = cleaned.replace(/\basin\(([^)]+)\)/g, '(asin($1) * 180 / pi)');
    cleaned = cleaned.replace(/\bacos\(([^)]+)\)/g, '(acos($1) * 180 / pi)');
    cleaned = cleaned.replace(/\batan\(([^)]+)\)/g, '(atan($1) * 180 / pi)');
  } else if (angleMode === 'grad') {
    // grad to rad: x * (pi / 200)
    cleaned = cleaned.replace(/\bsin\(([^)]+)\)/g, 'sin(($1) * pi / 200)');
    cleaned = cleaned.replace(/\bcos\(([^)]+)\)/g, 'cos(($1) * pi / 200)');
    cleaned = cleaned.replace(/\btan\(([^)]+)\)/g, 'tan(($1) * pi / 200)');
    // rad to grad for inverse trig
    cleaned = cleaned.replace(/\basin\(([^)]+)\)/g, '(asin($1) * 200 / pi)');
    cleaned = cleaned.replace(/\bacos\(([^)]+)\)/g, '(acos($1) * 200 / pi)');
    cleaned = cleaned.replace(/\batan\(([^)]+)\)/g, '(atan($1) * 200 / pi)');
  }

  return cleaned;
}

/**
 * Safely evaluate a math expression string
 */
export function evaluateExpression(expr: string, angleMode: AngleMode = 'deg'): EvaluationResult {
  if (!expr || expr.trim() === '') {
    return { success: false, error: 'Empty expression' };
  }

  try {
    const preprocessed = preprocessExpression(expr, angleMode);

    // Prevent direct division by zero check
    if (/\/(\s*)0(?!\d|\.)/.test(preprocessed)) {
      return { success: false, error: 'Cannot divide by zero' };
    }

    const compiled = math.compile(preprocessed);
    const scope = {
      ln: (x: number) => Math.log(x),
      fact: (x: number) => {
        if (x < 0) throw new Error('Invalid factorial');
        if (x === 0 || x === 1) return 1;
        let r = 1;
        for (let i = 2; i <= x; i++) r *= i;
        return r;
      }
    };

    const res = compiled.evaluate(scope);
    const num = typeof res === 'object' && res?.toNumber ? res.toNumber() : Number(res);

    if (isNaN(num)) {
      return { success: false, error: 'Invalid Expression' };
    }

    if (!isFinite(num)) {
      if (num === Infinity || num === -Infinity) {
        return { success: false, error: 'Cannot divide by zero' };
      }
      return { success: false, error: 'Overflow' };
    }

    // Format output string cleanly
    let formattedStr: string;
    if (Number.isInteger(num)) {
      formattedStr = num.toString();
    } else {
      // Round floating point inaccuracies (e.g. 0.1 + 0.2 = 0.30000000000000004)
      const rounded = Number(num.toPrecision(12));
      formattedStr = rounded.toString();
    }

    return {
      success: true,
      value: formattedStr,
      numericValue: num,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid Expression';
    if (message.toLowerCase().includes('divide by zero')) {
      return { success: false, error: 'Cannot divide by zero' };
    }
    return { success: false, error: 'Invalid Expression' };
  }
}

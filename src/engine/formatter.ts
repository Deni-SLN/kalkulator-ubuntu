import { NumberLocale } from '@/types/calculator';

/**
 * Format a numeric string or number with optional thousand separators and decimal limits.
 * In 'id-ID' mode: thousand separator is '.', decimal separator is ','
 * In 'en-US' mode: thousand separator is ',', decimal separator is '.'
 */
export function formatNumber(
  val: number | string,
  useThousands = true,
  maxDecimals = 10,
  locale: NumberLocale = 'id-ID'
): string {
  if (val === '' || val === null || val === undefined) return '';
  const str = String(val);

  // Handle special values
  if (str === 'Infinity' || str === '-Infinity') return 'Overflow';
  if (str === 'NaN') return 'Invalid Expression';

  const thousandSep = locale === 'id-ID' ? '.' : ',';
  const decimalSep = locale === 'id-ID' ? ',' : '.';

  // If it's in scientific notation (e.g. 1e+24)
  if (str.toLowerCase().includes('e')) {
    const num = Number(str);
    if (!isNaN(num)) {
      const expStr = num.toExponential(6).replace('e+', 'e');
      return locale === 'id-ID' ? expStr.replace('.', ',') : expStr;
    }
    return str;
  }

  // Handle input ending with decimal dot e.g. "125." -> "125,"
  const hasTrailingDecimal = str.endsWith('.');

  // Split integer and decimal parts
  const parts = str.split('.');
  let intPart = parts[0];
  let decPart = parts.length > 1 ? parts[1] : undefined;

  // Format integer part with thousands separator if requested
  if (useThousands) {
    const isNegative = intPart.startsWith('-');
    const digits = isNegative ? intPart.slice(1) : intPart;
    const formattedDigits = digits.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSep);
    intPart = isNegative ? `-${formattedDigits}` : formattedDigits;
  }

  if (hasTrailingDecimal) {
    return `${intPart}${decimalSep}`;
  }

  if (decPart !== undefined) {
    if (decPart.length > maxDecimals) {
      decPart = decPart.slice(0, maxDecimals);
    }
    return `${intPart}${decimalSep}${decPart}`;
  }

  return intPart;
}

/**
 * Format an expression for visual presentation on the calculator screen.
 */
export function formatExpression(rawExpr: string, locale: NumberLocale = 'id-ID'): string {
  if (!rawExpr) return '';
  let formatted = rawExpr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/(?<=\S)-(?=\S)/g, ' − ')
    .replace(/\s+/g, ' ')
    .trim();

  if (locale === 'id-ID') {
    // In ID locale, replace decimal point in numbers with comma for visual display
    formatted = formatted.replace(/(\d+)\.(\d+)/g, '$1,$2');
  }

  return formatted;
}

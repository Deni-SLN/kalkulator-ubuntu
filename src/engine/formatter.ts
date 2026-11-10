/**
 * Format a numeric string or number with optional thousand separators and decimal limits.
 */
export function formatNumber(
  val: number | string,
  useThousands = true,
  maxDecimals = 10
): string {
  if (val === '' || val === null || val === undefined) return '';
  const str = String(val);

  // Handle special values
  if (str === 'Infinity' || str === '-Infinity') return 'Overflow';
  if (str === 'NaN') return 'Invalid Expression';

  // If it's in scientific notation (e.g. 1e+24)
  if (str.toLowerCase().includes('e')) {
    const num = Number(str);
    if (!isNaN(num)) {
      return num.toExponential(6).replace('e+', 'e');
    }
    return str;
  }

  // Split integer and decimal parts
  const parts = str.split('.');
  let intPart = parts[0];
  let decPart = parts.length > 1 ? parts[1] : undefined;

  // Format integer part with thousands separator if requested
  if (useThousands) {
    const isNegative = intPart.startsWith('-');
    const digits = isNegative ? intPart.slice(1) : intPart;
    const formattedDigits = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    intPart = isNegative ? `-${formattedDigits}` : formattedDigits;
  }

  if (decPart !== undefined) {
    if (decPart.length > maxDecimals) {
      decPart = decPart.slice(0, maxDecimals);
    }
    return `${intPart}.${decPart}`;
  }

  return intPart;
}

/**
 * Format an expression for visual presentation on the calculator screen.
 */
export function formatExpression(rawExpr: string): string {
  if (!rawExpr) return '';
  return rawExpr
    .replace(/\*/g, ' × ')
    .replace(/\//g, ' ÷ ')
    .replace(/\+/g, ' + ')
    .replace(/(?<=\S)-(?=\S)/g, ' − ')
    .replace(/\s+/g, ' ')
    .trim();
}

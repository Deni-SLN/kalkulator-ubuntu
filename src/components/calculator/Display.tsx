import React, { useState } from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { formatNumber, formatExpression } from '@/engine/formatter';
import { Copy, Check, AlertCircle } from 'lucide-react';

export const Display: React.FC = () => {
  const { display, expression, previewResult, error } = useCalculatorStore();
  const { settings } = useSettingsStore();
  const [copied, setCopied] = useState(false);

  const formattedMainValue = formatNumber(
    display,
    settings.thousandsSeparator,
    settings.decimalPrecision,
    settings.numberFormat || 'id-ID'
  );

  const formattedPreview = previewResult
    ? formatNumber(
        previewResult,
        settings.thousandsSeparator,
        settings.decimalPrecision,
        settings.numberFormat || 'id-ID'
      )
    : null;

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Determine font size dynamically based on length of formatted string
  const getFontSizeClass = (len: number) => {
    if (len > 18) return 'text-2xl sm:text-3xl';
    if (len > 13) return 'text-3xl sm:text-4xl';
    if (len > 9) return 'text-4xl sm:text-5xl';
    return 'text-5xl sm:text-6xl';
  };

  return (
    <div className="relative px-5 py-3 flex flex-col justify-end text-right select-text group min-h-[140px]">
      {/* Copy button indicator */}
      <button
        onClick={handleCopy}
        title="Salin hasil (Ctrl+C)"
        className="absolute top-2 left-4 p-1.5 rounded-md bg-white/5 hover:bg-white/15 opacity-0 group-hover:opacity-100 transition-all text-white/60 hover:text-white"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      {/* Expression history / secondary display */}
      <div className="h-6 text-sm text-white/50 font-mono tracking-wide truncate">
        {formatExpression(expression, settings.numberFormat || 'id-ID')}
      </div>

      {/* Live preview line (if typing binary op) */}
      <div className="h-5 text-xs text-dsln-accent/80 font-mono font-medium">
        {formattedPreview && !error ? `= ${formattedPreview}` : ''}
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center justify-end space-x-1.5 text-red-400 text-sm font-medium py-1 animate-pulse">
          <AlertCircle className="w-4 h-4" />
          <span>
            {error === 'Cannot divide by zero'
              ? 'Tidak dapat membagi dengan nol'
              : error === 'Invalid Expression'
              ? 'Ekspresi Tidak Valid'
              : error === 'Empty expression'
              ? 'Ekspresi Kosong'
              : error}
          </span>
        </div>
      )}

      {/* Primary Display Number */}
      <div
        className={`font-semibold tracking-tight text-white transition-all font-sans break-all select-all ${getFontSizeClass(
          formattedMainValue.length
        )}`}
      >
        {formattedMainValue}
      </div>
    </div>
  );
};

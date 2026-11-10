import React from 'react';
import { Delete } from 'lucide-react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useSettingsStore } from '@/stores/settingsStore';

export const StandardKeypad: React.FC = () => {
  const {
    inputDigit,
    inputDecimal,
    inputOperator,
    inputFunction,
    percentage,
    negate,
    backspace,
    clearEntry,
    clearAll,
    calculate,
  } = useCalculatorStore();
  const { settings } = useSettingsStore();

  const decimalSeparator = settings.numberFormat === 'id-ID' ? ',' : '.';

  const numBtnClass =
    'h-12 rounded-lg bg-[var(--btn-num-bg)] hover:bg-[var(--btn-num-hover)] active:bg-[var(--btn-num-active)] text-[var(--btn-num-text)] font-semibold text-lg transition-all shadow-[var(--btn-num-shadow)] flex items-center justify-center border border-[var(--border-subtle)] active:scale-[0.98]';

  const opBtnClass =
    'h-12 rounded-lg bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] active:bg-[var(--btn-op-active)] text-[var(--btn-op-text)] font-medium text-base transition-all flex items-center justify-center border border-[var(--border-subtle)] active:scale-[0.98]';

  const accentBtnClass =
    'h-12 rounded-lg bg-dsln-accent hover:opacity-90 active:opacity-100 text-white font-semibold text-xl transition-all shadow-md flex items-center justify-center active:scale-[0.98]';

  return (
    <div className="grid grid-cols-4 gap-1.5 p-3 flex-1 select-none">
      {/* Row 0 */}
      <button onClick={percentage} className={opBtnClass} title="Persentase (%)">
        %
      </button>
      <button onClick={clearEntry} className={opBtnClass} title="Bersihkan Entri (Esc)">
        CE
      </button>
      <button onClick={clearAll} className={opBtnClass} title="Bersihkan Semua (Del)">
        C
      </button>
      <button onClick={backspace} className={opBtnClass} title="Hapus Terakhir (Backspace)">
        <Delete className="w-5 h-5" />
      </button>

      {/* Row 1 */}
      <button onClick={() => inputFunction('recip')} className={opBtnClass} title="Kebalikan (1/x)">
        1/x
      </button>
      <button onClick={() => inputFunction('sqr')} className={opBtnClass} title="Kuadrat (x²)">
        x²
      </button>
      <button onClick={() => inputFunction('sqrt')} className={opBtnClass} title="Akar Kuadrat (√x)">
        √x
      </button>
      <button onClick={() => inputOperator('÷')} className={opBtnClass} title="Bagi (/)">
        ÷
      </button>

      {/* Row 2 */}
      <button onClick={() => inputDigit('7')} className={numBtnClass}>
        7
      </button>
      <button onClick={() => inputDigit('8')} className={numBtnClass}>
        8
      </button>
      <button onClick={() => inputDigit('9')} className={numBtnClass}>
        9
      </button>
      <button onClick={() => inputOperator('×')} className={opBtnClass} title="Kali (*)">
        ×
      </button>

      {/* Row 3 */}
      <button onClick={() => inputDigit('4')} className={numBtnClass}>
        4
      </button>
      <button onClick={() => inputDigit('5')} className={numBtnClass}>
        5
      </button>
      <button onClick={() => inputDigit('6')} className={numBtnClass}>
        6
      </button>
      <button onClick={() => inputOperator('−')} className={opBtnClass} title="Kurang (-)">
        −
      </button>

      {/* Row 4 */}
      <button onClick={() => inputDigit('1')} className={numBtnClass}>
        1
      </button>
      <button onClick={() => inputDigit('2')} className={numBtnClass}>
        2
      </button>
      <button onClick={() => inputDigit('3')} className={numBtnClass}>
        3
      </button>
      <button onClick={() => inputOperator('+')} className={opBtnClass} title="Tambah (+)">
        +
      </button>

      {/* Row 5 */}
      <button onClick={negate} className={opBtnClass} title="Positif/Negatif (+/-)">
        +/-
      </button>
      <button onClick={() => inputDigit('0')} className={numBtnClass}>
        0
      </button>
      <button onClick={inputDecimal} className={numBtnClass} title="Titik desimal">
        {decimalSeparator}
      </button>
      <button onClick={calculate} className={accentBtnClass} title="Hitung Hasil (Enter)">
        =
      </button>
    </div>
  );
};

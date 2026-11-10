import React from 'react';
import { Delete } from 'lucide-react';
import { useCalculatorStore } from '@/stores/calculatorStore';

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

  const numBtnClass =
    'h-12 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.18] text-white font-medium text-lg transition-all shadow-sm flex items-center justify-center border border-white/5 active:scale-[0.98]';

  const opBtnClass =
    'h-12 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] active:bg-white/[0.14] text-white/90 font-medium text-base transition-all flex items-center justify-center border border-white/5 active:scale-[0.98]';

  const accentBtnClass =
    'h-12 rounded-lg bg-dsln-accent hover:opacity-90 active:opacity-100 text-white font-semibold text-xl transition-all shadow-md flex items-center justify-center active:scale-[0.98]';

  return (
    <div className="grid grid-cols-4 gap-1.5 p-3 flex-1 select-none">
      {/* Row 0 */}
      <button onClick={percentage} className={opBtnClass} title="Percentage (%)">
        %
      </button>
      <button onClick={clearEntry} className={opBtnClass} title="Clear Entry (Esc)">
        CE
      </button>
      <button onClick={clearAll} className={opBtnClass} title="Clear All (Del)">
        C
      </button>
      <button onClick={backspace} className={opBtnClass} title="Backspace">
        <Delete className="w-5 h-5 text-white/80" />
      </button>

      {/* Row 1 */}
      <button onClick={() => inputFunction('recip')} className={opBtnClass} title="Reciprocal (1/x)">
        1/x
      </button>
      <button onClick={() => inputFunction('sqr')} className={opBtnClass} title="Square (x²)">
        x²
      </button>
      <button onClick={() => inputFunction('sqrt')} className={opBtnClass} title="Square Root (√x)">
        √x
      </button>
      <button onClick={() => inputOperator('÷')} className={opBtnClass} title="Divide (/)">
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
      <button onClick={() => inputOperator('×')} className={opBtnClass} title="Multiply (*)">
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
      <button onClick={() => inputOperator('−')} className={opBtnClass} title="Subtract (-)">
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
      <button onClick={() => inputOperator('+')} className={opBtnClass} title="Add (+)">
        +
      </button>

      {/* Row 5 */}
      <button onClick={negate} className={opBtnClass} title="Positive/Negative (+/-)">
        +/-
      </button>
      <button onClick={() => inputDigit('0')} className={numBtnClass}>
        0
      </button>
      <button onClick={inputDecimal} className={numBtnClass} title="Decimal point">
        .
      </button>
      <button onClick={calculate} className={accentBtnClass} title="Calculate (Enter)">
        =
      </button>
    </div>
  );
};

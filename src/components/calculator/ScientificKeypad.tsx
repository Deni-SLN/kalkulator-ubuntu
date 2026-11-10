import React from 'react';
import { Delete } from 'lucide-react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { AngleMode } from '@/types/calculator';

export const ScientificKeypad: React.FC = () => {
  const {
    inputDigit,
    inputDecimal,
    inputOperator,
    inputParenthesis,
    inputFunction,
    negate,
    backspace,
    clearEntry,
    clearAll,
    calculate,
    angleMode,
    setAngleMode,
    isSecondActive,
    toggleSecond,
    isHypActive,
    toggleHyp,
  } = useCalculatorStore();
  const { settings } = useSettingsStore();

  const decimalSeparator = settings.numberFormat === 'id-ID' ? ',' : '.';

  const cycleAngleMode = () => {
    const modes: AngleMode[] = ['deg', 'rad', 'grad'];
    const nextIdx = (modes.indexOf(angleMode) + 1) % modes.length;
    setAngleMode(modes[nextIdx]);
  };

  const fnBtnClass =
    'h-10 rounded-md bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] active:bg-[var(--btn-op-active)] text-[var(--btn-op-text)] font-medium text-xs sm:text-sm transition-all flex items-center justify-center border border-[var(--border-subtle)] active:scale-[0.98]';

  const numBtnClass =
    'h-10 rounded-md bg-[var(--btn-num-bg)] hover:bg-[var(--btn-num-hover)] active:bg-[var(--btn-num-active)] text-[var(--btn-num-text)] font-semibold text-base transition-all flex items-center justify-center border border-[var(--border-subtle)] shadow-[var(--btn-num-shadow)] active:scale-[0.98]';

  const opBtnClass =
    'h-10 rounded-md bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] active:bg-[var(--btn-op-active)] text-[var(--btn-op-text)] font-medium text-base transition-all flex items-center justify-center border border-[var(--border-subtle)] active:scale-[0.98]';

  const accentBtnClass =
    'h-10 rounded-md bg-dsln-accent hover:opacity-90 active:opacity-100 text-white font-semibold text-lg transition-all shadow-md flex items-center justify-center active:scale-[0.98]';

  return (
    <div className="flex flex-col gap-1.5 p-3 flex-1 select-none">
      {/* Top Controls Row */}
      <div className="grid grid-cols-5 gap-1.5 pb-1">
        <button
          onClick={cycleAngleMode}
          className="h-8 rounded bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] text-[var(--btn-op-text)] text-xs font-semibold uppercase font-mono transition border border-[var(--border-subtle)]"
          title="Ganti Mode Sudut: DEG / RAD / GRAD"
        >
          {angleMode}
        </button>
        <button
          onClick={toggleSecond}
          className={`h-8 rounded text-xs font-semibold uppercase transition border border-[var(--border-subtle)] ${
            isSecondActive
              ? 'bg-dsln-accent text-white'
              : 'bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] text-[var(--btn-op-text)]'
          }`}
          title="Beralih fungsi sekunder (2nd)"
        >
          2nd
        </button>
        <button
          onClick={toggleHyp}
          className={`h-8 rounded text-xs font-semibold uppercase transition border border-[var(--border-subtle)] ${
            isHypActive
              ? 'bg-dsln-accent text-white'
              : 'bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] text-[var(--btn-op-text)]'
          }`}
          title="Beralih fungsi hiperbolik (hyp)"
        >
          hyp
        </button>
        <button
          onClick={clearEntry}
          className="h-8 rounded bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] text-xs font-semibold text-[var(--btn-op-text)] border border-[var(--border-subtle)]"
        >
          CE
        </button>
        <button
          onClick={clearAll}
          className="h-8 rounded bg-[var(--btn-op-bg)] hover:bg-[var(--btn-op-hover)] text-xs font-semibold text-[var(--btn-op-text)] border border-[var(--border-subtle)]"
        >
          C
        </button>
      </div>

      {/* Main 5-column Scientific Grid */}
      <div className="grid grid-cols-5 gap-1.5 flex-1">
        {/* Row 1 */}
        <button onClick={() => inputFunction(isSecondActive ? 'cube' : 'sqr')} className={fnBtnClass}>
          {isSecondActive ? 'x³' : 'x²'}
        </button>
        <button onClick={() => inputOperator('^')} className={fnBtnClass}>
          xʸ
        </button>
        <button onClick={() => inputFunction(isSecondActive ? 'asin' : 'sin')} className={fnBtnClass}>
          {isSecondActive ? 'sin⁻¹' : 'sin'}
        </button>
        <button onClick={() => inputFunction(isSecondActive ? 'acos' : 'cos')} className={fnBtnClass}>
          {isSecondActive ? 'cos⁻¹' : 'cos'}
        </button>
        <button onClick={() => inputFunction(isSecondActive ? 'atan' : 'tan')} className={fnBtnClass}>
          {isSecondActive ? 'tan⁻¹' : 'tan'}
        </button>

        {/* Row 2 */}
        <button onClick={() => inputFunction(isSecondActive ? 'cbrt' : 'sqrt')} className={fnBtnClass}>
          {isSecondActive ? '∛x' : '√x'}
        </button>
        <button onClick={() => inputFunction('exp10')} className={fnBtnClass}>
          10ˣ
        </button>
        <button onClick={() => inputFunction('log')} className={fnBtnClass}>
          log
        </button>
        <button onClick={() => inputFunction('expE')} className={fnBtnClass}>
          eˣ
        </button>
        <button onClick={() => inputFunction('ln')} className={fnBtnClass}>
          ln
        </button>

        {/* Row 3 */}
        <button onClick={() => inputFunction('recip')} className={fnBtnClass}>
          1/x
        </button>
        <button onClick={() => inputFunction('pi')} className={fnBtnClass}>
          π
        </button>
        <button onClick={() => inputFunction('e')} className={fnBtnClass}>
          e
        </button>
        <button onClick={() => inputParenthesis('(')} className={fnBtnClass}>
          (
        </button>
        <button onClick={() => inputParenthesis(')')} className={fnBtnClass}>
          )
        </button>

        {/* Row 4 */}
        <button onClick={() => inputFunction('fact')} className={fnBtnClass}>
          n!
        </button>
        <button onClick={() => inputDigit('7')} className={numBtnClass}>
          7
        </button>
        <button onClick={() => inputDigit('8')} className={numBtnClass}>
          8
        </button>
        <button onClick={() => inputDigit('9')} className={numBtnClass}>
          9
        </button>
        <button onClick={() => inputOperator('÷')} className={opBtnClass}>
          ÷
        </button>

        {/* Row 5 */}
        <button onClick={() => inputFunction('abs')} className={fnBtnClass}>
          |x|
        </button>
        <button onClick={() => inputDigit('4')} className={numBtnClass}>
          4
        </button>
        <button onClick={() => inputDigit('5')} className={numBtnClass}>
          5
        </button>
        <button onClick={() => inputDigit('6')} className={numBtnClass}>
          6
        </button>
        <button onClick={() => inputOperator('×')} className={opBtnClass}>
          ×
        </button>

        {/* Row 6 */}
        <button onClick={() => inputOperator('mod')} className={fnBtnClass}>
          mod
        </button>
        <button onClick={() => inputDigit('1')} className={numBtnClass}>
          1
        </button>
        <button onClick={() => inputDigit('2')} className={numBtnClass}>
          2
        </button>
        <button onClick={() => inputDigit('3')} className={numBtnClass}>
          3
        </button>
        <button onClick={() => inputOperator('−')} className={opBtnClass}>
          −
        </button>

        {/* Row 7 */}
        <button onClick={backspace} className={fnBtnClass} title="Hapus Terakhir (Backspace)">
          <Delete className="w-4 h-4" />
        </button>
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
    </div>
  );
};

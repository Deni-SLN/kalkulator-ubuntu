import React, { useState } from 'react';
import {
  WordSize,
  NumberBase,
  WORD_SIZE_BITS,
  maskToWordSize,
  formatBase,
  executeBitwiseOp,
} from './programmerEngine';
import { Delete, Cpu } from 'lucide-react';
import { formatNumber } from '@/engine/formatter';
import { useSettingsStore } from '@/stores/settingsStore';

export const ProgrammerView: React.FC = () => {
  const { settings } = useSettingsStore();
  const [val, setVal] = useState<bigint>(0n);
  const [activeBase, setActiveBase] = useState<NumberBase>('DEC');
  const [wordSize, setWordSize] = useState<WordSize>('QWORD');
  const [pendingOp, setPendingOp] = useState<'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'Lsh' | 'Rsh' | null>(null);
  const [savedVal, setSavedVal] = useState<bigint | null>(null);
  const [isResult, setIsResult] = useState<boolean>(false);

  const hexStr = formatBase(val, 'HEX', wordSize);
  const decStr = formatBase(val, 'DEC', wordSize);
  const octStr = formatBase(val, 'OCT', wordSize);
  const binStr = formatBase(val, 'BIN', wordSize);

  const handleInputDigit = (d: string) => {
    let currentRaw = isResult ? '' : formatBase(val, activeBase, wordSize);
    if (currentRaw === '0') currentRaw = '';
    const nextRaw = currentRaw + d;

    try {
      // Validate character
      const parsed = BigInt(
        activeBase === 'HEX' ? '0x' + nextRaw : activeBase === 'OCT' ? '0o' + nextRaw : activeBase === 'BIN' ? '0b' + nextRaw : nextRaw
      );
      setVal(maskToWordSize(parsed, wordSize));
      setIsResult(false);
    } catch {
      // ignore invalid input
    }
  };

  const handleBackspace = () => {
    if (isResult) {
      setVal(0n);
      setIsResult(false);
      return;
    }
    const currentRaw = formatBase(val, activeBase, wordSize);
    if (currentRaw.length <= 1) {
      setVal(0n);
    } else {
      const sliced = currentRaw.slice(0, -1);
      try {
        const parsed = BigInt(
          activeBase === 'HEX' ? '0x' + sliced : activeBase === 'OCT' ? '0o' + sliced : activeBase === 'BIN' ? '0b' + sliced : sliced
        );
        setVal(maskToWordSize(parsed, wordSize));
      } catch {
        setVal(0n);
      }
    }
  };

  const handleClear = () => {
    setVal(0n);
    setPendingOp(null);
    setSavedVal(null);
    setIsResult(false);
  };

  const handleOp = (op: 'AND' | 'OR' | 'XOR' | 'NAND' | 'NOR' | 'Lsh' | 'Rsh') => {
    if (savedVal !== null && pendingOp) {
      const res = executeBitwiseOp(savedVal, val, pendingOp, wordSize);
      setSavedVal(res);
      setVal(res);
    } else {
      setSavedVal(val);
    }
    setPendingOp(op);
    setIsResult(true);
  };

  const handleNot = () => {
    const inverted = maskToWordSize(~val, wordSize);
    setVal(inverted);
  };

  const handleEquals = () => {
    if (savedVal !== null && pendingOp) {
      const res = executeBitwiseOp(savedVal, val, pendingOp, wordSize);
      setVal(res);
      setSavedVal(null);
      setPendingOp(null);
      setIsResult(true);
    }
  };

  const toggleBit = (bitIndex: number) => {
    const bitMask = 1n << BigInt(bitIndex);
    const toggled = val ^ bitMask;
    setVal(maskToWordSize(toggled, wordSize));
  };

  const cycleWordSize = () => {
    const sizes: WordSize[] = ['QWORD', 'DWORD', 'WORD', 'BYTE'];
    const nextIdx = (sizes.indexOf(wordSize) + 1) % sizes.length;
    const nextSize = sizes[nextIdx];
    setWordSize(nextSize);
    setVal(maskToWordSize(val, nextSize));
  };

  // Button disabled logic based on active base
  const isHexDigitDisabled = (_d?: string) => {
    return activeBase !== 'HEX';
  };

  const isDecDigitDisabled = (d: string) => {
    const num = parseInt(d, 10);
    if (activeBase === 'BIN' && num > 1) return true;
    if (activeBase === 'OCT' && num > 7) return true;
    return false;
  };

  const numBtnClass = (disabled: boolean) =>
    `h-9 sm:h-10 rounded-md font-mono font-medium text-sm sm:text-base transition-all flex items-center justify-center border border-white/5 active:scale-[0.98] ${
      disabled
        ? 'opacity-20 cursor-not-allowed bg-white/[0.02] text-white/30'
        : 'bg-white/[0.07] hover:bg-white/[0.14] active:bg-white/[0.2] text-white shadow-sm'
    }`;

  const opBtnClass =
    'h-9 sm:h-10 rounded-md bg-white/[0.04] hover:bg-white/[0.1] active:bg-white/[0.16] text-white/90 font-mono font-medium text-xs sm:text-sm transition-all flex items-center justify-center border border-white/5 active:scale-[0.98]';

  const accentBtnClass =
    'h-9 sm:h-10 rounded-md bg-dsln-accent hover:opacity-90 active:opacity-100 text-white font-mono font-semibold text-base transition-all shadow-md flex items-center justify-center active:scale-[0.98]';

  // Render 64/32/16/8 bits visual grid
  const maxBits = WORD_SIZE_BITS[wordSize];
  const bits: boolean[] = [];
  for (let i = maxBits - 1; i >= 0; i--) {
    const bitVal = (val >> BigInt(i)) & 1n;
    bits.push(bitVal === 1n);
  }

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden select-none p-2 sm:p-3 space-y-2">
      {/* Top Bar: WordSize + Pending op */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={cycleWordSize}
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold transition"
          title="Click to cycle word size: QWORD (64) -> DWORD (32) -> WORD (16) -> BYTE (8)"
        >
          <Cpu className="w-3.5 h-3.5 text-dsln-accent" />
          <span>{wordSize} ({WORD_SIZE_BITS[wordSize]} bits)</span>
        </button>

        {pendingOp && (
          <div className="text-xs font-mono text-dsln-accent font-semibold px-2 py-0.5 rounded bg-dsln-accent/20">
            {savedVal !== null ? formatBase(savedVal, activeBase, wordSize) : ''} {pendingOp}
          </div>
        )}
      </div>

      {/* Base Conversions Panel (HEX, DEC, OCT, BIN) */}
      <div className="bg-black/20 rounded-lg border border-white/10 p-2 space-y-1">
        {(['HEX', 'DEC', 'OCT', 'BIN'] as NumberBase[]).map((base) => {
          const isActive = activeBase === base;
          const displayVal =
            base === 'HEX'
              ? hexStr
              : base === 'DEC'
              ? formatNumber(decStr, settings.thousandsSeparator, 0, settings.numberFormat)
              : base === 'OCT'
              ? octStr
              : binStr.replace(/(.{4})/g, '$1 ').trim();

          return (
            <div
              key={base}
              onClick={() => setActiveBase(base)}
              className={`flex items-center justify-between px-2.5 py-1 rounded cursor-pointer transition font-mono ${
                isActive
                  ? 'bg-dsln-accent/20 border-l-2 border-dsln-accent text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              <span className="text-[11px] font-bold w-10">{base}</span>
              <span className="text-xs sm:text-sm font-semibold truncate text-right flex-1 select-all">
                {displayVal || '0'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bit Toggle Grid (Interactive 64 bits) */}
      <div className="bg-black/10 rounded-lg p-2 border border-white/5">
        <div className="flex flex-wrap gap-1 justify-end max-h-16 overflow-y-auto">
          {bits.map((isOn, idx) => {
            const actualBitIndex = maxBits - 1 - idx;
            return (
              <button
                key={actualBitIndex}
                onClick={() => toggleBit(actualBitIndex)}
                className={`w-3.5 h-4 sm:w-4 sm:h-5 rounded text-[10px] font-mono flex items-center justify-center font-bold transition ${
                  isOn
                    ? 'bg-dsln-accent text-white shadow-sm'
                    : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/70'
                } ${actualBitIndex % 4 === 0 && actualBitIndex !== 0 ? 'mr-1' : ''}`}
                title={`Bit ${actualBitIndex}: ${isOn ? '1' : '0'} (click to toggle)`}
              >
                {isOn ? '1' : '0'}
              </button>
            );
          })}
        </div>
      </div>

      {/* Programmer Keypad */}
      <div className="grid grid-cols-6 gap-1 sm:gap-1.5 flex-1">
        {/* Row 1: Bitwise logic */}
        <button onClick={() => handleOp('Lsh')} className={opBtnClass} title="Left Shift">
          Lsh
        </button>
        <button onClick={() => handleOp('Rsh')} className={opBtnClass} title="Right Shift">
          Rsh
        </button>
        <button onClick={() => handleOp('AND')} className={opBtnClass} title="Bitwise AND">
          AND
        </button>
        <button onClick={() => handleOp('OR')} className={opBtnClass} title="Bitwise OR">
          OR
        </button>
        <button onClick={() => handleOp('XOR')} className={opBtnClass} title="Bitwise XOR">
          XOR
        </button>
        <button onClick={handleNot} className={opBtnClass} title="Bitwise NOT">
          NOT
        </button>

        {/* Row 2: Hex A-F & Controls */}
        <button
          disabled={isHexDigitDisabled('A')}
          onClick={() => handleInputDigit('A')}
          className={numBtnClass(isHexDigitDisabled('A'))}
        >
          A
        </button>
        <button
          disabled={isHexDigitDisabled('B')}
          onClick={() => handleInputDigit('B')}
          className={numBtnClass(isHexDigitDisabled('B'))}
        >
          B
        </button>
        <button onClick={() => handleOp('NAND')} className={opBtnClass} title="Bitwise NAND">
          NAND
        </button>
        <button onClick={() => handleOp('NOR')} className={opBtnClass} title="Bitwise NOR">
          NOR
        </button>
        <button onClick={handleClear} className={opBtnClass} title="Clear All">
          C
        </button>
        <button onClick={handleBackspace} className={opBtnClass} title="Backspace">
          <Delete className="w-4 h-4 text-white/80" />
        </button>

        {/* Row 3: C, D, 7, 8, 9, ( */}
        <button
          disabled={isHexDigitDisabled('C')}
          onClick={() => handleInputDigit('C')}
          className={numBtnClass(isHexDigitDisabled('C'))}
        >
          C
        </button>
        <button
          disabled={isHexDigitDisabled('D')}
          onClick={() => handleInputDigit('D')}
          className={numBtnClass(isHexDigitDisabled('D'))}
        >
          D
        </button>
        <button
          disabled={isDecDigitDisabled('7')}
          onClick={() => handleInputDigit('7')}
          className={numBtnClass(isDecDigitDisabled('7'))}
        >
          7
        </button>
        <button
          disabled={isDecDigitDisabled('8')}
          onClick={() => handleInputDigit('8')}
          className={numBtnClass(isDecDigitDisabled('8'))}
        >
          8
        </button>
        <button
          disabled={isDecDigitDisabled('9')}
          onClick={() => handleInputDigit('9')}
          className={numBtnClass(isDecDigitDisabled('9'))}
        >
          9
        </button>
        <button onClick={() => handleInputDigit('00')} className={opBtnClass}>
          00
        </button>

        {/* Row 4: E, F, 4, 5, 6, ) */}
        <button
          disabled={isHexDigitDisabled('E')}
          onClick={() => handleInputDigit('E')}
          className={numBtnClass(isHexDigitDisabled('E'))}
        >
          E
        </button>
        <button
          disabled={isHexDigitDisabled('F')}
          onClick={() => handleInputDigit('F')}
          className={numBtnClass(isHexDigitDisabled('F'))}
        >
          F
        </button>
        <button
          disabled={isDecDigitDisabled('4')}
          onClick={() => handleInputDigit('4')}
          className={numBtnClass(isDecDigitDisabled('4'))}
        >
          4
        </button>
        <button
          disabled={isDecDigitDisabled('5')}
          onClick={() => handleInputDigit('5')}
          className={numBtnClass(isDecDigitDisabled('5'))}
        >
          5
        </button>
        <button
          disabled={isDecDigitDisabled('6')}
          onClick={() => handleInputDigit('6')}
          className={numBtnClass(isDecDigitDisabled('6'))}
        >
          6
        </button>
        <button onClick={() => handleInputDigit('F')} className={opBtnClass} disabled={isHexDigitDisabled('F')}>
          0xF
        </button>

        {/* Row 5: 1, 2, 3, 0, = */}
        <button
          disabled={isDecDigitDisabled('1')}
          onClick={() => handleInputDigit('1')}
          className={numBtnClass(isDecDigitDisabled('1'))}
        >
          1
        </button>
        <button
          disabled={isDecDigitDisabled('2')}
          onClick={() => handleInputDigit('2')}
          className={numBtnClass(isDecDigitDisabled('2'))}
        >
          2
        </button>
        <button
          disabled={isDecDigitDisabled('3')}
          onClick={() => handleInputDigit('3')}
          className={numBtnClass(isDecDigitDisabled('3'))}
        >
          3
        </button>
        <button
          disabled={isDecDigitDisabled('0')}
          onClick={() => handleInputDigit('0')}
          className={numBtnClass(isDecDigitDisabled('0'))}
        >
          0
        </button>
        <button onClick={handleEquals} className={`${accentBtnClass} col-span-2`} title="Calculate Result">
          =
        </button>
      </div>
    </div>
  );
};

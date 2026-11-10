import { useEffect } from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useHistoryStore } from '@/stores/historyStore';

export function useKeyboardShortcuts(onOpenSettings: () => void) {
  const {
    inputDigit,
    inputDecimal,
    inputOperator,
    inputParenthesis,
    calculate,
    backspace,
    clearEntry,
    clearAll,
    display,
    setExpressionAndResult,
  } = useCalculatorStore();

  const { setIsOpen: setHistoryOpen, isOpen: isHistoryOpen } = useHistoryStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea (e.g. search bar or settings)
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      // Handle shortcuts with Ctrl
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'c' || e.key === 'C') {
          // Copy result
          navigator.clipboard.writeText(display);
          return;
        }
        if (e.key === 'v' || e.key === 'V') {
          // Paste
          navigator.clipboard.readText().then((clipText) => {
            if (clipText && /^[\d\s\+\-\*\/\.\(\)%e\^]+$/i.test(clipText.trim())) {
              setExpressionAndResult(clipText.trim(), clipText.trim());
            }
          });
          return;
        }
        if (e.key === 'h' || e.key === 'H') {
          e.preventDefault();
          setHistoryOpen(!isHistoryOpen);
          return;
        }
        if (e.key === ',') {
          e.preventDefault();
          onOpenSettings();
          return;
        }
        return;
      }

      // Numeric keys
      if (/^[0-9]$/.test(e.key)) {
        e.preventDefault();
        inputDigit(e.key);
        return;
      }

      // Operators
      if (e.key === '+') {
        e.preventDefault();
        inputOperator('+');
        return;
      }
      if (e.key === '-') {
        e.preventDefault();
        inputOperator('−');
        return;
      }
      if (e.key === '*') {
        e.preventDefault();
        inputOperator('×');
        return;
      }
      if (e.key === '/') {
        e.preventDefault();
        inputOperator('÷');
        return;
      }
      if (e.key === '%') {
        e.preventDefault();
        useCalculatorStore.getState().percentage();
        return;
      }

      // Decimal point
      if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        inputDecimal();
        return;
      }

      // Parentheses
      if (e.key === '(' || e.key === ')') {
        e.preventDefault();
        inputParenthesis(e.key);
        return;
      }

      // Calculate
      if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculate();
        return;
      }

      // Backspace
      if (e.key === 'Backspace') {
        e.preventDefault();
        backspace();
        return;
      }

      // Escape -> CE, Delete -> C
      if (e.key === 'Escape') {
        e.preventDefault();
        clearEntry();
        return;
      }
      if (e.key === 'Delete') {
        e.preventDefault();
        clearAll();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    display,
    isHistoryOpen,
    inputDigit,
    inputDecimal,
    inputOperator,
    inputParenthesis,
    calculate,
    backspace,
    clearEntry,
    clearAll,
    setExpressionAndResult,
    setHistoryOpen,
    onOpenSettings,
  ]);
}

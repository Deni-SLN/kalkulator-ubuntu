import { create } from 'zustand';
import { CalculatorMode, AngleMode } from '@/types/calculator';
import { evaluateExpression } from '@/engine/evaluator';
import { useHistoryStore } from './historyStore';
import { getMemory, saveMemory } from '@/database/storageAdapter';

interface CalculatorState {
  mode: CalculatorMode;
  display: string;
  expression: string;
  previewResult: string | null;
  error: string | null;
  memory: number;
  angleMode: AngleMode;
  isSecondActive: boolean;
  isHypActive: boolean;
  lastOperator: string | null;
  lastOperand: string | null;
  isResultDisplayed: boolean;

  // Actions
  setMode: (mode: CalculatorMode) => void;
  setAngleMode: (mode: AngleMode) => void;
  toggleSecond: () => void;
  toggleHyp: () => void;
  inputDigit: (digit: string) => void;
  inputDecimal: () => void;
  inputOperator: (op: string) => void;
  inputParenthesis: (p: '(' | ')') => void;
  inputFunction: (fn: string) => void;
  negate: () => void;
  percentage: () => void;
  backspace: () => void;
  clearEntry: () => void;
  clearAll: () => void;
  calculate: () => void;
  setExpressionAndResult: (expr: string, res: string) => void;

  // Memory Actions
  memoryClear: () => void;
  memoryRecall: () => void;
  memoryAdd: () => void;
  memorySubtract: () => void;
  memoryStore: () => void;
  initMemory: () => Promise<void>;
}

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  mode: 'standard',
  display: '0',
  expression: '',
  previewResult: null,
  error: null,
  memory: 0,
  angleMode: 'deg',
  isSecondActive: false,
  isHypActive: false,
  lastOperator: null,
  lastOperand: null,
  isResultDisplayed: false,

  initMemory: async () => {
    const mem = await getMemory();
    set({ memory: mem });
  },

  setMode: (mode) => set({ mode, error: null }),
  setAngleMode: (angleMode) => {
    set({ angleMode });
    // Update live preview if expression exists
    const { expression } = get();
    if (expression) {
      const res = evaluateExpression(expression, angleMode);
      if (res.success && res.value) {
        set({ previewResult: res.value });
      }
    }
  },
  toggleSecond: () => set((s) => ({ isSecondActive: !s.isSecondActive })),
  toggleHyp: () => set((s) => ({ isHypActive: !s.isHypActive })),

  inputDigit: (digit) => {
    const { display, isResultDisplayed, expression } = get();
    set({ error: null });

    if (isResultDisplayed) {
      set({
        display: digit,
        expression: '',
        previewResult: null,
        isResultDisplayed: false,
      });
      return;
    }

    const nextDisplay = display === '0' ? digit : display + digit;
    const nextExpr = expression === '0' || !expression ? digit : expression + digit;

    // Check live preview
    const res = evaluateExpression(nextExpr, get().angleMode);
    set({
      display: nextDisplay,
      expression: nextExpr,
      previewResult: res.success && res.value !== nextDisplay ? res.value : null,
    });
  },

  inputDecimal: () => {
    const { display, isResultDisplayed, expression } = get();
    set({ error: null });

    if (isResultDisplayed) {
      set({
        display: '0.',
        expression: '0.',
        previewResult: null,
        isResultDisplayed: false,
      });
      return;
    }

    // Check if the current number segment already has a decimal
    const segments = display.split(/[\+\−\×\÷\s\(\)]/);
    const lastSeg = segments[segments.length - 1];
    if (lastSeg.includes('.')) return;

    const nextDisplay = display + '.';
    const nextExpr = (expression || '0') + '.';
    set({
      display: nextDisplay,
      expression: nextExpr,
    });
  },

  inputOperator: (op) => {
    const { display, expression, isResultDisplayed, angleMode } = get();
    set({ error: null, isResultDisplayed: false });

    let baseExpr = expression;
    if (isResultDisplayed) {
      baseExpr = display;
    } else if (!baseExpr) {
      baseExpr = display || '0';
    }

    // If expression ends with an operator, replace it
    const trimmed = baseExpr.trim();
    if (/[\+\−\×\÷\^]$/.test(trimmed)) {
      const replaced = trimmed.slice(0, -1).trim() + ` ${op} `;
      set({ expression: replaced });
      return;
    }

    const nextExpr = `${trimmed} ${op} `;
    const res = evaluateExpression(trimmed, angleMode);
    set({
      expression: nextExpr,
      display: res.success && res.value ? res.value : display,
      previewResult: null,
    });
  },

  inputParenthesis: (p) => {
    const { expression } = get();
    set({ error: null });
    const next = expression ? `${expression} ${p} ` : `${p} `;
    set({ expression: next });
  },

  inputFunction: (fn) => {
    const { display, expression, angleMode } = get();
    set({ error: null });

    const currentNum = display || '0';

    switch (fn) {
      case 'sqr': { // x²
        const expr = `(${currentNum})^2`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        }
        break;
      }
      case 'cube': { // x³
        const expr = `(${currentNum})^3`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        }
        break;
      }
      case 'sqrt': { // √x
        const expr = `sqrt(${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        } else {
          set({ error: res.error || 'Invalid Expression' });
        }
        break;
      }
      case 'cbrt': { // ∛x
        const expr = `cbrt(${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        } else {
          set({ error: res.error || 'Invalid Expression' });
        }
        break;
      }
      case 'recip': { // 1/x
        const expr = `1 / (${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        } else {
          set({ error: res.error || 'Cannot divide by zero' });
        }
        break;
      }
      case 'fact': { // n!
        const expr = `fact(${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        } else {
          set({ error: res.error || 'Invalid Expression' });
        }
        break;
      }
      case 'abs': { // |x|
        const expr = `abs(${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        }
        break;
      }
      case 'exp10': { // 10^x
        const expr = `10^(${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        }
        break;
      }
      case 'expE': { // e^x
        const expr = `e^(${currentNum})`;
        const res = evaluateExpression(expr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: expr, isResultDisplayed: true });
        }
        break;
      }
      case 'pi': {
        set({ display: Math.PI.toString(), expression: expression + ' pi' });
        break;
      }
      case 'e': {
        set({ display: Math.E.toString(), expression: expression + ' e' });
        break;
      }
      default: {
        // Generic functions like sin, cos, tan, asin, acos, atan, log, ln, log2
        const nextExpr = expression ? `${expression} ${fn}(${currentNum})` : `${fn}(${currentNum})`;
        const res = evaluateExpression(nextExpr, angleMode);
        if (res.success && res.value) {
          set({ display: res.value, expression: nextExpr, isResultDisplayed: true });
        } else {
          set({ error: res.error || 'Invalid Expression' });
        }
        break;
      }
    }
  },

  negate: () => {
    const { display, expression } = get();
    if (display === '0') return;

    if (display.startsWith('-')) {
      const positive = display.slice(1);
      set({
        display: positive,
        expression: expression.replace(new RegExp(`-${display.slice(1)}$`), positive),
      });
    } else {
      const negative = `-${display}`;
      set({
        display: negative,
        expression: expression ? `${expression.slice(0, -display.length)}${negative}` : negative,
      });
    }
  },

  percentage: () => {
    const { display, expression, angleMode } = get();
    const nextExpr = expression ? `${expression}%` : `${display}%`;
    const res = evaluateExpression(nextExpr, angleMode);
    if (res.success && res.value) {
      set({
        expression: nextExpr,
        display: res.value,
        previewResult: null,
      });
    } else {
      set({ error: res.error || 'Invalid Expression' });
    }
  },

  backspace: () => {
    const { display, expression, isResultDisplayed } = get();
    if (isResultDisplayed) {
      set({ display: '0', expression: '', previewResult: null, isResultDisplayed: false });
      return;
    }

    if (display.length <= 1 || (display.length === 2 && display.startsWith('-'))) {
      set({ display: '0' });
    } else {
      set({ display: display.slice(0, -1) });
    }

    if (expression.length > 0) {
      set({ expression: expression.slice(0, -1).trimEnd() });
    }
  },

  clearEntry: () => {
    set({ display: '0', error: null });
  },

  clearAll: () => {
    set({
      display: '0',
      expression: '',
      previewResult: null,
      error: null,
      isResultDisplayed: false,
    });
  },

  calculate: () => {
    const { expression, display, angleMode, mode } = get();
    const exprToEval = expression.trim() || display;

    if (!exprToEval) return;

    const res = evaluateExpression(exprToEval, angleMode);
    if (res.success && res.value) {
      // Record history
      useHistoryStore.getState().addHistory(exprToEval, res.value, mode);

      set({
        display: res.value,
        expression: `${exprToEval} =`,
        previewResult: null,
        error: null,
        isResultDisplayed: true,
      });
    } else {
      set({
        error: res.error || 'Invalid Expression',
        previewResult: null,
      });
    }
  },

  setExpressionAndResult: (expr, res) => {
    set({
      expression: expr,
      display: res,
      error: null,
      previewResult: null,
      isResultDisplayed: true,
    });
  },

  // Memory Operations
  memoryClear: () => {
    set({ memory: 0 });
    saveMemory(0);
  },

  memoryRecall: () => {
    const { memory } = get();
    set({
      display: memory.toString(),
      isResultDisplayed: false,
    });
  },

  memoryAdd: () => {
    const { memory, display } = get();
    const num = parseFloat(display) || 0;
    const updated = memory + num;
    set({ memory: updated });
    saveMemory(updated);
  },

  memorySubtract: () => {
    const { memory, display } = get();
    const num = parseFloat(display) || 0;
    const updated = memory - num;
    set({ memory: updated });
    saveMemory(updated);
  },

  memoryStore: () => {
    const { display } = get();
    const num = parseFloat(display) || 0;
    set({ memory: num });
    saveMemory(num);
  },
}));

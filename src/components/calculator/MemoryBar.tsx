import React from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const MemoryBar: React.FC = () => {
  const { memory, memoryClear, memoryRecall, memoryAdd, memorySubtract, memoryStore } =
    useCalculatorStore();

  const hasMemory = memory !== 0;

  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/5 select-none">
      <div className="flex items-center space-x-1 sm:space-x-2 text-xs">
        <button
          disabled={!hasMemory}
          onClick={memoryClear}
          className={`px-2.5 py-1 rounded transition-colors font-medium ${
            hasMemory
              ? 'text-white/80 hover:bg-white/10 active:bg-white/15'
              : 'text-white/20 cursor-not-allowed'
          }`}
          title="Memory Clear"
        >
          MC
        </button>
        <button
          disabled={!hasMemory}
          onClick={memoryRecall}
          className={`px-2.5 py-1 rounded transition-colors font-medium ${
            hasMemory
              ? 'text-white/80 hover:bg-white/10 active:bg-white/15'
              : 'text-white/20 cursor-not-allowed'
          }`}
          title="Memory Recall"
        >
          MR
        </button>
        <button
          onClick={memoryAdd}
          className="px-2.5 py-1 rounded text-white/80 hover:bg-white/10 active:bg-white/15 transition-colors font-medium"
          title="Memory Add"
        >
          M+
        </button>
        <button
          onClick={memorySubtract}
          className="px-2.5 py-1 rounded text-white/80 hover:bg-white/10 active:bg-white/15 transition-colors font-medium"
          title="Memory Subtract"
        >
          M-
        </button>
        <button
          onClick={memoryStore}
          className="px-2.5 py-1 rounded text-white/80 hover:bg-white/10 active:bg-white/15 transition-colors font-medium"
          title="Memory Store"
        >
          MS
        </button>
      </div>

      {hasMemory && (
        <div
          title={`Stored in Memory: ${memory}`}
          className="text-[10px] font-mono px-2 py-0.5 rounded bg-dsln-accent/20 text-dsln-accent font-semibold border border-dsln-accent/30"
        >
          M: {memory}
        </div>
      )}
    </div>
  );
};

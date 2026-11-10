import React from 'react';
import { useCalculatorStore } from '@/stores/calculatorStore';

export const MemoryBar: React.FC = () => {
  const { memory, memoryClear, memoryRecall, memoryAdd, memorySubtract, memoryStore } =
    useCalculatorStore();

  const hasMemory = memory !== 0;

  return (
    <div className="flex items-center justify-between px-4 py-1.5 border-b border-[var(--border-subtle)] select-none">
      <div className="flex items-center space-x-1 sm:space-x-2 text-xs">
        <button
          disabled={!hasMemory}
          onClick={memoryClear}
          className={`px-2.5 py-1 rounded transition-colors font-medium ${
            hasMemory
              ? 'text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)]'
              : 'text-[var(--text-muted)] opacity-40 cursor-not-allowed'
          }`}
          title="Bersihkan Memori (MC)"
        >
          MC
        </button>
        <button
          disabled={!hasMemory}
          onClick={memoryRecall}
          className={`px-2.5 py-1 rounded transition-colors font-medium ${
            hasMemory
              ? 'text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)]'
              : 'text-[var(--text-muted)] opacity-40 cursor-not-allowed'
          }`}
          title="Panggil Nilai Memori (MR)"
        >
          MR
        </button>
        <button
          onClick={memoryAdd}
          className="px-2.5 py-1 rounded text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)] transition-colors font-medium"
          title="Tambah ke Memori (M+)"
        >
          M+
        </button>
        <button
          onClick={memorySubtract}
          className="px-2.5 py-1 rounded text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)] transition-colors font-medium"
          title="Kurang dari Memori (M-)"
        >
          M-
        </button>
        <button
          onClick={memoryStore}
          className="px-2.5 py-1 rounded text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)] transition-colors font-medium"
          title="Simpan Nilai ke Memori (MS)"
        >
          MS
        </button>
      </div>

      {hasMemory && (
        <div
          title={`Tersimpan di Memori: ${memory}`}
          className="text-[10px] font-mono px-2 py-0.5 rounded bg-dsln-accent/15 text-dsln-accent font-semibold border border-dsln-accent/30"
        >
          M: {memory}
        </div>
      )}
    </div>
  );
};

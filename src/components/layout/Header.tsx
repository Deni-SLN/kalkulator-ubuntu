import React from 'react';
import { Menu, History, Settings, Minus, Square, X } from 'lucide-react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useHistoryStore } from '@/stores/historyStore';
import { AngleMode } from '@/types/calculator';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onOpenSettings }) => {
  const { mode, angleMode, setAngleMode } = useCalculatorStore();
  const { isOpen: isHistoryOpen, setIsOpen: setHistoryOpen } = useHistoryStore();

  const handleMinimize = async () => {
    try {
      if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        getCurrentWindow().minimize();
      }
    } catch (e) {
      console.log('Window minimize fallback');
    }
  };

  const handleMaximize = async () => {
    try {
      if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        getCurrentWindow().toggleMaximize();
      }
    } catch (e) {
      console.log('Window maximize fallback');
    }
  };

  const handleClose = async () => {
    try {
      if (typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window) {
        const { getCurrentWindow } = await import('@tauri-apps/api/window');
        getCurrentWindow().close();
      }
    } catch (e) {
      console.log('Window close fallback');
    }
  };

  const cycleAngleMode = () => {
    const modes: AngleMode[] = ['deg', 'rad', 'grad'];
    const nextIdx = (modes.indexOf(angleMode) + 1) % modes.length;
    setAngleMode(modes[nextIdx]);
  };

  const modeLabels: Record<string, string> = {
    standard: 'Standar',
    scientific: 'Ilmiah',
    programmer: 'Pemrogram',
    financial: 'Finansial',
    converter: 'Konverter',
  };

  return (
    <header className="h-11 flex items-center justify-between px-2 bg-transparent select-none z-30 border-b border-[var(--border-subtle)]">
      {/* Left: Hamburger & Mode title */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSidebar}
          aria-label="Buka menu navigasi"
          title="Menu Navigasi"
          className="p-1.5 rounded-md hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <Menu className="w-4 h-4" />
        </button>

        <span className="font-semibold text-sm tracking-wide text-[var(--text-primary)]">
          {modeLabels[mode] || 'Kalkulator'}
        </span>

        {mode === 'scientific' && (
          <button
            onClick={cycleAngleMode}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--badge-text)] uppercase font-semibold transition hover:opacity-80"
            title="Klik untuk beralih mode sudut: DEG / RAD / GRAD"
          >
            {angleMode}
          </button>
        )}
      </div>

      {/* Right: Actions and Window Controls */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setHistoryOpen(!isHistoryOpen)}
          aria-label="Riwayat Perhitungan (Ctrl+H)"
          title="Riwayat (Ctrl+H)"
          className={`p-1.5 rounded-md transition-colors ${
            isHistoryOpen
              ? 'bg-dsln-accent text-white shadow-sm'
              : 'text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)]'
          }`}
        >
          <History className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenSettings}
          aria-label="Pengaturan (Ctrl+,)"
          title="Pengaturan (Ctrl+,)"
          className="p-1.5 rounded-md text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Window controls for Desktop experience */}
        <div className="flex items-center pl-1 border-l border-[var(--border-subtle)] space-x-0.5">
          <button
            onClick={handleMinimize}
            aria-label="Perkecil"
            title="Perkecil"
            className="p-1.5 rounded hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleMaximize}
            aria-label="Perbesar"
            title="Perbesar"
            className="p-1.5 rounded hover:bg-[var(--header-btn-hover)] active:bg-[var(--header-btn-active)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={handleClose}
            aria-label="Tutup"
            title="Tutup"
            className="p-1.5 rounded hover:bg-red-500 active:bg-red-600 text-[var(--text-secondary)] hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

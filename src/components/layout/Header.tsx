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
    standard: 'Standard',
    scientific: 'Scientific',
    programmer: 'Programmer',
    financial: 'Financial',
    converter: 'Converter',
  };

  return (
    <header className="h-11 flex items-center justify-between px-2 bg-transparent select-none z-30 border-b border-white/5">
      {/* Left: Hamburger & Mode title */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle navigation drawer"
          className="p-1.5 rounded-md hover:bg-white/10 active:bg-white/15 transition-colors text-white/80 hover:text-white"
        >
          <Menu className="w-4 h-4" />
        </button>

        <span className="font-semibold text-sm tracking-wide text-white/90">
          {modeLabels[mode] || 'Calculator'}
        </span>

        {mode === 'scientific' && (
          <button
            onClick={cycleAngleMode}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 active:bg-white/25 text-white/80 uppercase font-semibold transition"
            title="Click to switch DEG / RAD / GRAD"
          >
            {angleMode}
          </button>
        )}
      </div>

      {/* Right: Actions and Window Controls */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => setHistoryOpen(!isHistoryOpen)}
          aria-label="Calculation History (Ctrl+H)"
          title="History (Ctrl+H)"
          className={`p-1.5 rounded-md transition-colors ${
            isHistoryOpen
              ? 'bg-dsln-accent text-white'
              : 'text-white/80 hover:bg-white/10 active:bg-white/15 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenSettings}
          aria-label="Settings (Ctrl+,)"
          title="Settings (Ctrl+,)"
          className="p-1.5 rounded-md text-white/80 hover:bg-white/10 active:bg-white/15 hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Window controls for Desktop experience */}
        <div className="flex items-center pl-1 border-l border-white/10 space-x-0.5">
          <button
            onClick={handleMinimize}
            aria-label="Minimize"
            className="p-1.5 rounded hover:bg-white/10 active:bg-white/15 text-white/70 hover:text-white transition-colors"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleMaximize}
            aria-label="Maximize"
            className="p-1.5 rounded hover:bg-white/10 active:bg-white/15 text-white/70 hover:text-white transition-colors"
          >
            <Square className="w-3 h-3" />
          </button>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="p-1.5 rounded hover:bg-red-600/80 active:bg-red-700 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};

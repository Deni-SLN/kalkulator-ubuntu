import React from 'react';
import {
  Calculator,
  FlaskConical,
  Binary,
  TrendingUp,
  ArrowLeftRight,
  History,
  Settings,
  Info,
  X
} from 'lucide-react';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useHistoryStore } from '@/stores/historyStore';
import { CalculatorMode } from '@/types/calculator';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  onOpenSettings,
  onOpenAbout,
}) => {
  const { mode, setMode } = useCalculatorStore();
  const { setIsOpen: setHistoryOpen } = useHistoryStore();

  const handleSelectMode = (newMode: CalculatorMode) => {
    setMode(newMode);
    onClose();
  };

  interface NavItem {
    id: CalculatorMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    disabled: boolean;
    tag?: string;
  }

  const navItems: { category: string; items: NavItem[] }[] = [
    {
      category: 'KALKULATOR',
      items: [
        { id: 'standard', label: 'Standar', icon: Calculator, disabled: false },
        { id: 'scientific', label: 'Ilmiah', icon: FlaskConical, disabled: false },
        { id: 'programmer', label: 'Pemrogram', icon: Binary, disabled: false },
      ],
    },
    {
      category: 'ALAT',
      items: [
        { id: 'financial', label: 'Finansial', icon: TrendingUp, disabled: false },
        { id: 'converter', label: 'Konverter', icon: ArrowLeftRight, disabled: false },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* Slide-out Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[var(--panel-bg)] backdrop-blur-xl border-r border-[var(--panel-border)] z-50 flex flex-col justify-between transform transition-transform duration-200 ease-in-out shadow-[var(--panel-shadow)] text-[var(--text-primary)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-3">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-dsln-accent flex items-center justify-center font-bold text-xs text-white">
                D
              </div>
              <span className="font-semibold text-sm tracking-wide text-[var(--text-primary)]">DSLN Calculator</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-[var(--header-btn-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Groups */}
          <div className="space-y-4">
            {navItems.map((group) => (
              <div key={group.category}>
                <div className="px-2 mb-1 text-[11px] font-semibold text-[var(--text-muted)] tracking-wider">
                  {group.category}
                </div>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = mode === item.id;
                    return (
                      <button
                        key={item.id}
                        disabled={item.disabled}
                        onClick={() => handleSelectMode(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                          item.disabled
                            ? 'opacity-40 cursor-not-allowed text-[var(--text-muted)]'
                            : isActive
                            ? 'bg-dsln-accent text-white shadow-sm font-semibold'
                            : 'text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] hover:text-[var(--text-primary)]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.tag && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--badge-text)]">
                            {item.tag}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <div>
              <div className="px-2 mb-1 text-[11px] font-semibold text-[var(--text-muted)] tracking-wider">
                RIWAYAT
              </div>
              <button
                onClick={() => {
                  setHistoryOpen(true);
                  onClose();
                }}
                className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] hover:text-[var(--text-primary)] transition-all"
              >
                <History className="w-4 h-4" />
                <span>Log Riwayat</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-3 border-t border-[var(--border-subtle)] space-y-1">
          <button
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] hover:text-[var(--text-primary)] transition-all"
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan</span>
          </button>
          <button
            onClick={() => {
              onOpenAbout();
              onClose();
            }}
            className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--header-btn-hover)] hover:text-[var(--text-primary)] transition-all"
          >
            <Info className="w-4 h-4" />
            <span>Tentang DSLN</span>
          </button>
        </div>
      </aside>
    </>
  );
};

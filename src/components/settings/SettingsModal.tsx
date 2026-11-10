import React from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useHistoryStore } from '@/stores/historyStore';
import { DEFAULT_ACCENT_COLORS } from '@/engine/constants';
import { ThemeMode, AngleMode, CalculatorMode, NumberLocale } from '@/types/calculator';
import { X, RotateCcw, Palette, Calculator, History as HistoryIcon, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const { clearHistory } = useHistoryStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#1e2129] border border-white/10 rounded-xl shadow-fluent-elevated flex flex-col max-h-[85vh] overflow-hidden text-white">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-dsln-accent" />
            <h2 className="font-semibold text-base">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-white/60 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 text-sm">
          {/* Section: Appearance */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-white/50 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Appearance</span>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <span>Theme Mode</span>
              <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
                {(['dark', 'light', 'system'] as ThemeMode[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => updateSettings({ theme: t })}
                    className={`px-3 py-1 text-xs rounded-md capitalize font-medium transition ${
                      settings.theme === t
                        ? 'bg-dsln-accent text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="space-y-2">
              <span className="text-xs text-white/80">Accent Color</span>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_ACCENT_COLORS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => updateSettings({ accentColor: col.value })}
                    style={{ backgroundColor: col.value }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      settings.accentColor.toLowerCase() === col.value.toLowerCase()
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Animation Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span>Enable Animations</span>
              <input
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={(e) => updateSettings({ animationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded accent-dsln-accent cursor-pointer"
              />
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Section: Calculation */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-white/50 tracking-wider uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculation</span>
            </div>

            {/* Default Mode */}
            <div className="flex items-center justify-between">
              <span>Default Mode</span>
              <select
                value={settings.defaultMode}
                onChange={(e) => updateSettings({ defaultMode: e.target.value as CalculatorMode })}
                className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-dsln-accent"
              >
                <option value="standard" className="bg-[#1e2129]">Standard</option>
                <option value="scientific" className="bg-[#1e2129]">Scientific</option>
              </select>
            </div>

            {/* Angle Mode */}
            <div className="flex items-center justify-between">
              <span>Default Angle Mode</span>
              <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10">
                {(['deg', 'rad', 'grad'] as AngleMode[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => updateSettings({ angleMode: a })}
                    className={`px-2.5 py-1 text-xs rounded-md uppercase font-mono font-medium transition ${
                      settings.angleMode === a
                        ? 'bg-dsln-accent text-white shadow-sm'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Number Formatting */}
            <div className="flex items-center justify-between">
              <span>Format Angka (Pemisah)</span>
              <select
                value={settings.numberFormat || 'id-ID'}
                onChange={(e) => updateSettings({ numberFormat: e.target.value as NumberLocale })}
                className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-dsln-accent"
              >
                <option value="id-ID" className="bg-[#1e2129]">Titik . (1.250.000,00)</option>
                <option value="en-US" className="bg-[#1e2129]">Koma , (1,250,000.00)</option>
              </select>
            </div>

            {/* Thousands Separator */}
            <div className="flex items-center justify-between">
              <span>Pemisah Ribuan ({settings.numberFormat === 'en-US' ? '1,000' : '1.000'})</span>
              <input
                type="checkbox"
                checked={settings.thousandsSeparator}
                onChange={(e) => updateSettings({ thousandsSeparator: e.target.checked })}
                className="w-4 h-4 rounded accent-dsln-accent cursor-pointer"
              />
            </div>

            {/* Decimal Precision */}
            <div className="flex items-center justify-between">
              <span>Decimal Precision ({settings.decimalPrecision})</span>
              <input
                type="range"
                min="2"
                max="16"
                value={settings.decimalPrecision}
                onChange={(e) => updateSettings({ decimalPrecision: Number(e.target.value) })}
                className="w-28 accent-dsln-accent cursor-pointer"
              />
            </div>
          </div>

          <hr className="border-white/10" />

          {/* Section: History */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-white/50 tracking-wider uppercase">
              <HistoryIcon className="w-3.5 h-3.5" />
              <span>History</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Record History</span>
              <input
                type="checkbox"
                checked={settings.historyEnabled}
                onChange={(e) => updateSettings({ historyEnabled: e.target.checked })}
                className="w-4 h-4 rounded accent-dsln-accent cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Max Entries</span>
              <select
                value={settings.maxHistoryEntries}
                onChange={(e) => updateSettings({ maxHistoryEntries: Number(e.target.value) })}
                className="bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white focus:outline-none"
              >
                <option value="50" className="bg-[#1e2129]">50 entries</option>
                <option value="100" className="bg-[#1e2129]">100 entries</option>
                <option value="200" className="bg-[#1e2129]">200 entries</option>
              </select>
            </div>

            <button
              onClick={() => {
                if (confirm('Clear all calculation history?')) {
                  clearHistory();
                }
              }}
              className="text-xs text-red-400 hover:text-red-300 transition underline underline-offset-2"
            >
              Clear All Saved History
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between bg-black/20">
          <button
            onClick={resetSettings}
            className="flex items-center space-x-1.5 text-xs text-white/50 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-dsln-accent hover:opacity-90 text-white font-medium text-xs transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

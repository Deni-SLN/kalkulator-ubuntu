import React from 'react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useHistoryStore } from '@/stores/historyStore';
import { DEFAULT_ACCENT_COLORS } from '@/engine/constants';
import { AngleMode, CalculatorMode, NumberLocale } from '@/types/calculator';
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
      <div className="w-full max-w-md bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-xl shadow-[var(--panel-shadow)] flex flex-col max-h-[85vh] overflow-hidden text-[var(--text-primary)]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-dsln-accent" />
            <h2 className="font-semibold text-base">Pengaturan</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-[var(--header-btn-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 text-sm">
          {/* Section: Appearance */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tampilan</span>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <span>Mode Tema</span>
              <div className="flex items-center bg-[var(--btn-op-bg)] rounded-lg p-0.5 border border-[var(--border-subtle)]">
                {([
                  { id: 'dark', label: 'Gelap' },
                  { id: 'light', label: 'Terang' },
                  { id: 'system', label: 'Sistem' },
                ] as const).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateSettings({ theme: t.id })}
                    className={`px-3 py-1 text-xs rounded-md capitalize font-medium transition ${
                      settings.theme === t.id
                        ? 'bg-dsln-accent text-white shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div className="space-y-2">
              <span className="text-xs text-[var(--text-secondary)]">Warna Aksen</span>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_ACCENT_COLORS.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => updateSettings({ accentColor: col.value })}
                    style={{ backgroundColor: col.value }}
                    className={`w-7 h-7 rounded-full border-2 transition-transform ${
                      settings.accentColor.toLowerCase() === col.value.toLowerCase()
                        ? 'border-[var(--text-primary)] scale-110 shadow-md'
                        : 'border-transparent hover:scale-105'
                    }`}
                    title={col.name}
                  />
                ))}
              </div>
            </div>

            {/* Animation Toggle */}
            <div className="flex items-center justify-between pt-1">
              <span>Aktifkan Animasi</span>
              <input
                type="checkbox"
                checked={settings.animationsEnabled}
                onChange={(e) => updateSettings({ animationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded accent-dsln-accent cursor-pointer"
              />
            </div>
          </div>

          <hr className="border-[var(--border-subtle)]" />

          {/* Section: Calculation */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">
              <Calculator className="w-3.5 h-3.5" />
              <span>Kalkulasi</span>
            </div>

            {/* Default Mode */}
            <div className="flex items-center justify-between">
              <span>Mode Asali</span>
              <select
                value={settings.defaultMode}
                onChange={(e) => updateSettings({ defaultMode: e.target.value as CalculatorMode })}
                className="bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-md px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none focus:border-dsln-accent shadow-sm"
              >
                <option value="standard">Standar</option>
                <option value="scientific">Ilmiah</option>
                <option value="programmer">Pemrogram</option>
                <option value="financial">Finansial</option>
                <option value="converter">Konverter</option>
              </select>
            </div>

            {/* Angle Mode */}
            <div className="flex items-center justify-between">
              <span>Mode Sudut Asali</span>
              <div className="flex items-center bg-[var(--btn-op-bg)] rounded-lg p-0.5 border border-[var(--border-subtle)]">
                {(['deg', 'rad', 'grad'] as AngleMode[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => updateSettings({ angleMode: a })}
                    className={`px-2.5 py-1 text-xs rounded-md uppercase font-mono font-medium transition ${
                      settings.angleMode === a
                        ? 'bg-dsln-accent text-white shadow-sm'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
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
                className="bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-md px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none focus:border-dsln-accent shadow-sm"
              >
                <option value="id-ID">Titik . (1.250.000,00)</option>
                <option value="en-US">Koma , (1,250,000.00)</option>
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
              <span>Presisi Desimal ({settings.decimalPrecision})</span>
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

          <hr className="border-[var(--border-subtle)]" />

          {/* Section: History */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[var(--text-muted)] tracking-wider uppercase">
              <HistoryIcon className="w-3.5 h-3.5" />
              <span>Riwayat</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Rekam Riwayat Kalkulasi</span>
              <input
                type="checkbox"
                checked={settings.historyEnabled}
                onChange={(e) => updateSettings({ historyEnabled: e.target.checked })}
                className="w-4 h-4 rounded accent-dsln-accent cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <span>Batas Maksimum Entri</span>
              <select
                value={settings.maxHistoryEntries}
                onChange={(e) => updateSettings({ maxHistoryEntries: Number(e.target.value) })}
                className="bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-md px-2 py-1 text-xs text-[var(--text-primary)] focus:outline-none shadow-sm"
              >
                <option value="50">50 entri</option>
                <option value="100">100 entri</option>
                <option value="200">200 entri</option>
              </select>
            </div>

            <button
              onClick={() => {
                if (confirm('Hapus semua riwayat perhitungan tersimpan?')) {
                  clearHistory();
                }
              }}
              className="text-xs text-red-500 hover:text-red-600 transition underline underline-offset-2"
            >
              Hapus Semua Riwayat Tersimpan
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[var(--border-subtle)] flex items-center justify-between bg-[var(--btn-op-bg)]">
          <button
            onClick={resetSettings}
            className="flex items-center space-x-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Kembalikan Asali</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-dsln-accent hover:opacity-90 text-white font-medium text-xs transition shadow-sm"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};

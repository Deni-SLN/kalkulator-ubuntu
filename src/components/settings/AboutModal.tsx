import React from 'react';
import { X, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-2xl shadow-[var(--panel-shadow)] flex flex-col overflow-hidden text-[var(--text-primary)]">
        <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
          <span className="font-semibold text-sm">Tentang DSLN Calculator</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[var(--header-btn-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/25 text-white text-2xl font-black">
            DSLN
          </div>

          <div>
            <h3 className="font-bold text-lg text-[var(--text-primary)]">DSLN Calculator</h3>
            <p className="text-xs text-[var(--text-muted)]">Versi 1.4.0 (Standar, Ilmiah, Pemrogram, Finansial, Konverter)</p>
          </div>

          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
            Aplikasi kalkulator desktop modern khusus untuk Ubuntu Linux dengan pendekatan Fluent Design,
            terinspirasi dari Windows 11 Calculator dan ditenagai oleh Tauri 2, React, dan Rust.
          </p>

          <div className="p-3 rounded-xl bg-[var(--bg-app)] border border-[var(--border-subtle)] text-[11px] text-[var(--text-secondary)] space-y-1.5 text-left">
            <div className="flex justify-between">
              <span>Sistem Operasi Target:</span>
              <span className="text-[var(--text-primary)] font-mono font-medium">Ubuntu Linux</span>
            </div>
            <div className="flex justify-between">
              <span>Server Tampilan:</span>
              <span className="text-[var(--text-primary)] font-mono font-medium">Wayland / X11</span>
            </div>
            <div className="flex justify-between">
              <span>Framework:</span>
              <span className="text-[var(--text-primary)] font-mono font-medium">Tauri 2 + React + TS</span>
            </div>
            <div className="flex justify-between">
              <span>Penyimpanan:</span>
              <span className="text-[var(--text-primary)] font-mono font-medium">SQLite Lokal (Offline-first)</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-[var(--text-muted)] flex items-center justify-center space-x-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>oleh DSLN</span>
          </div>
        </div>

        <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-app)]/50 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 rounded-lg bg-dsln-accent hover:opacity-90 active:opacity-100 text-xs font-semibold text-white transition shadow-sm"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

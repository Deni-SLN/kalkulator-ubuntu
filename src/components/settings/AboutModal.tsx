import React from 'react';
import { X, Heart } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-[#1e2129] border border-white/10 rounded-xl shadow-fluent-elevated flex flex-col overflow-hidden text-white">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <span className="font-semibold text-sm">About DSLN Calculator</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-white/10 text-white/60 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/20 text-white text-2xl font-black">
            DSLN
          </div>

          <div>
            <h3 className="font-bold text-lg text-white">DSLN Calculator</h3>
            <p className="text-xs text-white/50">Version 1.4.0 (Full Suite: Standard, Scientific, Programmer, Financial, Converter)</p>
          </div>

          <p className="text-xs text-white/70 leading-relaxed">
            Modern Desktop Calculator developed for Ubuntu Linux with Fluent Design, inspired by
            Windows 11 Calculator and powered by Tauri 2, React, and Rust.
          </p>

          <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/60 space-y-1 text-left">
            <div className="flex justify-between">
              <span>Target OS:</span>
              <span className="text-white/80 font-mono">Ubuntu Linux</span>
            </div>
            <div className="flex justify-between">
              <span>Display Server:</span>
              <span className="text-white/80 font-mono">Wayland / X11</span>
            </div>
            <div className="flex justify-between">
              <span>Framework:</span>
              <span className="text-white/80 font-mono">Tauri 2 + React + TS</span>
            </div>
            <div className="flex justify-between">
              <span>Storage:</span>
              <span className="text-white/80 font-mono">Local-first SQLite</span>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-white/40 flex items-center justify-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 inline" />
            <span>by DSLN</span>
          </div>
        </div>

        <div className="p-3 border-t border-white/10 bg-black/20 text-center">
          <button
            onClick={onClose}
            className="w-full py-1.5 rounded-md bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

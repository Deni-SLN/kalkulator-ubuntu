import React, { useState } from 'react';
import { useHistoryStore } from '@/stores/historyStore';
import { useCalculatorStore } from '@/stores/calculatorStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { formatNumber, formatExpression } from '@/engine/formatter';
import {
  X,
  Trash2,
  Star,
  Search,
  Copy,
  ArrowUpRight,
  Clock,
  Check
} from 'lucide-react';

export const HistoryPanel: React.FC = () => {
  const {
    items,
    isOpen,
    setIsOpen,
    deleteItem,
    clearHistory,
    toggleFavorite,
    searchQuery,
    setSearchQuery,
  } = useHistoryStore();

  const { setExpressionAndResult } = useCalculatorStore();
  const { settings } = useSettingsStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterFavorite, setFilterFavorite] = useState(false);

  if (!isOpen) return null;

  const filteredItems = items.filter((item) => {
    if (filterFavorite && !item.is_favorite) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.expression.toLowerCase().includes(query) ||
      item.result.toLowerCase().includes(query)
    );
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleReuse = (expression: string, result: string) => {
    setExpressionAndResult(expression, result);
    setIsOpen(false);
  };

  const formatTimestamp = (iso: string) => {
    try {
      const date = new Date(iso);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-[var(--panel-bg)] backdrop-blur-xl border-l border-[var(--panel-border)] z-50 flex flex-col shadow-[var(--panel-shadow)] text-[var(--text-primary)]">
      {/* Header */}
      <div className="p-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-dsln-accent" />
          <span className="font-semibold text-sm text-[var(--text-primary)]">Riwayat</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--badge-bg)] text-[var(--badge-text)]">
            {filteredItems.length}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setFilterFavorite(!filterFavorite)}
            className={`p-1.5 rounded transition ${
              filterFavorite ? 'bg-amber-400/20 text-amber-500' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--header-btn-hover)]'
            }`}
            title="Saring Favorit"
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
          {items.length > 0 && (
            <button
              onClick={clearHistory}
              className="p-1.5 rounded hover:bg-red-500/20 text-[var(--text-secondary)] hover:text-red-500 transition"
              title="Bersihkan semua riwayat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-[var(--header-btn-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-2 border-b border-[var(--border-subtle)]">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari riwayat perhitungan..."
            className="w-full pl-8 pr-3 py-1.5 bg-[var(--bg-input)] border border-[var(--bg-input-border)] rounded-md text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-dsln-accent shadow-sm"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredItems.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center text-[var(--text-muted)] text-xs">
            <Clock className="w-8 h-8 mb-2 stroke-[1.5] opacity-50" />
            <p>Belum ada riwayat kalkulasi</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="group p-2.5 rounded-lg bg-[var(--bg-card)] hover:opacity-90 border border-[var(--border-card)] transition-all text-right shadow-sm"
            >
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] mb-1">
                <span className="capitalize">{item.calculator_mode} • {formatTimestamp(item.created_at)}</span>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1 rounded hover:bg-[var(--header-btn-hover)]"
                    title={item.is_favorite ? 'Hapus dari Favorit' : 'Bintang Favorit'}
                  >
                    <Star
                      className={`w-3 h-3 ${
                        item.is_favorite ? 'text-amber-500 fill-amber-500' : 'text-[var(--text-muted)]'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, item.result)}
                    className="p-1 rounded hover:bg-[var(--header-btn-hover)]"
                    title="Salin hasil"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3 h-3 text-green-500" />
                    ) : (
                      <Copy className="w-3 h-3 text-[var(--text-muted)]" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-[var(--text-muted)] hover:text-red-500"
                    title="Hapus riwayat ini"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Expression */}
              <div className="text-xs text-[var(--text-secondary)] font-mono truncate">
                {formatExpression(item.expression, settings.numberFormat)}
              </div>

              {/* Result */}
              <div
                onClick={() => handleReuse(item.expression, item.result)}
                className="text-lg font-semibold text-[var(--text-primary)] tracking-tight cursor-pointer hover:text-dsln-accent transition flex items-center justify-end space-x-1"
                title="Klik untuk gunakan kembali"
              >
                <span>
                  = {formatNumber(item.result, settings.thousandsSeparator, settings.decimalPrecision, settings.numberFormat)}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useHistoryStore } from '@/stores/historyStore';
import { useCalculatorStore } from '@/stores/calculatorStore';
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
    <div className="fixed inset-y-0 right-0 w-80 bg-[#1a1d24]/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col shadow-fluent-elevated">
      {/* Header */}
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-dsln-accent" />
          <span className="font-semibold text-sm text-white">History</span>
          <span className="text-xs px-1.5 py-0.5 rounded bg-white/10 text-white/60">
            {filteredItems.length}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setFilterFavorite(!filterFavorite)}
            className={`p-1.5 rounded transition ${
              filterFavorite ? 'bg-amber-400/20 text-amber-400' : 'text-white/60 hover:text-white'
            }`}
            title="Filter Favorites"
          >
            <Star className="w-4 h-4 fill-current" />
          </button>
          {items.length > 0 && (
            <button
              onClick={clearHistory}
              className="p-1.5 rounded hover:bg-red-500/20 text-white/60 hover:text-red-400 transition"
              title="Clear all history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="p-2 border-b border-white/5">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-white/40 absolute left-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search calculations..."
            className="w-full pl-8 pr-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-xs text-white placeholder-white/40 focus:outline-none focus:border-dsln-accent"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredItems.length === 0 ? (
          <div className="h-40 flex flex-col items-center justify-center text-center text-white/40 text-xs">
            <Clock className="w-8 h-8 mb-2 stroke-[1.5] opacity-50" />
            <p>There's no history yet</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="group p-2.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 transition-all text-right"
            >
              <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                <span className="capitalize">{item.calculator_mode} • {formatTimestamp(item.created_at)}</span>
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="p-1 rounded hover:bg-white/10"
                    title={item.is_favorite ? 'Unstar' : 'Star'}
                  >
                    <Star
                      className={`w-3 h-3 ${
                        item.is_favorite ? 'text-amber-400 fill-amber-400' : 'text-white/50'
                      }`}
                    />
                  </button>
                  <button
                    onClick={() => handleCopy(item.id, item.result)}
                    className="p-1 rounded hover:bg-white/10"
                    title="Copy result"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3 h-3 text-green-400" />
                    ) : (
                      <Copy className="w-3 h-3 text-white/50" />
                    )}
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1 rounded hover:bg-red-500/20 text-white/50 hover:text-red-400"
                    title="Delete entry"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Expression */}
              <div className="text-xs text-white/60 font-mono truncate">
                {formatExpression(item.expression)}
              </div>

              {/* Result */}
              <div
                onClick={() => handleReuse(item.expression, item.result)}
                className="text-lg font-semibold text-white tracking-tight cursor-pointer hover:text-dsln-accent transition flex items-center justify-end space-x-1"
                title="Click to reuse"
              >
                <span>= {formatNumber(item.result)}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

import { create } from 'zustand';
import { HistoryItem, CalculatorMode } from '@/types/calculator';
import {
  getHistory,
  saveHistoryItem,
  toggleFavoriteHistoryItem,
  deleteHistoryItem,
  clearAllHistory,
} from '@/database/storageAdapter';

interface HistoryState {
  items: HistoryItem[];
  isOpen: boolean;
  searchQuery: string;
  isLoaded: boolean;
  loadHistory: () => Promise<void>;
  addHistory: (expression: string, result: string, mode: CalculatorMode) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  setIsOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  items: [],
  isOpen: false,
  searchQuery: '',
  isLoaded: false,

  loadHistory: async () => {
    const items = await getHistory();
    set({ items, isLoaded: true });
  },

  addHistory: async (expression, result, mode) => {
    const newItem: HistoryItem = {
      id: `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      expression,
      result,
      calculator_mode: mode,
      created_at: new Date().toISOString(),
      is_favorite: false,
    };
    await saveHistoryItem(newItem);
    set(state => ({ items: [newItem, ...state.items] }));
  },

  toggleFavorite: async (id) => {
    await toggleFavoriteHistoryItem(id);
    set(state => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, is_favorite: !item.is_favorite } : item
      ),
    }));
  },

  deleteItem: async (id) => {
    await deleteHistoryItem(id);
    set(state => ({
      items: state.items.filter(item => item.id !== id),
    }));
  },

  clearHistory: async () => {
    await clearAllHistory();
    set({ items: [] });
  },

  setIsOpen: (isOpen) => set({ isOpen }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
}));

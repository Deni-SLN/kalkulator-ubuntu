import { HistoryItem, AppSettings } from '@/types/calculator';

const STORAGE_KEY_HISTORY = 'dsln_calculator_history';
const STORAGE_KEY_SETTINGS = 'dsln_calculator_settings';
const STORAGE_KEY_MEMORY = 'dsln_calculator_memory';

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  accentColor: '#2563EB',
  fontSize: 'medium',
  animationsEnabled: true,
  decimalPrecision: 10,
  thousandsSeparator: true,
  numberFormat: 'id-ID',
  angleMode: 'deg',
  defaultMode: 'standard',
  historyEnabled: true,
  maxHistoryEntries: 100,
};

// Check if running inside Tauri
export const isTauri = (): boolean => {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
};

// --- History Storage Functions ---
export async function getHistory(): Promise<HistoryItem[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load history:', e);
    return [];
  }
}

export async function saveHistoryItem(item: HistoryItem): Promise<void> {
  try {
    const items = await getHistory();
    const settings = await getSettings();

    // Check if history enabled
    if (!settings.historyEnabled) return;

    // Filter duplicates or add at beginning
    const updated = [item, ...items.filter(i => i.id !== item.id)];
    
    // Cap to max entries
    const capped = updated.slice(0, settings.maxHistoryEntries || 100);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(capped));
  } catch (e) {
    console.error('Failed to save history item:', e);
  }
}

export async function toggleFavoriteHistoryItem(id: string): Promise<void> {
  try {
    const items = await getHistory();
    const updated = items.map(item => 
      item.id === id ? { ...item, is_favorite: !item.is_favorite } : item
    );
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to toggle favorite history:', e);
  }
}

export async function deleteHistoryItem(id: string): Promise<void> {
  try {
    const items = await getHistory();
    const updated = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete history item:', e);
  }
}

export async function clearAllHistory(): Promise<void> {
  try {
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (e) {
    console.error('Failed to clear history:', e);
  }
}

// --- Settings Storage Functions ---
export async function getSettings(): Promise<AppSettings> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    console.error('Failed to load settings:', e);
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

// --- Memory Storage Functions ---
export async function getMemory(): Promise<number> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MEMORY);
    return raw ? Number(raw) : 0;
  } catch (e) {
    return 0;
  }
}

export async function saveMemory(val: number): Promise<void> {
  try {
    localStorage.setItem(STORAGE_KEY_MEMORY, val.toString());
  } catch (e) {
    console.error('Failed to save memory:', e);
  }
}

import { create } from 'zustand';
import { AppSettings, ThemeMode, AngleMode, CalculatorMode } from '@/types/calculator';
import { getSettings, saveSettings, DEFAULT_SETTINGS } from '@/database/storageAdapter';

interface SettingsState {
  settings: AppSettings;
  isLoaded: boolean;
  loadSettings: () => Promise<void>;
  updateSettings: (partial: Partial<AppSettings>) => Promise<void>;
  setTheme: (theme: ThemeMode) => Promise<void>;
  setAccentColor: (color: string) => Promise<void>;
  setAngleMode: (angleMode: AngleMode) => Promise<void>;
  setDefaultMode: (mode: CalculatorMode) => Promise<void>;
  resetSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  isLoaded: false,

  loadSettings: async () => {
    const loaded = await getSettings();
    set({ settings: loaded, isLoaded: true });
    // Apply theme
    applyThemeToDOM(loaded.theme);
    // Apply accent color
    document.documentElement.style.setProperty('--accent-color', loaded.accentColor);
  },

  updateSettings: async (partial) => {
    const next = { ...get().settings, ...partial };
    set({ settings: next });
    await saveSettings(next);

    if (partial.theme) {
      applyThemeToDOM(partial.theme);
    }
    if (partial.accentColor) {
      document.documentElement.style.setProperty('--accent-color', partial.accentColor);
    }
  },

  setTheme: async (theme) => {
    await get().updateSettings({ theme });
  },

  setAccentColor: async (accentColor) => {
    await get().updateSettings({ accentColor });
  },

  setAngleMode: async (angleMode) => {
    await get().updateSettings({ angleMode });
  },

  setDefaultMode: async (defaultMode) => {
    await get().updateSettings({ defaultMode });
  },

  resetSettings: async () => {
    set({ settings: DEFAULT_SETTINGS });
    await saveSettings(DEFAULT_SETTINGS);
    applyThemeToDOM(DEFAULT_SETTINGS.theme);
    document.documentElement.style.setProperty('--accent-color', DEFAULT_SETTINGS.accentColor);
  },
}));

function applyThemeToDOM(theme: ThemeMode) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else if (theme === 'light') {
    root.classList.remove('dark');
  } else {
    // System
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}

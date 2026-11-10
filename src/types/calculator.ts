export type CalculatorMode = 
  | 'standard' 
  | 'scientific' 
  | 'programmer' 
  | 'financial' 
  | 'converter';

export type AngleMode = 'deg' | 'rad' | 'grad';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  calculator_mode: CalculatorMode;
  created_at: string;
  is_favorite: boolean;
}

export type ThemeMode = 'dark' | 'light' | 'system';

export interface AppSettings {
  theme: ThemeMode;
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  animationsEnabled: boolean;
  decimalPrecision: number;
  thousandsSeparator: boolean;
  angleMode: AngleMode;
  defaultMode: CalculatorMode;
  historyEnabled: boolean;
  maxHistoryEntries: number;
}

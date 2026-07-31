export type ThemeMode =
  | 'Classic'
  | 'Amoled'
  | 'Deep Ocean'
  | 'Neon Cyber'
  | 'Retro Gold'
  | 'Emerald Matrix'
  | 'Modern Light';

export type LayoutType = 'Compact' | 'Pocket' | 'Expanded' | 'Custom' | 'Simple - Scientific';

export type InputMethod = 'Classic' | 'Expression' | 'RPN';

export type DataRange = 'Real' | 'Complex';

export type AngleUnit = 'DEG' | 'RAD' | 'GRAD';

export type BaseNumberSystem = 'DEC' | 'BIN' | 'OCT' | 'HEX';

export type FontStyle = 'Handwriting' | 'Digital' | 'Standard';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string; // ISO or formatted date string
  dateGroup: string; // e.g. "Monday 27 July, 2026"
}

export interface CalculatorState {
  expression: string;
  cursorPosition: number;
  result: string;
  lastAns: string;
  memory: number;
  isShift: boolean;
  isHyp: boolean;
  angleUnit: AngleUnit;
  baseSystem: BaseNumberSystem;
  inputMethod: InputMethod;
  dataRange: DataRange;
  layout: LayoutType;
  theme: ThemeMode;
  fontStyle: FontStyle;
  precision: number; // Decimal places (0-12)
  thousandSeparator: 'space' | 'comma' | 'dot' | 'none';
  resultDisplayMode?: 'normal' | 'improperFraction' | 'mixedFraction' | 'sci' | 'dms';
  hapticFeedback: boolean;
  soundEffects: boolean;
  rpnStack: string[];
}

export interface PhysicalConstant {
  symbol: string;
  name: string;
  value: number;
  unit: string;
  category: 'Universal' | 'Atomic' | 'Electromagnetic' | 'Physico-Chemical' | 'Math';
}

export interface UnitCategory {
  name: string;
  units: { name: string; symbol: string; factor: number; offset?: number }[];
}

export interface QuickTourStep {
  step: number;
  title: string;
  description: string;
  targetKeyId?: string;
  position?: { top?: string; left?: string; bottom?: string; right?: string };
}

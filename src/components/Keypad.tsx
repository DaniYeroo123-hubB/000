import React from 'react';
import { CalculatorState } from '../types';
import { triggerHaptic, playClickSound } from '../utils/haptics';

interface KeypadProps {
  state: CalculatorState;
  onKeyPress: (key: string, secondary?: boolean) => void;
  highlightedKeyId?: string;
}

interface KeyConfig {
  id: string;
  primary: string;
  secondary?: string;
  type?: 'action' | 'number' | 'operator' | 'shift' | 'danger' | 'sci';
}

export const Keypad: React.FC<KeypadProps> = ({ state, onKeyPress, highlightedKeyId }) => {
  const { isShift, theme, fontStyle } = state;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const handleKeyClick = (key: string, secondary = false) => {
    triggerHaptic('light', state.hapticFeedback);
    playClickSound(state.soundEffects, key === '=' ? 950 : 750);
    onKeyPress(key, secondary);
  };

  // Row definition mapping (Row 1 to Row 9)
  const rows: KeyConfig[][] = [
    // Row 1: Top Controls
    [
      { id: 'btn-shift', primary: 'SHIFT', type: 'shift' },
      { id: 'btn-menu', primary: 'MENU', type: 'action' },
      { id: 'btn-left', primary: '◄', type: 'action' },
      { id: 'btn-right', primary: '►', type: 'action' },
      { id: 'btn-backspace', primary: '⌫', type: 'danger' },
      { id: 'btn-ac', primary: 'AC', type: 'danger' },
    ],
    // Row 2
    [
      { id: 'btn-drg', primary: 'DRG', secondary: '►DRG', type: 'sci' },
      { id: 'btn-fse', primary: 'x↔E', secondary: 'FSE', type: 'sci' },
      { id: 'btn-mtrx', primary: '[ █ ]', secondary: 'MTRX', type: 'sci' },
      { id: 'btn-sum', primary: 'Σ', secondary: 'π', type: 'sci' },
      { id: 'btn-diff', primary: '∫ dx', secondary: 'd/dx', type: 'sci' },
      { id: 'btn-cam', primary: '📷', secondary: 'CNST', type: 'sci' },
    ],
    // Row 3
    [
      { id: 'btn-pi', primary: 'π', secondary: 'hyp', type: 'sci' },
      { id: 'btn-sin', primary: 'sin', secondary: 'sin⁻¹', type: 'sci' },
      { id: 'btn-cos', primary: 'cos', secondary: 'cos⁻¹', type: 'sci' },
      { id: 'btn-tan', primary: 'tan', secondary: 'tan⁻¹', type: 'sci' },
      { id: 'btn-i', primary: 'i', secondary: '∠', type: 'sci' },
      { id: 'btn-e', primary: 'e', secondary: 'logₓ y', type: 'sci' },
    ],
    // Row 4
    [
      { id: 'btn-recip', primary: 'x⁻¹', secondary: 'lim', type: 'sci' },
      { id: 'btn-sqr', primary: 'x²', secondary: 'x³', type: 'sci' },
      { id: 'btn-sqrt', primary: '√x', secondary: '³√x', type: 'sci' },
      { id: 'btn-pow', primary: 'xʸ', secondary: 'ˣ√y', type: 'sci' },
      { id: 'btn-log', primary: 'log10', secondary: '10ˣ', type: 'sci' },
      { id: 'btn-ln', primary: 'In', secondary: 'eˣ', type: 'sci' },
    ],
    // Row 5
    [
      { id: 'btn-dms', primary: 'D°M\'S', secondary: 'STAT', type: 'sci' },
      { id: 'btn-frac', primary: 'd/c', secondary: 'a b/c', type: 'sci' },
      { id: 'btn-varx', primary: 'X', secondary: 'Y', type: 'sci' },
      { id: 'btn-xym', primary: 'XY,M', secondary: 'HIST', type: 'sci' },
      { id: 'btn-mr', primary: 'MR', secondary: 'M+', type: 'sci' },
      { id: 'btn-stom', primary: 'x→M', secondary: 'M-', type: 'sci' },
    ],
    // Row 6 (Numbers 7 8 9 ( ))
    [
      { id: 'btn-7', primary: '7', secondary: 'Re', type: 'number' },
      { id: 'btn-8', primary: '8', secondary: 'Im', type: 'number' },
      { id: 'btn-9', primary: '9', secondary: 'θ', type: 'number' },
      { id: 'btn-lparen', primary: '(', secondary: 'z̄', type: 'operator' },
      { id: 'btn-rparen', primary: ')', secondary: 'MOD', type: 'operator' },
    ],
    // Row 7 (Numbers 4 5 6 × ÷)
    [
      { id: 'btn-4', primary: '4', secondary: 'n!', type: 'number' },
      { id: 'btn-5', primary: '5', secondary: 'nCr', type: 'number' },
      { id: 'btn-6', primary: '6', secondary: 'nPr', type: 'number' },
      { id: 'btn-mul', primary: '×', secondary: '►BIN', type: 'operator' },
      { id: 'btn-div', primary: '÷', secondary: '►OCT', type: 'operator' },
    ],
    // Row 8 (Numbers 1 2 3 + –)
    [
      { id: 'btn-1', primary: '1', secondary: 'CNST', type: 'number' },
      { id: 'btn-2', primary: '2', secondary: 'CONV', type: 'number' },
      { id: 'btn-3', primary: '3', secondary: 'abs', type: 'number' },
      { id: 'btn-add', primary: '+', secondary: '►DEC', type: 'operator' },
      { id: 'btn-sub', primary: '–', secondary: '►HEX', type: 'operator' },
    ],
    // Row 9 (0 . +/- EXP =)
    [
      { id: 'btn-0', primary: '0', secondary: 'RAN#', type: 'number' },
      { id: 'btn-dot', primary: '.', secondary: 'ran#', type: 'number' },
      { id: 'btn-neg', primary: '+/–', secondary: 'Ans', type: 'action' },
      { id: 'btn-exp', primary: 'EXP', secondary: 'SI', type: 'action' },
      { id: 'btn-eq', primary: '=', secondary: 'COMP', type: 'operator' },
    ],
  ];

  // Key Styling by Theme
  const getKeyStyle = (type?: string, isHighlighted?: boolean, isNumberRow?: boolean) => {
    let base = isNumberRow
      ? 'relative flex flex-col items-center justify-center rounded-xl transition-all active:scale-95 shadow-lg border select-none py-2.5 sm:py-3 px-1 cursor-pointer min-h-[48px] sm:min-h-[58px]'
      : 'relative flex flex-col items-center justify-center rounded-lg transition-all active:scale-95 shadow-sm border select-none py-1.5 sm:py-2 px-0.5 cursor-pointer min-h-[38px] sm:min-h-[46px]';

    if (isHighlighted) {
      base += ' ring-4 ring-amber-400 ring-offset-2 ring-offset-black z-30 animate-bounce';
    }

    switch (theme) {
      case 'Classic':
        if (type === 'shift') return `${base} bg-[#ffe082] border-[#ffd54f] text-[#3e2723] font-bold hover:brightness-110`;
        if (type === 'danger') return `${base} bg-[#f87171] border-[#ef4444] text-white font-bold hover:brightness-110`;
        if (type === 'number') return `${base} bg-[#333339] border-[#484852] text-white font-bold hover:bg-[#3c3c44]`;
        return `${base} bg-[#28282d] border-[#3a3a42] text-gray-200 hover:bg-[#303036]`;

      case 'Amoled':
        if (type === 'shift') return `${base} bg-[#121212] border-amber-500 text-amber-400 font-bold hover:bg-[#222]`;
        if (type === 'danger') return `${base} bg-[#121212] border-red-600 text-red-500 font-bold hover:bg-[#222]`;
        if (type === 'operator') return `${base} bg-[#0c0c0c] border-[#333] text-cyan-400 font-bold hover:bg-[#222]`;
        if (type === 'number') return `${base} bg-black border-[#282828] text-white font-extrabold hover:bg-[#181818]`;
        return `${base} bg-[#0a0a0a] border-[#222] text-gray-200 hover:bg-[#1a1a1a]`;

      case 'Deep Ocean':
        if (type === 'shift') return `${base} bg-gradient-to-b from-[#103050] to-[#0a2038] border-[#205080] text-amber-300 font-bold hover:brightness-125`;
        if (type === 'danger') return `${base} bg-gradient-to-b from-[#40121a] to-[#28080f] border-[#702030] text-red-400 font-bold hover:brightness-125`;
        if (type === 'operator') return `${base} bg-gradient-to-b from-[#0e2844] to-[#081a2e] border-[#184068] text-cyan-300 font-bold hover:brightness-125`;
        if (type === 'number') return `${base} bg-gradient-to-b from-[#0c223a] to-[#061424] border-[#16385d] text-gray-100 font-extrabold hover:brightness-125`;
        return `${base} bg-gradient-to-b from-[#0a1e34] to-[#051220] border-[#14304f] text-cyan-200 hover:brightness-125`;

      case 'Neon Cyber':
        if (type === 'shift') return `${base} bg-[#2d0545] border-[#f000ff] text-[#f000ff] font-bold shadow-[0_0_10px_#f000ff]`;
        if (type === 'danger') return `${base} bg-[#4a001a] border-[#ff0055] text-[#ff0055] font-bold`;
        if (type === 'number') return `${base} bg-[#18002e] border-[#6700b3] text-[#00ffff] font-extrabold`;
        return `${base} bg-[#120022] border-[#420078] text-[#a070ff]`;

      case 'Retro Gold':
        if (type === 'shift') return `${base} bg-[#3b2d08] border-[#ffca28] text-[#ffe082] font-bold`;
        if (type === 'danger') return `${base} bg-[#3b1208] border-[#d32f2f] text-[#ff8a80] font-bold`;
        if (type === 'number') return `${base} bg-[#262014] border-[#423722] text-[#fff8e1] font-extrabold`;
        return `${base} bg-[#1c180e] border-[#362e1a] text-[#ffecb3]`;

      case 'Emerald Matrix':
        if (type === 'shift') return `${base} bg-[#083816] border-[#00e652] text-[#00ff66] font-bold`;
        if (type === 'danger') return `${base} bg-[#380808] border-[#e53935] text-[#ff8a80] font-bold`;
        if (type === 'number') return `${base} bg-[#061c0e] border-[#0c381c] text-[#e8ffe8] font-extrabold`;
        return `${base} bg-[#041208] border-[#082914] text-[#80ffaa]`;

      case 'Modern Light':
        if (type === 'shift') return `${base} bg-amber-100 border-amber-400 text-amber-800 font-bold`;
        if (type === 'danger') return `${base} bg-red-100 border-red-300 text-red-700 font-bold`;
        if (type === 'number') return `${base} bg-white border-gray-300 text-gray-900 font-extrabold shadow-sm`;
        return `${base} bg-gray-100 border-gray-200 text-gray-800`;

      default:
        return base;
    }
  };

  return (
    <div className="w-full flex-1 p-1 sm:p-2 flex flex-col justify-between gap-1 sm:gap-1.5 max-w-2xl mx-auto select-none">
      {/* Top Controls & Scientific Function Keys (Rows 1 to 5 - Red Circle Area) */}
      <div className="flex flex-col gap-1 sm:gap-1 flex-none">
        {rows.slice(0, 5).map((row, rIdx) => {
          const colClass = row.length === 6 ? 'grid-cols-6' : 'grid-cols-5';
          return (
            <div key={rIdx} className={`grid ${colClass} gap-1 sm:gap-1 w-full`}>
              {row.map((btn) => {
                const isHighlighted = highlightedKeyId === btn.id;
                const hasSecondary = !!btn.secondary;

                return (
                  <button
                    key={btn.id}
                    id={btn.id}
                    onClick={() => handleKeyClick(btn.primary, isShift)}
                    className={`${getKeyStyle(btn.type, isHighlighted, false)} ${fontClass}`}
                  >
                    {hasSecondary && (
                      <span
                        className={`text-[8px] sm:text-[9.5px] leading-tight tracking-tighter whitespace-nowrap transition-all max-w-full px-[1px] ${
                          isShift
                            ? 'text-amber-400 font-bold scale-110 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]'
                            : theme === 'Deep Ocean'
                            ? 'text-cyan-400/80'
                            : theme === 'Neon Cyber'
                            ? 'text-[#f000ff]/80'
                            : 'text-gray-400'
                        }`}
                      >
                        {btn.secondary}
                      </span>
                    )}

                    <span
                      className={`text-xs sm:text-sm font-bold leading-tight ${
                        isShift && hasSecondary ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      {btn.primary}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Number Pad & Main Operator Keys (Rows 6 to 9 - Blue Circle Area) */}
      <div className="flex flex-col gap-1 sm:gap-1.5 flex-1 justify-evenly mt-0.5">
        {rows.slice(5).map((row, rIdx) => {
          const colClass = row.length === 6 ? 'grid-cols-6' : 'grid-cols-5';
          return (
            <div key={rIdx + 5} className={`grid ${colClass} gap-1 sm:gap-1.5 w-full flex-1`}>
              {row.map((btn) => {
                const isHighlighted = highlightedKeyId === btn.id;
                const hasSecondary = !!btn.secondary;

                return (
                  <button
                    key={btn.id}
                    id={btn.id}
                    onClick={() => handleKeyClick(btn.primary, isShift)}
                    className={`${getKeyStyle(btn.type, isHighlighted, true)} ${fontClass}`}
                  >
                    {hasSecondary && (
                      <span
                        className={`text-[8px] sm:text-[9.5px] leading-tight tracking-tighter whitespace-nowrap mb-0.5 transition-all max-w-full px-[1px] ${
                          isShift
                            ? 'text-amber-400 font-bold scale-110 drop-shadow-[0_0_4px_rgba(251,191,36,0.8)]'
                            : theme === 'Deep Ocean'
                            ? 'text-cyan-400/80'
                            : theme === 'Neon Cyber'
                            ? 'text-[#f000ff]/80'
                            : 'text-gray-400'
                        }`}
                      >
                        {btn.secondary}
                      </span>
                    )}

                    <span
                      className={`text-xl sm:text-2xl md:text-3xl font-extrabold leading-none ${
                        isShift && hasSecondary ? 'opacity-50' : 'opacity-100'
                      }`}
                    >
                      {btn.primary}
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

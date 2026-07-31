import React from 'react';
import { CalculatorState } from '../types';

interface HeaderDisplayProps {
  state: CalculatorState;
  onClear: () => void;
  onOpenMenu: () => void;
}

export const HeaderDisplay: React.FC<HeaderDisplayProps> = ({ state, onOpenMenu }) => {
  const {
    expression,
    result,
    isShift,
    isHyp,
    angleUnit,
    memory,
    dataRange,
    baseSystem,
    theme,
    fontStyle,
    inputMethod,
  } = state;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  // Theme-specific styles for LCD display
  const getLcdBg = () => {
    switch (theme) {
      case 'Classic':
        return 'bg-[#a7caac] border-b-2 border-[#7a9e7f] text-[#0a1a0d]';
      case 'Amoled':
        return 'bg-black border-b border-[#333333] text-white';
      case 'Deep Ocean':
        return 'bg-[#0a2038] border-b border-[#184470] text-[#7dd3fc]';
      case 'Neon Cyber':
        return 'bg-[#240638] border-b border-[#6b08a3] text-[#00ffff]';
      case 'Retro Gold':
        return 'bg-[#221c08] border-b border-[#5e4d14] text-[#ffc107]';
      case 'Emerald Matrix':
        return 'bg-[#021f0b] border-b border-[#005c21] text-[#00ff66]';
      case 'Modern Light':
        return 'bg-[#cbd5e1] border-b border-[#94a3b8] text-[#0f172a]';
      default:
        return 'bg-[#a7caac] border-b-2 border-[#7a9e7f] text-[#0a1a0d]';
    }
  };

  return (
    <div className={`relative w-full px-5 sm:px-7 pt-5 pb-4 flex flex-col justify-between transition-colors ${getLcdBg()} min-h-[195px] sm:min-h-[235px] md:min-h-[275px]`}>
      {/* Status Bar Indicators */}
      <div className="flex items-center justify-between text-xs sm:text-sm md:text-base tracking-wider opacity-90 font-medium select-none mb-3">
        <div className="flex items-center gap-4">
          <span className={`${angleUnit ? 'text-amber-400 font-bold' : 'opacity-40'}`}>{angleUnit}</span>
          {memory !== 0 && <span className="text-emerald-400 font-bold">M</span>}
          {dataRange === 'Complex' && <span className="text-cyan-400 font-bold">CPLX</span>}
          {baseSystem !== 'DEC' && <span className="text-purple-400 font-bold">{baseSystem}</span>}
          {state.resultDisplayMode === 'improperFraction' && <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">d/c</span>}
          {state.resultDisplayMode === 'mixedFraction' && <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">a b/c</span>}
          {state.resultDisplayMode === 'dms' && <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">DMS</span>}
          {state.resultDisplayMode === 'sci' && <span className="bg-amber-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">FSE</span>}
          {isShift && <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-xs font-bold animate-pulse">SHIFT</span>}
          {isHyp && <span className="bg-cyan-500 text-black px-2 py-0.5 rounded text-xs font-bold">HYP</span>}
        </div>

        <button
          id="btn-more"
          onClick={onOpenMenu}
          className="px-3 py-1 text-xs sm:text-sm rounded-md border border-current/40 hover:bg-current/10 transition-all cursor-pointer font-bold shadow-sm"
          title="More Information"
        >
          More...
        </button>
      </div>

      {/* Main Calculation Display Area */}
      <div className="flex flex-col justify-end text-right space-y-3 my-auto overflow-x-auto no-scrollbar py-2">
        {/* Upper expression / input method preview line */}
        <div id="lcd-expression" className={`text-sm sm:text-base md:text-lg min-h-[28px] opacity-80 font-medium overflow-x-auto no-scrollbar whitespace-nowrap tracking-wide ${fontClass}`}>
          {inputMethod === 'RPN' ? (
            <div className="text-xs sm:text-sm text-emerald-400 font-semibold">RPN Stack: [{state.rpnStack.join(', ')}]</div>
          ) : (
            (() => {
              const expr = expression || '';
              const pos = Math.max(0, Math.min(state.cursorPosition ?? expr.length, expr.length));
              const before = expr.slice(0, pos);
              const after = expr.slice(pos);
              const cursorEl = (
                <span
                  key="cursor"
                  className="inline-block w-[2.5px] h-[1.15em] bg-amber-400 mx-[0.5px] align-middle animate-pulse shadow-[0_0_8px_#fbbf24] rounded-full"
                />
              );

              if (!expr) {
                return (
                  <span className="inline-flex items-center justify-end">
                    <span className="opacity-0">0</span>
                    {cursorEl}
                  </span>
                );
              }

              return (
                <span className="inline-flex items-center justify-end whitespace-pre">
                  <span>{before}</span>
                  {cursorEl}
                  <span>{after}</span>
                </span>
              );
            })()
          )}
        </div>

        {/* Lower result line */}
        <div id="lcd-result" className={`text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-extrabold leading-none tracking-tight whitespace-nowrap overflow-x-auto no-scrollbar drop-shadow-sm ${fontClass}`}>
          {result || '\u00A0'}
        </div>
      </div>
    </div>
  );
};

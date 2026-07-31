import React, { useState } from 'react';
import { ThemeMode } from '../types';

interface ThemeModalProps {
  isOpen: boolean;
  currentTheme: ThemeMode;
  onClose: () => void;
  onSelectTheme: (theme: ThemeMode) => void;
  fontStyle?: string;
}

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  appBg: string;
  lcdBg: string;
  lcdText: string;
  shiftBtn: string;
  dangerBtn: string;
  numBtn: string;
  opBtn: string;
  previewCardBg: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 'Classic',
    name: 'Classic',
    appBg: 'bg-[#1a1a1e]',
    lcdBg: 'bg-[#a7caac] border-b-2 border-[#7a9e7f] text-[#0a1a0d]',
    lcdText: 'text-[#0a1a0d]',
    shiftBtn: 'bg-[#ffe082] border-[#ffd54f] text-[#3e2723] font-bold',
    dangerBtn: 'bg-[#f87171] border-[#ef4444] text-white font-bold',
    numBtn: 'bg-[#333339] border-[#484852] text-white font-bold',
    opBtn: 'bg-[#28282d] border-[#3a3a42] text-gray-200',
    previewCardBg: 'bg-[#1a1a1e]',
  },
  {
    id: 'Amoled',
    name: 'Amoled',
    appBg: 'bg-black',
    lcdBg: 'bg-black border-b border-[#2d2d2d] text-white',
    lcdText: 'text-white',
    shiftBtn: 'bg-[#121212] border-amber-500 text-amber-400 font-bold',
    dangerBtn: 'bg-[#1a0a0a] border-red-600 text-red-500 font-bold',
    numBtn: 'bg-black border-[#282828] text-white font-bold',
    opBtn: 'bg-[#0a0a0a] border-[#222222] text-gray-300',
    previewCardBg: 'bg-black',
  },
  {
    id: 'Deep Ocean',
    name: 'Deep Ocean',
    appBg: 'bg-gradient-to-b from-[#08182b] via-[#0c243f] to-[#061220]',
    lcdBg: 'bg-[#0a2038] border-b border-[#184470] text-[#7dd3fc]',
    lcdText: 'text-[#7dd3fc]',
    shiftBtn: 'bg-[#103050] border-[#205080] text-amber-300 font-bold',
    dangerBtn: 'bg-[#40121a] border-[#702030] text-red-400 font-bold',
    numBtn: 'bg-[#0c223a] border-[#16385d] text-gray-100 font-bold',
    opBtn: 'bg-[#081a2e] border-[#14304f] text-cyan-200',
    previewCardBg: 'bg-[#08182b]',
  },
  {
    id: 'Neon Cyber',
    name: 'Neon Cyber',
    appBg: 'bg-[#130321]',
    lcdBg: 'bg-[#240638] border-b border-[#6b08a3] text-[#00ffff]',
    lcdText: 'text-[#00ffff]',
    shiftBtn: 'bg-[#380252] border-[#f000ff] text-[#f000ff] font-bold shadow-[0_0_8px_#f000ff]',
    dangerBtn: 'bg-[#4a001a] border-[#ff0055] text-[#ff0055] font-bold',
    numBtn: 'bg-[#1c0033] border-[#6700b3] text-[#00ffff] font-bold',
    opBtn: 'bg-[#120022] border-[#420078] text-[#a070ff]',
    previewCardBg: 'bg-[#130321]',
  },
  {
    id: 'Retro Gold',
    name: 'Retro Gold',
    appBg: 'bg-[#181510]',
    lcdBg: 'bg-[#221c08] border-b border-[#5e4d14] text-[#ffc107]',
    lcdText: 'text-[#ffc107]',
    shiftBtn: 'bg-[#3b2d08] border-[#ffca28] text-[#ffe082] font-bold',
    dangerBtn: 'bg-[#3b1208] border-[#d32f2f] text-[#ff8a80] font-bold',
    numBtn: 'bg-[#262014] border-[#423722] text-[#fff8e1] font-bold',
    opBtn: 'bg-[#1c180e] border-[#362e1a] text-[#ffecb3]',
    previewCardBg: 'bg-[#181510]',
  },
  {
    id: 'Emerald Matrix',
    name: 'Emerald Matrix',
    appBg: 'bg-[#030d06]',
    lcdBg: 'bg-[#021f0b] border-b border-[#005c21] text-[#00ff66]',
    lcdText: 'text-[#00ff66]',
    shiftBtn: 'bg-[#083816] border-[#00e652] text-[#00ff66] font-bold',
    dangerBtn: 'bg-[#380808] border-[#e53935] text-[#ff8a80] font-bold',
    numBtn: 'bg-[#061c0e] border-[#0c381c] text-[#e8ffe8] font-bold',
    opBtn: 'bg-[#041208] border-[#082914] text-[#80ffaa]',
    previewCardBg: 'bg-[#030d06]',
  },
  {
    id: 'Modern Light',
    name: 'Modern Light',
    appBg: 'bg-[#e2e8f0]',
    lcdBg: 'bg-[#cbd5e1] border-b border-[#94a3b8] text-[#0f172a]',
    lcdText: 'text-[#0f172a]',
    shiftBtn: 'bg-[#fef3c7] border-[#f59e0b] text-[#92400e] font-bold',
    dangerBtn: 'bg-[#fee2e2] border-[#f87171] text-[#991b1b] font-bold',
    numBtn: 'bg-white border-[#cbd5e1] text-[#0f172a] font-bold',
    opBtn: 'bg-[#f1f5f9] border-[#e2e8f0] text-[#334155]',
    previewCardBg: 'bg-[#e2e8f0]',
  },
];

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  currentTheme,
  onClose,
  onSelectTheme,
  fontStyle = 'Standard',
}) => {
  const [selectedIdx, setSelectedIdx] = useState(() => {
    const idx = THEMES.findIndex((t) => t.id === currentTheme);
    return idx >= 0 ? idx : 0;
  });

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  React.useEffect(() => {
    if (isOpen) {
      const idx = THEMES.findIndex((t) => t.id === currentTheme);
      if (idx >= 0) setSelectedIdx(idx);
    }
  }, [isOpen, currentTheme]);

  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const activeTheme = THEMES[selectedIdx] || THEMES[0];

  const handleNextTheme = () => {
    setSelectedIdx((prev) => (prev + 1) % THEMES.length);
  };

  const handlePrevTheme = () => {
    setSelectedIdx((prev) => (prev - 1 + THEMES.length) % THEMES.length);
  };

  // Touch & Swipe handlers
  const minSwipeDistance = 35;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      // Swiped left -> next theme
      handleNextTheme();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> prev theme
      handlePrevTheme();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Mouse Drag handlers for desktop preview swiping
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setTouchEndX(null);
    setTouchStartX(e.clientX);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setTouchEndX(e.clientX);
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      handleNextTheme();
    } else if (distance < -minSwipeDistance) {
      handlePrevTheme();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const handleConfirm = () => {
    onSelectTheme(activeTheme.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm bg-[#2b2b2e] border border-gray-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 text-white ${fontClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-1">Theme</h2>
        <p className="text-center text-gray-200 text-lg font-semibold mb-4">{activeTheme.name}</p>

        {/* Mini Calculator Preview Frame with Swipe Gesture Support */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevTheme();
            }}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-gray-600 transition-all cursor-pointer shadow-lg active:scale-95"
            title="Previous Theme"
          >
            ‹
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextTheme();
            }}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-gray-600 transition-all cursor-pointer shadow-lg active:scale-95"
            title="Next Theme"
          >
            ›
          </button>

          <div
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className={`relative w-full rounded-xl border border-gray-600/80 shadow-2xl overflow-hidden p-3 flex flex-col space-y-2 mb-5 select-none transition-colors duration-200 cursor-grab active:cursor-grabbing ${activeTheme.previewCardBg}`}
          >
          {/* Mini LCD Display Screen */}
          <div className={`w-full h-24 rounded-lg p-2.5 flex flex-col justify-between ${activeTheme.lcdBg}`}>
            <div className="flex justify-between text-[10px] font-bold opacity-80">
              <span>DEG</span>
              <span>GRAD</span>
              <span>M</span>
            </div>
            <div className="flex justify-between text-[9px] font-semibold opacity-60">
              <span>EXPR</span>
              <span>CPLX</span>
            </div>
            <div className="text-right text-2xl font-bold font-mono tracking-tight">0</div>
          </div>

          {/* Mini Keypad Preview (6 Columns x 7 Rows) */}
          <div className="grid grid-cols-6 gap-1 pt-1">
            {/* Row 1 */}
            <div className={`rounded p-1 text-[8px] text-center font-bold border ${activeTheme.shiftBtn}`}>SHIFT</div>
            <div className={`rounded p-1 text-[8px] text-center font-bold border ${activeTheme.opBtn}`}>MENU</div>
            <div className={`rounded p-1 text-[8px] text-center font-bold border ${activeTheme.opBtn}`}>◄</div>
            <div className={`rounded p-1 text-[8px] text-center font-bold border ${activeTheme.opBtn}`}>►</div>
            <div className={`rounded p-1 text-[8px] text-center font-bold border ${activeTheme.dangerBtn}`}>⌫</div>
            <div className={`rounded p-1 text-[8px] text-center font-bold border ${activeTheme.dangerBtn}`}>AC</div>

            {/* Row 2 */}
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>DRG</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>x↔E</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>[ █ ]</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>Σ</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>∫dx</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>CONV</div>

            {/* Row 3 */}
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>π</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>sin</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>cos</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>tan</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>i</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>e</div>

            {/* Row 4 */}
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>x⁻¹</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>x²</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>√x</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>xʸ</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>log</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>In</div>

            {/* Row 5 - Numbers 7 8 9 ( ) */}
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>7</div>
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>8</div>
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>9</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>(</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>)</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>MR</div>

            {/* Row 6 - Numbers 4 5 6 × ÷ */}
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>4</div>
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>5</div>
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>6</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>×</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>÷</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>x→M</div>

            {/* Row 7 - Numbers 1 2 3 + - */}
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>1</div>
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>2</div>
            <div className={`rounded p-1 text-[9px] text-center font-bold border ${activeTheme.numBtn}`}>3</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>+</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>-</div>
            <div className={`rounded p-1 text-[8px] text-center border ${activeTheme.opBtn}`}>=</div>
          </div>
        </div>
      </div>

        {/* 7 Pagination Dots matching exact UI in screenshot 1 & 2 */}
        <div className="flex items-center justify-center gap-2.5 mb-6">
          {THEMES.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setSelectedIdx(idx)}
              className={`w-4 h-4 rounded-full border-2 border-white transition-all cursor-pointer ${
                idx === selectedIdx ? 'bg-white scale-110' : 'bg-transparent hover:bg-white/40'
              }`}
              title={t.name}
            />
          ))}
        </div>

        {/* Bottom Action buttons matching exact design in screenshot 1 & 2 */}
        <div className="flex items-center justify-end gap-6 text-emerald-400 font-bold text-base tracking-wider">
          <button
            onClick={onClose}
            className="hover:text-emerald-300 transition-colors cursor-pointer uppercase"
          >
            CANCEL
          </button>
          <button
            onClick={handleConfirm}
            className="hover:text-emerald-300 transition-colors cursor-pointer uppercase"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

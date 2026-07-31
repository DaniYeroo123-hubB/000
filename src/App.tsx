/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { CalculatorState, HistoryItem, PhysicalConstant, ThemeMode, FontStyle } from './types';
import { evaluateExpression, toDMS, toFractionString } from './utils/mathEngine';
import { HeaderDisplay } from './components/HeaderDisplay';
import { Keypad } from './components/Keypad';
import { MenuDropdown } from './components/MenuDropdown';
import { ThemeModal } from './components/ThemeModal';
import { TextStyleModal } from './components/TextStyleModal';
import { HistoryModal } from './components/HistoryModal';
import { QuickTourModal } from './components/QuickTourModal';
import { ConstantsModal } from './components/ConstantsModal';
import { ConverterModal } from './components/ConverterModal';
import { MatrixModal } from './components/MatrixModal';
import { EquationSolverModal } from './components/EquationSolverModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const [calcState, setCalcState] = useState<CalculatorState>(() => {
    const savedTheme = localStorage.getItem('calc_theme') as ThemeMode;
    const savedFontStyle = localStorage.getItem('calc_font_style') as FontStyle;
    return {
      expression: '',
      cursorPosition: 0,
      result: '0',
      lastAns: '0',
      memory: 0,
      isShift: false,
      isHyp: false,
      angleUnit: 'GRAD',
      baseSystem: 'DEC',
      inputMethod: 'Classic',
      dataRange: 'Real',
      layout: 'Compact',
      theme: savedTheme || 'Amoled',
      fontStyle: savedFontStyle || 'Standard',
      precision: 10,
      thousandSeparator: 'space',
      resultDisplayMode: 'normal',
      hapticFeedback: true,
      soundEffects: true,
      rpnStack: [],
    };
  });

  // Sample history matching screenshot 1
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      expression: '3 000 000 000',
      result: '3 000 000 000',
      timestamp: '2026-07-27T10:00:00Z',
      dateGroup: 'Monday 27 July, 2026',
    },
    {
      id: '2',
      expression: '100 000 × 100',
      result: '10 000 000',
      timestamp: '2026-07-27T10:05:00Z',
      dateGroup: 'Monday 27 July, 2026',
    },
    {
      id: '3',
      expression: '39 – 22',
      result: '17',
      timestamp: '2026-07-27T10:10:00Z',
      dateGroup: 'Monday 27 July, 2026',
    },
    {
      id: '4',
      expression: '17 – 4',
      result: '13',
      timestamp: '2026-07-27T10:15:00Z',
      dateGroup: 'Monday 27 July, 2026',
    },
    {
      id: '5',
      expression: '40 – 24',
      result: '16',
      timestamp: '2026-07-27T10:20:00Z',
      dateGroup: 'Monday 27 July, 2026',
    },
    {
      id: '6',
      expression: '10 000 + 700 000 + 400 000 + 300 000 + 300 000',
      result: '1 710 000',
      timestamp: '2026-07-27T10:25:00Z',
      dateGroup: 'Monday 27 July, 2026',
    },
  ]);

  // Modal Visibility States
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [tourKeyHighlight, setTourKeyHighlight] = useState<string | undefined>(undefined);

  // Auto-enable Quick Tour on first visit
  useEffect(() => {
    const tourSeen = localStorage.getItem('calc_quick_tour_seen');
    if (!tourSeen) {
      setActiveModal('tour');
      setTourKeyHighlight('btn-shift');
      localStorage.setItem('calc_quick_tour_seen', 'true');
    }
  }, []);

  // Save settings when theme or fontStyle changes
  useEffect(() => {
    if (calcState.theme) {
      localStorage.setItem('calc_theme', calcState.theme);
    }
  }, [calcState.theme]);

  useEffect(() => {
    if (calcState.fontStyle) {
      localStorage.setItem('calc_font_style', calcState.fontStyle);
    }
  }, [calcState.fontStyle]);

  // Real-time Live Calculation Effect
  useEffect(() => {
    const trimmedExpr = calcState.expression.trim();
    if (!trimmedExpr) {
      setCalcState((prev) => {
        if (prev.result === '0') return prev;
        return { ...prev, result: '0' };
      });
      return;
    }

    const res = evaluateExpression(
      calcState.expression,
      calcState.angleUnit,
      calcState.baseSystem,
      calcState.dataRange,
      calcState.precision,
      calcState.thousandSeparator,
      calcState.lastAns
    );

    if (res.success) {
      let finalDisplay = res.formattedDisplay;
      const numVal = parseFloat(res.value);
      if (!isNaN(numVal)) {
        if (calcState.resultDisplayMode === 'improperFraction') {
          finalDisplay = toFractionString(numVal, true);
        } else if (calcState.resultDisplayMode === 'mixedFraction') {
          finalDisplay = toFractionString(numVal, false);
        } else if (calcState.resultDisplayMode === 'dms') {
          finalDisplay = toDMS(numVal);
        } else if (calcState.resultDisplayMode === 'sci') {
          finalDisplay = numVal.toExponential(calcState.precision);
        }
      }

      setCalcState((prev) => {
        if (prev.result === finalDisplay) return prev;
        return { ...prev, result: finalDisplay };
      });
    } else {
      setCalcState((prev) => {
        if (prev.result === '') return prev;
        return { ...prev, result: '' };
      });
    }
  }, [
    calcState.expression,
    calcState.angleUnit,
    calcState.baseSystem,
    calcState.dataRange,
    calcState.precision,
    calcState.thousandSeparator,
    calcState.resultDisplayMode,
    calcState.lastAns,
  ]);

  // Date formatter for History Items
  const getFormattedDateGroup = () => {
    const d = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return d.toLocaleDateString('en-GB', options);
  };

  // Helper to insert text at cursor position
  const insertTextAtCursor = useCallback((textToInsert: string) => {
    setCalcState((prev) => {
      const expr = prev.expression;
      const curPos = prev.cursorPosition ?? expr.length;
      const pos = Math.max(0, Math.min(curPos, expr.length));
      const before = expr.slice(0, pos);
      const after = expr.slice(pos);
      const newExpr = before + textToInsert + after;
      const newPos = pos + textToInsert.length;
      return {
        ...prev,
        expression: newExpr,
        cursorPosition: newPos,
        isShift: false,
      };
    });
  }, []);

  // Evaluation trigger
  const handleEvaluate = useCallback(() => {
    if (!calcState.expression.trim()) return;

    const res = evaluateExpression(
      calcState.expression,
      calcState.angleUnit,
      calcState.baseSystem,
      calcState.dataRange,
      calcState.precision,
      calcState.thousandSeparator,
      calcState.lastAns
    );

    if (res.success) {
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        expression: calcState.expression,
        result: res.formattedDisplay,
        timestamp: new Date().toISOString(),
        dateGroup: getFormattedDateGroup(),
      };

      setHistory((prev) => [newItem, ...prev]);
      setCalcState((prev) => ({
        ...prev,
        result: res.formattedDisplay,
        lastAns: res.value,
        cursorPosition: prev.expression.length,
        isShift: false,
      }));
    } else {
      setCalcState((prev) => ({
        ...prev,
        result: res.formattedDisplay,
        isShift: false,
      }));
    }
  }, [calcState]);

  // Keypress Handler
  const handleKeyPress = useCallback(
    (key: string, isShiftActive: boolean) => {
      // 1. SHIFT Key
      if (key === 'SHIFT') {
        setCalcState((prev) => ({ ...prev, isShift: !prev.isShift }));
        return;
      }

      // 2. Clear (AC)
      if (key === 'AC') {
        setCalcState((prev) => ({
          ...prev,
          expression: '',
          cursorPosition: 0,
          result: '0',
          isShift: false,
        }));
        return;
      }

      // 3. Left Arrow (◄)
      if (key === '◄') {
        setCalcState((prev) => {
          const expr = prev.expression;
          const curPos = prev.cursorPosition ?? expr.length;
          const nextPos = isShiftActive ? 0 : Math.max(0, curPos - 1);
          return { ...prev, cursorPosition: nextPos, isShift: false };
        });
        return;
      }

      // 4. Right Arrow (►)
      if (key === '►') {
        setCalcState((prev) => {
          const expr = prev.expression;
          const curPos = prev.cursorPosition ?? expr.length;
          const nextPos = isShiftActive ? expr.length : Math.min(expr.length, curPos + 1);
          return { ...prev, cursorPosition: nextPos, isShift: false };
        });
        return;
      }

      // 5. Backspace (⌫)
      if (key === '⌫') {
        setCalcState((prev) => {
          const expr = prev.expression;
          const curPos = prev.cursorPosition ?? expr.length;
          if (curPos <= 0) return { ...prev, isShift: false };
          const before = expr.slice(0, curPos - 1);
          const after = expr.slice(curPos);
          return {
            ...prev,
            expression: before + after,
            cursorPosition: curPos - 1,
            isShift: false,
          };
        });
        return;
      }

      // 6. Equal / Calculate
      if (key === '=') {
        if (isShiftActive) {
          insertTextAtCursor(' <= ');
        } else {
          handleEvaluate();
        }
        return;
      }

      // 7. DRG Mode Toggle
      if (key === 'DRG') {
        setCalcState((prev) => {
          const nextUnit = prev.angleUnit === 'DEG' ? 'RAD' : prev.angleUnit === 'RAD' ? 'GRAD' : 'DEG';
          return { ...prev, angleUnit: nextUnit, isShift: false };
        });
        return;
      }

      // 8. MENU Button
      if (key === 'MENU') {
        setActiveModal('menu');
        setCalcState((prev) => ({ ...prev, isShift: false }));
        return;
      }

      // 9. Modals / Tool Shortcuts
      if (key === '📷' || key === 'CNST') {
        setActiveModal('cnst');
        setCalcState((prev) => ({ ...prev, isShift: false }));
        return;
      }
      if (key === 'CONV') {
        setActiveModal('conv');
        setCalcState((prev) => ({ ...prev, isShift: false }));
        return;
      }
      if (key === '[ █ ]' || key === 'MTRX') {
        setActiveModal('mtrx');
        setCalcState((prev) => ({ ...prev, isShift: false }));
        return;
      }
      if (key === 'XY,M') {
        if (isShiftActive) {
          setActiveModal('history');
          setCalcState((prev) => ({ ...prev, isShift: false }));
          return;
        }
        insertTextAtCursor(',');
        return;
      }

      // 10. Memory operations
      if (key === 'MR') {
        if (isShiftActive) {
          // M+
          setCalcState((prev) => ({ ...prev, memory: prev.memory + parseFloat(prev.result || '0'), isShift: false }));
        } else {
          // Recall
          insertTextAtCursor(calcState.memory.toString());
        }
        return;
      }
      if (key === 'x→M') {
        if (isShiftActive) {
          // M-
          setCalcState((prev) => ({ ...prev, memory: prev.memory - parseFloat(prev.result || '0'), isShift: false }));
        } else {
          // Store
          setCalcState((prev) => ({ ...prev, memory: parseFloat(prev.result || '0'), isShift: false }));
        }
        return;
      }

      // 11. Special Math Conversions (Fraction / DMS / Sci)
      if (key === 'D°M\'S') {
        setCalcState((prev) => ({
          ...prev,
          resultDisplayMode: prev.resultDisplayMode === 'dms' ? 'normal' : 'dms',
          isShift: false,
        }));
        return;
      }
      if (key === 'x↔E') {
        setCalcState((prev) => ({
          ...prev,
          resultDisplayMode: prev.resultDisplayMode === 'sci' ? 'normal' : 'sci',
          isShift: false,
        }));
        return;
      }
      if (key === 'd/c') {
        if (isShiftActive) {
          // secondary a b/c (mixed fraction)
          setCalcState((prev) => ({
            ...prev,
            resultDisplayMode: prev.resultDisplayMode === 'mixedFraction' ? 'normal' : 'mixedFraction',
            isShift: false,
          }));
        } else {
          // primary d/c
          if (calcState.expression.trim().length > 0) {
            insertTextAtCursor('/');
          }
          setCalcState((prev) => ({
            ...prev,
            resultDisplayMode: prev.resultDisplayMode === 'improperFraction' ? 'normal' : 'improperFraction',
            isShift: false,
          }));
        }
        return;
      }

      // 12. Secondary function mappings when SHIFT is active
      let insertedText = key;
      if (isShiftActive) {
        if (key === 'sin') insertedText = 'asin(';
        else if (key === 'cos') insertedText = 'acos(';
        else if (key === 'tan') insertedText = 'atan(';
        else if (key === 'π') insertedText = 'sinh(';
        else if (key === 'i') insertedText = '∠';
        else if (key === 'e') insertedText = 'log(';
        else if (key === 'x²') insertedText = '^3';
        else if (key === '√x') insertedText = 'cbrt(';
        else if (key === 'xʸ') insertedText = 'root(';
        else if (key === 'log10') insertedText = '10^(';
        else if (key === 'In') insertedText = 'e^(';
        else if (key === '4') insertedText = ' factorial(';
        else if (key === '5') insertedText = ' nCr ';
        else if (key === '6') insertedText = ' nPr ';
        else if (key === '7') insertedText = 're(';
        else if (key === '8') insertedText = 'im(';
        else if (key === '9') insertedText = 'arg(';
        else if (key === '(') insertedText = 'conj(';
        else if (key === ')') insertedText = ' mod ';
        else if (key === '0' || key === '.') insertedText = 'random()';
        else if (key === 'Σ') insertedText = 'π';
        else if (key === '∫ dx') insertedText = 'd/dx(';
        else if (key === 'x⁻¹') insertedText = 'lim(';
        else if (key === 'X') insertedText = 'y';
        else if (key === '×') { setCalcState((prev) => ({ ...prev, baseSystem: 'BIN', isShift: false })); return; }
        else if (key === '÷') { setCalcState((prev) => ({ ...prev, baseSystem: 'OCT', isShift: false })); return; }
        else if (key === '+') { setCalcState((prev) => ({ ...prev, baseSystem: 'DEC', isShift: false })); return; }
        else if (key === '–') { setCalcState((prev) => ({ ...prev, baseSystem: 'HEX', isShift: false })); return; }
        else if (key === '1') {
          setActiveModal('cnst');
          setCalcState((prev) => ({ ...prev, isShift: false }));
          return;
        } else if (key === '2') {
          setActiveModal('conv');
          setCalcState((prev) => ({ ...prev, isShift: false }));
          return;
        } else if (key === '3') insertedText = 'abs(';
        else if (key === '+/–') insertedText = 'Ans';
        else if (key === 'EXP') insertedText = 'e';
      } else {
        // Standard primary mappings
        if (key === 'sin') insertedText = 'sin(';
        else if (key === 'cos') insertedText = 'cos(';
        else if (key === 'tan') insertedText = 'tan(';
        else if (key === '√x') insertedText = '√(';
        else if (key === 'log10') insertedText = 'log10(';
        else if (key === 'In') insertedText = 'ln(';
        else if (key === 'x²') insertedText = '^2';
        else if (key === 'x⁻¹') insertedText = '^(-1)';
        else if (key === 'xʸ') insertedText = '^';
        else if (key === '∫ dx') insertedText = '∫(';
        else if (key === 'Σ') insertedText = 'sum(';
        else if (key === 'X') insertedText = 'x';
        else if (key === '+/–') insertedText = '-';
        else if (key === 'EXP') insertedText = '*10^';
      }

      // Insert at current cursor position
      insertTextAtCursor(insertedText);
    },
    [calcState.memory, calcState.result, handleEvaluate, insertTextAtCursor]
  );

  // Global Physical Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key >= '0' && e.key <= '9') handleKeyPress(e.key, false);
      else if (e.key === '.') handleKeyPress('.', false);
      else if (e.key === '+') handleKeyPress('+', false);
      else if (e.key === '-') handleKeyPress('–', false);
      else if (e.key === '*') handleKeyPress('×', false);
      else if (e.key === '/') handleKeyPress('÷', false);
      else if (e.key === '(') handleKeyPress('(', false);
      else if (e.key === ')') handleKeyPress(')', false);
      else if (e.key === 'ArrowLeft') handleKeyPress('◄', false);
      else if (e.key === 'ArrowRight') handleKeyPress('►', false);
      else if (e.key === 'Enter') handleKeyPress('=', false);
      else if (e.key === 'Backspace') handleKeyPress('⌫', false);
      else if (e.key === 'Escape') handleKeyPress('AC', false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  // Insert constant / converter value into calculator
  const handleInsertValue = (val: string) => {
    insertTextAtCursor(val);
  };

  const handleSelectConstant = (c: PhysicalConstant) => {
    handleInsertValue(c.value.toString());
  };

  const handleSelectHistoryItem = (item: HistoryItem) => {
    setCalcState((prev) => ({
      ...prev,
      expression: item.expression,
      cursorPosition: item.expression.length,
      result: item.result,
    }));
  };

  // Main background theme styling
  const getThemeBg = () => {
    switch (calcState.theme) {
      case 'Classic':
        return 'bg-[#1a1a1e]';
      case 'Amoled':
        return 'bg-black';
      case 'Deep Ocean':
        return 'bg-[#08182b]';
      case 'Neon Cyber':
        return 'bg-[#130321]';
      case 'Retro Gold':
        return 'bg-[#181510]';
      case 'Emerald Matrix':
        return 'bg-[#030d06]';
      case 'Modern Light':
        return 'bg-[#e2e8f0]';
      default:
        return 'bg-[#1a1a1e]';
    }
  };

  return (
    <div className={`w-full h-screen flex flex-col justify-between overflow-hidden select-none ${getThemeBg()}`}>
      {/* Top LCD Display Header */}
      <HeaderDisplay
        state={calcState}
        onClear={() => handleKeyPress('AC', false)}
        onOpenMenu={() => setActiveModal('menu')}
      />

      {/* Calculator Keypad */}
      <Keypad
        state={calcState}
        onKeyPress={handleKeyPress}
        highlightedKeyId={tourKeyHighlight}
      />

      {/* Flyout Menu Dropdown */}
      <MenuDropdown
        isOpen={activeModal === 'menu'}
        onClose={() => setActiveModal(null)}
        onSelectOption={(option) => {
          setActiveModal(option);
          if (option === 'tour') setTourKeyHighlight('btn-shift');
        }}
        fontStyle={calcState.fontStyle}
      />

      {/* Modals & Screens */}
      <ThemeModal
        isOpen={activeModal === 'theme'}
        currentTheme={calcState.theme}
        onClose={() => setActiveModal(null)}
        onSelectTheme={(theme) => setCalcState((prev) => ({ ...prev, theme }))}
        fontStyle={calcState.fontStyle}
      />

      <TextStyleModal
        isOpen={activeModal === 'text-style'}
        currentStyle={calcState.fontStyle}
        onClose={() => setActiveModal(null)}
        onSelectStyle={(fontStyle) => setCalcState((prev) => ({ ...prev, fontStyle }))}
        fontStyle={calcState.fontStyle}
      />

      <HistoryModal
        isOpen={activeModal === 'history'}
        history={history}
        onClose={() => setActiveModal(null)}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={() => setHistory([])}
        fontStyle={calcState.fontStyle}
      />

      <QuickTourModal
        isOpen={activeModal === 'tour'}
        onClose={() => {
          setActiveModal(null);
          setTourKeyHighlight(undefined);
        }}
        onHighlightKey={setTourKeyHighlight}
        fontStyle={calcState.fontStyle}
      />

      <ConstantsModal
        isOpen={activeModal === 'cnst'}
        onClose={() => setActiveModal(null)}
        onSelectConstant={handleSelectConstant}
        fontStyle={calcState.fontStyle}
      />

      <ConverterModal
        isOpen={activeModal === 'conv'}
        onClose={() => setActiveModal(null)}
        onInsertResult={handleInsertValue}
        fontStyle={calcState.fontStyle}
      />

      <MatrixModal
        isOpen={activeModal === 'mtrx'}
        onClose={() => setActiveModal(null)}
        onInsertResult={handleInsertValue}
        fontStyle={calcState.fontStyle}
      />

      <EquationSolverModal
        isOpen={activeModal === 'eqsolver'}
        onClose={() => setActiveModal(null)}
        onInsertResult={handleInsertValue}
        fontStyle={calcState.fontStyle}
      />

      <AboutModal
        isOpen={activeModal === 'about'}
        onClose={() => setActiveModal(null)}
        fontStyle={calcState.fontStyle}
      />
    </div>
  );
}

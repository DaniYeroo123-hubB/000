import React, { useState } from 'react';
import { X, ArrowRightLeft } from 'lucide-react';
import { UNIT_CATEGORIES, convertValue } from '../utils/unitConverter';

interface ConverterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertResult: (val: string) => void;
  fontStyle?: string;
}

export const ConverterModal: React.FC<ConverterModalProps> = ({
  isOpen,
  onClose,
  onInsertResult,
  fontStyle = 'Handwriting',
}) => {
  const [activeCatIdx, setActiveCatIdx] = useState(0);
  const [inputVal, setInputVal] = useState('1');

  const cat = UNIT_CATEGORIES[activeCatIdx] || UNIT_CATEGORIES[0];
  const [fromUnit, setFromUnit] = useState(cat.units[0].symbol);
  const [toUnit, setToUnit] = useState(cat.units[1]?.symbol || cat.units[0].symbol);

  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const numVal = parseFloat(inputVal) || 0;
  const resultVal = convertValue(numVal, cat.name, fromUnit, toUnit);
  const formattedResult = resultVal.toLocaleString('en-US', { maximumFractionDigits: 8 });

  const handleCategoryChange = (idx: number) => {
    setActiveCatIdx(idx);
    const newCat = UNIT_CATEGORIES[idx];
    setFromUnit(newCat.units[0].symbol);
    setToUnit(newCat.units[1]?.symbol || newCat.units[0].symbol);
  };

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in ${fontClass}`}>
      <div
        className="w-full max-w-md bg-[#202024] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col text-white overflow-hidden p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h2 className="text-lg font-bold text-gray-100">Unit Converter</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {UNIT_CATEGORIES.map((c, idx) => (
            <button
              key={c.name}
              onClick={() => handleCategoryChange(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeCatIdx === idx ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Input & Units Box */}
        <div className="bg-[#18181a] border border-gray-700/80 rounded-xl p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-xs text-gray-400 font-semibold uppercase">Value to Convert:</label>
            <input
              type="number"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="w-full bg-[#242428] border border-gray-600 rounded-lg px-3 py-2 text-xl font-bold text-white focus:outline-hidden focus:border-emerald-400"
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-gray-400 font-semibold uppercase">From:</label>
              <select
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full bg-[#242428] border border-gray-600 rounded-lg p-2 text-sm text-white focus:outline-hidden"
              >
                {cat.units.map((u) => (
                  <option key={u.symbol} value={u.symbol}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              className="mt-5 p-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-emerald-400 cursor-pointer"
              title="Swap Units"
            >
              <ArrowRightLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 space-y-1">
              <label className="text-xs text-gray-400 font-semibold uppercase">To:</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full bg-[#242428] border border-gray-600 rounded-lg p-2 text-sm text-white focus:outline-hidden"
              >
                {cat.units.map((u) => (
                  <option key={u.symbol} value={u.symbol}>
                    {u.name} ({u.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Result Banner */}
          <div className="pt-2 text-center">
            <div className="text-xs text-gray-400 font-semibold">Converted Result</div>
            <div className="text-2xl font-bold text-emerald-400 mt-1">{formattedResult} {toUnit}</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              onInsertResult(resultVal.toString());
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-base cursor-pointer shadow-md transition-colors"
          >
            Insert Result into Calculator
          </button>
        </div>
      </div>
    </div>
  );
};

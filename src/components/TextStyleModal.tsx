import React, { useState } from 'react';
import { FontStyle } from '../types';
import { Type, Check, X } from 'lucide-react';

interface TextStyleModalProps {
  isOpen: boolean;
  currentStyle: FontStyle;
  onClose: () => void;
  onSelectStyle: (style: FontStyle) => void;
  fontStyle?: string;
}

export interface FontOption {
  id: FontStyle;
  name: string;
  description: string;
  fontClass: string;
  previewText: string;
}

const FONT_OPTIONS: FontOption[] = [
  {
    id: 'Handwriting',
    name: 'Handwriting (Casual)',
    description: 'Natural handwritten script feel for an authentic notebook look',
    fontClass: 'font-handwriting',
    previewText: '123 + 456 = 579',
  },
  {
    id: 'Digital',
    name: 'Digital LCD (Monospace)',
    description: 'Crisp high-precision digital font styled like physical calculators',
    fontClass: 'font-mono',
    previewText: '123 + 456 = 579',
  },
  {
    id: 'Standard',
    name: 'Standard (Clean Sans)',
    description: 'Modern, highly legible modern typography for maximum readability',
    fontClass: 'font-sans',
    previewText: '123 + 456 = 579',
  },
];

export const TextStyleModal: React.FC<TextStyleModalProps> = ({
  isOpen,
  currentStyle,
  onClose,
  onSelectStyle,
  fontStyle = 'Standard',
}) => {
  const [selectedStyle, setSelectedStyle] = useState<FontStyle>(currentStyle);

  React.useEffect(() => {
    if (isOpen) {
      setSelectedStyle(currentStyle);
    }
  }, [isOpen, currentStyle]);

  if (!isOpen) return null;

  const currentFontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const handleApply = () => {
    onSelectStyle(selectedStyle);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-sm bg-[#1a1a1d] border border-gray-700/80 rounded-2xl shadow-2xl overflow-hidden p-5 text-white ${currentFontClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-800 mb-4">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-gray-100">Text Style</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Font Style Options List */}
        <div className="space-y-3 mb-6">
          {FONT_OPTIONS.map((opt) => {
            const isSelected = selectedStyle === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => setSelectedStyle(opt.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/40 border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                    : 'bg-[#222226] border-gray-700/60 hover:border-gray-600 hover:bg-[#28282d]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-100">{opt.name}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-gray-600 bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>

                <p className="text-xs text-gray-400 mb-2">{opt.description}</p>

                {/* Live Font Sample Box */}
                <div
                  className={`bg-[#121215] border border-gray-800 rounded-lg p-2 text-center text-lg font-bold ${
                    opt.fontClass
                  } ${isSelected ? 'text-emerald-300' : 'text-gray-300'}`}
                >
                  {opt.previewText}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-6 text-emerald-400 font-bold text-sm tracking-wider">
          <button
            onClick={onClose}
            className="hover:text-emerald-300 transition-colors cursor-pointer uppercase"
          >
            CANCEL
          </button>
          <button
            onClick={handleApply}
            className="hover:text-emerald-300 transition-colors cursor-pointer uppercase"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

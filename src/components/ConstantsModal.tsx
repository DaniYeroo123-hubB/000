import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { PHYSICAL_CONSTANTS } from '../utils/constants';
import { PhysicalConstant } from '../types';

interface ConstantsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectConstant: (c: PhysicalConstant) => void;
  fontStyle?: string;
}

export const ConstantsModal: React.FC<ConstantsModalProps> = ({
  isOpen,
  onClose,
  onSelectConstant,
  fontStyle = 'Handwriting',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const categories = ['All', 'Math', 'Universal', 'Electromagnetic', 'Atomic', 'Physico-Chemical'];

  const filtered = PHYSICAL_CONSTANTS.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in ${fontClass}`}>
      <div
        className="w-full max-w-md bg-[#202024] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-bold text-gray-100">Physical & Math Constants</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-3 border-b border-gray-800 space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search constants (e.g., speed of light)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161618] border border-gray-700 rounded-lg pl-9 pr-3 py-1.5 text-sm text-white focus:outline-hidden focus:border-emerald-400"
            />
          </div>

          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Constants List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-800 p-2 space-y-1">
          {filtered.map((c, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectConstant(c);
                onClose();
              }}
              className="w-full p-3 rounded-lg text-left hover:bg-gray-800/60 transition-colors flex items-center justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400 text-lg w-8">{c.symbol}</span>
                  <span className="font-semibold text-gray-100 text-sm">{c.name}</span>
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {c.value.toExponential(6)} {c.unit}
                </div>
              </div>
              <span className="text-xs text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                Insert
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

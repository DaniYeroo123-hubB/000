import React from 'react';
import {
  Palette,
  Type,
  History,
  Zap,
  Info,
  X,
} from 'lucide-react';
import foundersImage from '../assets/images/regenerated_image_1785508706093.jpg';

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (option: string) => void;
  fontStyle?: string;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
  isOpen,
  onClose,
  onSelectOption,
  fontStyle = 'Standard',
}) => {
  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const menuItems = [
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'text-style', label: 'Text Style', icon: Type },
    { id: 'history', label: 'History', icon: History },
    { id: 'tour', label: 'Quick Tour', icon: Zap },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in" onClick={onClose}>
      <div
        className={`relative w-full max-w-xs bg-[#1a1a1d] border border-gray-700/80 rounded-xl shadow-2xl overflow-hidden p-2 text-white ${fontClass}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-700 bg-gray-900">
              <img
                src={foundersImage || '/founders.jpg'}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/founders.jpg'; }}
                alt="Daniel Kidanu & Yerosen Desalegn - DY Calculator Founders"
                className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                style={{ objectPosition: "50% 28%" }}
              />
            </div>
            <span className="font-bold text-lg text-gray-200">DY Calculator Menu</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectOption(item.id);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm sm:text-base font-medium transition-all active:scale-98 cursor-pointer text-gray-200 hover:bg-gray-800 hover:text-white"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

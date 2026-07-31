import React from 'react';
import { ArrowLeft, Trash2, MoreVertical } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryModalProps {
  isOpen: boolean;
  history: HistoryItem[];
  onClose: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
  fontStyle?: string;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  history,
  onClose,
  onSelectHistoryItem,
  onClearHistory,
  fontStyle = 'Handwriting',
}) => {
  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  // Group items by dateGroup
  const grouped = history.reduce((acc: Record<string, HistoryItem[]>, item: HistoryItem) => {
    const grp = item.dateGroup || 'Recent';
    if (!acc[grp]) acc[grp] = [];
    acc[grp].push(item);
    return acc;
  }, {});

  return (
    <div className={`fixed inset-0 z-50 bg-[#1e1e20] text-white flex flex-col animate-fade-in ${fontClass}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-gray-200" />
          </button>
          <h1 className="text-xl font-bold text-gray-100">Result History</h1>
        </div>

        <div className="flex items-center gap-1">
          {history.length > 0 && (
            <button
              onClick={onClearHistory}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
              title="Clear History"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button className="p-1.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500 space-y-2">
            <p className="text-lg">No calculation history yet</p>
            <p className="text-xs">Evaluated results will appear here</p>
          </div>
        ) : (
          Object.entries(grouped).map(([groupName, items]: [string, HistoryItem[]]) => (
            <div key={groupName} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-300 px-1">{groupName}</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectHistoryItem(item);
                      onClose();
                    }}
                    className="w-full bg-[#2a2a2e] border border-gray-700/60 hover:border-emerald-500/60 rounded-xl p-4 text-left shadow-md hover:bg-[#323236] transition-all cursor-pointer group"
                  >
                    <div className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors overflow-x-auto no-scrollbar whitespace-nowrap">
                      {item.expression}
                    </div>
                    <div className="text-xl font-bold text-emerald-400 text-right mt-1 tracking-wide overflow-x-auto no-scrollbar whitespace-nowrap">
                      {item.result}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

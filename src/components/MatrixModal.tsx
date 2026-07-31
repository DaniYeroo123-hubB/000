import React, { useState } from 'react';
import { X } from 'lucide-react';

interface MatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertResult: (val: string) => void;
  fontStyle?: string;
}

export const MatrixModal: React.FC<MatrixModalProps> = ({
  isOpen,
  onClose,
  onInsertResult,
  fontStyle = 'Handwriting',
}) => {
  const [mSize, setMSize] = useState<2 | 3>(2);
  const [matrixA, setMatrixA] = useState<number[][]>([
    [1, 2],
    [3, 4],
  ]);
  const [resultText, setResultText] = useState<string>('');

  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const handleSizeChange = (newSize: 2 | 3) => {
    setMSize(newSize);
    if (newSize === 2) {
      setMatrixA([
        [1, 2],
        [3, 4],
      ]);
    } else {
      setMatrixA([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    }
    setResultText('');
  };

  const handleCellChange = (r: number, c: number, val: string) => {
    const copy = matrixA.map((row) => [...row]);
    copy[r][c] = parseFloat(val) || 0;
    setMatrixA(copy);
  };

  const calcDeterminant = () => {
    if (mSize === 2) {
      const det = matrixA[0][0] * matrixA[1][1] - matrixA[0][1] * matrixA[1][0];
      setResultText(`det(A) = ${det}`);
    } else {
      const a = matrixA[0][0], b = matrixA[0][1], c = matrixA[0][2];
      const d = matrixA[1][0], e = matrixA[1][1], f = matrixA[1][2];
      const g = matrixA[2][0], h = matrixA[2][1], i = matrixA[2][2];
      const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
      setResultText(`det(A) = ${det}`);
    }
  };

  const calcTranspose = () => {
    const t = matrixA[0].map((_, colIndex) => matrixA.map((row) => row[colIndex]));
    const str = t.map((r) => `[ ${r.join(', ')} ]`).join('\n');
    setResultText(`Aᵀ =\n${str}`);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in ${fontClass}`}>
      <div
        className="w-full max-w-md bg-[#202024] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col text-white overflow-hidden p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h2 className="text-lg font-bold text-gray-100">Matrix Calculator (MTRX)</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Dimension Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase text-gray-400 font-bold">Dimension:</span>
          {[2, 3].map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size as 2 | 3)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                mSize === size ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-300'
              }`}
            >
              {size} × {size}
            </button>
          ))}
        </div>

        {/* Matrix Inputs Grid */}
        <div className="bg-[#18181a] border border-gray-700/80 rounded-xl p-4 space-y-3">
          <span className="text-xs text-gray-400 font-bold block">Matrix A Elements:</span>
          <div className={`grid gap-2 ${mSize === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {matrixA.map((row, r) =>
              row.map((val, c) => (
                <input
                  key={`${r}-${c}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleCellChange(r, c, e.target.value)}
                  className="bg-[#242428] border border-gray-600 rounded-lg p-2 text-center text-lg font-bold text-white focus:outline-hidden focus:border-emerald-400"
                />
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={calcDeterminant}
            className="py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-emerald-400 font-bold text-sm cursor-pointer"
          >
            Determinant (det)
          </button>
          <button
            onClick={calcTranspose}
            className="py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-emerald-400 font-bold text-sm cursor-pointer"
          >
            Transpose (Aᵀ)
          </button>
        </div>

        {/* Result Area */}
        {resultText && (
          <div className="bg-black/50 border border-emerald-500/40 rounded-xl p-3 text-center whitespace-pre-line font-mono text-emerald-300 text-sm">
            {resultText}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              if (resultText) onInsertResult(resultText.replace(/det\(A\) = /g, ''));
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-base cursor-pointer"
          >
            Insert Result
          </button>
        </div>
      </div>
    </div>
  );
};

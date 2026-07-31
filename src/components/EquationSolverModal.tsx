import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EquationSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInsertResult: (val: string) => void;
  fontStyle?: string;
}

export const EquationSolverModal: React.FC<EquationSolverModalProps> = ({
  isOpen,
  onClose,
  onInsertResult,
  fontStyle = 'Handwriting',
}) => {
  const [eqType, setEqType] = useState<'quadratic' | 'linear2'>('quadratic');

  // Quadratic ax^2 + bx + c = 0
  const [a, setA] = useState('1');
  const [b, setB] = useState('-5');
  const [c, setC] = useState('6');

  // Linear 2 vars: a1 x + b1 y = c1, a2 x + b2 y = c2
  const [a1, setA1] = useState('2');
  const [b1, setB1] = useState('3');
  const [c1, setC1] = useState('13');
  const [a2, setA2] = useState('1');
  const [b2, setB2] = useState('-1');
  const [c2, setC2] = useState('1');

  const [solution, setSolution] = useState<string>('');

  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  const solveQuadratic = () => {
    const numA = parseFloat(a) || 0;
    const numB = parseFloat(b) || 0;
    const numC = parseFloat(c) || 0;

    if (numA === 0) {
      setSolution('Invalid: \'a\' cannot be zero in quadratic equation.');
      return;
    }

    const disc = numB * numB - 4 * numA * numC;
    if (disc > 0) {
      const x1 = (-numB + Math.sqrt(disc)) / (2 * numA);
      const x2 = (-numB - Math.sqrt(disc)) / (2 * numA);
      setSolution(`x₁ = ${x1}\nx₂ = ${x2}`);
    } else if (disc === 0) {
      const x = -numB / (2 * numA);
      setSolution(`x = ${x}`);
    } else {
      const re = (-numB / (2 * numA)).toFixed(4);
      const im = (Math.sqrt(-disc) / (2 * numA)).toFixed(4);
      setSolution(`x₁ = ${re} + ${im}i\nx₂ = ${re} - ${im}i`);
    }
  };

  const solveLinear2 = () => {
    const numA1 = parseFloat(a1) || 0, numB1 = parseFloat(b1) || 0, numC1 = parseFloat(c1) || 0;
    const numA2 = parseFloat(a2) || 0, numB2 = parseFloat(b2) || 0, numC2 = parseFloat(c2) || 0;

    const det = numA1 * numB2 - numA2 * numB1;
    if (det === 0) {
      setSolution('No unique solution (Determinant = 0)');
      return;
    }

    const x = (numC1 * numB2 - numC2 * numB1) / det;
    const y = (numA1 * numC2 - numA2 * numC1) / det;
    setSolution(`x = ${x}\ny = ${y}`);
  };

  return (
    <div className={`fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in ${fontClass}`}>
      <div
        className="w-full max-w-md bg-[#202024] border border-gray-700/80 rounded-2xl shadow-2xl flex flex-col text-white overflow-hidden p-5 space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h2 className="text-lg font-bold text-gray-100">Equation Solver</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Type selector */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEqType('quadratic');
              setSolution('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              eqType === 'quadratic' ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-300'
            }`}
          >
            Quadratic (ax² + bx + c = 0)
          </button>
          <button
            onClick={() => {
              setEqType('linear2');
              setSolution('');
            }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              eqType === 'linear2' ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-300'
            }`}
          >
            2 Linear Equations
          </button>
        </div>

        {/* Form Inputs */}
        {eqType === 'quadratic' ? (
          <div className="bg-[#18181a] border border-gray-700/80 rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs text-gray-400 block mb-1 font-bold">a:</label>
                <input
                  type="number"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  className="w-full bg-[#242428] border border-gray-600 rounded-lg p-2 text-center text-lg font-bold text-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1 font-bold">b:</label>
                <input
                  type="number"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  className="w-full bg-[#242428] border border-gray-600 rounded-lg p-2 text-center text-lg font-bold text-white focus:outline-hidden"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1 font-bold">c:</label>
                <input
                  type="number"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  className="w-full bg-[#242428] border border-gray-600 rounded-lg p-2 text-center text-lg font-bold text-white focus:outline-hidden"
                />
              </div>
            </div>
            <button
              onClick={solveQuadratic}
              className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer mt-2"
            >
              Solve Quadratic
            </button>
          </div>
        ) : (
          <div className="bg-[#18181a] border border-gray-700/80 rounded-xl p-4 space-y-3">
            <div className="text-xs text-gray-400 font-bold">Equation 1: a₁x + b₁y = c₁</div>
            <div className="grid grid-cols-3 gap-2">
              <input type="number" placeholder="a1" value={a1} onChange={(e) => setA1(e.target.value)} className="bg-[#242428] p-2 rounded-lg text-center font-bold" />
              <input type="number" placeholder="b1" value={b1} onChange={(e) => setB1(e.target.value)} className="bg-[#242428] p-2 rounded-lg text-center font-bold" />
              <input type="number" placeholder="c1" value={c1} onChange={(e) => setC1(e.target.value)} className="bg-[#242428] p-2 rounded-lg text-center font-bold" />
            </div>

            <div className="text-xs text-gray-400 font-bold mt-2">Equation 2: a₂x + b₂y = c₂</div>
            <div className="grid grid-cols-3 gap-2">
              <input type="number" placeholder="a2" value={a2} onChange={(e) => setA2(e.target.value)} className="bg-[#242428] p-2 rounded-lg text-center font-bold" />
              <input type="number" placeholder="b2" value={b2} onChange={(e) => setB2(e.target.value)} className="bg-[#242428] p-2 rounded-lg text-center font-bold" />
              <input type="number" placeholder="c2" value={c2} onChange={(e) => setC2(e.target.value)} className="bg-[#242428] p-2 rounded-lg text-center font-bold" />
            </div>

            <button
              onClick={solveLinear2}
              className="w-full py-2 bg-emerald-500 text-black font-bold rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer mt-2"
            >
              Solve System
            </button>
          </div>
        )}

        {/* Output Area */}
        {solution && (
          <div className="bg-black/50 border border-emerald-500/40 rounded-xl p-3 text-center whitespace-pre-line font-mono text-emerald-300 text-base font-bold">
            {solution}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={() => {
              if (solution) onInsertResult(solution.replace(/\n/g, '; '));
              onClose();
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold text-base cursor-pointer hover:bg-emerald-600"
          >
            Insert Result
          </button>
        </div>
      </div>
    </div>
  );
};

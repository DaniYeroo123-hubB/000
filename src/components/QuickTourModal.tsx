import React, { useState, useEffect } from 'react';
import { QUICK_TOUR_STEPS } from '../utils/quickTourSteps';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';

interface QuickTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHighlightKey: (keyId?: string) => void;
  fontStyle?: string;
}

export const QuickTourModal: React.FC<QuickTourModalProps> = ({
  isOpen,
  onClose,
  onHighlightKey,
  fontStyle = 'Standard',
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const step = QUICK_TOUR_STEPS[currentStepIdx] || QUICK_TOUR_STEPS[0];

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  // Reset to step 0 when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIdx(0);
    }
  }, [isOpen]);

  // Track target element DOM position
  useEffect(() => {
    if (!isOpen || !step?.targetKeyId) {
      setTargetRect(null);
      return;
    }

    onHighlightKey(step.targetKeyId);

    const updateRect = () => {
      const el = document.getElementById(step.targetKeyId!);
      if (el) {
        setTargetRect(el.getBoundingClientRect());
      } else {
        setTargetRect(null);
      }
    };

    updateRect();
    const timer = setTimeout(updateRect, 100);
    window.addEventListener('resize', updateRect);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
    };
  }, [isOpen, currentStepIdx, step, onHighlightKey]);

  if (!isOpen) return null;

  const totalSteps = QUICK_TOUR_STEPS.length;
  const isFirstStep = currentStepIdx === 0;
  const isLastStep = currentStepIdx === totalSteps - 1;

  const handleNext = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      onHighlightKey(undefined);
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  // Calculate exact vertical center of the target key
  const targetCenterY = targetRect ? targetRect.top + targetRect.height / 2 : 0;
  // If target center is in the upper half of screen (< 52%), place card at BOTTOM. Otherwise place card at TOP.
  const isTargetInUpperHalf = targetCenterY ? targetCenterY < window.innerHeight * 0.52 : false;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none animate-fade-in">
      {/* Dark Overlay Background covering entire screen */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-[2px] transition-opacity duration-300"
        onClick={handleNext}
      />

      {/* Top Banner Upgrade / Exit bar with solid background */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-[#121216] border-b border-gray-800 py-2 px-4 flex items-center justify-between text-xs text-gray-300 shadow-md">
        <div className="font-bold tracking-wider text-amber-400 uppercase">UPGRADE TO PRO VERSION</div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onHighlightKey(undefined);
            onClose();
          }}
          className="p-1 rounded-lg text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dynamic Target Spotlight Highlight Ring */}
      {targetRect && (
        <div
          style={{
            top: `${targetRect.top - 4}px`,
            left: `${targetRect.left - 4}px`,
            width: `${targetRect.width + 8}px`,
            height: `${targetRect.height + 8}px`,
          }}
          className="fixed z-40 border-2 border-amber-300 rounded-xl shadow-[0_0_25px_rgba(251,191,36,0.95)] bg-amber-300/25 pointer-events-none transition-all duration-200 animate-pulse"
        />
      )}

      {/* Tour Explanation Card - Solid Opaque & Strictly Anchored Top or Bottom */}
      <div
        className={`fixed inset-x-4 z-50 flex justify-center pointer-events-none transition-all duration-300 ${
          isTargetInUpperHalf ? 'bottom-20' : 'top-14 sm:top-16'
        }`}
      >
        <div
          className={`max-w-md w-full max-h-[38vh] overflow-y-auto bg-[#181820] border-2 border-amber-500/80 rounded-2xl p-4 sm:p-5 text-white shadow-[0_15px_40px_rgba(0,0,0,0.95)] pointer-events-auto ${fontClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-xl sm:text-2xl font-bold text-amber-300 mb-2 border-b border-gray-800 pb-1.5">
            {step.title}
          </h3>

          <div className="text-base sm:text-lg leading-relaxed text-gray-100 whitespace-pre-line font-medium">
            {step.description}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Control Bar with Solid Opaque Badges */}
      <div className="absolute bottom-3 inset-x-4 z-50 flex items-center justify-between pointer-events-auto">
        {/* Left Previous Arrow */}
        {!isFirstStep ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="w-12 h-12 rounded-xl border-2 border-white bg-[#121216] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xl"
            title="Previous Step"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-12" />
        )}

        {/* Center Step Indicator or FINISH Button with Solid Opaque Background */}
        {isLastStep ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onHighlightKey(undefined);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl border-2 border-amber-400 bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-base tracking-wider uppercase transition-all cursor-pointer active:scale-95 shadow-2xl"
          >
            FINISH
          </button>
        ) : (
          <div
            className={`px-5 py-2 rounded-xl bg-[#121216] border-2 border-gray-600 text-white font-bold text-lg sm:text-xl tracking-widest shadow-2xl ${fontClass}`}
          >
            {step.step} / {totalSteps}
          </div>
        )}

        {/* Right Next Arrow or Checkmark */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="w-12 h-12 rounded-xl border-2 border-white bg-[#121216] hover:bg-white hover:text-black text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xl"
          title={isLastStep ? 'Finish' : 'Next Step'}
        >
          {isLastStep ? (
            <Check className="w-6 h-6 stroke-[3]" />
          ) : (
            <ArrowRight className="w-6 h-6 stroke-[2.5]" />
          )}
        </button>
      </div>
    </div>
  );
};

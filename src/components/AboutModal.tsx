import React from 'react';
import { X, ArrowLeft, Heart, Code2, Palette, Sparkles, Users, Coffee, Cpu, Zap, Star } from 'lucide-react';
import foundersImage from '../assets/images/regenerated_image_1785508706093.jpg';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontStyle?: string;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, fontStyle = 'Handwriting' }) => {
  if (!isOpen) return null;

  const fontClass =
    fontStyle === 'Handwriting'
      ? 'font-handwriting'
      : fontStyle === 'Digital'
      ? 'font-mono'
      : 'font-sans';

  return (
    <div className={`fixed inset-0 z-50 bg-[#0f0f12] text-white flex flex-col h-full w-full overflow-y-auto animate-fade-in ${fontClass}`}>
      {/* Top Header Navigation Bar */}
      <div className="sticky top-0 z-20 bg-[#16161a]/95 backdrop-blur-md border-b border-gray-800/90 px-4 py-3.5 flex items-center justify-between shadow-lg">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-800/90 hover:bg-gray-700 text-gray-200 hover:text-white transition-all cursor-pointer text-sm font-bold border border-gray-700/50"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back</span>
        </button>
        <span className="font-extrabold text-lg bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent tracking-wide">
          About DY Calculator
        </span>
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Full-Screen Content */}
      <div className="flex-1 max-w-2xl w-full mx-auto px-5 py-8 flex flex-col items-center space-y-8">
        {/* App Hero Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-black border-2 border-emerald-400 p-1 flex items-center justify-center shadow-2xl shadow-emerald-500/30 overflow-hidden ring-4 ring-emerald-500/20">
              <img
                src={foundersImage || '/founders.jpg'}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/founders.jpg'; }}
                alt="Daniel Kidanu & Yerosen Desalegn - DY Calculator Founders"
                className="w-full h-full object-cover rounded-full object-center hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                style={{objectPosition:"50% 28%"
                }}
              />
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">DY Calculator</h1>
            <p className="text-xs sm:text-sm text-emerald-300 font-bold tracking-wide bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 px-4 py-1.5 rounded-full border border-emerald-500/30 inline-flex items-center gap-2 shadow-sm">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Built on Brotherhood, Trust & Innovation</span>
            </p>
          </div>
        </div>

      {/* 1.5 FOUNDERS REAL PORTRAIT / PHOTO SECTION */}
      <section 
        className="p-6 sm:p-8 rounded-3xl bg-[#18181c] border border-gray-800/90 relative overflow-hidden space-y-6 text-center shadow-2xl transition-all duration-300 hover:border-emerald-500/40"
        id="about-founders-portrait"
      >
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-cyan-500/10 to-transparent blur-2xl pointer-events-none" />
        
        {/* Beautiful frame for the photo with glow */}
        <div className="relative max-w-xs sm:max-w-sm mx-auto rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl group">
          {/* Accent glow behind the photo */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-500/20 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />
          
          <img 
            src={foundersImage || '/founders.jpg'} 
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/founders.jpg'; }}
            alt="Daniel Kidanu and Yerosen Desalegn - DY Calculator Founders" 
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover max-h-[440px] rounded-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            style={{ objectPosition: "50% 28%" }}
          />
        </div>

        {/* Text information */}
        <div className="space-y-3 max-w-xl mx-auto relative z-10 pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[10px] font-black tracking-widest text-cyan-300 uppercase">
            <Users className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Best Friends & Co-Founders</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Daniel Kidanu & Yerosen Desalegn</h3>
          
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            This photo captures a genuine friendship forged in loyalty, shared dreams, and mutual respect. Daniel and Yerosen built DY Calculator hand-in-hand, spending countless late nights supporting each other, solving tough engineering challenges, and building an application they are proud to share with the world.
          </p>
          
          <div className="flex justify-center items-center gap-2 text-xs font-extrabold text-slate-300 pt-1">
            <span className="text-cyan-300">Daniel Kidanu</span>
            <span className="text-cyan-400 font-black animate-pulse">+</span>
            <span className="text-amber-300">Yerosen Desalegn</span>
          </div>
        </div>
      </section>
      
        {/* Story & Vision Section */}
        <div className="w-full space-y-6">
          {/* Mission & Story Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c1c24] via-[#16161d] to-[#121218] border border-gray-800/90 p-6 sm:p-7 text-gray-200 space-y-4 shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-3 border-b border-gray-800/80 pb-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 border border-red-500/30 text-red-400">
                <Heart className="w-5 h-5 fill-red-400/30" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">More Than Just a Tool</h2>
                <span className="text-xs text-amber-400 font-medium">A Journey of Friendship & Purpose</span>
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              DY Calculator is more than an engine of equations — it is a living symbol of lifelong brotherhood, loyalty, and relentless ambition. Built from scratch through countless late-night coding sessions, shared coffee cups, and continuous laughter, it proves that when deep friendship meets passionate craftsmanship, extraordinary software is born.
            </p>
          </div>

          {/* Co-Founders Section Header */}
          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gray-800/80 border border-gray-700/60 text-xs font-bold text-gray-300">
              <Users className="w-3.5 h-3.5 text-cyan-400" />
              <span>THE CO-FOUNDERS BEHIND DY CALCULATOR</span>
            </div>
          </div>

          {/* Co-Founders Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Daniel Kidanu */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1e22] to-[#141619] border border-emerald-500/40 p-5 flex flex-col justify-between space-y-4 shadow-xl hover:border-emerald-400 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/25 transition-all" />
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-md">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg tracking-tight">Daniel Kidanu</h3>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/60 inline-block mt-0.5">
                      Technical Powerhouse & Architect
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Daniel is the engineering anchor of DY Calculator. Driven by an uncompromising standard for computational accuracy, he engineered the high-precision math engine, complex matrix solvers, base-N conversions, and core algorithmic integrity.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-800/90 flex items-center justify-between text-xs text-gray-400 font-semibold">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Precision & Logic</span>
                </span>
                <span className="text-emerald-400 font-mono text-[11px]">System Architecture</span>
              </div>
            </div>

            {/* Yerosen Desalegn */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#1a1c24] to-[#14151b] border border-cyan-500/40 p-5 flex flex-col justify-between space-y-4 shadow-xl hover:border-cyan-400 transition-all duration-300 group">
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-cyan-500/25 transition-all" />

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 shadow-md">
                    <Palette className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-lg tracking-tight">Yerosen Desalegn</h3>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800/60 inline-block mt-0.5">
                      Creative Designer & UX Visionary
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Yerosen brings the heart and visual elegance to the app. With an exceptional eye for typography, color harmony, and seamless interaction, he sculpted the customizable theme palette, sleek keypad layouts, and tactile responsive displays.
                </p>
              </div>

              <div className="pt-3 border-t border-gray-800/90 flex items-center justify-between text-xs text-gray-400 font-semibold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Tactile UI & Aesthetics</span>
                </span>
                <span className="text-cyan-400 font-mono text-[11px]">Creative Vision</span>
              </div>
            </div>
          </div>

          {/* Friendship & Collaboration Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#181820] to-cyan-950/60 border border-emerald-500/30 p-5 sm:p-6 text-gray-200 space-y-3 shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-400 font-bold text-base">
              <Coffee className="w-5 h-5 text-amber-400 shrink-0" />
              <span>Late-Night Synergy & Unbreakable Trust</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Every detail in DY Calculator — from the handwriting font toggles to the matrix inversion routines — came from long nights, mutual encouragement, and shared passion. Daniel and Yerosen created this calculator as a gift to students, engineers, and creators worldwide.
            </p>
          </div>

          {/* Gratitude Message */}
          <div className="rounded-2xl bg-[#16161c] border border-gray-800 p-6 text-center space-y-3 shadow-inner">
            <div className="inline-flex p-2.5 rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 border border-amber-400/30 text-amber-300">
              <Star className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-extrabold text-white">Thank You for Being Part of Our Story</h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
              Whether you are solving calculus homework, engineering complex projects, or exploring mathematics, we are honored to have you with us. Thank you for using DY Calculator!
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="w-full pt-2 pb-6">
          <button
            onClick={onClose}
            className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold rounded-2xl transition-all shadow-xl shadow-emerald-500/25 active:scale-[0.99] cursor-pointer text-base tracking-wide flex items-center justify-center gap-2"
          >
            <span>Close & Return to Calculator</span>
          </button>
          <p className="text-center text-xs text-gray-500 mt-3 font-medium">
            © {new Date().getFullYear()} DY Calculator. Crafted with pride by Daniel Kidanu & Yerosen Desalegn.
          </p>
        </div>
      </div>
    </div>
  );
};



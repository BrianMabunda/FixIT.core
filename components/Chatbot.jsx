import React, { useState } from 'react';
import { LucideSend, LucideMessageSquare, LucideZap, LucideCpu } from 'lucide-react';
import "../Styles/GlobalStyles.css"

const Chatbot = ({ onStart, isLightMode }) => {
  const [clue, setClue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clue.trim()) {
      onStart(clue);
    }
  };

  return (
    /* We add the theme class here so the CSS variables in GlobalStyles.css work */
    <div className={`chatbot-view-container flex-1 flex flex-col items-center justify-center p-8 transition-all duration-700 ${isLightMode ? 'is-light' : 'is-dark'}`}>
      <div className={`w-full max-w-2xl glass-panel border p-12 rounded-[40px] relative overflow-hidden iris-protection transition-all duration-500 ${
        isLightMode ? 'bg-white/70 border-black/10 shadow-2xl' : 'bg-[#0a0b0d]/60 border-white/10 shadow-2xl'
      }`}>
        
        {/* Animated Neural Load Bar */}
        <div className={`absolute top-0 left-0 w-full h-[2px] overflow-hidden ${isLightMode ? 'bg-black/5' : 'bg-white/5'}`}>
          <div 
            className={`h-full w-full transition-all duration-1000 ease-in-out animate-pulse ${
              isLightMode ? 'bg-cyan-600' : 'bg-cyan-400'
            }`}
            style={{ 
              boxShadow: isLightMode 
                ? '0 0 15px rgba(8, 145, 178, 0.4)' 
                : '0 0 20px rgba(34, 211, 238, 0.6)'
            }} 
          />
        </div>
        
        <div className="flex flex-col items-center text-center mb-10">
          <div className={`p-5 rounded-2xl mb-6 shadow-inner transition-colors duration-500 ${
            isLightMode ? 'bg-cyan-100 text-cyan-600' : 'bg-cyan-500/10 text-cyan-400'
          }`}>
            <LucideMessageSquare size={32} strokeWidth={1.5} />
          </div>
          
          <span className="block font-mono text-[11px] uppercase tracking-[4px] text-cyan-500 mb-2 opacity-80 font-bold">
            Neural Entry Point
          </span>
          
          <h2 className={`text-3xl font-bold tracking-tight mb-4 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
            System Diagnosis
          </h2>
          
          <p className={`text-sm max-w-md leading-relaxed font-medium opacity-60 ${isLightMode ? 'text-slate-700' : 'text-slate-300'}`}>
            Describe the system anomaly or provide a terminal clue to initiate the deep-scan diagnostic protocol.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative group">
          <textarea
            autoFocus
            value={clue}
            onChange={(e) => setClue(e.target.value)}
            placeholder="TYPE_SYSTEM_CLUE_HERE..."
            /* Ensure futuristic-scrollbar is applied and the textarea has enough height to scroll */
            className={`w-full h-44 bg-transparent border-2 rounded-[2rem] p-8 outline-none transition-all font-mono text-sm resize-none tracking-wider futuristic-scrollbar ${
              isLightMode 
                ? 'border-black/5 focus:border-cyan-500/50 text-slate-900 placeholder:text-slate-400' 
                : 'border-white/5 focus:border-cyan-500/50 text-slate-100 placeholder:text-white/20'
            }`}
          />
          
          <button
            type="submit"
            disabled={!clue.trim()}
            className={`absolute bottom-6 right-6 flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
              clue.trim() 
                ? 'bg-cyan-500 text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:scale-105 active:scale-95' 
                : 'bg-slate-500/10 text-slate-500 cursor-not-allowed opacity-30'
            }`}
          >
            INITIATE_LINK <LucideSend size={14} />
          </button>
        </form>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
            isLightMode ? 'bg-black/5 border-black/5 shadow-sm' : 'bg-white/5 border-white/5 shadow-inner'
          }`}>
            <div className={`p-2 rounded-lg ${isLightMode ? 'bg-cyan-600/10' : 'bg-cyan-500/20'}`}>
              <LucideZap size={18} className={isLightMode ? 'text-cyan-600' : 'text-cyan-400'} />
            </div>
            <div className="flex flex-col">
              <span className={`text-[9px] font-mono tracking-widest uppercase opacity-40 ${isLightMode ? 'text-black' : 'text-white'}`}>Process</span>
              <span className={`text-[10px] font-bold ${isLightMode ? 'text-slate-700' : 'text-white'}`}>ACTIVE_SCAN</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-4 p-5 rounded-2xl border transition-all duration-500 ${
            isLightMode ? 'bg-black/5 border-black/5 shadow-sm' : 'bg-white/5 border-white/5 shadow-inner'
          }`}>
            <div className={`p-2 rounded-lg ${isLightMode ? 'bg-purple-600/10' : 'bg-purple-500/20'}`}>
              <LucideCpu size={18} className={isLightMode ? 'text-purple-600' : 'text-purple-400'} />
            </div>
            <div className="flex flex-col">
              <span className={`text-[9px] font-mono tracking-widest uppercase opacity-40 ${isLightMode ? 'text-black' : 'text-white'}`}>Module</span>
              <span className={`text-[10px] font-bold ${isLightMode ? 'text-slate-700' : 'text-white'}`}>NEURAL_CORE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
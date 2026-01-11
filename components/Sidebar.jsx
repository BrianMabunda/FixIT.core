import React from 'react';
import { LucideMessageCircle, LucideShieldCheck, LucideMoon, LucideSun } from 'lucide-react';
import '../Styles/SideBarStyles.css';

const Sidebar = ({ isLight, onToggleTheme, currentView, setView }) => {
  const isLightMode = isLight;

  // Safe navigation handler to prevent "not a function" errors if props mismatch
  const handleViewChange = (view) => {
    if (typeof setView === 'function') {
      setView(view);
    } else {
      console.error("Sidebar Error: setView prop is missing or not a function.");
    }
  };

  return (
    <aside className={`sidebar-container glass-panel border theme-transition ${
      isLightMode 
        ? 'is-light bg-white/40 border-black/10 shadow-xl text-slate-900' 
        : 'is-dark bg-black/40 border-white/10 shadow-2xl text-white'
    }`}>
      {/* Brand Section & Header Status */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold tracking-tighter">
          Fix<span className="text-cyan-500 animate-pulse">IT</span>.core
        </h2>
        <div className={`mt-4 p-3 rounded-xl border transition-all duration-500 ${
          currentView === 'chat' 
            ? 'bg-purple-500/10 border-purple-500/30' 
            : 'bg-cyan-500/10 border-cyan-500/30'
        }`}>
          <p className="text-[9px] font-mono tracking-[0.2em] opacity-50 mb-1">CURRENT_PROTOCOL</p>
          <div className="flex items-center gap-2">
            {currentView === 'chat' ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase">Chatbot_Model</span>
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-cyan-400 uppercase">Diagnostic_Agent</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 space-y-4">
        <div className="text-[10px] font-mono tracking-widest opacity-30 mb-2 uppercase">Interface_Controls</div>
        
        {/* Navigation to Chatbot */}
        <button 
          onClick={() => handleViewChange('chat')}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group ${
            currentView === 'chat' 
              ? 'bg-purple-500/15 border-purple-500/30 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]' 
              : isLightMode 
                ? 'border-transparent text-slate-500 hover:bg-black/5'
                : 'border-transparent text-slate-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          <LucideMessageCircle size={18} strokeWidth={currentView === 'chat' ? 2.5 : 2} />
          <span className="text-[11px] tracking-widest font-bold uppercase">Neural_Chat</span>
        </button>

        {/* View-Only Progress for Diagnostics */}
        <button 
          disabled={currentView === 'chat'} 
          onClick={() => handleViewChange('diagnostic')}
          className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
            currentView === 'diagnostic' 
              ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
              : 'border-transparent text-slate-400 opacity-20 cursor-not-allowed'
          }`}
        >
          <LucideShieldCheck size={18} strokeWidth={currentView === 'diagnostic' ? 2.5 : 2} />
          <span className="text-[11px] tracking-widest font-bold uppercase">Active_Analysis</span>
        </button>
      </nav>

      {/* Theme Toggle Section */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div 
          onClick={onToggleTheme} 
          className={`theme-toggle-switch group transition-colors duration-300 flex items-center justify-between p-4 rounded-2xl cursor-pointer border ${
            isLightMode ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10 hover:border-cyan-500/50'
          }`}
        >
          <div className="flex items-center gap-3">
            {isLightMode ? <LucideSun size={14} className="text-orange-500" /> : <LucideMoon size={14} className="text-cyan-400" />}
            <span className={`font-mono text-[9px] tracking-wider transition-opacity ${
              isLightMode ? 'opacity-70 text-slate-900' : 'opacity-80 text-white'
            } group-hover:opacity-100`}>
              {isLightMode ? 'LIGHT_LINK' : 'DARK_VOID'}
            </span>
          </div>
          <div className={`w-10 h-5 rounded-full relative flex items-center px-1 border transition-all duration-500 ${
            isLightMode ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-white/10'
          }`}>
            <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-500 ${
              isLightMode ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
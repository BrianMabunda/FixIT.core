import React, { useState } from 'react';
import { LucideRotateCcw } from 'lucide-react';

/** * Modular Imports */
import { DIAGNOSTIC_MANUAL } from '../helpers/MANUAL';
import Sidebar from '../components/Sidebar';
import DiagnosticCard from '../components/DiagnosticCard';
import '../Styles/GlobalStyles.css';

/** * MAIN ORCHESTRATOR
 * This version ensures all prop names match the CSS triggers in GlobalStyles.
 */
export default function App() {
  const [history, setHistory] = useState([]);
  const [currentState, setCurrentState] = useState(DIAGNOSTIC_MANUAL["initial"]);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  /**
   * Theme Management
   */
  const toggleTheme = () => {
    setIsAnimating(true);
    setIsLightMode(!isLightMode);
    setTimeout(() => setIsAnimating(false), 800);
  };

  /**
   * Navigation Logic
   */
  const handleAction = (choice) => {
    if (choice === "Return to Overview") {
      setHistory([]);
      setCurrentState(DIAGNOSTIC_MANUAL["initial"]);
      return;
    }

    setHistory(prev => [...prev, currentState]);
    
    if (DIAGNOSTIC_MANUAL[choice]) {
      setCurrentState(DIAGNOSTIC_MANUAL[choice]);
    } else {
      setCurrentState({
        message: `Analysis finalized for: ${choice}. Proceed with manual intervention or return to start.`,
        options: ["Return to Overview"],
        confidence: 0.6,
        stage: currentState.stage
      });
    }
  };

  const rewind = () => {
    if (history.length > 0) {
      const last = history[history.length - 1];
      setHistory(prev => prev.slice(0, -1));
      setCurrentState(last);
    }
  };

  return (
    <div className={`min-h-screen font-sans overflow-hidden transition-colors duration-1000 ${
      isLightMode ? 'bg-[#f4f7f9] text-slate-800' : 'bg-[#050506] text-slate-100'
    }`}>
      
      {/* Background Environment - Visual depth */}
      <div className="fixed inset-0 pointer-events-none transition-opacity duration-1000" style={{ opacity: isLightMode ? 0.3 : 0.6 }}>
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] bg-blue-600/10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] bg-cyan-400/10" />
      </div>

      <div className="relative z-10 grid grid-cols-[320px_1fr] gap-8 p-8 h-screen max-w-[1800px] mx-auto overflow-hidden">
        <Sidebar 
          activeStage={currentState.stage} 
          isLight={isLightMode} 
          onToggleTheme={toggleTheme} 
        />

        <main className="flex flex-col gap-8 h-full overflow-hidden">
          {/* IMPORTANT: These prop names must stay as isLightMode, 
              isAnimating, and onChoice to work with the latest DiagnosticCard 
          */}
          <DiagnosticCard 
            state={currentState} 
            isLightMode={isLightMode} 
            isAnimating={isAnimating}
            onChoice={handleAction}
          />

          <footer className="flex justify-between items-center px-10 py-4 font-mono text-[10px] tracking-[0.2em] opacity-30">
            <button 
              onClick={rewind}
              disabled={history.length === 0}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
                history.length === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:text-cyan-500 hover:border-cyan-500 hover:bg-current/5'
              }`}
            >
              <LucideRotateCcw size={14} /> REWIND_FLOW
            </button>
            
            <div className="flex gap-10">
              <span className="hidden lg:inline">SESSION_STATUS: ENCRYPTED</span>
              <span>NODE: CORE_AXIS_01</span>
              <span className="text-cyan-500 font-bold">LINK: STABLE</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
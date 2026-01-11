import React from 'react';
import ConfidenceGauge from './Gauge';
import '../Styles/DiagnosticCardStyles.css';

const DiagnosticCard = ({ state, isLightMode, isAnimating, onChoice }) => {
  return (
    <div 
      className={`main-card-glass glass-panel border iris-protection ${
        isAnimating ? 'translate-y-2 opacity-80 blur-[5px]' : 'translate-y-0 opacity-100 blur-0'
      } ${
        isLightMode ? 'bg-white/50 border-black/10 shadow-xl' : 'bg-[#141619]/60 border-white/10 shadow-2xl'
      }`}
      style={{ 
        backgroundImage: isLightMode 
          ? 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 100%)' 
          : 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 100%)'
      }}
    >
      <div className="glow-bar" />

      {/* Header Section */}
      <div className="card-header">
        <div>
          <span className="block font-mono text-[11px] uppercase tracking-[3px] text-cyan-400 mb-2 opacity-80 font-bold">
            Neural Analysis Protocol
          </span>
          <div className="text-sm font-medium tracking-wide opacity-60 uppercase">
            {state.stage} MODULE ANALYSIS
          </div>
        </div>
        <ConfidenceGauge value={state.confidence} />
      </div>

      {/* Message Text */}
      <div className="text-4xl leading-[1.25] tracking-tight max-w-[850px] font-light animate-slide-up mb-8">
        {state.message}
      </div>

      {/* Options Grid - Dynamic theme class triggers the frosted white vs transparent glass look */}
      <div className={`option-grid ${isLightMode ? 'is-light' : 'is-dark'}`}>
        {state.options.map((opt, i) => (
          <button 
            key={i}
            onClick={() => onChoice(opt)}
            className="diagnostic-option-btn group"
          >
            <span className="option-label">COMMAND_QUERY_ID: 0{i + 1}</span>
            <span className="option-text">
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticCard;
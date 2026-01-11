import React from 'react';

const ConfidenceGauge = ({ value }) => {
  const offset = 283 - (283 * (value/100.0));
  return (
    <div className="relative w-[140px] h-[140px] flex items-center justify-center rounded-full border border-current/5 bg-current/[0.02]">
      <svg className="-rotate-90" width="100" height="100" viewBox="0 0 100 100">
        <circle className="fill-none stroke-current/10" cx="50" cy="50" r="45" strokeWidth="5" />
        <circle 
          className="fill-none stroke-cyan-400 transition-[stroke-dashoffset] duration-[1200ms] ease-out" 
          cx="50" cy="50" r="45" strokeWidth="5" strokeLinecap="round"
          style={{ 
            strokeDasharray: 283, 
            strokeDashoffset: offset,
            filter: 'drop-shadow(0 0 8px rgba(0, 242, 254, 0.5))'
          }} 
        />
      </svg>
      <span className="absolute font-mono text-2xl font-bold text-cyan-400">
        {Math.round(value)}%
      </span>
    </div>
  );
};

export default ConfidenceGauge;
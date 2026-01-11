import React, { useState, useEffect, useRef } from 'react';
import { LucideRotateCcw, LucideLoader2, LucideSend, LucideCpu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import DiagnosticCard from '../components/DiagnosticCard';
import '../Styles/GlobalStyles.css';

const API_BASE_URL = "https://brianmabunda00-ui-ai-agent.hf.space";

const ParticleBackground = ({ isLight }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 1.5;
        this.alpha = Math.random() * 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.fillStyle = isLight ? `rgba(15, 23, 42, ${this.alpha})` : `rgba(0, 212, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    resize();
    particles = Array.from({ length: 80 }, () => new Particle());
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isLight]);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default function App() {
  const [view, setView] = useState('chat'); // 'chat' or 'diagnostic'
  const [history, setHistory] = useState([]);
  const [currentState, setCurrentState] = useState({
    message: "Initializing Neural Link...",
    options: [],
    confidence: 0,
    stage: "System"
  });
  const [isLightMode, setIsLightMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userMsg, setUserMsg] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Neural Interface v2.4 initialized. System is in standby. Provide a prompt to begin hardware analysis.' }
  ]);

  const sendChatMessage = async () => {
    if (!userMsg.trim() || isLoading) return;
    
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      // 1. Initial Reset to ensure fresh session
      await fetch(`${API_BASE_URL}/diagnostic/reset`);
      
      // 2. Send prompt to API
      const response = await fetch(`${API_BASE_URL}/diagnostic/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_choice: userMsg })
      });
      const data = await response.json();
      
      // 3. Transition to Diagnostic View automatically
      setTimeout(() => {
        setCurrentState({ ...data, stage: data.current_step });
        setView('diagnostic');
        setIsLoading(false);
        setUserMsg("");
      }, 1000);

    } catch (error) {
      console.error("Connection failed", error);
      setIsLoading(false);
    }
  };

  const handleAction = async (choice) => {
    setIsAnimating(true);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/diagnostic/next`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_choice: choice })
      });
      const data = await response.json();
      setHistory([...history, currentState]);
      setCurrentState({ ...data, stage: data.current_step });
    } finally {
      setIsAnimating(false);
      setIsLoading(false);
    }
  };

  const rewind = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/diagnostic/rewind`, { method: 'POST' });
      if (response.ok && history.length > 0) {
        const prev = history[history.length - 1];
        setCurrentState(prev);
        setHistory(history.slice(0, -1));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 overflow-hidden ${isLightMode ? 'bg-[#e0eafc]' : 'bg-[#020a10]'}`}>
      <ParticleBackground isLight={isLightMode} />
      <div className="relative z-10 grid grid-cols-[320px_1fr] gap-8 p-8 h-screen max-w-[1800px] mx-auto">
        
        <Sidebar 
        activeStage={currentState.stage} 
        isLight={isLightMode} 
        onToggleTheme={() => setIsLightMode(!isLightMode)}
        currentView={view}
        setView={setView} // <--- ADD THIS LINE in App.jsx
      />

        <main className="flex flex-col gap-6 h-full overflow-hidden">
          <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {view === 'chat' ? (
              <div className={`w-full max-w-4xl h-[85%] border rounded-[3rem] flex flex-col overflow-hidden shadow-2xl backdrop-blur-3xl transition-all ${isLightMode ? 'bg-white/60 border-black/10' : 'bg-black/50 border-white/10'}`}>
                <div className="p-8 border-b border-white/5 flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/20 rounded-xl text-cyan-400"><LucideCpu size={24} /></div>
                  <div>
                    <h3 className="text-sm font-bold tracking-widest uppercase">System_Entry_Point</h3>
                    <p className="text-[10px] opacity-40 font-mono">{isLoading ? 'ANALYZING...' : 'AWAITING_INPUT'}</p>
                  </div>
                </div>
                <div className="flex-1 p-10 overflow-y-auto space-y-6 scrollbar-hide">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[75%] p-5 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-100' : isLightMode ? 'bg-black/5 text-slate-800' : 'bg-white/5 text-slate-300'}`}>
                        <p className="text-sm leading-relaxed font-mono">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && <div className="text-cyan-400 font-mono text-xs animate-pulse">INITIATING DIAGNOSTIC PROTOCOL...</div>}
                </div>
                <div className="p-8 border-t border-white/5 flex gap-4">
                  <input 
                    className="flex-1 bg-black/20 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-cyan-500/50 transition-all font-mono text-sm text-white"
                    placeholder="DESCRIBE YOUR SYSTEM ERROR..."
                    value={userMsg}
                    onChange={(e) => setUserMsg(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    disabled={isLoading}
                  />
                  <button onClick={sendChatMessage} disabled={isLoading} className="px-8 bg-cyan-500 rounded-2xl hover:bg-cyan-400 transition-all shadow-[0_0_30px_rgba(6,182,212,0.3)] disabled:opacity-50">
                    <LucideSend size={20} className="text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center items-center animate-in fade-in zoom-in duration-500">
                <DiagnosticCard state={currentState} isLightMode={isLightMode} isAnimating={isAnimating} onChoice={handleAction} />
              </div>
            )}
          </div>

          <footer className="flex justify-between items-center px-10 py-6 font-mono text-[10px] tracking-[0.3em] opacity-40">
            {view === 'diagnostic' && (
              <button onClick={rewind} disabled={history.length === 0 || isLoading} className="flex items-center gap-3 px-6 py-2 rounded-xl border border-white/10 hover:border-cyan-500/50 transition-all disabled:opacity-20">
                <LucideRotateCcw size={14} /> REWIND
              </button>
            )}
            <div className="flex gap-10 ml-auto">
              <span>LATENCY: 8MS</span>
              <span className="text-cyan-400 font-bold uppercase">{view}_MODE</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
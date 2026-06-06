import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';

const ADMIN_KEY = 'RENAISSANCE-DEMO-2026';

export default function DemoAccess() {
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (key.toUpperCase().trim() === ADMIN_KEY) {
      sessionStorage.setItem('demo_access', '1');
      navigate('/demo');
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)' }} />

      <div className={`relative z-10 w-full max-w-md px-6 ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        style={{ animation: shake ? 'shake 0.4s ease-in-out' : undefined }}>
        <div className="glass-strong rounded-2xl p-8 border border-primary/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full border-2 border-primary/40 flex items-center justify-center mx-auto mb-4 glow-blue">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-black text-foreground tracking-wide mb-2">CLASSIFIED ACCESS</h1>
            <p className="text-muted-foreground text-sm">Project Renaissance — Concept Demo Portal</p>
            <div className="mt-3 flex items-center justify-center gap-2 text-xs text-yellow-400/80">
              <AlertTriangle className="w-3 h-3" />
              <span>Authorized Personnel Only</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={show ? 'text' : 'password'}
                value={key}
                onChange={e => { setKey(e.target.value); setError(false); }}
                placeholder="Enter Admin Key"
                className="w-full pl-10 pr-10 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 font-mono text-sm tracking-widest transition-colors"
              />
              <button type="button" onClick={() => setShow(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-destructive text-xs text-center font-semibold tracking-wide">
                ⛔ Invalid access key. Authorization denied.
              </p>
            )}

            <button type="submit"
              className="w-full py-3 rounded-lg font-display font-bold text-lg tracking-wide text-primary-foreground glow-btn transition-all"
              style={{ background: 'linear-gradient(135deg, #2563EB, #1d4ed8)' }}>
              AUTHORIZE ACCESS
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6 opacity-60">
            Demo key available to authorized New America Initiative stakeholders only
          </p>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_KEY = 'RENAISSANCE-DEMO-2026';

const CHOSEN = [
  { name: 'Jensen Huang', title: 'NVIDIA CEO', icon: '🟢' },
  { name: 'Sam Altman', title: 'OpenAI CEO', icon: '🤖' },
  { name: 'Elon Musk', title: 'Tesla / xAI', icon: '🚀' },
  { name: 'Peter Thiel', title: 'Founders Fund', icon: '♟️' },
  { name: 'Palmer Luckey', title: 'Anduril', icon: '⚔️' },
  { name: 'Marc Andreessen', title: 'a16z', icon: '🔬' },
  { name: 'Jeff Bezos', title: 'Amazon / Blue Origin', icon: '📦' },
  { name: 'Bill Gates', title: 'Gates Foundation', icon: '💊' },
  { name: 'Jamie Dimon', title: 'JPMorgan', icon: '🏦' },
  { name: 'The White House', title: 'Executive Office', icon: '🇺🇸' },
  { name: 'Walton Family', title: 'Walmart Foundation', icon: '🏪' },
  { name: 'Brian Chesky', title: 'Airbnb CEO', icon: '🏠' },
  { name: 'Alex Karp', title: 'Palantir CEO', icon: '🔭' },
  { name: 'World Liberty Financial', title: 'DeFi / Trump Family', icon: '💰' },
];

export default function DemoAccess() {
  const [key, setKey] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [typedLine, setTypedLine] = useState('');
  const navigate = useNavigate();

  const headline = 'You were chosen for a reason.';
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setTypedLine(headline.slice(0, i + 1));
      i++;
      if (i >= headline.length) clearInterval(iv);
    }, 45);
    return () => clearInterval(iv);
  }, []);

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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.6) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, rgba(59,130,246,0.06) 40%, transparent 70%)' }} />

      {/* Top label */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="relative z-10 mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/20 bg-yellow-400/5 text-yellow-400 text-xs font-bold tracking-widest mb-4">
          <Zap className="w-3 h-3" /> PROJECT RENAISSANCE · EYES ONLY
        </div>
        <h1 className="font-display font-black text-4xl md:text-6xl text-foreground mb-2">
          NOT FOR EVERYONE.
        </h1>
        <h2 className="font-display font-black text-2xl md:text-4xl text-gradient-gold">
          {typedLine}<span className="animate-pulse">|</span>
        </h2>
        <p className="text-muted-foreground text-sm mt-4 max-w-md mx-auto leading-relaxed">
          This demo isn't public. It was built for decision-makers, capital allocators, and institutional leaders who understand that order requires infrastructure — and infrastructure requires control.
          <span className="text-foreground font-semibold"> 653,100 Americans are ungoverned tonight. That ends here.</span>
        </p>
      </motion.div>

      {/* Chosen names marquee */}
      <div className="relative z-10 w-full max-w-3xl overflow-hidden mb-10">
        <div className="text-xs text-muted-foreground/40 uppercase tracking-widest text-center mb-3 font-bold">Access granted to</div>
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center flex-wrap">
          {CHOSEN.map((c, i) => (
            <motion.div key={c.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              className="flex items-center gap-2 glass border border-border/40 rounded-full px-3 py-1.5 text-xs whitespace-nowrap flex-shrink-0">
              <span>{c.icon}</span>
              <span className="font-semibold text-foreground">{c.name}</span>
              <span className="text-muted-foreground hidden sm:inline">· {c.title}</span>
            </motion.div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground/30 text-center mt-3 italic">
          …and a small number of others cleared for full operational briefing.
        </div>
      </div>

      {/* Access form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`relative z-10 w-full max-w-sm ${shake ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}
        style={{ animation: shake ? 'shake 0.4s ease-in-out' : undefined }}
      >
        <div className="glass-strong rounded-2xl p-8 border border-primary/20">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-full border-2 border-yellow-400/30 flex items-center justify-center mx-auto mb-3 glow-gold">
              <Lock className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="font-display font-black text-xl text-foreground">ENTER YOUR KEY</div>
            <div className="text-xs text-muted-foreground mt-1">Your private access code was shared directly.</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type={show ? 'text' : 'password'}
                value={key}
                onChange={e => { setKey(e.target.value); setError(false); }}
                placeholder="RENAISSANCE-XXXX-XXXX"
                className="w-full pl-10 pr-10 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 font-mono text-sm tracking-widest transition-colors"
                autoFocus
              />
              <button type="button" onClick={() => setShow(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-destructive text-xs text-center font-semibold tracking-wide">
                  ⛔ That key doesn't exist. If you're meant to be here, you already have it.
                </motion.p>
              )}
            </AnimatePresence>

            <button type="submit"
              className="w-full py-3 rounded-lg font-display font-bold text-lg tracking-wide text-primary-foreground glow-btn transition-all hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}>
              AUTHORIZE ACCESS
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground/40 mt-5 leading-relaxed">
            If you received this link and don't have a key, your invitation may be pending.<br />
            <span className="text-muted-foreground/60">This is not a public site. It was built for you specifically.</span>
          </p>
        </div>
      </motion.div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
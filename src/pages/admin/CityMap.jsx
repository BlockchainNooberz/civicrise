import { useState, useEffect, useRef } from 'react';
import { Shield, Zap, AlertTriangle, CheckCircle, Activity, Lock, Unlock, RefreshCw, Eye, EyeOff } from 'lucide-react';

const ADMIN_KEY = 'PHOENIX-ADMIN-2026';

// Zone definitions with status simulation
const ZONES = [
  { id: 'core',    label: 'Beast Command Core',     x: 48, y: 44, color: '#F59E0B', icon: '👑', sector: 'A', capacity: 5000,  status: 'nominal' },
  { id: 'ai',      label: 'AI & Tech Quarter',       x: 63, y: 30, color: '#3B82F6', icon: '🤖', sector: 'B', capacity: 8000,  status: 'nominal' },
  { id: 'trades',  label: 'Trades & Build District', x: 29, y: 55, color: '#F97316', icon: '🔧', sector: 'C', capacity: 6000,  status: 'nominal' },
  { id: 'ag',      label: 'Urban Agriculture Ring',  x: 73, y: 61, color: '#22C55E', icon: '🌾', sector: 'D', capacity: 2000,  status: 'nominal' },
  { id: 'housing', label: 'Residential Sectors A-D', x: 44, y: 63, color: '#8B5CF6', icon: '🏠', sector: 'E', capacity: 12000, status: 'nominal' },
  { id: 'med',     label: 'Medical & Wellness',      x: 27, y: 30, color: '#EC4899', icon: '🏥', sector: 'F', capacity: 1500,  status: 'nominal' },
  { id: 'market',  label: 'NAC Marketplace',         x: 59, y: 71, color: '#F59E0B', icon: '🛍️', sector: 'G', capacity: 3000,  status: 'nominal' },
  { id: 'power',   label: 'Solar & Energy Grid',     x: 17, y: 73, color: '#EAB308', icon: '⚡', sector: 'H', capacity: 500,   status: 'nominal' },
  { id: 'edu',     label: 'Education Campus',        x: 71, y: 20, color: '#a78bfa', icon: '🎓', sector: 'I', capacity: 4000,  status: 'nominal' },
];

const GATE_POSITIONS = [
  { x: 50, y: 6,  label: 'Gate N', angle: 0 },
  { x: 83, y: 27, label: 'Gate NE', angle: 45 },
  { x: 91, y: 56, label: 'Gate E', angle: 90 },
  { x: 75, y: 84, label: 'Gate SE', angle: 135 },
  { x: 50, y: 93, label: 'Gate S', angle: 180 },
  { x: 17, y: 84, label: 'Gate SW', angle: 225 },
  { x: 9,  y: 56, label: 'Gate W', angle: 270 },
  { x: 25, y: 27, label: 'Gate NW', angle: 315 },
];

const STATUS_COLORS = {
  nominal:  { color: '#22C55E', label: 'NOMINAL', bg: 'bg-green-400/10 text-green-400 border-green-400/20' },
  elevated: { color: '#F59E0B', label: 'ELEVATED', bg: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' },
  alert:    { color: '#EF4444', label: 'ALERT', bg: 'bg-red-400/10 text-red-400 border-red-400/20' },
};

// Simulated live metrics per zone
function genMetrics(zone) {
  const base = { nominal: 0.85, elevated: 0.65, alert: 0.45 };
  const factor = base[zone.status] + (Math.random() - 0.5) * 0.05;
  return {
    occupancy: Math.round(zone.capacity * Math.min(factor, 0.99)),
    power: Math.round(88 + Math.random() * 12),
    temp: (71 + Math.random() * 2).toFixed(1),
    incidents: zone.status === 'alert' ? Math.floor(Math.random() * 3) + 1 : 0,
  };
}

export default function CityMap() {
  const [selected, setSelected] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [keyError, setKeyError] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [zones, setZones] = useState(ZONES);
  const [metrics, setMetrics] = useState({});
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [tick, setTick] = useState(0);
  const tickRef = useRef(null);

  // Simulate live updates every 8 seconds
  useEffect(() => {
    const m = {};
    zones.forEach(z => { m[z.id] = genMetrics(z); });
    setMetrics(m);

    tickRef.current = setInterval(() => {
      setMetrics(prev => {
        const next = { ...prev };
        zones.forEach(z => { next[z.id] = genMetrics(z); });
        return next;
      });
      setLastRefresh(new Date());
      setTick(t => t + 1);
    }, 8000);
    return () => clearInterval(tickRef.current);
  }, [zones]);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (keyInput.toUpperCase().trim() === ADMIN_KEY) {
      setUnlocked(true);
      setKeyError(false);
    } else {
      setKeyError(true);
      setTimeout(() => setKeyError(false), 2000);
    }
  };

  const toggleZoneStatus = (id, status) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, status } : z));
  };

  const sel = zones.find(z => z.id === selected);
  const selMetrics = selected ? metrics[selected] : null;
  const alertCount = zones.filter(z => z.status === 'alert').length;
  const elevatedCount = zones.filter(z => z.status === 'elevated').length;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-black text-4xl text-foreground">CITY MAP</h1>
          <p className="text-muted-foreground mt-0.5 text-sm">Camp Phoenix — Live Infrastructure Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Status summary */}
          <div className="flex items-center gap-2">
            {alertCount > 0 && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-400/10 text-red-400 border border-red-400/20 font-bold">
                <AlertTriangle className="w-3 h-3" /> {alertCount} Alert
              </span>
            )}
            {elevatedCount > 0 && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 font-bold">
                <Activity className="w-3 h-3" /> {elevatedCount} Elevated
              </span>
            )}
            {alertCount === 0 && elevatedCount === 0 && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-bold">
                <CheckCircle className="w-3 h-3" /> All Systems Nominal
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3 animate-spin" style={{ animationDuration: '4s' }} />
            {lastRefresh.toLocaleTimeString()}
          </div>
          <div className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-bold ${unlocked ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-muted-foreground bg-secondary border-border/50'}`}>
            {unlocked ? <Unlock className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
            {unlocked ? 'ADMIN UNLOCKED' : 'READ ONLY'}
          </div>
        </div>
      </div>

      {/* Security Auth Panel — shows when locked */}
      {!unlocked && (
        <div className="glass rounded-2xl p-5 border border-primary/20 flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Facility Management Locked</div>
              <div className="text-xs text-muted-foreground">Enter admin key to enable zone status controls and live management features.</div>
            </div>
          </div>
          <form onSubmit={handleUnlock} className="flex items-center gap-2 md:ml-auto">
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={keyInput}
                onChange={e => setKeyInput(e.target.value)}
                placeholder="Admin key..."
                className={`pl-3 pr-8 py-2 bg-secondary border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 font-mono transition-colors ${keyError ? 'border-destructive' : 'border-border'}`}
              />
              <button type="button" onClick={() => setShowKey(v => !v)} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
            <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold hover:bg-primary/80 transition-colors">
              Unlock
            </button>
            {keyError && <span className="text-xs text-destructive font-semibold">Invalid key</span>}
          </form>
        </div>
      )}

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Map */}
        <div className="xl:col-span-2">
          <div className="glass rounded-2xl border border-primary/20 overflow-hidden">
            <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
              <span className="text-xs font-bold text-primary tracking-widest">CAMP PHOENIX — DOME PERIMETER MAP</span>
              <span className="text-xs text-muted-foreground">~518 mi² · 9 Active Zones · {GATE_POSITIONS.length} Checkpoint Gates</span>
            </div>
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <div className="absolute inset-0 p-1">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <radialGradient id="mapBg" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#0d1526" />
                      <stop offset="100%" stopColor="#060d1a" />
                    </radialGradient>
                    <radialGradient id="domeRim" cx="50%" cy="50%" r="50%">
                      <stop offset="72%" stopColor="transparent" />
                      <stop offset="88%" stopColor="rgba(59,130,246,0.12)" />
                      <stop offset="100%" stopColor="rgba(59,130,246,0.30)" />
                    </radialGradient>
                    <pattern id="mapGrid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                      <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(59,130,246,0.05)" strokeWidth="0.2" />
                    </pattern>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="0.6" result="blur" />
                      <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  <rect width="100" height="100" fill="url(#mapBg)" />
                  <rect width="100" height="100" fill="url(#mapGrid)" />

                  {/* Dome rings */}
                  <ellipse cx="50" cy="50" rx="46" ry="44" fill="url(#domeRim)" />
                  <ellipse cx="50" cy="50" rx="46" ry="44" fill="none"
                    stroke="rgba(59,130,246,0.55)" strokeWidth="0.55" strokeDasharray="1.5 0.7" />
                  {/* Inner ring */}
                  <ellipse cx="50" cy="50" rx="38" ry="36" fill="none"
                    stroke="rgba(59,130,246,0.10)" strokeWidth="0.25" strokeDasharray="0.8 1.2" />

                  {/* Radial roads */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                    const rad = (angle * Math.PI) / 180;
                    return (
                      <line key={i} x1={48} y1={44}
                        x2={48 + Math.cos(rad) * 40} y2={44 + Math.sin(rad) * 40}
                        stroke="rgba(59,130,246,0.07)" strokeWidth="0.25" />
                    );
                  })}
                  {/* Grid roads */}
                  {[35, 45, 55, 65].map(x => <line key={`v${x}`} x1={x} y1="18" x2={x} y2="83" stroke="rgba(59,130,246,0.06)" strokeWidth="0.2" />)}
                  {[30, 40, 50, 60, 70].map(y => <line key={`h${y}`} x1="14" y1={y} x2="86" y2={y} stroke="rgba(59,130,246,0.06)" strokeWidth="0.2" />)}

                  {/* Zone blobs */}
                  {zones.map(z => {
                    const sc = STATUS_COLORS[z.status];
                    return (
                      <ellipse key={`blob-${z.id}`}
                        cx={z.x} cy={z.y} rx="9" ry="7.5"
                        fill={z.color} opacity={selected === z.id ? 0.28 : 0.13}
                        className="transition-opacity duration-300" />
                    );
                  })}

                  {/* Gate checkpoints */}
                  {GATE_POSITIONS.map((g, i) => (
                    <g key={i} transform={`translate(${g.x}, ${g.y})`}>
                      <rect x="-2.5" y="-1.2" width="5" height="2.4" rx="0.6"
                        fill="rgba(10,14,26,0.9)" stroke="rgba(59,130,246,0.5)" strokeWidth="0.3" />
                      <text textAnchor="middle" y="0.5" fontSize="1.4" fill="rgba(148,163,184,0.7)"
                        fontFamily="Barlow Condensed, sans-serif" fontWeight="bold">{g.label}</text>
                    </g>
                  ))}

                  {/* Zone markers */}
                  {zones.map(z => {
                    const sc = STATUS_COLORS[z.status];
                    const isSelected = selected === z.id;
                    return (
                      <g key={z.id} onClick={() => setSelected(z.id === selected ? null : z.id)}
                        style={{ cursor: 'pointer' }} transform={`translate(${z.x}, ${z.y})`} filter="url(#glow)">
                        {/* Alert ring */}
                        {z.status !== 'nominal' && (
                          <circle r="5.5" fill="none" stroke={sc.color} strokeWidth="0.4" opacity="0.5">
                            <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <circle r="3.8"
                          fill={isSelected ? z.color : 'rgba(10,14,26,0.88)'}
                          stroke={z.color} strokeWidth={isSelected ? 0.8 : 0.5}
                          opacity={selected && !isSelected ? 0.5 : 1} />
                        <circle r="1.4" fill={z.color} opacity={isSelected ? 1 : 0.75} />
                        {/* Status dot */}
                        <circle cx="3" cy="-3" r="1.2" fill={sc.color} opacity="0.9" />
                        {isSelected && (
                          <circle r="5.5" fill="none" stroke={z.color} strokeWidth="0.5" opacity="0.5">
                            <animate attributeName="r" values="4;7;4" dur="1.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <text x="0" y="-5" textAnchor="middle" fontSize="2" fill={z.color}
                          fontFamily="Barlow Condensed, sans-serif" fontWeight="bold"
                          opacity={selected && !isSelected ? 0.35 : 0.85}>
                          {z.label.split(' ').slice(0, 2).join(' ')}
                        </text>
                      </g>
                    );
                  })}

                  {/* Dome label */}
                  <text x="50" y="6.5" textAnchor="middle" fontSize="1.8" fill="rgba(148,163,184,0.5)"
                    fontFamily="Barlow Condensed, sans-serif" fontWeight="bold" letterSpacing="0.4">
                    ELECTROMAGNETIC HARDENED DOME PERIMETER · 518 mi²
                  </text>

                  {/* Scale */}
                  <line x1="72" y1="90" x2="84" y2="90" stroke="rgba(148,163,184,0.4)" strokeWidth="0.35" />
                  <line x1="72" y1="89.2" x2="72" y2="90.8" stroke="rgba(148,163,184,0.4)" strokeWidth="0.35" />
                  <line x1="84" y1="89.2" x2="84" y2="90.8" stroke="rgba(148,163,184,0.4)" strokeWidth="0.35" />
                  <text x="78" y="93.5" textAnchor="middle" fontSize="1.7" fill="rgba(148,163,184,0.4)"
                    fontFamily="Barlow Condensed, sans-serif">~25 mi</text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Zone detail */}
          <div className="glass rounded-2xl p-4 border border-border/50 min-h-[180px]">
            <div className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-3">Zone Details</div>
            {sel ? (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{sel.icon}</span>
                    <div>
                      <div className="font-display font-black text-base" style={{ color: sel.color }}>{sel.label}</div>
                      <div className="text-xs text-muted-foreground">Sector {sel.sector}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${STATUS_COLORS[sel.status].bg}`}>
                    {STATUS_COLORS[sel.status].label}
                  </span>
                </div>

                {selMetrics && (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    {[
                      { k: 'Occupancy', v: `${selMetrics.occupancy.toLocaleString()} / ${sel.capacity.toLocaleString()}` },
                      { k: 'Power', v: `${selMetrics.power}%` },
                      { k: 'Climate', v: `${selMetrics.temp}°F` },
                      { k: 'Incidents', v: selMetrics.incidents },
                    ].map(row => (
                      <div key={row.k} className="glass rounded-lg p-2 text-center">
                        <div className="text-xs text-muted-foreground">{row.k}</div>
                        <div className="font-display font-bold text-sm text-foreground">{row.v}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Admin controls */}
                {unlocked && (
                  <div>
                    <div className="text-xs font-bold text-primary tracking-wide mb-2">Set Zone Status</div>
                    <div className="flex gap-2">
                      {['nominal', 'elevated', 'alert'].map(s => (
                        <button key={s} onClick={() => toggleZoneStatus(sel.id, s)}
                          className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all capitalize ${sel.status === s ? STATUS_COLORS[s].bg : 'border-border/40 text-muted-foreground hover:border-border'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {!unlocked && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/40 rounded-lg px-3 py-2">
                    <Lock className="w-3 h-3" />
                    Unlock admin to manage zone status
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-xs">Click a zone node on the map to view live metrics and controls.</p>
            )}
          </div>

          {/* Zone status list */}
          <div className="glass rounded-2xl p-4 border border-border/50">
            <div className="text-xs font-bold text-muted-foreground tracking-wide uppercase mb-3">All Zones</div>
            <div className="space-y-1.5">
              {zones.map(z => {
                const m = metrics[z.id];
                const sc = STATUS_COLORS[z.status];
                return (
                  <button key={z.id} onClick={() => setSelected(z.id === selected ? null : z.id)}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left transition-colors ${selected === z.id ? 'bg-white/5' : 'hover:bg-white/3'}`}>
                    <span className="text-sm">{z.icon}</span>
                    <span className="text-xs text-muted-foreground flex-1 truncate">{z.label}</span>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: sc.color }} />
                    {m && <span className="text-xs font-mono text-muted-foreground flex-shrink-0">{m.power}%</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dome stats */}
          <div className="glass rounded-2xl p-4 border border-yellow-400/20">
            <div className="text-xs font-bold text-yellow-400 tracking-wide uppercase mb-3">Infrastructure Status</div>
            <div className="space-y-2">
              {[
                ['Dome Integrity', '100%', '#22C55E'],
                ['Power Grid', `${Math.round(92 + Math.sin(tick) * 3)}%`, '#EAB308'],
                ['Climate Control', '72.4°F', '#3B82F6'],
                ['Gate Status', '8/8 Operational', '#22C55E'],
                ['AI Patrol', 'Active', '#22C55E'],
                ['Network Uptime', '99.97%', '#22C55E'],
              ].map(([k, v, c]) => (
                <div key={k} className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-bold" style={{ color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
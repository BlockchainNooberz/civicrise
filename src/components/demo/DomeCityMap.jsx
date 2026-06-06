import { useState } from 'react';
import { MapPin, Zap, Shield, Trees, Building2, Cpu, Home, Utensils, Dumbbell, GraduationCap } from 'lucide-react';

const ZONES = [
  { id: 'core', label: 'Beast Command Core', x: 48, y: 44, color: '#F59E0B', icon: '👑', desc: 'MrBeast HQ, broadcast towers, Beast Games arena, and central plaza. The beating heart of the city.' },
  { id: 'ai', label: 'AI & Tech Quarter', x: 62, y: 32, color: '#3B82F6', icon: '🤖', desc: 'Robotics labs, AI training centers, drone factories, and high-speed fiber network hub.' },
  { id: 'trades', label: 'Trades & Build District', x: 30, y: 55, color: '#F97316', icon: '🔧', desc: 'Welding shops, construction simulators, electrical labs, and maker spaces.' },
  { id: 'ag', label: 'Urban Agriculture Ring', x: 72, y: 60, color: '#22C55E', icon: '🌾', desc: 'Vertical farms, greenhouse corridors, aquaponics systems, and community gardens feeding 30,000+.' },
  { id: 'housing', label: 'Residential Sectors A-D', x: 44, y: 62, color: '#8B5CF6', icon: '🏠', desc: 'Tiered housing blocks. Newcomers → shared barracks; Citizens → private studio units. All climate-controlled.' },
  { id: 'med', label: 'Medical & Wellness', x: 28, y: 32, color: '#EC4899', icon: '🏥', desc: 'Full hospital, dental, mental health wings, fitness centers, and rehabilitation services.' },
  { id: 'market', label: 'NAC Marketplace', x: 58, y: 70, color: '#F59E0B', icon: '🛍️', desc: 'Resident-run economy zone. Spend NAC on upgrades, luxuries, services. Zero external cash.' },
  { id: 'dome', label: 'Dome Perimeter', x: 50, y: 10, color: '#64748B', icon: '🔵', desc: 'Electromagnetic hardened dome shell — 518 sq mi coverage. Climate-controlled, force-field reinforced perimeter.' },
  { id: 'power', label: 'Solar & Energy Grid', x: 18, y: 72, color: '#EAB308', icon: '⚡', desc: 'Full renewable energy: solar arrays, wind turbines, and hydrogen fuel cells. 100% energy independent.' },
];

const DISTRICT_BLOBS = [
  { cx: 48, cy: 44, rx: 12, ry: 10, color: '#F59E0B', opacity: 0.18 },
  { cx: 62, cy: 32, rx: 10, ry: 8, color: '#3B82F6', opacity: 0.18 },
  { cx: 30, cy: 55, rx: 10, ry: 8, color: '#F97316', opacity: 0.18 },
  { cx: 72, cy: 60, rx: 9, ry: 8, color: '#22C55E', opacity: 0.18 },
  { cx: 44, cy: 62, rx: 11, ry: 9, color: '#8B5CF6', opacity: 0.18 },
  { cx: 28, cy: 32, rx: 8, ry: 7, color: '#EC4899', opacity: 0.18 },
  { cx: 58, cy: 70, rx: 8, ry: 7, color: '#F59E0B', opacity: 0.15 },
  { cx: 18, cy: 72, rx: 7, ry: 6, color: '#EAB308', opacity: 0.15 },
];

export default function DomeCityMap() {
  const [selected, setSelected] = useState(null);

  const sel = ZONES.find(z => z.id === selected);

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-3">
          SECTION 01 — DOME CITY MAP
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">CAMP PHOENIX: SEALED CITY BLUEPRINT</h2>
        <p className="text-muted-foreground max-w-2xl">
          A fully enclosed, climate-controlled city covering the entire Phoenix metro footprint (~518 sq mi). Every district purpose-built for resident growth, safety, and reintegration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="relative w-full rounded-2xl overflow-hidden border border-primary/20 glass"
            style={{ paddingBottom: '75%' }}>
            <div className="absolute inset-0 p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ cursor: 'default' }}>
                <defs>
                  <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0d1526" />
                    <stop offset="100%" stopColor="#060d1a" />
                  </radialGradient>
                  <radialGradient id="domeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="70%" stopColor="transparent" />
                    <stop offset="90%" stopColor="rgba(59,130,246,0.15)" />
                    <stop offset="100%" stopColor="rgba(59,130,246,0.35)" />
                  </radialGradient>
                  {/* Grid pattern */}
                  <pattern id="grid" x="0" y="0" width="5" height="5" patternUnits="userSpaceOnUse">
                    <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(59,130,246,0.06)" strokeWidth="0.2" />
                  </pattern>
                </defs>

                {/* Background */}
                <rect width="100" height="100" fill="url(#bgGrad)" />
                <rect width="100" height="100" fill="url(#grid)" />

                {/* Dome outer ring */}
                <ellipse cx="50" cy="50" rx="46" ry="44"
                  fill="none" stroke="rgba(59,130,246,0.5)" strokeWidth="0.6" strokeDasharray="1.5 0.8" />
                <ellipse cx="50" cy="50" rx="46" ry="44" fill="url(#domeGlow)" />
                {/* Dome shimmer top */}
                <ellipse cx="50" cy="12" rx="20" ry="4" fill="rgba(147,197,253,0.08)" />

                {/* Road grid (inner) */}
                {[35, 45, 55, 65].map(x => (
                  <line key={`vr${x}`} x1={x} y1="20" x2={x} y2="82"
                    stroke="rgba(59,130,246,0.07)" strokeWidth="0.3" />
                ))}
                {[30, 40, 50, 60, 70].map(y => (
                  <line key={`hr${y}`} x1="15" y1={y} x2="85" y2={y}
                    stroke="rgba(59,130,246,0.07)" strokeWidth="0.3" />
                ))}
                {/* Radial roads from core */}
                {[30, 75, 120, 165, 210, 255, 300, 345].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <line key={i}
                      x1={48} y1={44}
                      x2={48 + Math.cos(rad) * 36} y2={44 + Math.sin(rad) * 36}
                      stroke="rgba(59,130,246,0.08)" strokeWidth="0.25" />
                  );
                })}

                {/* District blobs */}
                {DISTRICT_BLOBS.map((b, i) => (
                  <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry}
                    fill={b.color} opacity={b.opacity} />
                ))}

                {/* Zone markers */}
                {ZONES.filter(z => z.id !== 'dome').map(z => (
                  <g key={z.id} onClick={() => setSelected(z.id === selected ? null : z.id)}
                    style={{ cursor: 'pointer' }} transform={`translate(${z.x}, ${z.y})`}>
                    <circle r="3.5"
                      fill={selected === z.id ? z.color : 'rgba(10,14,26,0.85)'}
                      stroke={z.color} strokeWidth="0.6"
                      opacity={selected && selected !== z.id ? 0.5 : 1} />
                    <circle r="1.5" fill={z.color} opacity={selected === z.id ? 1 : 0.8} />
                    {/* Pulse */}
                    {selected === z.id && (
                      <circle r="5" fill="none" stroke={z.color} strokeWidth="0.4" opacity="0.5">
                        <animate attributeName="r" values="3.5;7;3.5" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0;0.6" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <text x="0" y="-4.5" textAnchor="middle"
                      fontSize="2.2" fill={z.color} fontFamily="Barlow Condensed, sans-serif" fontWeight="bold"
                      opacity={selected && selected !== z.id ? 0.4 : 0.9}>
                      {z.label.split(' ').slice(0, 2).join(' ')}
                    </text>
                  </g>
                ))}

                {/* Dome label */}
                <text x="50" y="7" textAnchor="middle" fontSize="2" fill="rgba(148,163,184,0.6)"
                  fontFamily="Barlow Condensed, sans-serif" fontWeight="bold" letterSpacing="0.5">
                  ELECTROMAGNETIC HARDENED DOME PERIMETER
                </text>

                {/* Scale bar */}
                <line x1="70" y1="90" x2="82" y2="90" stroke="rgba(148,163,184,0.4)" strokeWidth="0.4" />
                <text x="76" y="93.5" textAnchor="middle" fontSize="1.8" fill="rgba(148,163,184,0.5)"
                  fontFamily="Barlow Condensed, sans-serif">~25 miles</text>
              </svg>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Interactive — tap any district node to explore. Scale: ~518 sq mi (full Phoenix metro footprint)
          </p>
        </div>

        {/* District info panel */}
        <div className="space-y-3">
          <div className="glass rounded-xl p-4 border border-border/50">
            <h3 className="font-display font-black text-sm tracking-wide text-foreground mb-3 uppercase">District Details</h3>
            {sel ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{sel.icon}</span>
                  <span className="font-display font-black text-base" style={{ color: sel.color }}>{sel.label}</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{sel.desc}</p>
              </div>
            ) : (
              <p className="text-muted-foreground text-xs">Click a node on the map to view district details.</p>
            )}
          </div>

          {/* Zone legend */}
          <div className="glass rounded-xl p-4 border border-border/50">
            <h3 className="font-display font-black text-xs tracking-wide text-muted-foreground mb-3 uppercase">Zone Legend</h3>
            <div className="space-y-2">
              {ZONES.filter(z => z.id !== 'dome').map(z => (
                <button key={z.id} onClick={() => setSelected(z.id === selected ? null : z.id)}
                  className={`w-full flex items-center gap-2 text-left rounded-lg px-2 py-1.5 transition-colors ${selected === z.id ? 'bg-white/5' : 'hover:bg-white/3'}`}>
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: z.color }} />
                  <span className="text-xs text-muted-foreground">{z.icon} {z.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dome stats */}
          <div className="glass rounded-xl p-4 border border-yellow-400/20">
            <h3 className="font-display font-black text-xs tracking-wide text-yellow-400 mb-3 uppercase">Dome Specs</h3>
            <div className="space-y-2 text-xs">
              {[
                ['Material', 'Graphene-composite shell'],
                ['Coverage', '518 sq miles'],
                ['Climate', 'AI-regulated 72°F year-round'],
                ['Defense', 'EM hardened, perimeter AI patrol'],
                ['Power', '100% renewable (solar + hydrogen)'],
                ['Exits', '8 checkpoint gates (voluntary)'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
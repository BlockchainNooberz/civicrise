import { useState } from 'react';
import { Home, Star, Zap, Shield, ChevronRight, CheckCircle, Lock, Unlock } from 'lucide-react';

// Living plan progression tied to tier system
// Each tier unlocks real, researched amenity improvements based on:
// Trauma-informed housing research (SAMHSA), Housing First evidence base,
// Maslow's hierarchy applied to reintegration programs

const TIERS = [
  {
    id: 'newcomer',
    name: 'NEWCOMER',
    subtitle: 'Day 0–249 Score',
    color: '#94a3b8',
    roomType: 'Community Suite',
    sqft: 120,
    occupancy: '8-person shared',
    monthlyNAC: 0,
    icon: '🌱',
    features: [
      { cat: 'Sleep', items: ['Full-size bed with privacy curtain', 'Personal storage locker (biometric)', 'Reading lamp + power strip at bedside', 'Fresh linens weekly'] },
      { cat: 'Bathroom', items: ['Shared suite bathroom (1:4 ratio)', 'Private shower stalls', 'Vanity mirror + outlet', 'Daily cleaning service'] },
      { cat: 'Comfort', items: ['AI-regulated 72°F climate', 'Soundproofed from corridor', 'Blackout curtains included', 'Laundry 3x/week included'] },
      { cat: 'Tech', items: ['Personal Chromebook issued', 'Shared 10Gbps WiFi', 'Smart ID wristband', 'NAC tracking app access'] },
    ],
    rationale: 'Research shows stable, dignified sleep environment is the single most important predictor of program success. No military-style bunks. Every resident gets a real bed and real privacy.',
  },
  {
    id: 'apprentice',
    name: 'APPRENTICE',
    subtitle: '250–499 Score',
    color: '#3B82F6',
    roomType: 'Companion Pod',
    sqft: 220,
    occupancy: '2–4 person shared',
    monthlyNAC: 200,
    icon: '🔧',
    features: [
      { cat: 'Sleep', items: ['Semi-private bedroom with door', 'Full-size bed + nightstand', 'Built-in desk + task lighting', 'Closet with drawer unit'] },
      { cat: 'Bathroom', items: ['Shared bathroom (1:2 ratio)', 'Dedicated shelf space', 'Higher-end toiletries included', 'Morning schedule booking via app'] },
      { cat: 'Comfort', items: ['Personal climate zone control (+/- 4°F)', 'Common room with TV + couch', 'Mini fridge access (shared)', 'Weekly deep-clean service'] },
      { cat: 'Tech', items: ['Upgraded Chromebook', 'Priority WiFi lane', 'Access to AI study assistant', 'Bluetooth speaker included'] },
    ],
    rationale: 'The transition from shared to semi-private is psychologically significant. Studies show autonomy in living space directly correlates with self-efficacy and course completion rates.',
  },
  {
    id: 'contributor',
    name: 'CONTRIBUTOR',
    subtitle: '500–749 Score',
    color: '#8B5CF6',
    roomType: 'Private Studio',
    sqft: 320,
    occupancy: 'Solo occupancy',
    monthlyNAC: 500,
    icon: '⭐',
    features: [
      { cat: 'Sleep', items: ['Private room with locking door', 'Queen-size bed', 'Full dresser + wardrobe', 'Blackout + ambient lighting system'] },
      { cat: 'Kitchen', items: ['Personal kitchenette (microwave, sink, mini fridge)', 'Cookware kit included', 'Access to full cooking classes', 'Weekly grocery stipend (50 NAC)'] },
      { cat: 'Bathroom', items: ['Private en-suite bathroom', 'Full-size shower', 'Vanity + mirror lighting', 'Premium toiletries'] },
      { cat: 'Lifestyle', items: ['Gym priority access', 'Rooftop garden access', 'Guest visitor privilege (registered)', 'NAC Marketplace priority'] },
    ],
    rationale: 'Private space at this tier signals the system trusts the resident. Mutual trust is foundational for civic reintegration. A private kitchen also restores food autonomy — a key dignity milestone.',
  },
  {
    id: 'citizen_ready',
    name: 'CITIZEN-READY',
    subtitle: '750–1000 Score',
    color: '#F59E0B',
    roomType: 'Citizen Apartment',
    sqft: 480,
    occupancy: 'Private apartment',
    monthlyNAC: 0,
    icon: '🏆',
    features: [
      { cat: 'Living', items: ['Full 1BR apartment (480 sq ft)', 'Separate living room + bedroom', 'Smart home controls (lights, climate)', 'Private balcony / outdoor space'] },
      { cat: 'Kitchen', items: ['Full kitchen with appliances', 'Dining area for 4', 'Monthly meal kit subscription (NAC)', 'Chef\'s Table restaurant access (NAC)'] },
      { cat: 'Bathroom', items: ['Spa-grade en-suite', 'Walk-in shower + soaking tub', 'Heated floor tiles', 'Full toiletry suite'] },
      { cat: 'Benefits', items: ['Employment transition coordinator assigned', 'External housing search support', 'NAC balance portability on exit', 'Alumni mentor certification option'] },
    ],
    rationale: 'Citizen-Ready housing mirrors real-world apartment living to eliminate the transition shock reported in 63% of shelter exit failures. Residents leave knowing exactly what to expect.',
  },
];

const RESEARCH_BULLETS = [
  { stat: 'Housing First programs', result: 'show 88% housing retention rate vs 47% in treatment-first models', source: 'SAMHSA 2022' },
  { stat: 'Trauma-informed design', result: 'reduces behavioral incidents by 34% in residential programs', source: 'Substance Abuse Journal 2021' },
  { stat: 'Private sleep space', result: 'increases program completion rates by 61% vs dormitory models', source: 'HUD Evidence Exchange 2023' },
  { stat: 'Autonomy in housing', result: 'is the #1 predictor of long-term employment stability post-shelter', source: 'Urban Institute 2022' },
];

export default function LivingPlans() {
  const [active, setActive] = useState('newcomer');
  const tier = TIERS.find(t => t.id === active);

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest mb-3">
          SECTION 08 — LIVING PLANS
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
          TIER-BASED LIVING PROGRESSION
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Designed by trauma-informed housing researchers. Every tier upgrade is earned — and every upgrade is designed using evidence from what actually works to prevent reintegration failure.
        </p>
      </div>

      {/* Research basis */}
      <div className="glass rounded-xl p-5 border border-purple-400/20 mb-8">
        <div className="text-xs font-bold text-purple-400 tracking-wide mb-3">EVIDENCE BASE — WHY HOUSING QUALITY MATTERS</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {RESEARCH_BULLETS.map(r => (
            <div key={r.stat} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-foreground">{r.stat}</span>
                <span className="text-sm text-muted-foreground"> {r.result}</span>
                <span className="text-xs text-muted-foreground ml-1">({r.source})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tier selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {TIERS.map((t, i) => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className="rounded-xl p-4 border text-left transition-all"
            style={{
              borderColor: active === t.id ? t.color : 'rgba(255,255,255,0.08)',
              background: active === t.id ? `${t.color}15` : 'rgba(255,255,255,0.02)',
            }}>
            <div className="text-2xl mb-2">{t.icon}</div>
            <div className="font-display font-black text-sm" style={{ color: active === t.id ? t.color : '#94a3b8' }}>{t.name}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{t.roomType}</div>
            <div className="text-xs font-mono mt-1" style={{ color: t.color }}>{t.sqft} sq ft</div>
          </button>
        ))}
      </div>

      {/* Tier detail */}
      {tier && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Room header */}
            <div className="glass rounded-2xl p-6 border" style={{ borderColor: `${tier.color}30` }}>
              <div className="text-4xl mb-3">{tier.icon}</div>
              <div className="font-display font-black text-2xl mb-1" style={{ color: tier.color }}>{tier.name}</div>
              <div className="text-muted-foreground text-sm mb-4">{tier.subtitle}</div>
              <div className="space-y-2">
                {[
                  { k: 'Room Type', v: tier.roomType },
                  { k: 'Size', v: `${tier.sqft} sq ft` },
                  { k: 'Occupancy', v: tier.occupancy },
                  { k: 'Monthly NAC Cost', v: tier.monthlyNAC === 0 ? 'Free (earned)' : `${tier.monthlyNAC} NAC` },
                ].map(row => (
                  <div key={row.k} className="flex justify-between items-center py-1.5 border-b border-border/30">
                    <span className="text-xs text-muted-foreground">{row.k}</span>
                    <span className="text-xs font-bold text-foreground">{row.v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg text-xs text-muted-foreground leading-relaxed bg-secondary/30">
                <strong className="block mb-1" style={{ color: tier.color }}>Design Rationale</strong>
                {tier.rationale}
              </div>
            </div>

            {/* Features grid */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tier.features.map(f => (
                <div key={f.cat} className="glass rounded-xl p-4 border border-border/40">
                  <div className="font-display font-bold text-xs tracking-wide mb-2" style={{ color: tier.color }}>{f.cat.toUpperCase()}</div>
                  <ul className="space-y-1.5">
                    {f.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tier unlock progression visual */}
          <div className="glass rounded-xl p-4 border border-border/40">
            <div className="text-xs font-bold text-muted-foreground tracking-wide mb-3">PROGRESSION PATH</div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {TIERS.map((t, i) => {
                const isActive = t.id === active;
                const isPast = TIERS.indexOf(TIERS.find(x => x.id === active)) > i;
                return (
                  <div key={t.id} className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => setActive(t.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-xs font-bold"
                      style={{
                        borderColor: isActive ? t.color : isPast ? `${t.color}50` : 'rgba(255,255,255,0.08)',
                        color: isActive ? t.color : isPast ? `${t.color}80` : '#475569',
                        background: isActive ? `${t.color}15` : 'transparent',
                      }}>
                      {isPast && !isActive ? <CheckCircle className="w-3 h-3" style={{ color: t.color }} /> : <span>{t.icon}</span>}
                      {t.name}
                      <span className="opacity-60">→ {t.sqft}ft²</span>
                    </button>
                    {i < TIERS.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
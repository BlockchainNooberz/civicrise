import { useState } from 'react';
import { Building2, Wifi, Zap, Droplets, ChefHat, Shield, Cpu, Trees, Dumbbell, GraduationCap, Heart, Home } from 'lucide-react';

const FACILITY_ZONES = [
  {
    id: 'housing',
    icon: Home,
    label: 'Residential Housing',
    color: '#8B5CF6',
    capacity: '30,000 beds',
    specs: [
      { k: 'Tier 1 (Newcomer)', v: '8-person shared dormitory suites, locker storage, smart climate' },
      { k: 'Tier 2 (Apprentice)', v: '4-person co-living pods, semi-private bathrooms, desk space' },
      { k: 'Tier 3 (Contributor)', v: '2-person units, shared common room, private lockers' },
      { k: 'Tier 4 (Citizen-Ready)', v: 'Private studio apartments — 320 sq ft, kitchenette, balcony' },
      { k: 'Build material', v: 'Modular steel + insulated composite panels, 40yr lifespan' },
      { k: 'Smart systems', v: 'AI-regulated climate, keycard access, energy metering per unit' },
    ],
  },
  {
    id: 'tech',
    icon: Cpu,
    label: 'AI & Tech Centers',
    color: '#3B82F6',
    capacity: '6 facilities',
    specs: [
      { k: 'Workstations', v: '1,200 AI-grade workstations, 10Gbps fiber per seat' },
      { k: 'Labs', v: 'Robotics bay, drone assembly, 3D printing, electronics repair' },
      { k: 'VR Suite', v: '80-seat VR training lab for immersive skills simulation' },
      { k: 'Server Core', v: 'On-site data center powering camp NAC blockchain ledger' },
      { k: 'Broadcast', v: 'MrBeast production studio, content creation rooms, streaming rigs' },
      { k: 'Certifications', v: 'Google, AWS, CompTIA proctoring center on-site' },
    ],
  },
  {
    id: 'trades',
    icon: Building2,
    label: 'Trades & Fabrication',
    color: '#F97316',
    capacity: '4 workshop complexes',
    specs: [
      { k: 'Welding', v: '120-station welding shop, MIG/TIG/Stick, AWS certification path' },
      { k: 'Electrical', v: 'Full residential + commercial wiring simulation facility' },
      { k: 'Plumbing', v: 'Hands-on plumbing lab, pipe fitting, code compliance' },
      { k: 'Construction', v: 'Open-air build yard — full framing, drywall, roofing training' },
      { k: 'HVAC', v: 'Climate system installation and maintenance training' },
      { k: 'Equipment', v: 'All tools included, PPE provided, tool library system' },
    ],
  },
  {
    id: 'medical',
    icon: Heart,
    label: 'Medical & Wellness',
    color: '#EC4899',
    capacity: '1 hospital + 8 clinics',
    specs: [
      { k: 'Main Hospital', v: '200-bed facility, ER, surgery, intensive care unit' },
      { k: 'Mental Health', v: 'Full psychiatric ward, group therapy, CBT/DBT programs' },
      { k: 'Addiction Recovery', v: 'Dedicated rehab track, medically-supervised detox' },
      { k: 'Dental', v: '40-chair dental clinic, full restorative and cosmetic services' },
      { k: 'Pharmacy', v: 'On-site dispensary, NAC-subsidized medications' },
      { k: 'Fitness', v: '6 gyms (1 per sector), Olympic pool, yoga/meditation studios' },
    ],
  },
  {
    id: 'agriculture',
    icon: Trees,
    label: 'Urban Agriculture',
    color: '#22C55E',
    capacity: 'Feeds 32,000+ daily',
    specs: [
      { k: 'Vertical Farms', v: '12 towers, 40-story LED-lit hydroponic systems' },
      { k: 'Greenhouse Ring', v: '8 mile greenhouse belt around dome interior perimeter' },
      { k: 'Aquaponics', v: 'Fish + vegetable integrated systems, 50k lbs protein/month' },
      { k: 'Community Plots', v: 'Resident-tended garden plots (NAC-earning activity)' },
      { k: 'Output', v: '85% food self-sufficiency by Month 8' },
      { k: 'Surplus', v: 'Excess sold externally, revenue into housing fund' },
    ],
  },
  {
    id: 'education',
    icon: GraduationCap,
    label: 'Education Campus',
    color: '#F59E0B',
    capacity: '3 campuses',
    specs: [
      { k: 'K-12 School', v: 'Full school for residents with children, AI-tutored curriculum' },
      { k: 'Adult Ed', v: '300-seat lecture halls, 80 classroom modules' },
      { k: 'Library', v: '120,000-volume digital + physical library, maker spaces' },
      { k: 'Language Lab', v: 'ESL, coding bootcamps, financial literacy required modules' },
      { k: 'Auditorium', v: '2,000-seat events hall for Beast Games challenges, graduations' },
      { k: 'Online', v: 'Khan Academy, Coursera, Udemy integrated into NAC earning system' },
    ],
  },
];

export default function FacilityDesign() {
  const [active, setActive] = useState('housing');
  const zone = FACILITY_ZONES.find(z => z.id === active);

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold tracking-widest mb-3">
          SECTION 03 — FACILITY DESIGN
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">INFRASTRUCTURE SPECS</h2>
        <p className="text-muted-foreground max-w-2xl">
          Every zone engineered for purpose, scalability, and human dignity. Click any category to explore specifications.
        </p>
      </div>

      {/* Zone selector tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FACILITY_ZONES.map(z => {
          const Icon = z.icon;
          return (
            <button key={z.id} onClick={() => setActive(z.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${active === z.id ? 'text-background' : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'}`}
              style={active === z.id ? { background: z.color, borderColor: z.color } : {}}>
              <Icon className="w-4 h-4" />
              {z.label}
            </button>
          );
        })}
      </div>

      {/* Zone detail */}
      {zone && (
        <div className="glass rounded-2xl p-6 border" style={{ borderColor: `${zone.color}30` }}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `${zone.color}20`, border: `1px solid ${zone.color}40` }}>
                <zone.icon className="w-6 h-6" style={{ color: zone.color }} />
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-foreground">{zone.label}</h3>
                <p className="text-sm font-semibold" style={{ color: zone.color }}>{zone.capacity}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {zone.specs.map(s => (
              <div key={s.k} className="glass rounded-xl p-4 border border-border/30">
                <div className="text-xs font-bold tracking-wide mb-1" style={{ color: zone.color }}>{s.k}</div>
                <div className="text-sm text-foreground leading-relaxed">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Infrastructure summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {[
          { label: 'Total Buildings', value: '847', icon: Building2, color: 'text-primary' },
          { label: 'Renewable Energy', value: '100%', icon: Zap, color: 'text-yellow-400' },
          { label: 'Water Recycled', value: '94%', icon: Droplets, color: 'text-blue-400' },
          { label: 'WiFi Coverage', value: '100%', icon: Wifi, color: 'text-green-400' },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-xl p-4 border border-border/50 text-center">
              <Icon className={`w-6 h-6 mx-auto mb-2 ${s.color}`} />
              <div className={`font-display text-3xl font-black ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
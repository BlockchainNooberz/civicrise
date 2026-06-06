import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Users, TrendingUp, MapPin, ArrowRight } from 'lucide-react';

const SOURCES = [
  {
    region: 'Arizona',
    city: 'Phoenix / Maricopa',
    total2024: 9435,
    pct: 35,
    yr1_intake: 3250,
    color: '#F59E0B',
    notes: '~34% of AZ homeless already in Phoenix metro. Short-distance transport. Highest voluntary opt-in rate projected.',
    flag: '🌵',
  },
  {
    region: 'California',
    city: 'Los Angeles / Statewide',
    total2024: 187084,
    pct: 45,
    yr1_intake: 12400,
    color: '#3B82F6',
    notes: 'Largest source population. LA County alone has 75k+. Focus on voluntary outreach in Skid Row, Tenderloin, San Diego.',
    flag: '🌴',
  },
  {
    region: 'Colorado',
    city: 'Denver / Colorado Springs',
    total2024: 14400,
    pct: 28,
    yr1_intake: 4020,
    color: '#8B5CF6',
    notes: 'Colorado Springs target for Phase 1. Denver overflow secondary. Brutal winters make voluntary participation high.',
    flag: '🏔️',
  },
  {
    region: 'New York',
    city: 'New York City',
    total2024: 140000,
    pct: 20,
    yr1_intake: 8850,
    color: '#EC4899',
    notes: "NYC shelter system doubled 2022-2024. High transit dependency. Outreach via city partnership — NYC's right-to-shelter cost at $60k/person/yr creates strong gov incentive.",
    flag: '🗽',
  },
];

const MONTHLY_RAMP = [
  { month: 'M1', intake: 280, cumulative: 280 },
  { month: 'M2', intake: 650, cumulative: 930 },
  { month: 'M3', intake: 1200, cumulative: 2130 },
  { month: 'M4', intake: 1800, cumulative: 3930 },
  { month: 'M5', intake: 2400, cumulative: 6330 },
  { month: 'M6', intake: 3200, cumulative: 9530 },
  { month: 'M7', intake: 3600, cumulative: 13130 },
  { month: 'M8', intake: 3800, cumulative: 16930 },
  { month: 'M9', intake: 3200, cumulative: 20130 },
  { month: 'M10', intake: 2900, cumulative: 23030 },
  { month: 'M11', intake: 2800, cumulative: 25830 },
  { month: 'M12', intake: 2690, cumulative: 28520 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-border/60 text-xs">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function PopulationProjections() {
  const totalYr1 = SOURCES.reduce((s, r) => s + r.yr1_intake, 0);
  const barData = SOURCES.map(s => ({ name: s.region, intake: s.yr1_intake, total: s.total2024, color: s.color }));

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-widest mb-3">
          SECTION 02 — POPULATION PROJECTIONS
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">YEAR 1 INTAKE PLAN</h2>
        <p className="text-muted-foreground max-w-2xl">
          Based on 2024 HUD Point-in-Time counts. Year 1 targets voluntary participants from 4 source regions, ramping from soft launch to full capacity by Month 12.
        </p>
      </div>

      {/* Big number */}
      <div className="glass-strong rounded-2xl p-6 border border-primary/20 mb-8 text-center">
        <div className="font-display text-6xl md:text-8xl font-black text-gradient-blue">{totalYr1.toLocaleString()}</div>
        <div className="text-muted-foreground text-sm mt-2 font-semibold tracking-wide uppercase">Projected Year 1 Residents</div>
        <div className="text-xs text-muted-foreground mt-1">~8.2% of total available pool from 4 source regions · 100% voluntary enrollment</div>
      </div>

      {/* Source region cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {SOURCES.map(s => (
          <div key={s.region} className="glass rounded-xl p-5 border border-border/50 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{s.flag}</span>
                  <span className="font-display font-black text-xl text-foreground">{s.region}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {s.city}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-black text-2xl" style={{ color: s.color }}>
                  {s.yr1_intake.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Yr1 intake</div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Pool: {s.total2024.toLocaleString()} homeless</span>
                <span style={{ color: s.color }}>{s.pct}% outreach target</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">{s.notes}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-1">Year 1 Intake by Region</h3>
          <p className="text-xs text-muted-foreground mb-4">Voluntary participants projected</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="intake" name="Yr1 Intake" radius={[4, 4, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Ramp chart */}
        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-1">Monthly Intake Ramp</h3>
          <p className="text-xs text-muted-foreground mb-4">Cumulative population growth over Year 1</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_RAMP} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="cumulative" name="Total Population" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="intake" name="Monthly New" stroke="#F59E0B" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Phase notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[
          { phase: 'Phase 1: Months 1-3', desc: 'Soft launch. Arizona-first. 2,000 beds active. Staff training, system hardening, Beast Games crew on-site for setup.', color: 'border-accent/30 text-accent' },
          { phase: 'Phase 2: Months 4-8', desc: 'Full California + Colorado intake begins. Population ramps to 17k. All district zones operational. First NAC economy cycle.', color: 'border-primary/30 text-primary' },
          { phase: 'Phase 3: Months 9-12', desc: 'NYC pipeline live. First reintegration class of ~3,200 exits city-ready. Yr2 expansion to 5 new dome sites begins planning.', color: 'border-purple-400/30 text-purple-400' },
        ].map(p => (
          <div key={p.phase} className={`glass rounded-xl p-4 border ${p.color.split(' ')[0]}`}>
            <div className={`font-display font-black text-sm mb-2 ${p.color.split(' ')[1]}`}>{p.phase}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
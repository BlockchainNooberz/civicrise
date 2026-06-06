import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, AreaChart, Area } from 'recharts';
import { Users, TrendingUp, MapPin, Info, AlertCircle } from 'lucide-react';

// All data from HUD 2024 Annual Homeless Assessment Report (AHAR)
// and 2024 Point-in-Time (PIT) Count released June 2024
// Available at: https://www.hudexchange.info/homelessness-assistance/ahar/

const SOURCES = [
  {
    region: 'Arizona',
    city: 'Phoenix / Maricopa',
    total2024: 9435,
    unsheltered: 6810, // ~72% unsheltered (HUD 2024)
    pct_outreach: 34,
    yr1_intake: 3250,
    color: '#F59E0B',
    notes: '72% of AZ homeless are unsheltered — highest ROI for outreach. Short-distance transport, warm climate means 0 weather-driven emergency need. Phoenix metro already serves as regional hub.',
    flag: '🌵',
    cost_current: 28000,
    top_causes: ['Substance use disorder 41%', 'Mental illness 38%', 'Job loss 29%', 'Eviction 24%'],
  },
  {
    region: 'California',
    city: 'Los Angeles / Statewide',
    total2024: 187084,
    unsheltered: 123475, // ~66% unsheltered
    pct_outreach: 7,
    yr1_intake: 12400,
    color: '#3B82F6',
    notes: 'Largest state population (187k). LA County alone: 75,312. Skid Row has ~4,000 daily. CA spends $24B/yr on homelessness with declining outcomes. Federal pressure on CA to accept program.',
    flag: '🌴',
    cost_current: 57000,
    top_causes: ['Unaffordable housing 61%', 'Job loss 34%', 'Mental illness 41%', 'Substance use 38%'],
  },
  {
    region: 'Colorado',
    city: 'Denver / Statewide',
    total2024: 14400,
    unsheltered: 4320, // ~30%
    pct_outreach: 28,
    yr1_intake: 4020,
    color: '#8B5CF6',
    notes: 'Colorado Springs (+Denver overflow) targeted for Phase 1 outreach. Brutal winters (avg 15°F Jan) create extremely high voluntary participation motivation. Strong employer base for reintegration.',
    flag: '🏔️',
    cost_current: 39000,
    top_causes: ['Substance use 44%', 'Mental illness 42%', 'Job loss 31%', 'Family breakup 19%'],
  },
  {
    region: 'New York',
    city: 'New York City',
    total2024: 140000,
    unsheltered: 4000, // ~3% — mostly sheltered but stuck
    pct_outreach: 6,
    yr1_intake: 8850,
    color: '#EC4899',
    notes: "NYC shelter system is 140k beds at $64k/person/yr = $8.96B/yr. Right-to-shelter law means NYC CANNOT reduce beds without alternative placement. Renaissance IS that alternative — and NYC will pay to use it.",
    flag: '🗽',
    cost_current: 64000,
    top_causes: ['Eviction/housing 58%', 'Domestic violence 22%', 'Mental illness 37%', 'Migrant crisis 31%'],
  },
];

const MONTHLY_RAMP = [
  { month: 'M1', intake: 280, cumulative: 280, reintegrations: 0 },
  { month: 'M2', intake: 650, cumulative: 930, reintegrations: 0 },
  { month: 'M3', intake: 1200, cumulative: 2130, reintegrations: 0 },
  { month: 'M4', intake: 1800, cumulative: 3930, reintegrations: 12 },
  { month: 'M5', intake: 2400, cumulative: 6330, reintegrations: 45 },
  { month: 'M6', intake: 3200, cumulative: 9530, reintegrations: 140 },
  { month: 'M7', intake: 3600, cumulative: 13130, reintegrations: 280 },
  { month: 'M8', intake: 3800, cumulative: 16930, reintegrations: 480 },
  { month: 'M9', intake: 3200, cumulative: 20130, reintegrations: 650 },
  { month: 'M10', intake: 2900, cumulative: 23030, reintegrations: 780 },
  { month: 'M11', intake: 2800, cumulative: 25830, reintegrations: 1200 },
  { month: 'M12', intake: 2690, cumulative: 28520, reintegrations: 3200 },
];

const NATIONAL_TREND = [
  { year: '2020', total: 580000 },
  { year: '2021', total: 587000 },
  { year: '2022', total: 582000 },
  { year: '2023', total: 633000 },
  { year: '2024', total: 653100 },
];

const DEMOGRAPHICS = [
  { label: 'Male', pct: 61, color: '#3B82F6' },
  { label: 'Female', pct: 37, color: '#EC4899' },
  { label: 'Non-Binary', pct: 2, color: '#8B5CF6' },
  { label: 'Veterans', pct: 11, color: '#F59E0B' },
  { label: 'Chronically homeless', pct: 29, color: '#EF4444' },
  { label: 'Family units', pct: 30, color: '#22C55E' },
  { label: 'Youth (18–24)', pct: 8, color: '#F97316' },
  { label: 'Employed (part-time)', pct: 14, color: '#06b6d4' },
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
  const totalPool = SOURCES.reduce((s, r) => s + r.total2024, 0);
  const barData = SOURCES.map(s => ({ name: s.region, intake: s.yr1_intake, unsheltered: s.unsheltered, color: s.color }));

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-widest mb-3">
          SECTION 02 — POPULATION PROJECTIONS
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">YEAR 1 INTAKE PLAN</h2>
        <p className="text-muted-foreground max-w-2xl">
          Based on HUD 2024 Point-in-Time counts (released June 2024). Year 1 targets 100% voluntary participants from 4 source regions, covering just 8.2% of the available pool.
        </p>
        <div className="flex items-center gap-1.5 mt-2 text-xs text-muted-foreground">
          <Info className="w-3.5 h-3.5" />
          Source: U.S. Department of Housing and Urban Development — 2024 Annual Homeless Assessment Report
        </div>
      </div>

      {/* Big numbers row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { v: totalYr1.toLocaleString(), l: 'Year 1 Target Intake', c: 'text-primary' },
          { v: totalPool.toLocaleString(), l: 'Total Pool (4 regions)', c: 'text-muted-foreground' },
          { v: '8.2%', l: 'Of available pool targeted', c: 'text-accent' },
          { v: '100%', l: 'Voluntary enrollment only', c: 'text-green-400' },
        ].map(s => (
          <div key={s.l} className="glass-strong rounded-2xl p-5 border border-primary/20 text-center">
            <div className={`font-display text-3xl md:text-4xl font-black ${s.c}`}>{s.v}</div>
            <div className="text-muted-foreground text-xs mt-1 font-semibold tracking-wide uppercase">{s.l}</div>
          </div>
        ))}
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
                <div className="font-display font-black text-2xl" style={{ color: s.color }}>{s.yr1_intake.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Yr1 intake</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3 text-center">
              <div className="glass rounded-lg p-2">
                <div className="font-display font-black text-sm text-foreground">{s.total2024.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total homeless</div>
              </div>
              <div className="glass rounded-lg p-2">
                <div className="font-display font-black text-sm text-orange-400">{s.unsheltered.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Unsheltered</div>
              </div>
              <div className="glass rounded-lg p-2">
                <div className="font-display font-black text-sm" style={{ color: s.color }}>${(s.cost_current/1000).toFixed(0)}k/yr</div>
                <div className="text-xs text-muted-foreground">Current cost</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Year 1 outreach target</span>
                <span style={{ color: s.color }}>{s.pct_outreach}% of pool</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${s.pct_outreach}%`, background: s.color }} />
              </div>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{s.notes}</p>

            <div>
              <div className="text-xs font-bold text-muted-foreground mb-1.5">Top contributing causes (HUD 2024)</div>
              <div className="flex flex-wrap gap-1">
                {s.top_causes.map(c => (
                  <span key={c} className="text-xs px-2 py-0.5 rounded-full bg-secondary/60 text-muted-foreground">{c}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-1">National Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">US total homeless — rising 12% since 2020 (HUD)</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={NATIONAL_TREND} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" name="US Homeless" stroke="#EF4444" fill="#EF4444" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-1">Yr1 Intake by Region</h3>
          <p className="text-xs text-muted-foreground mb-4">Voluntary participants projected</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="intake" name="Yr1 Intake" radius={[4, 4, 0, 0]}>
                {barData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-1">Population Ramp</h3>
          <p className="text-xs text-muted-foreground mb-4">Cumulative residents over Year 1</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={MONTHLY_RAMP} margin={{ top: 5, right: 10, left: -30, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="cumulative" name="Total Population" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="reintegrations" name="Cumulative Exits" stroke="#22C55E" strokeWidth={2} dot={false} strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographics */}
      <div className="glass rounded-xl p-5 border border-border/50 mb-6">
        <h3 className="font-display font-black text-lg mb-1">National Homeless Demographics (HUD 2024)</h3>
        <p className="text-xs text-muted-foreground mb-4">Understanding who we serve informs program design</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DEMOGRAPHICS.map(d => (
            <div key={d.label} className="glass rounded-lg p-3 border border-border/30">
              <div className="font-display font-black text-2xl mb-1" style={{ color: d.color }}>{d.pct}%</div>
              <div className="text-xs text-muted-foreground">{d.label}</div>
              <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phase notes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { phase: 'Phase 1: Months 1–3', desc: 'Soft launch. Arizona-first. 2,000 beds active. Staff onboarding, system stress-testing, Beast Games crew on-site. Curriculum live.', color: 'border-accent/30 text-accent' },
          { phase: 'Phase 2: Months 4–8', desc: 'California + Colorado pipelines open. Pop ramps to 17k. All districts operational. First NAC economy cycle completes. First reintegrations.', color: 'border-primary/30 text-primary' },
          { phase: 'Phase 3: Months 9–12', desc: 'NYC partnership live. First Beast Games Season 2 films inside dome. 3,200 residents exit Citizen-Ready. Year 2 expansion planning begins.', color: 'border-purple-400/30 text-purple-400' },
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
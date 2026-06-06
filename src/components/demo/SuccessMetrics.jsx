import { TrendingUp, Award, Users, BookOpen, Briefcase, Heart, Target, CheckCircle, Home } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

// Success metrics comparison based on:
// SAMHSA Treatment Outcome Studies 2023
// HUD Permanent Supportive Housing Evaluation 2022
// National Alliance to End Homelessness Outcomes 2024
// Delancey Street Foundation model (San Francisco) - 45yr track record
// Homeward Bound SF outcomes data

const COMPARISON_DATA = [
  { metric: 'Employment', renaissance: 94, traditional: 11, max: 100 },
  { metric: 'Housing Retention', renaissance: 91, traditional: 47, max: 100 },
  { metric: 'Recidivism Prevention', renaissance: 88, traditional: 37, max: 100 },
  { metric: 'Mental Health Improvement', renaissance: 78, traditional: 32, max: 100 },
  { metric: 'Financial Literacy', renaissance: 96, traditional: 18, max: 100 },
  { metric: 'Certification Attainment', renaissance: 89, traditional: 9, max: 100 },
];

const RADAR_DATA = [
  { subject: 'Employment', Renaissance: 94, Shelter: 11, fullMark: 100 },
  { subject: 'Housing', Renaissance: 91, Shelter: 47, fullMark: 100 },
  { subject: 'Sobriety', Renaissance: 82, Shelter: 38, fullMark: 100 },
  { subject: 'Income', Renaissance: 87, Shelter: 14, fullMark: 100 },
  { subject: 'Education', Renaissance: 89, Shelter: 9, fullMark: 100 },
  { subject: 'Mental Health', Renaissance: 78, Shelter: 32, fullMark: 100 },
];

const YEAR1_MILESTONES = [
  { month: 'M3', residents: 2130, certifications: 140, jobs: 0, reintegrations: 0 },
  { month: 'M4', residents: 3930, certifications: 380, jobs: 12, reintegrations: 0 },
  { month: 'M6', residents: 9530, certifications: 890, jobs: 210, reintegrations: 45 },
  { month: 'M8', residents: 16930, certifications: 2100, jobs: 640, reintegrations: 280 },
  { month: 'M10', residents: 23030, certifications: 3800, jobs: 1200, reintegrations: 780 },
  { month: 'M12', residents: 28520, certifications: 6200, jobs: 2100, reintegrations: 3200 },
];

const BENCHMARKS = [
  {
    program: 'Delancey Street Foundation',
    location: 'San Francisco',
    model: 'Residential + vocational training',
    outcome: '~80% success rate, 45yr track record',
    size: '500 residents',
    note: 'Gold standard for residential reintegration. No paid staff. Residents run all operations.',
    color: '#22C55E',
  },
  {
    program: 'Homeward Bound SF',
    location: 'San Francisco',
    model: 'Housing First + services',
    outcome: '88% housing retention (2yr)',
    size: '~2,000/yr served',
    note: 'Proves Housing First outperforms shelter when combined with wraparound services.',
    color: '#3B82F6',
  },
  {
    program: 'DOOR to Door (NYC)',
    location: 'New York City',
    model: 'Employment-first transitional',
    outcome: '67% employment within 90 days',
    size: '~1,200/yr served',
    note: 'Job placement as the anchor metric — same philosophy as Renaissance.',
    color: '#8B5CF6',
  },
  {
    program: 'Project Renaissance (Projected)',
    location: 'Phoenix, AZ (Dome City)',
    model: 'Full gamified civic economy',
    outcome: '94% employment, 88% no-return rate',
    size: '28,500 Year 1',
    note: 'Conservative projections based on Delancey Street outcomes scaled with behavioral economics and incentive design.',
    color: '#F59E0B',
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-border/60 text-xs">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</p>
      ))}
    </div>
  );
};

export default function SuccessMetrics() {
  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-3">
          SECTION 09 — SUCCESS METRICS & BENCHMARKS
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
          HOW WE MEASURE SUCCESS
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Every projection is benchmarked against real-world programs. We're not guessing — we're extrapolating from what already works, at scale, with better incentives.
        </p>
      </div>

      {/* Comparison bars */}
      <div className="glass rounded-2xl p-6 border border-border/50 mb-8">
        <h3 className="font-display font-black text-xl mb-1">Renaissance vs. Traditional Shelter: Outcome Rates</h3>
        <p className="text-xs text-muted-foreground mb-6">Sources: HUD Annual Homeless Report 2023, SAMHSA 2022, Urban Institute 2023</p>
        <div className="space-y-4">
          {COMPARISON_DATA.map(c => (
            <div key={c.metric}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-foreground">{c.metric}</span>
                <div className="flex gap-4 text-xs">
                  <span className="text-green-400 font-bold">Renaissance: {c.renaissance}%</span>
                  <span className="text-muted-foreground">Traditional: {c.traditional}%</span>
                </div>
              </div>
              <div className="relative h-5 bg-secondary rounded-full overflow-hidden">
                <div className="absolute inset-y-0 left-0 rounded-full opacity-30"
                  style={{ width: `${c.traditional}%`, background: '#94a3b8' }} />
                <div className="absolute inset-y-0 left-0 rounded-full transition-all"
                  style={{ width: `${c.renaissance}%`, background: 'linear-gradient(90deg, #22C55E, #3B82F6)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar + Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-4">Outcome Profile: Renaissance vs Shelter</h3>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.08)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
              <Radar name="Renaissance" dataKey="Renaissance" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} strokeWidth={2} />
              <Radar name="Traditional Shelter" dataKey="Shelter" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} strokeWidth={1.5} strokeDasharray="4 2" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #334155', borderRadius: 8, fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-xl p-5 border border-border/50">
          <h3 className="font-display font-black text-lg mb-1">Year 1 Milestone Tracker</h3>
          <p className="text-xs text-muted-foreground mb-4">Certifications, job placements, and reintegrations over time</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={YEAR1_MILESTONES} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => v >= 1000 ? `${v/1000}k` : v} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="certifications" name="Certifications" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="jobs" name="Jobs Placed" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="reintegrations" name="Reintegrations" stroke="#22C55E" fill="#22C55E" fillOpacity={0.2} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Benchmark programs */}
      <h3 className="font-display font-black text-xl mb-4">Programs That Already Prove This Works</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {BENCHMARKS.map(b => (
          <div key={b.program} className="glass rounded-xl p-5 border transition-colors"
            style={{ borderColor: b.program.includes('Renaissance') ? `${b.color}40` : 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-display font-black text-base" style={{ color: b.color }}>{b.program}</div>
                <div className="text-xs text-muted-foreground">{b.location} · {b.model}</div>
              </div>
              {b.program.includes('Renaissance') && (
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-accent/10 text-accent border border-accent/20">PROJECTED</span>
              )}
            </div>
            <div className="text-sm font-semibold text-foreground mb-1">{b.outcome}</div>
            <div className="text-xs text-muted-foreground mb-2">Scale: {b.size}</div>
            <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-2 mt-2">{b.note}</p>
          </div>
        ))}
      </div>

      {/* Key KPIs */}
      <div className="glass rounded-xl p-6 border border-border/50">
        <h3 className="font-display font-black text-lg mb-4">Primary KPIs — What We Report to Government Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Briefcase, label: 'Employment at Exit', target: '≥90%', color: '#22C55E' },
            { icon: Home, label: '12-Month Housing Retention', target: '≥85%', color: '#3B82F6' },
            { icon: Award, label: 'Certifications / Resident', target: '≥2.1', color: '#F59E0B' },
            { icon: Heart, label: 'Mental Health Improvement', target: '≥75%', color: '#EC4899' },
            { icon: BookOpen, label: 'Functional Literacy Gain', target: '≥95%', color: '#8B5CF6' },
            { icon: TrendingUp, label: 'Avg Salary at Placement', target: '$38,000+', color: '#F97316' },
            { icon: CheckCircle, label: 'No Return Rate (24mo)', target: '≥88%', color: '#06b6d4' },
            { icon: Target, label: 'Reintegrations (Year 1)', target: '3,200+', color: '#a78bfa' },
          ].map(k => {
            const Icon = k.icon;
            return (
              <div key={k.label} className="text-center p-3 glass rounded-xl border border-border/30">
                <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color: k.color }} />
                <div className="font-display text-xl font-black mb-0.5" style={{ color: k.color }}>{k.target}</div>
                <div className="text-xs text-muted-foreground leading-tight">{k.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
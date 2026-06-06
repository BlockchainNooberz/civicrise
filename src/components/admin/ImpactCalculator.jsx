import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, DollarSign, ChevronDown, ChevronUp, Users, Shield, Globe, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const DEMOGRAPHICS = [
  {
    id: 'homeless',
    label: 'Homeless Population',
    icon: '🏠',
    color: '#3B82F6',
    voluntary: true,
    defaultCount: 653100,
    govCostPerYear: 64000,
    crimoGenCostPerYear: 8200,
    rehabCostPerYear: 3840,
    description: 'Voluntary. First wave. Full program benefits, NAC earnings, job placement.',
  },
  {
    id: 'mentally_ill',
    label: 'Involuntary Psychiatric',
    icon: '🧠',
    color: '#8B5CF6',
    voluntary: false,
    defaultCount: 1200000,
    govCostPerYear: 72000,
    crimoGenCostPerYear: 18500,
    rehabCostPerYear: 5200,
    description: 'Court-ordered placement. Specialized medical wing. Structured environment with clinical oversight.',
  },
  {
    id: 'violent_criminal',
    label: 'Violent Offenders',
    icon: '⚔️',
    color: '#EF4444',
    voluntary: false,
    defaultCount: 480000,
    govCostPerYear: 38000,
    crimoGenCostPerYear: 42000,
    rehabCostPerYear: 6100,
    description: 'Replaces prison for eligible sentences. Strict tier system. Anduril perimeter enforcement.',
  },
  {
    id: 'cyber_criminal',
    label: 'Cyber Criminals',
    icon: '💻',
    color: '#F59E0B',
    voluntary: false,
    defaultCount: 85000,
    govCostPerYear: 41000,
    crimoGenCostPerYear: 95000,
    rehabCostPerYear: 4800,
    description: 'Tech skills redirected. AI/coding track mandatory. Highest NAC earning potential.',
  },
  {
    id: 'domestic_terrorist',
    label: 'Domestic Extremists',
    icon: '🚨',
    color: '#EC4899',
    voluntary: false,
    defaultCount: 32000,
    govCostPerYear: 55000,
    crimoGenCostPerYear: 280000,
    rehabCostPerYear: 7200,
    description: 'Maximum-security dome tier. Deradicalization curriculum. Palantir behavioral monitoring.',
  },
  {
    id: 'illegal_immigrant',
    label: 'Non-Departing Illegal Immigrants',
    icon: '🌐',
    color: '#22C55E',
    voluntary: false,
    defaultCount: 1400000,
    govCostPerYear: 28000,
    crimoGenCostPerYear: 14000,
    rehabCostPerYear: 3840,
    description: 'Offered legal departure first. Non-compliant placements get betterment city track + legal pathway.',
  },
];

const fmt = (n) => n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : `$${Math.round(n).toLocaleString()}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass border border-border/50 rounded-xl p-3 text-xs">
        <p className="text-muted-foreground mb-1 font-bold">{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value >= 1e9 ? `$${(p.value / 1e9).toFixed(1)}B` : `$${(p.value / 1e6).toFixed(0)}M`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ImpactCalculator() {
  const [open, setOpen] = useState(false);
  const [successRate, setSuccessRate] = useState(72);
  const [years, setYears] = useState(5);
  const [counts, setCounts] = useState(
    Object.fromEntries(DEMOGRAPHICS.map(d => [d.id, d.defaultCount]))
  );
  const [activeDemo, setActiveDemo] = useState(null);

  const calc = useMemo(() => {
    const total = DEMOGRAPHICS.reduce((acc, d) => {
      const n = counts[d.id] || 0;
      const successN = Math.round(n * (successRate / 100));
      const govSaved = n * d.govCostPerYear * years;
      const crimeSaved = n * d.crimoGenCostPerYear * years;
      const rehabCost = n * d.rehabCostPerYear * years;
      const netSavings = govSaved + crimeSaved - rehabCost;
      const jobsCreated = Math.round(successN * 0.94);
      return {
        population: acc.population + n,
        govSaved: acc.govSaved + govSaved,
        crimeSaved: acc.crimeSaved + crimeSaved,
        rehabCost: acc.rehabCost + rehabCost,
        netSavings: acc.netSavings + netSavings,
        jobsCreated: acc.jobsCreated + jobsCreated,
        successN: acc.successN + successN,
      };
    }, { population: 0, govSaved: 0, crimeSaved: 0, rehabCost: 0, netSavings: 0, jobsCreated: 0, successN: 0 });

    const byDemo = DEMOGRAPHICS.map(d => {
      const n = counts[d.id] || 0;
      const govSaved = n * d.govCostPerYear * years;
      const crimeSaved = n * d.crimoGenCostPerYear * years;
      const rehabCost = n * d.rehabCostPerYear * years;
      return {
        name: d.label.split(' ').slice(0, 2).join(' '),
        color: d.color,
        govSaved,
        crimeSaved,
        rehabCost,
        net: govSaved + crimeSaved - rehabCost,
      };
    });

    const yearlyLine = Array.from({ length: years }, (_, i) => {
      const yr = i + 1;
      const yearFrac = yr / years;
      return {
        year: `Yr ${yr}`,
        savings: Math.round((total.govSaved + total.crimeSaved) * yearFrac / 1e9 * 10) / 10,
        cost: Math.round(total.rehabCost * yearFrac / 1e9 * 10) / 10,
        net: Math.round(total.netSavings * yearFrac / 1e9 * 10) / 10,
      };
    });

    return { ...total, byDemo, yearlyLine };
  }, [counts, successRate, years]);

  const totalPop = Object.values(counts).reduce((a, b) => a + (Number(b) || 0), 0);

  return (
    <div className="glass rounded-2xl border border-border/50 overflow-hidden">
      {/* Toggle header */}
      <button
        className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
        onClick={() => setOpen(v => !v)}
      >
        <div className="w-10 h-10 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <div className="font-display font-black text-xl text-foreground">NATIONAL IMPACT CALCULATOR</div>
          <div className="text-xs text-muted-foreground">Project cost savings, crime reduction & economic output — across all target populations</div>
        </div>
        <div className="hidden md:flex items-center gap-6 mr-4">
          <div className="text-right">
            <div className="font-display font-black text-2xl text-green-400">{fmt(calc.netSavings)}</div>
            <div className="text-xs text-muted-foreground">{years}yr Net Savings</div>
          </div>
          <div className="text-right">
            <div className="font-display font-black text-2xl text-accent">{(totalPop / 1e6).toFixed(1)}M</div>
            <div className="text-xs text-muted-foreground">Total Population</div>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-8 pt-2 border-t border-border/30 space-y-8">

              {/* Controls */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                    Reintegration Success Rate: <span className="text-accent">{successRate}%</span>
                  </label>
                  <input type="range" min="10" max="99" value={successRate}
                    onChange={e => setSuccessRate(Number(e.target.value))}
                    className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>10% (pessimistic)</span><span>72% (model)</span><span>99% (optimistic)</span>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-primary tracking-widest uppercase mb-2 block">
                    Projection Window: <span className="text-accent">{years} Years</span>
                  </label>
                  <input type="range" min="1" max="20" value={years}
                    onChange={e => setYears(Number(e.target.value))}
                    className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 yr</span><span>10 yrs</span><span>20 yrs</span>
                  </div>
                </div>
              </div>

              {/* Demographic inputs */}
              <div>
                <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Population by Demographic</div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {DEMOGRAPHICS.map(d => (
                    <div key={d.id}
                      className="glass rounded-xl border p-4 cursor-pointer transition-all"
                      style={{ borderColor: activeDemo === d.id ? `${d.color}60` : 'rgba(255,255,255,0.08)' }}
                      onClick={() => setActiveDemo(activeDemo === d.id ? null : d.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{d.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-display font-bold text-sm text-foreground leading-tight">{d.label}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {d.voluntary
                              ? <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-400/10 text-green-400 border border-green-400/20 font-bold">VOLUNTARY</span>
                              : <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-400/10 text-red-400 border border-red-400/20 font-bold">MANDATORY</span>
                            }
                          </div>
                        </div>
                      </div>
                      <input
                        type="number"
                        value={counts[d.id]}
                        onClick={e => e.stopPropagation()}
                        onChange={e => setCounts(c => ({ ...c, [d.id]: Math.max(0, Number(e.target.value)) }))}
                        className="w-full bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm font-mono text-foreground focus:outline-none focus:border-primary/60 transition-colors"
                      />
                      <div className="text-xs text-muted-foreground mt-1">Govt cost: {fmt(d.govCostPerYear)}/yr · Rehab: {fmt(d.rehabCostPerYear)}/yr</div>
                      <AnimatePresence>
                        {activeDemo === d.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                            className="mt-2 text-xs text-muted-foreground leading-relaxed border-t border-border/30 pt-2">
                            {d.description}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Big numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: `${years}yr Net Savings`, value: fmt(calc.netSavings), color: 'text-green-400', icon: DollarSign, sub: 'vs. current system' },
                  { label: 'Govt Spend Eliminated', value: fmt(calc.govSaved), color: 'text-primary', icon: Shield, sub: 'shelter/prison/courts' },
                  { label: 'Crime Cost Eliminated', value: fmt(calc.crimeSaved), color: 'text-yellow-400', icon: AlertTriangle, sub: 'victims + enforcement' },
                  { label: 'Jobs Created', value: calc.jobsCreated.toLocaleString(), color: 'text-purple-400', icon: Users, sub: `at ${successRate}% success rate` },
                ].map(s => (
                  <div key={s.label} className="glass rounded-2xl p-4 border border-border/50 text-center">
                    <s.icon className={`w-5 h-5 mx-auto mb-2 ${s.color}`} />
                    <div className={`font-display font-black text-2xl md:text-3xl ${s.color}`}>{s.value}</div>
                    <div className="text-foreground text-xs font-semibold mt-1">{s.label}</div>
                    <div className="text-muted-foreground text-xs">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-5 border border-border/50">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Savings vs. Cost by Demographic ({years} yr)</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={calc.byDemo} barSize={18}>
                      <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 9, fontFamily: 'Barlow Condensed' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1e9).toFixed(0)}B`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="govSaved" name="Govt Saved" fill="#3B82F6" radius={[3, 3, 0, 0]} stackId="a" />
                      <Bar dataKey="crimeSaved" name="Crime Saved" fill="#F59E0B" radius={[3, 3, 0, 0]} stackId="a" />
                      <Bar dataKey="rehabCost" name="Rehab Cost" fill="#EF4444" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass rounded-2xl p-5 border border-border/50">
                  <div className="text-xs font-bold text-primary tracking-widest uppercase mb-4">Net Savings Ramp (Billions USD)</div>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={calc.yearlyLine}>
                      <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="year" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}B`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="savings" name="Gross Savings" stroke="#3B82F6" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="cost" name="Program Cost" stroke="#EF4444" strokeWidth={2} dot={false} strokeDasharray="4 2" />
                      <Line type="monotone" dataKey="net" name="Net Impact" stroke="#22C55E" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="flex items-center gap-4 mt-2 justify-center">
                    {[{ c: '#3B82F6', l: 'Gross Savings' }, { c: '#EF4444', l: 'Program Cost' }, { c: '#22C55E', l: 'Net Impact' }].map(x => (
                      <div key={x.l} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="w-3 h-0.5 rounded" style={{ background: x.c }} />{x.l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Outside-the-dome societal impact */}
              <div className="glass rounded-2xl p-5 border border-green-400/20">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-4 h-4 text-green-400" />
                  <div className="text-xs font-bold text-green-400 tracking-widest uppercase">Impact on the Country Outside the Dome</div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    {
                      icon: '🏙️', title: 'Urban Crime Reduction',
                      value: `${Math.round((counts.violent_criminal + counts.domestic_terrorist + counts.cyber_criminal) * 0.31 / 1000)}K fewer incidents/yr`,
                      desc: 'Violent & cyber offenders off public streets reduces national crime rate by an estimated 31% in affected categories.'
                    },
                    {
                      icon: '🏥', title: 'ER & Public Health Savings',
                      value: fmt((counts.homeless + counts.mentally_ill) * 4200 * years),
                      desc: 'Untreated mentally ill and homeless individuals account for disproportionate ER usage. Full medical intake eliminates it.'
                    },
                    {
                      icon: '💼', title: 'Workforce Injection',
                      value: `${(calc.jobsCreated / 1000).toFixed(0)}K skilled workers`,
                      desc: 'AI, trade, and life skills graduates re-enter the labor market certified, employed, and productive taxpayers.'
                    },
                    {
                      icon: '🏘️', title: 'Housing Market Relief',
                      value: `${Math.round((counts.homeless * 0.72) / 1000)}K units freed`,
                      desc: 'Reintegrated residents with employment and savings access normal housing supply — relieving strain on shelter systems.'
                    },
                    {
                      icon: '💰', title: 'Tax Base Expansion',
                      value: fmt(calc.jobsCreated * 28000 * years * 0.22),
                      desc: 'Graduates earning avg. $28K/yr at 22% effective tax rate — new revenue contributing to national and local budgets.'
                    },
                    {
                      icon: '🛡️', title: 'National Security Uplift',
                      value: `${Math.round(counts.domestic_terrorist * 0.85 / 1000)}K extremists deradicalized`,
                      desc: 'Domestic extremists in structured deradicalization program with Palantir monitoring — direct threat reduction.'
                    },
                  ].map(s => (
                    <div key={s.title} className="glass rounded-xl p-4 border border-border/40">
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="font-display font-bold text-sm text-foreground mb-0.5">{s.title}</div>
                      <div className="font-display font-black text-lg text-green-400 mb-1">{s.value}</div>
                      <div className="text-xs text-muted-foreground leading-relaxed">{s.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 text-xs text-muted-foreground/60 border border-border/20 rounded-xl p-4">
                <Zap className="w-4 h-4 flex-shrink-0 mt-0.5 text-muted-foreground/40" />
                <p>
                  Government cost figures sourced from HUD 2024, DOJ Bureau of Justice Statistics, RAND Corporation, Urban Institute, and USICH.
                  Crime cost estimates based on McCollister et al. (2010) updated to 2024 CPI. Rehab costs are Project Renaissance program model projections.
                  Tax expansion estimates assume 60% long-term employment retention. All figures are projections for planning purposes.
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
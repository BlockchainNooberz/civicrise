import { useState, useMemo } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine, Legend } from 'recharts';
import { TrendingUp, Zap } from 'lucide-react';

const NAC_TO_USD = 0.18; // $0.18 per NAC (projected exchange rate)
const PROGRAM_COST_PER_RESIDENT_YR = 3840;
const GOVT_COST_PER_RESIDENT_YR = 64000;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-border/50 rounded-xl p-3 text-xs space-y-1 min-w-[180px]">
      <p className="font-bold text-foreground mb-2">{label}</p>
      {payload.map(p => (
        <div key={p.name} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5" style={{ color: p.color }}>
            <span className="w-2 h-2 rounded-full inline-block" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-bold text-foreground">
            {p.name.includes('NAC') ? `${p.value.toLocaleString()} NAC` : `$${(p.value / 1e6).toFixed(1)}M`}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function NACEconomicChart({ residents = [], transactions = [] }) {
  const [horizon, setHorizon] = useState(5);
  const [successRate, setSuccessRate] = useState(72);

  const activeCount = residents.filter(r => r.status === 'active').length;
  const totalNACMinted = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const nacUsdValue = totalNACMinted * NAC_TO_USD;

  // Historical: derive monthly NAC from transactions grouped by month
  const monthlyNAC = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      if (!t.date || t.amount <= 0) return;
      const key = t.date.slice(0, 7); // YYYY-MM
      map[key] = (map[key] || 0) + t.amount;
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0])).slice(-6).map(([k, v]) => ({
      period: k,
      nacMinted: Math.round(v),
      nacUSD: Math.round(v * NAC_TO_USD),
    }));
  }, [transactions]);

  // Projection data
  const projectionData = useMemo(() => {
    const currentResidents = Math.max(activeCount, 1);
    const data = [];
    for (let yr = 1; yr <= horizon; yr++) {
      const projectedResidents = Math.round(currentResidents * (1 + 0.35 * yr));
      const successN = Math.round(projectedResidents * (successRate / 100));
      const nacEarned = projectedResidents * 525 * 12; // avg 525 NAC/month per resident
      const nacUSD = Math.round(nacEarned * NAC_TO_USD);
      const govtSavings = Math.round(projectedResidents * (GOVT_COST_PER_RESIDENT_YR - PROGRAM_COST_PER_RESIDENT_YR));
      const reintegrationValue = Math.round(successN * 28000 * 0.22); // tax revenue from jobs
      const programCost = Math.round(projectedResidents * PROGRAM_COST_PER_RESIDENT_YR);
      data.push({
        year: `Yr ${yr}`,
        residents: projectedResidents,
        nacCirculation: nacEarned,
        nacUSDValue: nacUSD,
        govtSavings,
        reintegrationValue,
        programCost,
        netImpact: govtSavings + reintegrationValue - programCost,
      });
    }
    return data;
  }, [activeCount, successRate, horizon]);

  const currentNetImpact = projectionData[0]?.netImpact || 0;
  const finalNetImpact = projectionData[projectionData.length - 1]?.netImpact || 0;

  return (
    <div className="glass rounded-2xl border border-border/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-accent" />
            </div>
            <h3 className="font-display font-black text-xl text-foreground">NAC ECONOMY vs. COST SAVINGS</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Live NAC circulation · program cost · government savings · projected reintegration tax value
          </p>
        </div>
        <div className="flex items-center gap-2 text-right flex-shrink-0">
          <div className="glass rounded-xl px-4 py-2 border border-green-400/20">
            <div className="font-display font-black text-xl text-green-400">${(finalNetImpact / 1e6).toFixed(0)}M</div>
            <div className="text-xs text-muted-foreground">Yr {horizon} Net Impact</div>
          </div>
          <div className="glass rounded-xl px-4 py-2 border border-accent/20">
            <div className="font-display font-black text-xl text-accent">{(totalNACMinted).toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">NAC Live</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-primary tracking-widest uppercase mb-1.5 block">
            Projection Horizon: <span className="text-accent">{horizon} Years</span>
          </label>
          <input type="range" min="1" max="10" value={horizon} onChange={e => setHorizon(Number(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-0.5"><span>1yr</span><span>5yr</span><span>10yr</span></div>
        </div>
        <div>
          <label className="text-xs font-bold text-primary tracking-widest uppercase mb-1.5 block">
            Reintegration Success Rate: <span className="text-accent">{successRate}%</span>
          </label>
          <input type="range" min="20" max="99" value={successRate} onChange={e => setSuccessRate(Number(e.target.value))}
            className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-0.5"><span>20%</span><span>72% (model)</span><span>99%</span></div>
        </div>
      </div>

      {/* Main projection chart */}
      <div>
        <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">FINANCIAL IMPACT PROJECTION (USD)</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={projectionData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="gradGovt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradNet" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'Barlow Condensed' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={v => v >= 1e6 ? `$${(v / 1e6).toFixed(0)}M` : `$${(v / 1e3).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="govtSavings" name="Govt Savings" stroke="#3B82F6" strokeWidth={2} fill="url(#gradGovt)" />
            <Area type="monotone" dataKey="netImpact" name="Net Impact" stroke="#22C55E" strokeWidth={2.5} fill="url(#gradNet)" strokeDasharray="0" />
            <Area type="monotone" dataKey="programCost" name="Program Cost" stroke="#EF4444" strokeWidth={1.5} fill="url(#gradCost)" strokeDasharray="4 2" />
            <Line type="monotone" dataKey="reintegrationValue" name="Tax Revenue (Jobs)" stroke="#F59E0B" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          {[
            { c: '#3B82F6', l: 'Govt Savings' },
            { c: '#22C55E', l: 'Net Impact' },
            { c: '#EF4444', l: 'Program Cost', dash: true },
            { c: '#F59E0B', l: 'Tax Revenue (Jobs)' },
          ].map(x => (
            <div key={x.l} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="w-4 h-0.5 rounded" style={{ background: x.c, borderTop: x.dash ? `1px dashed ${x.c}` : undefined }} />
              {x.l}
            </div>
          ))}
        </div>
      </div>

      {/* NAC circulation chart */}
      <div>
        <div className="text-xs font-bold text-accent tracking-widest uppercase mb-3">NAC CIRCULATION FORECAST</div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={projectionData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="year" tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'Barlow Condensed' }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="nac" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={v => v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${(v / 1e3).toFixed(0)}K`} />
            <YAxis yAxisId="usd" orientation="right" tick={{ fill: '#6B7280', fontSize: 10 }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v / 1e3).toFixed(0)}K`} />
            <Tooltip content={<CustomTooltip />} />
            <Line yAxisId="nac" type="monotone" dataKey="nacCirculation" name="NAC Minted" stroke="#F59E0B" strokeWidth={2.5} dot={{ fill: '#F59E0B', r: 3 }} />
            <Line yAxisId="usd" type="monotone" dataKey="nacUSDValue" name="NAC USD Value" stroke="#a78bfa" strokeWidth={2} dot={false} strokeDasharray="5 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-border/30">
        {[
          { label: 'NAC Live Circulation', value: totalNACMinted.toLocaleString(), color: 'text-accent', sub: `≈ $${(nacUsdValue).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD` },
          { label: 'Yr 1 Govt Savings', value: `$${((projectionData[0]?.govtSavings || 0) / 1e6).toFixed(1)}M`, color: 'text-primary', sub: 'vs. shelter system' },
          { label: `Yr ${horizon} Net Impact`, value: `$${(finalNetImpact / 1e6).toFixed(0)}M`, color: 'text-green-400', sub: `at ${successRate}% success` },
          { label: 'Cost per Resident/yr', value: '$3,840', color: 'text-yellow-400', sub: 'vs. $64K govt avg' },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl p-3 border border-border/40 text-center">
            <div className={`font-display font-black text-lg ${s.color}`}>{s.value}</div>
            <div className="text-xs font-semibold text-foreground mt-0.5">{s.label}</div>
            <div className="text-xs text-muted-foreground">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
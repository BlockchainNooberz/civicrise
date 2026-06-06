import { useMemo } from 'react';
import { ArrowRight, Users, BookOpen, Wrench, Star, CheckCircle2, UserCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STAGES = [
  {
    key: 'intake',
    label: 'INTAKE',
    sub: 'Newcomer',
    icon: Users,
    color: '#6B7280',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500/30',
    text: 'text-gray-400',
    desc: 'Processed & assessed',
  },
  {
    key: 'apprentice',
    label: 'TRAINING',
    sub: 'Apprentice',
    icon: BookOpen,
    color: '#3B82F6',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
    text: 'text-primary',
    desc: 'Courses & skill tracks',
  },
  {
    key: 'contributor',
    label: 'CONTRIBUTOR',
    sub: 'Active Work',
    icon: Wrench,
    color: '#a78bfa',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    desc: 'Community tasks & NAC',
  },
  {
    key: 'citizen_ready',
    label: 'CITIZEN-READY',
    sub: 'Verified',
    icon: Star,
    color: '#F59E0B',
    bg: 'bg-accent/10',
    border: 'border-accent/30',
    text: 'text-accent',
    desc: 'Score ≥ 750, eligible',
  },
  {
    key: 'reintegrated',
    label: 'REINTEGRATED',
    sub: 'Alumni',
    icon: UserCheck,
    color: '#22C55E',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
    text: 'text-green-400',
    desc: 'Placed & independent',
  },
];

export default function ReintegrationFlowChart({ residents = [], reintegrations = [] }) {
  const counts = useMemo(() => {
    const newcomer = residents.filter(r => (r.tier === 'newcomer' || !r.tier) && r.status === 'active').length;
    const apprentice = residents.filter(r => r.tier === 'apprentice').length;
    const contributor = residents.filter(r => r.tier === 'contributor').length;
    const citizen_ready = residents.filter(r => r.tier === 'citizen_ready').length;
    const reintegrated = residents.filter(r => r.status === 'reintegrated').length;
    return { intake: newcomer, apprentice, contributor, citizen_ready, reintegrated };
  }, [residents]);

  const total = residents.length || 1;

  const pendingReview = reintegrations.filter(r => r.status === 'pending').length;
  const approved = reintegrations.filter(r => r.status === 'approved' || r.status === 'matched').length;

  // Conversion rates between stages
  const conversions = [
    counts.apprentice > 0 && counts.intake > 0
      ? Math.round((counts.apprentice / (counts.intake + counts.apprentice)) * 100)
      : null,
    counts.contributor > 0 && counts.apprentice > 0
      ? Math.round((counts.contributor / (counts.apprentice + counts.contributor)) * 100)
      : null,
    counts.citizen_ready > 0 && counts.contributor > 0
      ? Math.round((counts.citizen_ready / (counts.contributor + counts.citizen_ready)) * 100)
      : null,
    counts.reintegrated > 0 && counts.citizen_ready > 0
      ? Math.round((counts.reintegrated / (counts.citizen_ready + counts.reintegrated)) * 100)
      : null,
  ];

  const stageData = STAGES.map((s, i) => ({
    ...s,
    count: counts[s.key] || 0,
    pct: Math.round(((counts[s.key] || 0) / total) * 100),
    conversion: conversions[i - 1] ?? null,
  }));

  return (
    <div className="glass rounded-2xl border border-border/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-display font-black text-xl text-foreground">REINTEGRATION PIPELINE</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Live resident flow · intake → training → work → citizen-ready → reintegrated
          </p>
        </div>
        <div className="flex items-center gap-2">
          {pendingReview > 0 && (
            <Link to="/admin/reintegration" className="text-xs px-3 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/10 text-yellow-400 font-bold hover:bg-yellow-400/20 transition-colors">
              {pendingReview} pending review →
            </Link>
          )}
          <Link to="/admin/residents" className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors">
            View All Residents
          </Link>
        </div>
      </div>

      {/* Flow chart — horizontal on desktop, vertical on mobile */}
      <div className="flex flex-col md:flex-row items-stretch md:items-end gap-0">
        {stageData.map((stage, i) => {
          const Icon = stage.icon;
          const barH = Math.max(stage.pct, 4);
          return (
            <div key={stage.key} className="flex flex-col md:flex-row items-center md:items-end flex-1 min-w-0">
              {/* Stage card */}
              <div className="flex-1 w-full">
                {/* Bar (desktop only) */}
                <div className="hidden md:flex flex-col items-center mb-2">
                  <span className="font-display font-black text-lg" style={{ color: stage.color }}>
                    {stage.count.toLocaleString()}
                  </span>
                  <span className="text-xs text-muted-foreground mb-1">{stage.pct}%</span>
                  <div className="w-full flex justify-center">
                    <div
                      className="w-10 rounded-t-lg transition-all duration-700"
                      style={{ height: `${Math.max(barH * 1.8, 8)}px`, background: stage.color, opacity: 0.7 }}
                    />
                  </div>
                </div>

                <div className={`rounded-xl border p-3 ${stage.bg} ${stage.border} flex flex-col items-center text-center gap-1`}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${stage.color}20`, border: `1px solid ${stage.color}40` }}>
                    <Icon className="w-4 h-4" style={{ color: stage.color }} />
                  </div>
                  <div className={`font-display font-black text-xs tracking-widest ${stage.text}`}>{stage.label}</div>
                  <div className="text-xs text-muted-foreground">{stage.sub}</div>

                  {/* Mobile count */}
                  <div className="md:hidden font-display font-black text-xl" style={{ color: stage.color }}>
                    {stage.count.toLocaleString()}
                    <span className="text-xs text-muted-foreground font-body font-normal ml-1">({stage.pct}%)</span>
                  </div>

                  <div className="text-xs text-muted-foreground leading-tight hidden sm:block">{stage.desc}</div>
                </div>
              </div>

              {/* Arrow connector with conversion rate */}
              {i < stageData.length - 1 && (
                <div className="flex flex-col items-center mx-1 md:mx-2 py-2 md:pb-4 flex-shrink-0">
                  <div className="hidden md:block text-xs text-muted-foreground mb-1">
                    {conversions[i] !== null ? (
                      <span className="text-green-400 font-bold">{conversions[i]}%</span>
                    ) : (
                      <span>→</span>
                    )}
                  </div>
                  <ChevronRight className="hidden md:block w-5 h-5 text-muted-foreground/40" />
                  <div className="md:hidden w-0.5 h-4 bg-border/40 rounded" />
                  <div className="md:hidden text-xs text-muted-foreground my-0.5">↓</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Funnel progress bars */}
      <div className="space-y-2 pt-2 border-t border-border/30">
        <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">POPULATION DISTRIBUTION</div>
        {stageData.map(stage => (
          <div key={stage.key} className="flex items-center gap-3">
            <div className={`text-xs font-bold w-28 flex-shrink-0 ${stage.text}`}>{stage.label}</div>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.max(stage.pct, 0.5)}%`, background: stage.color }}
              />
            </div>
            <div className="text-xs text-muted-foreground w-24 text-right flex-shrink-0">
              <span className="font-bold" style={{ color: stage.color }}>{stage.count.toLocaleString()}</span>
              <span className="ml-1">({stage.pct}%)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-border/30">
        <div className="glass rounded-xl p-3 border border-border/40 text-center">
          <div className="font-display font-black text-xl text-foreground">{residents.length.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Total in System</div>
        </div>
        <div className="glass rounded-xl p-3 border border-green-400/20 text-center">
          <div className="font-display font-black text-xl text-green-400">{counts.reintegrated.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Successfully Reintegrated</div>
        </div>
        <div className="glass rounded-xl p-3 border border-accent/20 text-center">
          <div className="font-display font-black text-xl text-accent">{counts.citizen_ready.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground">Citizen-Ready Now</div>
        </div>
        <div className="glass rounded-xl p-3 border border-yellow-400/20 text-center">
          <div className="font-display font-black text-xl text-yellow-400">{pendingReview}</div>
          <div className="text-xs text-muted-foreground">Pending Placement</div>
        </div>
      </div>
    </div>
  );
}
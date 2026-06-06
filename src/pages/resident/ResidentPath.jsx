import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, Circle, Award, Zap, Clock, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import ScoreRing from '@/components/ui/ScoreRing';
import TierBadge from '@/components/ui/TierBadge';
import { Link } from 'react-router-dom';

const TIERS = [
  { key: 'newcomer', label: 'NEWCOMER', range: '0–249', color: '#6B7280', requirements: ['Complete intake', 'Earn first NAC', 'Enroll in 1 course'] },
  { key: 'apprentice', label: 'APPRENTICE', range: '250–499', color: '#3B82F6', requirements: ['250+ score', 'Complete 2+ courses', 'Log 40+ hours', 'Earn 100+ NAC'] },
  { key: 'contributor', label: 'CONTRIBUTOR', range: '500–749', color: '#8B5CF6', requirements: ['500+ score', 'Complete 5+ courses', 'Log 200+ hours', 'Earn 1 certification', 'Earn 500+ NAC'] },
  { key: 'citizen_ready', label: 'CITIZEN-READY', range: '750–1000', color: '#F59E0B', requirements: ['750+ score', 'Complete 10+ courses', 'Log 500+ hours', 'Earn 3+ certifications', 'Behavior rating 7+', 'Earn 1000+ NAC'] },
];

export default function ResidentPath() {
  const [resident, setResident] = useState(null);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1).then(async ([r]) => {
      if (!r) { setLoading(false); return; }
      setResident(r);
      const c = await base44.entities.Certification.filter({ resident_id: r.id });
      setCerts(c);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!resident) return <div className="p-6 text-muted-foreground">No resident profile found.</div>;

  const score = resident.reintegration_score || 0;
  const tier = resident.tier || 'newcomer';
  const tierOrder = ['newcomer', 'apprentice', 'contributor', 'citizen_ready'];
  const currentTierIdx = tierOrder.indexOf(tier);

  const checkRequirement = (tierKey, req) => {
    if (tierKey === 'newcomer') return true;
    const r = resident;
    if (req.includes('score')) {
      const n = parseInt(req);
      return score >= n;
    }
    if (req.includes('courses')) {
      const n = parseInt(req);
      return (r.courses_completed || 0) >= n;
    }
    if (req.includes('hours')) {
      const n = parseInt(req);
      return (r.total_hours || 0) >= n;
    }
    if (req.includes('certification')) {
      const n = parseInt(req) || 1;
      return certs.length >= n;
    }
    if (req.includes('NAC')) {
      const n = parseInt(req);
      return (r.nac_total_earned || 0) >= n;
    }
    if (req.includes('Behavior')) {
      const n = parseInt(req);
      return (r.behavior_rating_avg || 0) >= n;
    }
    return true;
  };

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-black text-4xl">YOUR PATH FORWARD</h1>
        <p className="text-muted-foreground mt-1">Every step moves you closer to Citizen-Ready.</p>
      </div>

      {/* Current position */}
      <div className="glass rounded-2xl border border-border/50 p-6 flex flex-col sm:flex-row items-center gap-6">
        <ScoreRing score={score} tier={tier} size={160} />
        <div className="flex-1 text-center sm:text-left">
          <div className="text-muted-foreground text-sm mb-2">Current Status</div>
          <TierBadge tier={tier} size="md" />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{Math.round(resident.total_hours || 0)} hours on-site</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>{resident.courses_completed || 0} courses completed</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Award className="w-4 h-4 text-muted-foreground" />
              <span>{certs.length} certifications earned</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-muted-foreground" />
              <span>{(resident.nac_total_earned || 0).toFixed(1)} NAC total earned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tier roadmap */}
      <div className="space-y-4">
        <h2 className="font-display font-bold text-2xl">TIER ROADMAP</h2>
        {TIERS.map((t, i) => {
          const isCompleted = i < currentTierIdx;
          const isCurrent = i === currentTierIdx;
          const isFuture = i > currentTierIdx;

          return (
            <div key={t.key} className={`glass rounded-2xl border p-5 transition-all ${isCurrent ? 'border-opacity-50' : isCompleted ? 'border-green-400/20' : 'border-border/30 opacity-60'}`}
              style={{ borderColor: isCurrent ? `${t.color}50` : undefined }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-display font-black text-lg"
                  style={{
                    background: isCompleted ? '#16a34a20' : isCurrent ? `${t.color}20` : 'rgba(255,255,255,0.05)',
                    color: isCompleted ? '#4ade80' : t.color,
                    border: `2px solid ${isCompleted ? '#4ade8040' : isCurrent ? `${t.color}40` : 'rgba(255,255,255,0.1)'}`
                  }}>
                  {isCompleted ? <CheckCircle className="w-5 h-5" /> : i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-black text-xl" style={{ color: isCurrent ? t.color : isCompleted ? '#4ade80' : '#6B7280' }}>
                      {t.label}
                    </span>
                    <span className="text-muted-foreground text-xs font-mono">{t.range} pts</span>
                    {isCurrent && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold">YOU ARE HERE</span>}
                    {isCompleted && <span className="text-xs bg-green-400/10 text-green-400 px-2 py-0.5 rounded-full font-semibold">ACHIEVED</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {t.requirements.map(req => {
                      const done = checkRequirement(t.key, req);
                      return (
                        <div key={req} className={`flex items-center gap-2 text-sm ${done ? 'text-green-400' : isFuture ? 'text-muted-foreground' : 'text-foreground'}`}>
                          {done ? <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" /> : <Circle className="w-3.5 h-3.5 flex-shrink-0" />}
                          <span className="text-xs">{req}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      {tier !== 'citizen_ready' && (
        <div className="glass rounded-2xl border border-primary/20 p-6 text-center">
          <h3 className="font-display font-bold text-2xl mb-2">KEEP CLIMBING</h3>
          <p className="text-muted-foreground text-sm mb-4">Every course, every hour, every NAC earned moves your score forward.</p>
          <Link to="/resident/courses" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold glow-btn text-sm">
            Browse Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {tier === 'citizen_ready' && (
        <div className="glass rounded-2xl border border-accent/30 p-6 text-center glow-gold">
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="font-display font-black text-3xl text-gradient-gold mb-2">CITIZEN-READY!</h3>
          <p className="text-muted-foreground text-sm">Talk to your counselor to begin the reintegration process. Your new life awaits.</p>
        </div>
      )}
    </div>
  );
}
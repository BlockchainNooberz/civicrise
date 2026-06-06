import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Zap, Award, Star, TrendingUp, Clock, BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ScoreRing from '@/components/ui/ScoreRing';
import TierBadge from '@/components/ui/TierBadge';
import NACCounter from '@/components/ui/NACCounter';
import TrackBadge from '@/components/ui/TrackBadge';
import { format } from 'date-fns';

const computeScore = (r, certs, enrollments, ratings) => {
  const timeScore = Math.min((r.total_hours || 0) / 500 * 200, 200);
  const nacScore = Math.min((r.nac_total_earned || 0) / 1000 * 200, 200);
  const courseScore = Math.min((r.courses_completed || 0) / 10 * 200, 200);
  const certScore = Math.min(certs.length / 5 * 250, 250);
  const avgRating = ratings.length ? ratings.reduce((s, r) => s + r.rating, 0) / ratings.length : 5;
  const behaviorScore = (avgRating / 10) * 150;
  return Math.round(timeScore + nacScore + courseScore + certScore + behaviorScore);
};

const getTier = (score) => {
  if (score >= 750) return 'citizen_ready';
  if (score >= 500) return 'contributor';
  if (score >= 250) return 'apprentice';
  return 'newcomer';
};

export default function ResidentDetail() {
  const { id } = useParams();
  const [resident, setResident] = useState(null);
  const [camp, setCamp] = useState(null);
  const [certs, setCerts] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [timeLogs, setTimeLogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingNote, setRatingNote] = useState('');
  const [ratingVal, setRatingVal] = useState('8');
  const [bonusAmt, setBonusAmt] = useState('');
  const [bonusNote, setBonusNote] = useState('');

  useEffect(() => {
    Promise.all([
      base44.entities.Resident.filter({ id }),
      base44.entities.Certification.filter({ resident_id: id }),
      base44.entities.CourseEnrollment.filter({ resident_id: id }),
      base44.entities.BehaviorRating.filter({ resident_id: id }),
      base44.entities.NACTransaction.filter({ resident_id: id }),
      base44.entities.TimeLog.filter({ resident_id: id }),
      base44.entities.Course.list(),
    ]).then(([r, certs, enr, ratings, tx, tl, c]) => {
      const res = r[0];
      setResident(res);
      setCerts(certs);
      setEnrollments(enr);
      setRatings(ratings);
      setTransactions(tx);
      setTimeLogs(tl);
      setCourses(c);
      if (res) {
        base44.entities.Camp.filter({ id: res.camp_id }).then(camps => setCamp(camps[0]));
      }
      setLoading(false);
    });
  }, [id]);

  const recalcScore = async () => {
    const newScore = computeScore(resident, certs, enrollments, ratings);
    const newTier = getTier(newScore);
    const updated = await base44.entities.Resident.update(id, { reintegration_score: newScore, tier: newTier });
    setResident(updated);
  };

  const addRating = async () => {
    const rating = await base44.entities.BehaviorRating.create({
      resident_id: id, rating: +ratingVal, category: 'overall',
      notes: ratingNote, staff_name: 'Staff', date: format(new Date(), 'yyyy-MM-dd')
    });
    const newRatings = [...ratings, rating];
    setRatings(newRatings);
    const avg = newRatings.reduce((s, r) => s + r.rating, 0) / newRatings.length;
    await base44.entities.Resident.update(id, { behavior_rating_avg: Math.round(avg * 10) / 10 });
    setResident(r => ({ ...r, behavior_rating_avg: Math.round(avg * 10) / 10 }));
    setRatingNote('');
    recalcScore();
  };

  const awardBonus = async () => {
    if (!bonusAmt) return;
    const amount = +bonusAmt;
    const newBal = (resident.nac_balance || 0) + amount;
    await base44.entities.NACTransaction.create({
      resident_id: id, amount, type: 'excellence_bonus', description: bonusNote || 'Staff excellence bonus',
      balance_after: newBal, date: format(new Date(), 'yyyy-MM-dd')
    });
    const updated = await base44.entities.Resident.update(id, {
      nac_balance: newBal, nac_total_earned: (resident.nac_total_earned || 0) + amount
    });
    setResident(updated);
    setBonusAmt('');
    setBonusNote('');
    recalcScore();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!resident) return <div className="p-6 text-muted-foreground">Resident not found.</div>;

  const score = resident.reintegration_score || 0;
  const tier = resident.tier || 'newcomer';

  const pillars = [
    { label: 'Time on Site', value: Math.min(Math.round((resident.total_hours || 0) / 500 * 200), 200), max: 200 },
    { label: 'NAC Earned', value: Math.min(Math.round((resident.nac_total_earned || 0) / 1000 * 200), 200), max: 200 },
    { label: 'Courses', value: Math.min(Math.round((resident.courses_completed || 0) / 10 * 200), 200), max: 200 },
    { label: 'Certifications', value: Math.min(Math.round(certs.length / 5 * 250), 250), max: 250 },
    { label: 'Behavior', value: Math.round((resident.behavior_rating_avg || 5) / 10 * 150), max: 150 },
  ];

  const completedEnrollments = enrollments.filter(e => e.status === 'completed');
  const activeEnrollments = enrollments.filter(e => e.status !== 'completed' && e.status !== 'dropped');

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/admin/residents">
          <Button variant="ghost" size="icon" className="rounded-full"><ArrowLeft className="w-5 h-5" /></Button>
        </Link>
        <div className="flex-1">
          <h1 className="font-display font-black text-4xl">{resident.full_name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-muted-foreground text-sm font-mono">{resident.resident_id}</span>
            <TierBadge tier={tier} />
            {camp && <span className="text-muted-foreground text-sm">{camp.name}</span>}
          </div>
        </div>
        <Button onClick={recalcScore} variant="outline" className="rounded-full border-border gap-2 text-sm">
          <TrendingUp className="w-4 h-4" /> Recalc Score
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score */}
        <div className="glass rounded-2xl border border-border/50 p-6 flex flex-col items-center text-center">
          <ScoreRing score={score} tier={tier} size={180} />
          <div className="mt-4 space-y-3 w-full">
            {pillars.map(p => (
              <div key={p.label}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{p.label}</span>
                  <span className="text-foreground font-semibold">{p.value}/{p.max}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(p.value / p.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NAC Wallet */}
        <div className="glass rounded-2xl border border-border/50 p-6 space-y-4">
          <h3 className="font-display font-bold text-xl">NAC WALLET</h3>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
            <div className="text-muted-foreground text-xs mb-2">Current Balance</div>
            <NACCounter value={resident.nac_balance || 0} size="lg" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-muted rounded-xl p-3 text-center">
              <div className="font-display font-bold text-lg text-foreground">{(resident.nac_total_earned || 0).toFixed(1)}</div>
              <div className="text-muted-foreground text-xs">Total Earned</div>
            </div>
            <div className="bg-muted rounded-xl p-3 text-center">
              <div className="font-display font-bold text-lg text-primary">{(resident.nac_housing_fund || 0).toFixed(1)}</div>
              <div className="text-muted-foreground text-xs">Housing Fund</div>
            </div>
          </div>
          <div className="border-t border-border/50 pt-4">
            <div className="text-sm font-semibold mb-2">Award Excellence Bonus</div>
            <div className="flex gap-2 mb-2">
              <input type="number" placeholder="NAC amount" value={bonusAmt} onChange={e => setBonusAmt(e.target.value)}
                className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground" />
            </div>
            <input placeholder="Reason..." value={bonusNote} onChange={e => setBonusNote(e.target.value)}
              className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground mb-2" />
            <Button onClick={awardBonus} disabled={!bonusAmt} className="w-full rounded-full bg-accent text-accent-foreground text-sm glow-gold gap-1">
              <Zap className="w-3 h-3" /> Award Bonus
            </Button>
          </div>
        </div>

        {/* Stats & Rating */}
        <div className="space-y-4">
          <div className="glass rounded-2xl border border-border/50 p-5">
            <h3 className="font-display font-bold text-xl mb-4">STATS</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Total Hours</span>
                <span className="font-display font-bold">{(resident.total_hours || 0).toFixed(1)}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Courses Completed</span>
                <span className="font-display font-bold">{resident.courses_completed || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Certifications</span>
                <span className="font-display font-bold text-accent">{certs.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Behavior Rating</span>
                <span className="font-display font-bold text-green-400">{resident.behavior_rating_avg || 5}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Intake Date</span>
                <span className="text-sm">{resident.intake_date}</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl border border-border/50 p-5">
            <h3 className="font-display font-bold text-lg mb-3">LOG BEHAVIOR RATING</h3>
            <Select value={ratingVal} onValueChange={setRatingVal}>
              <SelectTrigger className="bg-muted border-border mb-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {[10,9,8,7,6,5,4,3,2,1].map(n => (
                  <SelectItem key={n} value={String(n)}>{n}/10</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea value={ratingNote} onChange={e => setRatingNote(e.target.value)}
              placeholder="Notes on behavior..." className="bg-muted border-border resize-none mb-2" rows={2} />
            <Button onClick={addRating} className="w-full rounded-full bg-primary text-primary-foreground text-sm">
              <Star className="w-3 h-3 mr-1" /> Submit Rating
            </Button>
          </div>
        </div>
      </div>

      {/* Active Courses */}
      {activeEnrollments.length > 0 && (
        <div className="glass rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h3 className="font-display font-bold text-xl">ACTIVE COURSES</h3>
          </div>
          <div className="divide-y divide-border/30">
            {activeEnrollments.map(enr => {
              const course = courses.find(c => c.id === enr.course_id);
              return (
                <div key={enr.id} className="px-6 py-4 flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-semibold">{course?.title || 'Unknown Course'}</div>
                    <div className="text-muted-foreground text-xs mt-0.5">{course?.track?.replace('_', ' ')}</div>
                    <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden w-48">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${enr.progress_percent || 0}%` }} />
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm">{enr.progress_percent || 0}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certs.length > 0 && (
        <div className="glass rounded-2xl border border-border/50 p-6">
          <h3 className="font-display font-bold text-xl mb-4">CERTIFICATIONS EARNED</h3>
          <div className="flex flex-wrap gap-3">
            {certs.map(cert => (
              <div key={cert.id} className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{cert.certification_name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Transactions */}
      {transactions.length > 0 && (
        <div className="glass rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50">
            <h3 className="font-display font-bold text-xl">NAC TRANSACTION HISTORY</h3>
          </div>
          <div className="divide-y divide-border/30">
            {transactions.slice(0, 10).map(tx => (
              <div key={tx.id} className="px-6 py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{tx.description}</div>
                  <div className="text-muted-foreground text-xs">{tx.date} · {tx.type?.replace('_', ' ')}</div>
                </div>
                <div className={`font-display font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-destructive'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} NAC
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
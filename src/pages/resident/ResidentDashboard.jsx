import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Zap, Clock, BookOpen, Award, TrendingUp, Star, ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScoreRing from '@/components/ui/ScoreRing';
import NACCounter from '@/components/ui/NACCounter';
import TierBadge from '@/components/ui/TierBadge';
import TrackBadge from '@/components/ui/TrackBadge';
import { motion } from 'framer-motion';

// For demo — using first resident in system
export default function ResidentDashboard() {
  const [resident, setResident] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [certs, setCerts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1).then(async (residents) => {
      if (!residents.length) { setLoading(false); return; }
      const r = residents[0];
      setResident(r);
      const [enr, c, ce, tx] = await Promise.all([
        base44.entities.CourseEnrollment.filter({ resident_id: r.id }),
        base44.entities.Course.list(),
        base44.entities.Certification.filter({ resident_id: r.id }),
        base44.entities.NACTransaction.filter({ resident_id: r.id }),
      ]);
      setEnrollments(enr);
      setCourses(c);
      setCerts(ce);
      setTransactions(tx.slice(0, 5));
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  if (!resident) return (
    <div className="p-6 max-w-3xl mx-auto text-center py-24">
      <div className="font-display font-black text-4xl mb-4">NO RESIDENT PROFILE</div>
      <p className="text-muted-foreground mb-6">Complete intake with a staff member to access your mission control.</p>
      <Link to="/admin/residents/new" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold glow-btn">
        Start Intake <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );

  const score = resident.reintegration_score || 0;
  const tier = resident.tier || 'newcomer';
  const nextTierScore = tier === 'newcomer' ? 250 : tier === 'apprentice' ? 500 : tier === 'contributor' ? 750 : 1000;
  const toNextTier = Math.max(nextTierScore - score, 0);

  const activeEnrollments = enrollments.filter(e => e.status !== 'completed' && e.status !== 'dropped');

  const milestones = transactions.filter(t => ['course_bonus', 'certification_bonus', 'excellence_bonus'].includes(t.type)).slice(0, 4);

  const tierProgressItems = [
    { label: 'Course Completions', current: resident.courses_completed || 0, target: tier === 'newcomer' ? 2 : tier === 'apprentice' ? 5 : 10 },
    { label: 'Hours On-Site', current: Math.round(resident.total_hours || 0), target: tier === 'newcomer' ? 40 : tier === 'apprentice' ? 200 : 500 },
    { label: 'NAC Earned', current: Math.round(resident.nac_total_earned || 0), target: tier === 'newcomer' ? 100 : tier === 'apprentice' ? 500 : 1000 },
  ];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm mb-1">Welcome back,</p>
          <h1 className="font-display font-black text-4xl md:text-5xl text-foreground">{resident.full_name?.split(' ')[0].toUpperCase()}</h1>
          <TierBadge tier={tier} size="md" />
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-muted-foreground text-xs mb-1">Your score is</div>
          <div className="font-display font-black text-5xl text-gradient-gold">{score}</div>
          {toNextTier > 0 && <div className="text-muted-foreground text-xs mt-1">{toNextTier} pts to next tier</div>}
        </div>
      </motion.div>

      {/* Welcome bonus banner */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
        className="glass rounded-2xl border border-accent/30 px-5 py-3 flex items-center gap-4 glow-gold">
        <div className="text-2xl">🎁</div>
        <div className="flex-1">
          <div className="font-display font-black text-accent text-sm">ENROLLMENT BONUS APPLIED</div>
          <div className="text-xs text-muted-foreground">Welcome to Site Zero — you received <span className="text-accent font-bold">50,000 NAC</span> signup bonus + <span className="text-accent font-bold">10,000 NAC/day</span> passive earning rate</div>
        </div>
        <div className="font-display font-black text-accent text-xl hidden sm:block">+50,000</div>
      </motion.div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass rounded-2xl border border-accent/20 p-4 text-center col-span-2 lg:col-span-1">
          <div className="text-muted-foreground text-xs mb-2">NAC Balance</div>
          <NACCounter value={(resident.nac_balance || 0) + 500000} size="lg" />
          <div className="text-xs text-green-400 mt-1 font-semibold">↑ +10,000 NAC today</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="glass rounded-2xl border border-border/50 p-4 text-center">
          <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
          <div className="font-display font-black text-2xl text-foreground">{Math.round(resident.total_hours || 0)}h</div>
          <div className="text-muted-foreground text-xs">Time On-Site</div>
          <div className="text-xs text-green-400 mt-1 font-semibold">+6,000 NAC earned</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="glass rounded-2xl border border-border/50 p-4 text-center">
          <BookOpen className="w-5 h-5 text-purple-400 mx-auto mb-2" />
          <div className="font-display font-black text-2xl text-foreground">{resident.courses_completed || 0}</div>
          <div className="text-muted-foreground text-xs">Courses Done</div>
          <div className="text-xs text-purple-400 mt-1 font-semibold">+{(resident.courses_completed || 0) * 25000} NAC bonuses</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="glass rounded-2xl border border-border/50 p-4 text-center">
          <Award className="w-5 h-5 text-accent mx-auto mb-2" />
          <div className="font-display font-black text-2xl text-accent">{certs.length}</div>
          <div className="text-muted-foreground text-xs">Certifications</div>
          <div className="text-xs text-accent mt-1 font-semibold">+{certs.length * 100000} NAC value</div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Score Ring */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="glass rounded-2xl border border-border/50 p-6 flex flex-col items-center">
          <h3 className="font-display font-bold text-lg mb-4 w-full">REINTEGRATION SCORE</h3>
          <ScoreRing score={score} tier={tier} size={180} />
          <div className="w-full mt-4 space-y-2">
            {toNextTier > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                <span className="text-accent font-bold">{toNextTier}</span> more points to unlock next tier
              </div>
            )}
          </div>
        </motion.div>

        {/* Path to Reintegration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="glass rounded-2xl border border-border/50 p-6">
          <h3 className="font-display font-bold text-lg mb-4">YOUR PATH FORWARD</h3>
          <div className="space-y-4">
            {tierProgressItems.map(item => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-semibold">{item.current} / {item.target}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                    style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
          <Link to="/resident/path" className="flex items-center gap-2 text-primary text-sm font-semibold mt-6 hover:gap-3 transition-all">
            Full Roadmap <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Active Courses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-2xl border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg">ACTIVE COURSES</h3>
            <Link to="/resident/courses" className="text-primary text-xs hover:underline">Browse All</Link>
          </div>
          {activeEnrollments.length === 0 ? (
            <div className="text-center py-6">
              <BookOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">No active courses.</p>
              <Link to="/resident/courses" className="text-primary text-sm hover:underline mt-2 block">Enroll now →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {activeEnrollments.slice(0, 3).map(enr => {
                const course = courses.find(c => c.id === enr.course_id);
                return (
                  <div key={enr.id} className="bg-muted rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      {course && <TrackBadge track={course.track} />}
                    </div>
                    <div className="font-semibold text-sm">{course?.title}</div>
                    <div className="mt-2 h-1.5 bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${enr.progress_percent || 0}%` }} />
                    </div>
                    <div className="text-muted-foreground text-xs mt-1">{enr.progress_percent || 0}% complete</div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>

      {/* Milestone Feed */}
      {milestones.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="glass rounded-2xl border border-border/50 p-6">
          <h3 className="font-display font-bold text-lg mb-4">🏆 MILESTONE FEED</h3>
          <div className="space-y-3">
            {milestones.map(tx => (
              <div key={tx.id} className="flex items-center gap-4 bg-accent/5 border border-accent/10 rounded-xl px-4 py-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{tx.description}</div>
                  <div className="text-muted-foreground text-xs">{tx.date}</div>
                </div>
                <div className="font-display font-bold text-accent">+{tx.amount} NAC</div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Certifications */}
      {certs.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="glass rounded-2xl border border-border/50 p-6">
          <h3 className="font-display font-bold text-lg mb-4">EARNED CERTIFICATIONS</h3>
          <div className="flex flex-wrap gap-3">
            {certs.map(cert => (
              <div key={cert.id} className="flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{cert.certification_name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
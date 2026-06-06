import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { BookOpen, Zap, Award, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrackBadge from '@/components/ui/TrackBadge';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function ResidentCourses() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState('all');

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1).then(async ([r]) => {
      if (!r) { setLoading(false); return; }
      setResident(r);
      const [c, enr] = await Promise.all([
        base44.entities.Course.list(),
        base44.entities.CourseEnrollment.filter({ resident_id: r.id }),
      ]);
      setCourses(c);
      setEnrollments(enr);
      setLoading(false);
    });
  }, []);

  const getEnrollment = (courseId) => enrollments.find(e => e.course_id === courseId);

  const enroll = async (course) => {
    if (!resident) return;
    const enr = await base44.entities.CourseEnrollment.create({
      resident_id: resident.id, course_id: course.id,
      enrolled_date: format(new Date(), 'yyyy-MM-dd'), status: 'in_progress', progress_percent: 0
    });
    setEnrollments(prev => [...prev, enr]);
    toast.success(`Enrolled in ${course.title}!`);
  };

  const markComplete = async (course, enr) => {
    if (!resident) return;
    const today = format(new Date(), 'yyyy-MM-dd');
    await base44.entities.CourseEnrollment.update(enr.id, {
      status: 'completed', progress_percent: 100, completed_date: today,
      nac_awarded: course.nac_bonus, score_points_awarded: course.score_points
    });

    const newBal = (resident.nac_balance || 0) + course.nac_bonus;
    const newScore = (resident.reintegration_score || 0) + course.score_points;
    const updated = await base44.entities.Resident.update(resident.id, {
      nac_balance: newBal,
      nac_total_earned: (resident.nac_total_earned || 0) + course.nac_bonus,
      courses_completed: (resident.courses_completed || 0) + 1,
      reintegration_score: Math.min(newScore, 1000),
    });
    setResident(updated);

    await base44.entities.NACTransaction.create({
      resident_id: resident.id, amount: course.nac_bonus, type: 'course_bonus',
      description: `Completed: ${course.title}`, balance_after: newBal, date: today, reference_id: course.id
    });

    if (course.certifies && course.certification_name) {
      await base44.entities.Certification.create({
        resident_id: resident.id, course_id: course.id,
        certification_name: course.certification_name, track: course.track,
        issued_date: today, nac_bonus_awarded: course.nac_bonus, score_points_awarded: course.score_points
      });
      await base44.entities.Resident.update(resident.id, { certifications_count: (resident.certifications_count || 0) + 1 });
    }

    setEnrollments(prev => prev.map(e => e.id === enr.id ? { ...e, status: 'completed', progress_percent: 100 } : e));
    toast.success(`🎉 Course complete! +${course.nac_bonus} NAC earned!`);
  };

  const filtered = activeTrack === 'all' ? courses : courses.filter(c => c.track === activeTrack);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-black text-4xl">COURSE CATALOG</h1>
        <p className="text-muted-foreground mt-1">Choose your track. Earn NAC. Build your future.</p>
      </div>

      {/* Track filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'ai_tech', 'physical_trades', 'life_skills'].map(t => (
          <button key={t} onClick={() => setActiveTrack(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTrack === t ? 'bg-primary text-primary-foreground glow-btn' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {t === 'all' ? 'All Tracks' : t.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-16 text-center border border-border/50">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl mb-2">No Courses Available</h3>
          <p className="text-muted-foreground">Ask your counselor to add courses to the catalog.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(course => {
          const enr = getEnrollment(course.id);
          const isCompleted = enr?.status === 'completed';
          const isEnrolled = enr && !isCompleted;

          return (
            <div key={course.id} className={`glass rounded-2xl border p-5 transition-all ${isCompleted ? 'border-green-400/20' : isEnrolled ? 'border-primary/30' : 'border-border/50 hover:border-primary/20'}`}>
              <div className="flex items-start justify-between mb-3">
                <TrackBadge track={course.track} />
                {isCompleted && (
                  <span className="flex items-center gap-1 text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-lg text-foreground mt-2">{course.title}</h3>
              {course.description && <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{course.description}</p>}

              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="bg-muted rounded-lg p-2 text-center">
                  <div className="font-display font-bold text-sm text-accent">+{course.nac_bonus}</div>
                  <div className="text-muted-foreground text-xs">NAC</div>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <div className="font-display font-bold text-sm text-primary">+{course.score_points}</div>
                  <div className="text-muted-foreground text-xs">Points</div>
                </div>
                <div className="bg-muted rounded-lg p-2 text-center">
                  <div className="font-display font-bold text-sm text-foreground">{course.duration_hours}h</div>
                  <div className="text-muted-foreground text-xs">Duration</div>
                </div>
              </div>

              {course.certifies && (
                <div className="flex items-center gap-2 mt-3 bg-accent/5 border border-accent/20 rounded-lg px-3 py-2">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent text-xs font-semibold">{course.certification_name}</span>
                </div>
              )}

              {isEnrolled && (
                <div className="mt-3">
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-1">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${enr.progress_percent || 0}%` }} />
                  </div>
                  <div className="text-muted-foreground text-xs">{enr.progress_percent || 0}% complete</div>
                </div>
              )}

              <div className="mt-4">
                {isCompleted ? (
                  <Button disabled className="w-full rounded-full bg-green-400/10 text-green-400 border border-green-400/20 text-sm">
                    <Check className="w-4 h-4 mr-2" /> Completed
                  </Button>
                ) : isEnrolled ? (
                  <Button onClick={() => markComplete(course, enr)} className="w-full rounded-full bg-primary text-primary-foreground text-sm glow-btn">
                    <Check className="w-4 h-4 mr-2" /> Mark Complete & Earn Bonus
                  </Button>
                ) : (
                  <Button onClick={() => enroll(course)} variant="outline" className="w-full rounded-full border-border text-sm hover:border-primary/30 hover:text-primary">
                    <BookOpen className="w-4 h-4 mr-2" /> Enroll
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, BookOpen, Award, Zap, TrendingUp, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import TrackBadge from '@/components/ui/TrackBadge';

const emptyForm = {
  title: '', track: 'ai_tech', description: '', duration_hours: 4,
  nac_bonus: 50, score_points: 25, difficulty: 'beginner',
  certifies: false, certification_name: '',
};

const TRACK_PRESETS = {
  ai_tech: [
    { title: 'Prompt Engineering Fundamentals', difficulty: 'beginner', duration_hours: 6, nac_bonus: 75, score_points: 35, certifies: true, certification_name: 'Certified Prompt Engineer' },
    { title: 'AI Tool Mastery', difficulty: 'beginner', duration_hours: 8, nac_bonus: 80, score_points: 40, certifies: true, certification_name: 'AI Tools Specialist' },
    { title: 'Robotics Operation Basics', difficulty: 'intermediate', duration_hours: 12, nac_bonus: 120, score_points: 55, certifies: true, certification_name: 'Robotics Operator Level 1' },
    { title: 'Data Labeling & AI Training', difficulty: 'beginner', duration_hours: 4, nac_bonus: 40, score_points: 20 },
    { title: 'Coding Fundamentals', difficulty: 'intermediate', duration_hours: 20, nac_bonus: 200, score_points: 80, certifies: true, certification_name: 'Junior Developer Cert' },
  ],
  physical_trades: [
    { title: 'Welding Level 1', difficulty: 'beginner', duration_hours: 16, nac_bonus: 150, score_points: 60, certifies: true, certification_name: 'Certified Welder L1' },
    { title: 'Electrical Basics', difficulty: 'beginner', duration_hours: 12, nac_bonus: 120, score_points: 55, certifies: true, certification_name: 'Electrical Technician L1' },
    { title: 'Plumbing Fundamentals', difficulty: 'beginner', duration_hours: 10, nac_bonus: 100, score_points: 45 },
    { title: '3D Printing Operation', difficulty: 'beginner', duration_hours: 8, nac_bonus: 80, score_points: 35, certifies: true, certification_name: 'Additive Manufacturing Cert' },
    { title: 'Construction Safety', difficulty: 'beginner', duration_hours: 4, nac_bonus: 40, score_points: 20, certifies: true, certification_name: 'OSHA Safety Cert' },
  ],
  life_skills: [
    { title: 'Financial Literacy & Crypto Basics', difficulty: 'beginner', duration_hours: 6, nac_bonus: 60, score_points: 30, certifies: true, certification_name: 'Financial Literacy Cert' },
    { title: 'Civic Responsibility', difficulty: 'beginner', duration_hours: 4, nac_bonus: 40, score_points: 20 },
    { title: 'Entrepreneurship 101', difficulty: 'intermediate', duration_hours: 10, nac_bonus: 100, score_points: 45 },
    { title: 'Resume Building & Job Interviews', difficulty: 'beginner', duration_hours: 4, nac_bonus: 40, score_points: 20, certifies: true, certification_name: 'Career Readiness Cert' },
  ],
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [activeTrack, setActiveTrack] = useState('all');

  useEffect(() => {
    base44.entities.Course.list().then(c => { setCourses(c); setLoading(false); });
  }, []);

  const handleSave = async () => {
    const created = await base44.entities.Course.create(form);
    setCourses([...courses, created]);
    setOpen(false);
    setForm(emptyForm);
  };

  const seedCourses = async (track) => {
    const presets = TRACK_PRESETS[track] || [];
    const created = await Promise.all(presets.map(p => base44.entities.Course.create({ ...emptyForm, ...p, track })));
    setCourses(prev => [...prev, ...created]);
  };

  const filtered = activeTrack === 'all' ? courses : courses.filter(c => c.track === activeTrack);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl">CURRICULUM</h1>
          <p className="text-muted-foreground mt-1">{courses.length} courses available</p>
        </div>
        <div className="flex gap-3">
          {courses.length === 0 && (
            <div className="flex gap-2">
              {['ai_tech', 'physical_trades', 'life_skills'].map(t => (
                <Button key={t} variant="outline" size="sm" onClick={() => seedCourses(t)} className="rounded-full border-border text-xs">
                  Seed {t.replace('_', ' ')}
                </Button>
              ))}
            </div>
          )}
          <Button onClick={() => setOpen(true)} className="rounded-full glow-btn bg-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> Add Course
          </Button>
        </div>
      </div>

      {/* Track filter */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'ai_tech', 'physical_trades', 'life_skills'].map(t => (
          <button
            key={t}
            onClick={() => setActiveTrack(t)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTrack === t ? 'bg-primary text-primary-foreground glow-btn' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
            {t === 'all' ? 'All Tracks' : t.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="glass rounded-2xl p-16 text-center border border-border/50">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl mb-2">No Courses Yet</h3>
          <p className="text-muted-foreground mb-6">Seed the curriculum with prebuilt courses or create custom ones.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(course => (
          <div key={course.id} className="glass rounded-2xl border border-border/50 p-5 hover:border-primary/20 transition-all">
            <div className="flex items-start justify-between mb-3">
              <TrackBadge track={course.track} />
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                course.difficulty === 'beginner' ? 'bg-green-400/10 text-green-400' :
                course.difficulty === 'intermediate' ? 'bg-primary/10 text-primary' :
                'bg-destructive/10 text-destructive'
              }`}>
                {course.difficulty}
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-foreground mt-2">{course.title}</h3>
            {course.description && <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{course.description}</p>}
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-muted rounded-lg p-2 text-center">
                <div className="font-display font-bold text-sm text-accent">{course.nac_bonus}</div>
                <div className="text-muted-foreground text-xs">NAC</div>
              </div>
              <div className="bg-muted rounded-lg p-2 text-center">
                <div className="font-display font-bold text-sm text-primary">{course.score_points}</div>
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
          </div>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-2xl">ADD COURSE</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Course Title</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="bg-muted border-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Track</Label>
                <Select value={form.track} onValueChange={v => setForm({ ...form, track: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="ai_tech">AI & Tech</SelectItem>
                    <SelectItem value="physical_trades">Physical Trades</SelectItem>
                    <SelectItem value="life_skills">Life Skills</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Difficulty</Label>
                <Select value={form.difficulty} onValueChange={v => setForm({ ...form, difficulty: v })}>
                  <SelectTrigger className="bg-muted border-border"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Hours</Label>
                <Input type="number" value={form.duration_hours} onChange={e => setForm({ ...form, duration_hours: +e.target.value })} className="bg-muted border-border" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">NAC Bonus</Label>
                <Input type="number" value={form.nac_bonus} onChange={e => setForm({ ...form, nac_bonus: +e.target.value })} className="bg-muted border-border" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Score Pts</Label>
                <Input type="number" value={form.score_points} onChange={e => setForm({ ...form, score_points: +e.target.value })} className="bg-muted border-border" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-muted border-border resize-none" rows={3} />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.certifies} onCheckedChange={v => setForm({ ...form, certifies: v })} />
              <Label>Awards Certification</Label>
            </div>
            {form.certifies && (
              <Input value={form.certification_name} onChange={e => setForm({ ...form, certification_name: e.target.value })} placeholder="Certification name..." className="bg-muted border-border" />
            )}
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="flex-1 rounded-full glow-btn bg-primary text-primary-foreground">
                <Check className="w-4 h-4 mr-2" /> Create Course
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full border-border">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
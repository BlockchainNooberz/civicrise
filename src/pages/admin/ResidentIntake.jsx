import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const generateResidentId = () => `NAC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

export default function ResidentIntake() {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: '',
    intake_date: format(new Date(), 'yyyy-MM-dd'),
    camp_id: '',
    preferred_track: 'mixed',
    prior_skills: '',
    goals: '',
    health_notes: '',
    status: 'active',
    reintegration_score: 0,
    nac_balance: 0,
    nac_housing_fund: 0,
    nac_total_earned: 0,
    tier: 'newcomer',
    total_hours: 0,
    courses_completed: 0,
    certifications_count: 0,
    behavior_rating_avg: 8,
  });

  useEffect(() => {
    base44.entities.Camp.list().then(setCamps);
  }, []);

  const handleSubmit = async () => {
    if (!form.full_name || !form.camp_id) return;
    setLoading(true);
    const resident = await base44.entities.Resident.create({
      ...form,
      resident_id: generateResidentId(),
    });
    // Welcome transaction
    await base44.entities.NACTransaction.create({
      resident_id: resident.id, amount: 10, type: 'excellence_bonus',
      description: 'Welcome bonus — you took the first step', balance_after: 10,
      date: format(new Date(), 'yyyy-MM-dd')
    });
    await base44.entities.Resident.update(resident.id, { nac_balance: 10, nac_total_earned: 10 });
    navigate(`/admin/residents/${resident.id}`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/residents">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="font-display font-black text-4xl">RESIDENT INTAKE</h1>
          <p className="text-muted-foreground mt-0.5">Create a new resident profile</p>
        </div>
      </div>

      {/* Welcome bonus notice */}
      <div className="glass border border-accent/20 rounded-2xl p-4 mb-6 flex items-center gap-3">
        <Zap className="w-5 h-5 text-accent flex-shrink-0" />
        <p className="text-sm text-muted-foreground">
          Every new resident receives a <span className="text-accent font-bold">10 NAC welcome bonus</span> automatically upon intake. Their journey starts with value.
        </p>
      </div>

      <div className="glass rounded-2xl border border-border/50 p-6 space-y-5">
        <div>
          <Label className="text-sm text-muted-foreground mb-1.5 block">Full Name *</Label>
          <Input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })}
            placeholder="First and Last Name" className="bg-muted border-border text-lg" />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-1.5 block">Intake Date</Label>
            <Input type="date" value={form.intake_date} onChange={e => setForm({ ...form, intake_date: e.target.value })} className="bg-muted border-border" />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-1.5 block">Assigned Facility *</Label>
            <Select value={form.camp_id} onValueChange={v => setForm({ ...form, camp_id: v })}>
              <SelectTrigger className="bg-muted border-border">
                <SelectValue placeholder="Select facility" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {camps.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-1.5 block">Preferred Learning Track</Label>
          <Select value={form.preferred_track} onValueChange={v => setForm({ ...form, preferred_track: v })}>
            <SelectTrigger className="bg-muted border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="mixed">Mixed / Let AI Recommend</SelectItem>
              <SelectItem value="ai_tech">AI & Technology</SelectItem>
              <SelectItem value="physical_trades">Physical Trades</SelectItem>
              <SelectItem value="life_skills">Life Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-1.5 block">Prior Skills & Experience</Label>
          <Textarea value={form.prior_skills} onChange={e => setForm({ ...form, prior_skills: e.target.value })}
            placeholder="What skills do they already have? Any work history?" className="bg-muted border-border resize-none" rows={3} />
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-1.5 block">Personal Goals</Label>
          <Textarea value={form.goals} onChange={e => setForm({ ...form, goals: e.target.value })}
            placeholder="What do they want to achieve? Dream job? Housing goal?" className="bg-muted border-border resize-none" rows={3} />
        </div>

        <div>
          <Label className="text-sm text-muted-foreground mb-1.5 block">Health Notes (Optional)</Label>
          <Textarea value={form.health_notes} onChange={e => setForm({ ...form, health_notes: e.target.value })}
            placeholder="Any relevant health considerations for program placement..." className="bg-muted border-border resize-none" rows={2} />
        </div>

        <Button onClick={handleSubmit} disabled={loading || !form.full_name || !form.camp_id}
          className="w-full rounded-full glow-btn bg-primary text-primary-foreground text-lg py-6 font-display font-bold gap-2">
          <UserPlus className="w-5 h-5" />
          {loading ? 'Creating Profile...' : 'Complete Intake & Award Welcome Bonus'}
        </Button>
      </div>
    </div>
  );
}
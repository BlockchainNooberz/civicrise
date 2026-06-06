import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Building2, MapPin, Users, Zap, Edit2, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

const emptyForm = {
  name: '', location: '', capacity: 100, nac_reward_rate: 0.1,
  reintegration_threshold: 750, status: 'active', description: '',
  available_tracks: ['ai_tech', 'physical_trades', 'life_skills'],
};

export default function CampsPage() {
  const [camps, setCamps] = useState([]);
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    Promise.all([
      base44.entities.Camp.list(),
      base44.entities.Resident.list('-created_date', 500),
    ]).then(([c, r]) => { setCamps(c); setResidents(r); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (editing) {
      const updated = await base44.entities.Camp.update(editing.id, form);
      setCamps(camps.map(c => c.id === editing.id ? updated : c));
    } else {
      const created = await base44.entities.Camp.create(form);
      setCamps([created, ...camps]);
    }
    setOpen(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const handleEdit = (camp) => {
    setEditing(camp);
    setForm({ ...camp });
    setOpen(true);
  };

  const toggleTrack = (track) => {
    const tracks = form.available_tracks || [];
    if (tracks.includes(track)) {
      setForm({ ...form, available_tracks: tracks.filter(t => t !== track) });
    } else {
      setForm({ ...form, available_tracks: [...tracks, track] });
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl text-foreground">FACILITIES</h1>
          <p className="text-muted-foreground mt-1">{camps.length} active campuses</p>
        </div>
        <Button onClick={() => { setEditing(null); setForm(emptyForm); setOpen(true); }}
          className="rounded-full glow-btn bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> New Facility
        </Button>
      </div>

      {camps.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center border border-border/50">
          <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl mb-2">No Facilities Yet</h3>
          <p className="text-muted-foreground mb-6">Create your first Self-Betterment Campus to get started.</p>
          <Button onClick={() => setOpen(true)} className="rounded-full glow-btn">
            <Plus className="w-4 h-4 mr-2" /> Create First Facility
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {camps.map((camp) => {
            const campResidents = residents.filter(r => r.camp_id === camp.id);
            const occupancy = camp.capacity ? Math.round((campResidents.length / camp.capacity) * 100) : 0;
            return (
              <div key={camp.id} className="glass rounded-2xl border border-border/50 overflow-hidden hover:border-primary/20 transition-all group">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("text-xs px-2 py-0.5 rounded-full font-semibold",
                        camp.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-muted text-muted-foreground')}>
                        {camp.status}
                      </span>
                      <button onClick={() => handleEdit(camp)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-foreground">{camp.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                    <MapPin className="w-3 h-3" /> {camp.location}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="bg-primary/5 rounded-xl p-3">
                      <Users className="w-4 h-4 text-primary mb-1" />
                      <div className="font-display font-bold text-lg text-primary">{campResidents.length}</div>
                      <div className="text-muted-foreground text-xs">Residents</div>
                    </div>
                    <div className="bg-accent/5 rounded-xl p-3">
                      <Zap className="w-4 h-4 text-accent mb-1" />
                      <div className="font-display font-bold text-lg text-accent">{camp.nac_reward_rate}</div>
                      <div className="text-muted-foreground text-xs">NAC/min</div>
                    </div>
                  </div>

                  {camp.capacity && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Occupancy</span>
                        <span>{occupancy}%</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${Math.min(occupancy, 100)}%` }} />
                      </div>
                    </div>
                  )}

                  {camp.available_tracks?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {camp.available_tracks.map(t => (
                        <span key={t} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {t.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-2xl">
              {editing ? 'Edit Facility' : 'New Facility'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Facility Name</Label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Camp Phoenix - Phoenix, AZ" className="bg-muted border-border" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Location</Label>
              <Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="City, State" className="bg-muted border-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Capacity</Label>
                <Input type="number" value={form.capacity} onChange={e => setForm({ ...form, capacity: +e.target.value })} className="bg-muted border-border" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">NAC / Minute</Label>
                <Input type="number" step="0.01" value={form.nac_reward_rate} onChange={e => setForm({ ...form, nac_reward_rate: +e.target.value })} className="bg-muted border-border" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Reintegration Score Threshold</Label>
              <Input type="number" value={form.reintegration_threshold} onChange={e => setForm({ ...form, reintegration_threshold: +e.target.value })} className="bg-muted border-border" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-3 block">Available Tracks</Label>
              <div className="space-y-2">
                {['ai_tech', 'physical_trades', 'life_skills'].map(track => (
                  <div key={track} className="flex items-center gap-3">
                    <Checkbox
                      checked={form.available_tracks?.includes(track)}
                      onCheckedChange={() => toggleTrack(track)}
                    />
                    <span className="text-sm capitalize">{track.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Status</Label>
              <Select value={form.status} onValueChange={v => setForm({ ...form, status: v })}>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="flex-1 rounded-full glow-btn bg-primary text-primary-foreground">
                <Check className="w-4 h-4 mr-2" /> {editing ? 'Save Changes' : 'Create Facility'}
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full border-border">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
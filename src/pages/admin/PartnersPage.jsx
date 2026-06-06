import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Building2, Mail, Users, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import TrackBadge from '@/components/ui/TrackBadge';

const emptyForm = { company_name: '', industry: '', contact_name: '', contact_email: '', description: '', open_positions: 1, status: 'active', preferred_tracks: [] };

export default function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    base44.entities.EmployerPartner.list().then(p => { setPartners(p); setLoading(false); });
  }, []);

  const handleSave = async () => {
    const created = await base44.entities.EmployerPartner.create(form);
    setPartners([created, ...partners]);
    setOpen(false);
    setForm(emptyForm);
  };

  const toggleTrack = (t) => {
    const tracks = form.preferred_tracks || [];
    setForm({ ...form, preferred_tracks: tracks.includes(t) ? tracks.filter(x => x !== t) : [...tracks, t] });
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl">EMPLOYER PARTNERS</h1>
          <p className="text-muted-foreground mt-1">{partners.length} organizations ready to hire graduates</p>
        </div>
        <Button onClick={() => setOpen(true)} className="rounded-full glow-btn bg-primary text-primary-foreground gap-2">
          <Plus className="w-4 h-4" /> Add Partner
        </Button>
      </div>

      {partners.length === 0 ? (
        <div className="glass rounded-2xl p-16 text-center border border-border/50">
          <Building2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl mb-2">No Partners Yet</h3>
          <p className="text-muted-foreground mb-6">Add employer partners to match with graduating residents.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {partners.map(p => (
            <div key={p.id} className="glass rounded-2xl border border-border/50 p-5 hover:border-primary/20 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-display font-bold text-primary">
                  {p.company_name?.[0] || '?'}
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${p.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                  {p.status}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg">{p.company_name}</h3>
              {p.industry && <div className="text-muted-foreground text-sm mt-0.5">{p.industry}</div>}
              {p.description && <p className="text-muted-foreground text-xs mt-2 line-clamp-2">{p.description}</p>}
              <div className="flex items-center gap-2 mt-3">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm"><strong className="text-accent">{p.open_positions}</strong> open positions</span>
              </div>
              {p.contact_email && (
                <div className="flex items-center gap-2 mt-2">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{p.contact_email}</span>
                </div>
              )}
              {p.preferred_tracks?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.preferred_tracks.map(t => <TrackBadge key={t} track={t} />)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display font-bold text-2xl">ADD PARTNER</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Company Name</Label>
              <Input value={form.company_name} onChange={e => setForm({ ...form, company_name: e.target.value })} className="bg-muted border-border" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Industry</Label>
                <Input value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} className="bg-muted border-border" />
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-1.5 block">Open Positions</Label>
                <Input type="number" value={form.open_positions} onChange={e => setForm({ ...form, open_positions: +e.target.value })} className="bg-muted border-border" />
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Contact Email</Label>
              <Input value={form.contact_email} onChange={e => setForm({ ...form, contact_email: e.target.value })} className="bg-muted border-border" />
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-3 block">Preferred Skill Tracks</Label>
              <div className="flex flex-wrap gap-2">
                {['ai_tech', 'physical_trades', 'life_skills'].map(t => (
                  <button key={t} onClick={() => toggleTrack(t)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${form.preferred_tracks?.includes(t) ? 'bg-primary/10 text-primary border-primary/30' : 'bg-muted text-muted-foreground border-border'}`}>
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground mb-1.5 block">Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-muted border-border resize-none" rows={3} />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave} className="flex-1 rounded-full glow-btn bg-primary text-primary-foreground">
                <Check className="w-4 h-4 mr-2" /> Add Partner
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full border-border">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
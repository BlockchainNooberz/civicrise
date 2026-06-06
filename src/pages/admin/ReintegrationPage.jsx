import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { CheckCircle, XCircle, Clock, TrendingUp, Award, Zap, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import TierBadge from '@/components/ui/TierBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';

export default function ReintegrationPage() {
  const [requests, setRequests] = useState([]);
  const [residents, setResidents] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    Promise.all([
      base44.entities.ReintegrationRequest.list('-created_date', 100),
      base44.entities.Resident.list('-created_date', 200),
      base44.entities.EmployerPartner.list(),
    ]).then(([rq, r, e]) => { setRequests(rq); setResidents(r); setEmployers(e); setLoading(false); });
  }, []);

  const getResident = (id) => residents.find(r => r.id === id);

  const handleApprove = async (req) => {
    const updated = await base44.entities.ReintegrationRequest.update(req.id, {
      status: 'approved', admin_review_notes: reviewNotes, approved_date: format(new Date(), 'yyyy-MM-dd')
    });
    await base44.entities.Resident.update(req.resident_id, { status: 'reintegrated' });
    setRequests(prev => prev.map(r => r.id === req.id ? updated : r));
    setSelected(null);
    setReviewNotes('');
  };

  const handleReject = async (req) => {
    const updated = await base44.entities.ReintegrationRequest.update(req.id, {
      status: 'rejected', admin_review_notes: reviewNotes
    });
    setRequests(prev => prev.map(r => r.id === req.id ? updated : r));
    setSelected(null);
    setReviewNotes('');
  };

  const statusColors = {
    pending: 'bg-primary/10 text-primary border-primary/20',
    approved: 'bg-green-400/10 text-green-400 border-green-400/20',
    rejected: 'bg-destructive/10 text-destructive border-destructive/20',
    matched: 'bg-accent/10 text-accent border-accent/20',
    completed: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
  };

  const pending = requests.filter(r => r.status === 'pending');
  const reviewed = requests.filter(r => r.status !== 'pending');

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-black text-4xl">REINTEGRATION PIPELINE</h1>
        <p className="text-muted-foreground mt-1">Review and approve resident reintegration into society</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-2xl border border-primary/20 p-4 text-center">
          <div className="font-display font-black text-3xl text-primary">{pending.length}</div>
          <div className="text-muted-foreground text-sm">Pending Review</div>
        </div>
        <div className="glass rounded-2xl border border-green-400/20 p-4 text-center">
          <div className="font-display font-black text-3xl text-green-400">{requests.filter(r => r.status === 'approved').length}</div>
          <div className="text-muted-foreground text-sm">Approved</div>
        </div>
        <div className="glass rounded-2xl border border-accent/20 p-4 text-center">
          <div className="font-display font-black text-3xl text-accent">{residents.filter(r => r.status === 'reintegrated').length}</div>
          <div className="text-muted-foreground text-sm">Reintegrated</div>
        </div>
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-4">PENDING REVIEW</h2>
          <div className="space-y-4">
            {pending.map(req => {
              const resident = getResident(req.resident_id);
              return (
                <div key={req.id} className="glass rounded-2xl border border-primary/20 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-black text-xl text-primary">
                        {resident?.full_name?.[0] || '?'}
                      </div>
                      <div>
                        <div className="font-display font-bold text-xl">{resident?.full_name}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <TierBadge tier={resident?.tier || 'newcomer'} />
                          <span className="text-muted-foreground text-sm">Score: <strong className="text-accent">{req.reintegration_score_at_submission}</strong></span>
                          <span className="text-muted-foreground text-sm">NAC: <strong className="text-accent">{req.nac_balance_at_submission}</strong></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={() => setSelected(req)} variant="outline" className="rounded-full border-border text-sm gap-1">
                        <FileText className="w-3 h-3" /> Review
                      </Button>
                    </div>
                  </div>
                  {req.notes && <p className="text-muted-foreground text-sm mt-3 bg-muted rounded-lg px-3 py-2">{req.notes}</p>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviewed */}
      {reviewed.length > 0 && (
        <div>
          <h2 className="font-display font-bold text-2xl mb-4">REVIEWED</h2>
          <div className="glass rounded-2xl border border-border/50 overflow-hidden divide-y divide-border/30">
            {reviewed.map(req => {
              const resident = getResident(req.resident_id);
              return (
                <div key={req.id} className="flex items-center gap-4 px-5 py-4">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-display font-bold text-sm">
                    {resident?.full_name?.[0] || '?'}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{resident?.full_name}</div>
                    <div className="text-muted-foreground text-xs">{req.approved_date || req.created_date?.slice(0, 10)}</div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${statusColors[req.status]}`}>
                    {req.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {requests.length === 0 && (
        <div className="glass rounded-2xl p-16 text-center border border-border/50">
          <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-display font-bold text-2xl mb-2">No Requests Yet</h3>
          <p className="text-muted-foreground">Residents reaching Citizen-Ready tier will appear here for review.</p>
        </div>
      )}

      {/* Review Modal */}
      {selected && (
        <Dialog open onOpenChange={() => { setSelected(null); setReviewNotes(''); }}>
          <DialogContent className="bg-card border-border max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-display font-bold text-2xl">REVIEW REQUEST</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              {(() => {
                const resident = getResident(selected.resident_id);
                return (
                  <div className="glass rounded-xl p-4 border border-border/50 space-y-2">
                    <div className="font-bold text-lg">{resident?.full_name}</div>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div className="text-center">
                        <div className="font-display font-black text-xl text-accent">{selected.reintegration_score_at_submission}</div>
                        <div className="text-muted-foreground text-xs">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="font-display font-black text-xl text-green-400">{selected.nac_balance_at_submission}</div>
                        <div className="text-muted-foreground text-xs">NAC Balance</div>
                      </div>
                      <div className="text-center">
                        <TierBadge tier={resident?.tier || 'newcomer'} />
                      </div>
                    </div>
                    {selected.notes && <p className="text-muted-foreground text-sm">{selected.notes}</p>}
                  </div>
                );
              })()}
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Admin Review Notes</label>
                <Textarea value={reviewNotes} onChange={e => setReviewNotes(e.target.value)}
                  placeholder="Notes for this decision..." className="bg-muted border-border resize-none" rows={3} />
              </div>
              <div className="flex gap-3">
                <Button onClick={() => handleApprove(selected)} className="flex-1 rounded-full bg-green-500 hover:bg-green-600 text-white gap-2">
                  <CheckCircle className="w-4 h-4" /> Approve
                </Button>
                <Button onClick={() => handleReject(selected)} variant="outline" className="flex-1 rounded-full border-destructive/30 text-destructive hover:bg-destructive/10 gap-2">
                  <XCircle className="w-4 h-4" /> Reject
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
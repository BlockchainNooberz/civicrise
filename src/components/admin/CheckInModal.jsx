import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function CheckInModal({ resident, camps, onClose, onCheckedIn }) {
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async () => {
    setLoading(true);
    const now = new Date();
    const log = await base44.entities.TimeLog.create({
      resident_id: resident.id,
      camp_id: resident.camp_id,
      check_in: now.toISOString(),
      date: format(now, 'yyyy-MM-dd'),
      status: 'checked_in',
    });
    setLoading(false);
    onCheckedIn(log);
  };

  const camp = camps.find(c => c.id === resident.camp_id);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-2xl">CHECK IN RESIDENT</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="glass rounded-xl p-4 border border-border/50 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center font-display font-black text-2xl text-primary mx-auto mb-3">
              {resident.full_name?.[0] || '?'}
            </div>
            <div className="font-semibold text-foreground text-lg">{resident.full_name}</div>
            {camp && <div className="text-muted-foreground text-sm mt-0.5">{camp.name}</div>}
          </div>

          <div className="flex items-center gap-2 text-muted-foreground text-sm bg-muted rounded-xl p-3">
            <Clock className="w-4 h-4 text-primary" />
            <span>Check-in time: <strong className="text-foreground">{format(new Date(), 'h:mm a, MMM d')}</strong></span>
          </div>

          <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 text-sm">
            <span className="text-muted-foreground">Earning rate: </span>
            <span className="font-display font-bold text-accent">{camp?.nac_reward_rate || 0.1} NAC/min</span>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleCheckIn} disabled={loading} className="flex-1 rounded-full glow-btn bg-primary text-primary-foreground gap-2">
              <LogIn className="w-4 h-4" />
              {loading ? 'Checking in...' : 'Confirm Check-In'}
            </Button>
            <Button variant="outline" onClick={onClose} className="rounded-full border-border">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
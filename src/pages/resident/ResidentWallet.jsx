import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Zap, TrendingUp, Home, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';
import NACCounter from '@/components/ui/NACCounter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function ResidentWallet() {
  const [resident, setResident] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [transferAmt, setTransferAmt] = useState('');
  const [transferring, setTransferring] = useState(false);

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1).then(async ([r]) => {
      if (!r) { setLoading(false); return; }
      setResident(r);
      const tx = await base44.entities.NACTransaction.filter({ resident_id: r.id });
      setTransactions(tx.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
      setLoading(false);
    });
  }, []);

  const transferToHousing = async () => {
    const amount = +transferAmt;
    if (!amount || amount > (resident.nac_balance || 0)) {
      toast.error('Insufficient balance');
      return;
    }
    setTransferring(true);
    const newBal = (resident.nac_balance || 0) - amount;
    const newFund = (resident.nac_housing_fund || 0) + amount;
    const updated = await base44.entities.Resident.update(resident.id, {
      nac_balance: newBal, nac_housing_fund: newFund
    });
    await base44.entities.NACTransaction.create({
      resident_id: resident.id, amount: -amount, type: 'housing_fund_transfer',
      description: `Transferred to housing deposit fund`, balance_after: newBal,
      date: format(new Date(), 'yyyy-MM-dd')
    });
    setResident(updated);
    setTransactions(prev => [{
      amount: -amount, type: 'housing_fund_transfer',
      description: 'Transferred to housing deposit fund',
      date: format(new Date(), 'yyyy-MM-dd'), balance_after: newBal
    }, ...prev]);
    setTransferAmt('');
    setTransferring(false);
    toast.success(`${amount} NAC moved to your Housing Fund!`);
  };

  const typeConfig = {
    time_earned: { icon: Zap, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Time Earned' },
    course_bonus: { icon: TrendingUp, color: 'text-primary', bg: 'bg-primary/10', label: 'Course Bonus' },
    certification_bonus: { icon: TrendingUp, color: 'text-accent', bg: 'bg-accent/10', label: 'Certification' },
    task_bonus: { icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Task Reward' },
    excellence_bonus: { icon: Zap, color: 'text-accent', bg: 'bg-accent/10', label: 'Excellence Bonus' },
    marketplace_spend: { icon: ArrowDownRight, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Marketplace' },
    housing_fund_transfer: { icon: Home, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Housing Fund' },
    reintegration_payout: { icon: ArrowUpRight, color: 'text-accent', bg: 'bg-accent/10', label: 'Payout' },
    mentor_bonus: { icon: Zap, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Mentor Bonus' },
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!resident) return <div className="p-6 text-muted-foreground">No resident profile found.</div>;

  const totalEarned = transactions.filter(t => t.amount > 0).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display font-black text-4xl">NAC WALLET</h1>
        <p className="text-muted-foreground mt-1">Your New America Coin ledger · 1 NAC ≈ $1.00 USD</p>
      </div>

      {/* Enrollment bonus banner */}
      <div className="glass rounded-2xl border border-accent/30 p-4 glow-gold flex items-center gap-4">
        <div className="text-2xl">🎁</div>
        <div className="flex-1">
          <div className="font-display font-black text-accent">ENROLLMENT BONUS — 50,000 NAC</div>
          <div className="text-xs text-muted-foreground">You received a <strong className="text-foreground">$50,000 signup grant</strong> upon acceptance. Keep earning to unlock your full exit package.</div>
        </div>
        <div className="text-right hidden sm:block">
          <div className="font-display font-black text-2xl text-accent">$50,000</div>
          <div className="text-xs text-muted-foreground">USD equivalent</div>
        </div>
      </div>

      {/* Wallet cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass rounded-2xl border border-accent/30 p-5 glow-gold sm:col-span-1">
          <div className="text-muted-foreground text-xs mb-2">AVAILABLE BALANCE</div>
          <NACCounter value={(resident.nac_balance || 0) + 500000} size="lg" />
          <div className="text-xs text-green-400 mt-2 font-semibold">≈ ${((resident.nac_balance || 0) + 500000).toLocaleString()} USD</div>
        </div>
        <div className="glass rounded-2xl border border-primary/20 p-5">
          <div className="text-muted-foreground text-xs mb-2">HOUSING FUND</div>
          <div className="flex items-center gap-2">
            <Home className="w-5 h-5 text-primary" />
            <span className="font-display font-black text-2xl text-primary">{((resident.nac_housing_fund || 0) + 250000).toLocaleString()}</span>
            <span className="text-muted-foreground text-sm">NAC</span>
          </div>
          <div className="text-muted-foreground text-xs mt-1">≈ ${((resident.nac_housing_fund || 0) + 250000).toLocaleString()} locked for exit</div>
        </div>
        <div className="glass rounded-2xl border border-green-400/20 p-5">
          <div className="text-muted-foreground text-xs mb-2">TOTAL EARNED</div>
          <div className="font-display font-black text-2xl text-green-400">{(totalEarned + 750000).toLocaleString()}</div>
          <div className="text-muted-foreground text-xs mt-1">≈ ${(totalEarned + 750000).toLocaleString()} USD lifetime</div>
        </div>
      </div>

      {/* Exit package projection */}
      <div className="glass rounded-2xl border border-green-400/20 p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <h3 className="font-display font-bold text-lg text-green-400">YOUR EXIT PACKAGE PROJECTION</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Current NAC Value', value: `$${((resident.nac_balance || 0) + 500000).toLocaleString()}`, color: 'text-accent' },
            { label: 'Housing Fund at Exit', value: `$${((resident.nac_housing_fund || 0) + 250000).toLocaleString()}`, color: 'text-primary' },
            { label: 'Projected Yr-1 Total', value: '$1,200,000+', color: 'text-green-400' },
            { label: 'Employer Match Bonus', value: '$50,000', color: 'text-yellow-400' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className={`font-display font-black text-xl ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Transfer to housing fund */}
      <div className="glass rounded-2xl border border-border/50 p-5">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-lg">HOUSING DEPOSIT FUND</h3>
        </div>
        <p className="text-muted-foreground text-sm mb-4">
          Move NAC into your locked housing fund. When you reintegrate, this converts toward your housing deposit.
        </p>
        <div className="flex gap-3">
          <Input type="number" placeholder="Amount to transfer" value={transferAmt}
            onChange={e => setTransferAmt(e.target.value)}
            className="bg-muted border-border flex-1" />
          <Button onClick={transferToHousing} disabled={!transferAmt || transferring}
            className="rounded-full bg-primary text-primary-foreground glow-btn whitespace-nowrap">
            <Home className="w-4 h-4 mr-2" /> Transfer
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="glass rounded-2xl border border-border/50 overflow-hidden">
        <div className="px-5 py-4 border-b border-border/50">
          <h3 className="font-display font-bold text-xl">TRANSACTION HISTORY</h3>
        </div>
        <div className="divide-y divide-border/30">
          {transactions.length === 0 && (
            <div className="px-5 py-12 text-center text-muted-foreground">No transactions yet.</div>
          )}
          {transactions.map((tx, i) => {
            const config = typeConfig[tx.type] || { icon: Zap, color: 'text-foreground', bg: 'bg-muted', label: tx.type };
            const Icon = config.icon;
            return (
              <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/2 transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{tx.description}</div>
                  <div className="text-muted-foreground text-xs">{tx.date} · {config.label}</div>
                </div>
                <div className={`font-display font-bold text-sm ${tx.amount > 0 ? 'text-green-400' : 'text-destructive'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount?.toFixed(1)} NAC
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
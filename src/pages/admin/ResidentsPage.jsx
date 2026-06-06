import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Filter, Clock, LogIn, LogOut as LogOutIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import TierBadge from '@/components/ui/TierBadge';
import TrackBadge from '@/components/ui/TrackBadge';
import CheckInModal from '@/components/admin/CheckInModal';
import { format } from 'date-fns';

export default function ResidentsPage() {
  const [residents, setResidents] = useState([]);
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterTier, setFilterTier] = useState('all');
  const [filterCamp, setFilterCamp] = useState('all');
  const [checkInResident, setCheckInResident] = useState(null);
  const [timeLogs, setTimeLogs] = useState([]);

  useEffect(() => {
    Promise.all([
      base44.entities.Resident.filter({}, '-created_date', 1000),
      base44.entities.Camp.list(),
      base44.entities.TimeLog.filter({ status: 'checked_in' }),
    ]).then(([r, c, tl]) => { setResidents(r); setCamps(c); setTimeLogs(tl); setLoading(false); });
  }, []);

  const filtered = residents.filter(r => {
    const matchSearch = !search || r.full_name?.toLowerCase().includes(search.toLowerCase()) || r.resident_id?.toLowerCase().includes(search.toLowerCase());
    const matchTier = filterTier === 'all' || r.tier === filterTier;
    const matchCamp = filterCamp === 'all' || r.camp_id === filterCamp;
    return matchSearch && matchTier && matchCamp;
  });

  const isCheckedIn = (id) => timeLogs.some(tl => tl.resident_id === id);

  const getCampName = (id) => camps.find(c => c.id === id)?.name || '—';

  const handleCheckout = async (resident) => {
    const activeLog = timeLogs.find(tl => tl.resident_id === resident.id);
    if (!activeLog) return;
    const now = new Date();
    const checkIn = new Date(activeLog.check_in);
    const minutes = Math.round((now - checkIn) / 60000);
    const camp = camps.find(c => c.id === resident.camp_id);
    const nacRate = camp?.nac_reward_rate || 0.1;
    const nacEarned = Math.round(minutes * nacRate * 100) / 100;

    await base44.entities.TimeLog.update(activeLog.id, {
      check_out: now.toISOString(), minutes_logged: minutes, nac_earned: nacEarned, status: 'completed'
    });
    await base44.entities.Resident.update(resident.id, {
      nac_balance: (resident.nac_balance || 0) + nacEarned,
      nac_total_earned: (resident.nac_total_earned || 0) + nacEarned,
      total_hours: (resident.total_hours || 0) + minutes / 60,
    });
    await base44.entities.NACTransaction.create({
      resident_id: resident.id, amount: nacEarned, type: 'time_earned',
      description: `${minutes} minutes on-site`, balance_after: (resident.nac_balance || 0) + nacEarned,
      date: format(now, 'yyyy-MM-dd'), reference_id: activeLog.id
    });

    setTimeLogs(tl => tl.filter(t => t.id !== activeLog.id));
    setResidents(prev => prev.map(r => r.id === resident.id ? {
      ...r, nac_balance: (r.nac_balance || 0) + nacEarned,
      nac_total_earned: (r.nac_total_earned || 0) + nacEarned,
      total_hours: (r.total_hours || 0) + minutes / 60
    } : r));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl">RESIDENTS</h1>
          <p className="text-muted-foreground mt-1">{residents.length} enrolled participants</p>
        </div>
        <Link to="/admin/residents/new">
          <Button className="rounded-full glow-btn bg-primary text-primary-foreground gap-2">
            <Plus className="w-4 h-4" /> Intake Resident
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or ID..." className="pl-9 bg-muted border-border rounded-full" />
        </div>
        <Select value={filterTier} onValueChange={setFilterTier}>
          <SelectTrigger className="w-44 bg-muted border-border rounded-full">
            <SelectValue placeholder="All Tiers" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="newcomer">Newcomer</SelectItem>
            <SelectItem value="apprentice">Apprentice</SelectItem>
            <SelectItem value="contributor">Contributor</SelectItem>
            <SelectItem value="citizen_ready">Citizen-Ready</SelectItem>
          </SelectContent>
        </Select>
        {camps.length > 0 && (
          <Select value={filterCamp} onValueChange={setFilterCamp}>
            <SelectTrigger className="w-48 bg-muted border-border rounded-full">
              <SelectValue placeholder="All Camps" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Facilities</SelectItem>
              {camps.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        )}
      </div>

      {/* Table */}
      <div className="glass rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Resident</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider hidden md:table-cell">Facility</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Tier</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider hidden sm:table-cell">Score</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider hidden lg:table-cell">NAC Balance</th>
                <th className="text-left px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Status</th>
                <th className="text-right px-5 py-3 text-xs text-muted-foreground font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No residents found.</td></tr>
              )}
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary flex-shrink-0">
                        {r.full_name?.[0] || '?'}
                      </div>
                      <div>
                        <Link to={`/admin/residents/${r.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                          {r.full_name}
                        </Link>
                        <div className="text-muted-foreground text-xs">{r.resident_id || r.id?.slice(0, 8)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted-foreground hidden md:table-cell">{getCampName(r.camp_id)}</td>
                  <td className="px-5 py-4"><TierBadge tier={r.tier || 'newcomer'} /></td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="font-display font-bold text-accent">{r.reintegration_score || 0}</span>
                    <span className="text-muted-foreground text-xs ml-1">/1000</span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="font-display font-semibold text-foreground">{(r.nac_balance || 0).toFixed(1)} NAC</span>
                  </td>
                  <td className="px-5 py-4">
                    {isCheckedIn(r.id) ? (
                      <span className="flex items-center gap-1 text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-1 rounded-full w-fit">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" /> Checked In
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">{r.status || 'active'}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {isCheckedIn(r.id) ? (
                        <Button size="sm" variant="outline" onClick={() => handleCheckout(r)}
                          className="rounded-full text-xs border-border gap-1 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30">
                          <LogOutIcon className="w-3 h-3" /> Check Out
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => setCheckInResident(r)}
                          className="rounded-full text-xs border-border gap-1 hover:bg-primary/10 hover:text-primary hover:border-primary/30">
                          <LogIn className="w-3 h-3" /> Check In
                        </Button>
                      )}
                      <Link to={`/admin/residents/${r.id}`}>
                        <Button size="sm" variant="ghost" className="rounded-full text-xs text-muted-foreground">View</Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {checkInResident && (
        <CheckInModal
          resident={checkInResident}
          camps={camps}
          onClose={() => setCheckInResident(null)}
          onCheckedIn={(log) => {
            setTimeLogs(tl => [...tl, log]);
            setCheckInResident(null);
          }}
        />
      )}
    </div>
  );
}
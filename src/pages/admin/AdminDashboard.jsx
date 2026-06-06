import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Users, Building2, Zap, TrendingUp, Award, Clock, UserCheck, AlertCircle } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import ImpactCalculator from '@/components/admin/ImpactCalculator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Link } from 'react-router-dom';
import TierBadge from '@/components/ui/TierBadge';
import NACCounter from '@/components/ui/NACCounter';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="glass border border-border/50 rounded-xl p-3 text-sm">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} className="font-semibold" style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdminDashboard() {
  const [residents, setResidents] = useState([]);
  const [camps, setCamps] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reintegrations, setReintegrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.Resident.list('-created_date', 100),
      base44.entities.Camp.list(),
      base44.entities.NACTransaction.list('-created_date', 200),
      base44.entities.ReintegrationRequest.list('-created_date', 50),
    ]).then(([r, c, t, ri]) => {
      setResidents(r);
      setCamps(c);
      setTransactions(t);
      setReintegrations(ri);
      setLoading(false);
    });
  }, []);

  const totalNAC = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
  const avgScore = residents.length ? Math.round(residents.reduce((s, r) => s + (r.reintegration_score || 0), 0) / residents.length) : 0;
  const citizenReady = residents.filter(r => r.tier === 'citizen_ready').length;
  const pendingReintegration = reintegrations.filter(r => r.status === 'pending').length;

  const tierCounts = ['newcomer', 'apprentice', 'contributor', 'citizen_ready'].map(tier => ({
    tier: tier.replace('_', ' ').toUpperCase(),
    count: residents.filter(r => r.tier === tier).length
  }));

  const recentResidents = residents.slice(0, 5);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-black text-4xl text-foreground">OVERSIGHT COMMAND</h1>
          <p className="text-muted-foreground mt-1">Project Renaissance · Vieques Island · Population: 136 Active Residents</p>
        </div>
        <Link to="/admin/residents/new" className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-full font-semibold text-sm glow-btn hover:scale-105 transition-all">
          <Users className="w-4 h-4" /> Intake Resident
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Residents" value={residents.length} icon={Users} color="blue" />
        <StatCard label="Active Facilities" value={camps.filter(c => c.status === 'active').length} icon={Building2} color="purple" />
        <StatCard label="NAC Distributed" value={`${Math.round(totalNAC).toLocaleString()}`} icon={Zap} color="gold" />
        <StatCard label="Avg. Score" value={avgScore} icon={TrendingUp} color="green" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Citizen-Ready" value={citizenReady} icon={Award} color="gold" />
        <StatCard label="Reintegrated" value={residents.filter(r => r.status === 'reintegrated').length} icon={UserCheck} color="green" />
        <StatCard label="Pending Review" value={pendingReintegration} icon={AlertCircle} color="blue" />
        <StatCard label="Active Camps" value={camps.length} icon={Building2} color="purple" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Tier distribution */}
        <div className="glass rounded-2xl p-6 border border-border/50">
          <h3 className="font-display font-bold text-xl mb-6">RESIDENT TIER DISTRIBUTION</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={tierCounts} barSize={36}>
              <XAxis dataKey="tier" tick={{ fill: '#6B7280', fontSize: 10, fontFamily: 'Barlow Condensed' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* NAC summary */}
        <div className="glass rounded-2xl p-6 border border-border/50">
          <h3 className="font-display font-bold text-xl mb-4">NAC ECONOMY</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-accent/5 border border-accent/20">
              <span className="text-muted-foreground text-sm">Total NAC Minted</span>
              <NACCounter value={Math.round(totalNAC)} size="md" />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-muted-foreground text-sm">In Housing Funds</span>
              <span className="font-display font-bold text-primary text-xl">
                {residents.reduce((s, r) => s + (r.nac_housing_fund || 0), 0).toLocaleString()} NAC
              </span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <span className="text-muted-foreground text-sm">Resident Wallets</span>
              <span className="font-display font-bold text-green-400 text-xl">
                {residents.reduce((s, r) => s + (r.nac_balance || 0), 0).toLocaleString()} NAC
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent residents */}
      <div className="glass rounded-2xl border border-border/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
          <h3 className="font-display font-bold text-xl">RECENT RESIDENTS</h3>
          <Link to="/admin/residents" className="text-primary text-sm hover:underline">View All</Link>
        </div>
        <div className="divide-y divide-border/30">
          {recentResidents.length === 0 && (
            <div className="px-6 py-8 text-center text-muted-foreground">No residents yet — start with intake.</div>
          )}
          {recentResidents.map((r) => (
            <Link key={r.id} to={`/admin/residents/${r.id}`} className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-lg bg-primary/10 text-primary">
                {r.full_name?.[0] || '?'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground">{r.full_name}</div>
                <div className="text-muted-foreground text-xs">{r.resident_id || r.id?.slice(0, 8)}</div>
              </div>
              <TierBadge tier={r.tier || 'newcomer'} />
              <div className="text-right hidden sm:block">
                <div className="font-display font-bold text-accent">{r.reintegration_score || 0}</div>
                <div className="text-muted-foreground text-xs">Score</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* National Impact Calculator */}
      <ImpactCalculator />

      {/* Camps overview */}
      {camps.length > 0 && (
        <div className="glass rounded-2xl border border-border/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-border/50 flex items-center justify-between">
            <h3 className="font-display font-bold text-xl">FACILITIES</h3>
            <Link to="/admin/camps" className="text-primary text-sm hover:underline">Manage</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {camps.map((camp) => {
              const campResidents = residents.filter(r => r.camp_id === camp.id);
              const occupancyPct = camp.capacity ? Math.round((campResidents.length / camp.capacity) * 100) : 0;
              return (
                <div key={camp.id} className="glass rounded-xl p-4 border border-border/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-foreground">{camp.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${camp.status === 'active' ? 'bg-green-400/10 text-green-400' : 'bg-muted text-muted-foreground'}`}>
                      {camp.status}
                    </span>
                  </div>
                  <div className="text-muted-foreground text-xs mb-3">{camp.location}</div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Occupancy</span>
                    <span className="font-semibold">{campResidents.length} / {camp.capacity || '∞'}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${Math.min(occupancyPct, 100)}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
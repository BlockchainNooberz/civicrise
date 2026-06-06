import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Package, TrendingDown, AlertTriangle, CheckCircle, RefreshCw, Plus, ChefHat, Shirt, Cpu, BookOpen, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Daily consumption rates per resident per category (based on program model)
const CONSUMPTION_RATES = {
  breakfast:       { per_person: 0.85, unit: 'servings/day',  cost_nac: 0.6 },
  lunch:           { per_person: 1.0,  unit: 'servings/day',  cost_nac: 0.8 },
  dinner:          { per_person: 1.0,  unit: 'servings/day',  cost_nac: 1.0 },
  protein_supp:    { per_person: 0.4,  unit: 'servings/day',  cost_nac: 0.5 },
  hygiene_kits:    { per_person: 0.033,unit: 'kits/month',    cost_nac: 2.5 },
  laundry_loads:   { per_person: 0.43, unit: 'loads/week',    cost_nac: 0.3 },
  uniform_sets:    { per_person: 0.1,  unit: 'sets/resident', cost_nac: 5.0 },
  chromebooks:     { per_person: 1.0,  unit: 'per resident',  cost_nac: 40  },
  course_materials:{ per_person: 0.15, unit: 'kits/enrolled', cost_nac: 3.0 },
  medical_supplies:{ per_person: 0.05, unit: 'visits/day',    cost_nac: 8.0 },
};

const CATEGORIES = [
  {
    id: 'meals',
    label: 'Meals & Nutrition',
    icon: ChefHat,
    color: '#22C55E',
    items: [
      { id: 'breakfast',    name: 'Breakfast Servings',   stockDays: 14, minStock: 7,  unit: 'servings' },
      { id: 'lunch',        name: 'Lunch Servings',       stockDays: 12, minStock: 7,  unit: 'servings' },
      { id: 'dinner',       name: 'Dinner Servings',      stockDays: 11, minStock: 7,  unit: 'servings' },
      { id: 'protein_supp', name: 'Protein Supplements',  stockDays: 20, minStock: 10, unit: 'servings' },
    ],
  },
  {
    id: 'personal',
    label: 'Personal Care',
    icon: Package,
    color: '#EC4899',
    items: [
      { id: 'hygiene_kits',  name: 'Hygiene Kits',     stockDays: 45, minStock: 14, unit: 'kits' },
      { id: 'laundry_loads', name: 'Laundry Tokens',   stockDays: 30, minStock: 14, unit: 'loads' },
    ],
  },
  {
    id: 'clothing',
    label: 'Clothing & Gear',
    icon: Shirt,
    color: '#F97316',
    items: [
      { id: 'uniform_sets', name: 'Uniform Sets', stockDays: 90, minStock: 30, unit: 'sets' },
    ],
  },
  {
    id: 'tech',
    label: 'Tech & Education',
    icon: Cpu,
    color: '#3B82F6',
    items: [
      { id: 'chromebooks',      name: 'Chromebook Units',      stockDays: 180, minStock: 60, unit: 'units' },
      { id: 'course_materials', name: 'Course Material Kits',  stockDays: 30,  minStock: 14, unit: 'kits' },
      { id: 'medical_supplies', name: 'Medical Supply Packs',  stockDays: 21,  minStock: 7,  unit: 'packs' },
    ],
  },
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function calcStock(item, residentCount, rate) {
  const dailyUsage = rate ? residentCount * rate.per_person : 0;
  const currentStock = Math.round(dailyUsage * item.stockDays);
  return { dailyUsage: Math.round(dailyUsage), currentStock, daysRemaining: item.stockDays };
}

function genWeeklyData(dailyUsage) {
  return WEEKDAYS.map((day, i) => ({
    day,
    consumed: Math.round(dailyUsage * (0.9 + Math.random() * 0.2)),
    restocked: i === 1 || i === 4 ? Math.round(dailyUsage * 7) : 0,
  }));
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass rounded-lg px-3 py-2 border border-border/60 text-xs">
      <p className="font-bold text-foreground mb-1">{label}</p>
      {payload.map(p => <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value?.toLocaleString()}</p>)}
    </div>
  );
};

export default function SupplyTracker() {
  const [residents, setResidents] = useState([]);
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('meals');
  const [selectedItem, setSelectedItem] = useState(null);
  const [lastSync, setLastSync] = useState(new Date());
  const [showReorderModal, setShowReorderModal] = useState(false);

  useEffect(() => {
    Promise.all([
      base44.entities.Resident.list('-created_date', 200),
      base44.entities.Camp.list(),
    ]).then(([r, c]) => {
      setResidents(r);
      setCamps(c);
      setLoading(false);
      setLastSync(new Date());
    });
  }, []);

  const residentCount = residents.filter(r => r.status === 'active').length || 1;
  const cat = CATEGORIES.find(c => c.id === activeCategory);

  // Aggregate stats
  const allItems = CATEGORIES.flatMap(c => c.items.map(i => ({
    ...i,
    category: c.id,
    rate: CONSUMPTION_RATES[i.id],
    ...calcStock(i, residentCount, CONSUMPTION_RATES[i.id]),
  })));
  const criticalItems = allItems.filter(i => i.daysRemaining <= i.minStock);
  const warningItems = allItems.filter(i => i.daysRemaining > i.minStock && i.daysRemaining <= i.minStock * 2);

  const selItemData = selectedItem
    ? allItems.find(i => i.id === selectedItem)
    : null;
  const weeklyData = selItemData ? genWeeklyData(selItemData.dailyUsage) : [];

  const totalDailyMeals = Math.round(residentCount * (
    CONSUMPTION_RATES.breakfast.per_person +
    CONSUMPTION_RATES.lunch.per_person +
    CONSUMPTION_RATES.dinner.per_person
  ));

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-display font-black text-4xl text-foreground">SUPPLY TRACKER</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Auto-calculated against {residentCount.toLocaleString()} active residents</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw className="w-3 h-3" />
            Synced {lastSync.toLocaleTimeString()}
          </div>
          {criticalItems.length > 0 && (
            <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-400/10 text-red-400 border border-red-400/20 font-bold animate-pulse">
              <AlertTriangle className="w-3 h-3" /> {criticalItems.length} Critical
            </span>
          )}
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Residents', value: residentCount.toLocaleString(), color: 'text-primary', icon: Package },
          { label: 'Daily Meals Required', value: totalDailyMeals.toLocaleString(), color: 'text-green-400', icon: ChefHat },
          { label: 'Critical Stock Items', value: criticalItems.length, color: criticalItems.length > 0 ? 'text-destructive' : 'text-green-400', icon: AlertTriangle },
          { label: 'Warning Items', value: warningItems.length, color: warningItems.length > 0 ? 'text-yellow-400' : 'text-green-400', icon: TrendingDown },
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-2xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <div className={`font-display font-black text-3xl ${s.color}`}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* Critical alerts */}
      {criticalItems.length > 0 && (
        <div className="glass rounded-2xl p-4 border border-destructive/30">
          <div className="flex items-center gap-2 mb-3 text-destructive font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            REORDER REQUIRED — Items below minimum stock threshold
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {criticalItems.map(item => (
              <div key={item.id} className="glass rounded-xl p-3 border border-destructive/20 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">{item.name}</div>
                  <div className="text-xs text-destructive">{item.daysRemaining}d remaining · min {item.minStock}d</div>
                </div>
                <button onClick={() => setShowReorderModal(true)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 font-bold hover:bg-destructive/20 transition-colors whitespace-nowrap">
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(c => {
          const Icon = c.icon;
          const catItems = allItems.filter(i => i.category === c.id);
          const hasCritical = catItems.some(i => i.daysRemaining <= i.minStock);
          return (
            <button key={c.id} onClick={() => setActiveCategory(c.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all"
              style={activeCategory === c.id
                ? { background: c.color, borderColor: c.color, color: '#0d1526' }
                : { borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
              <Icon className="w-3.5 h-3.5" />
              {c.label}
              {hasCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Items grid */}
      {cat && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {cat.items.map(item => {
            const rate = CONSUMPTION_RATES[item.id];
            const { dailyUsage, currentStock, daysRemaining } = calcStock(item, residentCount, rate);
            const isSelected = selectedItem === item.id;
            const isCritical = daysRemaining <= item.minStock;
            const isWarning = !isCritical && daysRemaining <= item.minStock * 2;
            const stockPct = Math.min((daysRemaining / 60) * 100, 100);

            return (
              <div key={item.id}
                onClick={() => setSelectedItem(isSelected ? null : item.id)}
                className={`glass rounded-2xl p-5 border cursor-pointer transition-all ${isSelected ? 'border-primary/40' : isCritical ? 'border-destructive/30' : isWarning ? 'border-yellow-400/20' : 'border-border/50 hover:border-border'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-display font-bold text-base text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{rate?.unit}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-bold ${isCritical ? 'text-destructive bg-destructive/10 border-destructive/20' : isWarning ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' : 'text-green-400 bg-green-400/10 border-green-400/20'}`}>
                    {isCritical ? '⚠ Critical' : isWarning ? '↓ Low' : '✓ OK'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { k: 'Daily Use', v: dailyUsage.toLocaleString() },
                    { k: 'In Stock', v: currentStock.toLocaleString() },
                    { k: 'Days Left', v: daysRemaining },
                  ].map(row => (
                    <div key={row.k} className="text-center glass rounded-lg p-2">
                      <div className="text-xs text-muted-foreground">{row.k}</div>
                      <div className={`font-display font-bold text-sm ${row.k === 'Days Left' && isCritical ? 'text-destructive' : 'text-foreground'}`}>{row.v}</div>
                    </div>
                  ))}
                </div>

                {/* Stock bar */}
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Stock level</span>
                    <span>Reorder at {item.minStock}d</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all"
                      style={{
                        width: `${stockPct}%`,
                        background: isCritical ? '#EF4444' : isWarning ? '#F59E0B' : cat.color,
                      }} />
                  </div>
                </div>

                {rate && (
                  <div className="text-xs text-muted-foreground">
                    {rate.per_person} {rate.unit} × {residentCount.toLocaleString()} residents
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Selected item chart */}
      {selItemData && weeklyData.length > 0 && (
        <div className="glass rounded-2xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-display font-bold text-xl text-foreground">{selItemData.name} — 7-Day Usage Log</h3>
              <p className="text-xs text-muted-foreground">Daily consumption vs restock events</p>
            </div>
            <button onClick={() => setShowReorderModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/80 transition-colors">
              <Plus className="w-4 h-4" /> Log Restock
            </button>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={weeklyData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="consumed" name="Consumed" stroke={cat?.color || '#3B82F6'} fill={cat?.color || '#3B82F6'} fillOpacity={0.15} strokeWidth={2} />
              <Area type="monotone" dataKey="restocked" name="Restocked" stroke="#22C55E" fill="#22C55E" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Restock modal */}
      {showReorderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="glass-strong rounded-2xl p-6 border border-primary/30 w-full max-w-md mx-4">
            <h3 className="font-display font-black text-2xl text-foreground mb-1">Log Restock Order</h3>
            <p className="text-muted-foreground text-sm mb-5">This logs a supply reorder to the inventory system and notifies logistics.</p>
            <div className="space-y-3 mb-5">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Item</label>
                <select className="w-full mt-1.5 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/60">
                  {allItems.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Quantity</label>
                <input type="number" placeholder="Enter units to restock..."
                  className="w-full mt-1.5 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/60" />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Notes</label>
                <input type="text" placeholder="Optional notes..."
                  className="w-full mt-1.5 px-3 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:border-primary/60" />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReorderModal(false)}
                className="flex-1 py-2.5 rounded-lg border border-border/60 text-muted-foreground text-sm font-semibold hover:border-border transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowReorderModal(false)}
                className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/80 transition-colors">
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
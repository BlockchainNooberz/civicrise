import { ChefHat, Package, Truck, TrendingDown, Leaf, DollarSign } from 'lucide-react';

const MEAL_PLAN = [
  {
    tier: 'Newcomer',
    color: '#94a3b8',
    meals: ['Cafeteria buffet — 3 meals/day', 'Rotating menu: 28-day cycle', 'Nutrition-verified by staff dietician', 'Coffee, tea, water included', '~3,200 calories/day option'],
    cost_per_day: '$8.40',
  },
  {
    tier: 'Apprentice',
    color: '#3B82F6',
    meals: ['All of Newcomer tier', 'Priority seating windows', 'Protein supplement bar access', 'Cultural cuisine Fridays', 'Cooking class enrollment option'],
    cost_per_day: '$9.20',
  },
  {
    tier: 'Contributor',
    color: '#8B5CF6',
    meals: ['All above +', 'NAC Marketplace meal upgrades', 'Private dining room 1x/week', 'Special dietary requests honored', 'Meal prep workshop participation'],
    cost_per_day: '$10.50',
  },
  {
    tier: 'Citizen-Ready',
    color: '#F59E0B',
    meals: ['Full choice menu', 'In-unit kitchenette (cook own meals)', 'Farm-to-table premium option', 'Chef\'s table events (NAC spend)', 'Catering certification path'],
    cost_per_day: '$12.80',
  },
];

const SUPPLY_CATEGORIES = [
  {
    category: 'Personal Care',
    icon: '🧴',
    color: '#EC4899',
    items: ['Shampoo, conditioner, soap', 'Toothbrush + toothpaste', 'Deodorant', 'Razors, feminine hygiene', 'Laundry service (2x/week)'],
    monthly_cost: '$38/resident',
  },
  {
    category: 'Clothing',
    icon: '👕',
    color: '#F97316',
    items: ['3 work uniforms issued', 'Seasonal outerwear', 'Safety gear (trades)', 'Tier upgrade clothing allowance', 'Laundry credit via NAC'],
    monthly_cost: '$55 (intake only)',
  },
  {
    category: 'Tech & Tools',
    icon: '💻',
    color: '#3B82F6',
    items: ['Chromebook issued on intake', 'Shared device pool (premium)', 'Trade tools (loaner system)', 'Safety PPE for all tracks', 'Smart ID wristband (NAC + access)'],
    monthly_cost: '$120/resident (amortized)',
  },
  {
    category: 'Educational Materials',
    icon: '📚',
    color: '#F59E0B',
    items: ['All course materials included', 'Workbooks, tools, supplies', 'Certification exam fees covered', 'Digital library access', 'Language learning app subscriptions'],
    monthly_cost: '$45/resident',
  },
];

const COST_BREAKDOWN = [
  { label: 'Food & Nutrition', pct: 31, color: '#22C55E', monthly: '$2.8M' },
  { label: 'Staffing', pct: 28, color: '#3B82F6', monthly: '$2.5M' },
  { label: 'Housing / Utilities', pct: 18, color: '#8B5CF6', monthly: '$1.6M' },
  { label: 'Medical', pct: 11, color: '#EC4899', monthly: '$990k' },
  { label: 'Education / Tech', pct: 7, color: '#F59E0B', monthly: '$630k' },
  { label: 'Personal Supplies', pct: 5, color: '#F97316', monthly: '$450k' },
];

export default function MealsSupplies() {
  const totalMonthly = 28500 * 320; // ~$320/resident/mo

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold tracking-widest mb-3">
          SECTION 04 — MEALS & SUPPLIES
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">LOGISTICS & OPERATIONS PLAN</h2>
        <p className="text-muted-foreground max-w-2xl">
          Full cost breakdown for feeding, clothing, and equipping 28,500 residents. Designed for scale — costs drop 40% as on-site agriculture reaches capacity.
        </p>
      </div>

      {/* Cost summary bar */}
      <div className="glass-strong rounded-2xl p-6 border border-green-400/20 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-display text-4xl font-black text-gradient-gold">$320</div>
            <div className="text-muted-foreground text-sm">per resident / per month (fully loaded)</div>
          </div>
          <div className="text-right">
            <div className="font-display text-4xl font-black text-green-400">$9.1M</div>
            <div className="text-muted-foreground text-sm">total monthly operating cost (at 28.5k residents)</div>
          </div>
        </div>
        {/* Stacked bar */}
        <div className="w-full h-6 rounded-full overflow-hidden flex">
          {COST_BREAKDOWN.map(c => (
            <div key={c.label} title={`${c.label}: ${c.pct}%`}
              className="h-full transition-all" style={{ width: `${c.pct}%`, background: c.color }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {COST_BREAKDOWN.map(c => (
            <div key={c.label} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: c.color }} />
              <span className="text-xs text-muted-foreground">{c.label} <span className="font-bold" style={{ color: c.color }}>{c.pct}%</span></span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg bg-green-400/5 border border-green-400/20">
          <div className="flex items-center gap-2 text-green-400 text-xs font-bold mb-1">
            <TrendingDown className="w-3.5 h-3.5" />
            COST REDUCTION PATHWAY
          </div>
          <p className="text-xs text-muted-foreground">NYC currently spends <strong className="text-foreground">$60,000+/resident/year</strong> ($5,000/mo) on shelter. Project Renaissance delivers better outcomes at <strong className="text-foreground">$3,840/year ($320/mo)</strong> — a <strong className="text-green-400">94% cost reduction</strong> per individual served. Gov savings fund the program.</p>
        </div>
      </div>

      {/* Meal tiers */}
      <h3 className="font-display font-black text-2xl text-foreground mb-4 flex items-center gap-2">
        <ChefHat className="w-6 h-6 text-accent" /> Meal Plans by Tier
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {MEAL_PLAN.map(m => (
          <div key={m.tier} className="glass rounded-xl p-4 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <span className="font-display font-black text-base" style={{ color: m.color }}>{m.tier}</span>
              <span className="text-xs font-bold text-foreground bg-secondary px-2 py-0.5 rounded-full">{m.cost_per_day}/day</span>
            </div>
            <ul className="space-y-1.5">
              {m.meals.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Supply categories */}
      <h3 className="font-display font-black text-2xl text-foreground mb-4 flex items-center gap-2">
        <Package className="w-6 h-6 text-primary" /> Supply Allocations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {SUPPLY_CATEGORIES.map(s => (
          <div key={s.category} className="glass rounded-xl p-5 border border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-display font-black text-lg text-foreground">{s.category}</span>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-full border" style={{ color: s.color, borderColor: `${s.color}40`, background: `${s.color}10` }}>{s.monthly_cost}</span>
            </div>
            <ul className="space-y-1">
              {s.items.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Supply chain */}
      <div className="glass rounded-xl p-5 border border-border/50">
        <h3 className="font-display font-black text-lg mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5 text-muted-foreground" /> Supply Chain Strategy
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Leaf, label: 'On-Site Production', color: '#22C55E', desc: 'Target 85% food self-sufficiency via vertical farms by Month 8. Bulk wholesale supplements the rest.', tag: 'Primary' },
            { icon: Truck, label: 'Bulk Procurement', color: '#3B82F6', desc: 'Government contract pricing. USDA + DoD surplus channels. National Guard logistics partnership for initial setup.', tag: 'Secondary' },
            { icon: DollarSign, label: 'NAC Economy Loop', color: '#F59E0B', desc: 'Residents earn through participation, spend internally. Marketplace stimulates micro-economy and reduces external dependency.', tag: 'Internal' },
          ].map(s => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-xl p-4 border border-border/30">
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                  <span className="font-bold text-sm text-foreground">{s.label}</span>
                  <span className="text-xs px-1.5 py-0.5 rounded-full ml-auto" style={{ color: s.color, background: `${s.color}15` }}>{s.tag}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
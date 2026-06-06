import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ShoppingBag, Zap, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TierBadge from '@/components/ui/TierBadge';
import NACCounter from '@/components/ui/NACCounter';
import { toast } from 'sonner';
import { format } from 'date-fns';

const SEED_ITEMS = [
  { name: 'Private Room Upgrade', description: 'Upgrade from shared to private accommodation for 7 days', category: 'accommodation', nac_price: 100, min_tier: 'apprentice', icon: '🏠' },
  { name: 'Premium Meal Plan', description: 'Chef-prepared meals upgrade for 7 days', category: 'meals', nac_price: 50, min_tier: 'newcomer', icon: '🍽️' },
  { name: 'Gym & Fitness Access', description: 'Full gym access for 30 days', category: 'recreation', nac_price: 30, min_tier: 'newcomer', icon: '💪' },
  { name: 'Recreation Credits', description: 'Entertainment & social activity credits', category: 'social', nac_price: 20, min_tier: 'newcomer', icon: '🎯' },
  { name: 'Personal Care Kit', description: 'Premium hygiene & grooming bundle', category: 'personal_care', nac_price: 25, min_tier: 'newcomer', icon: '🪥' },
  { name: 'Advanced Course Access', description: 'Unlock an advanced-level course of your choice', category: 'education', nac_price: 80, min_tier: 'apprentice', icon: '📚' },
  { name: 'Outdoor Adventure Day', description: 'Day trip to local outdoor activities', category: 'recreation', nac_price: 60, min_tier: 'contributor', icon: '🏔️' },
  { name: 'Community Leader Role', description: 'Lead a community project and earn mentoring credits', category: 'social', nac_price: 0, min_tier: 'contributor', icon: '⭐' },
];

const tierOrder = ['newcomer', 'apprentice', 'contributor', 'citizen_ready'];

export default function ResidentMarketplace() {
  const [items, setItems] = useState([]);
  const [resident, setResident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(null);

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1).then(async ([r]) => {
      if (!r) { setLoading(false); return; }
      setResident(r);
      let marketItems = await base44.entities.MarketplaceItem.list();
      if (!marketItems.length) {
        marketItems = await Promise.all(SEED_ITEMS.map(i => base44.entities.MarketplaceItem.create(i)));
      }
      setItems(marketItems);
      setLoading(false);
    });
  }, []);

  const canAfford = (item) => (resident?.nac_balance || 0) >= item.nac_price;
  const meetsMinTier = (item) => {
    const residentTierIdx = tierOrder.indexOf(resident?.tier || 'newcomer');
    const itemTierIdx = tierOrder.indexOf(item.min_tier || 'newcomer');
    return residentTierIdx >= itemTierIdx;
  };

  const purchase = async (item) => {
    if (!canAfford(item) || !meetsMinTier(item)) return;
    setPurchasing(item.id);
    const newBal = (resident.nac_balance || 0) - item.nac_price;
    const updated = await base44.entities.Resident.update(resident.id, { nac_balance: newBal });
    if (item.nac_price > 0) {
      await base44.entities.NACTransaction.create({
        resident_id: resident.id, amount: -item.nac_price, type: 'marketplace_spend',
        description: `Purchased: ${item.name}`, balance_after: newBal,
        date: format(new Date(), 'yyyy-MM-dd')
      });
    }
    setResident(updated);
    setPurchasing(null);
    toast.success(`${item.name} unlocked!`);
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  const categoryColors = {
    accommodation: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    meals: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
    recreation: 'text-green-400 bg-green-400/10 border-green-400/20',
    personal_care: 'text-pink-400 bg-pink-400/10 border-pink-400/20',
    education: 'text-primary bg-primary/10 border-primary/20',
    social: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-4xl">MARKETPLACE</h1>
          <p className="text-muted-foreground mt-1">Spend your NAC on upgrades and perks</p>
        </div>
        {resident && (
          <div className="glass rounded-xl border border-accent/20 px-4 py-2.5">
            <div className="text-muted-foreground text-xs mb-1">Your Balance</div>
            <NACCounter value={resident.nac_balance || 0} size="sm" />
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.filter(i => i.available !== false).map(item => {
          const affordable = canAfford(item);
          const tierMet = meetsMinTier(item);
          const canBuy = affordable && tierMet;
          const catColor = categoryColors[item.category] || 'text-muted-foreground bg-muted border-border';

          return (
            <div key={item.id} className={`glass rounded-2xl border p-5 flex flex-col transition-all ${canBuy ? 'border-border/50 hover:border-primary/20' : 'border-border/30 opacity-60'}`}>
              <div className="text-4xl mb-3">{item.icon || '📦'}</div>
              <div className={`text-xs px-2 py-0.5 rounded-full font-semibold w-fit border ${catColor} mb-2`}>
                {item.category?.replace('_', ' ')}
              </div>
              <h3 className="font-display font-bold text-base text-foreground mb-1">{item.name}</h3>
              <p className="text-muted-foreground text-xs flex-1 mb-3">{item.description}</p>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <span className="font-display font-black text-lg text-accent">{item.nac_price}</span>
                  <span className="text-muted-foreground text-xs">NAC</span>
                </div>
                {item.min_tier !== 'newcomer' && <TierBadge tier={item.min_tier} />}
              </div>
              <Button
                onClick={() => purchase(item)}
                disabled={!canBuy || purchasing === item.id}
                className={`w-full rounded-full text-sm ${canBuy ? 'bg-primary text-primary-foreground glow-btn' : 'bg-muted text-muted-foreground cursor-not-allowed'}`}>
                {!tierMet ? 'Tier Required' : !affordable ? 'Insufficient NAC' : purchasing === item.id ? 'Unlocking...' : (
                  <span className="flex items-center gap-1 justify-center"><Zap className="w-3 h-3" /> Unlock</span>
                )}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
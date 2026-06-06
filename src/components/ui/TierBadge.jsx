import { cn } from '@/lib/utils';

const TIERS = {
  newcomer: { label: 'NEWCOMER', color: 'text-gray-400 bg-gray-400/10 border-gray-400/20' },
  apprentice: { label: 'APPRENTICE', color: 'text-primary bg-primary/10 border-primary/20' },
  contributor: { label: 'CONTRIBUTOR', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' },
  citizen_ready: { label: 'CITIZEN-READY', color: 'text-accent bg-accent/10 border-accent/20' },
};

export default function TierBadge({ tier = 'newcomer', size = 'sm' }) {
  const t = TIERS[tier] || TIERS.newcomer;
  return (
    <span className={cn(
      "font-display font-bold border rounded-full tracking-wider uppercase",
      t.color,
      size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'
    )}>
      {t.label}
    </span>
  );
}
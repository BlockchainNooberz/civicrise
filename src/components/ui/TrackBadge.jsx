import { cn } from '@/lib/utils';
import { Cpu, Wrench, BookHeart } from 'lucide-react';

const TRACKS = {
  ai_tech: { label: 'AI & Tech', color: 'text-primary bg-primary/10 border-primary/20', Icon: Cpu },
  physical_trades: { label: 'Physical Trades', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20', Icon: Wrench },
  life_skills: { label: 'Life Skills', color: 'text-green-400 bg-green-400/10 border-green-400/20', Icon: BookHeart },
};

export default function TrackBadge({ track, size = 'sm' }) {
  const t = TRACKS[track] || TRACKS.ai_tech;
  const Icon = t.Icon;
  return (
    <span className={cn(
      "inline-flex items-center gap-1 font-semibold border rounded-full",
      t.color,
      size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1'
    )}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {t.label}
    </span>
  );
}
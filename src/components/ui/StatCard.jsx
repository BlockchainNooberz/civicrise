import { cn } from '@/lib/utils';

export default function StatCard({ label, value, icon: Icon, trend, color = 'blue', className }) {
  const colors = {
    blue: { bg: 'bg-primary/10', border: 'border-primary/20', text: 'text-primary', glow: 'glow-blue' },
    gold: { bg: 'bg-accent/10', border: 'border-accent/20', text: 'text-accent', glow: 'glow-gold' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400', glow: '' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', glow: '' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className={cn("glass rounded-2xl p-5 border", c.border, className)}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-xl", c.bg)}>
          <Icon className={cn("w-5 h-5", c.text)} />
        </div>
        {trend && (
          <span className="text-green-400 text-xs font-semibold bg-green-400/10 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <div className={cn("font-display font-black text-3xl", c.text)}>{value}</div>
      <div className="text-muted-foreground text-sm mt-1 font-medium">{label}</div>
    </div>
  );
}
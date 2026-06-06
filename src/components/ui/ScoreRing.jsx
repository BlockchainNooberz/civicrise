import { useEffect, useState } from 'react';

const TIER_COLORS = {
  newcomer: '#6B7280',
  apprentice: '#3B82F6',
  contributor: '#8B5CF6',
  citizen_ready: '#F59E0B',
};

const TIER_LABELS = {
  newcomer: 'NEWCOMER',
  apprentice: 'APPRENTICE',
  contributor: 'CONTRIBUTOR',
  citizen_ready: 'CITIZEN-READY',
};

export default function ScoreRing({ score = 0, tier = 'newcomer', size = 160, showLabel = true }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - 20) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(score / 1000, 1);
  const offset = circumference - progress * circumference;
  const color = TIER_COLORS[tier] || '#3B82F6';

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const animatedOffset = circumference - (Math.min(animatedScore / 1000, 1)) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          style={{
            transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 6px ${color}80)`
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black leading-none" style={{ fontSize: size * 0.22, color }}>
          {score}
        </span>
        <span className="text-muted-foreground font-body" style={{ fontSize: size * 0.07 }}>/ 1000</span>
        {showLabel && (
          <span className="font-display font-bold mt-1" style={{ fontSize: size * 0.075, color }}>
            {TIER_LABELS[tier]}
          </span>
        )}
      </div>
    </div>
  );
}
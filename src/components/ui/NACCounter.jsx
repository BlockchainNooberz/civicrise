import { useEffect, useState } from 'react';

export default function NACCounter({ value = 0, size = 'md', showIcon = true }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  };

  return (
    <div className="flex items-center gap-2">
      {showIcon && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-background"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444)', fontSize: 10 }}>
          N
        </div>
      )}
      <span className={`font-display font-black text-gradient-gold ${sizes[size]}`}>
        {display.toLocaleString()}
      </span>
      <span className="text-muted-foreground text-sm font-semibold">NAC</span>
    </div>
  );
}
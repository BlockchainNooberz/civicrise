import { useState } from 'react';
import { Trophy, Star, Zap, Users, Camera, Music, Gamepad2, Award, Crown, TrendingUp } from 'lucide-react';

const EVENTS = [
  {
    id: 'weekly',
    name: 'Weekly Beast Challenges',
    icon: '⚡',
    color: '#F59E0B',
    reward: '500–5,000 NAC',
    desc: 'MrBeast-designed weekly community challenges broadcast live to YouTube (30M+ viewers). Think: "First 500 residents to complete this obstacle course win a NAC jackpot." Mass participation, extreme fun, massive rewards.',
    examples: ['City-Wide Scavenger Hunt', 'Speed-Build Construction Challenge', 'Code & Create Hackathon Sprint', 'Community Cooking Tournament'],
  },
  {
    id: 'games',
    name: 'Beast Games Season Events',
    icon: '🏆',
    color: '#3B82F6',
    reward: '50,000 NAC Grand Prize',
    desc: 'Quarterly Beast Games elimination-style tournament. 1,000 contestants compete in multi-stage physical/mental challenges. Winner receives a life-changing NAC payout — enough to fully fund reintegration housing deposit.',
    examples: ['Physical Endurance Gauntlet', 'Knowledge Tower Climb', 'Team Strategy Wars', 'The Grand Finale: City Exit Challenge'],
  },
  {
    id: 'daily',
    name: 'Daily Mini-Games',
    icon: '🎮',
    color: '#8B5CF6',
    reward: '10–100 NAC',
    desc: 'Casual daily engagement challenges embedded in the app. Trivia, word games, skill quizzes, and task challenges that keep residents engaged and earning even outside formal programming.',
    examples: ['Morning Knowledge Quiz (+20 NAC)', 'Skill Speed-Run (+50 NAC)', 'Peer Mentoring Match (+35 NAC)', 'Community Vote Participation (+10 NAC)'],
  },
  {
    id: 'content',
    name: 'Content Creator Track',
    icon: '📹',
    color: '#EC4899',
    reward: 'Revenue share',
    desc: 'Residents who complete the Media & Content Creation course can produce their own YouTube, TikTok, and podcast content from the Beast studio. All ad revenue splits back into their NAC wallet. Success stories become viral marketing.',
    examples: ['Studio recording booth access', 'Beast editing software suite', 'Distribution via MrBeast network', 'Sponsorship pathway for top creators'],
  },
];

const DESIGN_PRINCIPLES = [
  { icon: Trophy, label: 'Reward-First Design', desc: 'Every activity has a visible, exciting payout. Motivation through achievement, not obligation.', color: '#F59E0B' },
  { icon: Camera, label: 'Content = Community', desc: 'Everything is broadcast-worthy. Residents become stars of their own reintegration story.', color: '#EC4899' },
  { icon: Users, label: 'Team Competition', desc: 'Team-based events build bonds. Sector vs Sector. Track vs Track. Rivals become family.', color: '#3B82F6' },
  { icon: Star, label: 'Viral Incentive', desc: 'Media coverage creates demand for more camps. The world watches. Residents inspire the next wave.', color: '#8B5CF6' },
  { icon: TrendingUp, label: 'Progress as Plot', desc: 'The reintegration journey is a compelling narrative arc. Newcomer to Citizen-Ready IS the show.', color: '#22C55E' },
  { icon: Crown, label: 'Champions Get Famous', desc: 'Beast Games winners go viral globally. Jobs, sponsorships, and opportunities find them. The ultimate reintegration tool.', color: '#F97316' },
];

export default function BeastGamesSection() {
  const [activeEvent, setActiveEvent] = useState('weekly');
  const event = EVENTS.find(e => e.id === activeEvent);

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold tracking-widest mb-3">
          SECTION 05 — COMMUNITY EXPERIENCE
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
          BEHAVIORAL COMPLIANCE <span className="text-gradient-gold">THROUGH STRUCTURED COMPETITION</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          The community experience layer is engineered to maximize voluntary compliance through positive reinforcement, competitive social dynamics, and reward-based behavior shaping — making structured participation feel like a game residents choose to win.
        </p>
      </div>

      {/* Hero banner */}
      <div className="relative rounded-2xl overflow-hidden mb-10 border border-yellow-400/20"
        style={{ background: 'linear-gradient(135deg, #0d1526 0%, #1a0d26 50%, #0d1a0d 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3B82F6 0%, transparent 50%)' }} />
        <div className="relative z-10 p-8 md:p-12 text-center">
          <div className="text-6xl mb-4">👑🎮🏆</div>
          <h3 className="font-display text-3xl md:text-5xl font-black text-foreground mb-4">
            "WHAT IF BECOMING A CITIZEN<br />
            <span className="text-gradient-gold">WAS THE ULTIMATE GAME?"</span>
          </h3>
          <p className="text-muted-foreground max-w-xl mx-auto text-base leading-relaxed">
            MrBeast's design philosophy: make doing the right thing more fun than doing nothing. Every challenge, every reward, every moment of progress — designed to be shareable, inspiring, and impossible to quit.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {[
              { label: 'Live Stream Events', value: '52/yr' },
              { label: 'NAC Prizes Distributed', value: '$2M+' },
              { label: 'Projected YouTube Views', value: '500M+' },
              { label: 'Resident Stars Created', value: '1,000+' },
            ].map(s => (
              <div key={s.label} className="text-center px-4">
                <div className="font-display text-2xl font-black text-accent">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event types */}
      <h3 className="font-display font-black text-2xl text-foreground mb-4">Event Programming</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {EVENTS.map(e => (
          <button key={e.id} onClick={() => setActiveEvent(e.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all`}
            style={activeEvent === e.id
              ? { background: e.color, borderColor: e.color, color: '#0d1526' }
              : { borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
            <span>{e.icon}</span>
            {e.name}
          </button>
        ))}
      </div>

      {event && (
        <div className="glass rounded-2xl p-6 border mb-10" style={{ borderColor: `${event.color}30` }}>
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{event.icon}</span>
                <div>
                  <h4 className="font-display font-black text-xl text-foreground">{event.name}</h4>
                  <div className="text-sm font-bold" style={{ color: event.color }}>Reward: {event.reward}</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{event.desc}</p>
            </div>
            <div className="md:w-64 flex-shrink-0">
              <div className="font-display font-bold text-xs tracking-wide mb-2 text-muted-foreground uppercase">Example Events</div>
              <div className="space-y-2">
                {event.examples.map((ex, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-background flex-shrink-0"
                      style={{ background: event.color }}>{i + 1}</div>
                    <span className="text-foreground">{ex}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Design principles */}
      <h3 className="font-display font-black text-2xl text-foreground mb-4">Beast Games Design Philosophy</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {DESIGN_PRINCIPLES.map(p => {
          const Icon = p.icon;
          return (
            <div key={p.label} className="glass rounded-xl p-5 border border-border/50 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30` }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: p.color }} />
                </div>
                <span className="font-display font-black text-base text-foreground">{p.label}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Partnership callout */}
      <div className="glass rounded-2xl p-6 border border-primary/20 text-center">
        <div className="font-display text-3xl font-black text-foreground mb-2">COMPLIANCE THROUGH COMPETITION</div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed mb-4">
          Structured competition is the most effective compliance architecture ever designed. When residents compete for NAC, status, and tier advancement, they self-regulate behavior, enforce community norms, and drive measurable participation without external coercion. The program funds itself through media rights while generating the data proving the model works at scale.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { label: 'MrBeast YouTube Subscribers', value: '340M+' },
            { label: 'Beast Games Season 1 Viewers', value: '50M+' },
            { label: 'Projected Sponsor Revenue/Yr', value: '$80M+' },
            { label: 'Program Cost Offset via Media', value: '~40%' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-black text-primary">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
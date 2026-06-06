import { useState } from 'react';
import { Youtube, TrendingUp, DollarSign, Heart, Globe, Star, Play, Zap, Award, Users, Camera, Crown } from 'lucide-react';

const MRBEAST_STATS = [
  { label: 'YouTube Subscribers', value: '360M+', color: '#FF0000', icon: Youtube },
  { label: 'Total YouTube Views', value: '60B+', color: '#F59E0B', icon: Play },
  { label: 'Beast Games Season 1 Entries', value: '5M+', color: '#3B82F6', icon: Users },
  { label: 'Beast Games S1 Netflix Views', value: '50M+', color: '#EC4899', icon: TrendingUp },
  { label: 'Annual Philanthropy', value: '$100M+', color: '#22C55E', icon: Heart },
  { label: 'MrBeast Burger / Feastables Rev', value: '$500M+', color: '#8B5CF6', icon: DollarSign },
];

const PITCH_POINTS = [
  {
    id: 'narrative',
    emoji: '🎬',
    title: 'The Greatest Story Ever Told on YouTube',
    color: '#F59E0B',
    body: "Every YouTube video has a beginning, middle, and end. Project Renaissance IS that story — played out over years, with 28,500 real characters, real stakes, and a real prize: a life. The reintegration arc from Newcomer → Citizen-Ready is the most emotionally resonant content ever produced. Not scripted. Not simulated. Completely real.",
    bullets: [
      'Week 1 of 100 newcomers — raw, honest, emotional — best-performing format on YouTube',
      '6-month transformation arcs: "I went from the streets of LA to building AI at Renaissance City"',
      'Beast Games Season 2 filmed entirely inside the dome — 30,000 potential contestants',
      'Beast Games GRAND PRIZE = full housing deposit + employer match outside the dome',
      'Daily vlogs, weekly challenges, monthly Beast Games eliminations — 52 events/year of content',
    ],
  },
  {
    id: 'revenue',
    emoji: '💰',
    title: 'The Business Model Is the Mission',
    color: '#22C55E',
    body: "MrBeast's existing philanthropy model already proves this: spend big, generate bigger returns via media. Renaissance is MrBeast philanthropy at civilization scale — and the economics are even better because the content is 10x more compelling than any prior project.",
    bullets: [
      'Estimated 5B+ views/year across all Renaissance content → $50M+ ad revenue',
      'Feastables / Beast Burger supply deals: feed 30k people at wholesale → brand exposure',
      'Brand sponsorships: Nike, Google, Samsung get to say their products trained 28,500 people',
      'Beast Games S2 Netflix deal projected $200M+ (S1 was already $100M+)',
      'Documentary series: "Renaissance Year One" — Oscar/Emmy-tier',
    ],
  },
  {
    id: 'legacy',
    emoji: '🏛️',
    title: 'The Legacy Play: What Beats $100M Philanthropy?',
    color: '#3B82F6',
    body: "MrBeast has already given away over $100M. He's said publicly his goal is to 'solve as many of the world's problems as possible before I die.' Project Renaissance is the system — not another one-off video. It's the infrastructure. It runs without him once launched. And it keeps creating content and changing lives indefinitely.",
    bullets: [
      "Currently no YouTube creator has built lasting infrastructure. This is the first.",
      'Renaissance becomes the template exported to 50+ cities in Year 3',
      'The NAC blockchain economy becomes a case study taught in every business school',
      'Presidential Medal of Freedom. Cover of Time. Nobel Peace Prize nomination territory.',
      '"I helped 3 million Americans rebuild their lives" — the greatest YouTube channel description ever written',
    ],
  },
  {
    id: 'creative',
    emoji: '🎮',
    title: 'The Creative Vision: Beast Games x The Truman Show x The Wire',
    color: '#8B5CF6',
    body: "The creative concept is unprecedented in entertainment history. A real, voluntary, gamified society — watched in real-time by hundreds of millions. Not reality TV, not a documentary. A living civilization that happens to be filmed. The storylines write themselves.",
    bullets: [
      'Sector vs Sector competitions — Trades District vs AI Quarter — tribal dynamics',
      '"The Leaderboard" — live NAC rankings visible to all 30 million YouTube subscribers',
      'The Mentor Arc: Citizen-Ready alumni return as coaches for the next class',
      'The Breakout: stories of people who entered with nothing and leave with $50k in NAC',
      'The Challenge Drop: MrBeast shows up unannounced with a $1M NAC challenge. No warning.',
    ],
  },
];

const COMPARABLE_PROJECTS = [
  { name: 'MrBeast: 100M Trees', raised: '$24M', result: '23M trees planted', views: '102M', year: '2019' },
  { name: 'Beast Games S1 (Netflix)', raised: '$5M prize', result: '$100M+ Netflix deal', views: '50M (launch week)', year: '2024' },
  { name: 'MrBeast: 1,000 Blind People See', raised: '$2M (surgery)', result: '1,000 sight restored', views: '280M', year: '2022' },
  { name: 'MrBeast: Build 100 Wells', raised: '$3M', result: '100 wells, 500k people', views: '180M', year: '2023' },
];

export default function MrBeastPitch() {
  const [activePoint, setActivePoint] = useState('narrative');
  const point = PITCH_POINTS.find(p => p.id === activePoint);

  return (
    <div>
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold tracking-widest mb-3">
          SECTION 07 — MRBEAST PARTNERSHIP PITCH
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-black text-foreground mb-3">
          THE PITCH TO <span className="text-gradient-gold">JIMMY DONALDSON</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl">
          Why Project Renaissance is the most compelling creative, philanthropic, and business opportunity MrBeast has ever been offered — backed by data, not vibes.
        </p>
      </div>

      {/* MrBeast stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
        {MRBEAST_STATS.map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="glass rounded-xl p-4 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4" style={{ color: s.color }} />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <div className="font-display text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            </div>
          );
        })}
      </div>

      {/* The Ask */}
      <div className="glass-strong rounded-2xl p-8 border border-yellow-400/30 mb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at center, #F59E0B, transparent 60%)' }} />
        <div className="relative">
          <div className="text-5xl mb-4">👑</div>
          <h3 className="font-display text-3xl md:text-4xl font-black text-foreground mb-4">
            "WHAT IF THE BIGGEST VIDEO YOU EVER MADE<br />
            <span className="text-gradient-gold">LASTED FOREVER?"</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            Every MrBeast video ends. The well gets filled. The blind people go home. The trees get planted. 
            Project Renaissance doesn't end. It runs. It grows. It compounds. And every day it runs, it generates 
            more content, more impact, and more legacy than any single video ever could.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'Ask', value: 'Chief Community Officer role + creative control of Beast Games seasons inside the dome' },
              { label: 'Time Commitment', value: '4 visits/year for Beast Games events. Creative team embedded full-time.' },
              { label: 'Compensation', value: 'Revenue share on all content + NAC equity stake + naming rights (Beast District)' },
              { label: 'Downside Risk', value: 'Zero. Government-funded. Jimmy shows up, creates content, changes lives.' },
            ].map(s => (
              <div key={s.label} className="text-left max-w-xs">
                <div className="text-xs font-bold text-accent mb-1">{s.label}</div>
                <div className="text-sm text-foreground">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Pitch points */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PITCH_POINTS.map(p => (
          <button key={p.id} onClick={() => setActivePoint(p.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all"
            style={activePoint === p.id
              ? { background: p.color, borderColor: p.color, color: '#0d1526' }
              : { borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
            <span>{p.emoji}</span>{p.title.split(':')[0]}
          </button>
        ))}
      </div>

      {point && (
        <div className="glass rounded-2xl p-6 border mb-10" style={{ borderColor: `${point.color}30` }}>
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">{point.emoji}</span>
            <div>
              <h4 className="font-display font-black text-xl text-foreground mb-2">{point.title}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{point.body}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            {point.bullets.map((b, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black text-background flex-shrink-0 mt-0.5"
                  style={{ background: point.color }}>{i + 1}</div>
                <span className="text-foreground leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comparable projects table */}
      <h3 className="font-display font-black text-2xl mb-4">Proof of Concept: MrBeast's Track Record</h3>
      <div className="glass rounded-2xl overflow-hidden border border-border/50 mb-10">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-secondary/30">
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground tracking-wide">PROJECT</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground tracking-wide">INVESTED</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground tracking-wide">RESULT</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground tracking-wide">VIEWS</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-muted-foreground tracking-wide">YEAR</th>
              </tr>
            </thead>
            <tbody>
              {COMPARABLE_PROJECTS.map((p, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-white/2 transition-colors">
                  <td className="px-4 py-3 font-semibold text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-accent font-bold">{p.raised}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.result}</td>
                  <td className="px-4 py-3 text-primary font-semibold">{p.views}</td>
                  <td className="px-4 py-3 text-muted-foreground">{p.year}</td>
                </tr>
              ))}
              <tr className="bg-yellow-400/5 border-t-2 border-yellow-400/30">
                <td className="px-4 py-4 font-black text-accent font-display text-base">🏆 Project Renaissance</td>
                <td className="px-4 py-4 text-green-400 font-black">Creative partnership (no capital required)</td>
                <td className="px-4 py-4 text-green-400 font-semibold">3M+ lives changed, civilization-level impact</td>
                <td className="px-4 py-4 text-yellow-400 font-black">5B+/year (projected)</td>
                <td className="px-4 py-4 text-yellow-400 font-bold">Ongoing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Closing statement */}
      <div className="glass rounded-2xl p-8 border border-primary/20 text-center">
        <Crown className="w-12 h-12 text-accent mx-auto mb-4" />
        <h3 className="font-display text-3xl font-black text-foreground mb-4">THE BOTTOM LINE</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
          "You've planted trees, restored sight, and fed the hungry — and done it more efficiently than any nonprofit in history. 
          Now imagine doing all of that, at once, at scale, forever — and filming every second of it. 
          Project Renaissance isn't a video. It's your magnum opus."
        </p>
        <div className="mt-6 inline-flex items-center gap-3 px-6 py-3 rounded-full font-display font-black text-background text-lg"
          style={{ background: 'linear-gradient(135deg, #F59E0B, #EF4444, #8B5CF6)' }}>
          <Star className="w-5 h-5" />
          LET'S BUILD IT TOGETHER
        </div>
      </div>
    </div>
  );
}
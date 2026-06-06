import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Award, TrendingUp, Shield, Users, Star, ChevronDown, CheckCircle, DollarSign, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import NACLogo from '@/components/ui/NACLogo';

const benefits = [
  { icon: Zap, title: 'Earn Real Crypto Daily', desc: 'Every minute on-site earns New America Coin — a blockchain-backed digital asset you own and keep forever. Average resident earns 2,400+ NAC/month.', color: 'text-accent' },
  { icon: Award, title: 'Master AI & Trade Skills', desc: 'AI, robotics, coding, welding, electrical, finance — courses built for the economy of 2025 and beyond. 89% certification rate.', color: 'text-primary' },
  { icon: TrendingUp, title: 'Transparent Progress Score', desc: 'A real-time Reintegration Score tracks every step of your progress. You see it. Your team sees it. No surprises, no politics.', color: 'text-purple-400' },
  { icon: Shield, title: 'World-Class Living Spaces', desc: 'Dignified housing that gets better as you level up. Climate-controlled, private, and designed by trauma-informed researchers.', color: 'text-green-400' },
  { icon: Users, title: 'Guaranteed Job Placement', desc: 'Graduate Citizen-Ready with verified certifications and a matched employer partner. 94% employment rate target.', color: 'text-blue-400' },
  { icon: Star, title: 'Real Nest Egg On Exit', desc: 'Take your NAC balance with you when you leave. Average exit value: $2,800–$12,000 USD equivalent. You earned it.', color: 'text-orange-400' },
];

const tiers = [
  {
    name: 'NEWCOMER', range: '0–249', color: '#6B7280',
    desc: 'Day one. Dignified shared suite, 3 meals/day, Chromebook, full WiFi.',
    perks: ['8-person suite w/ private bed', 'Full cafeteria access', 'Chromebook + WiFi issued', 'Track enrollment open'],
  },
  {
    name: 'APPRENTICE', range: '250–499', color: '#3B82F6',
    desc: 'Skills building. Semi-private pod. Higher NAC earning rate unlocked.',
    perks: ['2–4 person private pod', 'Priority WiFi + AI study assistant', 'Protein supplement bar access', 'NAC Marketplace opens'],
  },
  {
    name: 'CONTRIBUTOR', range: '500–749', color: '#8B5CF6',
    desc: 'A valued community member. Private studio. Kitchenette. Real autonomy.',
    perks: ['Solo private studio (320 sq ft)', 'Personal kitchenette included', 'Guest visitor privileges', 'Rooftop garden access'],
  },
  {
    name: 'CITIZEN-READY', range: '750–1000', color: '#F59E0B',
    desc: 'Ready to reintegrate. Full apartment. Job matched. Life changed.',
    perks: ['Private 1BR apartment (480 sq ft)', 'Employment coordinator assigned', 'External housing search support', 'Full NAC balance is yours'],
  },
];

const REAL_STATS = [
  { value: '653,100', label: 'Americans homeless tonight', source: 'HUD 2024' },
  { value: '$64,000', label: 'NYC spends per person/yr', source: 'NYC Comptroller' },
  { value: '63%', label: 'return to shelter within 2 yrs', source: 'Urban Institute' },
  { value: '$3,840', label: 'Renaissance annual cost/person', source: 'Program Model' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NACLogo size={30} />
          <div>
            <div className="font-display text-sm font-bold text-gradient-blue leading-tight">PROJECT</div>
            <div className="font-display text-sm font-black text-gradient-gold leading-tight -mt-0.5">RENAISSANCE</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/resident" className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block font-semibold">
            Resident Portal
          </Link>
          <Link to="/admin" className="text-xs bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold glow-btn transition-all hover:scale-105">
            Admin Portal
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #F59E0B, transparent)' }} />

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-sm font-semibold px-4 py-2 rounded-full mb-8">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              New America Initiative — Project Renaissance
            </div>

            <h1 className="font-display font-black text-6xl md:text-8xl lg:text-9xl leading-none mb-6">
              <span className="text-gradient-blue">YOUR</span>
              <br />
              <span className="text-foreground">COMEBACK</span>
              <br />
              <span className="text-gradient-gold">STARTS NOW</span>
            </h1>

            <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed font-body">
              Earn crypto. Master AI and trade skills. Build your score. Graduate into a job, a home, and a future.
              <span className="text-foreground font-semibold"> This is the best opportunity you've ever been offered.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link to="/resident" className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-display font-bold text-lg glow-btn hover:scale-105 transition-all">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/admin" className="flex items-center gap-2 glass border border-border/50 text-foreground px-8 py-4 rounded-full font-display font-bold text-lg hover:border-primary/30 transition-all">
                Program Admin <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Key stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {[
                { value: '0.1+', label: 'NAC / Minute Earned' },
                { value: '94%', label: 'Employment Rate Target' },
                { value: '2.1+', label: 'Certifications Per Resident' },
                { value: '$320', label: 'Monthly Cost/Person' },
              ].map((s) => (
                <div key={s.label} className="glass rounded-2xl p-4 border border-border/50">
                  <div className="font-display font-black text-3xl text-gradient-gold">{s.value}</div>
                  <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* The Crisis — public data */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-3">
            THE <span className="text-destructive">CRISIS</span> IS REAL
          </h2>
          <p className="text-muted-foreground text-lg">Public data. No spin. The system is broken.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {REAL_STATS.map(s => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5 border border-border/50 text-center">
              <div className="font-display font-black text-3xl text-gradient-gold mb-1">{s.value}</div>
              <div className="text-foreground text-sm font-semibold mb-1">{s.label}</div>
              <div className="text-muted-foreground text-xs">— {s.source}</div>
            </motion.div>
          ))}
        </div>
        <div className="glass rounded-2xl p-6 border border-primary/20 text-center max-w-3xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">New York City spends $64,000 per person per year</strong> on homelessness — with a 63% return rate and only 11% employment. Project Renaissance delivers better outcomes for <strong className="text-green-400">$3,840/year ($320/month)</strong> — a 94% cost reduction. The savings fund the program.
          </p>
          <p className="text-xs text-muted-foreground mt-3">Sources: HUD 2024, NYC Comptroller 2024, Urban Institute 2023, USICH 2024</p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-5xl md:text-6xl text-foreground mb-4">
            WHY <span className="text-gradient-gold">RENAISSANCE?</span>
          </h2>
          <p className="text-muted-foreground text-xl">Six reasons nobody in their right mind says no.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-border/50 hover:border-primary/20 transition-all group"
            >
              <b.icon className={`w-8 h-8 ${b.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="font-display font-bold text-xl text-foreground mb-2">{b.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tier progression */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-5xl md:text-6xl text-foreground mb-4">
            YOUR <span className="text-gradient-blue">PATH FORWARD</span>
          </h2>
          <p className="text-muted-foreground text-xl">Four tiers. One destination: Citizen-Ready. Every upgrade is real.</p>
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 hidden lg:block" style={{ background: 'linear-gradient(90deg, #6B7280, #3B82F6, #8B5CF6, #F59E0B)' }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-6 border"
                style={{ borderColor: `${t.color}30` }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-display font-black"
                  style={{ background: `${t.color}20`, color: t.color, border: `2px solid ${t.color}40` }}>
                  {i + 1}
                </div>
                <div className="font-display font-black text-lg mb-1 text-center" style={{ color: t.color }}>{t.name}</div>
                <div className="text-muted-foreground text-xs mb-3 font-mono text-center">{t.range} points</div>
                <p className="text-foreground text-sm mb-4 text-center">{t.desc}</p>
                <ul className="space-y-1.5">
                  {t.perks.map((p, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 flex-shrink-0 mt-0.5" style={{ color: t.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl text-foreground mb-4">
            HOW IT <span className="text-gradient-blue">WORKS</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '01', icon: MapPin, title: 'Arrive & Enroll', color: '#3B82F6', desc: 'Voluntary intake. Orientation. Your Chromebook and smart ID wristband are issued on Day 1. Score starts at zero.' },
            { step: '02', icon: Zap, title: 'Earn & Learn', color: '#F59E0B', desc: 'Every hour on-site earns NAC. Complete courses for bonuses. Finish certifications for massive score boosts. Participate in Beast Games events.' },
            { step: '03', icon: ArrowRight, title: 'Graduate & Thrive', color: '#22C55E', desc: 'Hit 750+ score. Get matched with an employer. Take your NAC. Leave with a job, savings, and a plan. 100% free to go at any time.' },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-6 border border-border/50 text-center">
                <div className="text-4xl font-display font-black mb-3" style={{ color: s.color }}>{s.step}</div>
                <Icon className="w-8 h-8 mx-auto mb-3" style={{ color: s.color }} />
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-16 border border-primary/20 glow-blue relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at center, #3B82F6, transparent 70%)' }} />
          <h2 className="font-display font-black text-5xl md:text-6xl text-foreground mb-6 relative">
            READY TO <span className="text-gradient-gold">RISE?</span>
          </h2>
          <p className="text-muted-foreground text-xl mb-10 relative">
            The door is open. The opportunity is real. Your future is waiting.
          </p>
          <Link to="/resident" className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-display font-black text-xl glow-btn hover:scale-105 transition-all">
            Enter Your Portal <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 px-6 py-10 text-center text-muted-foreground text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <NACLogo size={20} />
          <span className="font-display font-bold text-gradient-blue">PROJECT RENAISSANCE</span>
        </div>
        <p className="mb-1">New America Initiative — Powered by AI, Built for People</p>
        <p className="text-xs text-muted-foreground/50 max-w-lg mx-auto leading-relaxed mb-4">
          Population data: HUD 2024 PIT Count · Cost data: NYC Comptroller, CA State Auditor, Urban Institute · Outcome benchmarks: SAMHSA 2022, National Alliance to End Homelessness 2024
        </p>
        <div>
          <Link to="/demo-access" className="inline-flex items-center gap-2 text-xs text-muted-foreground/40 hover:text-primary/70 transition-colors border border-border/20 hover:border-primary/30 px-3 py-1.5 rounded-full">
            🔒 Stakeholder Demo Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Award, TrendingUp, Shield, Users, Star, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import NACLogo from '@/components/ui/NACLogo';

const benefits = [
  { icon: Zap, title: 'Earn NAC Crypto', desc: 'Every minute on-site earns you New America Coin — a real digital asset you keep forever.', color: 'text-accent' },
  { icon: Award, title: 'Learn High-Demand Skills', desc: 'AI, robotics, coding, trades, finance — courses built for the economy of tomorrow.', color: 'text-primary' },
  { icon: TrendingUp, title: 'Build Your Score', desc: 'A transparent Reintegration Score tracks every step of your progress toward full citizenship.', color: 'text-purple-400' },
  { icon: Shield, title: 'World-Class Facilities', desc: 'Private rooms, premium meals, gym, recreation, and a community that has your back.', color: 'text-green-400' },
  { icon: Users, title: 'Job Placement Guaranteed', desc: 'Graduate with certifications and a matched employer partner waiting for you.', color: 'text-blue-400' },
  { icon: Star, title: 'Crypto Nest Egg', desc: "Cash out or keep your NAC when you reintegrate. You earned it — it's yours.", color: 'text-orange-400' },
];

const tiers = [
  { name: 'NEWCOMER', range: '0–249', color: '#6B7280', desc: 'Day one. Every journey starts here.' },
  { name: 'APPRENTICE', range: '250–499', color: '#3B82F6', desc: 'Skills building. Higher earning rate unlocked.' },
  { name: 'CONTRIBUTOR', range: '500–749', color: '#8B5CF6', desc: 'A valued community member. Premium perks.' },
  { name: 'CITIZEN-READY', range: '750–1000', color: '#F59E0B', desc: 'Ready to reintegrate. Job matched. Life changed.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NACLogo size={32} />
          <div>
            <div className="font-display text-base font-bold text-gradient-blue leading-tight">PROJECT</div>
            <div className="font-display text-base font-black text-gradient-gold leading-tight -mt-0.5">RENAISSANCE</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/resident" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Resident Portal
          </Link>
          <Link to="/admin" className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold glow-btn transition-all hover:scale-105">
            Admin Portal
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        
        {/* Glow orbs */}
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

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/resident" className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-display font-bold text-lg glow-btn hover:scale-105 transition-all">
                Start Your Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/admin" className="flex items-center gap-2 glass border border-border/50 text-foreground px-8 py-4 rounded-full font-display font-bold text-lg hover:border-primary/30 transition-all">
                Program Admin <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* NAC stats */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { value: '0.1+', label: 'NAC / Minute' },
              { value: '1000', label: 'Max Score' },
              { value: '100%', label: 'Job Placement' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-4 border border-border/50">
                <div className="font-display font-black text-3xl text-gradient-gold">{s.value}</div>
                <div className="text-muted-foreground text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
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
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-5xl md:text-6xl text-foreground mb-4">
            YOUR <span className="text-gradient-blue">PATH FORWARD</span>
          </h2>
          <p className="text-muted-foreground text-xl">Four tiers. One destination: Citizen-Ready.</p>
        </div>
        <div className="relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 hidden lg:block" style={{ background: 'linear-gradient(90deg, #6B7280, #3B82F6, #8B5CF6, #F59E0B)' }} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}
                className="glass rounded-2xl p-6 border text-center"
                style={{ borderColor: `${t.color}30` }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-display font-black"
                  style={{ background: `${t.color}20`, color: t.color, border: `2px solid ${t.color}40` }}>
                  {i + 1}
                </div>
                <div className="font-display font-black text-lg mb-1" style={{ color: t.color }}>{t.name}</div>
                <div className="text-muted-foreground text-xs mb-3 font-mono">{t.range} points</div>
                <p className="text-foreground text-sm">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
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
      <footer className="border-t border-border/50 px-6 py-8 text-center text-muted-foreground text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <NACLogo size={20} />
          <span className="font-display font-bold text-gradient-blue">PROJECT RENAISSANCE</span>
        </div>
        <p>New America Initiative — Powered by AI, Built for People</p>
      </footer>
    </div>
  );
}
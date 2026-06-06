import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DomeCityMap from '@/components/demo/DomeCityMap';
import PopulationProjections from '@/components/demo/PopulationProjections';
import FacilityDesign from '@/components/demo/FacilityDesign';
import MealsSupplies from '@/components/demo/MealsSupplies';
import BeastGamesSection from '@/components/demo/BeastGamesSection';
import { Shield, LogOut, ChevronDown } from 'lucide-react';

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'dome', label: 'Dome City Map' },
  { id: 'population', label: 'Population Projections' },
  { id: 'facility', label: 'Facility Design' },
  { id: 'meals', label: 'Meals & Supplies' },
  { id: 'beast', label: 'Beast Games Design' },
];

export default function DemoPortal() {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');

  useEffect(() => {
    if (!sessionStorage.getItem('demo_access')) {
      navigate('/demo-access');
    }
  }, []);

  const handleExit = () => {
    sessionStorage.removeItem('demo_access');
    navigate('/');
  };

  const scrollTo = (id) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 glass">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display font-black text-sm tracking-widest text-primary">PROJECT RENAISSANCE — DEMO PORTAL</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 font-bold">CLASSIFIED</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${active === s.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                {s.label}
              </button>
            ))}
          </div>
          <button onClick={handleExit}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-3.5 h-3.5" />
            Exit
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-24">
        {/* Hero Overview */}
        <section id="overview" className="text-center py-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-6">
            CONCEPT BRIEF — CAMP PHOENIX v1.0
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none mb-4">
            THE FIRST SELF-CONTAINED<br />
            <span className="text-gradient-blue">AMERICAN RENAISSANCE CITY</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed mb-10">
            A fully sealed, government-supported, voluntary betterment city designed for scale — sourcing displaced populations from Arizona, California, Colorado, and New York, with a gamified civic economy and world-class community design led by the MrBeast / Beast Games creative team.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Year 1 Target Population', value: '28,500+', color: 'text-primary' },
              { label: 'Dome Coverage', value: '~518 mi²', color: 'text-accent' },
              { label: 'Projected NAC Economy', value: '$4.2M+', color: 'text-green-400' },
              { label: 'Reintegration Goal (Yr1)', value: '3,200', color: 'text-purple-400' },
            ].map(s => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className={`font-display text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <button onClick={() => scrollTo('dome')}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
              <span className="text-xs font-semibold">Explore the Facility</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </button>
          </div>
        </section>

        {/* Dome Map */}
        <section id="dome">
          <DomeCityMap />
        </section>

        {/* Population */}
        <section id="population">
          <PopulationProjections />
        </section>

        {/* Facility Design */}
        <section id="facility">
          <FacilityDesign />
        </section>

        {/* Meals & Supplies */}
        <section id="meals">
          <MealsSupplies />
        </section>

        {/* Beast Games */}
        <section id="beast">
          <BeastGamesSection />
        </section>
      </div>

      <footer className="border-t border-border/30 py-8 text-center text-muted-foreground text-xs mt-20">
        <p className="font-display font-bold tracking-widest text-primary/60 mb-1">PROJECT RENAISSANCE — NEW AMERICA INITIATIVE</p>
        <p>Concept Demo · Authorized Stakeholders Only · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
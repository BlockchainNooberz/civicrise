import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DomeCityMap from '@/components/demo/DomeCityMap';
import PopulationProjections from '@/components/demo/PopulationProjections';
import FacilityDesign from '@/components/demo/FacilityDesign';
import MealsSupplies from '@/components/demo/MealsSupplies';
import BeastGamesSection from '@/components/demo/BeastGamesSection';
import EconomicCase from '@/components/demo/EconomicCase';
import MrBeastPitch from '@/components/demo/MrBeastPitch';
import LivingPlans from '@/components/demo/LivingPlans';
import SuccessMetrics from '@/components/demo/SuccessMetrics';
import { Shield, LogOut, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

const SECTIONS = [
  { id: 'overview', label: '00 Overview', short: 'Overview' },
  { id: 'dome', label: '01 Dome Map', short: 'Dome Map' },
  { id: 'population', label: '02 Population', short: 'Population' },
  { id: 'facility', label: '03 Facility', short: 'Facility' },
  { id: 'living', label: '04 Living Plans', short: 'Living' },
  { id: 'meals', label: '05 Meals & Ops', short: 'Meals' },
  { id: 'beast', label: '06 Beast Games', short: 'Beast' },
  { id: 'economic', label: '07 Economic Case', short: 'Economy' },
  { id: 'metrics', label: '08 Success Metrics', short: 'Metrics' },
  { id: 'pitch', label: '09 MrBeast Pitch', short: 'Pitch' },
];

export default function DemoPortal() {
  const navigate = useNavigate();
  const [active, setActive] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    if (!sessionStorage.getItem('demo_access')) {
      navigate('/demo-access');
    }
  }, []);

  // Intersection observer for active section tracking
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, []);

  const handleExit = () => {
    sessionStorage.removeItem('demo_access');
    navigate('/');
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const OVERVIEW_STATS = [
    { label: 'Year 1 Target Population', value: '28,500+', color: 'text-primary' },
    { label: 'Dome Coverage', value: '~518 mi²', color: 'text-accent' },
    { label: 'Annual Gov Cost Savings', value: '$912M+', color: 'text-green-400' },
    { label: 'Reintegration Goal (Yr1)', value: '3,200', color: 'text-purple-400' },
    { label: 'Program Cost vs NYC Shelter', value: '94% less', color: 'text-green-400' },
    { label: 'Break-Even Point', value: 'Year 3', color: 'text-yellow-400' },
    { label: 'US Homeless Population 2024', value: '653,100', color: 'text-red-400' },
    { label: 'Content Views Projected/Yr', value: '5B+', color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-50 border-b border-border/50 glass">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between h-12">
          <div className="flex items-center gap-2 flex-shrink-0">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-display font-black text-xs tracking-widest text-primary hidden sm:block">PROJECT RENAISSANCE — DEMO PORTAL</span>
            <span className="font-display font-black text-xs tracking-widest text-primary sm:hidden">RENAISSANCE</span>
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 font-bold text-[10px]">CLASSIFIED</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 overflow-x-auto">
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className={`text-[11px] px-2.5 py-1.5 rounded-md font-semibold transition-colors whitespace-nowrap ${active === s.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                {s.short}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile menu */}
            <button className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground" onClick={() => setMobileMenuOpen(v => !v)}>
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <button onClick={handleExit}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Exit</span>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-1 p-3">
              {SECTIONS.map(s => (
                <button key={s.id} onClick={() => scrollTo(s.id)}
                  className={`text-xs px-3 py-2 rounded-lg font-semibold text-left transition-colors ${active === s.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-secondary'}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar progress indicator — desktop */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1.5">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => scrollTo(s.id)}
            title={s.label}
            className={`w-1.5 rounded-full transition-all ${active === s.id ? 'h-6 bg-primary' : 'h-2 bg-border/60 hover:bg-primary/50'}`} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-28">
        {/* Hero Overview */}
        <section id="overview" className="text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest mb-6">
            CONCEPT BRIEF — CAMP PHOENIX v2.0
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-black text-foreground leading-none mb-4">
            THE FIRST SELF-CONTAINED<br />
            <span className="text-gradient-blue">AMERICAN RENAISSANCE CITY</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed mb-4">
            A fully sealed, government-supported, voluntary betterment city designed for scale — sourcing displaced populations from Arizona, California, Colorado, and New York, with a gamified civic economy and world-class community design co-developed with the MrBeast / Beast Games creative team.
          </p>
          <p className="text-muted-foreground/60 text-sm max-w-xl mx-auto mb-10">
            All population, cost, and outcome data sourced from HUD 2024 PIT Count, USICH 2024, NYC Comptroller, CA State Auditor, Urban Institute, SAMHSA, and National Alliance to End Homelessness.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
            {OVERVIEW_STATS.slice(0, 4).map(s => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className={`font-display text-2xl md:text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
            {OVERVIEW_STATS.slice(4).map(s => (
              <div key={s.label} className="glass rounded-xl p-3">
                <div className={`font-display text-xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Section preview nav */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-3xl mx-auto mt-6">
            {SECTIONS.slice(1).map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary px-3 py-2 rounded-lg glass border border-border/40 hover:border-primary/30 transition-all font-semibold">
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
                {s.short}
              </button>
            ))}
          </div>
        </section>

        {/* All sections */}
        <section id="dome"><DomeCityMap /></section>
        <section id="population"><PopulationProjections /></section>
        <section id="facility"><FacilityDesign /></section>
        <section id="living"><LivingPlans /></section>
        <section id="meals"><MealsSupplies /></section>
        <section id="beast"><BeastGamesSection /></section>
        <section id="economic"><EconomicCase /></section>
        <section id="metrics"><SuccessMetrics /></section>
        <section id="pitch"><MrBeastPitch /></section>
      </div>

      <footer className="border-t border-border/30 py-10 text-center text-muted-foreground text-xs mt-20">
        <p className="font-display font-bold tracking-widest text-primary/60 mb-2">PROJECT RENAISSANCE — NEW AMERICA INITIATIVE</p>
        <p className="mb-1">Concept Demo · Authorized Stakeholders Only · {new Date().getFullYear()}</p>
        <p className="text-muted-foreground/40 max-w-lg mx-auto leading-relaxed">
          Data sources: HUD 2024 PIT Count · USICH 2024 · NYC Comptroller · CA State Auditor 2023 · Urban Institute · SAMHSA 2022 · National Alliance to End Homelessness 2024 · Denver Auditor 2023 · Maricopa County 2023
        </p>
      </footer>
    </div>
  );
}
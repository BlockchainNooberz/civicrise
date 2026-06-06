import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, DollarSign, TrendingUp, Shield, Cpu, Globe, Zap, Building2, Users, Star, Award, ArrowRight } from 'lucide-react';

const PARTNERS = [
  // Tech & Defense
  {
    id: 'palantir',
    name: 'Palantir Technologies',
    person: 'Alex Karp, CEO',
    category: 'Tech & Defense',
    logo: '🔭',
    color: '#3B82F6',
    ask: '$500M data infrastructure contract',
    equity: '2.5% program equity stake',
    tagline: '"The operating system for the new social contract."',
    pitch: `Palantir's Gotham and Foundry platforms are tailor-made for a challenge of this scale. We need real-time behavioral analytics, predictive reintegration modeling, and a unified data layer across 30+ camps housing 650,000 residents. This is the largest social OS deployment in American history.`,
    value_props: [
      'Gotham platform for resident risk scoring & reintegration prediction',
      'Foundry as the operational data backbone across all 50 facilities',
      'AIP integration for AI-driven case management and counseling support',
      'Largest single Palantir social-sector deployment ever — massive PR value',
      'Direct pipeline to DoD/DHS as proof of domestic AI welfare infrastructure',
    ],
    roi: 'Camp Phoenix alone = 10-year $5B data services contract. Government replication across all 50 states = $40B TAM.',
    tier: 'Platinum Partner',
    urgency: 'Phase 1 RFP closes Q3 2026',
  },
  {
    id: 'anduril',
    name: 'Anduril Industries',
    person: 'Palmer Luckey, Founder',
    category: 'Tech & Defense',
    logo: '⚔️',
    color: '#EF4444',
    ask: '$200M security infrastructure contract',
    equity: '1.5% program equity stake',
    tagline: '"The perimeter defense stack for American cities reborn."',
    pitch: `Anduril's Lattice platform and autonomous sentry systems are the only viable solution for securing a 518-square-mile dome perimeter 24/7 without a bloated human guard workforce. We need AI-guided perimeter drones, checkpoint biometrics, and real-time threat detection at scale.`,
    value_props: [
      'Lattice AI for dome perimeter threat monitoring across 8 checkpoint gates',
      'Autonomous drone patrol fleet replacing 2,400 human security personnel',
      'Ghost-4 autonomous systems for perimeter enforcement at scale',
      'Sentry Tower deployment every 0.5 miles around 518 mi² perimeter',
      'Massive real-world autonomous defense deployment — Anduril\'s largest',
    ],
    roi: 'Long-term contract + proof of concept for domestic autonomous infrastructure deployment. Replicable to 50 cities nationwide.',
    tier: 'Platinum Partner',
    urgency: 'Security contract award: Q4 2026',
  },
  {
    id: 'elon',
    name: 'Elon Musk / xAI / SpaceX / Tesla',
    person: 'Elon Musk',
    category: 'Tech & Vision',
    logo: '🚀',
    color: '#a78bfa',
    ask: '$1B multi-entity partnership',
    equity: '5% program equity + Starlink exclusivity',
    tagline: '"Make America Great Again — starting with the people left behind."',
    pitch: `Four pillars. One mission. Tesla provides the energy grid — Megapack solar + Powerwalls for 100% energy independence. Starlink provides Tier-1 broadband to every resident on Day 1. xAI's Grok powers the resident AI tutor and behavioral analytics. Tesla Optimus robots handle camp infrastructure maintenance. This is the largest real-world deployment of Tesla's integrated product stack.`,
    value_props: [
      'Tesla Megapack + Solar Roof: full energy independence for 650K residents',
      'Starlink: guaranteed high-speed internet for all residents from intake',
      'xAI Grok: personalized AI tutor + counselor for every resident',
      'Tesla Optimus: 500 robots handling maintenance, logistics, agriculture',
      'Full-stack integration showcasing Tesla ecosystem at unprecedented scale',
    ],
    roi: '$50B+ in product deployment value. Media coverage worth billions. Proof-of-concept for Tesla Energy + xAI in public sector.',
    tier: 'Founding Partner',
    urgency: 'DOGE partnership pathway — executive alignment ready',
  },
  {
    id: 'mrbeast',
    name: 'MrBeast (Jimmy Donaldson)',
    person: 'Jimmy Donaldson',
    category: 'Media & Entertainment',
    logo: '👑',
    color: '#F59E0B',
    ask: '$100M content + brand partnership',
    equity: '10% of Beast Games licensing revenue',
    tagline: '"The most watched redemption arc in human history."',
    pitch: `This isn't charity content — this is the most compelling long-form series ever produced. 650,000 real people. Real stakes. Real transformations. Beast Games: Renaissance Edition runs 24/7 inside the dome. Weekly challenges, certification races, NAC jackpots, and one resident per quarter wins full reintegration support — sponsored, filmed, and distributed globally. MrBeast gets content rights. We get cultural legitimacy that no marketing budget could buy.`,
    value_props: [
      'Beast Games: Renaissance Edition — ongoing live competition series',
      'Quarterly "Citizen Graduation" specials — 100M+ view guarantee',
      'MrBeast brand = voluntary intake rates 3x higher than traditional shelters',
      'First-of-kind homeless-to-citizen transformation media franchise',
      'YouTube/Netflix licensing revenue shared 50/50 with resident housing fund',
    ],
    roi: 'Content franchise estimated at $2B+ over 5 years. Brand value to program: immeasurable. Viral recruitment drives 40% lower intake cost.',
    tier: 'Founding Partner',
    urgency: 'Exclusive media rights window: 90 days',
  },
  {
    id: 'thiel',
    name: 'Peter Thiel',
    person: 'Peter Thiel — Founders Fund',
    category: 'Venture & Philosophy',
    logo: '♟️',
    color: '#8B5CF6',
    ask: '$250M Series A lead',
    equity: '8% equity in Renaissance Holdings LLC',
    tagline: '"Competition is for losers. This is a monopoly on human potential."',
    pitch: `Thiel's thesis: back visionaries building the future governments refuse to. Project Renaissance is precisely that — a privately operated, crypto-incentivized social operating system running outside traditional government bureaucracy. Zero-to-one: this has never been done. NAC as a behavioral currency is the first real-world test of cryptographic reputation systems at population scale. Thiel Capital gains first-mover equity in what becomes the dominant model for global social infrastructure.`,
    value_props: [
      'First private alternative to government welfare at full national scale',
      'NAC cryptocurrency creates an entirely new asset class: behavioral capital',
      'Palantir-adjacent deal flow — Peter already understands the data angle',
      'Zero-to-one innovation: no comparable model exists globally',
      'Exit paths: IPO, acquisition by government, or perpetual cash-generating endowment',
    ],
    roi: 'Conservative 10-year valuation: $80B if replicated globally. First-mover equity locked at ground floor. Comparable to early Palantir investment.',
    tier: 'Founding Investor',
    urgency: 'Term sheet drafted. Needs signature.',
  },
  {
    id: 'trump',
    name: 'President Donald J. Trump',
    person: 'The White House / DOGE',
    category: 'Government & Policy',
    logo: '🇺🇸',
    color: '#EF4444',
    ask: 'Executive Order + $5B federal allocation',
    equity: 'Legacy ownership — The Trump Reintegration Initiative',
    tagline: '"Nobody builds bigger. Nobody rehabilitates better. This is WINNING."',
    pitch: `This is the signature domestic achievement of the second Trump term. 653,100 Americans off the streets in 18 months — not shuffled into failing shelters, but earning crypto, learning AI skills, and graduating into jobs. It saves $40B/year in government waste. It's voluntary. It's American. It works. Name the first facility "Trump Renaissance Campus" — and every graduate becomes a testament to this administration's results.`,
    value_props: [
      'Ends the homelessness crisis faster than any prior administration — ever',
      'Saves taxpayers $40B+ annually vs. current shelter spending model',
      'DOGE-aligned: eliminates 12 redundant federal homelessness agencies',
      'Voluntary program — no constitutional objections, no forced relocation',
      '"Trump Renaissance Campus" naming rights for flagship Phoenix facility',
    ],
    roi: 'Historical legacy: "The president who ended American homelessness." Electoral impact: massive. Policy model exported globally under American brand.',
    tier: 'Government Partner',
    urgency: 'DOGE review scheduled. Congressional briefing ready.',
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    person: 'Brian Chesky, CEO',
    category: 'Housing & Hospitality',
    logo: '🏠',
    color: '#FF5A5F',
    ask: '$150M housing platform partnership',
    equity: 'Preferred access to graduate housing pipeline',
    tagline: '"Belong Anywhere — including after homelessness."',
    pitch: `Airbnb pioneered the idea that belonging transcends ownership. Project Renaissance graduates — Citizen-Ready individuals with verified employment, savings, and behavior scores — are ideal Airbnb hosts and tenants. We provide Airbnb with a verified, creditworthy resident pipeline that doesn't exist anywhere else. Airbnb provides transitional housing credits and a "Graduate Host" program that lets former residents become micro-entrepreneurs.`,
    value_props: [
      '"Renaissance Graduate" Airbnb host certification — verified, trustworthy',
      'Corporate housing contracts for graduates transitioning out of camps',
      'Airbnb Open Homes integration: emergency housing credits for alumni',
      'Data partnership: reintegration housing success metrics for ESG reporting',
      'First major brand to champion homeless-to-host economic mobility story',
    ],
    roi: 'Pipeline of 50,000+ verified graduates per year as potential hosts/tenants. ESG brand value. New market segment: economic-mobility housing.',
    tier: 'Housing Partner',
    urgency: 'MOU ready for Q1 2027 pilot cohort',
  },
  {
    id: 'wlfi',
    name: 'World Liberty Financial',
    person: 'Trump Family / DeFi Leadership',
    category: 'Crypto & Finance',
    logo: '🏦',
    color: '#22C55E',
    ask: '$500M NAC liquidity + DeFi integration',
    equity: 'NAC protocol founding validator rights',
    tagline: '"The first behavioral cryptocurrency backed by American sovereignty."',
    pitch: `NAC (New America Coin) needs institutional liquidity and a credible blockchain infrastructure partner. World Liberty Financial, with its ties to American political sovereignty and DeFi ambitions, is the natural co-architect. WLFI validators anchor the NAC blockchain, earn transaction fees on every resident earning and spend, and position NAC as the first sovereign behavioral currency in American history — backed by measurable human progress data.`,
    value_props: [
      'NAC founding validator rights — transaction fee income on 650K active users',
      'First behavioral stablecoin: NAC value backed by resident productivity data',
      'WLFI + NAC = the American answer to Chinese social credit systems',
      'DeFi integration: NAC tradeable on WLFI\'s exchange from Day 1',
      'Co-brand opportunity: "Powered by World Liberty Financial"',
    ],
    roi: 'NAC market cap projected $2B within 3 years of launch. Validator income at 0.5% transaction fee = $100M+ annually at scale.',
    tier: 'Crypto Partner',
    urgency: 'Token architecture audit begins Q2 2026',
  },
  {
    id: 'walton',
    name: 'The Walton Family',
    person: 'Walton Family Foundation',
    category: 'Philanthropy & Retail',
    logo: '🏪',
    color: '#0EA5E9',
    ask: '$300M supply chain + philanthropy partnership',
    equity: 'Walmart exclusive supply contract for all 50 facilities',
    tagline: '"Save money. Save lives. Live better."',
    pitch: `Walmart feeds America. Project Renaissance gives Walmart the opportunity to feed the most vulnerable Americans at the most favorable per-unit economics in the company's history. A centralized procurement contract for 650,000 residents across 50 facilities represents billions in predictable, long-term wholesale revenue. The Walton Family Foundation's education arm co-develops the Life Skills curriculum. This is Walmart's largest ESG initiative — and it pays.`,
    value_props: [
      'Exclusive Walmart wholesale supply contract: $1.2B/year in food + goods',
      'Walton Family Foundation co-funds and brands the Life Skills curriculum',
      'Sam\'s Club "Renaissance Membership" for all graduating residents',
      'ESG narrative: "Walmart feeds and employs 50,000 Renaissance graduates/year"',
      'Predictable long-term government-backed revenue stream',
    ],
    roi: 'Supply contract alone: $6B over 5 years. Graduate employment pipeline. Flagship philanthropic identity for next generation of Walton family leadership.',
    tier: 'Supply Partner',
    urgency: 'Procurement RFP ready for Bentonville',
  },
  {
    id: 'bezos',
    name: 'Jeff Bezos',
    person: 'Bezos Earth Fund / Amazon',
    category: 'Tech & Philanthropy',
    logo: '📦',
    color: '#FF9900',
    ask: '$1B infrastructure + logistics partnership',
    equity: '3% equity + AWS as exclusive cloud provider',
    tagline: '"Day One thinking applied to America\'s oldest problem."',
    pitch: `Amazon Web Services becomes the cloud backbone for every resident data record, NAC transaction, and behavioral score across all 50 facilities — the largest AWS public-sector deployment in history. Amazon Logistics handles supply chain for camp provisioning at a scale no other vendor can match. The Bezos Earth Fund co-funds the Urban Agriculture Ring, making Project Renaissance the world's largest urban food sovereignty project. Blue Origin's satellite broadband provides backup connectivity.`,
    value_props: [
      'AWS: exclusive cloud infrastructure for all 50 Renaissance facilities worldwide',
      'Amazon Logistics: supply chain operations for 650,000 residents at scale',
      'Bezos Earth Fund: $200M investment in Urban Agriculture Ring',
      'Amazon Jobs: preferred employer for 25,000 Renaissance graduates annually',
      'Blue Origin: backup LEO broadband for off-grid camp connectivity',
    ],
    roi: 'AWS contract value: $800M over 5 years. Amazon employer pipeline: 25K skilled graduates/year. Earth Fund ESG: measurable urban food security impact.',
    tier: 'Platinum Partner',
    urgency: 'AWS RFP closes Q2 2026. Amazon Jobs MOU ready.',
  },
  {
    id: 'gates',
    name: 'Bill Gates',
    person: 'Bill & Melinda Gates Foundation',
    category: 'Global Health & Education',
    logo: '💊',
    color: '#0078D4',
    ask: '$500M health + education endowment',
    equity: 'Curriculum naming rights + health system co-ownership',
    tagline: '"The most evidence-based social intervention ever proposed."',
    pitch: `The Gates Foundation exists to deliver evidence-based solutions to humanity's hardest problems. Project Renaissance is the first large-scale randomized intervention on homelessness that is fully measurable, fully accountable, and built from the ground up with data integrity. Gates funds the Medical & Wellness wing, co-develops the health outcome measurement system, and publishes findings that reshape global homelessness policy. The "Gates Health at Renaissance" brand becomes synonymous with measurable human transformation.`,
    value_props: [
      'Medical & Wellness wing co-funded: "Gates Health at Renaissance"',
      'Full longitudinal health outcome study: mental health, addiction, physical wellness',
      'Co-develop AI-driven health screening protocol deployed globally',
      'Education curriculum endowment: "Gates Digital Literacy Track"',
      'Global policy publication: replicable model for 196 countries',
    ],
    roi: 'Largest real-world health + education intervention ever measured. Global policy influence. Model replicated in 50+ countries = Gates Foundation\'s defining achievement.',
    tier: 'Health & Education Partner',
    urgency: 'Research partnership proposal submitted',
  },
  // Additional partners
  {
    id: 'andreessen',
    name: 'Andreessen Horowitz (a16z)',
    person: 'Marc Andreessen & Ben Horowitz',
    category: 'Venture Capital',
    logo: '🔬',
    color: '#7C3AED',
    ask: '$400M Series B co-lead',
    equity: '6% equity in Renaissance Holdings',
    tagline: '"Software is eating the world. Now it\'s eating homelessness."',
    pitch: `a16z's thesis on crypto, AI, and the American Dynamism portfolio converge perfectly in Project Renaissance. NAC is the most compelling behavioral crypto use case ever deployed. The AI infrastructure — Grok tutors, Palantir analytics, autonomous security — represents the full a16z portfolio in one project. This is the defining American Dynamism investment.`,
    value_props: [
      'Lead Series B investor with board representation',
      'a16z crypto arm co-architects NAC tokenomics',
      'American Dynamism Fund flagship portfolio company',
      'Full portfolio synergy: crypto + AI + defense tech + social infrastructure',
      'IPO pathway within 7 years at $100B+ valuation',
    ],
    roi: 'Ground-floor equity in what becomes the dominant global social OS. Comparable to early Airbnb or Coinbase — but with government backing.',
    tier: 'Lead Investor',
    urgency: 'Term sheet pending. Partner meeting Q2 2026.',
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    person: 'Jensen Huang, CEO',
    category: 'AI Infrastructure',
    logo: '🟢',
    color: '#76B900',
    ask: '$300M AI compute partnership',
    equity: 'Preferred AI infrastructure designation',
    tagline: '"The GPU that powers human transformation at scale."',
    pitch: `650,000 residents. Real-time behavioral scoring. AI tutors running 24/7. Predictive reintegration models. The compute requirements of Project Renaissance are extraordinary — and only NVIDIA can deliver them at this scale. We need a dedicated H100/B200 cluster for the NAC behavioral engine, AI tutoring system, and city-wide Palantir analytics layer.`,
    value_props: [
      'Dedicated H100/B200 cluster for NAC behavioral scoring engine',
      'AI tutoring powered by NVIDIA NIM microservices',
      'DGX Cloud partnership for all 50 facility AI workloads',
      'Largest single humanitarian AI deployment in history',
      'NVIDIA Inception Program flagship case study',
    ],
    roi: 'Multi-year compute contract: $1.5B total. Media value as "the GPU that ended homelessness" — priceless.',
    tier: 'AI Infrastructure Partner',
    urgency: 'DGX Cloud proposal submitted. Awaiting Jensen approval.',
  },
  {
    id: 'jpmorgan',
    name: 'JPMorgan Chase',
    person: 'Jamie Dimon, CEO',
    category: 'Banking & Finance',
    logo: '🏦',
    color: '#003087',
    ask: '$2B project finance + NAC banking rails',
    equity: 'Exclusive banking partner designation',
    tagline: '"The bank that bankrolled the end of American homelessness."',
    pitch: `Project Renaissance needs institutional banking infrastructure to manage $3.84B/year in operating costs across 50 facilities, handle NAC-to-USD conversion for graduating residents, and provide the financial rails for the world's first behavioral cryptocurrency at scale. JPMorgan's digital assets division and its community development lending arm are both perfect fits. This is the largest community development loan in American banking history.`,
    value_props: [
      'CRA-qualifying $2B community development loan — massive regulatory benefit',
      'NAC-to-USD conversion banking infrastructure for 50,000 graduates/year',
      'Project finance structuring for all 50 facility builds ($25B total)',
      'JPMorgan Coin integration as NAC settlement layer',
      '"Advancing Cities" program: largest single flagship initiative ever',
    ],
    roi: '$2B CRA credit. Fee income on 50M+ annual NAC transactions. Project finance fees on $25B construction. Brand leadership in ESG banking.',
    tier: 'Banking Partner',
    urgency: 'CRA compliance window — Q3 2026 application cycle',
  },
  {
    id: 'openai',
    name: 'OpenAI / Sam Altman',
    person: 'Sam Altman, CEO',
    category: 'AI & Research',
    logo: '🤖',
    color: '#10A37F',
    ask: '$100M AI research partnership',
    equity: 'Exclusive AI tutoring platform rights',
    tagline: '"AGI\'s first humanitarian deployment at population scale."',
    pitch: `OpenAI's mission is to ensure AGI benefits all of humanity. Project Renaissance is the most direct path to that mission ever proposed. GPT-5+ powers the personalized AI tutor for every resident — available 24/7, adapting to each individual's learning style, pace, and goals. This is the largest humanitarian deployment of OpenAI's technology and the most compelling proof that AI can lift people out of poverty.`,
    value_props: [
      'GPT-5+ as personalized AI tutor: 650,000 concurrent learners',
      'Largest humanitarian OpenAI deployment — mission-critical case study',
      'Behavioral fine-tuning dataset: unprecedented human transformation data',
      'OpenAI for Nonprofits flagship partnership with co-branding',
      'Published research: "AI as a Social Mobility Tool" — global citation impact',
    ],
    roi: 'Unmatched real-world training data on human behavioral change. Proof of mission. Global policy influence. IPO/valuation narrative for investors.',
    tier: 'AI Research Partner',
    urgency: 'API partnership in negotiation. Altman briefing Q1 2026.',
  },
];

const CATEGORY_COLORS = {
  'Tech & Defense': '#3B82F6',
  'Tech & Vision': '#a78bfa',
  'Media & Entertainment': '#F59E0B',
  'Venture & Philosophy': '#8B5CF6',
  'Government & Policy': '#EF4444',
  'Housing & Hospitality': '#FF5A5F',
  'Crypto & Finance': '#22C55E',
  'Philanthropy & Retail': '#0EA5E9',
  'Tech & Philanthropy': '#FF9900',
  'Global Health & Education': '#0078D4',
  'Venture Capital': '#7C3AED',
  'AI Infrastructure': '#76B900',
  'Banking & Finance': '#003087',
  'AI & Research': '#10A37F',
};

const TIER_ORDER = ['Founding Partner', 'Founding Investor', 'Platinum Partner', 'Lead Investor', 'Government Partner', 'Housing Partner', 'Crypto Partner', 'Supply Partner', 'Health & Education Partner', 'AI Infrastructure Partner', 'AI Research Partner', 'Banking Partner'];

const TIER_COLORS = {
  'Founding Partner':       'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Founding Investor':      'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Platinum Partner':       'text-primary bg-primary/10 border-primary/20',
  'Lead Investor':          'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Government Partner':     'text-red-400 bg-red-400/10 border-red-400/20',
  'Housing Partner':        'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'Crypto Partner':         'text-green-400 bg-green-400/10 border-green-400/20',
  'Supply Partner':         'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'Health & Education Partner': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'AI Infrastructure Partner':  'text-lime-400 bg-lime-400/10 border-lime-400/20',
  'AI Research Partner':        'text-teal-400 bg-teal-400/10 border-teal-400/20',
  'Banking Partner':             'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
};

const totalAsk = PARTNERS.reduce((sum, p) => {
  const match = p.ask.match(/\$([\d,.]+)([BM])/);
  if (!match) return sum;
  const val = parseFloat(match[1].replace(/,/g, ''));
  return sum + (match[2] === 'B' ? val * 1000 : val);
}, 0);

export default function InvestorPitch() {
  const [expanded, setExpanded] = useState(null);
  const [filterCat, setFilterCat] = useState('All');

  const categories = ['All', ...Array.from(new Set(PARTNERS.map(p => p.category)))];
  const filtered = filterCat === 'All' ? PARTNERS : PARTNERS.filter(p => p.category === filterCat);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="relative glass rounded-3xl p-8 md:p-12 border border-primary/20 overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 30% 50%, #3B82F6, transparent 60%), radial-gradient(circle at 70% 50%, #F59E0B, transparent 60%)' }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold tracking-widest mb-5">
            ⚡ CONFIDENTIAL — PROJECT RENAISSANCE · COALITION PITCH DECK
          </div>
          <h1 className="font-display font-black text-5xl md:text-7xl text-foreground mb-4">
            PARTNERS IN <span className="text-gradient-gold">HISTORY</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mb-8">
            Project Renaissance requires a coalition of the most powerful organizations in the world. Below is a tailored pitch for each partner — their ask, their return, and why they cannot afford to say no.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Partner Organizations', value: `${PARTNERS.length}` },
              { label: 'Total Capital Ask', value: `~$${Math.round(totalAsk / 1000).toFixed(1)}B` },
              { label: 'Lives Transformed', value: '653,100' },
              { label: 'Projected 10yr ROI', value: '$400B+' },
            ].map(s => (
              <div key={s.label} className="glass rounded-2xl p-4 border border-border/50 text-center">
                <div className="font-display font-black text-3xl text-gradient-gold">{s.value}</div>
                <div className="text-muted-foreground text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilterCat(cat)}
            className="px-4 py-1.5 rounded-full text-xs font-bold border transition-all"
            style={filterCat === cat
              ? { background: CATEGORY_COLORS[cat] || '#3B82F6', borderColor: CATEGORY_COLORS[cat] || '#3B82F6', color: '#0d1526' }
              : { borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Partner cards */}
      <div className="space-y-4">
        {filtered.map((partner, i) => {
          const isOpen = expanded === partner.id;
          const catColor = CATEGORY_COLORS[partner.category] || '#3B82F6';
          const tierStyle = TIER_COLORS[partner.tier] || 'text-primary bg-primary/10 border-primary/20';

          return (
            <motion.div key={partner.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary/30' : 'border-border/50 hover:border-border'}`}>
              {/* Card header — always visible */}
              <button className="w-full px-5 md:px-8 py-5 flex items-center gap-4 text-left"
                onClick={() => setExpanded(isOpen ? null : partner.id)}>
                <div className="text-3xl flex-shrink-0">{partner.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-display font-black text-xl text-foreground">{partner.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-bold flex-shrink-0 ${tierStyle}`}>{partner.tier}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">{partner.person}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full border font-semibold flex-shrink-0"
                      style={{ color: catColor, borderColor: `${catColor}30`, background: `${catColor}10` }}>
                      {partner.category}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block text-right flex-shrink-0">
                  <div className="font-display font-bold text-accent text-sm">{partner.ask}</div>
                  <div className="text-xs text-muted-foreground">{partner.equity}</div>
                </div>
                <div className="ml-2 text-muted-foreground flex-shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div className="px-5 md:px-8 pb-8 border-t border-border/30 pt-6 space-y-6">
                  {/* Tagline */}
                  <div className="text-lg md:text-xl font-display font-black italic" style={{ color: catColor }}>
                    {partner.tagline}
                  </div>

                  {/* Mobile ask row */}
                  <div className="md:hidden flex items-center justify-between glass rounded-xl p-3 border border-border/50">
                    <div>
                      <div className="text-xs text-muted-foreground">Capital Ask</div>
                      <div className="font-display font-bold text-accent">{partner.ask}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground">Equity / Return</div>
                      <div className="font-semibold text-sm text-foreground">{partner.equity}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Pitch */}
                    <div>
                      <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">The Pitch</div>
                      <p className="text-muted-foreground leading-relaxed text-sm">{partner.pitch}</p>
                    </div>

                    {/* Value props */}
                    <div>
                      <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">Why They Can't Say No</div>
                      <ul className="space-y-2">
                        {partner.value_props.map((v, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: catColor }} />
                            {v}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ROI + Urgency */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="glass rounded-xl p-4 border border-green-400/20">
                      <div className="text-xs font-bold text-green-400 tracking-widest uppercase mb-2 flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5" /> Return on Investment
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{partner.roi}</p>
                    </div>
                    <div className="glass rounded-xl p-4 border border-yellow-400/20">
                      <div className="text-xs font-bold text-yellow-400 tracking-widest uppercase mb-2 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5" /> Urgency / Next Step
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{partner.urgency}</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Coalition summary */}
      <div className="glass rounded-3xl p-8 border border-primary/20 text-center">
        <div className="text-xs font-bold text-primary tracking-widest uppercase mb-4">The Coalition Assembled</div>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {PARTNERS.map(p => (
            <button key={p.id}
              onClick={() => { setExpanded(p.id); setFilterCat('All'); setTimeout(() => document.getElementById(`partner-${p.id}`)?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/50 hover:border-primary/30 transition-all text-sm">
              <span>{p.logo}</span>
              <span className="text-muted-foreground text-xs">{p.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
          No single organization can solve homelessness. But <strong className="text-foreground">this coalition</strong> — the world's most powerful people, companies, and institutions — can. Every partner gets exactly what they need. And 653,100 Americans get their lives back.
        </p>
      </div>
    </div>
  );
}
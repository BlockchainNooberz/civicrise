import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, TrendingUp, Zap, Send, Mail, Globe, Twitter, Youtube, Phone, Copy, CheckCheck } from 'lucide-react';

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

function ClockWheel({ onSelect, selected }) {
  const count = PARTNERS.length;
  const radius = 42; // % of container
  const CENTER = 50;

  return (
    <div className="relative w-full" style={{ paddingBottom: '100%', maxWidth: 700, margin: '0 auto' }}>
      <div className="absolute inset-0">
        {/* Glow backdrop */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #F59E0B, #3B82F6, transparent)' }} />
        </div>

        {/* Outer orbit ring */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ pointerEvents: 'none' }}>
          <circle cx="50" cy="50" r={radius} fill="none"
            stroke="rgba(59,130,246,0.18)" strokeWidth="0.4" strokeDasharray="1.2 0.8" />
          <circle cx="50" cy="50" r={radius - 4} fill="none"
            stroke="rgba(245,158,11,0.08)" strokeWidth="0.2" />
          {/* Spoke lines */}
          {PARTNERS.map((_, i) => {
            const angle = (i / count) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x2 = CENTER + (radius - 1) * Math.cos(rad);
            const y2 = CENTER + (radius - 1) * Math.sin(rad);
            return (
              <line key={i} x1="50" y1="50" x2={x2} y2={y2}
                stroke="rgba(59,130,246,0.06)" strokeWidth="0.2" />
            );
          })}
        </svg>

        {/* Center piece */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center z-10 select-none"
            style={{ width: '38%' }}
          >
            <div className="glass-strong rounded-full flex flex-col items-center justify-center border border-yellow-400/30 glow-gold"
              style={{ aspectRatio: '1', padding: '8%' }}>
              <div className="font-display font-black text-gradient-gold leading-tight"
                style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}>
                LET'S MAKE
              </div>
              <div className="font-display font-black text-foreground leading-tight"
                style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}>
                IT
              </div>
              <div className="font-display font-black text-gradient-gold leading-tight"
                style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}>
                HAPPEN!
              </div>
              <div className="text-muted-foreground mt-1" style={{ fontSize: 'clamp(0.5rem, 1vw, 0.75rem)' }}>
                {PARTNERS.length} Partners
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partner nodes around the clock */}
        {PARTNERS.map((partner, i) => {
          const angle = (i / count) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = CENTER + radius * Math.cos(rad);
          const y = CENTER + radius * Math.sin(rad);
          const isSelected = selected === partner.id;

          return (
            <motion.button
              key={partner.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              onClick={() => onSelect(partner.id)}
              title={partner.name}
              className="absolute flex flex-col items-center"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 20,
              }}
            >
              {/* Circle */}
              <div
                className="rounded-full flex items-center justify-center transition-all duration-300 border-2"
                style={{
                  width: 'clamp(36px, 6vw, 58px)',
                  height: 'clamp(36px, 6vw, 58px)',
                  background: isSelected ? partner.color : 'rgba(13,21,38,0.92)',
                  borderColor: partner.color,
                  boxShadow: isSelected ? `0 0 18px ${partner.color}80` : `0 0 6px ${partner.color}30`,
                  fontSize: 'clamp(14px, 2vw, 22px)',
                }}
              >
                {partner.logo}
              </div>
              {/* Label */}
              <div
                className="font-display font-bold text-center leading-tight mt-1 transition-colors"
                style={{
                  color: isSelected ? partner.color : '#94a3b8',
                  fontSize: 'clamp(7px, 0.9vw, 11px)',
                  maxWidth: 'clamp(48px, 8vw, 72px)',
                  lineHeight: 1.1,
                }}
              >
                {partner.name.split(' ')[0]}
                {partner.name.split(' ')[1] && partner.name.split(' ')[1].length < 7 ? ` ${partner.name.split(' ')[1]}` : ''}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

export default function InvestorPitch() {
  const [expanded, setExpanded] = useState(null);
  const [filterCat, setFilterCat] = useState('All');
  const [clockSelected, setClockSelected] = useState(null);

  const categories = ['All', ...Array.from(new Set(PARTNERS.map(p => p.category)))];
  const filtered = filterCat === 'All' ? PARTNERS : PARTNERS.filter(p => p.category === filterCat);

  const handleClockSelect = (id) => {
    setClockSelected(id === clockSelected ? null : id);
    setFilterCat('All');
    setExpanded(id === clockSelected ? null : id);
    setTimeout(() => {
      document.getElementById(`partner-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const clockPartner = clockSelected ? PARTNERS.find(p => p.id === clockSelected) : null;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-8">

      {/* Clock Wheel Hero */}
      <div className="relative glass rounded-3xl border border-primary/20 overflow-hidden py-8 px-4">
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 50% 50%, #F59E0B, transparent 70%)' }} />
        <div className="relative text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs font-bold tracking-widest">
            ⚡ CONFIDENTIAL — PROJECT RENAISSANCE · COALITION PITCH DECK
          </div>
        </div>

        <ClockWheel onSelect={handleClockSelect} selected={clockSelected} />

        {/* Selected partner quick-view */}
        {clockPartner && (
          <motion.div
            key={clockPartner.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 mx-auto max-w-2xl glass rounded-2xl p-5 border"
            style={{ borderColor: `${clockPartner.color}40` }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{clockPartner.logo}</span>
              <div>
                <div className="font-display font-black text-xl" style={{ color: clockPartner.color }}>{clockPartner.name}</div>
                <div className="text-xs text-muted-foreground">{clockPartner.person} · {clockPartner.tier}</div>
              </div>
              <div className="ml-auto text-right hidden sm:block">
                <div className="font-display font-bold text-accent text-sm">{clockPartner.ask}</div>
                <div className="text-xs text-muted-foreground">{clockPartner.equity}</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic mb-2">{clockPartner.tagline}</p>
            <button onClick={() => document.getElementById(`partner-${clockPartner.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="text-xs font-bold px-3 py-1.5 rounded-full border transition-colors"
              style={{ color: clockPartner.color, borderColor: `${clockPartner.color}40` }}>
              View Full Pitch ↓
            </button>
          </motion.div>
        )}

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
          {[
            { label: 'Partners', value: `${PARTNERS.length}` },
            { label: 'Total Capital Ask', value: `~$${Math.round(totalAsk / 1000).toFixed(1)}B` },
            { label: 'Lives Transformed', value: '653,100' },
            { label: '10yr ROI', value: '$400B+' },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-3 border border-border/50 text-center">
              <div className="font-display font-black text-2xl text-gradient-gold">{s.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
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
              id={`partner-${partner.id}`}
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

      {/* MrBeast FIRST — priority outreach card */}
      <MrBeastOutreach />

      {/* Outreach Strategy */}
      <OutreachStrategy />

      {/* Coalition footer */}
      <div className="glass rounded-3xl p-8 border border-primary/20 text-center">
        <div className="font-display font-black text-3xl md:text-4xl text-gradient-gold mb-3">LET'S MAKE IT HAPPEN!</div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
          No single organization can solve homelessness. But <strong className="text-foreground">this coalition</strong> — the world's most powerful people, companies, and institutions — can. Every partner gets exactly what they need. And 653,100 Americans get their lives back.
        </p>
      </div>
    </div>
  );
}

function MrBeastOutreach() {
  const [copied, setCopied] = useState(null);

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const dmTemplate = `Hey Jimmy — I'm building something I think you'll genuinely love. Project Renaissance: a crypto-incentivized rehab city for 650,000 homeless Americans. They earn real coin, learn AI & trade skills, and graduate into jobs. I need your brain on the content side — this makes Beast Games look small. Can I get 20 minutes? Demo link: [YOUR_DEMO_LINK]`;

  const emailTemplate = `Subject: Beast Games meets the biggest human transformation story ever told

Jimmy,

I'll keep it short because I know you value that.

Project Renaissance: a privately operated, crypto-powered city where 650,000 homeless Americans earn digital currency, learn AI skills, and graduate into real jobs. The outcomes data is wild. The content potential is historic.

I want Beast Games: Renaissance Edition to be the most-watched redemption story in human history — and I need you to make it real.

20 minutes. That's all I'm asking. Here's the demo: [YOUR_DEMO_LINK]

— [Your Name]`;

  return (
    <div className="glass rounded-3xl border-2 p-6 md:p-10 overflow-hidden relative"
      style={{ borderColor: '#F59E0B60' }}>
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 20% 50%, #F59E0B, transparent 60%)' }} />

      <div className="relative">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">👑</span>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/30 text-yellow-400 text-xs font-black tracking-widest mb-1">
              🔥 PRIORITY #1 — REACH OUT FIRST
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl text-foreground">MrBeast Isn't Confirmed Yet.</h2>
          </div>
        </div>
        <p className="text-muted-foreground mb-6 max-w-3xl leading-relaxed">
          Jimmy Donaldson is the single highest-leverage first contact. His public endorsement unlocks every other conversation — it signals cultural legitimacy that no press release can buy. He hasn't heard the pitch yet.{' '}
          <strong className="text-yellow-400">He needs to. Today.</strong>
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Twitter, label: 'X / Twitter DM', handle: '@MrBeast', color: '#1DA1F2', note: 'High read rate. Keep it 3 sentences + demo link.' },
            { icon: Youtube, label: 'YouTube Business', handle: 'mrbeast.com/contact', color: '#FF0000', note: 'Official business inquiry — goes to his management team.' },
            { icon: Mail, label: 'Direct Email', handle: 'Via Beast Industries', color: '#F59E0B', note: 'Reach through a known mutual contact or via his agent Reed Duchscher.' },
          ].map(c => (
            <div key={c.label} className="glass rounded-2xl p-4 border border-border/50">
              <c.icon className="w-5 h-5 mb-2" style={{ color: c.color }} />
              <div className="font-display font-bold text-sm text-foreground mb-0.5">{c.label}</div>
              <div className="text-xs font-mono text-muted-foreground mb-2">{c.handle}</div>
              <div className="text-xs text-muted-foreground leading-relaxed">{c.note}</div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="text-xs font-bold text-yellow-400 tracking-widest uppercase mb-2">Copy-Ready Outreach Templates</div>

          {[
            { id: 'dm', label: '💬 DM / Short Message', text: dmTemplate },
            { id: 'email', label: '📧 Email Template', text: emailTemplate },
          ].map(t => (
            <div key={t.id} className="glass rounded-xl border border-border/50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
                <span className="text-xs font-bold text-muted-foreground">{t.label}</span>
                <button onClick={() => copyText(t.text, t.id)}
                  className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-border/50 hover:border-yellow-400/40 transition-colors text-muted-foreground hover:text-yellow-400">
                  {copied === t.id ? <CheckCheck className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied === t.id ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="text-xs text-muted-foreground p-4 whitespace-pre-wrap leading-relaxed font-body">{t.text}</pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutreachStrategy() {
  const [open, setOpen] = useState(null);

  const strategies = [
    {
      id: 'demo_link',
      icon: Globe,
      color: '#3B82F6',
      title: 'Send the Private Demo Link',
      subtitle: 'The most powerful first impression you can make.',
      steps: [
        'Share the /demo-access URL directly — no public post, no mass email. One link, one person, with their name in the message.',
        'Use the phrase: "This was built for a specific tier of person. I think you\'re one of them."',
        'Include the access key in a separate message — creates intrigue and filters for follow-through.',
        'The demo page itself names them among the chosen. That\'s intentional. They\'ll feel it.',
      ],
    },
    {
      id: 'warm_intro',
      icon: Phone,
      color: '#a78bfa',
      title: 'Get a Warm Introduction',
      subtitle: 'Cold messages get read. Warm intros get meetings.',
      steps: [
        'For Elon: route through David Sacks (DOGE AI czar) or any Neuralink/SpaceX-adjacent contact.',
        'For Peter Thiel: reach via Founders Fund LP network or a Palantir connection.',
        'For a16z: submit to their American Dynamism portfolio page — they actively look for this.',
        'For MrBeast: Reed Duchscher (manager) is the gatekeeper. One well-placed intro beats 100 cold DMs.',
        'For Trump / White House: route through DOGE or a congressional office. Ezra Cohen-Watnick, Brendan Carr.',
      ],
    },
    {
      id: 'viral_hook',
      icon: Twitter,
      color: '#F59E0B',
      title: 'Create a Viral Hook Moment',
      subtitle: 'Make them come to you.',
      steps: [
        'Post a 60-second video: "What if instead of $64,000/person on shelters, we spent $3,840 and they left with a job, savings, and a skill?" — no branding, just data.',
        'Tag the right people without asking for anything. Curiosity drives clicks.',
        'Get the landing page link in comments before the post goes viral — not after.',
        'If MrBeast reposts anything related, the entire coalition conversation accelerates.',
        'X/Twitter thread with the cost comparison data tends to get picked up by tech press without prompting.',
      ],
    },
    {
      id: 'conference',
      icon: Send,
      color: '#22C55E',
      title: 'Appear Where They Are',
      subtitle: 'Physical presence still beats digital reach.',
      steps: [
        'Davos, TED, SXSW, and the All-In Summit are where all of these people converge.',
        'Prepare a 3-minute verbal pitch: "I\'m building a crypto-incentivized city for homeless Americans. $320/month. 94% employment rate. Needs your name on it."',
        'Have the demo link in your phone. Airpod out, phone out, demo playing before they finish saying hello.',
        'For government contacts: request a meeting through their public scheduling office with subject line: "DOGE-Aligned Homelessness Solution — Request for 15 Minutes."',
        'For investors: YC Demo Day alumni network, a16z office hours, and Sequoia scout network are all accessible.',
      ],
    },
  ];

  return (
    <div className="glass rounded-3xl p-6 md:p-10 border border-border/50">
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black tracking-widest mb-3">
          📡 OUTREACH PLAYBOOK
        </div>
        <h2 className="font-display font-black text-3xl md:text-4xl text-foreground mb-2">
          HOW TO MAKE SURE THEY <span className="text-gradient-blue">ALL SEE THIS.</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          The demo exists. The pitch is built. The only question is delivery. Here are four vectors — use all of them in parallel.
          <strong className="text-foreground"> Not because we're playing games. Because 653,100 people are depending on us getting this right.</strong>
        </p>
      </div>

      <div className="space-y-3">
        {strategies.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <motion.div key={s.id}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border/40 overflow-hidden">
              <button className="w-full flex items-center gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : s.id)}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: `${s.color}20`, border: `1px solid ${s.color}40` }}>
                  <s.icon className="w-4 h-4" style={{ color: s.color }} />
                </div>
                <div className="flex-1">
                  <div className="font-display font-bold text-lg text-foreground">{s.title}</div>
                  <div className="text-xs text-muted-foreground">{s.subtitle}</div>
                </div>
                {isOpen ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-5 pb-5 border-t border-border/30 pt-4">
                      <ol className="space-y-3">
                        {s.steps.map((step, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="font-display font-black text-sm flex-shrink-0 mt-0.5" style={{ color: s.color }}>{j + 1}.</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
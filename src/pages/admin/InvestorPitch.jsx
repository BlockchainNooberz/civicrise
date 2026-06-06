import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, TrendingUp, Zap, Send, Mail, Globe, Twitter, Phone, Copy, CheckCheck, ChevronLeft, ChevronRight, MapPin, Shield, Lock } from 'lucide-react';

const ISLAND = {
  name: 'Vieques Island',
  designation: 'US Federal Territory · Puerto Rico',
  coords: '18.1262° N, 65.4400° W',
  area: '135 km² (52 sq mi)',
  status: 'Former US Navy installation — federally controlled land available for reactivation',
  rationale: [
    'US-controlled territory — no foreign sovereignty complications',
    '22,000 acres of former US Navy land, already partially decommissioned',
    'Existing deep-water port (Roosevelt Roads Naval Station adjacent)',
    'Climate-optimal: 82°F avg, hurricane-resistant infrastructure zones available',
    'Only 8,000 civilian residents — negotiable relocation with compensation',
    'Caribbean location provides natural perimeter security (ocean border)',
    'Puerto Rico tax incentives: Act 20/22 favorable for program entity structure',
  ],
  alt: 'Alternatives scouted: Johnston Atoll (Pacific, too remote), Desecheo (uninhabited, no infrastructure), Guam (geopolitical sensitivity). Vieques is the optimal choice.',
};

const PARTNERS = [
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
    pitch: `Palantir's Gotham and Foundry platforms are tailor-made for a challenge of this scale. We need real-time behavioral analytics, predictive reintegration modeling, and a unified data layer across all facilities. This is the largest social OS deployment in American history — and Palantir is the only company on Earth equipped to run it.`,
    value_props: [
      'Gotham platform for resident risk scoring & reintegration prediction',
      'Foundry as the operational data backbone across all facilities',
      'AIP integration for AI-driven case management and counseling support',
      'Largest single Palantir social-sector deployment ever — massive PR value',
      'Direct pipeline to DoD/DHS as proof of domestic AI welfare infrastructure',
    ],
    roi: 'Vieques alone = 10-year $5B data services contract. Government replication across all 50 states = $40B TAM.',
    tier: 'Platinum Partner',
    urgency: 'Phase 1 RFP closes Q3 2026',
    carousel: [
      { headline: 'The Data Backbone', body: 'Every resident profile, behavioral score, NAC transaction, and reintegration prediction runs on Palantir Foundry. Phase 1 live today. 650,000 at scale. One unified graph.' },
      { headline: 'Predictive Reintegration', body: 'Gotham flags residents approaching Citizen-Ready before staff even notice. Proactive intervention. Better outcomes. Fewer re-entries.' },
      { headline: 'Proof of Concept for DHS', body: 'This is the domestic AI welfare OS that every federal agency will want to license. Palantir gets first-mover positioning on a $40B TAM.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Direct Email', handle: 'karp@palantir.com (exec team)', note: 'Formal RFP framing. Subject: "Data Infrastructure RFP — Project Renaissance Phase 1."' },
        { label: '🤝 Warm Intro', handle: 'Via Founders Fund / Peter Thiel', note: 'Thiel is a Palantir co-founder. A Thiel intro to Karp is a guaranteed read.' },
        { label: '💼 LinkedIn', handle: 'Alex Karp — CEO Palantir', note: 'Short note: "Building the largest social OS in history. Need Palantir. 10 minutes?"' },
      ],
      templates: [
        { id: 'palantir-dm', label: '💬 Short Pitch', text: `Alex — I'm building a crypto-incentivized reintegration city on Vieques Island for 650,000 Americans. We need Palantir as our operating system. Real-time behavioral scoring, reintegration prediction, the works. This is Gotham and Foundry's defining deployment. Can I get 20 minutes? Demo: [YOUR_DEMO_LINK]` },
        { id: 'palantir-email', label: '📧 Email Template', text: `Subject: Project Renaissance — Data Infrastructure RFP (Palantir-Exclusive)\n\nAlex,\n\nProject Renaissance is a privately operated reintegration city on Vieques Island — Phase 1 operational and scaling to 650,000. We need a real-time behavioral data OS, predictive reintegration modeling, and a unified resident graph across 50+ facilities.\n\nThere is one platform on Earth equipped to run this. You know who it is.\n\nI'd like to get your team on a call. The RFP is ready. The timeline is Q3 2026.\n\nHere's the demo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    tagline: '"The perimeter defense stack for civilization reborn."',
    pitch: `Anduril's Lattice platform and autonomous sentry systems are the only viable solution for securing Vieques Island's natural perimeter — an ocean-bounded self-contained facility. We need AI-guided coastal patrol drones, checkpoint biometrics, and real-time threat detection. Vieques eliminates the land perimeter problem entirely. Anduril covers the coastline.`,
    value_props: [
      'Lattice AI for island perimeter threat monitoring across all 6 checkpoint gates',
      'Autonomous coastal drone patrol replacing a bloated human security force',
      'Ghost-4 autonomous systems for shoreline enforcement 24/7',
      'Sentry Tower deployment at all high-risk coastal entry points',
      'Largest real-world autonomous island-defense deployment in history',
    ],
    roi: 'Long-term contract + proof of concept for domestic autonomous perimeter tech. Blueprint for 50 future facilities.',
    tier: 'Platinum Partner',
    urgency: 'Security contract award: Q4 2026',
    carousel: [
      { headline: 'Island = Natural Perimeter', body: 'The ocean is the fence. Anduril patrols it. No land wall needed. Ghost-4 drones cover every meter of Vieques coastline autonomously, 24/7.' },
      { headline: 'Zero Guard Bloat', body: 'Replacing 2,400 human security positions with autonomous systems reduces operational cost by 71% while improving response time by 8x.' },
      { headline: 'DoD Proof of Concept', body: 'The largest domestic autonomous security deployment ever. DoD and DHS licensing potential: $15B+ over a decade.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Direct Email', handle: 'palmer@anduril.com', note: 'Palmer personally reviews defense proposals. Keep it direct and technical.' },
        { label: '🐦 X / Twitter', handle: '@PalmerLuckey', note: 'Very active. Quote a relevant tweet of his about autonomous systems + island perimeter angle.' },
        { label: '🤝 Warm Intro', handle: 'Via a16z or Founders Fund', note: 'Both are Anduril investors. A portfolio company intro fast-tracks the conversation.' },
      ],
      templates: [
        { id: 'anduril-dm', label: '💬 X DM', text: `Palmer — we're building a reintegration city on Vieques Island. Ocean perimeter. No land wall. Perfect Anduril deployment. Ghost-4 patrols, Lattice AI, sentry towers at every coastal entry. Largest domestic autonomous security deployment ever. 20 minutes? [YOUR_DEMO_LINK]` },
        { id: 'anduril-email', label: '📧 Email Template', text: `Subject: Vieques Island — Autonomous Perimeter Security Contract\n\nPalmer,\n\nProject Renaissance is a sovereign reintegration facility on Vieques Island, Puerto Rico. US federal territory. 135 km². Ocean border. No land perimeter needed.\n\nWe need Anduril to own the coastline. Ghost-4 autonomous patrol fleet. Lattice AI threat monitoring. Sentry towers at all coastal entry points. 24/7. No human guard force.\n\nThis is Anduril's largest domestic deployment. It proves the technology at civilian scale and opens a $15B DoD/DHS licensing pathway.\n\nDemo here: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    tagline: '"Make America Whole — starting with the people everyone else abandoned."',
    pitch: `Four pillars. One island. Tesla provides the energy grid — Megapack solar + Powerwalls for 100% energy independence on Vieques. Starlink provides Tier-1 broadband to every resident on Day 1. xAI's Grok powers the resident AI tutor and behavioral analytics. Tesla Optimus robots handle infrastructure maintenance across the island. This is the largest integrated Tesla product stack deployment on Earth.`,
    value_props: [
      'Tesla Megapack + Solar Roof: full energy independence for Vieques Island',
      'Starlink: guaranteed high-speed internet to every resident from intake',
      'xAI Grok: personalized AI tutor + behavioral counselor for each resident',
      'Tesla Optimus: 500 robots handling maintenance, logistics, agriculture',
      'Full-stack integration proving Tesla ecosystem viability at island scale',
    ],
    roi: '$50B+ in product deployment value. Proof-of-concept for Tesla Energy + xAI as sovereign infrastructure providers.',
    tier: 'Founding Partner',
    urgency: 'DOGE partnership pathway — executive alignment ready',
    carousel: [
      { headline: 'The Energy Island', body: 'Tesla Megapacks and solar arrays make Vieques 100% energy independent. No grid dependency. No utility lobbying. Clean power for 650,000 residents off Puerto Rico.' },
      { headline: 'Grok as Life Coach', body: 'Every resident gets a personalized xAI Grok tutor available 24/7 — adapting to their learning pace, mental state, and certification track. The first population-scale AI behavioral coach.' },
      { headline: 'Optimus City', body: '500 Tesla Optimus robots handle maintenance, logistics, and agriculture across the island. The largest real-world Optimus deployment on Earth.' },
    ],
    outreach: {
      channels: [
        { label: '🐦 X / Twitter', handle: '@elonmusk', note: 'Elon reads everything on X. Tag with data. Short. Provocative. No ask in the first message.' },
        { label: '🤝 DOGE Pathway', handle: 'David Sacks / Vivek Ramaswamy', note: 'Route through the DOGE AI czar. This is a DOGE-aligned initiative — use that framing.' },
        { label: '📧 xAI / Tesla BD', handle: 'business@x.ai / bd@tesla.com', note: 'Submit formal multi-entity partnership proposal to all three BD teams simultaneously.' },
      ],
      templates: [
        { id: 'elon-dm', label: '💬 X Post / DM', text: `@elonmusk — Vieques Island. US-controlled. 135 km². Ocean perimeter. Tesla Megapacks for energy independence. Starlink for every resident Day 1. Grok as the AI tutor. Optimus for infrastructure. 650,000 Americans earning crypto and learning AI skills instead of living in shelters at $64K/person/year. This is DOGE's greatest domestic win. Demo: [YOUR_DEMO_LINK]` },
        { id: 'elon-email', label: '📧 Multi-Entity Pitch', text: `Subject: Tesla + Starlink + xAI + Optimus — Project Renaissance\n\nElon,\n\nProject Renaissance is a sovereign island reintegration city — Vieques, Puerto Rico. US federal land. We're building the full Tesla stack:\n\n• Tesla Megapack + Solar: 100% energy independence\n• Starlink: broadband for every resident from Day 1\n• xAI Grok: personalized tutor for 650,000 learners\n• Optimus: 500 robots running island infrastructure\n\nThis is the largest integrated Tesla product deployment on Earth. DOGE alignment. $50B+ product deployment value. The story writes itself.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'mrbeast',
    name: 'MrBeast (Jimmy Donaldson)',
    person: 'Jimmy Donaldson',
    category: 'Media & Entertainment',
    logo: '👑',
    color: '#F59E0B',
    ask: '$100M content + brand partnership',
    equity: 'Content franchise co-ownership',
    tagline: '"The most watched redemption arc in human history."',
    pitch: `This isn't charity content — this is the most compelling long-form series ever produced. Real people. Real stakes. Real transformations on a real island. MrBeast gets content rights and a franchise. We get cultural legitimacy that no marketing budget could buy. YouTube/Netflix licensing revenue shared 50/50 with the resident housing fund.`,
    value_props: [
      'Quarterly "Citizen Graduation" specials — 100M+ view guarantee',
      'MrBeast brand = voluntary intake rates 3x higher than traditional shelters',
      'First-of-kind homeless-to-citizen transformation media franchise',
      'YouTube/Netflix licensing revenue shared 50/50 with resident housing fund',
      'Viral recruitment drives 40% lower intake cost per resident',
    ],
    roi: 'Content franchise estimated at $2B+ over 5 years. Brand value to program: immeasurable.',
    tier: 'Founding Partner',
    urgency: 'Exclusive media rights window: 90 days',
    carousel: [
      { headline: 'The Content Franchise', body: 'Redemption. Real stakes. A real island. This is the most compelling long-form content series ever proposed — and MrBeast gets to own a piece of it.' },
      { headline: 'Cultural Legitimacy', body: 'One MrBeast post about Vieques drives more voluntary intake than $50M in government advertising. The brand is the unlock.' },
      { headline: '$2B Content Empire', body: 'YouTube + Netflix licensing over 5 years. Quarterly graduation specials. A franchise that funds itself — and funds the housing fund simultaneously.' },
    ],
    outreach: {
      channels: [
        { label: '🐦 X / Twitter DM', handle: '@MrBeast', note: 'High read rate. Keep it 3 sentences + demo link. No ask in the first message.' },
        { label: '📧 Beast Industries', handle: 'Via Reed Duchscher (Manager)', note: 'Reed is the gatekeeper. One well-placed intro to Reed beats 100 cold DMs to Jimmy.' },
        { label: '▶️ YouTube Business', handle: 'mrbeast.com/contact', note: 'Official business inquiry — routes to management. Use for formal partnership framing.' },
      ],
      templates: [
        { id: 'mrbeast-dm', label: '💬 X DM / Short Message', text: `Hey Jimmy — I'm building something I think you'll genuinely love. Project Renaissance: a crypto-incentivized reintegration city on a real island for 650,000 homeless Americans. They earn real coin, learn AI & trade skills, and graduate into jobs. I need your brain on the content side — this is the most compelling human transformation story ever filmed. Can I get 20 minutes? Demo: [YOUR_DEMO_LINK]` },
        { id: 'mrbeast-email', label: '📧 Email Template', text: `Subject: The most watched redemption arc in human history — and I need you to make it real\n\nJimmy,\n\nI'll keep it short because I know you value that.\n\nProject Renaissance: a privately operated, crypto-powered reintegration city on Vieques Island where 650,000 Americans earn digital currency, learn AI skills, and graduate into real jobs. The outcomes data is wild. The content potential is historic.\n\nReal people. Real island. Real stakes. No script. This is the greatest human transformation story ever filmed — and it runs 365 days a year.\n\n20 minutes. That's all I'm asking. Here's the demo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `Thiel's thesis: back visionaries building the future governments refuse to. Project Renaissance is precisely that — a privately operated, crypto-incentivized social operating system running outside traditional bureaucracy on a US-controlled island. Zero-to-one: this has never been done. NAC as a behavioral currency is the first real-world test of cryptographic reputation systems at population scale.`,
    value_props: [
      'First private alternative to government welfare at full national scale',
      'NAC cryptocurrency creates an entirely new asset class: behavioral capital',
      'Palantir-adjacent deal flow — Peter already understands the data angle',
      'Zero-to-one innovation: no comparable model exists globally',
      'Exit paths: IPO, government acquisition, or perpetual cash-generating endowment',
    ],
    roi: 'Conservative 10-year valuation: $80B if replicated globally. First-mover equity locked at ground floor.',
    tier: 'Founding Investor',
    urgency: 'Term sheet drafted. Needs signature.',
    carousel: [
      { headline: 'The Monopoly on Virtue', body: 'No competitor. No comparable model. The first private social OS at national scale — and Thiel Capital gets in at ground floor.' },
      { headline: 'NAC: Behavioral Capital', body: 'A new asset class. Cryptographic reputation currency backed by measurable human progress. Thiel has been waiting for this use case for 15 years.' },
      { headline: '$80B Exit Thesis', body: 'Replicate to 20 countries. License the model to 50 US cities. Government acquisition of the infrastructure layer. Multiple exit vectors, all enormous.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Founders Fund', handle: 'info@foundersfund.com', note: 'Submit a formal investment memo. Thiel\'s team reviews every submission personally.' },
        { label: '🤝 Palantir Connection', handle: 'Via Alex Karp or early Palantir team', note: 'Thiel co-founded Palantir. Any early Palantir employee is a direct warm intro path.' },
        { label: '📚 Libertarian Circle', handle: 'Via Seasteading Institute or CATO', note: 'Thiel is embedded in libertarian intellectual circles. A philosopher-investor intro works.' },
      ],
      templates: [
        { id: 'thiel-dm', label: '💬 Short Pitch', text: `Peter — Zero to one. Private social OS. Crypto behavioral currency. No government. No bureaucracy. Island city off Puerto Rico. 650,000 Americans. Series A open. This is what you've been waiting for. Demo: [YOUR_DEMO_LINK]` },
        { id: 'thiel-email', label: '📧 Investment Memo Cover', text: `Subject: Zero to One — The Private Welfare OS\n\nPeter,\n\nThe attached is an investment memo for Project Renaissance — the first privately operated, crypto-incentivized reintegration city in American history.\n\nKey thesis:\n• No comparable model exists. This is zero-to-one.\n• NAC behavioral currency = new asset class.\n• 8% equity at ground floor of what becomes a $80B+ global platform.\n• Government can never outcompete it — they'll eventually acquire it.\n\nVieques Island. Phase 1 operational today. Scaling to 650,000.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `This is the signature domestic achievement of the second Trump term. Americans off the streets — not shuffled into failing shelters, but earning crypto, learning AI skills, and graduating into jobs on Vieques Island. It saves $40B/year in government waste. It's the Trump answer to every domestic crisis at once. Name the facility "Trump Renaissance Island" — every graduate becomes a testament.`,
    value_props: [
      'Ends the crisis faster than any prior administration — ever',
      'Saves taxpayers $40B+ annually vs. current shelter spending model',
      'DOGE-aligned: eliminates 12 redundant federal agencies',
      'Reactivates former US Navy territory — zero new land acquisition needed',
      '"Trump Renaissance Island" naming rights for flagship Vieques facility',
    ],
    roi: 'Historical legacy: "The president who solved American homelessness." Electoral impact: massive.',
    tier: 'Government Partner',
    urgency: 'DOGE review scheduled. Congressional briefing ready.',
    carousel: [
      { headline: 'The Legacy Move', body: 'One executive order reactivates Vieques, funds Phase 1, and makes this the defining domestic achievement of the Trump second term.' },
      { headline: '$40B Annual Savings', body: 'DOGE loves this. Replace 12 federal agencies with one island-based operating system. The math is undeniable.' },
      { headline: 'Trump Renaissance Island', body: 'The naming rights alone are worth it. Every graduate who gets a job and a life becomes a permanent piece of this administration\'s legacy.' },
    ],
    outreach: {
      channels: [
        { label: '🏛️ DOGE Office', handle: 'Via David Sacks / Elon Musk', note: 'DOGE is the fastest pathway. Frame as "$40B annual savings + eliminates 12 agencies."' },
        { label: '📋 Congressional', handle: 'Scheduling via WH.gov', note: 'Submit to the Office of Domestic Policy. Subject line must include "DOGE-aligned savings."' },
        { label: '🤝 Mar-a-Lago Network', handle: 'Via Trump Organization contacts', note: 'A trusted intermediary in the Trump orbit beats any formal channel.' },
      ],
      templates: [
        { id: 'trump-dm', label: '💬 Executive Summary', text: `Project Renaissance — DOGE-Aligned Domestic Policy Win\n\n• Vieques Island reactivated as sovereign reintegration city\n• Replaces 12 federal homelessness agencies\n• Saves $40B/year vs. current spending\n• 650,000 Americans earning crypto, learning AI, graduating into jobs\n• "Trump Renaissance Island" — naming rights for flagship facility\n\nDemo: [YOUR_DEMO_LINK]` },
        { id: 'trump-email', label: '📧 Policy Brief', text: `Subject: DOGE-Aligned Homelessness Solution — Saves $40B/Year\n\nTo the Office of Domestic Policy,\n\nProject Renaissance is a privately operated reintegration facility on Vieques Island — formerly US Navy land, zero acquisition cost.\n\nKey policy wins:\n• Eliminates 12 redundant federal agencies\n• $40B+ annual taxpayer savings\n• 650,000 Americans in structured reintegration programs\n• Zero constitutional concerns — fully voluntary for homeless populations\n• "Trump Renaissance Island" naming opportunity for flagship facility\n\nRequests: Executive Order for Vieques reactivation + $5B initial federal allocation.\n\nBriefing available at request. Demo: [YOUR_DEMO_LINK]` },
      ],
    },
  },
  {
    id: 'blackrock',
    name: 'BlackRock / Larry Fink',
    person: 'Larry Fink, Chairman & CEO',
    category: 'Asset Management',
    logo: '🏔️',
    color: '#1D4ED8',
    ask: '$3B infrastructure fund + ESG vehicle',
    equity: 'Exclusive Renaissance Infrastructure REIT management',
    tagline: '"The purpose economy meets the most scalable ESG asset class ever built."',
    pitch: `Larry Fink has spent a decade demanding that corporations demonstrate purpose alongside profit. Project Renaissance is the first investment vehicle where purpose IS the profit mechanism. BlackRock creates the Renaissance Infrastructure REIT — managing Vieques construction, the 50-facility national buildout, and the NAC treasury reserves. The ESG metrics are unprecedented: every dollar deployed is directly traceable to a human life transformed.`,
    value_props: [
      'Renaissance Infrastructure REIT: $25B total buildout under BlackRock management',
      'NAC treasury reserve management — first behavioral currency institutional custodian',
      'ESG metrics that are literally measured in human lives changed',
      'Federal backing creates investment-grade bond rating from Day 1',
      'Global replication: 50 countries × $500M per facility = $25B TAM for BlackRock',
    ],
    roi: 'Management fees on $25B. First-mover ESG narrative that redefines the asset class. Government-backed returns with philanthropic branding.',
    tier: 'Platinum Investor',
    urgency: 'Infrastructure REIT structure ready for BlackRock legal review',
    carousel: [
      { headline: 'Purpose Meets Return', body: 'Larry Fink said purpose and profit must coexist. This is the first instrument where they are literally the same thing. Every basis point of return = a resident closer to reintegration.' },
      { headline: 'The Renaissance REIT', body: '$25B infrastructure buildout. BlackRock manages it. Government-backed. ESG-certified. First-mover positioning in a new institutional asset class.' },
      { headline: 'Global Replication', body: '50 countries have homelessness crises. BlackRock licenses the model, manages the fund, collects fees. The TAM is virtually unlimited.' },
    ],
    outreach: {
      channels: [
        { label: '📧 BlackRock Direct', handle: 'larry.fink@blackrock.com', note: 'Fink reads investment memos personally. Lead with the REIT structure and ESG metrics.' },
        { label: '🏦 Institutional Relations', handle: 'BlackRock Alternatives team', note: 'Submit the REIT structure through BlackRock Alternatives — they manage infrastructure funds.' },
        { label: '🤝 Sovereign Wealth', handle: 'Via PIF, GIC, or ADIA contacts', note: 'Fink\'s sovereign wealth relationships are his fastest intro path for new fund structures.' },
      ],
      templates: [
        { id: 'fink-dm', label: '💬 Short Pitch', text: `Larry — You've spent a decade demanding that companies demonstrate purpose alongside profit. Project Renaissance is the first investment vehicle where purpose IS the profit mechanism. $25B REIT. Government-backed. ESG metrics measured in human lives. BlackRock should manage it. Demo: [YOUR_DEMO_LINK]` },
        { id: 'fink-email', label: '📧 REIT Proposal', text: `Subject: Renaissance Infrastructure REIT — ESG at Unprecedented Scale\n\nLarry,\n\nFor a decade you've said purpose and profit must coexist. We've built the instrument that proves it.\n\nProject Renaissance Infrastructure REIT:\n• $25B buildout of Vieques Island reintegration city + 50 national facilities\n• BlackRock as exclusive fund manager\n• Government-adjacent revenue = investment-grade bond rating Day 1\n• ESG metrics: every dollar traceable to a human life transformed\n• Global replication: 50 countries × $500M per facility\n\nThis is the fund that defines BlackRock's next decade.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `Project Renaissance needs institutional banking infrastructure to manage operating costs across all facilities, handle NAC-to-USD conversion for graduating residents, and provide the financial rails for the world's first behavioral cryptocurrency at scale. JPMorgan's digital assets division and community development lending arm are both perfect fits.`,
    value_props: [
      'CRA-qualifying $2B community development loan — massive regulatory benefit',
      'NAC-to-USD conversion banking infrastructure for 50,000 graduates/year',
      'Project finance structuring for all facility builds ($25B total)',
      'JPMorgan Coin integration as NAC settlement layer',
      '"Advancing Cities" program: largest single flagship initiative ever',
    ],
    roi: '$2B CRA credit. Fee income on 50M+ annual NAC transactions. Project finance fees on $25B construction.',
    tier: 'Banking Partner',
    urgency: 'CRA compliance window — Q3 2026 application cycle',
    carousel: [
      { headline: 'The CRA Crown Jewel', body: 'A $2B community development loan that qualifies for maximum CRA credit. Regulators will love JPMorgan. The optics are perfect.' },
      { headline: 'NAC Settlement Rails', body: 'JPMorgan Coin becomes the settlement layer for NAC. Every transaction, every graduation payout, every resident withdrawal runs through JPMorgan infrastructure.' },
      { headline: '$25B Project Finance', body: '50 facilities nationwide. Each one a JPMorgan-financed project. Fee income that rivals their biggest infrastructure deals ever.' },
    ],
    outreach: {
      channels: [
        { label: '📧 JPMorgan Corporate BD', handle: 'Via JPMorgan Business Development', note: 'Submit through their corporate social responsibility and community development arms.' },
        { label: '🏦 Advancing Cities', handle: 'advancingcities@jpmorgan.com', note: 'Their flagship ESG initiative. This fits perfectly as their largest-ever project.' },
        { label: '🤝 Warm Intro', handle: 'Via Goldman Sachs or Blackstone contacts', note: 'Dimon responds to peer-level intros. A Schwarzman or Dalio intro is the fastest path.' },
      ],
      templates: [
        { id: 'dimon-dm', label: '💬 Executive Summary', text: `Jamie — Project Renaissance is the largest CRA-qualifying community development opportunity in American banking history. $2B loan. $25B project finance. NAC-to-USD conversion rails for 50,000 graduates/year. JPMorgan Coin as the settlement layer. This is Advancing Cities at a scale nobody has ever attempted. Demo: [YOUR_DEMO_LINK]` },
        { id: 'dimon-email', label: '📧 Banking Partnership Proposal', text: `Subject: Project Renaissance — CRA + Project Finance + Digital Assets\n\nJamie,\n\nProject Renaissance is a sovereign reintegration city on Vieques Island. We need a banking partner who can operate at three layers simultaneously:\n\n1. CRA: $2B community development loan — maximum regulatory credit\n2. Project Finance: $25B buildout across 50 facilities\n3. Digital Assets: NAC-to-USD conversion rails + JPMorgan Coin settlement\n\nThis is JPMorgan's Advancing Cities program at a scale it has never operated before.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'wlfi',
    name: 'World Liberty Financial',
    person: 'Trump Family / DeFi Leadership',
    category: 'Crypto & Finance',
    logo: '💎',
    color: '#22C55E',
    ask: '$500M NAC liquidity + DeFi integration',
    equity: 'NAC protocol founding validator rights',
    tagline: '"The first behavioral cryptocurrency backed by American sovereignty."',
    pitch: `NAC (New America Coin) needs institutional liquidity and a credible blockchain infrastructure partner. World Liberty Financial, with its ties to American political sovereignty and DeFi ambitions, is the natural co-architect. WLFI validators anchor the NAC blockchain, earn transaction fees on every resident earning, and position NAC as the first sovereign behavioral currency in American history.`,
    value_props: [
      'NAC founding validator rights — transaction fee income on 650K active users',
      'First behavioral stablecoin: NAC value backed by resident productivity data',
      'WLFI + NAC = the American answer to Chinese social credit systems',
      'DeFi integration: NAC tradeable on WLFI exchange from Day 1',
      'Co-brand opportunity: "Powered by World Liberty Financial"',
    ],
    roi: 'NAC market cap projected $2B within 3 years. Validator income at 0.5% transaction fee = $100M+ annually at scale.',
    tier: 'Crypto Partner',
    urgency: 'Token architecture audit begins Q2 2026',
    carousel: [
      { headline: 'America\'s Behavioral Currency', body: 'NAC is not just crypto. It\'s a productivity-backed behavioral currency with political sovereignty behind it. WLFI makes it real on-chain.' },
      { headline: 'Validator Income Machine', body: '650,000 residents transacting daily. At 0.5% fee on every transaction, WLFI earns $100M+ annually just from being the founding validator.' },
      { headline: 'The Anti-Social-Credit', body: 'China has social credit. America has NAC — voluntary, transparent, owned by the individual. WLFI and Renaissance co-brand this distinction globally.' },
    ],
    outreach: {
      channels: [
        { label: '📧 WLFI Team', handle: 'info@worldlibertyfi.com', note: 'Submit the NAC validator architecture proposal directly to their protocol team.' },
        { label: '🐦 X / Twitter', handle: '@worldlibertyfi', note: 'Active on X. Tag with the behavioral currency angle and American sovereignty framing.' },
        { label: '🤝 Trump Family Network', handle: 'Via Eric Trump / Donald Trump Jr.', note: 'WLFI is Trump family adjacent. A direct family-level intro is the fastest pathway.' },
      ],
      templates: [
        { id: 'wlfi-dm', label: '💬 Short Pitch', text: `WLFI — We're launching NAC (New America Coin) — the first behavioral cryptocurrency backed by American sovereignty. 650,000 residents earning and spending on-chain. We need WLFI as founding validator. $100M+ annual fee income at scale. This is the American answer to China's social credit system. Demo: [YOUR_DEMO_LINK]` },
        { id: 'wlfi-email', label: '📧 Protocol Partnership', text: `Subject: NAC Founding Validator Rights — New America Coin\n\nTo the WLFI Team,\n\nProject Renaissance is launching NAC — New America Coin — the first behavioral cryptocurrency backed by US sovereign infrastructure on Vieques Island.\n\nWe're offering WLFI founding validator rights:\n• Transaction fee income on 650,000 active users\n• NAC tradeable on WLFI exchange from Day 1\n• Co-brand: "Powered by World Liberty Financial"\n• America's answer to Chinese social credit — but transparent and freedom-first\n\nToken architecture audit begins Q2 2026.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'andreessen',
    name: 'Andreessen Horowitz (a16z)',
    person: 'Marc Andreessen & Ben Horowitz',
    category: 'Venture Capital',
    logo: '🔬',
    color: '#7C3AED',
    ask: '$400M Series B co-lead',
    equity: '6% equity in Renaissance Holdings',
    tagline: '"Software is eating the world. Now it\'s rebuilding it."',
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
    carousel: [
      { headline: 'American Dynamism Flag Ship', body: 'This IS the American Dynamism portfolio thesis made real. One investment touches crypto, AI, defense, and social infrastructure simultaneously.' },
      { headline: 'NAC Tokenomics by a16z', body: 'The crypto arm architects the NAC behavioral currency. First-of-kind. Every future behavioral token will cite this as the founding reference.' },
      { headline: '$100B IPO Thesis', body: 'Social OS licensed to 50 US cities. 20 countries. Government acquisition as an exit. Multiple paths to a $100B+ valuation.' },
    ],
    outreach: {
      channels: [
        { label: '📝 American Dynamism', handle: 'a16z.com/american-dynamism', note: 'Submit directly to the American Dynamism portfolio page — they actively source deals.' },
        { label: '🐦 X / Twitter', handle: '@pmarca / @bhorowitz', note: 'Both very active. Marc responds to American Dynamism pitches publicly and in DMs.' },
        { label: '🤝 Portfolio Company', handle: 'Via Anduril, Palantir, or Coinbase', note: 'a16z is an investor in all three. A portfolio company intro is the gold standard.' },
      ],
      templates: [
        { id: 'a16z-dm', label: '💬 Short Pitch', text: `Marc — Software is eating homelessness. Project Renaissance: crypto-incentivized island city. NAC behavioral currency. AI tutors. Autonomous security. This is the American Dynamism investment. Series B. 6% equity. Term sheet open. Demo: [YOUR_DEMO_LINK]` },
        { id: 'a16z-email', label: '📧 Investment Memo', text: `Subject: American Dynamism — Series B — Project Renaissance\n\nMarc / Ben,\n\nProject Renaissance is the defining American Dynamism investment:\n\n• Crypto: NAC behavioral currency — a16z crypto architects the tokenomics\n• AI: Grok + Palantir + NVIDIA powering 650,000 residents\n• Defense: Anduril autonomous perimeter on Vieques Island\n• Infrastructure: $25B buildout, government-adjacent revenue\n\nSeries B. $400M. 6% equity. $100B+ IPO thesis.\n\nThis is what "software eating the world" looks like when the world is 650,000 lives.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `650,000 residents. Real-time behavioral scoring. AI tutors running 24/7. Predictive reintegration models. The compute requirements of Project Renaissance are extraordinary — and only NVIDIA can deliver them. We need a dedicated H100/B200 cluster for the NAC behavioral engine, AI tutoring system, and Palantir analytics layer on Vieques.`,
    value_props: [
      'Dedicated H100/B200 cluster for NAC behavioral scoring engine on Vieques',
      'AI tutoring powered by NVIDIA NIM microservices',
      'DGX Cloud partnership for all facility AI workloads',
      'Largest single humanitarian AI deployment in history',
      'NVIDIA Inception Program flagship case study',
    ],
    roi: 'Multi-year compute contract: $1.5B total. Media value as "the GPU that saved 650,000 lives" — immeasurable.',
    tier: 'AI Infrastructure Partner',
    urgency: 'DGX Cloud proposal submitted. Awaiting Jensen approval.',
    carousel: [
      { headline: 'The Compute Island', body: 'A dedicated on-island H100/B200 cluster powers every AI workload — tutoring, behavioral analytics, NAC scoring — with zero cloud latency.' },
      { headline: 'NIM Microservices at Scale', body: 'NVIDIA NIM powers the AI tutor stack for 650,000 concurrent learners. The largest NIM deployment in history. Jensen gets the case study of a decade.' },
      { headline: 'The Humanitarian GPU', body: 'NVIDIA\'s marketing writes itself: "The GPU that rebuilt 650,000 lives." Board-level ESG narrative with $1.5B in hard contract value behind it.' },
    ],
    outreach: {
      channels: [
        { label: '📧 NVIDIA Enterprise', handle: 'enterprise@nvidia.com', note: 'Submit DGX Cloud + NIM partnership proposal to their enterprise AI team.' },
        { label: '🤝 NVIDIA Inception', handle: 'developer.nvidia.com/inception', note: 'Apply as an Inception member — direct pipeline to Jensen\'s team for large deployments.' },
        { label: '🐦 X / Twitter', handle: '@nvidia / @jenhsunhuang', note: 'Jensen is active. Tag with the humanitarian AI deployment angle — he loves this narrative.' },
      ],
      templates: [
        { id: 'nvidia-dm', label: '💬 Short Pitch', text: `Jensen — 650,000 residents. Real-time behavioral scoring. AI tutors for every person, 24/7. We need a dedicated H100/B200 cluster on Vieques Island. This is the largest humanitarian AI deployment in history. NVIDIA gets "the GPU that rebuilt 650,000 lives." $1.5B contract. Demo: [YOUR_DEMO_LINK]` },
        { id: 'nvidia-email', label: '📧 Compute Partnership', text: `Subject: DGX Cloud + NIM — Largest Humanitarian AI Deployment in History\n\nJensen,\n\nProject Renaissance needs compute at a scale we've never seen in the humanitarian sector.\n\n• Dedicated on-island H100/B200 cluster for Vieques\n• NVIDIA NIM for 650,000 concurrent AI tutoring sessions\n• DGX Cloud for all behavioral analytics workloads\n• Real-time NAC behavioral scoring at population scale\n\nThis is NVIDIA's largest single humanitarian deployment. Multi-year contract: $1.5B. The story: "The GPU that rebuilt 650,000 lives."\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `Amazon Web Services becomes the cloud backbone for every resident data record, NAC transaction, and behavioral score — the largest AWS public-sector deployment in history. Amazon Logistics handles supply chain for Vieques provisioning. The Bezos Earth Fund co-funds the Island Agriculture Ring, making Renaissance the world's largest urban food sovereignty project.`,
    value_props: [
      'AWS: exclusive cloud infrastructure for all Renaissance facilities worldwide',
      'Amazon Logistics: supply chain operations for all residents at scale',
      'Bezos Earth Fund: $200M investment in Island Agriculture Ring',
      'Amazon Jobs: preferred employer for 25,000 Renaissance graduates annually',
      'Blue Origin: backup LEO broadband for island connectivity redundancy',
    ],
    roi: 'AWS contract value: $800M over 5 years. Amazon employer pipeline: 25K skilled graduates/year.',
    tier: 'Platinum Partner',
    urgency: 'AWS RFP closes Q2 2026. Amazon Jobs MOU ready.',
    carousel: [
      { headline: 'AWS Island Cloud', body: 'Every resident record, NAC transaction, and behavioral profile stored on AWS. The largest humanitarian public-sector cloud deployment in Amazon\'s history.' },
      { headline: 'The Island Agriculture Ring', body: 'Bezos Earth Fund invests $200M in Vieques hydroponic and ocean-farm infrastructure. Food sovereignty for 650,000 people. Measurable carbon offset data for the Foundation.' },
      { headline: '25,000 Jobs a Year', body: 'Amazon becomes the single largest employer of Renaissance graduates. A direct pipeline from the island to warehouses, tech roles, and logistics positions nationwide.' },
    ],
    outreach: {
      channels: [
        { label: '📧 AWS Public Sector', handle: 'awspublicsector@amazon.com', note: 'AWS has a dedicated public sector team. Submit the cloud infrastructure RFP here.' },
        { label: '🌿 Bezos Earth Fund', handle: 'bezosfund.org/apply', note: 'Urban agriculture + food sovereignty is a perfect fit. Submit a grant/partnership proposal.' },
        { label: '💼 Amazon Jobs BD', handle: 'Via Amazon Jobs & Amazon Business', note: 'The graduate employment pipeline pitch goes to Amazon\'s workforce development team.' },
      ],
      templates: [
        { id: 'bezos-dm', label: '💬 Short Pitch', text: `Jeff — Day One thinking for America's oldest problem. AWS as the exclusive cloud for a sovereign island city. Bezos Earth Fund for the agriculture ring. 25,000 Amazon jobs for graduates per year. This is the largest integrated Amazon deployment in history. Demo: [YOUR_DEMO_LINK]` },
        { id: 'bezos-email', label: '📧 Multi-Arm Proposal', text: `Subject: Project Renaissance — AWS + Earth Fund + Amazon Jobs\n\nJeff,\n\nProject Renaissance is a sovereign reintegration city on Vieques Island. We're proposing a three-arm Amazon partnership:\n\n1. AWS: exclusive cloud for all 50 Renaissance facilities — $800M over 5 years\n2. Bezos Earth Fund: $200M island agriculture ring investment\n3. Amazon Jobs: 25,000 Renaissance graduates hired annually\n\nThis is Day One thinking applied to America's oldest problem.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `The Gates Foundation exists to deliver evidence-based solutions to humanity's hardest problems. Project Renaissance is the first large-scale measurable, accountable intervention on homelessness built with data integrity at the core. Gates funds the Medical & Wellness wing, co-develops the health outcome measurement system, and publishes findings that reshape global policy.`,
    value_props: [
      'Medical & Wellness wing co-funded: "Gates Health at Renaissance"',
      'Full longitudinal health outcome study: mental health, addiction, physical wellness',
      'Co-develop AI-driven health screening protocol deployed globally',
      'Education curriculum endowment: "Gates Digital Literacy Track"',
      'Global policy publication: replicable model for 196 countries',
    ],
    roi: 'Largest real-world health + education intervention ever measured. Model replicated in 50+ countries = Gates Foundation\'s defining achievement.',
    tier: 'Health & Education Partner',
    urgency: 'Research partnership proposal submitted',
    carousel: [
      { headline: 'Evidence at Population Scale', body: 'Gates has funded studies on homelessness for 20 years. This is the first time the study IS the intervention. 650,000 subjects. Fully instrumented. Fully measured.' },
      { headline: 'Gates Health at Renaissance', body: 'Medical wing co-funded and co-branded. Mental health, addiction recovery, and physical wellness tracked longitudinally. The world\'s most complete social health dataset.' },
      { headline: 'Global Policy Impact', body: 'The Gates Foundation publishes the findings. 50 countries adopt the model. Vieques becomes the reference implementation for global homelessness policy reform.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Gates Foundation', handle: 'info@gatesfoundation.org', note: 'Submit a formal research partnership proposal. Lead with the longitudinal study angle.' },
        { label: '🏛️ Annual Letter', handle: 'Via Gates Notes (gatenotes.com)', note: 'Bill publishes his annual letter in February. A pre-letter pitch plants the idea.' },
        { label: '🤝 Global Health Network', handle: 'Via WHO / USAID contacts', note: 'Gates operates through global health networks. A WHO or USAID intro lands on his desk.' },
      ],
      templates: [
        { id: 'gates-dm', label: '💬 Short Pitch', text: `Bill — The Gates Foundation has funded homelessness research for 20 years. Project Renaissance is the first time the study IS the intervention. 650,000 subjects. Fully instrumented. Longitudinal health outcomes tracked in real-time. This is your defining achievement. Demo: [YOUR_DEMO_LINK]` },
        { id: 'gates-email', label: '📧 Research Partnership Proposal', text: `Subject: Project Renaissance — Research Partnership Proposal\n\nBill,\n\nThe Gates Foundation has funded evidence-based social interventions for decades. Project Renaissance is the first intervention that is simultaneously a fully instrumented research study.\n\n• 650,000 subjects across health, education, and behavioral outcomes\n• "Gates Health at Renaissance" medical wing co-funded and co-branded\n• AI-driven health screening protocol with global deployment potential\n• Gates Digital Literacy Track endowment in every facility\n• Published findings reshape homelessness policy in 50+ countries\n\nThis is the Gates Foundation's defining achievement of the decade.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'walton',
    name: 'Walton Family / Walmart',
    person: 'Walton Family Foundation',
    category: 'Philanthropy & Retail',
    logo: '🏪',
    color: '#0EA5E9',
    ask: '$300M supply chain + philanthropy partnership',
    equity: 'Walmart exclusive supply contract for all facilities',
    tagline: '"Save money. Save lives. Live better."',
    pitch: `Walmart feeds America. Project Renaissance gives Walmart the opportunity to feed the most vulnerable Americans at the most favorable per-unit economics in the company's history. A centralized procurement contract for 650,000 residents represents billions in predictable, long-term wholesale revenue — all delivered to a single island address.`,
    value_props: [
      'Exclusive Walmart wholesale supply contract: $1.2B/year in food + goods',
      'Walton Family Foundation co-funds and brands the Life Skills curriculum',
      'Sam\'s Club "Renaissance Membership" for all graduating residents',
      'ESG narrative: "Walmart feeds and employs 50,000 Renaissance graduates/year"',
      'Predictable long-term government-backed revenue stream',
    ],
    roi: 'Supply contract alone: $6B over 5 years. Graduate employment pipeline. Flagship philanthropy for the next generation of Walton leadership.',
    tier: 'Supply Partner',
    urgency: 'Procurement RFP ready for Bentonville',
    carousel: [
      { headline: 'The Biggest Wholesale Account', body: 'One island. 650,000 residents. Single procurement address. This is the most efficient Walmart wholesale account in the history of the company.' },
      { headline: 'Life Skills by Walton', body: 'The Walton Foundation co-develops the Life Skills curriculum — financial literacy, budgeting, consumer math. Their brand on the most impactful education program in America.' },
      { headline: '$6B Supply Contract', body: '$1.2B/year in predictable, government-adjacent revenue. 5 years locked. More stable than any corporate customer Walmart has ever had.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Walmart Corporate BD', handle: 'Via Walmart Procurement / Bentonville HQ', note: 'Submit wholesale supply RFP to Walmart corporate procurement. Lead with volume.' },
        { label: '🏫 Walton Foundation', handle: 'waltonfamilyfoundation.org/contact', note: 'Education curriculum partnership goes through the Foundation\'s K-12 education team.' },
        { label: '🤝 Board-Level Intro', handle: 'Via Walmart board or Sam\'s Club leadership', note: 'The Walton family board members are accessible through business networks.' },
      ],
      templates: [
        { id: 'walton-dm', label: '💬 Short Pitch', text: `Walton Family — One island. 650,000 residents. Single procurement address. $1.2B/year in wholesale revenue. More predictable than any corporate customer Walmart has ever had. The Walton Foundation co-brands the Life Skills curriculum. Sam's Club membership for every graduate. Demo: [YOUR_DEMO_LINK]` },
        { id: 'walton-email', label: '📧 Supply Partnership Proposal', text: `Subject: Walmart Supply Contract — Project Renaissance\n\nTo the Walmart Corporate Procurement Team,\n\nProject Renaissance is a sovereign reintegration city on Vieques Island with a central procurement need:\n\n• 650,000 residents\n• Single island address\n• $1.2B/year in food + goods\n• 5-year locked contract, government-adjacent\n\nThis is Walmart's most efficient wholesale account ever — and the Walton Foundation co-develops the Life Skills curriculum, putting the family brand on America's most impactful education program.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
    pitch: `OpenAI's mission is to ensure AGI benefits all of humanity. Project Renaissance is the most direct path to that mission ever proposed. GPT-5+ powers the personalized AI tutor for every resident — available 24/7, adapting to each individual's learning style, pace, and goals. The behavioral fine-tuning dataset generated here is invaluable.`,
    value_props: [
      'GPT-5+ as personalized AI tutor: 650,000 concurrent learners',
      'Largest humanitarian OpenAI deployment — mission-critical case study',
      'Behavioral fine-tuning dataset: unprecedented human transformation data',
      'OpenAI for Nonprofits flagship partnership with co-branding',
      'Published research: "AI as a Social Mobility Tool" — global citation impact',
    ],
    roi: 'Unmatched real-world training data on human behavioral change. Proof of mission. Global policy influence.',
    tier: 'AI Research Partner',
    urgency: 'API partnership in negotiation. Altman briefing Q1 2026.',
    carousel: [
      { headline: 'AGI Meets Human Need', body: 'Sam Altman said AGI should benefit all of humanity. This is where that statement gets operationalized — 650,000 people with a GPT-5 tutor available every hour of every day.' },
      { headline: 'The Training Dataset', body: 'Behavioral fine-tuning data on 650,000 humans over years of transformation. The most valuable human behavioral dataset OpenAI has ever had access to.' },
      { headline: 'The Mission Statement Made Real', body: 'OpenAI publishes: "AI as a Social Mobility Tool." The academic impact alone reshapes global policy. The brand value is immeasurable.' },
    ],
    outreach: {
      channels: [
        { label: '📧 OpenAI Partnerships', handle: 'partnerships@openai.com', note: 'Submit a formal API partnership proposal. Lead with the humanitarian mission alignment.' },
        { label: '🐦 X / Twitter', handle: '@sama', note: 'Sam Altman is very active. Tag with the AGI-for-humanity framing — it\'s his core message.' },
        { label: '🤝 YC Network', handle: 'Via Y Combinator alumni', note: 'Altman ran YC. Any YC alumnus is a potential warm intro to his personal inbox.' },
      ],
      templates: [
        { id: 'altman-dm', label: '💬 Short Pitch', text: `Sam — You said AGI should benefit all of humanity. Project Renaissance is where that statement becomes real. 650,000 people with a GPT-5 tutor, 24/7, adapting to their pace and goals. The behavioral transformation dataset alone is worth it. This is OpenAI's mission, operationalized. Demo: [YOUR_DEMO_LINK]` },
        { id: 'altman-email', label: '📧 Partnership Proposal', text: `Subject: AGI for Humanity — Project Renaissance\n\nSam,\n\nOpenAI's mission is to ensure AGI benefits all of humanity. Project Renaissance is the most direct path to that mission ever proposed.\n\n• GPT-5+ as personalized AI tutor for 650,000 concurrent learners\n• Behavioral fine-tuning dataset: years of human transformation data\n• Published research: "AI as a Social Mobility Tool"\n• OpenAI for Nonprofits flagship partnership\n\nNo other deployment touches this many people this directly.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'airbnb',
    name: 'Airbnb',
    person: 'Brian Chesky, CEO',
    category: 'Housing & Hospitality',
    logo: '🏡',
    color: '#FF5A5F',
    ask: '$150M housing platform partnership',
    equity: 'Preferred access to graduate housing pipeline',
    tagline: '"Belong Anywhere — including after a second chance."',
    pitch: `Airbnb pioneered the idea that belonging transcends ownership. Renaissance graduates — Citizen-Ready individuals with verified employment, savings, and behavior scores — are ideal Airbnb hosts and tenants. We provide Airbnb a verified, creditworthy resident pipeline that doesn't exist anywhere else.`,
    value_props: [
      '"Renaissance Graduate" Airbnb host certification — verified, trustworthy',
      'Corporate housing contracts for graduates transitioning from Vieques',
      'Airbnb Open Homes: emergency housing credits for alumni',
      'Data partnership: reintegration housing success metrics for ESG reporting',
      'First major brand to champion homeless-to-host economic mobility',
    ],
    roi: 'Pipeline of 50,000+ verified graduates per year as potential hosts/tenants. ESG brand value. New market segment.',
    tier: 'Housing Partner',
    urgency: 'MOU ready for Q1 2027 pilot cohort',
    carousel: [
      { headline: 'The Graduate Host Program', body: 'Citizen-Ready graduates get Airbnb host certification. From Vieques island to a verified income stream. The "from homeless to host" story writes itself.' },
      { headline: '50K Verified Tenants a Year', body: 'Airbnb has never had a pipeline of pre-verified, creditworthy tenants delivered at scale. Renaissance graduates arrive with scores, savings, and certifications.' },
      { headline: 'The Belonging Brand Moment', body: '"Belong Anywhere" extended to people who had nowhere. The most powerful Airbnb ESG narrative in the company\'s history.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Airbnb Partnerships', handle: 'partnerships@airbnb.com', note: 'Submit the graduate host certification program proposal to their housing partnerships team.' },
        { label: '🏠 Airbnb.org', handle: 'airbnb.org/contact', note: 'Airbnb.org handles social impact housing. The emergency housing credits angle goes here.' },
        { label: '🤝 YC / Tech Network', handle: 'Chesky is well-connected in tech', note: 'Brian is close with Altman and the YC community. An OpenAI or a16z intro works.' },
      ],
      templates: [
        { id: 'airbnb-dm', label: '💬 Short Pitch', text: `Brian — "Belong Anywhere" extended to people who had nowhere. Project Renaissance graduates arrive with verified employment, savings, and a behavior score. They're ideal Airbnb hosts and tenants. 50,000 per year. A pipeline nobody else can give you. Demo: [YOUR_DEMO_LINK]` },
        { id: 'airbnb-email', label: '📧 Housing Partnership', text: `Subject: Renaissance Graduate Host Program — Airbnb Partnership\n\nBrian,\n\nAirbnb pioneered the idea that belonging transcends ownership. Project Renaissance has 50,000 Citizen-Ready graduates per year who embody that idea — with verified employment, savings, and behavioral scores.\n\nWe're proposing:\n• "Renaissance Graduate" Airbnb host certification program\n• Corporate housing credits for graduates transitioning from Vieques\n• Airbnb.org emergency housing integration for alumni\n• Co-branded ESG report: "From Homeless to Host"\n\n"Belong Anywhere" — including after a second chance.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'dalio',
    name: 'Ray Dalio / Bridgewater',
    person: 'Ray Dalio, Founder',
    category: 'Macro Investing',
    logo: '🌊',
    color: '#06B6D4',
    ask: '$500M macro hedge + endowment partnership',
    equity: '4% equity in Renaissance Holdings',
    tagline: '"Radical transparency meets radical transformation."',
    pitch: `Dalio has spent decades studying the rise and fall of nations and the root causes of societal collapse. Project Renaissance is the first empirical intervention that addresses the structural conditions he identifies as precursors to civil unrest: inequality, disenfranchisement, and loss of economic agency. This is the hedge against civilizational collapse — and Dalio should be its anchor investor.`,
    value_props: [
      'Anchor investor in a program that directly counters civilizational risk metrics',
      'Dalio Principles framework as the foundation for behavioral curriculum design',
      'Bridgewater macro hedge: NAC as an inflation-resistant behavioral asset',
      'Dalio Foundation co-funds the "Systems Thinking" track for residents',
      '"Radical Transparency" reporting methodology applied to resident progress data',
    ],
    roi: 'Equity in the dominant social OS at ground floor. Hedge against the societal instability Dalio has publicly warned about for a decade.',
    tier: 'Strategic Investor',
    urgency: 'Dalio alignment meeting requested through Bridgewater Associates',
    carousel: [
      { headline: 'The Civilizational Hedge', body: 'Dalio has warned about the breakdown of the middle class and social fabric for years. This is the one investment that directly addresses the exact risk he keeps writing about.' },
      { headline: 'Radical Transparency at Scale', body: 'Bridgewater\'s operating principles — transparency, accountability, measurable outcomes — are exactly how Renaissance works. Dalio\'s framework applied to 650,000 human lives.' },
      { headline: 'NAC as Macro Asset', body: 'A productivity-backed behavioral currency as an inflation hedge. Bridgewater architecting NAC\'s macro positioning could make it the most interesting new asset class in decades.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Bridgewater Associates', handle: 'info@bwater.com', note: 'Submit a formal investment thesis that mirrors Bridgewater\'s "Principles" framework.' },
        { label: '📚 Dalio Foundation', handle: 'dalio.com/giving', note: 'Dalio funds initiatives targeting the "5 big problems." This fits all of them.' },
        { label: '🤝 Macro Network', handle: 'Via sovereign wealth or macro fund contacts', note: 'Dalio operates in sovereign wealth circles. A PIF or GIC connection reaches him quickly.' },
      ],
      templates: [
        { id: 'dalio-dm', label: '💬 Short Pitch', text: `Ray — You've written about the breakdown of the social fabric and the rise of internal conflict for years. Project Renaissance is the first empirical intervention that directly addresses the structural conditions you've identified. Equity stake. Radical transparency built in. NAC as a macro asset. Demo: [YOUR_DEMO_LINK]` },
        { id: 'dalio-email', label: '📧 Investment Thesis', text: `Subject: The Civilizational Hedge — Project Renaissance\n\nRay,\n\nYou've spent a decade writing about the structural preconditions for societal collapse: inequality, disenfranchisement, loss of economic agency.\n\nProject Renaissance is the first investment that directly hedges against those exact conditions:\n\n• 650,000 disenfranchised Americans reintegrated into economic agency\n• Radical transparency framework applied to resident progress data\n• NAC behavioral currency as a new macro asset class\n• Dalio Principles framework as the behavioral curriculum foundation\n\n4% equity. Anchor investor status.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'timcook',
    name: 'Apple / Tim Cook',
    person: 'Tim Cook, CEO',
    category: 'Consumer Tech',
    logo: '🍎',
    color: '#A0A0A0',
    ask: '$200M Apple Education + Health partnership',
    equity: 'Exclusive hardware provisioning contract',
    tagline: '"Technology that empowers every human. Including the ones everyone forgot."',
    pitch: `Apple's education and health frameworks are the most human-centered in the tech industry. Every resident gets an iPad and Apple Watch on intake. The Apple Watch tracks behavioral and health data feeding the NAC behavioral engine. iPad + Apple Classroom powers every certified course. ApplePay becomes the NAC wallet interface. This is Apple's largest humanitarian tech deployment ever.`,
    value_props: [
      'iPad + Apple Watch issued to every resident on intake day',
      'Apple Watch health data feeds the resident wellness and behavioral score engine',
      'Apple Classroom as the platform for all certified course delivery',
      'Apple Pay as the NAC wallet interface for resident transactions',
      'AppleCare for Social Impact — new flagship ESG initiative for Apple',
    ],
    roi: 'Hardware contract: $400M+ at scale. Educational platform licensing. Strongest ESG narrative Apple has ever deployed.',
    tier: 'Technology Partner',
    urgency: 'Education partnership proposal submitted to Apple EDU team',
    carousel: [
      { headline: 'iPad from Day One', body: 'Every resident receives an iPad and Apple Watch on intake. Immediate access to courses, tracking, NAC wallet, and the Grok tutor. Digital equity, operationalized.' },
      { headline: 'Health Data as Behavioral Score', body: 'Apple Watch biometric data — sleep, activity, stress — feeds the NAC behavioral engine. The most human-centered data layer in any social program ever.' },
      { headline: 'Apple Pay = NAC Wallet', body: 'Residents spend NAC through Apple Pay. Simple. Trusted. Familiar. The onramp to financial inclusion built on infrastructure 1 billion people already know.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Apple EDU', handle: 'edu@apple.com', note: 'Submit the Apple Classroom + iPad deployment partnership to Apple\'s education team.' },
        { label: '🏥 Apple Health', handle: 'Via Apple Health Research team', note: 'The Apple Watch biometric data angle goes through Apple\'s health research partnerships.' },
        { label: '🤝 Tim Cook Network', handle: 'Via Apple board or tech CEO circle', note: 'Cook is known for ESG commitment. A peer-level CEO intro from Gates or Bezos is ideal.' },
      ],
      templates: [
        { id: 'cook-dm', label: '💬 Short Pitch', text: `Tim — Every resident on Vieques Island gets an iPad and Apple Watch on Day 1. Apple Classroom for every course. Apple Watch biometrics feeding the behavioral score engine. Apple Pay as the NAC wallet. This is Apple's largest humanitarian tech deployment — and the strongest ESG narrative the company has ever had. Demo: [YOUR_DEMO_LINK]` },
        { id: 'cook-email', label: '📧 Education + Health Partnership', text: `Subject: Apple Education + Health — Project Renaissance\n\nTim,\n\nProject Renaissance is proposing a three-layer Apple partnership:\n\n1. Education: iPad + Apple Classroom for all 650,000 residents\n2. Health: Apple Watch biometrics feeding the resident wellness engine\n3. Payments: Apple Pay as the NAC cryptocurrency wallet interface\n\nEvery resident issued an iPad and Apple Watch on intake day. Digital equity at population scale.\n\nThis is "Technology that empowers every human" — including the ones everyone else forgot.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'schwarzman',
    name: 'Blackstone / Steve Schwarzman',
    person: 'Steve Schwarzman, CEO',
    category: 'Private Equity',
    logo: '🏛️',
    color: '#4F46E5',
    ask: '$5B real estate + infrastructure PE fund',
    equity: 'Exclusive Vieques development rights management',
    tagline: '"The greatest real estate development opportunity in American history."',
    pitch: `Steve Schwarzman built Blackstone into the world's largest real estate PE firm by identifying opportunities others couldn't see. Vieques Island is exactly that: 22,000 acres of US federal land, infrastructure-ready, with guaranteed government-adjacent revenue from Day 1. Blackstone manages the development, construction, and long-term asset management of the entire island buildout.`,
    value_props: [
      'Exclusive development rights on 22,000 acres of US federal Vieques land',
      'Long-term asset management of $15B+ island infrastructure',
      'Government-adjacent revenue: guaranteed program funding backing',
      'Blackstone Real Estate Income Trust integration for retail investor access',
      'Exit via REIT or government buyout at premium valuation',
    ],
    roi: 'Development fees + 20-year asset management on $15B. REIT income. Government buyout option at 2x development cost.',
    tier: 'Real Estate Partner',
    urgency: 'Site survey and development rights briefing ready',
    carousel: [
      { headline: '22,000 Acres, Zero Acquisition Cost', body: 'US federal land. Former Navy. Already owned by America. Blackstone develops it, manages it, and earns fees for 20 years without ever paying for the land.' },
      { headline: 'BREIT Integration', body: 'Blackstone Real Estate Income Trust gets a new flagship asset. Retail investors participate in the development of America\'s most audacious humanitarian infrastructure project.' },
      { headline: 'Government Buyout Floor', body: 'At any point, the federal government can buy out the infrastructure at cost-plus. Blackstone has a guaranteed floor and a sky-high ceiling.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Blackstone Real Estate', handle: 'Via Blackstone RE Business Development', note: 'Submit the Vieques development rights package to Blackstone\'s real estate acquisitions team.' },
        { label: '🏛️ Milken Institute', handle: 'Annual Global Conference (May)', note: 'Schwarzman attends Milken every year. The single best in-person opportunity.' },
        { label: '🤝 PE Network', handle: 'Via KKR or Apollo contacts', note: 'Schwarzman\'s peer network. A fellow mega-PE CEO intro is the fastest pathway.' },
      ],
      templates: [
        { id: 'schwarzman-dm', label: '💬 Short Pitch', text: `Steve — 22,000 acres of US federal land on Vieques Island. Zero acquisition cost. Guaranteed government-adjacent revenue from Day 1. Blackstone develops it, manages it, earns fees for 20 years. BREIT integration. Government buyout floor at 2x cost. This is the greatest real estate development opportunity in American history. Demo: [YOUR_DEMO_LINK]` },
        { id: 'schwarzman-email', label: '📧 Development Rights Proposal', text: `Subject: Vieques Island — 22,000 Acres, Zero Acquisition Cost\n\nSteve,\n\nYou built Blackstone by seeing opportunities others couldn't. Vieques Island is exactly that:\n\n• 22,000 acres of US federal land — zero acquisition cost\n• Former US Navy infrastructure — already partially built out\n• Government-adjacent revenue from Day 1 — investment-grade risk profile\n• $15B development opportunity under Blackstone management\n• BREIT integration + government buyout option at cost-plus\n\nThis is the greatest single real estate development opportunity in American history.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
  },
  {
    id: 'hastings',
    name: 'Reed Hastings / Netflix',
    person: 'Reed Hastings, Co-Founder',
    category: 'Media & Streaming',
    logo: '🎬',
    color: '#E50914',
    ask: '$300M content licensing + production deal',
    equity: 'First-look content franchise rights',
    tagline: '"The greatest documentary series Netflix never knew it needed."',
    pitch: `Netflix built an empire on true crime, social experiments, and human transformation stories. Project Renaissance is all three — at a scale no studio could manufacture. The island. The tiers. The NAC economy. Residents earning their way out of poverty in real-time. This is The Circle meets Making a Murderer meets a national policy intervention — and it runs 365 days a year.`,
    value_props: [
      'Exclusive documentary series rights: "Renaissance — Year One, Two, Three..."',
      'Real-time resident transformation content: the most authentic reality ever filmed',
      '"Citizen Graduation" quarterly specials with global simulcast rights',
      'Netflix Original Series format: individual resident journey arcs',
      'Subscriber acquisition: estimated 15M new subscribers driven by launch campaign',
    ],
    roi: '$300M licensing deal. 15M new subscriber projection. ESG brand positioning. Content franchise that runs for decades.',
    tier: 'Media Partner',
    urgency: 'Content pitch deck ready. First-look deal available.',
    carousel: [
      { headline: 'The Ultimate Reality Show', body: 'It\'s real. The stakes are real. The island is real. The transformation is real. No script. No casting. Just 650,000 humans becoming citizens — filmed in full.' },
      { headline: '15M New Subscribers', body: 'The launch campaign alone drives an estimated 15 million new Netflix subscriptions globally. No other content investment in 2026 comes close.' },
      { headline: 'A Franchise Forever', body: 'Year 1. Year 2. Year 5. Individual resident journey arcs. Graduation specials. The content never ends because the mission never ends.' },
    ],
    outreach: {
      channels: [
        { label: '📧 Netflix Content', handle: 'Via Netflix Content Acquisitions', note: 'Submit a first-look deal proposal to Netflix Originals / Documentary Films team.' },
        { label: '🎬 Ted Sarandos', handle: 'Netflix Co-CEO', note: 'Sarandos is the content decision-maker. A CAA or WME agent intro reaches him fastest.' },
        { label: '🤝 CAA / WME', handle: 'Creative Artists Agency', note: 'The major talent agencies rep Netflix relationships. One agent call opens the door.' },
      ],
      templates: [
        { id: 'netflix-dm', label: '💬 Short Pitch', text: `Reed — True crime. Social experiment. Human transformation. All three — at a scale no studio could manufacture. Project Renaissance on Vieques Island. Real people. Real stakes. 365 days a year. The greatest documentary franchise Netflix never knew it needed. First-look deal available. Demo: [YOUR_DEMO_LINK]` },
        { id: 'netflix-email', label: '📧 Content Pitch', text: `Subject: The Greatest Documentary Franchise Netflix Never Knew It Needed\n\nReed,\n\nProject Renaissance on Vieques Island:\n\n• Real people. Real stakes. No script. No casting.\n• 650,000 humans earning crypto and becoming citizens — filmed in full\n• Quarterly "Citizen Graduation" specials with global simulcast\n• Individual resident journey arc series — Netflix Originals format\n• Estimated 15M new subscribers from launch campaign alone\n\nThis is The Circle meets Making a Murderer meets the most important domestic policy story of the decade.\n\nFirst-look deal available. $300M licensing.\n\nDemo: [YOUR_DEMO_LINK]\n\n— [Your Name]` },
      ],
    },
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
  'Asset Management': '#1D4ED8',
  'Macro Investing': '#06B6D4',
  'Consumer Tech': '#A0A0A0',
  'Private Equity': '#4F46E5',
  'Media & Streaming': '#E50914',
};

const TIER_COLORS = {
  'Founding Partner':       'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Founding Investor':      'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Platinum Partner':       'text-primary bg-primary/10 border-primary/20',
  'Platinum Investor':      'text-primary bg-primary/10 border-primary/20',
  'Lead Investor':          'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'Strategic Investor':     'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
  'Government Partner':     'text-red-400 bg-red-400/10 border-red-400/20',
  'Housing Partner':        'text-pink-400 bg-pink-400/10 border-pink-400/20',
  'Crypto Partner':         'text-green-400 bg-green-400/10 border-green-400/20',
  'Supply Partner':         'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'Health & Education Partner': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'AI Infrastructure Partner':  'text-lime-400 bg-lime-400/10 border-lime-400/20',
  'AI Research Partner':        'text-teal-400 bg-teal-400/10 border-teal-400/20',
  'Banking Partner':            'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  'Real Estate Partner':        'text-violet-400 bg-violet-400/10 border-violet-400/20',
  'Technology Partner':         'text-gray-400 bg-gray-400/10 border-gray-400/20',
  'Media Partner':              'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

const totalAsk = PARTNERS.reduce((sum, p) => {
  const match = p.ask.match(/\$([\d,.]+)([BM])/);
  if (!match) return sum;
  const val = parseFloat(match[1].replace(/,/g, ''));
  return sum + (match[2] === 'B' ? val * 1000 : val);
}, 0);

function OutreachTab({ partner }) {
  const [copied, setCopied] = useState(null);
  const color = partner.color;
  const o = partner.outreach;

  const copy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="p-5 space-y-5">
      {/* Channels */}
      <div className="grid sm:grid-cols-3 gap-3">
        {o.channels.map(c => (
          <div key={c.label} className="glass rounded-xl p-3 border border-border/40">
            <div className="font-display font-bold text-sm mb-0.5" style={{ color }}>{c.label}</div>
            <div className="text-xs font-mono text-muted-foreground mb-1">{c.handle}</div>
            <div className="text-xs text-muted-foreground leading-relaxed">{c.note}</div>
          </div>
        ))}
      </div>
      {/* Templates */}
      <div className="space-y-3">
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color }}>Copy-Ready Templates</div>
        {o.templates.map(t => (
          <div key={t.id} className="glass rounded-xl border border-border/50 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
              <span className="text-xs font-bold text-muted-foreground">{t.label}</span>
              <button onClick={() => copy(t.text, t.id)}
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
  );
}

function PartnerCarousel({ partner }) {
  const [tab, setTab] = useState('pitch');
  const [idx, setIdx] = useState(0);
  const slides = partner.carousel;
  const color = partner.color;

  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${color}30` }}>
      {/* Tab bar */}
      <div className="flex border-b" style={{ borderColor: `${color}20`, background: `${color}08` }}>
        <button onClick={() => setTab('pitch')}
          className="flex-1 text-xs font-bold tracking-widest uppercase px-4 py-2.5 transition-colors"
          style={{ color: tab === 'pitch' ? color : '#94a3b8', borderBottom: tab === 'pitch' ? `2px solid ${color}` : '2px solid transparent' }}>
          Value Props
        </button>
        <button onClick={() => setTab('outreach')}
          className="flex-1 text-xs font-bold tracking-widest uppercase px-4 py-2.5 transition-colors"
          style={{ color: tab === 'outreach' ? color : '#94a3b8', borderBottom: tab === 'outreach' ? `2px solid ${color}` : '2px solid transparent' }}>
          📡 Outreach
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'pitch' ? (
          <motion.div key="pitch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <div className="relative overflow-hidden" style={{ minHeight: 110 }}>
              <AnimatePresence mode="wait">
                <motion.div key={idx}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}
                  className="p-5">
                  <div className="font-display font-black text-lg mb-1.5" style={{ color }}>{slides[idx].headline}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{slides[idx].body}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-t" style={{ borderColor: `${color}20` }}>
              <button onClick={() => setIdx((idx - 1 + slides.length) % slides.length)}
                className="flex items-center gap-1 text-xs font-bold" style={{ color: `${color}80` }}>
                <ChevronLeft className="w-3 h-3" /> Prev
              </button>
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button key={i} onClick={() => setIdx(i)}
                    className="w-1.5 h-1.5 rounded-full transition-all"
                    style={{ background: i === idx ? color : 'rgba(255,255,255,0.2)' }} />
                ))}
              </div>
              <button onClick={() => setIdx((idx + 1) % slides.length)}
                className="flex items-center gap-1 text-xs font-bold" style={{ color: `${color}80` }}>
                Next <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="outreach" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <OutreachTab partner={partner} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClockWheel({ onSelect, selected }) {
  const count = PARTNERS.length;
  const radius = 42;
  const CENTER = 50;

  return (
    <div className="relative w-full" style={{ paddingBottom: '100%', maxWidth: 700, margin: '0 auto' }}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-1/2 h-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: 'radial-gradient(circle, #F59E0B, #3B82F6, transparent)' }} />
        </div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" style={{ pointerEvents: 'none' }}>
          <circle cx="50" cy="50" r={radius} fill="none"
            stroke="rgba(59,130,246,0.18)" strokeWidth="0.4" strokeDasharray="1.2 0.8" />
          <circle cx="50" cy="50" r={radius - 4} fill="none"
            stroke="rgba(245,158,11,0.08)" strokeWidth="0.2" />
          {PARTNERS.map((_, i) => {
            const angle = (i / count) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            const x2 = CENTER + (radius - 1) * Math.cos(rad);
            const y2 = CENTER + (radius - 1) * Math.sin(rad);
            return <line key={i} x1="50" y1="50" x2={x2} y2={y2} stroke="rgba(59,130,246,0.06)" strokeWidth="0.2" />;
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
            className="text-center z-10 select-none" style={{ width: '38%' }}>
            <div className="glass-strong rounded-full flex flex-col items-center justify-center border border-yellow-400/30 glow-gold"
              style={{ aspectRatio: '1', padding: '8%' }}>
              <div className="font-display font-black text-gradient-gold leading-tight" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.8rem)' }}>LET'S MAKE</div>
              <div className="font-display font-black text-foreground leading-tight" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.8rem)' }}>IT</div>
              <div className="font-display font-black text-gradient-gold leading-tight" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.8rem)' }}>HAPPEN!</div>
              <div className="text-muted-foreground mt-1" style={{ fontSize: 'clamp(0.45rem, 0.9vw, 0.7rem)' }}>{PARTNERS.length} Partners</div>
            </div>
          </motion.div>
        </div>

        {PARTNERS.map((partner, i) => {
          const angle = (i / count) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = CENTER + radius * Math.cos(rad);
          const y = CENTER + radius * Math.sin(rad);
          const isSelected = selected === partner.id;
          return (
            <motion.button key={partner.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, duration: 0.35 }}
              onClick={() => onSelect(partner.id)}
              title={partner.name}
              className="absolute flex flex-col items-center"
              style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 20 }}
            >
              <div className="rounded-full flex items-center justify-center transition-all duration-300 border-2"
                style={{
                  width: 'clamp(36px, 6vw, 64px)',
                  height: 'clamp(36px, 6vw, 64px)',
                  background: isSelected ? partner.color : 'rgba(13,21,38,0.92)',
                  borderColor: partner.color,
                  boxShadow: isSelected ? `0 0 22px ${partner.color}90` : `0 0 8px ${partner.color}40`,
                  fontSize: 'clamp(15px, 2.5vw, 28px)',
                }}>
                {partner.logo}
              </div>
              <div className="font-display font-bold text-center leading-tight mt-0.5 transition-colors"
                style={{ color: isSelected ? partner.color : '#94a3b8', fontSize: 'clamp(6px, 0.8vw, 10px)', maxWidth: 'clamp(42px, 7vw, 66px)', lineHeight: 1.1 }}>
                {partner.name.split(' ')[0]}
                {partner.name.split(' ')[1] && partner.name.split(' ')[1].length < 8 ? ` ${partner.name.split(' ')[1]}` : ''}
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
  const [residentCount, setResidentCount] = useState(null);

  useEffect(() => {
    base44.entities.Resident.list('-created_date', 1000).then(r => {
      setResidentCount(r.filter(x => x.status === 'active').length);
    });
  }, []);

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

        {clockPartner && (
          <motion.div key={clockPartner.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="mt-6 mx-auto max-w-2xl glass rounded-2xl p-5 border" style={{ borderColor: `${clockPartner.color}40` }}>
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
            <p className="text-xs text-muted-foreground italic mb-3">{clockPartner.tagline}</p>
            <button onClick={() => document.getElementById(`partner-${clockPartner.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="text-xs font-bold px-3 py-1.5 rounded-full border transition-colors"
              style={{ color: clockPartner.color, borderColor: `${clockPartner.color}40` }}>
              View Full Pitch ↓
            </button>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-3xl mx-auto">
          {[
            { label: 'Partners', value: `${PARTNERS.length}` },
            { label: 'Total Capital Ask', value: `~$${(totalAsk / 1000).toFixed(1)}B` },
            { label: 'Phase 1 Residents', value: residentCount !== null ? residentCount.toLocaleString() : '...' },
            { label: '10yr ROI', value: '$400B+' },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-3 border border-border/50 text-center">
              <div className="font-display font-black text-2xl text-gradient-gold">{s.value}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Vieques Island Section */}
      <IslandSection />

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
            <motion.div key={partner.id} id={`partner-${partner.id}`}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              className={`glass rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-primary/30' : 'border-border/50 hover:border-border'}`}>
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

              <AnimatePresence>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden">
                    <div className="px-5 md:px-8 pb-8 border-t border-border/30 pt-6 space-y-6">
                      <div className="text-lg md:text-xl font-display font-black italic" style={{ color: catColor }}>
                        {partner.tagline}
                      </div>
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

                      {/* Strategic Value Proposition Carousel */}
                      <PartnerCarousel partner={partner} />

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <div className="text-xs font-bold text-primary tracking-widest uppercase mb-3">The Pitch</div>
                          <p className="text-muted-foreground leading-relaxed text-sm">{partner.pitch}</p>
                        </div>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Outreach Strategy */}
      <OutreachStrategy residentCount={residentCount} />

      {/* Coalition footer */}
      <div className="glass rounded-3xl p-8 border border-primary/20 text-center">
        <div className="font-display font-black text-3xl md:text-4xl text-gradient-gold mb-3">LET'S MAKE IT HAPPEN!</div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
          No single organization can end this. But <strong className="text-foreground">this coalition</strong> — the world's most powerful people, companies, and institutions — can.
          Every partner gets exactly what they need. And <strong className="text-foreground">{residentCount !== null ? residentCount.toLocaleString() : '...'} lives today</strong> become 650,000 tomorrow.
        </p>
      </div>
    </div>
  );
}

function IslandSection() {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-3xl border border-green-400/20 overflow-hidden">
      <button className="w-full flex items-center gap-4 px-6 py-5 text-left hover:bg-white/[0.02] transition-colors" onClick={() => setOpen(v => !v)}>
        <div className="w-10 h-10 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-shrink-0">
          <MapPin className="w-5 h-5 text-green-400" />
        </div>
        <div className="flex-1">
          <div className="font-display font-black text-xl text-foreground">SITE ZERO: {ISLAND.name.toUpperCase()}</div>
          <div className="text-xs text-muted-foreground">{ISLAND.designation} · {ISLAND.coords} · {ISLAND.area}</div>
        </div>
        <div className="hidden md:flex items-center gap-2 mr-4">
          <span className="text-xs px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 text-green-400 font-bold">US FEDERAL TERRITORY</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-6 pb-8 pt-2 border-t border-border/30 space-y-6">
              <p className="text-muted-foreground leading-relaxed text-sm">{ISLAND.status}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ISLAND.rationale.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 glass rounded-xl p-3 border border-border/40">
                    <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-muted-foreground leading-relaxed">{r}</span>
                  </div>
                ))}
              </div>
              <div className="glass rounded-xl p-4 border border-yellow-400/20">
                <div className="text-xs font-bold text-yellow-400 tracking-widest uppercase mb-2">Alternative Sites Considered</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ISLAND.alt}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OutreachStrategy({ residentCount }) {
  const [open, setOpen] = useState(null);

  const strategies = [
    {
      id: 'demo_link', icon: Globe, color: '#3B82F6',
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
      id: 'warm_intro', icon: Phone, color: '#a78bfa',
      title: 'Get a Warm Introduction',
      subtitle: 'Cold messages get read. Warm intros get meetings.',
      steps: [
        'For Elon: route through David Sacks (DOGE AI czar) or any Neuralink/SpaceX-adjacent contact.',
        'For Peter Thiel: reach via Founders Fund LP network or a Palantir connection.',
        'For Larry Fink: reach via a BlackRock institutional LP or any major sovereign wealth fund contact.',
        'For a16z: submit to their American Dynamism portfolio page — they actively look for this.',
        'For Trump / White House: route through DOGE or a congressional office. Ezra Cohen-Watnick, Brendan Carr.',
        'For Ray Dalio: reach through Bridgewater Associates or any macro hedge fund network.',
        'For Schwarzman: Blackstone portfolio companies or any major PE LP relationship.',
      ],
    },
    {
      id: 'viral_hook', icon: Twitter, color: '#F59E0B',
      title: 'Create a Viral Hook Moment',
      subtitle: 'Make them come to you.',
      steps: [
        'Post a 60-second video: "What if instead of $64,000/person on shelters, we spent $3,840 and they left with a job, savings, and a skill — from a US-controlled island?" — just data.',
        'Tag the right people without asking for anything. Curiosity drives clicks.',
        'Get the landing page link in comments before the post goes viral — not after.',
        'X/Twitter thread with the cost comparison data tends to get picked up by tech press without prompting.',
        'A Vieques site visit video — drone footage of the island — is the single most shareable asset you can produce.',
      ],
    },
    {
      id: 'conference', icon: Send, color: '#22C55E',
      title: 'Appear Where They Are',
      subtitle: 'Physical presence still beats digital reach.',
      steps: [
        'Davos, TED, SXSW, and the All-In Summit are where all of these people converge.',
        'Prepare a 3-minute verbal pitch: "I\'m building a crypto-incentivized island city for homeless Americans. $320/month. 94% employment target. Needs your name on it."',
        'Have the demo link in your phone. Demo playing before they finish saying hello.',
        'For government contacts: request a meeting through their public scheduling office — subject: "DOGE-Aligned Homelessness Solution — 15 Minutes."',
        'For Larry Fink and Schwarzman: Bloomberg Global Finance Conference and Milken Institute Global Conference are annual touchpoints.',
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
          The demo exists. The pitch is built. The island is chosen. The only question is delivery.
          <strong className="text-foreground"> Not because we're playing games. Because {residentCount !== null ? residentCount.toLocaleString() : '...'} people are on the island today, and 650,000 are waiting.</strong>
        </p>
      </div>
      <div className="space-y-3">
        {strategies.map((s, i) => {
          const isOpen = open === s.id;
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="glass rounded-2xl border border-border/40 overflow-hidden">
              <button className="w-full flex items-center gap-4 px-5 py-4 text-left" onClick={() => setOpen(isOpen ? null : s.id)}>
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
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
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
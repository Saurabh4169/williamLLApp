export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'Analysis' | 'Permits & Appeals' | 'Consulting' | 'Development';
  shortDescription: string;
  fullDescription: string;
  imageKey: string;
  badge?: string;
  stats: {
    whoItsFor: string;
    typicalTimeline: string; // marked as [TYPICAL TIMELINE] placeholder where appropriate
    documentsNeeded: string;
    supportLevel: string;
  };
  features: string[];
  whatsIncluded: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  priceNote: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'zoning-analysis',
    slug: 'zoning-analysis-consultation',
    title: 'Zoning Analysis & Consultation',
    category: 'Analysis',
    shortDescription: 'Comprehensive property evaluation against the Chicago Zoning Ordinance to uncover development potential.',
    fullDescription: 'Before buying, designing, or altering property in Chicago, a thorough zoning analysis is critical. We review title 17 municipal codes, maximum Floor Area Ratio (FAR), allowable lot coverage, required setbacks, parking mandates, and permitted uses to prevent costly delays.',
    imageKey: 'serviceZoningAnalysis',
    badge: 'Popular',
    stats: {
      whoItsFor: 'Property buyers, architects, developers',
      typicalTimeline: '[TIMELINE: 3–5 Business Days]',
      documentsNeeded: 'Plat of survey, address, PIN',
      supportLevel: 'Dedicated Senior Consultant',
    },
    features: [
      'Cadastral PIN zoning district verification',
      'FAR & building envelope calculations',
      'Allowable use classification breakdown',
      'Setback, height, & parking requirement audit',
    ],
    whatsIncluded: [
      'Formal 12-page Written Zoning Opinion Letter',
      'Development potential & constraint matrix',
      '1-on-1 virtual or in-person review meeting',
      'Recommendations for administrative relief or variances',
    ],
    faqs: [
      {
        question: 'Why do I need a zoning analysis before purchasing?',
        answer: 'Chicago zoning regulations dictate what can be built, how high, and for what purpose. An analysis guarantees your intended use is legally permitted before you close.',
      },
      {
        question: 'Can you analyse multiple adjacent parcels?',
        answer: 'Yes, we frequently evaluate lot combinations, lot splits, and planned developments encompassing several PINs.',
      },
    ],
    priceNote: 'Complimentary Initial Assessment',
  },
  {
    id: 'zoning-appeals',
    slug: 'zoning-appeals-hearings',
    title: 'Zoning Appeals & Hearings',
    category: 'Permits & Appeals',
    shortDescription: 'Facing a zoning denial can be frustrating. We specialize in zoning appeals in Chicago, IL and work to overturn unfavourable decisions.',
    fullDescription: 'When the Chicago Zoning Administrator denies a permit or requires a variance or special use, we represent your interests before the Zoning Board of Appeals (ZBA). We draft rigorous evidentiary filings, prepare expert witness testimony, and address community concerns.',
    imageKey: 'serviceAppealsHearing',
    badge: 'High Impact',
    stats: {
      whoItsFor: 'Owners with denials or variance needs',
      typicalTimeline: '[TIMELINE: 6–10 Weeks to Hearing]',
      documentsNeeded: 'Denial letter, plans, site photos',
      supportLevel: 'Full Hearing Representation',
    },
    features: [
      'Zoning Board of Appeals (ZBA) petition prep',
      'Hardship justification & legal brief drafting',
      'Aldermanic and community liaison support',
      'Expert witness hearing testimony',
    ],
    whatsIncluded: [
      'Comprehensive appeal package preparation & submission',
      'Public notice management and certified mailings to neighbors',
      'Mock hearing dry-run with your project team',
      'In-person oral argument and presentation at City Hall / ZBA',
    ],
    faqs: [
      {
        question: 'What are the most common grounds for a zoning variance?',
        answer: 'Variances are typically granted for practical difficulties or particular hardships resulting from unique lot geometry, topography, or historic conditions.',
      },
      {
        question: 'What if an alderman opposes the project?',
        answer: 'We organize proactive community outreach and adapt site plans to address legitimate community priorities while defending your property rights.',
      },
    ],
    priceNote: 'Flat-Fee Case Structure Available',
  },
  {
    id: 'zoning-law-updates',
    slug: 'zoning-law-updates',
    title: 'Zoning Law Updates & Monitoring',
    category: 'Analysis',
    shortDescription: 'Stay ahead of Chicago City Council ordinance amendments, ARO adjustments, and zoning map changes.',
    fullDescription: 'Chicago municipal land-use policy evolves continuously. From Connected Communities Ordinance expansions to changes in accessory dwelling unit (ADU) pilot zones, we keep investors and developers briefed on changes that impact real estate valuations.',
    imageKey: 'serviceUrbanPlanning',
    stats: {
      whoItsFor: 'Commercial owners, portfolio managers',
      typicalTimeline: '[TIMELINE: Ongoing / Monthly Briefings]',
      documentsNeeded: 'Portfolio asset list or address',
      supportLevel: 'Executive Regulatory Advisory',
    },
    features: [
      'Ward-by-ward rezoning tracking',
      'ARO (Affordable Requirements) impact audits',
      'ADU pilot program eligibility checks',
      'Transit-Served Location (TOD) rule shifts',
    ],
    whatsIncluded: [
      'Monthly regulatory intelligence memo',
      'Direct alert when ordinance affects your zip code or ward',
      'Quarterly executive strategy session',
    ],
    faqs: [
      {
        question: 'How do changes in TOD rules affect my parking ratio?',
        answer: 'Chicago TOD rules allow reductions in required off-street parking for residential and commercial projects within designated proximity to CTA/Metra stations.',
      },
    ],
    priceNote: 'Custom Advisory Scope',
  },
  {
    id: 'strategic-zoning-insights',
    slug: 'strategic-zoning-insights',
    title: 'Strategic Zoning Insights',
    category: 'Consulting',
    shortDescription: 'Forward-looking entitlement roadmaps that maximize density, return on investment, and development speed.',
    fullDescription: 'Transform complex zoning constraints into strategic competitive advantages. We work alongside capital partners and architectural teams from conceptual drafting to model the highest and best use under existing or re-zoned classifications.',
    imageKey: 'heroBlueprintsTeam',
    badge: 'Strategic',
    stats: {
      whoItsFor: 'Institutional investors & land developers',
      typicalTimeline: '[TIMELINE: 1–2 Weeks]',
      documentsNeeded: 'Project pro-forma, conceptual sketches',
      supportLevel: 'Senior Partner Engagement',
    },
    features: [
      'Maximum yield density scenario modeling',
      'Planned Development (PD) threshold evaluation',
      'Air rights & bonus FAR opportunities',
      'Entitlement timeline & critical path roadmapping',
    ],
    whatsIncluded: [
      'Comparative density & yield spreadsheet matrix',
      'Risk assessment of zoning amendment pathways',
      'Executive presentation for investment committees',
    ],
    faqs: [
      {
        question: 'When is a Planned Development (PD) mandatory?',
        answer: 'PD status is triggered when a project meets specific floor area, building height, or dwelling unit thresholds defined in Title 17 of Chicago code.',
      },
    ],
    priceNote: 'Project-Based Engagement',
  },
  {
    id: 'permit-assistance',
    slug: 'permit-assistance',
    title: 'Permit Assistance & Expediting',
    category: 'Permits & Appeals',
    shortDescription: 'Streamline building permits through the Chicago Department of Buildings with zero bureaucratic friction.',
    fullDescription: 'Avoid prolonged review cycles and endless corrections. Our permit expediting team coordinates directly with city plan examiners across zoning, structural, MEP, and environmental disciplines to shepherd applications to final stamped issuance.',
    imageKey: 'servicePermits',
    badge: 'Essential',
    stats: {
      whoItsFor: 'Contractors, interior designers, owners',
      typicalTimeline: '[TIMELINE: 2–6 Weeks typical]',
      documentsNeeded: 'Architectural drawings, MEP plans, contractor info',
      supportLevel: 'Dedicated Project Expediter',
    },
    features: [
      'Standard Plan Review & Self-Certification paths',
      'Zoning plan examiner pre-clearance',
      'E-Plan digital submission management',
      'Addressing examiner correction notices',
    ],
    whatsIncluded: [
      'Document QA pre-submission review',
      'City portal tracking and daily status monitoring',
      'Direct liaison with Chicago DOB examiners',
      'Final permit certificate delivery',
    ],
    faqs: [
      {
        question: 'Can you handle Self-Certification permits?',
        answer: 'Yes, we collaborate with licensed Self-Cert architects to expedite eligible commercial and residential project approvals.',
      },
    ],
    priceNote: 'Tiered by Project Valuation',
  },
  {
    id: 'compliance-planning',
    slug: 'compliance-and-planning',
    title: 'Compliance & Planning',
    category: 'Consulting',
    shortDescription: 'Proactive code audits to protect existing properties from municipal citations and stop-work orders.',
    fullDescription: 'Zoning non-conformities and municipal citations can halt construction and jeopardize financing. We perform meticulous compliance audits, resolve legacy violations, and structure legal non-conforming use certifications with the City of Chicago.',
    imageKey: 'serviceCompliance',
    stats: {
      whoItsFor: 'Commercial landlords, property managers',
      typicalTimeline: '[TIMELINE: 1–2 Weeks]',
      documentsNeeded: 'Current lease roster, prior permits, certificate of occupancy',
      supportLevel: 'Auditor & Compliance Counsel',
    },
    features: [
      'Non-conforming use (grandfathering) verification',
      'Department of Administrative Hearings defense',
      'Occupancy classification audits',
      'Corrective remediation plan generation',
    ],
    whatsIncluded: [
      'On-site zoning and building condition inspection',
      'Comprehensive violation remedy roadmap',
      'Resolution of open stop-work orders and building citations',
    ],
    faqs: [
      {
        question: 'What is a legal non-conforming use?',
        answer: 'A use or structure that was lawfully established under prior zoning laws but no longer conforms to current rules. It can often be certified and maintained.',
      },
    ],
    priceNote: 'Hourly or Fixed Audit Fee',
  },
  {
    id: 'community-engagement',
    slug: 'community-engagement',
    title: 'Community Engagement & Ward Liaison',
    category: 'Development',
    shortDescription: 'Build strong neighborhood consensus and secure aldermanic approval for ambitious projects.',
    fullDescription: 'Chicago’s aldermanic prerogative makes community consensus crucial for rezoning, variances, and special uses. We plan and facilitate productive community forums, address neighbor concerns, and build solid coalitions of local support.',
    imageKey: 'serviceCommunity',
    stats: {
      whoItsFor: 'Developers seeking re-zoning or special uses',
      typicalTimeline: '[TIMELINE: 4–8 Weeks]',
      documentsNeeded: 'Proposed rendering, traffic study, site plan',
      supportLevel: 'Full Public Affairs Campaign',
    },
    features: [
      'Ward Alderman and Community Organization outreach',
      'Town hall & neighborhood presentation prep',
      'Traffic, shadow, and density mitigation talking points',
      'Letters of support collection and advocacy',
    ],
    whatsIncluded: [
      'Community meeting facilitation and presentation materials',
      'Summary reports for aldermanic staff',
      'Stakeholder compromise & agreement drafting',
    ],
    faqs: [
      {
        question: 'Why is aldermanic support so important in Chicago?',
        answer: 'In Chicago, the local ward alderman holds significant influence over zoning changes in their district. Strong community backing is key to securing their blessing.',
      },
    ],
    priceNote: 'Comprehensive Engagement Retainer',
  },
  {
    id: 'feasibility-studies',
    slug: 'feasibility-studies',
    title: 'Feasibility Studies & Site Selection',
    category: 'Development',
    shortDescription: 'In-depth due diligence reports that validate site suitability before capital commitment.',
    fullDescription: 'Assess parcel suitability, infrastructure readiness, environmental zoning overlays, and economic yield before acquiring Chicago real estate. Our feasibility reports empower clients to negotiate purchase agreements with complete confidence.',
    imageKey: 'serviceFeasibility',
    badge: 'Investor Favorite',
    stats: {
      whoItsFor: 'Acquisitions teams, private developers',
      typicalTimeline: '[TIMELINE: 5–7 Business Days]',
      documentsNeeded: 'Target parcel address or coordinates',
      supportLevel: 'Multi-disciplinary Analysis',
    },
    features: [
      'Multi-site comparative zoning matrix',
      'Infrastructure capacity & utility verification',
      'Environmental and Lake Michigan protection overlays',
      'Pro-forma zoning optimization recommendations',
    ],
    whatsIncluded: [
      'Comprehensive 20+ page Site Feasibility Dossier',
      'GIS mapping and zoning envelope 3D schematics',
      'Risk scoring and timeline forecast',
    ],
    faqs: [
      {
        question: 'Does this cover Lake Michigan and Chicago River corridor rules?',
        answer: 'Yes, we explicitly check Lake Michigan and Chicago Waterway Protection Ordinance regulations and setback mandates.',
      },
    ],
    priceNote: 'Per Parcel or Portfolio Pricing',
  },
  {
    id: 'urban-planning',
    slug: 'urban-planning-consultation',
    title: 'Urban Planning Consultation',
    category: 'Consulting',
    shortDescription: 'Master planning and transit-oriented development expertise tailored to Chicago neighborhoods.',
    fullDescription: 'We merge urban design theory with hard Chicago municipal ordinances to craft master plans that foster community vitality, respect historical neighborhood fabric, and achieve commercial success.',
    imageKey: 'serviceUrbanPlanning',
    stats: {
      whoItsFor: 'Master developers, civic organizations',
      typicalTimeline: '[TIMELINE: 4–12 Weeks]',
      documentsNeeded: 'Area boundary survey, program requirements',
      supportLevel: 'Principal Urban Planner',
    },
    features: [
      'Master plan zoning framework alignment',
      'Pedestrian and transit circulation design',
      'Open space and green infrastructure ratios',
      'Historic landmark district coordination',
    ],
    whatsIncluded: [
      'Urban design guidelines document',
      'Public realm and streetscape plan integration',
      'Regulatory compliance integration manual',
    ],
    faqs: [
      {
        question: 'Do you work in Chicago Landmark Districts?',
        answer: 'Yes, we frequently coordinate with the Commission on Chicago Landmarks on historic district guidelines and approvals.',
      },
    ],
    priceNote: 'Custom Project Engagement',
  },
  {
    id: 'construction-design',
    slug: 'construction-and-design-zoning',
    title: 'Construction & Design Integration',
    category: 'Development',
    shortDescription: 'Bridge architectural vision with Chicago zoning codes during schematic design.',
    fullDescription: 'Architectural creativity shouldn’t hit a zoning roadblock at final permit review. We embed directly with your design and construction management team from day one to ensure every square foot of design is fully buildable under Chicago code.',
    imageKey: 'serviceConstruction',
    stats: {
      whoItsFor: 'Architects, design-build firms, GC teams',
      typicalTimeline: '[TIMELINE: Integrated with Design Schedule]',
      documentsNeeded: 'Revit / CAD schematics, BIM models',
      supportLevel: 'Embedded Zoning Specialist',
    },
    features: [
      'Real-time schematic design code audits',
      'FAR and volume optimization consulting',
      'Structural and accessibility overlap checking',
      'Construction phasing & staging permit guidance',
    ],
    whatsIncluded: [
      'Zoning code markups on architectural plan sets',
      'Direct participation in design charettes',
      'Pre-submission DOB plan review meetings',
    ],
    faqs: [
      {
        question: 'Can you review CAD or BIM files directly?',
        answer: 'Yes, our team works with standard DWG, PDF, and BIM model outputs to identify zoning friction points immediately.',
      },
    ],
    priceNote: 'Integrated Design Retainer',
  },
];


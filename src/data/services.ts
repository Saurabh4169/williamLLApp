export interface ServiceGalleryItem {
  id: string;
  label: string;
  imageKey: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  serviceCode: string;
  title: string;
  category: string;
  division?: 'zoning' | 'construction';
  shortDescription: string;
  fullDescription: string;
  imageKey: string;
  badge?: string;
  gallery?: ServiceGalleryItem[];
  stats: {
    whoItsFor: string;
    typicalTimeline: string;
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
    serviceCode: 'WW-SRV-01',
    title: 'Zoning Analysis & Consultation',
    category: 'Analysis',
    division: 'zoning',
    shortDescription: 'Comprehensive property evaluation against the Chicago Zoning Ordinance to uncover development potential.',
    fullDescription: 'Before buying, designing, or altering property in Chicago, a thorough zoning analysis is critical. We review title 17 municipal codes, maximum Floor Area Ratio (FAR), allowable lot coverage, required setbacks, parking mandates, and permitted uses to prevent costly delays.',
    imageKey: 'serviceZoningAnalysis',
    badge: 'Popular',
    stats: {
      whoItsFor: 'Property buyers, architects, developers',
      typicalTimeline: '5 to 7 days',
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
    priceNote: 'Complimentary Assessment',
  },
  {
    id: 'zoning-appeals',
    slug: 'zoning-appeals-hearings',
    serviceCode: 'WW-SRV-02',
    title: 'Zoning Appeals & Hearings',
    category: 'Permits & Appeals',
    division: 'zoning',
    shortDescription: 'Facing a zoning denial can be frustrating. We specialize in zoning appeals in Chicago, IL and work to overturn unfavourable decisions.',
    fullDescription: 'When the Chicago Zoning Administrator denies a permit or requires a variance or special use, we represent your interests before the Zoning Board of Appeals (ZBA). We draft rigorous evidentiary filings, prepare expert witness testimony, and address community concerns.',
    imageKey: 'serviceAppealsHearing',
    badge: 'High Impact',
    stats: {
      whoItsFor: 'Owners with denials or variance needs',
      typicalTimeline: '6 to 8 weeks',
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
    priceNote: 'Flat-Fee Case Structure',
  },
  {
    id: 'zoning-law-updates',
    slug: 'zoning-law-updates',
    serviceCode: 'WW-SRV-03',
    title: 'Zoning Law Updates & Monitoring',
    category: 'Analysis',
    division: 'zoning',
    shortDescription: 'Stay ahead of Chicago City Council ordinance amendments, ARO adjustments, and zoning map changes.',
    fullDescription: 'Chicago municipal land-use policy evolves continuously. From Connected Communities Ordinance expansions to changes in accessory dwelling unit (ADU) pilot zones, we keep investors and developers briefed on changes that impact real estate valuations.',
    imageKey: 'serviceUrbanPlanning',
    stats: {
      whoItsFor: 'Commercial owners, portfolio managers',
      typicalTimeline: 'Ongoing updates',
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
    serviceCode: 'WW-SRV-04',
    title: 'Strategic Zoning Insights',
    category: 'Consulting',
    division: 'zoning',
    shortDescription: 'Forward-looking entitlement roadmaps that maximize density, return on investment, and development speed.',
    fullDescription: 'Transform complex zoning constraints into strategic competitive advantages. We work alongside capital partners and architectural teams from conceptual drafting to model the highest and best use under existing or re-zoned classifications.',
    imageKey: 'heroBlueprintsTeam',
    badge: 'Strategic',
    stats: {
      whoItsFor: 'Institutional investors & land developers',
      typicalTimeline: '1 to 2 weeks',
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
    serviceCode: 'WW-SRV-05',
    title: 'Permit Assistance & Expediting',
    category: 'Permits & Appeals',
    division: 'zoning',
    shortDescription: 'Streamline building permits through the Chicago Department of Buildings with zero bureaucratic friction.',
    fullDescription: 'Avoid prolonged review cycles and endless corrections. Our permit expediting team coordinates directly with city plan examiners across zoning, structural, MEP, and environmental disciplines to shepherd applications to final stamped issuance.',
    imageKey: 'servicePermits',
    badge: 'Essential',
    stats: {
      whoItsFor: 'Contractors, interior designers, owners',
      typicalTimeline: '2 to 4 weeks',
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
    priceNote: 'Tiered Project Scope',
  },
  {
    id: 'compliance-planning',
    slug: 'compliance-and-planning',
    serviceCode: 'WW-SRV-06',
    title: 'Compliance & Planning',
    category: 'Consulting',
    division: 'zoning',
    shortDescription: 'Proactive code audits to protect existing properties from municipal citations and stop-work orders.',
    fullDescription: 'Zoning non-conformities and municipal citations can halt construction and jeopardize financing. We perform meticulous compliance audits, resolve legacy violations, and structure legal non-conforming use certifications with the City of Chicago.',
    imageKey: 'serviceCompliance',
    stats: {
      whoItsFor: 'Commercial landlords, property managers',
      typicalTimeline: '1 to 2 weeks',
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
    priceNote: 'Hourly or Fixed Fee',
  },
  {
    id: 'community-engagement',
    slug: 'community-engagement',
    serviceCode: 'WW-SRV-07',
    title: 'Community Engagement & Ward Liaison',
    category: 'Consulting',
    division: 'zoning',
    shortDescription: 'Build strong neighborhood consensus and secure aldermanic approval for ambitious projects.',
    fullDescription: 'Chicago’s aldermanic prerogative makes community consensus crucial for rezoning, variances, and special uses. We plan and facilitate productive community forums, address neighbor concerns, and build solid coalitions of local support.',
    imageKey: 'serviceCommunity',
    stats: {
      whoItsFor: 'Developers seeking re-zoning or special uses',
      typicalTimeline: '4 to 6 weeks',
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
    priceNote: 'Comprehensive Retainer',
  },
  {
    id: 'feasibility-studies',
    slug: 'feasibility-studies',
    serviceCode: 'WW-SRV-08',
    title: 'Feasibility Studies & Site Selection',
    category: 'Analysis',
    division: 'zoning',
    shortDescription: 'In-depth due diligence reports that validate site suitability before capital commitment.',
    fullDescription: 'Assess parcel suitability, infrastructure readiness, environmental zoning overlays, and economic yield before acquiring Chicago real estate. Our feasibility reports empower clients to negotiate purchase agreements with complete confidence.',
    imageKey: 'serviceFeasibility',
    badge: 'Investor Favorite',
    stats: {
      whoItsFor: 'Acquisitions teams, private developers',
      typicalTimeline: '5 to 7 days',
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
    priceNote: 'Per-Parcel Pricing',
  },
  {
    id: 'urban-planning',
    slug: 'urban-planning-consultation',
    serviceCode: 'WW-SRV-09',
    title: 'Urban Planning Consultation',
    category: 'Consulting',
    division: 'zoning',
    shortDescription: 'Master planning and transit-oriented development expertise tailored to Chicago neighborhoods.',
    fullDescription: 'We merge urban design theory with hard Chicago municipal ordinances to craft master plans that foster community vitality, respect historical neighborhood fabric, and achieve commercial success.',
    imageKey: 'serviceUrbanPlanning',
    stats: {
      whoItsFor: 'Master developers, civic organizations',
      typicalTimeline: '4 to 8 weeks',
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
    serviceCode: 'WW-SRV-10',
    title: 'Construction & Design Integration',
    category: 'Consulting',
    division: 'zoning',
    shortDescription: 'Bridge architectural vision with Chicago zoning codes during schematic design.',
    fullDescription: 'Architectural creativity shouldn’t hit a zoning roadblock at final permit review. We embed directly with your design and construction management team from day one to ensure every square foot of design is fully buildable under Chicago code.',
    imageKey: 'serviceConstruction',
    stats: {
      whoItsFor: 'Architects, design-build firms, GC teams',
      typicalTimeline: 'Integrated with design schedule',
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
  // =========================================================================
  // CONSTRUCTION & DESIGN SERVICES (WW-CON-01 to WW-CON-06)
  // =========================================================================
  {
    id: 'architectural-design-consultation',
    slug: 'architectural-design-consultation',
    serviceCode: 'WW-CON-01',
    title: 'Architectural Design Consultation',
    category: 'Design',
    division: 'construction',
    shortDescription: '1-on-1 architectural concept review and site assessment to align zoning envelopes with building vision.',
    fullDescription: 'Explore massing, floor plan layouts, structural considerations, and exterior aesthetics with licensed Chicago architects. We blend architectural creativity with stringent Title 17 municipal zoning regulations to produce buildable schematic visions from day one.',
    imageKey: 'heroBlueprintsTeam',
    badge: 'POPULAR',
    stats: {
      whoItsFor: 'Property owners, developers, architects',
      typicalTimeline: '3 to 5 days',
      documentsNeeded: 'Existing survey, sketch or inspiration',
      supportLevel: 'Principal Architect & Senior Planner',
    },
    features: [
      'Site footprint and buildable envelope massing',
      'Preliminary space planning & floor layout review',
      'Exterior facade & materials zoning alignment',
      'Chicago DOB building code feasibility audit',
    ],
    whatsIncluded: [
      'Initial 60-minute site walk & architectural consultation',
      'Schematic building envelope diagram',
      'Preliminary space optimization report',
      'Zoning relief & permit roadmap',
    ],
    faqs: [
      {
        question: 'What is included in the free site call?',
        answer: 'A senior architect will review your property PIN, review allowable building height and setback limits, and discuss spatial layout options.',
      },
    ],
    priceNote: 'Free site call',
  },
  {
    id: 'new-construction-planning',
    slug: 'new-construction-planning',
    serviceCode: 'WW-CON-02',
    title: 'New Construction Planning',
    category: 'Planning',
    division: 'construction',
    shortDescription: 'End-to-end ground-up construction planning, structural coordination, and master phasing.',
    fullDescription: 'Comprehensive master pre-construction services for ground-up single family, multi-family, and mixed-use structures in Chicago. We coordinate civil, structural, MEP engineering, and zoning logistics to eliminate costly construction change orders.',
    imageKey: 'serviceConstruction',
    badge: 'HIGH VALUE',
    stats: {
      whoItsFor: 'Custom home builders, multi-unit developers',
      typicalTimeline: '2 to 4 weeks',
      documentsNeeded: 'Plat of survey, site boundary files, soil report',
      supportLevel: 'Senior Construction Director',
    },
    features: [
      'Ground-up construction zoning alignment & FAR review',
      'Foundation & structural framing schematics',
      'Civil engineering & utility tie-in coordination',
      'General contractor bid review & milestone scheduling',
    ],
    whatsIncluded: [
      'Pre-construction feasibility and phasing dossier',
      'Site utility & right-of-way tie-in plan',
      'Contractor procurement & bid evaluation matrix',
      'Critical path schedule with DOB milestone targets',
    ],
    faqs: [
      {
        question: 'Can you help select general contractors?',
        answer: 'Yes, we evaluate contractor qualifications, review bids against Chicago market rates, and verify licensing and bonding.',
      },
    ],
    priceNote: 'Project-based',
  },
  {
    id: 'renovation-addition-consultation',
    slug: 'renovation-addition-consultation',
    serviceCode: 'WW-CON-03',
    title: 'Renovation & Addition Consultation',
    category: 'Construction',
    division: 'construction',
    shortDescription: 'Structural feasibility and code compliance for second-story build-outs, rear additions, and gut rehabs.',
    fullDescription: 'Navigating Chicago\'s building code on vintage masonry greystones and frame houses requires specialized renovation expertise. We evaluate existing structural conditions, non-conforming lot grandfathering, and allowable rear or vertical expansion.',
    imageKey: 'portfolioCurrent1',
    stats: {
      whoItsFor: 'Existing property owners expanding floor area',
      typicalTimeline: '5 to 7 days',
      documentsNeeded: 'Existing building plans, photos, survey',
      supportLevel: 'Renovation Specialist',
    },
    features: [
      'Non-conforming structure grandfathering evaluation',
      'Second-story & rear addition setback verification',
      'Load-bearing wall inspection & MEP layout analysis',
      'Standard plan review permit preparation timeline',
    ],
    whatsIncluded: [
      'On-site framing & structural layout audit',
      'Permitted expansion calculations (FAR & height limits)',
      'Structural reinforcement recommendations',
      'Detailed scope checklist for DOB permit submission',
    ],
    faqs: [
      {
        question: 'Can I add a second story to a pre-ordinance building?',
        answer: 'Yes, provided foundation and structural load requirements are verified and allowable building heights are respected.',
      },
    ],
    priceNote: 'From $200',
  },
  {
    id: 'permit-drawings-plans',
    slug: 'permit-drawings-plans',
    serviceCode: 'WW-CON-04',
    title: 'Permit Drawings & Plans',
    category: 'Permits',
    division: 'construction',
    shortDescription: 'City of Chicago DOB-compliant architectural drawing sets stamped by licensed Illinois professionals.',
    fullDescription: 'Obtain official stamped architectural and structural plan sets ready for City of Chicago standard plan review or self-certification. Our team drafts comprehensive sheets covering architectural, life-safety, egress, and accessibility codes.',
    imageKey: 'servicePermits',
    stats: {
      whoItsFor: 'Contractors, property owners needing stamped drawings',
      typicalTimeline: '7 to 10 days',
      documentsNeeded: 'Current survey, scope of work, architect sketches',
      supportLevel: 'Licensed PE / Architect of Record',
    },
    features: [
      'Chicago DOB-compliant architectural drawings set',
      'Structural, life safety & accessibility code compliance',
      'City of Chicago standard plan examination submittal',
      'Dedicated plan examiner response & corrections support',
    ],
    whatsIncluded: [
      'Complete stamped architectural blueprint drawing set',
      'Life safety, egress & fire-rating compliance schedules',
      'City of Chicago Hansen portal electronic submittal pack',
      '1 round of examiner corrections revisions included',
    ],
    faqs: [
      {
        question: 'Are the drawings stamped by licensed Illinois architects?',
        answer: 'Yes, every set is stamped and sealed by a licensed Illinois Architect or Professional Engineer.',
      },
    ],
    priceNote: 'Flat fee',
  },
  {
    id: '3d-visualization-film',
    slug: '3d-visualization-film',
    serviceCode: 'WW-CON-05',
    title: '3D Visualization & Film',
    category: 'Design',
    division: 'construction',
    badge: 'NEW',
    shortDescription: 'Photorealistic 3D architectural renderings, cinematic fly-through films, and community presentation packs.',
    fullDescription: 'Transform 2D blueprints into breathtaking 4K architectural films and photorealistic daylight/twilight renderings. Ideal for winning aldermanic approvals, community zoning charettes, and marketing luxury Chicago developments.',
    imageKey: 'portfolioCurrent2',
    stats: {
      whoItsFor: 'Developers presenting to aldermen, investors, buyers',
      typicalTimeline: '5 to 8 days',
      documentsNeeded: 'CAD / Revit files, material preferences, landscape plan',
      supportLevel: 'Visualization Lead & 3D Artist',
    },
    features: [
      'Photorealistic daylight & twilight exterior renders',
      '4K cinematic architectural fly-through animation',
      'Aldermanic community meeting presentation pack',
      'VR-ready 360-degree walkthrough scenes',
    ],
    whatsIncluded: [
      '3 high-resolution 4K exterior perspective renderings',
      '60-second cinematic 3D fly-through video with titles',
      'Board-ready presentation PDF for public hearings',
      'Material & lighting customization revisions',
    ],
    faqs: [
      {
        question: 'What file formats do you need to begin?',
        answer: 'We accept Revit (RVT), AutoCAD (DWG), SketchUp (SKP), or PDF plan and elevation drawings.',
      },
    ],
    priceNote: 'Custom',
  },
  {
    id: 'construction-project-management',
    slug: 'construction-project-management',
    serviceCode: 'WW-CON-06',
    title: 'Construction Project Management',
    category: 'Construction',
    division: 'construction',
    shortDescription: 'Owner representation, construction inspection sign-offs, and quality assurance through Certificate of Occupancy.',
    fullDescription: 'Professional owner representation on Chicago job sites. We oversee general contractors, monitor daily trades, ensure strict adherence to approved architectural plans, and coordinate required municipal DOB milestone inspections.',
    imageKey: 'serviceConstruction',
    stats: {
      whoItsFor: 'Owners wanting hands-off construction oversight',
      typicalTimeline: 'Ongoing monthly milestone tracking',
      documentsNeeded: 'Approved plans, permits, contractor contracts',
      supportLevel: 'Dedicated Chicago Site Superintendent',
    },
    features: [
      'On-site municipal inspection coordination & sign-offs',
      'Subcontractor QA/QC adherence & safety logs',
      'Weekly owner video reports & schedule audits',
      'Certificate of Occupancy (COO) closeout facilitation',
    ],
    whatsIncluded: [
      'Twice-weekly on-site physical inspections & logs',
      'Contractor draw request and lien waiver audits',
      'Direct management of city building inspectors',
      'Final punch-list walkthrough & COO closeout file',
    ],
    faqs: [
      {
        question: 'Do you handle rough and final city inspections?',
        answer: 'Yes, our superintendents schedule and attend all required rough framing, MEP, and final inspections with city inspectors.',
      },
    ],
      priceNote: 'Monthly',
    },
  ];

  export const DEFAULT_SERVICE_GALLERIES: Record<string, ServiceGalleryItem[]> = {
    'zoning-analysis': [
      { id: 'za-1', label: 'Analysis', imageKey: 'serviceZoningAnalysis' },
      { id: 'za-2', label: 'Maps', imageKey: 'heroBlueprintsTeam' },
      { id: 'za-3', label: 'Meeting', imageKey: 'serviceCommunity' },
      { id: 'za-4', label: 'Office', imageKey: 'areaLincolnPark' },
      { id: 'za-5', label: 'Urban', imageKey: 'heroChicagoSkyline' },
    ],
    'zoning-appeals': [
      { id: 'zap-1', label: 'Hearing room', imageKey: 'serviceAppealsHearing' },
      { id: 'zap-2', label: 'Preparation', imageKey: 'heroBlueprintsTeam' },
      { id: 'zap-3', label: 'Documents', imageKey: 'serviceCompliance' },
      { id: 'zap-4', label: 'City Hall', imageKey: 'heroChicagoSkyline' },
      { id: 'zap-5', label: 'Briefing', imageKey: 'serviceZoningAnalysis' },
    ],
    'zoning-law-updates': [
      { id: 'zlu-1', label: 'Ordinances', imageKey: 'heroChicagoSkyline' },
      { id: 'zlu-2', label: 'Amendments', imageKey: 'serviceZoningAnalysis' },
      { id: 'zlu-3', label: 'Council', imageKey: 'areaLoop' },
      { id: 'zlu-4', label: 'Legal Desk', imageKey: 'heroBlueprintsTeam' },
      { id: 'zlu-5', label: 'Monitoring', imageKey: 'serviceCompliance' },
    ],
    'strategic-zoning-insights': [
      { id: 'szi-1', label: 'Insights', imageKey: 'heroBlueprintsTeam' },
      { id: 'szi-2', label: 'Strategy', imageKey: 'serviceUrbanPlanning' },
      { id: 'szi-3', label: 'Density', imageKey: 'serviceFeasibility' },
      { id: 'szi-4', label: 'Market', imageKey: 'areaWestLoop' },
      { id: 'szi-5', label: 'Advisory', imageKey: 'serviceZoningAnalysis' },
    ],
    'permit-assistance': [
      { id: 'pa-1', label: 'Permits', imageKey: 'servicePermits' },
      { id: 'pa-2', label: 'DOB Review', imageKey: 'serviceCompliance' },
      { id: 'pa-3', label: 'Drawings', imageKey: 'heroBlueprintsTeam' },
      { id: 'pa-4', label: 'Site Check', imageKey: 'serviceConstruction' },
      { id: 'pa-5', label: 'Stamped', imageKey: 'heroChicagoSkyline' },
    ],
    'compliance-planning': [
      { id: 'cp-1', label: 'Compliance', imageKey: 'serviceCompliance' },
      { id: 'cp-2', label: 'Audit', imageKey: 'serviceZoningAnalysis' },
      { id: 'cp-3', label: 'Checklist', imageKey: 'servicePermits' },
      { id: 'cp-4', label: 'Inspection', imageKey: 'areaLincolnPark' },
      { id: 'cp-5', label: 'Standards', imageKey: 'heroBlueprintsTeam' },
    ],
    'community-engagement': [
      { id: 'ce-1', label: 'Stakeholders', imageKey: 'serviceCommunity' },
      { id: 'ce-2', label: 'Aldermanic', imageKey: 'heroBlueprintsTeam' },
      { id: 'ce-3', label: 'Ward Meeting', imageKey: 'areaLincolnPark' },
      { id: 'ce-4', label: 'City Council', imageKey: 'heroChicagoSkyline' },
      { id: 'ce-5', label: 'Hearing', imageKey: 'serviceUrbanPlanning' },
    ],
    'feasibility-studies': [
      { id: 'fs-1', label: 'Feasibility', imageKey: 'serviceFeasibility' },
      { id: 'fs-2', label: 'Site Selection', imageKey: 'serviceZoningAnalysis' },
      { id: 'fs-3', label: 'Envelope', imageKey: 'areaWestLoop' },
      { id: 'fs-4', label: 'FAR Calc', imageKey: 'heroBlueprintsTeam' },
      { id: 'fs-5', label: 'Skyline', imageKey: 'heroChicagoSkyline' },
    ],
    'urban-planning': [
      { id: 'up-1', label: 'Master Plan', imageKey: 'serviceUrbanPlanning' },
      { id: 'up-2', label: 'Transit TOD', imageKey: 'heroChicagoSkyline' },
      { id: 'up-3', label: 'Districts', imageKey: 'areaWestLoop' },
      { id: 'up-4', label: 'Public Space', imageKey: 'serviceCommunity' },
      { id: 'up-5', label: 'Elevation', imageKey: 'heroBlueprintsTeam' },
    ],
    'construction-design': [
      { id: 'cd-1', label: 'Integration', imageKey: 'serviceConstruction' },
      { id: 'cd-2', label: 'Structural', imageKey: 'heroBlueprintsTeam' },
      { id: 'cd-3', label: 'Site Review', imageKey: 'areaLincolnPark' },
      { id: 'cd-4', label: 'Architecture', imageKey: 'serviceUrbanPlanning' },
      { id: 'cd-5', label: 'Urban Grid', imageKey: 'heroChicagoSkyline' },
    ],
    'architectural-design-consultation': [
      { id: 'adc-1', label: 'Design', imageKey: 'heroBlueprintsTeam' },
      { id: 'adc-2', label: 'Site', imageKey: 'serviceConstruction' },
      { id: 'adc-3', label: 'Plans', imageKey: 'servicePermits' },
      { id: 'adc-4', label: '3D', imageKey: 'areaWestLoop' },
      { id: 'adc-5', label: 'Elevation', imageKey: 'heroChicagoSkyline' },
    ],
    'new-construction-planning': [
      { id: 'ncp-1', label: 'Site', imageKey: 'serviceConstruction' },
      { id: 'ncp-2', label: 'Structure', imageKey: 'heroBlueprintsTeam' },
      { id: 'ncp-3', label: 'Plans', imageKey: 'servicePermits' },
      { id: 'ncp-4', label: 'Street', imageKey: 'areaLincolnPark' },
      { id: 'ncp-5', label: 'Skyline', imageKey: 'heroChicagoSkyline' },
    ],
    'renovation-addition-consultation': [
      { id: 'rac-1', label: 'Renovation', imageKey: 'areaLincolnPark' },
      { id: 'rac-2', label: 'Footprint', imageKey: 'heroBlueprintsTeam' },
      { id: 'rac-3', label: 'Addition', imageKey: 'serviceConstruction' },
      { id: 'rac-4', label: 'DOB Plans', imageKey: 'servicePermits' },
      { id: 'rac-5', label: 'Facade', imageKey: 'heroChicagoSkyline' },
    ],
    'permit-drawings-plans': [
      { id: 'pdp-1', label: 'Drawings', imageKey: 'servicePermits' },
      { id: 'pdp-2', label: 'Blueprints', imageKey: 'heroBlueprintsTeam' },
      { id: 'pdp-3', label: 'DOB Stamp', imageKey: 'serviceCompliance' },
      { id: 'pdp-4', label: 'Structural', imageKey: 'serviceConstruction' },
      { id: 'pdp-5', label: 'Submissions', imageKey: 'heroChicagoSkyline' },
    ],
    '3d-visualization-film': [
      { id: 'tvf-1', label: '3D Render', imageKey: 'areaWestLoop' },
      { id: 'tvf-2', label: 'Visuals', imageKey: 'heroChicagoSkyline' },
      { id: 'tvf-3', label: 'Cinematic', imageKey: 'serviceConstruction' },
      { id: 'tvf-4', label: 'Lighting', imageKey: 'areaLincolnPark' },
      { id: 'tvf-5', label: 'Angles', imageKey: 'heroBlueprintsTeam' },
    ],
    'construction-project-management': [
      { id: 'cpm-1', label: 'Site Mgmt', imageKey: 'serviceConstruction' },
      { id: 'cpm-2', label: 'Milestones', imageKey: 'heroBlueprintsTeam' },
      { id: 'cpm-3', label: 'Inspections', imageKey: 'serviceCompliance' },
      { id: 'cpm-4', label: 'Contractors', imageKey: 'areaWestLoop' },
      { id: 'cpm-5', label: 'Delivery', imageKey: 'heroChicagoSkyline' },
    ],
  };

  export function getServiceGallery(service: ServiceItem): ServiceGalleryItem[] {
    if (service.gallery && service.gallery.length > 0) {
      return service.gallery;
    }
    if (DEFAULT_SERVICE_GALLERIES[service.id]) {
      return DEFAULT_SERVICE_GALLERIES[service.id];
    }
    return [
      { id: 'def-1', label: 'Analysis', imageKey: service.imageKey },
      { id: 'def-2', label: 'Maps', imageKey: 'heroBlueprintsTeam' },
      { id: 'def-3', label: 'Meeting', imageKey: 'serviceCommunity' },
      { id: 'def-4', label: 'Office', imageKey: 'areaLincolnPark' },
      { id: 'def-5', label: 'Urban', imageKey: 'heroChicagoSkyline' },
    ];
  }


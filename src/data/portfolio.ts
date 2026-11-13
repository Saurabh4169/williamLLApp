export interface ProjectGalleryItem {
  id: string;
  title: string;
  type: 'night' | 'day' | 'schematic' | 'site';
  imageKey: string;
}

export interface ProjectSpecs {
  zoningDistrict: string;
  units: string;
  far: string;
  timeline: string;
  constructionType: string;
  wardAlderman: string;
}

export interface VideoPresentation {
  title: string;
  duration: string;
  filmTitle: string;
  description: string;
  directorNote: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  address: string;
  category: 'Current' | 'Past';
  type: string;
  location: string;
  ward: string;
  zoningChange: string;
  statusText: string;
  timelineRange: string;
  imageKey: string;
  description: string;
  specs: ProjectSpecs;
  videoPresentation: VideoPresentation;
  gallery: ProjectGalleryItem[];
  metrics: {
    unitsOrSqFt: string;
    timeline: string;
    outcome: string;
  };
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // ==================== CURRENT PROJECTS (4 CARDS) ====================
  {
    id: 'proj-talman',
    name: '1508 N Talman Ave',
    address: '1508 N Talman Ave, Chicago, IL 60622',
    category: 'Current',
    type: 'Multi-Family Residential & ZBA Variance',
    location: 'Humboldt Park / West Town',
    ward: '26th Ward (Ald. Fuentes)',
    zoningChange: 'B3-2 to Residential Multi-Family with Front & Rear Setback Relief',
    statusText: 'IN PROGRESS',
    timelineRange: '2024 – 2026',
    imageKey: 'serviceConstruction',
    description: 'A contemporary 3-story multi-family residential development featuring private rooftop terraces, bespoke masonry, energy-efficient envelope, and expedited municipal zoning variance relief through the Chicago Zoning Board of Appeals (ZBA).',
    specs: {
      zoningDistrict: 'B3-2 District',
      units: '6 Luxury Units',
      far: '2.2 FAR',
      timeline: '2024 – 2026',
      constructionType: 'Masonry & Timber',
      wardAlderman: '26th Ward / Fuentes',
    },
    videoPresentation: {
      title: '1508 N Talman – Architectural Film Walkthrough',
      duration: '3:45 min',
      filmTitle: '1508 N Talman: Form & Urban Code',
      description: 'Step inside the full 3D architectural rendering and zoning design presentation for 1508 N Talman. Highlights include ZBA setback relief justifications, solar angle studies, and transit accessibility.',
      directorNote: 'Williams & Williams LLC Architectural Expediting Series.',
    },
    gallery: [
      { id: 'g1', title: 'Construction Progress', type: 'site', imageKey: 'serviceConstruction' },
      { id: 'g2', title: 'Street Elevation (Day)', type: 'day', imageKey: 'areaLincolnPark' },
      { id: 'g3', title: 'ZBA Cadastral Site Plan', type: 'schematic', imageKey: 'serviceZoningAnalysis' },
      { id: 'g4', title: 'Urban Context', type: 'night', imageKey: 'heroChicagoSkyline' },
    ],
    metrics: {
      unitsOrSqFt: '6 Luxury Units',
      timeline: '6 Weeks to ZBA Resolution',
      outcome: 'Unanimous ZBA Variance Granted',
    },
  },

  {
    id: 'proj-fulton',
    name: 'Fulton Market Innovation',
    address: '1020 W Fulton Market, Chicago, IL 60607',
    category: 'Current',
    type: 'Mixed-Use Commercial & Creative Office',
    location: 'West Loop / Fulton Market',
    ward: '27th Ward (Ald. Burnett)',
    zoningChange: 'C1-3 to DX-5 Map Amendment & FAR Bonus',
    statusText: 'IN PROGRESS',
    timelineRange: '2025 – 2027',
    imageKey: 'areaWestLoop',
    description: 'A 6-story mass timber and glass boutique development featuring ground floor culinary activation and creative office suites. Secured City Council zoning reclassification and FAR expansion.',
    specs: {
      zoningDistrict: 'DX-5 District',
      units: '78,000 SF Gross',
      far: '5.0 FAR',
      timeline: '2025 – 2027',
      constructionType: 'Mass Timber & Glass',
      wardAlderman: '27th Ward / Burnett',
    },
    videoPresentation: {
      title: 'Fulton Market Innovation Collective – Presentation Film',
      duration: '4:10 min',
      filmTitle: 'Fulton Market: The Next Generation of Workspace',
      description: 'Zoning map amendment presentation detailing pedestrian realm enhancements, FAR bonus contributions, and public transit connectivity.',
      directorNote: 'Williams & Williams Land Use Presentation.',
    },
    gallery: [
      { id: 'g1', title: 'Pedestrian Street Realm', type: 'day', imageKey: 'areaWestLoop' },
      { id: 'g2', title: 'Timber Structural Frame', type: 'site', imageKey: 'serviceConstruction' },
      { id: 'g3', title: 'DOB Approved Stamped Sheet', type: 'schematic', imageKey: 'serviceZoningAnalysis' },
      { id: 'g4', title: 'Skyline Skyline Context', type: 'night', imageKey: 'heroChicagoSkyline' },
    ],
    metrics: {
      unitsOrSqFt: '78,000 SF Commercial',
      timeline: '8 Months to Council Approval',
      outcome: '5.0 FAR Granted with Ground Activation',
    },
  },

  {
    id: 'proj-armitage',
    name: 'Armitage Brownstone Infill',
    address: '842 W Armitage Ave, Chicago, IL 60614',
    category: 'Current',
    type: 'Residential Multi-Unit Historic Infill',
    location: 'Lincoln Park Historic District',
    ward: '43rd Ward (Ald. Knudsen)',
    zoningChange: 'Rear Yard Setback Variance & Coach House ADU',
    statusText: 'IN PROGRESS',
    timelineRange: '2025 – 2026',
    imageKey: 'areaLincolnPark',
    description: 'Careful architectural enlargement of a landmarked Lincoln Park row house into four luxury residences plus an accessory dwelling unit with private rear court.',
    specs: {
      zoningDistrict: 'RM-5 District',
      units: '4 Units + ADU',
      far: '2.0 FAR',
      timeline: '2025 – 2026',
      constructionType: 'Limestone & Brick',
      wardAlderman: '43rd Ward / Knudsen',
    },
    videoPresentation: {
      title: 'Armitage Luxury Brownstone – Film Tour',
      duration: '3:00 min',
      filmTitle: 'Armitage Brownstone: Historic Preservation',
      description: 'ZBA hearing showcase demonstrating courtyard preservation, daylight compliance, and neighborhood historic character alignment.',
      directorNote: 'Williams & Williams Landmark Infill Series.',
    },
    gallery: [
      { id: 'g1', title: 'Historic Rowhouse Facade', type: 'day', imageKey: 'areaLincolnPark' },
      { id: 'g2', title: 'Structural Framing', type: 'site', imageKey: 'serviceConstruction' },
      { id: 'g3', title: 'Cadastral Plat Plan', type: 'schematic', imageKey: 'heroBlueprintsTeam' },
    ],
    metrics: {
      unitsOrSqFt: '4 Luxury Residences',
      timeline: '6 Weeks to Hearing Win',
      outcome: 'Full Landmark & ZBA Clearance',
    },
  },

  {
    id: 'proj-milwaukee',
    name: 'Milwaukee Transit Lofts',
    address: '2340 N Milwaukee Ave, Chicago, IL 60647',
    category: 'Current',
    type: 'Transit-Oriented Multi-Family',
    location: 'Logan Square / Blue Line',
    ward: '35th Ward (Ald. Ramirez-Rosa)',
    zoningChange: 'B3-2 to B3-3 TOD Re-zoning & 100% Parking Waiver',
    statusText: 'IN PROGRESS',
    timelineRange: '2024 – 2026',
    imageKey: 'serviceUrbanPlanning',
    description: '36-unit transit-served apartment building with zero on-site tenant automobile parking, fully integrated bike lounge, and 20% on-site affordable units under Chicago ARO rules.',
    specs: {
      zoningDistrict: 'B3-3 TOD',
      units: '36 Units',
      far: '3.0 FAR',
      timeline: '2024 – 2026',
      constructionType: 'Concrete & Steel',
      wardAlderman: '35th Ward / Ramirez-Rosa',
    },
    videoPresentation: {
      title: 'Milwaukee Transit Lofts – Urban Design Walkthrough',
      duration: '3:30 min',
      filmTitle: 'Connected Communities: The TOD Advantage',
      description: 'Entitlement featurette highlighting Chicago Connected Communities ordinance benefits and aldermanic approval strategy.',
      directorNote: 'Williams & Williams Transit Entitlements.',
    },
    gallery: [
      { id: 'g1', title: 'Transit Corridor Elevation', type: 'day', imageKey: 'serviceUrbanPlanning' },
      { id: 'g2', title: 'Foundation & Envelope', type: 'site', imageKey: 'serviceConstruction' },
      { id: 'g3', title: 'Architectural Blueprint', type: 'schematic', imageKey: 'heroBlueprintsTeam' },
    ],
    metrics: {
      unitsOrSqFt: '36 Residential Units',
      timeline: '10 Months Entitlement',
      outcome: '100% Parking Waiver Granted',
    },
  },

  // ==================== PAST PROJECTS (4 CARDS) ====================
  {
    id: 'proj-campbell',
    name: '1310 N Campbell Ave',
    address: '1310 N Campbell Ave, Chicago, IL 60622',
    category: 'Past',
    type: 'Boutique Multi-Family Residential Infill',
    location: 'West Town / Humboldt Park',
    ward: '1st Ward (Ald. La Spata)',
    zoningChange: 'RT-4 Multi-Unit Variance & Rear Yard Relief',
    statusText: 'COMPLETED',
    timelineRange: '2022 – 2025',
    imageKey: 'heroChicagoSkyline',
    description: 'Architectural residential infill completed in 2025. Highlights include custom limestone masonry, cantilevered steel rear balconies, perimeter accent illumination, and complete ZBA variance defense.',
    specs: {
      zoningDistrict: 'RT-4 District',
      units: '4 Luxury Condos',
      far: '1.65 FAR',
      timeline: '2022 – 2025',
      constructionType: 'Brick & Stone Masonry',
      wardAlderman: '1st Ward / La Spata',
    },
    videoPresentation: {
      title: '1310 N Campbell Ave – Completed Tour & Presentation',
      duration: '2:50 min',
      filmTitle: '1310 N Campbell: Master of Masonry & Light',
      description: 'Architectural cinematography tour of 1310 N Campbell Ave showcasing finished facade lighting, courtyard landscaping, and private garage structures.',
      directorNote: 'Completed presentation in film 2022–2025.',
    },
    gallery: [
      { id: 'g1', title: 'Night Architectural Facade', type: 'night', imageKey: 'heroChicagoSkyline' },
      { id: 'g2', title: 'Masonry Detailing', type: 'day', imageKey: 'areaLincolnPark' },
      { id: 'g3', title: 'Architectural Elevation Drawing', type: 'schematic', imageKey: 'heroBlueprintsTeam' },
    ],
    metrics: {
      unitsOrSqFt: '4 Dwelling Units',
      timeline: '5 Weeks to Hearing Approval',
      outcome: 'Full DOB Certificate of Occupancy',
    },
  },

  {
    id: 'proj-potomac',
    name: '2725 W Potomac Ave',
    address: '2725 W Potomac Ave, Chicago, IL 60622',
    category: 'Past',
    type: 'Multi-Unit Residential Transformation',
    location: 'Humboldt Park Historic Corridor',
    ward: '26th Ward (Ald. Fuentes)',
    zoningChange: 'RM-5 Multi-Unit District Density & Parking Relief',
    statusText: 'COMPLETED',
    timelineRange: '2018 – 2021',
    imageKey: 'serviceZoningAnalysis',
    description: 'Comprehensive zoning entitlement and architectural modern infill completed in 2021. Features dual upward accent spotlight arrays, private heated garage parking, and zero-defect municipal inspection clearances.',
    specs: {
      zoningDistrict: 'RM-5 District',
      units: '8 Residential Units',
      far: '2.0 FAR',
      timeline: '2018 – 2021',
      constructionType: 'Concrete & Glass',
      wardAlderman: '26th Ward / Fuentes',
    },
    videoPresentation: {
      title: '2725 W Potomac Ave – Architectural Film',
      duration: '3:15 min',
      filmTitle: '2725 W Potomac: Urban Density Done Right',
      description: 'Film presentation exploring the entitlement journey, community meetings, and finished architectural beauty of 2725 W Potomac Ave.',
      directorNote: 'Completed presentation in film 2018–2021.',
    },
    gallery: [
      { id: 'g1', title: 'Night Symmetrical Lighting', type: 'night', imageKey: 'serviceZoningAnalysis' },
      { id: 'g2', title: 'Exterior Daylight View', type: 'day', imageKey: 'areaWestLoop' },
      { id: 'g3', title: 'City Hall Council Resolution', type: 'schematic', imageKey: 'serviceCompliance' },
    ],
    metrics: {
      unitsOrSqFt: '8 Residential Units',
      timeline: 'Full Project Delivery 2018–2021',
      outcome: '100% On-Time Occupancy Clearance',
    },
  },

  {
    id: 'proj-bucktown',
    name: 'Bucktown Nordic Residence',
    address: '1942 N Wolcott Ave, Chicago, IL 60622',
    category: 'Past',
    type: 'Single-Family Custom Residence',
    location: 'Bucktown / Wicker Park',
    ward: '32nd Ward (Ald. Waguespack)',
    zoningChange: 'Rear Yard & Height Variation Defense',
    statusText: 'COMPLETED',
    timelineRange: '2021 – 2023',
    imageKey: 'heroBlueprintsTeam',
    description: 'Award-winning three-story contemporary home featuring double-height atrium and cantilevered rear terrace requiring complex municipal variance defense.',
    specs: {
      zoningDistrict: 'RS-3 District',
      units: '1 Custom Home (4,600 SF)',
      far: '1.2 FAR',
      timeline: '2021 – 2023',
      constructionType: 'Nordic Timber & Zinc',
      wardAlderman: '32nd Ward / Waguespack',
    },
    videoPresentation: {
      title: 'Bucktown Modern Nordic Residence – Walkthrough',
      duration: '2:30 min',
      filmTitle: 'Bucktown Nordic: Light, Steel, and Space',
      description: 'Full architectural featurette examining the interior atrium, rooftop deck, and ZBA rear yard justification.',
      directorNote: 'Williams & Williams Case Study Series.',
    },
    gallery: [
      { id: 'g1', title: 'Exterior Architectural View', type: 'day', imageKey: 'heroBlueprintsTeam' },
      { id: 'g2', title: 'Neighborhood Context', type: 'night', imageKey: 'heroChicagoSkyline' },
    ],
    metrics: {
      unitsOrSqFt: '4,600 SF Custom Home',
      timeline: '7 Weeks to Hearing Decision',
      outcome: 'Full Variance Relief Approved',
    },
  },

  {
    id: 'proj-hubbard',
    name: 'Hubbard Street Studios',
    address: '445 W Hubbard St, Chicago, IL 60654',
    category: 'Past',
    type: 'Commercial Creative Office & Adaptive Reuse',
    location: 'River North / Downtown Core',
    ward: '42nd Ward (Ald. Reilly)',
    zoningChange: 'DX-7 Landmark Façade Preservation Relief',
    statusText: 'COMPLETED',
    timelineRange: '2019 – 2022',
    imageKey: 'areaLoop',
    description: 'Historic limestone commercial façade restoration coupled with 4-story glass penthouse addition within Chicago downtown core boundaries.',
    specs: {
      zoningDistrict: 'DX-7 District',
      units: '45,000 SF Boutique Office',
      far: '7.0 FAR',
      timeline: '2019 – 2022',
      constructionType: 'Restored Limestone & Steel',
      wardAlderman: '42nd Ward / Reilly',
    },
    videoPresentation: {
      title: 'Hubbard Street Design Studios – Film Showcase',
      duration: '3:50 min',
      filmTitle: 'Hubbard Street: Preserving Heritage, Adding Light',
      description: 'Comprehensive documentary following the historic preservation approval through the Commission on Chicago Landmarks.',
      directorNote: 'Williams & Williams Heritage Restoration.',
    },
    gallery: [
      { id: 'g1', title: 'Restored Landmark Façade', type: 'day', imageKey: 'areaLoop' },
      { id: 'g2', title: 'Interior Glass Atrium', type: 'site', imageKey: 'serviceUrbanPlanning' },
    ],
    metrics: {
      unitsOrSqFt: '45,000 SF Commercial',
      timeline: '4 Months Plan Clearance',
      outcome: 'DOB Certificate of Occupancy',
    },
  },
];

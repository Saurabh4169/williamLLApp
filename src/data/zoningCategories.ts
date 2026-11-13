export interface ZoningCategory {
  id: string;
  name: string;
  shortCode: string;
  tagline: string;
  description: string;
  imageKey: string;
  districts: string[];
  typicalUses: string[];
  maxFAR: string;
}

export const ZONING_CATEGORIES: ZoningCategory[] = [
  {
    id: 'residential',
    name: 'Residential',
    shortCode: 'R (RS / RT / RM)',
    tagline: 'Single-family homes, multi-unit townhomes & apartment buildings.',
    description: 'Chicago residential districts regulate dwelling density, lot coverage, and front/rear yard setbacks. RS covers single-family detached homes, RT permits two-flats and townhomes, and RM governs mid-to-high density multi-unit apartments.',
    imageKey: 'zoningResidential',
    districts: ['RS-1 to RS-3', 'RT-3.5 to RT-4', 'RM-4.5 to RM-6.5'],
    typicalUses: ['Single-Family Homes', '2-Flat & 3-Flat Walk-Ups', 'Multi-Family Residential', 'ADUs (Accessory Dwellings)'],
    maxFAR: '0.90 to 5.0 (up to 6.6 with TOD bonus)',
  },
  {
    id: 'commercial',
    name: 'Commercial & Business',
    shortCode: 'B & C (B1 / B2 / B3 / C1 / C2)',
    tagline: 'Neighborhood storefronts, retail plazas, and commercial shopping corridors.',
    description: 'Business (B) districts support neighborhood shopping and personal service operations. Commercial (C) districts accommodate wider automobile-oriented services, dining, retail, and commercial entertainment facilities.',
    imageKey: 'zoningCommercial',
    districts: ['B1-1 to B1-5', 'B2-1 to B2-5', 'B3-1 to B3-5', 'C1-1 to C1-5'],
    typicalUses: ['Retail Stores', 'Restaurants & Cafes', 'Professional Offices', 'Upper-Floor Residential'],
    maxFAR: '1.2 to 5.0',
  },
  {
    id: 'industrial',
    name: 'Industrial & Manufacturing',
    shortCode: 'M & PMD',
    tagline: 'Manufacturing, logistics, warehousing, and creative maker spaces.',
    description: 'Manufacturing (M) and Planned Manufacturing Districts (PMD) protect Chicago’s industrial base, modern logistics, distribution nodes, and emerging maker/technology spaces from residential displacement.',
    imageKey: 'zoningIndustrial',
    districts: ['M1-1 to M1-3', 'M2-1 to M2-3', 'PMD 1 through 15'],
    typicalUses: ['Warehousing & Logistics', 'Advanced Manufacturing', 'Data Centers', 'Creative Maker Studios'],
    maxFAR: '1.2 to 2.2',
  },
  {
    id: 'mixed-use',
    name: 'Downtown Mixed-Use',
    shortCode: 'D (DX / DC / DS / DR)',
    tagline: 'High-density downtown cores blending residential, hospitality & retail.',
    description: 'Downtown districts are designed for Chicago’s central business core. DX is Downtown Mixed-Use, DC is Downtown Core, and DS is Downtown Service. These boast Chicago’s highest floor area allowances and transit connectivity.',
    imageKey: 'zoningMixedUse',
    districts: ['DX-3 to DX-16', 'DC-12 to DC-16', 'DR-3 to DR-10'],
    typicalUses: ['Skyscrapers & Mid-Rises', 'Flagship Retail', 'Hotels & Corporate HQs', 'Transit-Oriented Towers'],
    maxFAR: '3.0 to 16.0+ (Bonus FAR eligible)',
  },
  {
    id: 'agricultural',
    name: 'Agricultural & Open Space',
    shortCode: 'POS / Special',
    tagline: 'Parks, public open spaces, urban agriculture, and conservation.',
    description: 'Parks and Open Space (POS) zoning protects city parklands, lakefront recreation corridors, community gardens, and sustainable urban farming initiatives across Cook County and municipal Chicago.',
    imageKey: 'zoningAgricultural',
    districts: ['POS-1 to POS-4', 'Cook County Ag'],
    typicalUses: ['Public Parks & Playgrounds', 'Community Gardens', 'Urban Farming', 'Recreational Marinas'],
    maxFAR: '0.15 to 0.5',
  },
];


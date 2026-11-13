export interface ZoningLookupResult {
  address: string;
  pin: string;
  ward: string;
  alderman: string;
  zoningDistrict: string;
  districtName: string;
  allowedUses: string[];
  restrictedUses: string[];
  maxFAR: string;
  maxHeight: string;
  frontSetback: string;
  rearSetback: string;
  todEligible: boolean;
  notes: string;
}

export const MOCK_LOOKUP_DATABASE: Record<string, ZoningLookupResult> = {
  '10 s dearborn': {
    address: '10 S Dearborn St, Chicago, IL 60603',
    pin: '17-16-200-012-0000',
    ward: '42nd Ward',
    alderman: 'Ald. Brendan Reilly',
    zoningDistrict: 'DC-16',
    districtName: 'Downtown Core District',
    allowedUses: ['Office Commercial', 'High-Rise Residential', 'Retail & Dining', 'Hotel & Hospitality', 'Financial Services'],
    restrictedUses: ['Heavy Industrial', 'Drive-Through Facilities', 'Outdoor Auto Storage'],
    maxFAR: '16.0 (up to 24.0 with Neighborhood Opportunity Bonus)',
    maxHeight: 'No fixed height limit (governed by FAR & FAA flight paths)',
    frontSetback: '0 ft (property line build-to)',
    rearSetback: '0 ft / 30 ft above residential floor',
    todEligible: true,
    notes: 'Located directly above Monroe Blue Line CTA subway entrance. Eligible for complete parking requirement elimination.',
  },
  '2144 n damen': {
    address: '2144 N Damen Ave, Chicago, IL 60647',
    pin: '14-31-105-022-0000',
    ward: '32nd Ward',
    alderman: 'Ald. Scott Waguespack',
    zoningDistrict: 'RT-4',
    districtName: 'Residential Two-Flat, Townhome and Multi-Unit District',
    allowedUses: ['Single-Family Homes', 'Two-Flat Residences', 'Townhomes', 'Apartments (up to 3 units on standard 25x125 lot)', 'Home Occupations'],
    restrictedUses: ['Ground-floor Commercial Retail', 'Industrial Manufacturing', 'Auto Repair'],
    maxFAR: '1.2',
    maxHeight: '38 ft',
    frontSetback: 'Average of blockface (typically 12–15 ft)',
    rearSetback: '30 ft or 30% of lot depth',
    todEligible: true,
    notes: 'Within 500 ft of Damen Blue Line station. ADU (coach house / basement unit) pilot area eligible.',
  },
  '920 w fulton': {
    address: '920 W Fulton Market, Chicago, IL 60607',
    pin: '17-08-410-008-0000',
    ward: '27th Ward',
    alderman: 'Ald. Walter Burnett Jr.',
    zoningDistrict: 'DX-5',
    districtName: 'Downtown Mixed-Use District',
    allowedUses: ['Creative Office', 'Restaurant / Bar', 'Boutique Hotel', 'Residential Apartments (Special Use / Rezone)'],
    restrictedUses: ['Auto Dealerships', 'Heavy Warehousing'],
    maxFAR: '5.0 (expandable to 8.1 with FAR bonus payment)',
    maxHeight: 'Contextual review by DPD',
    frontSetback: '0 ft build-to line',
    rearSetback: '0 ft',
    todEligible: true,
    notes: 'Fulton-Randolph Historic Landmark District review required for exterior envelope alterations.',
  },
  '1850 n clark': {
    address: '1850 N Clark St, Chicago, IL 60614',
    pin: '14-33-210-004-0000',
    ward: '43rd Ward',
    alderman: 'Ald. Timmy Knudsen',
    zoningDistrict: 'B1-3',
    districtName: 'Neighborhood Shopping District',
    allowedUses: ['Retail Stores', 'Offices', 'Residential Above Ground Floor', 'Daycare Centers (Special Use required)'],
    restrictedUses: ['Drive-through Restaurants', 'Taverns without food service', 'Auto Repair'],
    maxFAR: '3.0',
    maxHeight: '45 ft',
    frontSetback: '0 ft',
    rearSetback: '30 ft above ground floor commercial',
    todEligible: false,
    notes: 'Adjacent to Lincoln Park perimeter. Lake Michigan Protection Ordinance exterior review applies.',
  },
};

export const DEFAULT_LOOKUP_RESULT: ZoningLookupResult = {
  address: '[PROPERTY ADDRESS] – Sample Chicago Location',
  pin: '14-20-300-019-0000',
  ward: 'Ward [WARD NUMBER]',
  alderman: 'Alderman [ALDERMAN NAME]',
  zoningDistrict: 'B3-2',
  districtName: 'Community Shopping District',
  allowedUses: ['Retail Stores', 'Bakeries & Cafes', 'Professional Offices', 'Upper-Floor Dwelling Units'],
  restrictedUses: ['Heavy Industrial Manufacturing', 'Outdoor Scrap Yards'],
  maxFAR: '2.2',
  maxHeight: '45 ft',
  frontSetback: '0 ft along commercial street',
  rearSetback: '30 ft behind residential floors',
  todEligible: true,
  notes: 'Informational analysis based on Chicago Municipal Code Title 17. Contact Williams & Williams for full certified zoning opinion.',
};

export function lookupChicagoAddress(query: string): ZoningLookupResult {
  const clean = query.trim().toLowerCase();
  for (const [key, val] of Object.entries(MOCK_LOOKUP_DATABASE)) {
    if (clean.includes(key) || key.includes(clean)) {
      return val;
    }
  }
  return {
    ...DEFAULT_LOOKUP_RESULT,
    address: query.trim() ? query.trim() : DEFAULT_LOOKUP_RESULT.address,
  };
}


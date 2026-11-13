export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Ordinance Reform' | 'City Council' | 'Hearing Alert' | 'Policy Guide';
  date: string;
  readTime: string;
  imageKey: string;
  summary: string;
  content: string[];
}

export const ZONING_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'connected-communities-ordinance-expansion',
    title: 'City Council Expands Connected Communities Ordinance',
    category: 'Ordinance Reform',
    date: 'Nov 02, 2026',
    readTime: '4 min read',
    imageKey: 'news1',
    summary: 'Key amendments to transit-served location rules widen parking reduction eligibility and increase permissible density near bus corridors.',
    content: [
      'The Chicago City Council has enacted major amendments expanding the geographic scope of the Connected Communities Ordinance.',
      'Developers pursuing residential and commercial infill near high-frequency CTA bus routes and additional Metra commuter stops can now seek 100% off-street parking mandate waivers without requiring custom aldermanic variances.',
      'Williams & Williams LLC is already guiding three residential developers in taking advantage of the updated Floor Area Ratio (FAR) bonuses made accessible by this landmark decision.',
    ],
  },
  {
    id: 'news-2',
    slug: '2026-affordable-requirements-ordinance-updates',
    title: 'Chicago ARO 2026: Updated Compliance Guidelines for Multi-Family',
    category: 'Policy Guide',
    date: 'Oct 24, 2026',
    readTime: '6 min read',
    imageKey: 'news2',
    summary: 'How recent in-lieu payment rate increases impact projects with 10 or more residential units undergoing zoning reclassification.',
    content: [
      'The Department of Housing (DOH) has published its adjusted in-lieu fee schedules for developers undergoing zoning map amendments that trigger the Affordable Requirements Ordinance (ARO).',
      'For projects located in Community Preservation Areas, the required percentage of on-site affordable units remains high, but new incentives allow combining off-site units within the same ward.',
      'Our strategic advisory helps developers model pro-formas to balance on-site inclusionary housing with municipal density bonuses.',
    ],
  },
  {
    id: 'news-3',
    slug: 'zba-virtual-and-in-person-hearing-procedures',
    title: 'Zoning Board of Appeals Updates Hearing Rules and Calendar',
    category: 'Hearing Alert',
    date: 'Oct 11, 2026',
    readTime: '3 min read',
    imageKey: 'news3',
    summary: 'New protocols for hybrid testimony and evidentiary submission timelines before the Chicago ZBA.',
    content: [
      'The Chicago Zoning Board of Appeals (ZBA) has implemented updated procedural rules for public hearings at City Hall.',
      'All written witness statements and architectural presentation exhibits must now be logged into the city portal a minimum of 10 business days prior to the calendar hearing date.',
      'Williams & Williams manages all witness registrations and exhibit pre-filings to safeguard against procedural continuances.',
    ],
  },
  {
    id: 'news-4',
    slug: 'downtown-commercial-to-residential-conversion-incentives',
    title: 'Expedited Review for Downtown Commercial-to-Residential Conversions',
    category: 'City Council',
    date: 'Sep 29, 2026',
    readTime: '5 min read',
    imageKey: 'news4',
    summary: 'City Hall establishes a fast-track task force to repurpose obsolete LaSalle Street and Loop office floors into vibrant housing.',
    content: [
      'In a bid to revitalize the Loop central business core, the Department of Planning and Development (DPD) has established a specialized review team dedicated to office-to-residential adaptive conversions.',
      'Qualifying buildings in DC and DX zoning districts benefit from expedited plan examination and flexible light-and-ventilation variance pathways.',
    ],
  },
];


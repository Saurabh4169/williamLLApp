export interface Testimonial {
  id: string;
  name: string;
  role: string;
  neighbourhood: string;
  service: string;
  rating: number;
  text: string;
  date: string;
  avatarUrl?: string;
  verified: boolean;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'review-1',
    name: 'Sarah M. Jenkins [CLIENT PLACEHOLDER]',
    role: 'Real Estate Developer',
    neighbourhood: 'West Loop',
    service: 'Zoning Appeal',
    rating: 5,
    text: '[PLACEHOLDER REVIEW] Williams & Williams LLC guided our 18-unit residential development through an intricate Chicago Zoning Board of Appeals variance process without missing a beat. Their knowledge of Cook County and City Hall protocols saved us months of costly holding time. Truly exceptional advocacy from start to finish.',
    date: 'Oct 14, 2026',
    verified: true,
  },
  {
    id: 'review-2',
    name: 'David L. Chen [CLIENT PLACEHOLDER]',
    role: 'Commercial Architect',
    neighbourhood: 'The Loop',
    service: 'Permit Expediting',
    rating: 5,
    text: '[PLACEHOLDER REVIEW] As commercial architects, having Williams & Williams review our schematics before submitting to the Chicago Department of Buildings eliminates the endless cycle of plan examiner corrections. They are knowledgeable, responsive, and indispensable for major downtown adaptive-reuse projects.',
    date: 'Nov 02, 2026',
    verified: true,
  },
  {
    id: 'review-3',
    name: 'Robert & Elena Vance [CLIENT PLACEHOLDER]',
    role: 'Homeowners',
    neighbourhood: 'Lincoln Park',
    service: 'ZBA Variance',
    rating: 5,
    text: '[PLACEHOLDER REVIEW] We were facing an initial zoning denial for our rear yard addition in Lincoln Park. Williams & Williams represented us at City Hall, addressed neighbor questions proactively, and won our appeal unanimously before the ZBA board. Dedicated and experienced professionals.',
    date: 'Sep 28, 2026',
    verified: true,
  },
  {
    id: 'review-4',
    name: 'Marcus K. Thornton [CLIENT PLACEHOLDER]',
    role: 'General Contractor',
    neighbourhood: 'Fulton Market',
    service: 'Feasibility Audit',
    rating: 5,
    text: '[PLACEHOLDER REVIEW] The feasibility analysis they provided before our land purchase revealed a crucial setback exception and FAR bonus under Connected Communities that we would have otherwise missed. Highly recommended for any serious Chicago builder or investor.',
    date: 'Aug 19, 2026',
    verified: true,
  },
  {
    id: 'review-5',
    name: 'Elena Rostova [CLIENT PLACEHOLDER]',
    role: 'Multi-Family Property Owner',
    neighbourhood: 'Hyde Park',
    service: 'Zoning Analysis',
    rating: 5,
    text: '[PLACEHOLDER REVIEW] Navigating Chicago zoning ordinances for our multi-family conversion seemed overwhelming until we retained Williams & Williams LLC. Their comprehensive zoning audit laid out every legal avenue with complete clarity. They delivered on every single milestone.',
    date: 'Nov 08, 2026',
    verified: true,
  },
];

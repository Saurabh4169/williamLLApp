// Central Image Registry for Williams & Williams LLC – Zoning Solutions
// All images are imported here. To replace any image across the entire app,
// simply change the path or image reference here.

import heroChicagoSkyline from '../assets/images/hero-chicago-skyline.jpg';
import heroBlueprintsTeam from '../assets/images/hero-blueprints-team.jpg';

import serviceZoningAnalysis from '../assets/images/service-zoning-analysis.jpg';
import serviceAppealsHearing from '../assets/images/service-appeals-hearing.jpg';
import servicePermits from '../assets/images/service-permits.svg';
import serviceFeasibility from '../assets/images/service-feasibility.svg';
import serviceUrbanPlanning from '../assets/images/service-urban-planning.jpg';
import serviceCompliance from '../assets/images/service-compliance.jpg';
import serviceCommunity from '../assets/images/service-community.jpg';
import serviceConstruction from '../assets/images/service-construction.jpg';

import areaLoop from '../assets/images/area-loop.jpg';
import areaLincolnPark from '../assets/images/area-lincoln-park.jpg';
import areaWestLoop from '../assets/images/area-west-loop.jpg';
import areaHydePark from '../assets/images/area-hyde-park.svg';

import zoningResidential from '../assets/images/zoning-residential.svg';
import zoningCommercial from '../assets/images/zoning-commercial.svg';
import zoningIndustrial from '../assets/images/zoning-industrial.svg';
import zoningMixedUse from '../assets/images/zoning-mixed-use.svg';
import zoningAgricultural from '../assets/images/zoning-agricultural.svg';

import news1 from '../assets/images/news-1.svg';
import news2 from '../assets/images/news-2.svg';
import news3 from '../assets/images/news-3.svg';
import news4 from '../assets/images/news-4.svg';

import portfolioCurrent1 from '../assets/images/portfolio-current-1.svg';
import portfolioCurrent2 from '../assets/images/portfolio-current-2.svg';
import portfolioCurrent3 from '../assets/images/portfolio-current-3.svg';
import portfolioPast1 from '../assets/images/portfolio-past-1.svg';
import portfolioPast2 from '../assets/images/portfolio-past-2.svg';
import portfolioPast3 from '../assets/images/portfolio-past-3.svg';

import aboutFounder from '../assets/images/about-founder.svg';

import onboarding1 from '../assets/images/onboarding-1.jpg';
import onboarding2 from '../assets/images/onboarding-2.jpg';
import onboarding3 from '../assets/images/onboarding-3.jpg';

import avatar1 from '../assets/images/avatar-1.svg';
import avatar2 from '../assets/images/avatar-2.svg';
import avatar3 from '../assets/images/avatar-3.svg';
import avatar4 from '../assets/images/avatar-4.svg';

import appIcon from '../assets/images/app-icon.svg';

export interface ImageAsset {
  src: string;
  alt: string;
  category?: string;
  blurColor?: string;
}

export const APP_IMAGES: Record<string, ImageAsset> = {
  // Heroes & Branding
  heroChicagoSkyline: {
    src: heroChicagoSkyline,
    alt: 'Chicago skyline at twilight overlooking Lake Michigan with glowing architectural towers',
    blurColor: '#1F2A44',
  },
  heroBlueprintsTeam: {
    src: heroBlueprintsTeam,
    alt: 'Williams & Williams zoning consultants reviewing Chicago architectural blueprints and site maps',
    blurColor: '#3D4D7C',
  },
  appIcon: {
    src: appIcon,
    alt: 'Williams & Williams LLC triangular architectural monogram icon',
    blurColor: '#B7C3DA',
  },

  // Onboarding Slides
  onboarding1: {
    src: onboarding1,
    alt: 'Chicago aerial view representing navigation of complex municipal zoning laws with ease',
    blurColor: '#1F2A44',
  },
  onboarding2: {
    src: onboarding2,
    alt: 'Zoning consultant tracking building permits and appeals on a modern tablet',
    blurColor: '#3D4D7C',
  },
  onboarding3: {
    src: onboarding3,
    alt: 'Client consultation with experienced Chicago zoning specialist',
    blurColor: '#2B3859',
  },

  // Services
  serviceZoningAnalysis: {
    src: serviceZoningAnalysis,
    alt: 'Urban zoning analysis with GIS cadastral overlay maps and zoning code books',
    blurColor: '#1F2A44',
  },
  serviceAppealsHearing: {
    src: serviceAppealsHearing,
    alt: 'Chicago Zoning Board of Appeals municipal hearing presentation',
    blurColor: '#1F2A44',
  },
  servicePermits: {
    src: servicePermits,
    alt: 'City of Chicago building permit documentation and stamped zoning approvals',
    blurColor: '#3D4D7C',
  },
  serviceFeasibility: {
    src: serviceFeasibility,
    alt: 'Land-use development site feasibility and FAR setback evaluation',
    blurColor: '#1F2A44',
  },
  serviceUrbanPlanning: {
    src: serviceUrbanPlanning,
    alt: 'Transit-oriented mixed-use urban planning in Chicago neighborhood',
    blurColor: '#2B3859',
  },
  serviceCompliance: {
    src: serviceCompliance,
    alt: 'Zoning code compliance audit checklist and municipal ordinance inspection',
    blurColor: '#1F2A44',
  },
  serviceCommunity: {
    src: serviceCommunity,
    alt: 'Community engagement meeting presenting architectural site model to neighborhood stakeholders',
    blurColor: '#3D4D7C',
  },
  serviceConstruction: {
    src: serviceConstruction,
    alt: 'Modern residential and commercial construction in Chicago West Loop',
    blurColor: '#1F2A44',
  },

  // Popular Neighborhoods
  areaLoop: {
    src: areaLoop,
    alt: 'Chicago Loop downtown commercial and business zoning district',
    blurColor: '#1F2A44',
  },
  areaLincolnPark: {
    src: areaLincolnPark,
    alt: 'Lincoln Park historic residential neighborhood zoning district',
    blurColor: '#3D4D7C',
  },
  areaWestLoop: {
    src: areaWestLoop,
    alt: 'West Loop Fulton Market mixed-use commercial and residential district',
    blurColor: '#2B3859',
  },
  areaHydePark: {
    src: areaHydePark,
    alt: 'Hyde Park academic, cultural and residential zoning district',
    blurColor: '#1F2A44',
  },

  // Zoning Districts
  zoningResidential: {
    src: zoningResidential,
    alt: 'Residential Zoning Districts (RS, RT, RM) in Chicago',
    blurColor: '#3D4D7C',
  },
  zoningCommercial: {
    src: zoningCommercial,
    alt: 'Commercial and Business Zoning Districts (B, C) in Chicago',
    blurColor: '#1F2A44',
  },
  zoningIndustrial: {
    src: zoningIndustrial,
    alt: 'Industrial and Planned Manufacturing Districts (M, PMD) in Chicago',
    blurColor: '#2B3859',
  },
  zoningMixedUse: {
    src: zoningMixedUse,
    alt: 'Downtown and Mixed-Use Districts (DX, DC, DS) in Chicago',
    blurColor: '#3D4D7C',
  },
  zoningAgricultural: {
    src: zoningAgricultural,
    alt: 'Agricultural and Open Space Parks (POS) in Illinois',
    blurColor: '#1F2A44',
  },

  // Portfolio Current
  portfolioCurrent1: {
    src: portfolioCurrent1,
    alt: 'Fulton Market Boutique Mixed-Use Development (In Progress)',
    blurColor: '#1F2A44',
  },
  portfolioCurrent2: {
    src: portfolioCurrent2,
    alt: 'Lincoln Park Luxury Multi-Unit Residential Addition (In Progress)',
    blurColor: '#3D4D7C',
  },
  portfolioCurrent3: {
    src: portfolioCurrent3,
    alt: 'Logan Square Transit-Oriented Development (In Progress)',
    blurColor: '#2B3859',
  },

  // Portfolio Past
  portfolioPast1: {
    src: portfolioPast1,
    alt: 'Bucktown Modern Residence with Rear Yard Variance Approval',
    blurColor: '#1F2A44',
  },
  portfolioPast2: {
    src: portfolioPast2,
    alt: 'West Loop Creative Office Adaptive Reuse Transformation',
    blurColor: '#3D4D7C',
  },
  portfolioPast3: {
    src: portfolioPast3,
    alt: 'River North Boutique Hospitality Development',
    blurColor: '#2B3859',
  },

  // Editorial & News
  news1: {
    src: news1,
    alt: 'Chicago City Council Connected Communities Ordinance Expansion',
    blurColor: '#1F2A44',
  },
  news2: {
    src: news2,
    alt: '2026 Chicago Affordable Requirements Ordinance (ARO) Rule Revisions',
    blurColor: '#3D4D7C',
  },
  news3: {
    src: news3,
    alt: 'Zoning Board of Appeals Virtual & In-Person Hearing Procedures',
    blurColor: '#2B3859',
  },
  news4: {
    src: news4,
    alt: 'Downtown Commercial to Residential Conversion Expedited Program',
    blurColor: '#1F2A44',
  },

  // Team & Testimonials
  aboutFounder: {
    src: aboutFounder,
    alt: 'Williams & Williams LLC Principal Zoning Consultant portrait [Placeholder]',
    blurColor: '#1F2A44',
  },
  avatar1: {
    src: avatar1,
    alt: 'Client avatar: Chicago residential property developer [Placeholder]',
    blurColor: '#3D4D7C',
  },
  avatar2: {
    src: avatar2,
    alt: 'Client avatar: Commercial architect and project director [Placeholder]',
    blurColor: '#1F2A44',
  },
  avatar3: {
    src: avatar3,
    alt: 'Client avatar: Single-family homeowner with variance victory [Placeholder]',
    blurColor: '#2B3859',
  },
  avatar4: {
    src: avatar4,
    alt: 'Client avatar: General contractor partner [Placeholder]',
    blurColor: '#3D4D7C',
  },
};

export default APP_IMAGES;


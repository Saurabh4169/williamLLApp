export interface PopularArea {
  id: string;
  name: string;
  neighborhood: string;
  districtCode: string;
  imageKey: string;
  description: string;
  keyZoningTypes: string[];
  activeProjectsCount: number;
}

export const POPULAR_AREAS: PopularArea[] = [
  {
    id: 'area-loop',
    name: 'The Loop',
    neighborhood: 'Downtown Central Business District',
    districtCode: 'DC / DX-16',
    imageKey: 'areaLoop',
    description: 'High-density commercial, institutional, and high-rise residential conversions with maximum FAR allowances.',
    keyZoningTypes: ['DC-16', 'DX-16', 'DR-10'],
    activeProjectsCount: 14,
  },
  {
    id: 'area-lincoln-park',
    name: 'Lincoln Park',
    neighborhood: 'North Side Historic Residential',
    districtCode: 'RM-5 / RT-4 / B1-3',
    imageKey: 'areaLincolnPark',
    description: 'Premier residential district featuring historic brownstones, strict landmark preservation, and boutique retail corridors.',
    keyZoningTypes: ['RM-5', 'RT-4', 'B3-2'],
    activeProjectsCount: 22,
  },
  {
    id: 'area-west-loop',
    name: 'West Loop',
    neighborhood: 'Fulton Market Innovation District',
    districtCode: 'DX-5 / DX-7',
    imageKey: 'areaWestLoop',
    description: 'Rapidly transforming mixed-use hub with adaptive reuse warehouses, high-tech offices, and luxury mid-rises.',
    keyZoningTypes: ['DX-5', 'DX-7', 'C1-3'],
    activeProjectsCount: 31,
  },
  {
    id: 'area-hyde-park',
    name: 'Hyde Park',
    neighborhood: 'South Side Cultural & Academic',
    districtCode: 'RM-5 / B3-2',
    imageKey: 'areaHydePark',
    description: 'Historic architectural enclave around UChicago with transit-served infill developments and lakefront zoning protections.',
    keyZoningTypes: ['RM-5', 'B1-2', 'POS-1'],
    activeProjectsCount: 9,
  },
];


import {
  Building2,
  Cable,
  Factory,
  HardHat,
  RadioTower,
  Route,
  type LucideIcon,
} from 'lucide-react';

export const licenseFacts = [
  { label: 'License', value: '15-GSL No. 001485-1' },
  { label: 'Issued', value: '26.03.2024' },
  { label: 'Primary issue', value: '13.10.2009' },
  { label: 'Category', value: 'II' },
  { label: 'BIN', value: '090340019007' },
  { label: 'Registered office', value: 'Astana, Qabanbay Batyr Ave. 51/52' },
];

export const licensedScopes: Array<{
  icon: LucideIcon;
  title: string;
  summary: string;
  items: string[];
}> = [
  {
    icon: Cable,
    title: 'Engineering Networks',
    summary: 'Capital repair and reconstruction of core utility systems.',
    items: [
      'Cold and hot water supply, heat supply, sewer and stormwater systems',
      'Internal plumbing, heating and sewerage systems',
      'Power supply, exterior lighting, interior lighting and electric heating',
      'High, medium and low pressure gas supply systems',
    ],
  },
  {
    icon: Route,
    title: 'Roads, Railways and Airfields',
    summary: 'Transport infrastructure works from local streets to higher category roads.',
    items: [
      'Road bases, surfacing, protection structures and road equipment',
      'Roads of I to V technical category and city arterial streets',
      'Runway, aerodrome and helipad bases and coverings',
      'Railway track bases and superstructures',
    ],
  },
  {
    icon: Factory,
    title: 'Equipment and Commissioning',
    summary: 'Technological equipment installation and startup works.',
    items: [
      'Theater, educational and sports facilities',
      'Life-support control, alarm, blocking and metering systems',
      'Hydrotechnical and land reclamation structures',
      'Production lines for construction materials and structures',
    ],
  },
  {
    icon: HardHat,
    title: 'Ground and Foundation Works',
    summary: 'Specialized works in soils and base preparation.',
    items: [
      'Drilling works in soil',
      'Foundation and base construction',
      'Underwater technical works and offshore shelf works',
      'Mine and tunnel works, anti-filtration curtains',
    ],
  },
  {
    icon: Building2,
    title: 'Load-Bearing Structures',
    summary: 'Building frames, envelopes and civil structures.',
    items: [
      'Monolithic, precast concrete and reinforced concrete structures',
      'Masonry walls, partitions, openings and roofing works',
      'Metal structures, tower and mast structures, chimneys and silos',
      'Bridge, overpass, tunnel and other artificial structures',
    ],
  },
  {
    icon: RadioTower,
    title: 'Linear and Industrial Facilities',
    summary: 'Special construction and installation for networked infrastructure.',
    items: [
      'Transmission lines up to 35 kV, up to 110 kV and above',
      'National and international communication lines',
      'Steel reservoirs, pressure vessels and hazardous storage tanks',
      'Field and main oil, gas and petroleum product pipelines',
    ],
  },
];

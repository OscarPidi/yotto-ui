import benetti from './assets/brand-benetti.png'
import azimut from './assets/brand-azimut.png'
import princess from './assets/brand-princess.png'
import oasisPhoto from './assets/boat-oasis.png'
import megallanoPhoto from './assets/boat-megallano.png'
import legendPhoto from './assets/boat-legend.png'

/** One label/value row in the "General Information" tabs (Figma: Yotto-Designs › Tabs Content 117:790). */
export interface BoatSpec {
  label: string
  value: string
}

/**
 * Sample boats for the Home and Boat detail screens (Figma: Yotto-Designs). Replace with API data.
 * Engine, GPS radar and the tab specs are placeholder values — Figma only shows one example set.
 */
export interface Boat {
  id: string
  name: string
  brand: string
  brandLogo: string
  photo: string
  length: string
  guests: string
  description: string
  price: string
  engineType: string
  gpsRadar: boolean
  layout: BoatSpec[]
  performance: BoatSpec[]
  anatomy: BoatSpec[]
}

export const sampleBoats: Boat[] = [
  {
    id: 'oasis',
    name: 'Oasis 42M',
    brand: 'Benetti',
    brandLogo: benetti,
    photo: oasisPhoto,
    length: '42.5 M / 139’ 5’’',
    guests: '10 Person, 5 Cabins',
    description: 'Full-beam sun deck, helm station, wet bar, integrated sunpads, premium audio suite.',
    price: '$890,000',
    engineType: 'Twin MTU diesel, inboard',
    gpsRadar: true,
    layout: [
      { label: 'Guest Capacity', value: '10' },
      { label: 'Master Cabins', value: '5' },
      { label: 'Flybridge', value: 'Full-beam sun deck, helm station, wet bar, integrated sunpads, premium audio suite.' },
    ],
    performance: [
      { label: 'Engine Output', value: '2 × 2,600 HP' },
      { label: 'Max Speed', value: '17 KNOTS' },
      { label: 'Cruising Range', value: '3,500 NM' },
    ],
    anatomy: [
      { label: 'LOA', value: '139.4 FT / 42.5 M' },
      { label: 'Beam', value: '29.5 FT / 9 M' },
      { label: 'Draft', value: '7.5 FT / 2.3 M' },
      { label: 'Displacement', value: '450,000 LBS' },
    ],
  },
  {
    id: 'megallano',
    name: 'Megallano 27M',
    brand: 'Azimut',
    brandLogo: azimut,
    photo: megallanoPhoto,
    length: '26,2 M (85’ 11”)',
    guests: '5 People, 2 Crew',
    description: 'A sculptural design approach, a deep fascination with wood in all its forms.',
    price: '$950,000',
    engineType: 'Twin Volvo Penta IPS, pod drive',
    gpsRadar: true,
    layout: [
      { label: 'Guest Capacity', value: '12' },
      { label: 'Master Cabins', value: '4' },
      { label: 'Flybridge', value: 'Full-beam sun deck, helm station, wet bar, integrated sunpads, premium audio suite.' },
    ],
    performance: [
      { label: 'Engine Output', value: '2 × 1,800 HP' },
      { label: 'Max Speed', value: '38 KNOTS' },
      { label: 'Cruising Range', value: '520 NM' },
    ],
    anatomy: [
      { label: 'LOA', value: '76.2 FT / 23.2 M' },
      { label: 'Beam', value: '20.4 FT / 6.2 M' },
      { label: 'Draft', value: '4.8 FT / 1.46 M' },
      { label: 'Displacement', value: '72,000 LBS' },
    ],
  },
  {
    id: 'legend',
    name: 'Legend / 28L',
    brand: 'Princess',
    brandLogo: princess,
    photo: legendPhoto,
    length: '42.5 M / 139’ 5’’',
    guests: '10 Person, 5 Cabins',
    description: 'Full-beam sun deck, helm station, wet bar, integrated sunpads, premium audio suite.',
    price: '$1’120,000',
    engineType: 'Twin outboard, gasoline',
    gpsRadar: false,
    layout: [
      { label: 'Guest Capacity', value: '10' },
      { label: 'Master Cabins', value: '5' },
      { label: 'Flybridge', value: 'Open flybridge with dinette, wet bar and sunpads.' },
    ],
    performance: [
      { label: 'Engine Output', value: '2 × 600 HP' },
      { label: 'Max Speed', value: '45 KNOTS' },
      { label: 'Cruising Range', value: '300 NM' },
    ],
    anatomy: [
      { label: 'LOA', value: '91.9 FT / 28 M' },
      { label: 'Beam', value: '21.3 FT / 6.5 M' },
      { label: 'Draft', value: '5.2 FT / 1.6 M' },
      { label: 'Displacement', value: '95,000 LBS' },
    ],
  },
]

import benetti from './assets/brand-benetti.png'
import azimut from './assets/brand-azimut.png'
import princess from './assets/brand-princess.png'
import oasisPhoto from './assets/boat-oasis.png'
import megallanoPhoto from './assets/boat-megallano.png'
import legendPhoto from './assets/boat-legend.png'

/** Sample boats for the Home screen (Figma: Yotto-Designs › Home Screen). Replace with API data. */
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
  },
]

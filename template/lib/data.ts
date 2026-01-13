export interface Experience {
  id: number
  title: string
  description: string
  longDescription: string
  price: number
  duration: string
  location: string
  maxGuests: number
  image: string
  rating: number
  reviewCount: number
  hostName: string
  hostImage: string
  category: string
  highlights: string[]
  included: string[]
}

export const experiences: Experience[] = [
  {
    id: 1,
    title: 'Tour Gastronomico',
    description: 'Esplora i sapori locali con una guida esperta',
    longDescription:
      'Un viaggio sensoriale attraverso i mercati storici e le botteghe artigiane della città. Assaggeremo prodotti tipici, dai formaggi ai salumi, finendo con un dolce della tradizione. Perfetto per chi vuole capire la cultura locale attraverso il cibo.',
    price: 45,
    duration: '3 ore',
    location: 'Centro Storico',
    maxGuests: 8,
    image: '/modern-italian-apartment-interior.jpg',
    rating: 4.9,
    reviewCount: 124,
    hostName: 'Marco',
    hostImage: '/placeholder-user.jpg',
    category: 'Cibo e bevande',
    highlights: [
      'Degustazione di 5 prodotti locali',
      'Visita al mercato storico',
      'Guida locale esperta',
    ],
    included: ['Cibo', 'Bevande', 'Guida'],
  },
  {
    id: 2,
    title: 'Lezione di Cucina',
    description: 'Impara a cucinare come un locale',
    longDescription:
      'Mettiamo le mani in pasta! Imparerai a preparare due tipi di pasta fresca e il tiramisù originale seguendo le ricette della nonna. Alla fine, pranzeremo tutti insieme con quanto preparato, accompagnato da ottimo vino locale.',
    price: 65,
    duration: '4 ore',
    location: 'Cucina di Casa Immaginaria',
    maxGuests: 4,
    image: '/modern-italian-apartment-interior.jpg',
    rating: 5.0,
    reviewCount: 89,
    hostName: 'Giulia',
    hostImage: '/placeholder-user.jpg',
    category: 'Cucina',
    highlights: [
      'Preparazione pasta fresca',
      'Pranzo incluso',
      'Ricettario in omaggio',
    ],
    included: ['Ingredienti', 'Grembiule', 'Pranzo', 'Vino'],
  },
  {
    id: 3,
    title: 'Tour della Città',
    description: 'Scopri i luoghi nascosti',
    longDescription:
      'Dimentica le solite guide turistiche. Ti porterò a scoprire angoli segreti, street art e cortili nascosti che solo i locali conoscono. Un tour fotografico e narrativo per vedere la città con occhi diversi.',
    price: 30,
    duration: '2.5 ore',
    location: 'Quartieri vari',
    maxGuests: 10,
    image: '/modern-italian-apartment-interior.jpg',
    rating: 4.8,
    reviewCount: 56,
    hostName: 'Luca',
    hostImage: '/placeholder-user.jpg',
    category: 'Arte e cultura',
    highlights: [
      'Luoghi non turistici',
      'Aneddoti storici',
      'Consigli fotografici',
    ],
    included: ['Mappa personalizzata', 'Caffè'],
  },
]

export interface Service {
  id: number
  title: string
  description: string
  longDescription: string
  price: number
  duration: string
  location?: string // Optional for in-room services
  maxGuests?: number // Optional, defaults to unlimited or specific logic
  image: string
  rating: number
  reviewCount: number
  category: string
  highlights: string[]
  included: string[]
}

export const services: Service[] = [
  {
    id: 1,
    title: 'Massaggio Relax',
    description: 'Trattamenti benessere in camera',
    longDescription:
      'Concediti un momento di puro relax senza uscire dalla tua stanza. Un massaggiatore professionista verrà direttamente da te con tutto il necessario (lettino, oli, musica) per un massaggio rilassante di 60 minuti.',
    price: 80,
    duration: '60 min',
    location: 'In camera',
    maxGuests: 2,
    image: '/modern-italian-apartment-interior.jpg', // Placeholder
    rating: 4.9,
    reviewCount: 42,
    category: 'Benessere',
    highlights: [
      'Servizio in camera',
      'Professionista certificato',
      'Oli essenziali bio',
    ],
    included: ['Massaggio 60 min', 'Oli', 'Musica relax'],
  },
  {
    id: 2,
    title: 'Transfer Aeroporto',
    description: 'Comodo servizio navetta',
    longDescription:
      'Dimentica lo stress dei mezzi pubblici o la ricerca di un taxi. Il nostro autista ti aspetterà agli arrivi con un cartello con il tuo nome e ti porterà direttamente a Casa Immaginaria (o viceversa).',
    price: 50,
    duration: '45 min',
    maxGuests: 4,
    image: '/modern-italian-apartment-interior.jpg', // Placeholder
    rating: 5.0,
    reviewCount: 115,
    category: 'Trasporti',
    highlights: ['Autista privato', 'Auto premium', 'Nessuna attesa'],
    included: ['Viaggio sola andata', 'Bagagli inclusi', 'Acqua a bordo'],
  },
  {
    id: 3,
    title: 'Colazione Premium',
    description: 'Prodotti locali selezionati',
    longDescription:
      "Inizia la giornata al meglio con una box colazione consegnata alla tua porta. Include prodotti freschi di pasticceria locale, succo d'arancia appena spremuto, yogurt artigianale e frutta di stagione.",
    price: 15,
    duration: 'Consegna ore 8-10',
    maxGuests: 10,
    image: '/modern-italian-apartment-interior.jpg', // Placeholder
    rating: 4.7,
    reviewCount: 68,
    category: 'Cibo',
    highlights: [
      'Prodotti freschi',
      'Consegna alla porta',
      'Opzioni gluten-free',
    ],
    included: ['Box colazione', 'Consegna'],
  },
]

export interface RoofBox {
  id: number;
  slug: string;
  title: string;
  size: string;
  capacity: string;
  price: string;
  pricePerDay: number;
  image: string;
  images: string[];
  brand: string;
  weight: string;
  dimensions: string;
  maxLoad: string;
  opening: string;
  lockType: string;
  color: string;
  isPopular: boolean;
  description: string;
  deposit: number;
  features: string[];
  included: string[];
}

export const roofBoxes: RoofBox[] = [
  {
    id: 1,
    slug: 'kompaktni-kovcek',
    title: 'Kompaktni Kovček',
    size: '320L',
    capacity: 'Idealno za vikend izlete',
    price: '15€ / dan',
    pricePerDay: 15,
    image: 'https://placehold.co/800x600/3d6b1f/f5f5f0?text=320L+Kompaktni&font=montserrat',
    images: [
      'https://placehold.co/800x600/3d6b1f/f5f5f0?text=320L+Pogled+1&font=montserrat',
      'https://placehold.co/800x600/4a7c2a/f5f5f0?text=320L+Pogled+2&font=montserrat',
      'https://placehold.co/800x600/2d5016/f5f5f0?text=320L+Pogled+3&font=montserrat',
      'https://placehold.co/800x600/5a8c3a/f5f5f0?text=320L+Detajl&font=montserrat',
    ],
    brand: 'Thule',
    weight: '14 kg',
    dimensions: '175 x 82 x 45 cm',
    maxLoad: '50 kg',
    opening: 'Dvostranska',
    lockType: 'Centralna ključavnica',
    color: 'Črna mat',
    isPopular: false,
    deposit: 100,
    description: 'Kompaktni strešni kovček je idealen za manjša vozila in vikend izlete. Njegova aerodinamična oblika zmanjšuje porabo goriva in hrup med vožnjo. Enostavna montaža in demontaža omogočata hitro namestitev brez orodja.',
    features: [
      'Aerodinamična oblika za manjšo porabo goriva',
      'Hitra montaža brez orodja (Quick-Grip sistem)',
      'Dvostranski odpiranje za lažji dostop',
      'UV odporna plastika za dolgotrajnost',
      'Notranje protizdrsne podloge',
      'Integrirana ročka za lažje prenašanje',
    ],
    included: [
      'Strešni kovček',
      '2x ključ za zaklepanje',
      'Montažni komplet',
      'Navodila za uporabo',
      'Torba za shranjevanje ključev',
    ],
  },
  {
    id: 2,
    slug: 'standardni-kovcek',
    title: 'Standardni Kovček',
    size: '450L',
    capacity: 'Za 3-4 osebe na dopustu',
    price: '20€ / dan',
    pricePerDay: 20,
    image: 'https://placehold.co/800x600/2d5016/f5f5f0?text=450L+Standardni&font=montserrat',
    images: [
      'https://placehold.co/800x600/2d5016/f5f5f0?text=450L+Pogled+1&font=montserrat',
      'https://placehold.co/800x600/3d6b1f/f5f5f0?text=450L+Pogled+2&font=montserrat',
      'https://placehold.co/800x600/4a7c2a/f5f5f0?text=450L+Pogled+3&font=montserrat',
      'https://placehold.co/800x600/5a8c3a/f5f5f0?text=450L+Detajl&font=montserrat',
    ],
    brand: 'Thule',
    weight: '18 kg',
    dimensions: '200 x 84 x 46 cm',
    maxLoad: '75 kg',
    opening: 'Dvostranska',
    lockType: 'Centralna ključavnica',
    color: 'Antracit',
    isPopular: true,
    deposit: 150,
    description: 'Naš najbolj priljubljen model združuje optimalno prostornino s praktičnostjo uporabe. Primeren za večino družinskih vozil in ponuja dovolj prostora za prtljago 3-4 oseb na daljšem potovanju.',
    features: [
      'Optimalna velikost za družinska vozila',
      'PowerClick sistem za hitro pritrditev',
      'LED indikator pravilne montaže',
      'Dvojni tesnilni sistem proti vodi',
      'Ojačana konstrukcija za večjo nosilnost',
      'Tiho delovanje pri visokih hitrostih',
    ],
    included: [
      'Strešni kovček',
      '2x ključ za zaklepanje',
      'PowerClick montažni sistem',
      'Navodila za uporabo',
      'Zaščitna folija za dno',
      'Nosilna torba',
    ],
  },
  {
    id: 3,
    slug: 'druzinski-kovcek',
    title: 'Družinski Kovček',
    size: '600L',
    capacity: 'Za daljša potovanja',
    price: '25€ / dan',
    pricePerDay: 25,
    image: 'https://placehold.co/800x600/4a7c2a/f5f5f0?text=600L+Druzinski&font=montserrat',
    images: [
      'https://placehold.co/800x600/4a7c2a/f5f5f0?text=600L+Pogled+1&font=montserrat',
      'https://placehold.co/800x600/3d6b1f/f5f5f0?text=600L+Pogled+2&font=montserrat',
      'https://placehold.co/800x600/2d5016/f5f5f0?text=600L+Pogled+3&font=montserrat',
      'https://placehold.co/800x600/5a8c3a/f5f5f0?text=600L+Detajl&font=montserrat',
    ],
    brand: 'Yakima',
    weight: '22 kg',
    dimensions: '220 x 90 x 47 cm',
    maxLoad: '85 kg',
    opening: 'Dvostranska široka',
    lockType: 'SKS ključavnica',
    color: 'Titan mat',
    isPopular: false,
    deposit: 200,
    description: 'Družinski strešni kovček ponuja izjemno prostornino za daljša potovanja celotne družine. Široko odpiranje omogoča enostavno nalaganje tudi večjih predmetov, kot so smuči ali golf oprema.',
    features: [
      'Široko odpiranje za velike predmete',
      'Notranji organizacijski sistem',
      'Ojačano dno za težje predmete',
      'Aerodinamični profil za manjši hrup',
      'Dvojna ključavnica za večjo varnost',
      'Protizdrsna površina na vrhu',
    ],
    included: [
      'Strešni kovček',
      '4x ključ za zaklepanje',
      'SKS montažni komplet',
      'Navodila za uporabo',
      'Notranji organizator',
      'Zaščitna prevleka',
    ],
  },
  {
    id: 4,
    slug: 'premium-xl',
    title: 'Premium XL',
    size: '750L',
    capacity: 'Maksimalna kapaciteta',
    price: '30€ / dan',
    pricePerDay: 30,
    image: 'https://placehold.co/800x600/1a1a1a/f5f5f0?text=750L+Premium+XL&font=montserrat',
    images: [
      'https://placehold.co/800x600/1a1a1a/f5f5f0?text=750L+Pogled+1&font=montserrat',
      'https://placehold.co/800x600/2a2a2a/f5f5f0?text=750L+Pogled+2&font=montserrat',
      'https://placehold.co/800x600/3a3a3a/f5f5f0?text=750L+Pogled+3&font=montserrat',
      'https://placehold.co/800x600/4a4a4a/f5f5f0?text=750L+Detajl&font=montserrat',
    ],
    brand: 'Thule',
    weight: '26 kg',
    dimensions: '235 x 94 x 47 cm',
    maxLoad: '100 kg',
    opening: 'Popolno odpiranje',
    lockType: 'Premium ključavnica z alarmom',
    color: 'Črna sijajna',
    isPopular: false,
    deposit: 250,
    description: 'Premium XL je naš največji in najbolj dovršen strešni kovček. Namenjen zahtevnim uporabnikom, ki potrebujejo maksimalno prostornino brez kompromisov glede kakovosti in varnosti.',
    features: [
      'Največja prostornina v ponudbi',
      'Premium materiali in obdelava',
      'Integriran alarm sistem',
      'LED notranja osvetlitev',
      'Električno odpiranje (opcijsko)',
      'Popolna vodoodpornost IP67',
      'Vgrajen GPS sledilnik',
    ],
    included: [
      'Strešni kovček',
      '4x ključ za zaklepanje',
      'Premium montažni sistem',
      'Daljinski upravljalnik',
      'Navodila za uporabo',
      'Premium zaščitna prevleka',
      'Dodatna baterija za alarm',
    ],
  },
];

export function getRoofBoxBySlug(slug: string): RoofBox | undefined {
  return roofBoxes.find((box) => box.slug === slug);
}

export function getRoofBoxById(id: number): RoofBox | undefined {
  return roofBoxes.find((box) => box.id === id);
}

export type RoofTypeChoice = 'naked-roof' | 'flush-rails' | 'raised-rails' | 'fixed-points' | 'unsure' | 'other';

export interface ReservationData {
  selectedBoxId: number | null;
  roofType: RoofTypeChoice | null;
  startDate: Date | null;
  endDate: Date | null;
  name: string;
  email: string;
  phone: string;
  vehicleDescription: string;
  notes: string;
  roofTypeOther: string;
}


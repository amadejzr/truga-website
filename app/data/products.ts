export interface RoofBox {
  id: number;
  title: string;
  size: string;
  capacity: string;
  price: string;
  pricePerDay: number;
  image: string;
  isPopular: boolean;
  deposit: number;
}

export const roofBoxes: RoofBox[] = [
  {
    id: 1,
    title: 'Kompaktni Kovček',
    size: '350–420L',
    capacity: 'Idealno za vikend izlete',
    price: 'od 12€ / dan',
    pricePerDay: 14,
    image: '/compact_box.png',
    isPopular: false,
    deposit: 200,
  },
  {
    id: 2,
    title: 'Standardni Kovček',
    size: '450–510L',
    capacity: 'Za 3-4 osebe na dopustu',
    price: 'od 18€ / dan',
    pricePerDay: 20,
    image: '/standard_box.png',
    isPopular: true,
    deposit: 250,
  },
  {
    id: 3,
    title: 'Družinski Kovček',
    size: '600–750L',
    capacity: 'Za daljša potovanja',
    price: 'od 25€ / dan',
    pricePerDay: 27,
    image: '/family_box.png',
    isPopular: false,
    deposit: 300,
  },
];

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

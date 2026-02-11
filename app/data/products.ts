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
    size: '320L',
    capacity: 'Idealno za vikend izlete',
    price: '15€ / dan',
    pricePerDay: 15,
    image: '/compact_box.png',
    isPopular: false,
    deposit: 100,
  },
  {
    id: 2,
    title: 'Standardni Kovček',
    size: '450L',
    capacity: 'Za 3-4 osebe na dopustu',
    price: '20€ / dan',
    pricePerDay: 20,
    image: '/standard_box.png',
    isPopular: true,
    deposit: 150,
  },
  {
    id: 3,
    title: 'Družinski Kovček',
    size: '600L',
    capacity: 'Za daljša potovanja',
    price: '25€ / dan',
    pricePerDay: 25,
    image: '/family_box.png',
    isPopular: false,
    deposit: 200,
  },
  {
    id: 4,
    title: 'Premium XL',
    size: '750L',
    capacity: 'Maksimalna kapaciteta',
    price: '30€ / dan',
    pricePerDay: 30,
    image: '/premium_box.png',
    isPopular: false,
    deposit: 250,
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

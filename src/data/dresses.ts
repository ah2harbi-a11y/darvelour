export interface Dress {
  id: number;
  name: string;
  boutique: string;
  price: number;
  rating: number;
  reviews: number;
  express: boolean;
  collection: string;
  image_url?: string;
}

// Fallback data used until API loads
const fallbackDresses: Dress[] = [
  { id: 1, name: 'Elegant Maxi Dress', boutique: 'Boutique Alya', price: 2500, rating: 4.0, reviews: 128, express: true, collection: 'Evening Collection' },
  { id: 2, name: 'Classic Midi Dress', boutique: 'Boutique Noor', price: 2950, rating: 4.1, reviews: 95, express: false, collection: 'Evening Collection' },
  { id: 3, name: 'Modern Evening Dress', boutique: 'Boutique Reem', price: 3400, rating: 4.2, reviews: 112, express: false, collection: 'Evening Collection' },
  { id: 4, name: 'Sophisticated Maxi Dress', boutique: 'Boutique Layla', price: 3850, rating: 4.3, reviews: 87, express: true, collection: 'Spring Collection' },
  { id: 5, name: 'Timeless Evening Gown', boutique: 'Boutique Alya', price: 4200, rating: 4.4, reviews: 156, express: false, collection: 'Evening Collection' },
  { id: 6, name: 'Exquisite Maxi Dress', boutique: 'Boutique Noor', price: 4650, rating: 4.5, reviews: 73, express: true, collection: 'Spring Collection' },
  { id: 7, name: 'Refined Midi Dress', boutique: 'Boutique Reem', price: 5100, rating: 4.6, reviews: 201, express: false, collection: 'Evening Collection' },
  { id: 8, name: 'Classic Evening Gown', boutique: 'Boutique Layla', price: 5550, rating: 4.7, reviews: 64, express: false, collection: 'Evening Collection' },
  { id: 9, name: 'Modern Maxi Dress', boutique: 'Boutique Alya', price: 6000, rating: 4.8, reviews: 189, express: true, collection: 'Spring Collection' },
  { id: 10, name: 'Elegant Midi Dress', boutique: 'Boutique Noor', price: 6450, rating: 4.9, reviews: 142, express: false, collection: 'Evening Collection' },
  { id: 11, name: 'Sophisticated Evening Gown', boutique: 'Boutique Reem', price: 6900, rating: 5.0, reviews: 231, express: false, collection: 'Spring Collection' },
  { id: 12, name: 'Timeless Maxi Dress', boutique: 'Boutique Layla', price: 7350, rating: 4.8, reviews: 167, express: true, collection: 'Evening Collection' },
  { id: 13, name: 'Refined Evening Gown', boutique: 'Maison Layla', price: 4900, rating: 4.7, reviews: 98, express: true, collection: 'New Arrivals' },
  { id: 14, name: 'Modern Evening Gown', boutique: 'Maison Sara', price: 5700, rating: 4.6, reviews: 76, express: false, collection: 'New Arrivals' },
  { id: 15, name: 'Classic Evening Gown', boutique: 'Maison Hana', price: 6500, rating: 4.8, reviews: 134, express: false, collection: 'New Arrivals' },
  { id: 16, name: 'Elegant Evening Gown', boutique: 'Maison Noor', price: 5200, rating: 4.5, reviews: 89, express: true, collection: 'New Arrivals' },
];

// Live data - starts with fallback, gets replaced by API data
export let allDresses: Dress[] = [...fallbackDresses];

// Load dresses from API
export async function loadDresses(): Promise<Dress[]> {
  try {
    const res = await fetch('/api/dresses');
    if (res.ok) {
      const data = await res.json();
      allDresses = data.map((d: any) => ({
        id: d.id,
        name: d.name,
        boutique: d.boutique,
        price: d.price,
        rating: d.rating,
        reviews: d.reviews,
        express: !!d.express,
        collection: d.collection,
        image_url: d.image_url || '',
      }));
      return allDresses;
    }
  } catch {}
  return allDresses;
}

// Auto-load on import
loadDresses();

export function getDressById(id: number): Dress | undefined {
  return allDresses.find(d => d.id === id);
}

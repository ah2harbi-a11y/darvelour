import { allDresses } from './dresses';

export interface Boutique {
  name: string;
  description: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  specialties: string[];
  dressCount?: number;
  image_url?: string;
}

// Fallback data
const fallbackBoutiques: Boutique[] = [
  { name: 'Boutique Alya', description: 'Premium evening wear specializing in elegant, modest designs for special events.', location: 'Al Olaya, Riyadh', rating: 4.8, reviews: 234, verified: true, specialties: ['Evening Wear', 'Wedding Guest'] },
  { name: 'Boutique Noor', description: 'Contemporary luxury fashion blending tradition with modern silhouettes.', location: 'King Fahd Rd, Riyadh', rating: 4.7, reviews: 189, verified: true, specialties: ['Cocktail Dresses', 'Modest Luxury'] },
  { name: 'Boutique Reem', description: 'Haute couture inspired designs crafted with the finest fabrics and detailing.', location: 'Tahlia St, Jeddah', rating: 4.9, reviews: 312, verified: true, specialties: ['Haute Couture', 'Evening Gowns'] },
  { name: 'Boutique Layla', description: 'Timeless sophistication for the modern woman. Exclusive occasion wear.', location: 'Al Khobar, Eastern Province', rating: 4.6, reviews: 156, verified: true, specialties: ['Formal Events', 'Bridal Party'] },
  { name: 'Maison Layla', description: 'Artisanal evening gowns with a focus on hand-embroidered details and luxury fabrics.', location: 'Al Rawdah, Riyadh', rating: 4.7, reviews: 98, verified: true, specialties: ['Artisanal', 'Evening Gowns'] },
  { name: 'Maison Sara', description: 'Bold and modern designer pieces for women who want to make a statement.', location: 'Granada Mall, Riyadh', rating: 4.6, reviews: 76, verified: false, specialties: ['Modern Design', 'Statement Pieces'] },
  { name: 'Maison Hana', description: 'Classic elegance meets Saudi heritage. Curated collection of premium evening wear.', location: 'Red Sea Mall, Jeddah', rating: 4.8, reviews: 134, verified: true, specialties: ['Heritage', 'Classic Elegance'] },
  { name: 'Maison Noor', description: 'Luxury occasion wear designed for confidence and grace at every event.', location: 'Panorama Mall, Riyadh', rating: 4.5, reviews: 89, verified: false, specialties: ['Occasion Wear', 'Luxury'] },
];

// Live data - starts with fallback, gets replaced by API data
export let boutiques: Boutique[] = [...fallbackBoutiques];

// Load boutiques from API
export async function loadBoutiques(): Promise<Boutique[]> {
  try {
    const res = await fetch('/api/dresses/boutiques');
    if (res.ok) {
      const data = await res.json();
      // API returns full boutique objects when boutiques table has data
      if (data.length > 0 && typeof data[0] === 'object' && data[0].name) {
        boutiques = data.map((b: any) => ({
          name: b.name,
          description: b.description || '',
          location: b.location || '',
          rating: b.rating || 4.5,
          reviews: b.reviews || 0,
          verified: !!b.verified,
          specialties: Array.isArray(b.specialties) ? b.specialties : (b.specialties ? String(b.specialties).split(',').map((s: string) => s.trim()).filter(Boolean) : []),
          dressCount: b.dressCount || 0,
          image_url: b.image_url || '',
        }));
        return boutiques;
      }
    }
  } catch {}
  return boutiques;
}

// Auto-load on import
loadBoutiques();

export function getBoutiqueByName(name: string): Boutique | undefined {
  return boutiques.find(b => b.name === name);
}

export function getDressesByBoutique(boutiqueName: string) {
  return allDresses.filter(d => d.boutique === boutiqueName);
}

export function getBoutiqueInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

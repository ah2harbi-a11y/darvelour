import dressImage1 from 'figma:asset/29d708beeb1730140360f560144f754167573530.png';
import dressImage2 from 'figma:asset/6583eb707489572854f7279d27d6d2ca4969db73.png';
import dressImage3 from 'figma:asset/9a4671452bc1493dd3040714fd8342d7f21b7488.png';
import dressImage4 from 'figma:asset/eafbaaad390706cba77a8a7d6abd7ea003bca86a.png';
import dressImage5 from 'figma:asset/bbe4405aa7d07b150b52d9a0fb9b5f11f14284e7.png';
import dressImage6 from 'figma:asset/a86b4e3d6b45962b7c75e799a3d8b3bcd1f6e31a.png';
import { allDresses } from './dresses';

export const dressImages = [dressImage1, dressImage2, dressImage3, dressImage4, dressImage5, dressImage6];

export function getDressImage(id: number): string {
  // Use uploaded image_url from database if available
  const dress = allDresses.find(d => d.id === id);
  if (dress?.image_url) {
    return dress.image_url;
  }
  // Fallback to bundled Figma assets
  return dressImages[(id - 1) % dressImages.length];
}

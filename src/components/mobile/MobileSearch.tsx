import { SlidersHorizontal, X } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { allDresses } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileSearchProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  onAddToCart: (dressId?: number) => void;
  onAddToWishlist: (dressId?: number) => void;
  wishlistItems?: number;
}

export default function MobileSearch({ onNavigate, onGoBack, onAddToCart, onAddToWishlist, wishlistItems }: MobileSearchProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState('all');

  const dresses = [...allDresses].sort((a, b) => b.id - a.id).slice(0, 12);

  const occasions = [
    { id: 'all', icon: '✨', name: 'All' },
    { id: 'wedding', icon: '💍', name: 'Wedding' },
    { id: 'evening', icon: '🌙', name: 'Evening' },
    { id: 'business', icon: '💼', name: 'Business' },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Shop Dresses"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Results Count */}
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <p className="text-xs text-gray-500 text-center">{dresses.length} dresses found</p>
        </div>

        {/* Quick Filters */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {occasions.map((occasion) => (
              <button
                key={occasion.id}
                onClick={() => setSelectedOccasion(occasion.id)}
                className={`px-4 py-2 text-xs whitespace-nowrap rounded-full border font-medium flex items-center gap-1.5 ${
                  selectedOccasion === occasion.id
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-gray-600 border-gray-300'
                }`}
              >
                <span>{occasion.icon}</span>
                {occasion.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {dresses.map((dress) => (
              <div
                key={dress.id}
                onClick={() => onNavigate('dress-detail', dress.id)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(dress.id)}
                    alt={dress.name}
                    className="w-full h-full object-cover"
                  />
                  {dress.express && (
                    <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 rounded text-[9px] font-medium">
                      Express
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[10px] text-gray-400 mb-0.5">{dress.boutique}</p>
                  <p className="text-xs font-medium text-black mb-1.5 line-clamp-1">{dress.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-black">SAR {dress.price.toLocaleString()}</p>
                    <div className="flex items-center gap-0.5">
                      <span className="text-[10px] text-yellow-500">★</span>
                      <span className="text-[10px] text-gray-500">{dress.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Filter Sheet */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] overflow-y-auto rounded-t-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4 space-y-6">
              <div>
                <h3 className="text-sm font-bold mb-3">Size</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button key={size} className="py-2 border border-gray-300 rounded-lg bg-white text-xs font-medium">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button onClick={() => setShowFilters(false)} className="flex-1 py-3 border border-gray-300 rounded-lg bg-white text-sm font-medium">
                  Clear
                </button>
                <button onClick={() => setShowFilters(false)} className="flex-1 py-3 bg-black text-white rounded-lg text-sm font-medium">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

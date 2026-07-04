import { Heart, ShoppingBag, X } from 'lucide-react';
import { Page } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { getDressById } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileWishlistProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  onAddToCart: (dressId?: number) => void;
  onRemoveFromWishlist: (dressId?: number) => void;
  wishlistItems: number;
  wishlistIds: number[];
}

export default function MobileWishlist({ onNavigate, onGoBack, onAddToCart, onRemoveFromWishlist, wishlistItems, wishlistIds }: MobileWishlistProps) {
  const items = wishlistIds.map(id => getDressById(id)).filter(Boolean);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="My DV Closet"
        showBack={true}
        showCart={true}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <p className="text-sm text-gray-500">{items.length} items saved</p>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
            <Heart className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-lg font-bold mb-2">Your DV Closet is empty</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">Save your favorite dresses to find them easily later</p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-black text-white px-8 py-3 text-sm font-bold"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-2 gap-3">
            {items.map((dress) => dress && (
              <div key={dress.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div
                  className="relative aspect-[3/4] bg-gray-100 cursor-pointer overflow-hidden"
                  onClick={() => onNavigate('dress-detail', dress.id)}
                >
                  <ImageWithFallback
                    src={getDressImage(dress.id)}
                    alt={dress.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => { e.stopPropagation(); onRemoveFromWishlist(dress.id); }}
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>

                <div className="p-3">
                  <p className="text-[10px] text-gray-400 mb-0.5">{dress.boutique}</p>
                  <h3 className="text-xs font-medium text-black mb-1 line-clamp-1">{dress.name}</h3>
                  <p className="text-sm font-semibold text-black mb-2">SAR {dress.price.toLocaleString()}</p>
                  <button
                    onClick={() => onAddToCart(dress.id)}
                    className="w-full bg-black text-white py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <MobileNav currentPage="wishlist" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

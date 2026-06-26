import { ShoppingBag, X, ArrowLeft, Heart } from 'lucide-react';
import { Page } from '../../App';
import { getDressById } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopWishlistProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  onAddToCart: (dressId?: number) => void;
  onRemoveFromWishlist: (dressId?: number) => void;
  wishlistIds: number[];
}

export default function DesktopWishlist({ onNavigate, onGoBack, onAddToCart, onRemoveFromWishlist, wishlistIds }: DesktopWishlistProps) {
  const wishlistItems = wishlistIds.map(id => getDressById(id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <button onClick={onGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-light">My Wishlist</h1>
          </div>
          <div className="text-sm text-gray-500">{wishlistItems.length} items</div>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-light mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Browse our collection and save your favorite dresses</p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-black text-white px-12 py-4 text-sm font-bold tracking-wider hover:bg-gray-900"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {wishlistItems.map((dress) => dress && (
              <div key={dress.id} className="group relative">
                <button
                  onClick={() => onRemoveFromWishlist(dress.id)}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:bg-white transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>

                <div
                  className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden cursor-pointer"
                  onClick={() => onNavigate('dress-detail', dress.id)}
                >
                  <ImageWithFallback
                    src={getDressImage(dress.id)}
                    alt={dress.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="cursor-pointer mb-3" onClick={() => onNavigate('dress-detail', dress.id)}>
                  <div className="text-xs text-gray-400 mb-1">{dress.boutique}</div>
                  <div className="font-medium text-sm mb-1">{dress.name}</div>
                  <div className="font-semibold">SAR {dress.price.toLocaleString()}</div>
                </div>

                <button
                  onClick={() => onAddToCart(dress.id)}
                  className="w-full py-3 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

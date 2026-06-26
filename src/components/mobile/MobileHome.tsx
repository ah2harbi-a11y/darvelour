import { Sparkles, Crown, Camera } from 'lucide-react';
import { Page } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { allDresses } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileHomeProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onAddToCart: (dressId?: number) => void;
  onAddToWishlist: (dressId?: number) => void;
  cartItems: number;
  wishlistItems: number;
}

export default function MobileHome({ onNavigate, onAddToCart, onAddToWishlist, cartItems, wishlistItems }: MobileHomeProps) {
  const featuredDresses = allDresses.slice(0, 6);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black text-white px-4 py-2 text-center">
        <p className="text-xs tracking-wide">Express Delivery in 2-3 Hours</p>
      </div>

      {/* Header */}
      <MobileHeader onNavigate={onNavigate} cartItems={cartItems} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {/* Hero Section */}
        <div className="relative h-[500px] mx-4 my-4 rounded-xl overflow-hidden">
          <ImageWithFallback
            src={getDressImage(1)}
            alt="Spring Collection"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 bg-gradient-to-t from-black via-black/70 to-transparent text-white">
            <p className="text-[10px] uppercase mb-3 tracking-widest">
              SPRING COLLECTION 2026
            </p>
            <h1 className="text-3xl mb-4 font-bold leading-tight">
              Where Elegance<br />Is Decided.
            </h1>
            <p className="text-sm mb-6 max-w-[280px] leading-relaxed opacity-90">
              Curated across Saudi Arabia — delivered with precision.
            </p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-white text-black px-8 py-3 rounded-lg text-sm font-semibold"
            >
              Explore Collection
            </button>
          </div>
        </div>

        {/* AI Stylist Picks */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black" />
              <h2 className="text-sm font-bold text-black">AI Stylist Picks</h2>
            </div>
            <button
              onClick={() => onNavigate('ai-stylist')}
              className="text-xs text-gray-500"
            >
              View All
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {featuredDresses.slice(0, 4).map((dress) => (
              <div
                key={dress.id}
                onClick={() => onNavigate('dress-detail', dress.id)}
                className="flex-shrink-0 w-40 bg-white rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(dress.id)}
                    alt={dress.name}
                    className="w-full h-full object-cover"
                  />
                  {dress.express && (
                    <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 rounded text-[9px] font-medium">
                      Express
                    </div>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="text-[10px] text-gray-400 mb-0.5">{dress.boutique}</p>
                  <p className="text-xs font-medium mb-1 text-black line-clamp-1">{dress.name}</p>
                  <p className="text-xs text-black font-bold">SAR {dress.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shop by Occasion */}
        <div className="px-4 py-6 bg-white border-y border-gray-200">
          <h2 className="text-sm font-bold mb-5 text-black">Shop by Occasion</h2>
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: '💍', label: 'Wedding' },
              { icon: '🌙', label: 'Evening' },
              { icon: '💼', label: 'Business' },
              { icon: '👗', label: 'Casual' },
            ].map((occasion) => (
              <button
                key={occasion.label}
                onClick={() => onNavigate('search')}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <span className="text-2xl">{occasion.icon}</span>
                </div>
                <span className="text-[10px] text-black font-medium">{occasion.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Premium Services */}
        <div className="px-4 py-6">
          <h2 className="text-sm font-bold mb-4 text-black">Premium Services</h2>
          <div className="space-y-3">
            <button
              onClick={() => onNavigate('virtual-tryon')}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-black mb-0.5">Virtual Try-On</p>
                <p className="text-[10px] text-gray-500">See how it looks on you</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('exclusivity')}
              className="w-full bg-white border border-gray-200 rounded-lg p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Crown className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-xs font-bold text-black mb-0.5">Exclusivity Service</p>
                <p className="text-[10px] text-gray-500">Never wear the same dress twice</p>
              </div>
            </button>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="px-4 py-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-black">New Arrivals</h2>
            <button
              onClick={() => onNavigate('search')}
              className="text-xs text-gray-500"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {allDresses.slice(6, 10).map((dress) => (
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
                </div>
                <div className="p-2.5">
                  <p className="text-[10px] text-gray-400 mb-0.5">{dress.boutique}</p>
                  <p className="text-xs font-medium mb-1 text-black line-clamp-1">{dress.name}</p>
                  <p className="text-xs text-black font-bold">SAR {dress.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <MobileNav currentPage="home" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

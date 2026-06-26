import { ArrowLeft, Heart, Star, Crown, Eye } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import MobileNav from './MobileNav';
import { getDressById } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { getBoutiqueByName, getBoutiqueInitials } from '../../data/boutiques';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileDressDetailProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  onAddToCart: (dressId?: number) => void;
  onAddToWishlist: (dressId?: number) => void;
  wishlistItems: number;
  dressId: number | null;
}

export default function MobileDressDetail({ onNavigate, onGoBack, onAddToCart, onAddToWishlist, wishlistItems, dressId }: MobileDressDetailProps) {
  const dress = getDressById(dressId || 1);
  const name = dress?.name || 'Dress';
  const boutiqueName = dress?.boutique || 'Boutique';
  const price = dress?.price || 2500;
  const rating = dress?.rating || 4.0;
  const reviews = dress?.reviews || 0;
  const collection = dress?.collection || 'Evening Collection';
  const isExpress = dress?.express ?? false;
  const image = getDressImage(dressId || 1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(dressId || 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };
  const boutiqueData = getBoutiqueByName(boutiqueName);
  const initials = getBoutiqueInitials(boutiqueName);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <button
          onClick={onGoBack}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 text-black" />
        </button>
        <button
          onClick={() => onAddToWishlist(dressId || 1)}
          className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm"
        >
          <Heart className="w-5 h-5 text-black" />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto pb-64">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          <ImageWithFallback src={image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-14 flex gap-2">
            {isExpress && (
              <div className="text-[10px] bg-black text-white px-2.5 py-1 font-medium rounded-full">Express</div>
            )}
            <div className="text-[10px] bg-white/90 backdrop-blur text-black px-2.5 py-1 font-medium rounded-full">Modest</div>
          </div>
        </div>
        <div className="flex justify-center gap-2 py-3">
          <div className="w-2 h-2 rounded-full bg-black"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        {/* Virtual Try-On */}
        <div className="px-4 py-3 border-b border-gray-100">
          <button
            onClick={() => onNavigate('virtual-tryon')}
            className="w-full bg-gray-50 border border-gray-200 text-black py-3 text-sm font-medium flex items-center justify-center gap-2 rounded-xl"
          >
            <Eye className="w-4 h-4" />
            Virtual Try-On
          </button>
        </div>

        {/* Product info */}
        <div className="px-4 pt-4 pb-4 space-y-4">
          <div>
            <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">{collection}</div>
            <h1 className="font-medium text-lg mb-2">{name}</h1>
          </div>

          <div>
            <div className="text-2xl font-medium mb-1">SAR {price.toLocaleString()}</div>
            <div className="text-xs text-red-600 font-medium">Only 3 left in your size</div>
          </div>

          {/* Boutique */}
          <button
            onClick={() => onNavigate('boutique')}
            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl w-full"
          >
            <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-medium">{boutiqueName}</div>
              {boutiqueData?.verified && (
                <div className="text-[10px] text-green-700 font-medium bg-green-50 px-1.5 py-0.5 rounded-full">Verified</div>
              )}
            </div>
            <div className="text-gray-300 text-sm ml-auto">›</div>
          </button>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
              ))}
            </div>
            <div className="text-xs text-gray-500">{rating.toFixed(1)} ({reviews} reviews)</div>
          </div>

          {/* Size selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-medium text-gray-500 tracking-wide">SELECT SIZE</div>
              <button className="text-xs text-gray-400 underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-medium border rounded-xl transition-colors ${
                    size === selectedSize
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 text-black hover:border-gray-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Key Details */}
          <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
            <div className="text-xs font-medium text-gray-500 tracking-wide mb-2">KEY DETAILS</div>
            <div className="text-xs text-gray-600 space-y-1.5">
              <div className="flex items-start gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>Premium chiffon fabric, breathable & elegant</div>
              <div className="flex items-start gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>Floor-length maxi silhouette</div>
              <div className="flex items-start gap-2"><span className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></span>Professional dry clean recommended</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="fixed bottom-14 left-0 right-0 bg-white border-t border-gray-200 z-40">
        {isExpress && (
          <div className="px-4 py-2 bg-green-600 text-white">
            <div className="text-xs font-medium">EXPRESS: Get it by 6:00 PM</div>
            <div className="text-[10px] opacity-80">Order within 2h 34m</div>
          </div>
        )}
        <div className="px-4 py-3 flex gap-2">
          <button
            onClick={added ? () => onNavigate('cart') : handleAdd}
            className="flex-[2] bg-black text-white py-3.5 font-medium text-sm rounded-xl"
          >
            {added ? '✓ Added — View Bag' : `Add to Bag - SAR ${price.toLocaleString()}`}
          </button>
          <button
            onClick={() => onAddToCart(dressId || 1)}
            className="flex-1 border border-gray-300 text-black py-3.5 font-medium text-sm rounded-xl"
          >
            Add to Cart
          </button>
        </div>
        {/* Exclusivity */}
        <div className="px-4 pb-3">
          <button
            onClick={() => onNavigate('exclusivity', dressId || 1)}
            className="w-full border border-gray-200 bg-gray-50 p-3.5 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <Crown className="w-4 h-4 text-yellow-600" />
              <div>
                <div className="text-sm font-medium text-black">Make It Exclusive</div>
                <div className="text-[10px] text-gray-500">Be the only one wearing this dress</div>
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500">From SAR 50 ›</div>
          </button>
        </div>
      </div>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

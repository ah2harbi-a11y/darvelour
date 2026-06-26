import { ArrowLeft, Heart, Star } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import { getDressById } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopDressDetailProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  onAddToCart: (dressId?: number) => void;
  onAddToWishlist: (dressId?: number) => void;
  dressId: number | null;
}

export default function DesktopDressDetail({ onNavigate, onGoBack, onAddToCart, onAddToWishlist, dressId }: DesktopDressDetailProps) {
  const dress = getDressById(dressId || 1);
  const dressName = dress?.name || 'Dress';
  const boutiqueName = dress?.boutique || 'Boutique';
  const price = dress?.price || 2500;
  const rating = dress?.rating || 4.0;
  const reviews = dress?.reviews || 0;
  const collection = dress?.collection || 'Evening Collection';
  const image = getDressImage(dressId || 1);
  const [selectedSize, setSelectedSize] = useState('M');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <button onClick={onGoBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </button>
        <div className="grid grid-cols-2 gap-16">
          {/* Image gallery */}
          <div>
            <div className="aspect-[3/4] bg-gray-100 border border-gray-200 mb-4 overflow-hidden">
              <ImageWithFallback
                src={image}
                alt={dressName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                'object-cover object-top',
                'object-cover object-center scale-110',
                'object-cover object-bottom',
                'object-cover object-center -scale-x-100',
              ].map((style, i) => (
                <div key={i} className="aspect-square bg-gray-100 border border-gray-200 overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={`${dressName} view ${i + 1}`}
                    className={`w-full h-full ${style}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="space-y-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{collection}</p>
              <h1 className="text-3xl font-light mb-2">{dressName}</h1>
              <button onClick={() => onNavigate('boutique')} className="text-sm text-gray-500 hover:text-black underline">
                by {boutiqueName}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-black text-black' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-500">{rating.toFixed(1)} ({reviews} reviews)</span>
            </div>

            <div>
              <span className="text-3xl font-light">SAR {price.toLocaleString()}</span>
              <p className="text-sm text-red-600 mt-1">Only 3 left in your size</p>
            </div>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold uppercase tracking-wider">Select Size</p>
                <button className="text-xs underline text-gray-500">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-medium border transition-colors ${
                      size === selectedSize ? 'border-black bg-black text-white' :
                      'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={() => { onAddToCart(dressId || 1); onNavigate('cart'); }}
                className="w-full bg-black text-white py-4 font-bold text-sm tracking-wider hover:bg-gray-900"
              >
                ADD TO BAG - SAR {price.toLocaleString()}
              </button>
              <button
                onClick={() => onAddToWishlist(dressId || 1)}
                className="w-full border border-black py-4 font-bold text-sm tracking-wider hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4" />
                ADD TO WISHLIST
              </button>
            </div>

            {/* Exclusivity */}
            <button
              onClick={() => onNavigate('exclusivity', dressId || 1)}
              className="w-full border-2 border-yellow-700 bg-yellow-50 p-4 text-left hover:bg-yellow-100 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-sm">MAKE IT EXCLUSIVE</p>
                  <p className="text-xs text-gray-600 mt-1">Be the only one wearing this dress at your event</p>
                </div>
                <span className="text-sm font-bold">From SAR 50 →</span>
              </div>
            </button>

            {/* Virtual Try-On */}
            <button
              onClick={() => onNavigate('virtual-tryon')}
              className="w-full border border-gray-300 py-3 text-sm font-medium hover:border-black transition-colors"
            >
              VIRTUAL TRY-ON
            </button>

            {/* Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3">Key Details</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Premium chiffon fabric, breathable & elegant</li>
                <li>• Floor-length maxi silhouette</li>
                <li>• Professional dry clean recommended</li>
              </ul>
            </div>

            {/* Express delivery */}
            <div className="bg-green-50 border border-green-200 p-4">
              <p className="text-sm font-bold text-green-800">EXPRESS: Get it by 6:00 PM</p>
              <p className="text-xs text-green-700">Order within 2h 34m · Free returns within 14 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

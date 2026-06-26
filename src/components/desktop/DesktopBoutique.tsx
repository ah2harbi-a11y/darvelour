import { MapPin, Star, Heart, ShoppingBag, Crown, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import { getBoutiqueByName, getDressesByBoutique, getBoutiqueInitials } from '../../data/boutiques';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopBoutiqueProps {
  onNavigate: (page: Page, id?: number) => void;
  onGoBack: () => void;
  boutiqueName: string | null;
  onAddToCart: (dressId: number) => void;
  onAddToWishlist: (dressId: number) => void;
}

export default function DesktopBoutique({ onNavigate, onGoBack, boutiqueName, onAddToCart, onAddToWishlist }: DesktopBoutiqueProps) {
  const [following, setFollowing] = useState(false);

  const boutique = getBoutiqueByName(boutiqueName || '');
  const dresses = getDressesByBoutique(boutiqueName || '');
  const initials = getBoutiqueInitials(boutiqueName || '');

  if (!boutique) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Boutique not found</p>
          <button onClick={onGoBack} className="text-black underline text-sm">Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-3">
          <button onClick={onGoBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Boutiques
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-10">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-black text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
              {initials}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-light text-black">{boutique.name}</h1>
                {boutique.verified && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-black">{boutique.rating}</span>
                  <span>({boutique.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>{boutique.location}</span>
                </div>
                <span>{dresses.length} dresses</span>
              </div>

              <p className="text-sm text-gray-500 mb-5 max-w-2xl">{boutique.description}</p>

              <div className="flex items-center gap-2 flex-wrap">
                {boutique.specialties.map((s) => (
                  <span key={s} className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setFollowing(!following)}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                following
                  ? 'bg-white border border-gray-300 text-gray-600 hover:border-black'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>
      </div>

      {/* Collection */}
      <div className="max-w-[1400px] mx-auto px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-black">Collection ({dresses.length})</h2>
        </div>

        {dresses.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p>No dresses available from this boutique yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {dresses.map((dress) => (
              <div
                key={dress.id}
                className="group cursor-pointer"
                onClick={() => onNavigate('dress-detail', dress.id)}
              >
                <div className="relative aspect-[3/4] bg-gray-100 rounded-lg mb-3 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(dress.id)}
                    alt={dress.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {dress.express && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-black text-white text-[10px] font-bold rounded">
                      EXPRESS
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); onAddToWishlist(dress.id); }}
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    <button
                      className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); onAddToCart(dress.id); }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">{dress.collection}</p>
                  <h3 className="text-sm font-medium text-black mb-1 group-hover:underline">{dress.name}</h3>
                  <p className="text-sm text-black">SAR {dress.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

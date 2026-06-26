import { Star, MapPin, Check } from 'lucide-react';
import { Page } from '../../App';
import { getBoutiqueByName, getDressesByBoutique, getBoutiqueInitials } from '../../data/boutiques';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileBoutiqueProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onGoBack: () => void;
  wishlistItems: number;
  boutiqueName: string | null;
}

export default function MobileBoutique({ onNavigate, onGoBack, wishlistItems, boutiqueName }: MobileBoutiqueProps) {
  const boutique = getBoutiqueByName(boutiqueName || '');
  const dresses = getDressesByBoutique(boutiqueName || '');
  const initials = getBoutiqueInitials(boutiqueName || '');

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Boutique"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {!boutique ? (
          <div className="flex-1 flex items-center justify-center py-16">
            <p className="text-gray-500 text-sm">Boutique not found</p>
          </div>
        ) : (
          <>
            {/* Boutique Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {initials}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-lg font-medium text-black">{boutique.name}</h2>
                    {boutique.verified && (
                      <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span>{boutique.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs mb-3">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{boutique.rating}</span>
                  <span className="text-gray-500">({boutique.reviews} reviews)</span>
                </div>
              </div>
              <p className="text-xs text-gray-600">{boutique.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {boutique.specialties.map((s) => (
                  <span key={s} className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] rounded-full">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Dresses Grid */}
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">All Dresses ({dresses.length})</h3>
              {dresses.length === 0 ? (
                <p className="text-center py-12 text-gray-400 text-sm">No dresses yet</p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {dresses.map((dress) => (
                    <button
                      key={dress.id}
                      onClick={() => onNavigate('dress-detail', dress.id)}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden text-left"
                    >
                      <div className="aspect-[3/4] bg-gray-100 overflow-hidden">
                        <ImageWithFallback
                          src={getDressImage(dress.id)}
                          alt={dress.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2.5">
                        <p className="text-xs text-gray-400 mb-0.5">{dress.collection}</p>
                        <p className="text-xs font-medium text-black truncate">{dress.name}</p>
                        <p className="text-xs text-black font-medium mt-1">SAR {dress.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      <MobileNav currentPage="boutiques" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

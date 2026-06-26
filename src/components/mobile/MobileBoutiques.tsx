import { Star, MapPin, Check, ChevronRight, Store } from 'lucide-react';
import { Page } from '../../App';
import { boutiques, getDressesByBoutique, getBoutiqueInitials } from '../../data/boutiques';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileBoutiquesProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  onSelectBoutique: (name: string) => void;
  wishlistItems: number;
}

export default function MobileBoutiques({ onNavigate, onGoBack, onSelectBoutique, wishlistItems }: MobileBoutiquesProps) {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Boutiques"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Hero */}
        <div className="bg-white px-4 py-8 text-center border-b border-gray-200">
          <Store className="w-8 h-8 mx-auto mb-3 text-gray-400" strokeWidth={1.5} />
          <h1 className="text-xl font-light text-black mb-1">Our Boutiques</h1>
          <p className="text-xs text-gray-500">Curated collections from top designers</p>
        </div>

        {/* Boutique List */}
        <div className="p-4 space-y-3">
          {boutiques.map((boutique) => {
            const dresses = getDressesByBoutique(boutique.name);
            const initials = getBoutiqueInitials(boutique.name);

            return (
              <button
                key={boutique.name}
                onClick={() => onSelectBoutique(boutique.name)}
                className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden text-left"
              >
                {/* Dress Preview */}
                <div className="flex h-24">
                  {dresses.slice(0, 3).map((dress) => (
                    <div key={dress.id} className="flex-1 overflow-hidden">
                      <ImageWithFallback
                        src={getDressImage(dress.id)}
                        alt={dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                  {dresses.length === 0 && (
                    boutique.image_url ? (
                      <ImageWithFallback
                        src={boutique.image_url}
                        alt={boutique.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex-1 flex items-center justify-center bg-gray-100 text-gray-300 text-xs">
                        No dresses yet
                      </div>
                    )
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-center gap-3">
                    {boutique.image_url ? (
                      <img
                        src={boutique.image_url}
                        alt={boutique.name}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-sm font-medium text-black truncate">{boutique.name}</h3>
                        {boutique.verified && (
                          <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-[10px] text-gray-500">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-black">{boutique.rating}</span>
                          <span>({boutique.reviews})</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" />
                          <span>{boutique.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <span>{dresses.length}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <MobileNav currentPage="boutiques" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

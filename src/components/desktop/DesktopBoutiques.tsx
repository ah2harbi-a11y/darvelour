import { Star, MapPin, Check, ArrowRight, Store } from 'lucide-react';
import { Page } from '../../App';
import { boutiques, getDressesByBoutique, getBoutiqueInitials } from '../../data/boutiques';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopBoutiquesProps {
  onNavigate: (page: Page) => void;
  onSelectBoutique: (name: string) => void;
}

export default function DesktopBoutiques({ onNavigate, onSelectBoutique }: DesktopBoutiquesProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-8 py-16 text-center">
          <Store className="w-10 h-10 mx-auto mb-4 text-gray-400" strokeWidth={1.5} />
          <h1 className="text-4xl font-light tracking-wide text-black mb-3">Our Boutiques</h1>
          <p className="text-gray-500 text-sm max-w-lg mx-auto">
            Discover curated collections from Saudi Arabia's finest designers and boutiques
          </p>
        </div>
      </div>

      {/* Boutiques Grid */}
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="grid grid-cols-2 gap-8">
          {boutiques.map((boutique) => {
            const dresses = getDressesByBoutique(boutique.name);
            const initials = getBoutiqueInitials(boutique.name);

            return (
              <div
                key={boutique.name}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onSelectBoutique(boutique.name)}
              >
                {/* Dress Preview Strip */}
                <div className="flex h-40 bg-gray-100">
                  {dresses.slice(0, 3).map((dress, i) => (
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
                      <div className="flex-1 flex items-center justify-center text-gray-300 text-sm">
                        No dresses yet
                      </div>
                    )
                  )}
                </div>

                {/* Boutique Info */}
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {boutique.image_url ? (
                      <img
                        src={boutique.image_url}
                        alt={boutique.name}
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {initials}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-medium text-black truncate">{boutique.name}</h2>
                        {boutique.verified && (
                          <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-black">{boutique.rating}</span>
                          <span>({boutique.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{boutique.location}</span>
                        </div>
                        <span>{dresses.length} dresses</span>
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{boutique.description}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        {boutique.specialties.map((s) => (
                          <span key={s} className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-5 border-t border-gray-100 flex justify-end">
                    <span className="text-sm text-gray-400 group-hover:text-black transition-colors flex items-center gap-1">
                      View Collection <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

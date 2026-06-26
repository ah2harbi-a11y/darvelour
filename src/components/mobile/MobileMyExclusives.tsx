import { Crown, Calendar, MapPin, X } from 'lucide-react';
import { Page, Exclusive } from '../../App';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileMyExclusivesProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  exclusives: Exclusive[];
  onCancelExclusivity: (id: number) => void;
}

export default function MobileMyExclusives({ onNavigate, onGoBack, wishlistItems, exclusives, onCancelExclusivity }: MobileMyExclusivesProps) {
  const activeExclusives = exclusives.filter(e => e.status === 'active');

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="My Exclusives"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Info Banner */}
        <div className="p-4 bg-black text-white">
          <div className="flex items-start gap-3">
            <Crown className="w-5 h-5 flex-shrink-0 mt-0.5 text-yellow-400" />
            <div>
              <p className="text-sm font-semibold mb-1">Exclusivity Guarantee</p>
              <p className="text-xs opacity-80">No one else will wear the same dress at your event</p>
            </div>
          </div>
        </div>

        {activeExclusives.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
            <Crown className="w-14 h-14 text-gray-300 mb-4" />
            <h3 className="text-lg font-bold mb-2">No Exclusive Dresses Yet</h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              Make a dress exclusive for your special event — no one else will wear the same dress at your venue
            </p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-black text-white px-8 py-3 rounded-lg text-sm font-bold"
            >
              Browse Dresses
            </button>
          </div>
        ) : (
          <>
            <div className="p-4 space-y-3">
              {activeExclusives.map((item) => (
                <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="flex gap-3 p-4">
                    <div className="w-20 h-28 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={getDressImage(item.dress_id)}
                        alt={item.dressName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-sm font-medium text-black pr-2">{item.dressName}</h3>
                        <div className="px-2 py-0.5 text-[9px] font-bold rounded bg-green-100 text-green-700">
                          Active
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(item.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{item.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 flex gap-2">
                    <div className="flex-1 flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
                      <Crown className="w-3.5 h-3.5 text-yellow-600" />
                      <span className="font-medium">{item.occasion}</span>
                    </div>
                    <button
                      onClick={() => onCancelExclusivity(item.id)}
                      className="flex items-center gap-1.5 px-3 py-2 border border-red-200 rounded-lg text-xs font-medium text-red-600"
                    >
                      <X className="w-3.5 h-3.5" />
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4">
              <button
                onClick={() => onNavigate('search')}
                className="w-full bg-black text-white py-3.5 rounded-lg flex items-center justify-center gap-2 font-medium text-sm"
              >
                <Crown className="w-4 h-4" />
                Make Another Dress Exclusive
              </button>
            </div>
          </>
        )}
      </main>

      <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

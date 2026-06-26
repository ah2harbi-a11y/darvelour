import { Crown, Check } from 'lucide-react';
import { Page, Exclusive } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileExclusivityConfirmationProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  exclusives: Exclusive[];
}

export default function MobileExclusivityConfirmation({ onNavigate, onGoBack, wishlistItems, exclusives }: MobileExclusivityConfirmationProps) {
  const latest = exclusives.find(e => e.status === 'active');

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Exclusivity Service"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Success Icon */}
        <div className="flex justify-center pt-16 pb-8">
          <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="text-center px-6 mb-8">
          <h1 className="text-2xl text-black mb-3">Exclusivity Confirmed!</h1>
          <p className="text-sm text-gray-500">
            Your dress is exclusively reserved for your event
          </p>
        </div>

        {/* Event Details Card */}
        {latest && (
          <div className="px-4 mb-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="mb-4 pb-4 border-b border-gray-200">
                <p className="text-xs text-gray-400 mb-1 tracking-wide">DRESS</p>
                <p className="text-sm text-black font-medium">{latest.dressName}</p>
                <p className="text-xs text-gray-500">{latest.boutique}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-xs text-gray-400 mb-2 tracking-wide">EVENT DATE</p>
                  <p className="text-sm text-black font-medium">
                    {new Date(latest.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-2 tracking-wide">OCCASION</p>
                  <p className="text-sm text-black font-medium">{latest.occasion}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-gray-400 mb-2 tracking-wide">VENUE</p>
                <p className="text-sm text-black font-medium">{latest.venue}</p>
              </div>

              {/* Guarantee Badge */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-3">
                <Crown className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm text-black font-medium mb-1">Full Exclusivity Guarantee</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    No one else will wear this dress at {latest.venue} on this date
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="px-4 space-y-3">
          <button
            onClick={() => onNavigate('my-exclusives')}
            className="w-full bg-gray-800 text-white py-4 rounded-lg text-sm font-medium"
          >
            View My Exclusives
          </button>
          <button
            onClick={() => onNavigate('search')}
            className="w-full bg-white text-black border border-gray-300 py-4 rounded-lg text-sm font-medium"
          >
            Continue Shopping
          </button>
        </div>
      </main>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

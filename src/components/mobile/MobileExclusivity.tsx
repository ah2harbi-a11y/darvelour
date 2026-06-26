import { Calendar, MapPin, Crown } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import { getDressById } from '../../data/dresses';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileExclusivityProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  dressId?: number | null;
  onRequestExclusivity: (data: { dress_id: number; event_name: string; event_date: string; venue: string; occasion: string }) => Promise<void>;
}

export default function MobileExclusivity({ onNavigate, onGoBack, wishlistItems, dressId, onRequestExclusivity }: MobileExclusivityProps) {
  const [eventDate, setEventDate] = useState('');
  const [venueName, setVenueName] = useState('');
  const [occasionType, setOccasionType] = useState('Wedding');
  const [eventName, setEventName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const dress = getDressById(dressId || 1);

  const handleSubmit = async () => {
    if (!eventDate || !venueName) {
      setError('Please fill in event date and venue');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      await onRequestExclusivity({
        dress_id: dressId || 1,
        event_name: eventName || occasionType,
        event_date: eventDate,
        venue: venueName,
        occasion: occasionType,
      });
      onNavigate('exclusivity-confirmation');
    } catch {
      setError('Failed to request exclusivity. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title=""
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Header Section */}
        <div className="px-6 pt-12 pb-10 bg-white text-center border-b border-gray-200">
          <div className="flex justify-center mb-6">
            <Crown className="w-12 h-12 text-gray-400" strokeWidth={1} />
          </div>
          <h1 className="text-2xl text-black mb-4">
            Guarantee Your Moment
          </h1>
          <p className="text-sm text-gray-600 leading-relaxed px-4">
            Ensure no one else wears your chosen dress to the same event
          </p>
        </div>

        {/* Selected Dress */}
        {dress && (
          <div className="px-4 pt-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4 flex gap-3">
              <div className="w-16 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback src={getDressImage(dressId || 1)} alt={dress.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs text-gray-500">{dress.boutique}</div>
                <div className="text-sm font-medium text-black">{dress.name}</div>
                <div className="text-sm text-black">SAR {dress.price.toLocaleString()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Form Section */}
        <div className="p-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-sm text-black font-medium mb-6">Event Details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs text-gray-500 mb-2 tracking-wide">EVENT DATE</label>
                <div className="relative">
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 tracking-wide">VENUE NAME</label>
                <div className="relative">
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                    placeholder="e.g., Four Seasons Riyadh"
                  />
                  <MapPin className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 tracking-wide">OCCASION TYPE</label>
                <select
                  value={occasionType}
                  onChange={(e) => setOccasionType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800 appearance-none"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Eid Celebration">Eid Celebration</option>
                  <option value="Gala Event">Gala Event</option>
                  <option value="Formal Event">Formal Event</option>
                  <option value="Private Gathering">Private Gathering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 tracking-wide">EVENT NAME (OPTIONAL)</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                  placeholder="e.g., Annual Gala Dinner"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-gray-800 text-white py-4 rounded-lg text-sm font-medium mt-2 disabled:opacity-50"
              >
                {submitting ? 'Confirming...' : 'Confirm Exclusivity'}
              </button>
            </div>
          </div>
        </div>
      </main>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

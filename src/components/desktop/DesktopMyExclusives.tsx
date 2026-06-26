import { Crown, Calendar, MapPin, X } from 'lucide-react';
import { Page, Exclusive } from '../../App';
import { useState } from 'react';
import { getDressImage } from '../../data/dressImages';
import { getDressById } from '../../data/dresses';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopMyExclusivesProps {
  onNavigate: (page: Page) => void;
  exclusives: Exclusive[];
  onCancelExclusivity: (id: number) => void;
  onRequestExclusivity: (data: { dress_id: number; event_name: string; event_date: string; venue: string; occasion: string }) => Promise<void>;
  dressId?: number | null;
}

export default function DesktopMyExclusives({ onNavigate, exclusives, onCancelExclusivity, onRequestExclusivity, dressId }: DesktopMyExclusivesProps) {
  const [showForm, setShowForm] = useState(!!dressId);
  const [eventDate, setEventDate] = useState('');
  const [venue, setVenue] = useState('');
  const [occasion, setOccasion] = useState('Wedding');
  const [eventName, setEventName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formDressId, setFormDressId] = useState(dressId || 1);

  const selectedDress = getDressById(formDressId);
  const activeExclusives = exclusives.filter(e => e.status === 'active');

  const handleSubmit = async () => {
    if (!eventDate || !venue) return;
    setSubmitting(true);
    await onRequestExclusivity({
      dress_id: formDressId,
      event_name: eventName || occasion,
      event_date: eventDate,
      venue,
      occasion,
    });
    setSubmitting(false);
    setShowForm(false);
    setEventDate('');
    setVenue('');
    setEventName('');
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <Crown className="w-10 h-10 text-gold" />
            <h1 className="heading-serif text-4xl font-light text-charcoal">Exclusivity Service</h1>
          </div>
          {!showForm && (
            <button
              onClick={() => { setShowForm(true); setFormDressId(1); }}
              className="px-6 py-3 bg-charcoal text-ivory rounded-sm hover:bg-charcoal/90 luxury-transition text-sm tracking-wide"
            >
              Request Exclusivity
            </button>
          )}
        </div>

        {/* Request Form */}
        {showForm && (
          <div className="bg-white border border-warm-grey-lighter rounded-sm p-8 mb-10 luxury-shadow">
            <h2 className="heading-serif text-2xl font-light text-charcoal mb-2">Request Exclusivity</h2>
            <p className="text-warm-grey font-light mb-8">Guarantee no one else wears your dress at your event</p>

            {selectedDress && (
              <div className="flex items-center gap-4 bg-ivory-dark border border-warm-grey-lighter rounded-sm p-4 mb-8">
                <div className="w-16 h-20 rounded-sm overflow-hidden flex-shrink-0">
                  <ImageWithFallback src={getDressImage(formDressId)} alt={selectedDress.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="text-xs text-warm-grey tracking-wide">{selectedDress.boutique}</div>
                  <div className="font-medium text-charcoal">{selectedDress.name}</div>
                  <div className="text-sm text-charcoal">SAR {selectedDress.price.toLocaleString()}</div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">EVENT DATE</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">VENUE NAME</label>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g., Ritz-Carlton Riyadh"
                  className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none placeholder:text-charcoal/30"
                />
              </div>
              <div>
                <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">OCCASION TYPE</label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none"
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
                <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">EVENT NAME (OPTIONAL)</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g., Annual Gala Dinner"
                  className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none placeholder:text-charcoal/30"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={submitting || !eventDate || !venue}
                className="px-10 py-4 bg-charcoal text-ivory text-xs tracking-[0.2em] uppercase font-light hover:bg-charcoal/90 disabled:opacity-50 luxury-transition"
              >
                {submitting ? 'Confirming...' : 'Confirm Exclusivity'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-8 py-4 border border-charcoal/20 text-charcoal text-xs tracking-[0.2em] uppercase font-light hover:border-charcoal/40 luxury-transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Active Exclusives List */}
        {activeExclusives.length > 0 && (
          <>
            <h2 className="heading-serif text-2xl font-light text-charcoal mb-6">My Exclusive Dresses</h2>
            <div className="space-y-6">
              {activeExclusives.map((item) => (
                <div key={item.id} className="border border-warm-grey-lighter rounded-sm p-6 hover:border-emerald luxury-transition bg-white luxury-shadow">
                  <div className="flex gap-6">
                    <div className="w-48 aspect-[3/4] bg-ivory-dark rounded-sm flex-shrink-0 border border-warm-grey-lighter overflow-hidden">
                      <ImageWithFallback
                        src={getDressImage(item.dress_id)}
                        alt={item.dressName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="text-xs text-warm-grey mb-1 tracking-wide font-light">{item.boutique}</div>
                          <h3 className="heading-serif text-2xl mb-2 font-light text-charcoal">{item.dressName}</h3>
                          <div className="text-xl font-medium text-charcoal mb-4">SAR {item.price.toLocaleString()}</div>
                        </div>
                        <div className="bg-emerald-subtle text-emerald px-4 py-2 rounded-sm text-sm tracking-wide">
                          Active
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-warm-grey mb-1 font-light">
                            <Calendar className="w-4 h-4" />
                            <span>Event Date</span>
                          </div>
                          <div className="font-medium text-charcoal">
                            {new Date(item.event_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm text-warm-grey mb-1 font-light">
                            <MapPin className="w-4 h-4" />
                            <span>Venue</span>
                          </div>
                          <div className="font-medium text-charcoal">{item.venue}</div>
                        </div>
                        <div>
                          <div className="text-sm text-warm-grey mb-1 font-light">Occasion</div>
                          <div className="font-medium text-charcoal">{item.occasion}</div>
                        </div>
                      </div>

                      <div className="bg-gold-subtle border border-gold/20 rounded-sm p-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Crown className="w-5 h-5 text-gold" />
                          <span className="font-medium text-charcoal">Exclusivity Guarantee Active</span>
                        </div>
                        <div className="text-sm text-warm-grey mt-1 font-light">
                          No one else will wear this dress at {item.venue} on this date
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => onCancelExclusivity(item.id)}
                          className="px-6 py-3 border border-destructive/30 text-destructive rounded-sm hover:bg-destructive/10 luxury-transition flex items-center gap-2 tracking-wide"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel Exclusivity</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeExclusives.length === 0 && !showForm && (
          <div className="text-center py-16">
            <Crown className="w-16 h-16 mx-auto mb-4 text-warm-grey-light" />
            <h3 className="heading-serif text-2xl mb-2 font-light text-charcoal">No Exclusive Dresses Yet</h3>
            <p className="text-warm-grey mb-6 font-light">
              Make a dress exclusive for your special event — no one else will wear the same dress at your venue
            </p>
            <button
              onClick={() => onNavigate('search')}
              className="px-8 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide"
            >
              Browse Dresses
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

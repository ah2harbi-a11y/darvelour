import { ArrowRight, Sparkles, Crown, Heart, ShoppingBag, Star, Gem, Moon, Briefcase, Shirt } from 'lucide-react';
import { Page } from '../../App';
import { allDresses as sharedDresses } from '../../data/dresses';
import { dressImages } from '../../data/dressImages';
import heroImage from 'figma:asset/3b07a640d3edd73cf19e48fc367accfe559f0d8c.png';
import exclusivityImage from 'figma:asset/99edf045592c37d9aecc6013879901aef3f534a1.png';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopHomeProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onAddToCart: (dressId?: number) => void;
  onAddToWishlist: (dressId?: number) => void;
}

export default function DesktopHome({ onNavigate, onAddToCart, onAddToWishlist }: DesktopHomeProps) {
  const dresses = [...sharedDresses].sort((a, b) => b.id - a.id).map((d, i) => ({
    ...d,
    expressDelivery: d.express,
    exclusive: i % 3 === 0,
    image: d.image_url || dressImages[i % dressImages.length],
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-ivory">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-2 min-h-[85vh]">
            {/* Left Column - Text Content */}
            <div className="flex items-center px-20 py-32">
              <div className="max-w-[560px]">
                {/* Eyebrow */}
                <div className="mb-12">
                  <span className="text-[11px] tracking-[0.15em] uppercase text-warm-grey font-light">
                    SPRING COLLECTION 2026
                  </span>
                </div>

                {/* Main Headline */}
                <div className="mb-12">
                  <h1 className="heading-serif text-charcoal">
                    {/* Line 1: Where */}
                    <div 
                      className="text-warm-grey/90"
                      style={{ 
                        fontSize: '1.75rem',
                        fontWeight: 300,
                        letterSpacing: '0.12em',
                        lineHeight: '1',
                        marginBottom: '1rem'
                      }}
                    >
                      Where
                    </div>
                    
                    {/* Line 2: Elegance */}
                    <div 
                      className="text-warm-grey"
                      style={{ 
                        fontSize: '6.5rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: '0.95',
                        marginBottom: '0.75rem'
                      }}
                    >
                      Elegance
                    </div>
                    
                    {/* Line 3: Is Decided. */}
                    <div 
                      className="text-charcoal"
                      style={{ 
                        fontSize: '6rem',
                        fontWeight: 500,
                        letterSpacing: '-0.01em',
                        lineHeight: '1'
                      }}
                    >
                      Is Decided.
                    </div>
                  </h1>
                </div>

                {/* Subheadline - Editorial Caption */}
                <p 
                  className="text-warm-grey/85 mb-24"
                  style={{ 
                    fontSize: '0.9375rem',
                    fontWeight: 300,
                    letterSpacing: '0.025em',
                    lineHeight: '1.85',
                    maxWidth: '460px'
                  }}
                >
                  Curated across Saudi Arabia — delivered with precision.
                </p>

                {/* CTAs */}
                <div className="flex items-center gap-8 mb-10">
                  <button 
                    onClick={() => onNavigate('search')}
                    className="px-12 py-3.5 border border-charcoal/30 text-charcoal rounded-sm hover:border-charcoal hover:bg-charcoal/5"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Explore Collection
                  </button>
                  <button 
                    onClick={() => onNavigate('exclusivity')}
                    className="px-12 py-3.5 border border-charcoal/30 text-charcoal rounded-sm hover:border-charcoal hover:bg-charcoal/5"
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      letterSpacing: '0.04em',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Exclusivity Service
                  </button>
                </div>

                {/* Trust Line */}
                <div className="flex items-center gap-4 text-warm-grey">
                  <span style={{ fontSize: '9pt', letterSpacing: '0.3em' }}>Express delivery</span>
                  <span className="text-warm-grey-lighter" style={{ fontSize: '9pt' }}>•</span>
                  <span style={{ fontSize: '9pt', letterSpacing: '0.3em' }}>Flexible returns</span>
                  <span className="text-warm-grey-lighter" style={{ fontSize: '9pt' }}>•</span>
                  <span style={{ fontSize: '9pt', letterSpacing: '0.3em' }}>Curated selection</span>
                </div>
              </div>
            </div>

            {/* Right Column - Editorial Image */}
            <div className="relative bg-warm-grey-lighter/20">
              <img 
                src={heroImage} 
                alt="Sculptural couture gown" 
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Shop by Occasion */}
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div style={{ height: '0.5px', width: '64px', backgroundColor: '#C5A059', opacity: 0.4 }}></div>
            <span className="text-[10px] tracking-[0.15em] uppercase text-warm-grey font-light">
              CURATED BY OCCASION
            </span>
            <div style={{ height: '0.5px', width: '64px', backgroundColor: '#C5A059', opacity: 0.4 }}></div>
          </div>
          <h2 className="heading-serif text-4xl font-light text-charcoal mb-3">Shop by Occasion</h2>
          <p className="text-warm-grey text-sm font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
            Curated looks for every moment that matters
          </p>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {[
            { id: 'wedding', name: 'Wedding', count: 89, emoji: '💍' },
            { id: 'evening', name: 'Evening Soirée', count: 67, emoji: '🌙' },
            { id: 'business', name: 'Business Elegance', count: 45, emoji: '💼' },
            { id: 'casual', name: 'Refined Casual', count: 58, emoji: '👗' },
          ].map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => onNavigate('search')}
              className="group relative aspect-[3/4] bg-white border border-warm-grey-lighter rounded-sm overflow-hidden hover:border-gold/40 cursor-pointer"
              style={{ transition: 'all 0.3s ease' }}
            >
              {/* Minimal background */}
              <div className="absolute inset-0 bg-gradient-to-b from-ivory/50 to-white"></div>
              
              {/* Emoji centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-8xl opacity-40 group-hover:opacity-60 group-hover:scale-110" 
                  style={{ 
                    transition: 'all 0.3s ease',
                    filter: 'grayscale(0.3)',
                  }}
                >
                  {occasion.emoji}
                </span>
              </div>
              
              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-8 text-center">
                <h3 className="heading-serif text-2xl mb-2 font-light text-charcoal group-hover:text-gold" style={{ letterSpacing: '-0.01em', transition: 'color 0.3s ease' }}>
                  {occasion.name}
                </h3>
                <div className="text-[10px] text-warm-grey tracking-[0.15em] uppercase font-light">
                  {occasion.count} SELECTIONS
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Stylist Picks */}
      <div className="bg-ivory">
        <div className="max-w-[1400px] mx-auto px-8 py-24">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-gold" strokeWidth={1.5} />
              </div>
              <h2 className="heading-serif text-4xl font-light text-charcoal mb-3">AI Stylist Recommendations</h2>
              <p className="text-warm-grey font-light max-w-xl" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                Stylist-level picks based on your event, silhouette, and modesty preference.
              </p>
            </div>
            <button 
              onClick={() => onNavigate('ai-stylist')}
              className="flex items-center gap-2 text-emerald hover:text-emerald-light luxury-transition tracking-wide"
              style={{
                fontSize: '0.9375rem',
                fontWeight: 400,
              }}
            >
              <span>Start Styling Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-8">
            {dresses.slice(0, 4).map((dress) => (
              <div key={dress.id} className="group bg-white rounded-sm overflow-hidden luxury-shadow hover:luxury-shadow luxury-transition">
                <div 
                  className="relative aspect-[3/4] bg-ivory-dark flex items-center justify-center cursor-pointer overflow-hidden"
                  onClick={() => onNavigate('dress-detail', dress.id)}
                >
                  <ImageWithFallback src={dress.image} alt={dress.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3 bg-gold/90 text-white px-3 py-1 rounded-sm text-xs tracking-wide backdrop-blur-sm">
                    Express
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/20 group-hover:to-black/5 luxury-transition" />
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 luxury-transition">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(dress.id);
                      }}
                      className="flex-1 bg-emerald text-ivory py-2.5 rounded-sm text-xs tracking-wide hover:bg-emerald-light luxury-transition flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToWishlist(dress.id);
                      }}
                      className="bg-white text-charcoal p-2.5 rounded-sm hover:bg-ivory luxury-transition"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div
                  className="p-5 cursor-pointer"
                  onClick={() => onNavigate('dress-detail', dress.id)}
                >
                  <div className="text-xs text-warm-grey mb-2 tracking-wide font-light">{dress.boutique}</div>
                  <h3 className="font-medium mb-3 text-charcoal leading-snug group-hover:text-emerald luxury-transition">{dress.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-charcoal tracking-wide">SAR {dress.price.toLocaleString()}</div>
                    <div className="flex items-center gap-1 text-xs text-warm-grey">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      <span>{dress.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exclusivity Feature - Ultra-Luxury Editorial */}
      <div className="bg-deep-charcoal text-ivory film-grain relative overflow-hidden" style={{ marginTop: '60px' }}>
        <div className="max-w-[1920px] mx-auto" style={{ padding: '120px' }}>
          <div className="grid items-center" style={{ gridTemplateColumns: '40fr 60fr', gap: '120px' }}>
            {/* Left Column - 40% - Premium Visual */}
            <div className="overflow-hidden relative" style={{ aspectRatio: '4/4.8', transform: 'translateY(-28px)' }}>
              <img 
                src={exclusivityImage}
                alt="Exclusivity"
                className="w-full h-full object-cover"
                style={{ 
                  filter: 'brightness(0.58) contrast(1.2) saturate(0.75)',
                  objectPosition: 'center'
                }}
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div 
                className="absolute inset-0" 
                style={{ 
                  background: 'radial-gradient(circle at center, transparent 30%, rgba(13,13,13,0.65) 100%)' 
                }}
              ></div>
            </div>

            {/* Right Column - 60% - Editorial Content */}
            <div style={{ paddingTop: '0px', transform: 'translateY(-100px)' }}>
              {/* Eyebrow Label */}
              <div className="mb-16">
                <span 
                  className="text-luxury-gold font-light uppercase"
                  style={{ 
                    fontSize: '0.6875rem',
                    letterSpacing: '0.15em',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Premium Service
                </span>
              </div>

              {/* Headline - Playfair Display */}
              <div style={{ marginBottom: '144px' }}>
                <h2 
                  className="text-ivory leading-none"
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '5.5rem',
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    lineHeight: '1',
                    maxWidth: '720px'
                  }}
                >
                  Exclusivity, Decided.
                </h2>
              </div>

              {/* Subheadline - Inter */}
              <p 
                className="text-warm-grey-light/75 mb-32"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.125rem',
                  fontWeight: 300,
                  letterSpacing: '0.01em',
                  lineHeight: '1.8',
                  maxWidth: '560px'
                }}
              >
                Your dress. Your moment. Never repeated.
              </p>

              {/* Feature List - Minimal text blocks with gold dividers */}
              <div style={{ maxWidth: '640px', marginBottom: '216px' }}>
                {[
                  { text: 'Event-specific dress reservation', priority: 'high' },
                  { text: 'Venue and date verification', priority: 'high' },
                  { text: 'Digital certificate of exclusivity', priority: 'low' },
                  { text: 'Peace-of-mind guarantee', priority: 'low' }
                ].map((feature, i, arr) => (
                  <div key={i}>
                    <div style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>
                      <span 
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '0.8125rem',
                          fontWeight: 400,
                          lineHeight: '2.3',
                          letterSpacing: '0.015em',
                          color: feature.priority === 'high' ? 'rgba(217, 217, 215, 1)' : 'rgba(217, 217, 215, 0.75)'
                        }}
                      >
                        {feature.text}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{ paddingTop: '14px', paddingBottom: '26px' }}>
                        <div 
                          style={{ 
                            height: '0.5px',
                            width: '52%',
                            backgroundColor: '#C5A059',
                            opacity: 0.35
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Ghost Button CTA */}
              <div style={{ marginLeft: '-4px' }}>
                <button 
                  onClick={() => onNavigate('exclusivity')}
                  className="ghost-button"
                >
                  Request Exclusivity
                </button>
                <p 
                  className="text-warm-grey/40 mt-6"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 300,
                    letterSpacing: '0.03em'
                  }}
                >
                  Availability subject to verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrivals */}
      <div className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div style={{ height: '0.5px', width: '48px', backgroundColor: '#C5A059', opacity: 0.4 }}></div>
              <span className="text-xs text-warm-grey tracking-[0.15em] uppercase">Latest Additions</span>
            </div>
            <h2 className="heading-serif text-4xl font-light text-charcoal">New Arrivals</h2>
            <p className="text-warm-grey mt-2 font-light">Fresh from our partner boutiques</p>
          </div>
          <button 
            onClick={() => onNavigate('search')}
            className="flex items-center gap-2 text-emerald hover:text-emerald-light luxury-transition"
          >
            <span className="tracking-wide">View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {dresses.slice(4, 12).map((dress) => (
            <div key={dress.id} className="group bg-white rounded-sm overflow-hidden luxury-shadow hover:luxury-shadow luxury-transition">
              <div 
                className="relative aspect-[3/4] bg-ivory-dark flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => onNavigate('dress-detail', dress.id)}
              >
                <ImageWithFallback src={dress.image} alt={dress.name} className="w-full h-full object-cover" />
                {dress.exclusive && (
                  <div className="absolute top-3 left-3 border border-gold text-gold px-3 py-1 rounded-sm text-xs tracking-wide backdrop-blur-sm bg-white/80 flex items-center gap-1">
                    <Crown className="w-3 h-3" />
                    <span>Exclusive</span>
                  </div>
                )}
                {dress.expressDelivery && (
                  <div className="absolute top-3 right-3 bg-emerald text-ivory px-3 py-1 rounded-sm text-xs tracking-wide">
                    Express
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/20 group-hover:to-black/5 luxury-transition" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 luxury-transition">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(dress.id);
                    }}
                    className="flex-1 bg-emerald text-ivory py-2.5 rounded-sm text-xs tracking-wide hover:bg-emerald-light luxury-transition flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToWishlist(dress.id);
                    }}
                    className="bg-white text-charcoal p-2.5 rounded-sm hover:bg-ivory luxury-transition"
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div
                className="p-5 cursor-pointer"
                onClick={() => onNavigate('dress-detail', dress.id)}
              >
                <div className="text-xs text-warm-grey mb-2 tracking-wide font-light">{dress.boutique}</div>
                <h3 className="font-medium mb-3 text-charcoal leading-snug group-hover:text-emerald luxury-transition">{dress.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-charcoal tracking-wide">SAR {dress.price.toLocaleString()}</div>
                  <div className="flex items-center gap-1 text-xs text-warm-grey">
                    <Star className="w-3 h-3 fill-gold text-gold" />
                    <span>{dress.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Features */}
      <div className="bg-ivory-dark border-y border-warm-grey-lighter">
        <div className="max-w-[1400px] mx-auto px-8 py-16">
          <div className="grid grid-cols-3 gap-16">
            <div className="text-center">
              <div style={{ height: '0.5px', width: '48px', backgroundColor: '#C5A059', opacity: 0.4 }} className="mx-auto mb-6"></div>
              <h3 className="heading-serif text-xl mb-3 font-light text-charcoal">Express Delivery</h3>
              <p className="text-sm text-warm-grey font-light leading-relaxed">2–3 hours in Riyadh. Same-day in Jeddah & Dammam.</p>
            </div>
            <div className="text-center">
              <div style={{ height: '0.5px', width: '48px', backgroundColor: '#C5A059', opacity: 0.4 }} className="mx-auto mb-6"></div>
              <h3 className="heading-serif text-xl mb-3 font-light text-charcoal">Flexible Returns</h3>
              <p className="text-sm text-warm-grey font-light leading-relaxed">Complimentary returns within 14 days</p>
            </div>
            <div className="text-center">
              <div style={{ height: '0.5px', width: '48px', backgroundColor: '#C5A059', opacity: 0.4 }} className="mx-auto mb-6"></div>
              <h3 className="heading-serif text-xl mb-3 font-light text-charcoal">Curated Selection</h3>
              <p className="text-sm text-warm-grey font-light leading-relaxed">Every piece selected for authority, quality, and elegance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
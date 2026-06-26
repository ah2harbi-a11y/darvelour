import { SlidersHorizontal, Grid, List, Heart, ShoppingBag, Sparkles, Star } from 'lucide-react';
import { Page } from '../../App';
import { allDresses as sharedDresses } from '../../data/dresses';
import { dressImages } from '../../data/dressImages';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { BoutiqueTile, boutiqueIdentities } from '../BoutiqueTile';

interface DesktopSearchProps {
  onNavigate: (page: Page, dressId?: number) => void;
  onAddToCart: (dressId?: number) => void;
  onAddToWishlist: (dressId?: number) => void;
}

export default function DesktopSearch({ onNavigate, onAddToCart, onAddToWishlist }: DesktopSearchProps) {
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedOccasion, setSelectedOccasion] = useState('all');
  const [priceRange, setPriceRange] = useState([1000, 100000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const allDresses = [...sharedDresses].sort((a, b) => b.id - a.id).map((d, i) => ({
    ...d,
    aiMatch: 85 + (i % 15),
    expressDelivery: d.express,
    occasion: ['wedding', 'evening', 'business', 'casual'][i % 4],
    image: d.image_url || dressImages[i % dressImages.length],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'].slice(i % 3, (i % 3) + 4),
    colors: [
      ['Midnight', 'Ivory'],
      ['Burgundy', 'Navy'],
      ['Emerald', 'Champagne'],
      ['Blush', 'Gold'],
      ['Midnight', 'Burgundy'],
      ['Navy', 'Ivory']
    ][i % 6],
  }));

  const occasions = [
    { id: 'all', icon: '✨', name: 'All Dresses', count: 234 },
    { id: 'wedding', icon: '💍', name: 'Wedding', count: 89 },
    { id: 'evening', icon: '🌙', name: 'Evening', count: 67 },
    { id: 'business', icon: '💼', name: 'Business', count: 45 },
    { id: 'casual', icon: '👗', name: 'Casual', count: 33 },
  ];

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const filteredDresses = allDresses.filter(dress => {
    if (selectedOccasion !== 'all' && dress.occasion !== selectedOccasion) return false;
    if (dress.price < priceRange[0] || dress.price > priceRange[1]) return false;
    
    // Size filter - dress must have at least one of the selected sizes
    if (selectedSizes.length > 0) {
      const hasMatchingSize = selectedSizes.some(size => dress.sizes.includes(size));
      if (!hasMatchingSize) return false;
    }
    
    // Color filter - dress must have at least one of the selected colors
    if (selectedColors.length > 0) {
      const hasMatchingColor = selectedColors.some(color => dress.colors.includes(color));
      if (!hasMatchingColor) return false;
    }
    
    return true;
  });

  // Pagination
  const perPage = 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredDresses.length / perPage));
  // Keep the page in range when filters shrink the result set.
  useEffect(() => { if (page > totalPages) setPage(1); }, [totalPages, page]);
  // Reset to the first page whenever the filters change.
  useEffect(() => { setPage(1); }, [selectedOccasion, priceRange, selectedSizes, selectedColors]);
  const pageDresses = filteredDresses.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-[1600px] mx-auto px-8 py-16">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="heading-serif text-charcoal mb-2" style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '-0.01em' }}>Shop Dresses</h1>
            <p className="text-warm-grey font-light" style={{ fontSize: '0.875rem' }}>{filteredDresses.length} dresses found</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-5 py-2.5 border border-warm-grey-lighter text-charcoal rounded-sm hover:border-emerald luxury-transition"
              style={{ fontSize: '0.875rem', letterSpacing: '0.01em' }}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="flex items-center gap-0 border border-warm-grey-lighter rounded-sm overflow-hidden bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 luxury-transition ${
                  viewMode === 'grid' 
                    ? 'bg-emerald text-ivory' 
                    : 'hover:bg-ivory-dark text-charcoal'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 luxury-transition ${
                  viewMode === 'list' 
                    ? 'bg-emerald text-ivory' 
                    : 'hover:bg-ivory-dark text-charcoal'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Occasion Filter Tabs */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {occasions.map((occasion) => (
            <button
              key={occasion.id}
              onClick={() => setSelectedOccasion(occasion.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-sm border luxury-transition tracking-wide ${
                selectedOccasion === occasion.id
                  ? 'bg-emerald text-ivory border-emerald'
                  : 'border-warm-grey-lighter text-charcoal hover:border-emerald bg-white'
              }`}
            >
              <span>{occasion.icon}</span>
              <span>{occasion.name}</span>
              <span className={`text-sm ${selectedOccasion === occasion.id ? 'text-ivory/70' : 'text-warm-grey'}`}>
                ({occasion.count})
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar - Editorial Refinement Panel */}
          {showFilters && (
            <div className="w-80 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* AI Stylist Context - Subtle psychological anchor */}
                <div className="text-xs text-warm-grey font-light tracking-wide">
                  Refined by your AI Stylist preferences
                </div>

                {/* Price Range - Muted luxury slider */}
                <div className="pb-8 border-b border-champagne/50">
                  <h3 className="text-xs mb-6 tracking-widest uppercase text-charcoal font-light">Price Range</h3>
                  <div className="space-y-5 px-1">
                    <input
                      type="range"
                      min="1000"
                      max="100000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([1000, parseInt(e.target.value)])}
                      className="w-full h-1 bg-champagne/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-charcoal [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-charcoal [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #2A2A2A 0%, #2A2A2A ${((priceRange[1] - 1000) / 99000) * 100}%, rgba(212, 197, 176, 0.2) ${((priceRange[1] - 1000) / 99000) * 100}%, rgba(212, 197, 176, 0.2) 100%)`
                      }}
                    />
                    <div className="flex items-center justify-between text-sm text-charcoal font-light">
                      <span>SAR {priceRange[0].toLocaleString()}</span>
                      <span>SAR {priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Sizes - Clean grid */}
                <div className="pb-8 border-b border-warm-grey-lighter/40">
                  <h3 className="text-xs mb-6 tracking-widest uppercase text-charcoal font-light">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`py-2.5 rounded-sm font-light text-sm luxury-transition ${
                          selectedSizes.includes(size)
                            ? 'bg-charcoal/10 text-charcoal border border-charcoal/40'
                            : 'border border-warm-grey-lighter text-charcoal/70 hover:text-charcoal hover:border-charcoal/30 hover:bg-charcoal/5'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors - Refined swatches with hover labels */}
                <div className="pb-8 border-b border-warm-grey-lighter/40">
                  <h3 className="text-xs mb-6 tracking-widest uppercase text-charcoal font-light">Color</h3>
                  <div className="grid grid-cols-4 gap-3 mb-2">
                    {[
                      { name: 'Midnight', class: 'bg-charcoal' },
                      { name: 'Ivory', class: 'bg-white border border-warm-grey-lighter/60' },
                      { name: 'Navy', class: 'bg-blue-900' },
                      { name: 'Champagne', class: 'bg-amber-100' },
                      { name: 'Burgundy', class: 'bg-red-900' },
                      { name: 'Emerald', class: 'bg-emerald' },
                      { name: 'Blush', class: 'bg-pink-300' },
                      { name: 'Gold', class: 'bg-gold' },
                    ].map((color) => (
                      <div key={color.name} className="relative group flex flex-col items-center">
                        <button
                          onClick={() => toggleColor(color.name)}
                          className={`w-12 h-12 rounded-full ${color.class} luxury-transition ${
                            selectedColors.includes(color.name)
                              ? 'ring-2 ring-charcoal/30 ring-offset-2'
                              : 'hover:ring-2 hover:ring-charcoal/15 hover:ring-offset-2'
                          }`}
                        />
                        {/* Elegant hover/active label */}
                        <div className={`mt-2 text-[10px] font-light tracking-wide whitespace-nowrap luxury-transition ${
                          selectedColors.includes(color.name) 
                            ? 'text-charcoal opacity-100' 
                            : 'text-warm-grey opacity-0 group-hover:opacity-100'
                        }`}>
                          {color.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features - Curated, prioritized */}
                <div className="pb-8 border-b border-warm-grey-lighter/40">
                  <h3 className="text-xs mb-6 tracking-widest uppercase text-charcoal font-light">Preferences</h3>
                  <div className="space-y-4">
                    {/* High-value filters - standard weight */}
                    {[
                      'Express Delivery',
                      'Modest Design',
                      'Exclusivity Available',
                    ].map((feature) => (
                      <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          className="w-3.5 h-3.5 rounded-sm border border-warm-grey-lighter/60 text-charcoal focus:ring-0 focus:ring-offset-0 checked:bg-charcoal checked:border-charcoal" 
                        />
                        <span className="text-sm text-charcoal group-hover:text-emerald luxury-transition font-light">{feature}</span>
                      </label>
                    ))}

                    {/* Secondary filters - de-emphasized with opacity */}
                    <div className="pt-2 mt-2 border-t border-warm-grey-lighter/20 space-y-4 opacity-60 hover:opacity-100 luxury-transition">
                      {[
                        'New Arrivals',
                        'On Sale',
                      ].map((feature) => (
                        <label key={feature} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            className="w-3.5 h-3.5 rounded-sm border border-warm-grey-lighter/60 text-charcoal focus:ring-0 focus:ring-offset-0 checked:bg-charcoal checked:border-charcoal" 
                          />
                          <span className="text-xs text-warm-grey group-hover:text-charcoal luxury-transition font-light">{feature}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Clear Filters - Discoverable subtle action */}
                <button className="w-full py-3 text-sm text-charcoal/50 hover:text-charcoal luxury-transition tracking-wide font-light hover:underline decoration-charcoal/20 underline-offset-4">
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-3 gap-6">
                {pageDresses.map((dress) => (
                  <div key={dress.id} className="group">
                    <div 
                      className="relative aspect-[3/4] bg-ivory-dark rounded-sm mb-4 flex items-center justify-center border border-warm-grey-lighter cursor-pointer overflow-hidden hover:border-emerald luxury-transition luxury-shadow-sm hover:luxury-shadow"
                      onClick={() => onNavigate('dress-detail', dress.id)}
                    >
                      <ImageWithFallback
                        src={dress.image}
                        alt="Dress Image"
                        className="w-full h-full object-cover"
                      />
                      {dress.aiMatch > 90 && (
                        <div className="absolute top-3 left-3 bg-emerald text-ivory px-3 py-1.5 rounded-sm text-xs tracking-wide flex items-center gap-1.5 luxury-shadow-sm">
                          <Sparkles className="w-3 h-3" />
                          <span>{dress.aiMatch}%</span>
                        </div>
                      )}
                      {dress.expressDelivery && (
                        <div className="absolute top-3 right-3 bg-gold text-white px-3 py-1.5 rounded-sm text-xs tracking-wide luxury-shadow-sm">
                          Express
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-black/0 group-hover:from-black/10 group-hover:to-black/5 luxury-transition" />
                      <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 luxury-transition">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('dress-detail', dress.id);
                          }}
                          className="flex-1 bg-white/95 text-charcoal py-2.5 rounded-sm text-xs tracking-wide hover:bg-white luxury-transition flex items-center justify-center gap-1.5"
                        >
                          <span>View Details</span>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToWishlist(dress.id);
                          }}
                          className="bg-white/95 text-charcoal p-2.5 rounded-sm hover:bg-white luxury-transition"
                        >
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div 
                      className="cursor-pointer"
                      onClick={() => onNavigate('dress-detail', dress.id)}
                    >
                      <div className="text-xs text-warm-grey mb-2 tracking-wide font-light">{dress.boutique}</div>
                      <div className="font-medium mb-2 text-charcoal group-hover:text-emerald luxury-transition">{dress.name}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-charcoal tracking-wide">SAR {dress.price}</div>
                        <div className="flex items-center gap-1 text-xs text-warm-grey">
                          <Star className="w-3 h-3 fill-gold text-gold" />
                          <span>{dress.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {pageDresses.map((dress) => (
                  <div 
                    key={dress.id}
                    className="group flex gap-6 border border-warm-grey-lighter rounded-sm p-5 hover:border-emerald luxury-transition cursor-pointer bg-white luxury-shadow-sm hover:luxury-shadow"
                    onClick={() => onNavigate('dress-detail', dress.id)}
                  >
                    <div className="w-48 aspect-[3/4] bg-ivory-dark rounded-sm flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                      <ImageWithFallback
                        src={dress.image}
                        alt="Dress Image"
                        className="w-full h-full object-cover"
                      />
                      {dress.expressDelivery && (
                        <div className="absolute top-2 right-2 bg-gold text-white px-2 py-1 rounded-sm text-xs tracking-wide">
                          Express
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="text-xs text-warm-grey mb-2 tracking-wide font-light">{dress.boutique}</div>
                      <h3 className="text-xl font-medium mb-3 text-charcoal group-hover:text-emerald luxury-transition">{dress.name}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-gold text-gold" />
                          <span className="text-sm text-charcoal">{dress.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-sm text-warm-grey font-light">· {dress.reviews} reviews</span>
                      </div>
                      <div className="text-2xl font-medium mb-5 text-charcoal">SAR {dress.price}</div>
                      <div className="flex gap-3 mt-auto opacity-0 group-hover:opacity-100 luxury-transition">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigate('dress-detail', dress.id);
                          }}
                          className="px-6 py-2.5 bg-charcoal text-ivory rounded-sm hover:bg-charcoal/90 luxury-transition flex items-center gap-2 tracking-wide"
                        >
                          <span>View Details</span>
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToWishlist(dress.id);
                          }}
                          className="px-4 py-2.5 border border-warm-grey-lighter text-charcoal rounded-sm hover:border-charcoal luxury-transition"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-16 flex items-center justify-center gap-2">
                <button
                  onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === 1}
                  className="px-5 py-2.5 border border-warm-grey-lighter text-charcoal rounded-sm hover:border-emerald luxury-transition tracking-wide disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-warm-grey-lighter"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-10 h-10 rounded-sm luxury-transition tracking-wide ${
                      p === page
                        ? 'bg-emerald text-ivory'
                        : 'border border-warm-grey-lighter text-charcoal hover:border-emerald'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={page === totalPages}
                  className="px-5 py-2.5 border border-warm-grey-lighter text-charcoal rounded-sm hover:border-emerald luxury-transition tracking-wide disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-warm-grey-lighter"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
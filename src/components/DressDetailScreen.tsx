export default function DressDetailScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <div className="w-10 h-10 bg-white border border-neutral-800 rounded-full flex items-center justify-center">←</div>
        <div className="w-10 h-10 bg-white border border-neutral-800 rounded-full flex items-center justify-center text-lg">
          ♡
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Image carousel with subtle badges */}
        <div className="relative aspect-square bg-neutral-100 flex items-center justify-center border-b border-neutral-200">
          <div className="text-sm text-neutral-400">IMAGE CAROUSEL</div>
          
          {/* Subtle badges overlaid on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="text-[10px] bg-neutral-800 text-white px-2 py-1 rounded font-bold shadow-sm">24h</div>
            <div className="text-[10px] bg-white/90 backdrop-blur-sm text-neutral-800 px-2 py-1 rounded font-bold border border-neutral-200 shadow-sm">Modest</div>
          </div>
        </div>
        <div className="flex justify-center gap-2 py-3 border-b border-neutral-100">
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-800"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300"></div>
        </div>

        {/* AI Badge - Below Image Carousel */}
        <div className="px-4 py-3 border-b border-neutral-100">
          <button className="w-full border border-purple-300 bg-purple-50 text-purple-900 rounded-lg px-4 py-2.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-purple-100 transition-colors">
            <span>✨</span>
            <span>VIRTUAL TRY-ON</span>
          </button>
        </div>

        {/* Product info */}
        <div className="px-4 pt-4 pb-4 space-y-4">
          {/* Dress Name/Title */}
          <div>
            <div className="text-xs text-neutral-500 uppercase mb-1">EVENING COLLECTION</div>
            <h1 className="font-bold text-lg mb-2">Elegant Chiffon Maxi Dress</h1>
          </div>

          {/* Price with urgency */}
          <div>
            <div className="text-2xl font-bold mb-1">SAR 549</div>
            <div className="text-xs text-orange-600 font-bold">Only 3 left in your size</div>
          </div>

          {/* Boutique - tappable with trust indicator */}
          <button className="flex items-center gap-2 -ml-1 p-1 hover:bg-neutral-50 rounded transition-colors">
            <div className="w-8 h-8 border border-neutral-300 rounded-full bg-neutral-50"></div>
            <div className="flex items-center gap-1.5">
              <div className="text-sm font-bold">Boutique Name</div>
              <div className="text-xs text-green-700">✓</div>
            </div>
            <div className="text-neutral-400 text-xs">›</div>
          </button>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="text-sm">★★★★☆</div>
            <div className="text-xs text-neutral-500">4.2 · 128 reviews</div>
          </div>

          {/* Color Selection */}
          <div>
            <div className="text-xs font-bold text-neutral-700 mb-3">COLOR</div>
            <div className="flex gap-2">
              <button className="w-10 h-10 border-2 border-neutral-800 rounded-full bg-neutral-800 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full bg-neutral-800"></div>
              </button>
              <button className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center hover:border-neutral-400 transition-colors">
                <div className="w-7 h-7 rounded-full bg-neutral-400"></div>
              </button>
              <button className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center hover:border-neutral-400 transition-colors">
                <div className="w-7 h-7 rounded-full bg-neutral-200"></div>
              </button>
              <button className="w-10 h-10 border border-neutral-300 rounded-full flex items-center justify-center hover:border-neutral-400 transition-colors">
                <div className="w-7 h-7 rounded-full bg-neutral-600"></div>
              </button>
            </div>
            <div className="mt-2 text-xs text-neutral-600">Black</div>
          </div>

          {/* Size selector with guidance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-xs font-bold text-neutral-700">SELECT SIZE</div>
              <button className="text-xs text-neutral-600 font-bold underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {[
                { size: 'XS', status: 'available' },
                { size: 'S', status: 'popular' },
                { size: 'M', status: 'selected-low' },
                { size: 'L', status: 'soldout' },
                { size: 'XL', status: 'available' },
                { size: 'XXL', status: 'available' }
              ].map((item) => (
                <button
                  key={item.size}
                  disabled={item.status === 'soldout'}
                  className={`relative border rounded py-2.5 text-sm font-bold transition-colors ${
                    item.status === 'selected-low'
                      ? 'border-neutral-800 bg-neutral-800 text-white'
                      : item.status === 'soldout'
                      ? 'border-neutral-200 text-neutral-300 line-through'
                      : 'border-neutral-300 text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  {item.size}
                  {/* Popular indicator */}
                  {item.status === 'popular' && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-neutral-800 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between text-xs">
              <div className="text-orange-600 font-bold">M - Only 3 left</div>
              <div className="text-neutral-500">• Most popular size: S</div>
            </div>
          </div>

          {/* Product Details - Benefit-oriented bullets */}
          <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
            <div className="text-xs font-bold text-neutral-700 mb-2">KEY DETAILS</div>
            <div className="text-xs text-neutral-700 space-y-1.5 leading-relaxed">
              <div>• Premium chiffon fabric, breathable & elegant</div>
              <div>• Floor-length maxi silhouette</div>
              <div>• Professional dry clean recommended</div>
              <div>• Designed by [Designer Name]</div>
            </div>
          </div>

          {/* Collapsible sections - lighter */}
          <div className="space-y-2">
            <button className="w-full flex justify-between items-center py-3 border-b border-neutral-100">
              <div className="text-sm font-bold text-neutral-700">Delivery & Returns</div>
              <div className="text-neutral-400 text-xs">▾</div>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky footer - Conversion-focused */}
      <div className="border-t border-neutral-200 bg-white">
        {/* Express Delivery Banner */}
        <div className="px-4 pt-3 pb-2 bg-green-600 text-white">
          <div className="text-xs font-bold mb-0.5">🚚 EXPRESS: Get it by 6:00 PM</div>
          <div className="text-xs opacity-90">Order within 2h 34m</div>
        </div>

        <div className="px-4 pt-3 pb-2">
          <div className="text-xs text-neutral-500 mb-3 flex items-center gap-1.5">
            <span className="text-green-700">✓</span>
            <span>Free returns within 14 days</span>
          </div>
        </div>
        <div className="px-4 pb-4 flex gap-2">
          <button className="flex-[2] bg-neutral-800 text-white py-4 font-bold rounded-full">
            Add to Bag - SAR 2,450
          </button>
          <button className="flex-1 border border-neutral-300 text-neutral-800 py-4 font-bold rounded-full">
            Add to Cart
          </button>
        </div>

        {/* MAKE IT EXCLUSIVE Section - NEW */}
        <div className="px-4 pb-4">
          <div className="border-2 border-yellow-700 bg-yellow-50 rounded-lg p-4 relative">
            {/* NEW badge - top right */}
            <div className="absolute top-3 right-3 bg-neutral-800 text-white text-[10px] font-bold px-2 py-1 rounded">
              NEW
            </div>
            
            {/* Header with crown icon */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">👑</span>
              <span className="text-sm font-bold text-neutral-800">MAKE IT EXCLUSIVE</span>
            </div>
            
            {/* Description */}
            <div className="text-xs text-neutral-700 mb-3">
              Be the only one wearing this dress at your event
            </div>
            
            {/* Pricing and CTA */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-600">Starting from SAR 50</span>
              <button className="text-xs font-bold text-neutral-800 underline">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function BoutiqueProfile() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Top bar - Minimal */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <button className="w-8 h-8 border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600">⋮</button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Boutique info - Clear hierarchy */}
        <div className="px-4 pt-4 pb-5 border-b border-neutral-100">
          {/* Name + Rating (primary hierarchy) */}
          <h1 className="text-xl font-bold mb-2">Boutique Name</h1>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="text-sm">★★★★☆</div>
            <div className="text-xs text-neutral-600">4.5 · 89 reviews</div>
            <div className="text-xs text-green-700 font-bold flex items-center gap-1">
              <span>✓</span> Verified
            </div>
          </div>

          {/* Location */}
          <div className="text-xs text-neutral-500 mb-3">📍 Riyadh, Saudi Arabia</div>

          {/* Short description */}
          <div className="text-sm text-neutral-700 mb-4 leading-relaxed">
            Curated collection of elegant dresses for special occasions, weddings, and formal events.
          </div>

          {/* Actions - Follow primary, Message secondary */}
          <div className="flex gap-2">
            <button className="flex-[2] bg-neutral-800 text-white py-3 font-bold rounded-full">
              Follow
            </button>
            <button className="flex-1 border border-neutral-300 text-neutral-800 py-3 font-bold rounded-full">
              Message
            </button>
          </div>
        </div>

        {/* Single filter/sorting system - All / Popular / Recent */}
        <div className="flex border-b border-neutral-200 bg-neutral-50">
          <button className="flex-1 py-3 text-sm font-bold border-b-2 border-neutral-800 bg-white">
            All
          </button>
          <button className="flex-1 py-3 text-sm font-bold text-neutral-500">
            Popular
          </button>
          <button className="flex-1 py-3 text-sm font-bold text-neutral-500">
            Recent
          </button>
        </div>

        {/* Products grid - Clean and product-first */}
        <div className="p-4 grid grid-cols-2 gap-4 pb-24">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <button key={i} className="text-left border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-colors">
              <div className="relative">
                <div className="aspect-[3/4] bg-neutral-50 flex items-center justify-center text-xs text-neutral-300">
                  IMAGE
                </div>
                {/* Wishlist heart */}
                <button className="absolute top-2 right-2 text-lg text-neutral-400 hover:text-neutral-800 transition-colors">
                  ♡
                </button>
              </div>
              <div className="p-3">
                <div className="font-bold text-sm mb-1">SAR {400 + i * 50}</div>
                {/* Minimal badges */}
                <div className="flex gap-1">
                  <div className="text-[10px] bg-neutral-800 text-white px-2 py-0.5 rounded font-bold">24h</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-neutral-200 flex bg-white">
        <button className="flex-1 py-3 text-xs font-bold text-neutral-400">Home</button>
        <button className="flex-1 py-3 text-xs font-bold text-neutral-400">Search</button>
        <button className="flex-1 py-3 text-xs font-bold text-neutral-400">Wishlist</button>
        <button className="flex-1 py-3 text-xs font-bold text-neutral-400">Orders</button>
        <button className="flex-1 py-3 text-xs font-bold text-neutral-800">Profile</button>
      </div>
    </div>
  );
}
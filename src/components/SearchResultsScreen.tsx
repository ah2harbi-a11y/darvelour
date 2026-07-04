export default function SearchResultsScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header - Back + Search bar */}
      <div className="px-4 py-3 border-b border-neutral-200 bg-white">
        <div className="flex items-center gap-3">
          <button className="text-neutral-800 text-lg">←</button>
          <div className="flex-1 border border-neutral-300 rounded-full px-4 py-2 bg-neutral-50 flex items-center justify-between">
            <span className="text-sm text-neutral-800">party dresses</span>
            <span className="text-neutral-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Active Filters - Light pill chips, no X icons */}
      <div className="px-4 py-3 overflow-hidden">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <button className="px-3 py-1.5 bg-neutral-100 text-neutral-800 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0">
            Size: M
          </button>
          <button className="px-3 py-1.5 bg-neutral-100 text-neutral-800 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0">
            Party
          </button>
          <button className="px-3 py-1.5 bg-neutral-100 text-neutral-800 text-xs font-bold rounded-full whitespace-nowrap flex-shrink-0">
            Modest
          </button>
        </div>
      </div>

      {/* Results Summary + Sort & Filter Controls */}
      <div className="px-4 pb-3 flex items-center justify-between">
        <div className="text-xs text-neutral-500">
          <span className="font-bold text-neutral-800">47 results</span> · Size M · Party · Modest
        </div>
        <div className="flex items-center gap-2 border border-neutral-200 rounded-full px-3 py-1.5">
          <button className="text-xs font-bold text-neutral-800 flex items-center gap-1">
            Sort <span className="text-[10px]">▾</span>
          </button>
          <div className="w-px h-3 bg-neutral-300"></div>
          <button className="text-neutral-800 text-sm">⚙︎</button>
        </div>
      </div>

      {/* Product Grid - 2 columns, clean cards */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 pb-4 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <button key={i} className="text-left border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-colors">
              <div className="relative">
                <div className="aspect-[3/4] bg-neutral-50 flex items-center justify-center text-xs">
                  <div className="text-neutral-300">IMAGE</div>
                </div>
                {/* Subtle wishlist heart */}
                <button className="absolute top-2 right-2 text-lg text-neutral-400 hover:text-neutral-800 transition-colors">
                  ♡
                </button>
              </div>
              <div className="p-3">
                <div className="font-bold text-sm mb-1">SAR {350 + i * 50}</div>
                <div className="text-xs text-neutral-500 mb-2">Boutique Name</div>
                {/* Badges - max 2, 24h always first - FIXED HEIGHT, no redundant badges */}
                <div className="flex gap-1 h-5 items-start">
                  <div className="text-[10px] bg-neutral-800 text-white px-2 py-0.5 rounded font-bold">24h</div>
                  {/* Only show non-redundant badges (not matching active filters) */}
                  {i === 1 && <div className="text-[10px] border border-neutral-300 text-neutral-600 px-2 py-0.5 rounded font-bold">New</div>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Empty state (hidden when results exist) */}
        {/* 
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="font-bold mb-2">No dresses found</h3>
          <p className="text-sm text-neutral-500 mb-6">
            Try adjusting your filters or search term
          </p>
          <button className="border border-neutral-800 px-6 py-3 font-bold rounded-full">
            Clear All Filters
          </button>
        </div>
        */}
      </div>

      {/* Bottom Navigation - Search tab active */}
      <div className="border-t border-neutral-200 flex bg-white">
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">🏠</span>
          <span className="text-[10px] text-neutral-400">Home</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1 bg-neutral-50">
          <span className="text-base text-neutral-800">🔍</span>
          <span className="text-[10px] text-neutral-800 font-bold">Search</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">♡</span>
          <span className="text-[10px] text-neutral-400">DV Closet</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">📦</span>
          <span className="text-[10px] text-neutral-400">Orders</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">👤</span>
          <span className="text-[10px] text-neutral-400">Profile</span>
        </button>
      </div>
    </div>
  );
}
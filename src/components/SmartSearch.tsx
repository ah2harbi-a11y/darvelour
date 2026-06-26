export default function SmartSearch() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header with Search */}
      <div className="px-4 py-3 border-b border-neutral-200">
        <div className="flex items-center gap-2 mb-3">
          <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0">
            ←
          </button>
          <input
            type="text"
            placeholder="Describe what you're looking for..."
            className="flex-1 px-4 py-2.5 border border-neutral-300 rounded-full text-xs focus:outline-none focus:border-neutral-800"
          />
        </div>
        
        {/* Search Tools */}
        <div className="flex items-center gap-2">
          <button className="flex-1 py-2 border border-neutral-300 rounded-full flex items-center justify-center gap-1.5">
            <span className="text-sm">🎤</span>
            <span className="text-xs font-bold">Voice</span>
          </button>
          <button className="flex-1 py-2 border border-neutral-300 rounded-full flex items-center justify-center gap-1.5">
            <span className="text-sm">📷</span>
            <span className="text-xs font-bold">Camera</span>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* AI Suggestions */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold">TRY ASKING:</span>
            <span className="text-xs">✨</span>
          </div>
          <div className="space-y-2">
            <button className="w-full px-4 py-2.5 border border-neutral-300 rounded-full text-xs text-left hover:border-neutral-800 transition-colors">
              Green dress for outdoor wedding
            </button>
            <button className="w-full px-4 py-2.5 border border-neutral-300 rounded-full text-xs text-left hover:border-neutral-800 transition-colors">
              Something like what I bought last time
            </button>
            <button className="w-full px-4 py-2.5 border border-neutral-300 rounded-full text-xs text-left hover:border-neutral-800 transition-colors">
              Formal but comfortable for long event
            </button>
            <button className="w-full px-4 py-2.5 border border-neutral-300 rounded-full text-xs text-left flex items-center gap-2 hover:border-neutral-800 transition-colors">
              <span>Match this bag</span>
              <div className="w-8 h-8 bg-neutral-200 border border-neutral-300 rounded ml-auto"></div>
            </button>
          </div>
        </div>

        {/* Visual Search Option */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <button className="w-full border-2 border-dashed border-neutral-300 rounded-xl p-6 hover:border-neutral-800 transition-colors">
            <div className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 border border-neutral-800 rounded-full flex items-center justify-center bg-neutral-50">
                <span className="text-2xl">📷</span>
              </div>
              <div className="font-bold text-sm">SEARCH BY PHOTO</div>
              <div className="text-xs text-neutral-600 text-center leading-relaxed">
                Upload or take a photo of a dress you like<br />
                AI will find similar styles
              </div>
            </div>
          </button>
        </div>

        {/* Recent & Trending */}
        <div className="px-4 py-4">
          {/* Recent Searches */}
          <div className="mb-4">
            <div className="text-xs font-bold mb-3">RECENT SEARCHES</div>
            <div className="space-y-2">
              {['Evening dresses', 'Wedding guest dress modest', 'Navy blue formal'].map((search, i) => (
                <button key={i} className="flex items-center gap-3 w-full text-left hover:bg-neutral-50 p-2 rounded-lg transition-colors">
                  <span className="text-sm text-neutral-400">🕐</span>
                  <span className="text-xs flex-1">{search}</span>
                  <span className="text-sm text-neutral-400">✕</span>
                </button>
              ))}
            </div>
          </div>

          {/* Style Trends */}
          <div>
            <div className="text-xs font-bold mb-2">YOUR STYLE TRENDS</div>
            <div className="text-[10px] text-neutral-500 mb-3">Based on your activity, you might like:</div>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {['Classic Elegant', 'Modest Formal', 'Evening Wear', 'Weddings', 'Navy & Black'].map((trend, i) => (
                <button key={i} className="px-4 py-2 bg-neutral-100 border border-neutral-300 rounded-full text-xs whitespace-nowrap flex-shrink-0 hover:border-neutral-800 transition-colors">
                  {trend}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AI Understanding Example (when searching) - Commented */}
        {/*
        <div className="px-4 py-3 bg-blue-50 border-y border-blue-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs">✨</span>
            <span className="text-xs font-bold text-blue-900">AI Understanding:</span>
          </div>
          <div className="space-y-1 text-xs text-blue-800">
            <div>• Looking for: Green dress</div>
            <div>• Occasion: Outdoor wedding</div>
            <div>• Style: Elegant, not too formal</div>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold">47 Results</span>
            <button className="text-xs text-neutral-600 underline flex items-center gap-1">
              <span>Highest Match</span>
              <span>✨</span>
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center relative">
                  <div className="text-neutral-400 text-xs">DRESS</div>
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-0.5">
                    <span>✨</span>
                    <span>94%</span>
                  </div>
                </div>
                <div className="p-2 text-left">
                  <div className="font-bold text-xs mb-0.5">SAR {499 + i * 100}</div>
                  <div className="text-[10px] text-neutral-600">Boutique Name</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        */}

        <div className="pb-4"></div>
      </div>
    </div>
  );
}

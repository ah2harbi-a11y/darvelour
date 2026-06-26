export default function HomeScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header with Logo and Icons */}
      <div className="px-4 pt-4 pb-2 border-b border-neutral-100">
        <div className="flex items-center justify-between mb-3">
          <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
            <span className="text-sm">🔍</span>
          </button>
          <div className="font-bold text-sm tracking-wider">DRESSNOW</div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
              <span className="text-sm">♡</span>
            </button>
            <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
              <span className="text-sm">🛒</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Express Delivery Banner */}
        <div className="mx-4 my-3 p-4 bg-neutral-100 border border-neutral-200 rounded-xl">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-base">🚚</span>
            <span className="text-base">⏱</span>
          </div>
          <div className="text-center font-bold text-sm mb-1">EXPRESS DELIVERY</div>
          <div className="text-center text-xs text-neutral-600">Get your dress in 2-3 hours</div>
        </div>

        {/* AI Stylist Section */}
        <div className="mb-4">
          <div className="px-4 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm">AI STYLIST PICKS</h2>
              <span className="text-sm">✨</span>
            </div>
            <button className="text-xs text-neutral-600 underline">See All →</button>
          </div>
          <div className="px-4 text-xs text-neutral-500 mb-3">Curated just for you</div>
          <div className="px-4 overflow-hidden">
            <div className="flex gap-3 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-shrink-0 w-36">
                  <div className="border border-neutral-200 rounded-xl overflow-hidden">
                    <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center relative">
                      <div className="text-neutral-400 text-xs">DRESS</div>
                      <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1">
                        <span>✨</span>
                        <span>94%</span>
                      </div>
                    </div>
                    <div className="p-2 text-left">
                      <div className="font-bold text-xs mb-0.5">SAR {399 + i * 100}</div>
                      <div className="text-[10px] text-neutral-600">AI Match</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shop by Occasion */}
        <div className="mb-4">
          <div className="px-4 mb-3">
            <h2 className="font-bold text-sm">SHOP BY OCCASION</h2>
          </div>
          <div className="px-4 grid grid-cols-4 gap-3">
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 border-2 border-neutral-800 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">💍</span>
              </div>
              <div className="text-[10px] font-bold">Wedding</div>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 border-2 border-neutral-300 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">💼</span>
              </div>
              <div className="text-[10px] font-bold">Business</div>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 border-2 border-neutral-300 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">🌙</span>
              </div>
              <div className="text-[10px] font-bold">Evening</div>
            </button>
            <button className="flex flex-col items-center gap-2">
              <div className="w-16 h-16 border-2 border-neutral-300 rounded-full bg-neutral-50 flex items-center justify-center">
                <span className="text-xl">👗</span>
              </div>
              <div className="text-[10px] font-bold">Casual</div>
            </button>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="mb-5">
          <div className="px-4 mb-3">
            <h2 className="font-bold text-sm">NEW ARRIVALS</h2>
          </div>
          <div className="px-4 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-xl overflow-hidden">
                <div className="aspect-[3/4] bg-neutral-100 flex items-center justify-center relative">
                  <div className="text-neutral-400 text-xs">DRESS</div>
                  <div className="absolute top-2 right-2 bg-neutral-800 text-white px-2 py-0.5 rounded text-[9px] font-bold">
                    2-3h delivery
                  </div>
                </div>
                <div className="p-2 text-left">
                  <div className="text-[10px] text-neutral-600 mb-0.5">Boutique Name</div>
                  <div className="font-bold text-xs mb-0.5">Dress Name</div>
                  <div className="font-bold text-xs">SAR {299 + i * 50}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-4"></div>
      </div>

      {/* Bottom Navigation with Try-On */}
      <div className="border-t border-neutral-200 flex bg-white">
        <button className="flex-1 py-3 flex flex-col items-center gap-1 border-b-2 border-neutral-800">
          <span className="text-base">🏠</span>
          <span className="text-[10px] font-bold text-neutral-800">Home</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">🔍</span>
          <span className="text-[10px] text-neutral-400">Search</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">📷</span>
          <span className="text-[10px] text-neutral-400">Try-On</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">♡</span>
          <span className="text-[10px] text-neutral-400">Wishlist</span>
        </button>
        <button className="flex-1 py-3 flex flex-col items-center gap-1">
          <span className="text-base text-neutral-400">👤</span>
          <span className="text-[10px] text-neutral-400">Profile</span>
        </button>
      </div>
    </div>
  );
}
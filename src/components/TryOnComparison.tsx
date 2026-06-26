export default function TryOnComparison() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="font-bold">COMPARE LOOKS</div>
        <button className="text-xs text-neutral-600 underline">Clear All</button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Comparison View - Side by Side */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Try-on 1 */}
            <div className="relative">
              <div className="aspect-[3/4] bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-neutral-400 text-xs mb-1">Try-On 1</div>
                  <div className="w-16 h-24 border-2 border-dashed border-neutral-300 mx-auto rounded"></div>
                </div>
                <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs">
                  ✕
                </button>
              </div>
              <div className="mt-2">
                <div className="text-[10px] text-neutral-500 uppercase">BRAND NAME</div>
                <div className="text-xs font-bold truncate">Evening Dress Name</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold">SAR 2,450</span>
                  <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5">
                    <span>✨</span>
                    <span>92%</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Try-on 2 */}
            <div className="relative">
              <div className="aspect-[3/4] bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-neutral-400 text-xs mb-1">Try-On 2</div>
                  <div className="w-16 h-24 border-2 border-dashed border-neutral-300 mx-auto rounded"></div>
                </div>
                <button className="absolute top-2 right-2 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center text-xs">
                  ✕
                </button>
              </div>
              <div className="mt-2">
                <div className="text-[10px] text-neutral-500 uppercase">BRAND NAME</div>
                <div className="text-xs font-bold truncate">Party Dress Name</div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs font-bold">SAR 1,899</span>
                  <span className="text-[10px] text-green-600 font-bold flex items-center gap-0.5">
                    <span>✨</span>
                    <span>88%</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Indicator */}
          <div className="text-center text-[10px] text-neutral-400 mb-4">
            ← Swipe for more →
          </div>

          {/* Add More Button */}
          <button className="w-full h-32 border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center gap-2 mb-4 hover:border-neutral-400 transition-colors">
            <span className="text-2xl text-neutral-400">+</span>
            <span className="text-xs font-bold text-neutral-600">Try Another Dress</span>
          </button>

          {/* AI Ranking */}
          <div className="border-t border-neutral-200 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold">AI RECOMMENDATION</span>
              <span className="text-xs">✨</span>
            </div>
            <div className="text-xs text-neutral-600 mb-3">Based on fit and your style:</div>

            {/* Ranking Item 1 */}
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-2">
              <div className="w-10 h-10 bg-neutral-800 text-white rounded flex items-center justify-center font-bold text-sm flex-shrink-0">
                #1
              </div>
              <div className="w-12 h-16 bg-neutral-200 border border-neutral-300 rounded flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate">Evening Dress</div>
                <div className="text-[10px] text-green-700 font-bold">Best overall match</div>
              </div>
            </div>

            {/* Ranking Item 2 */}
            <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
              <div className="w-10 h-10 bg-neutral-300 text-neutral-700 rounded flex items-center justify-center font-bold text-sm flex-shrink-0">
                #2
              </div>
              <div className="w-12 h-16 bg-neutral-200 border border-neutral-300 rounded flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold truncate">Party Dress</div>
                <div className="text-[10px] text-neutral-600">Great alternative</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-32"></div>
      </div>

      {/* Fixed CTA Section */}
      <div className="border-t border-neutral-200 bg-white px-4 py-4">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full mb-2">
          ADD TOP PICK TO BAG
        </button>
        <button className="w-full border-2 border-neutral-800 text-neutral-800 py-3.5 font-bold rounded-full text-sm">
          ADD BOTH TO BAG
        </button>
      </div>
    </div>
  );
}

export default function VirtualTryOnResult() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="font-bold">YOUR TRY-ON</div>
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
          <span className="text-sm">⤴</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Result Image */}
        <div className="relative">
          <div className="w-full h-[420px] bg-neutral-100 border-b border-neutral-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-neutral-400 text-xs mb-2">Try-On Result</div>
              <div className="w-32 h-48 border-2 border-dashed border-neutral-300 mx-auto rounded"></div>
            </div>
          </div>
          {/* Before/After Slider */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2">
            <span className="text-neutral-500">←← Original</span>
            <span className="w-8 h-1 bg-neutral-300 rounded"></span>
            <span className="text-neutral-800">Try-On →→</span>
          </div>
        </div>

        {/* AI Confidence */}
        <div className="px-4 pt-4 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold">AI FIT ANALYSIS</span>
            <span className="text-xs">✨</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-neutral-600">Style Match</span>
              <span className="font-bold">92%</span>
            </div>
            <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
              <div className="h-full bg-neutral-800 rounded-full" style={{ width: '92%' }}></div>
            </div>
            <div className="text-[10px] text-neutral-500">Based on your preferences</div>
          </div>
        </div>

        {/* Fit Details */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <div className="grid grid-cols-3 gap-2">
            <div className="border border-neutral-200 rounded-lg p-3 text-center">
              <div className="text-xs font-bold mb-1">LENGTH</div>
              <div className="text-[10px] text-neutral-600 leading-tight">Perfect for your height</div>
            </div>
            <div className="border border-neutral-200 rounded-lg p-3 text-center">
              <div className="text-xs font-bold mb-1">FIT</div>
              <div className="text-[10px] text-neutral-600 leading-tight">Slightly fitted at waist</div>
            </div>
            <div className="border border-neutral-200 rounded-lg p-3 text-center">
              <div className="text-xs font-bold mb-1">STYLE</div>
              <div className="text-[10px] text-neutral-600 leading-tight">Matches your preference</div>
            </div>
          </div>
        </div>

        {/* Color Options */}
        <div className="px-4 py-4 border-b border-neutral-100">
          <div className="text-xs font-bold mb-3">TRY OTHER COLORS</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border-2 border-neutral-800 rounded-full bg-neutral-800"></div>
            <div className="w-10 h-10 border border-neutral-300 rounded-full bg-neutral-400"></div>
            <div className="w-10 h-10 border border-neutral-300 rounded-full bg-neutral-200"></div>
            <div className="w-10 h-10 border border-neutral-300 rounded-full bg-neutral-600"></div>
            <div className="w-10 h-10 border border-neutral-300 rounded-full bg-white"></div>
          </div>
        </div>

        <div className="pb-48"></div>
      </div>

      {/* Fixed Footer */}
      <div className="border-t border-neutral-200 bg-white">
        {/* Express Badge */}
        <div className="px-4 pt-3 pb-2 bg-green-50 border-b border-green-100">
          <div className="text-xs font-bold flex items-center gap-1.5">
            <span>🚚</span>
            <span>EXPRESS: Get it by 6:00 PM today</span>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-4 py-4">
          <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full mb-2">
            ADD TO BAG - SAR 2,450
          </button>
          <button className="w-full border-2 border-neutral-800 text-neutral-800 py-3 font-bold rounded-full mb-2 text-sm">
            TRY ANOTHER DRESS
          </button>
          <div className="text-center">
            <button className="text-xs text-neutral-600 underline">Save to Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}
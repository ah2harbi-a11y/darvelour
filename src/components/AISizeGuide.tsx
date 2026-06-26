export default function AISizeGuide() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">✕</button>
        <div className="font-bold">FIND YOUR SIZE</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Hero */}
        <div className="px-6 pt-6 pb-4 text-center">
          <div className="w-16 h-16 border-2 border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-3 bg-neutral-50">
            <span className="text-2xl">📏</span>
          </div>
          <h2 className="font-bold text-lg mb-2">Let AI Find Your Perfect Fit</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Answer a few questions or use your measurements
          </p>
        </div>

        {/* Method Selection */}
        <div className="px-4 pb-4 space-y-3">
          {/* Option 1 - Quick Questions */}
          <button className="w-full border-2 border-neutral-300 rounded-xl p-4 hover:border-neutral-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
                <span className="text-xl">💬</span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-sm mb-1">QUICK QUESTIONS</div>
                <div className="text-xs text-neutral-600">2 minutes - Answer simple questions</div>
              </div>
            </div>
          </button>

          {/* Option 2 - Enter Measurements */}
          <button className="w-full border-2 border-neutral-300 rounded-xl p-4 hover:border-neutral-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
                <span className="text-xl">📏</span>
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-sm mb-1">ENTER MEASUREMENTS</div>
                <div className="text-xs text-neutral-600">1 minute - If you know your measurements</div>
              </div>
            </div>
          </button>

          {/* Option 3 - Scan with Camera */}
          <button className="w-full border-2 border-neutral-300 rounded-xl p-4 hover:border-neutral-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border border-neutral-800 rounded-full flex items-center justify-center flex-shrink-0 bg-neutral-50">
                <span className="text-xl">📷</span>
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">SCAN WITH CAMERA</span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-bold rounded">BETA</span>
                </div>
                <div className="text-xs text-neutral-600">3 minutes - We'll measure using your phone camera</div>
              </div>
            </div>
          </button>
        </div>

        {/* Previous Sizes */}
        <div className="px-4 py-4 border-t border-neutral-100">
          <div className="text-xs font-bold mb-3">YOUR SIZE HISTORY</div>
          <div className="text-[10px] text-neutral-500 mb-3">Based on past orders:</div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
              <div>
                <div className="text-xs font-bold mb-0.5">Brand Name 1</div>
                <div className="text-[10px] text-green-600 font-bold">Fit perfectly</div>
              </div>
              <div className="px-3 py-1.5 bg-neutral-800 text-white text-xs font-bold rounded">
                M
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-neutral-50 border border-neutral-200 rounded-lg">
              <div>
                <div className="text-xs font-bold mb-0.5">Brand Name 2</div>
                <div className="text-[10px] text-amber-600 font-bold">Slightly loose</div>
              </div>
              <div className="px-3 py-1.5 bg-neutral-300 text-neutral-700 text-xs font-bold rounded">
                L
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-xs text-neutral-600">
            <span>✨</span>
            <span>AI learned from your feedback</span>
          </div>
        </div>

        {/* This Item Recommendation */}
        <div className="px-4 py-4 border-t border-neutral-100 bg-blue-50">
          <div className="text-xs font-bold mb-3">FOR THIS DRESS:</div>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-24 h-24 bg-neutral-800 text-white rounded-2xl flex items-center justify-center">
              <span className="text-5xl font-bold">M</span>
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-xs text-blue-900 font-bold mb-1">Size recommendation</div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs text-blue-700">95% confident</span>
              <span className="text-xs">✨</span>
            </div>
          </div>

          {/* Fit Prediction Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-[10px] text-neutral-600 mb-1.5">
              <span>Too small</span>
              <span>Perfect</span>
              <span>Too large</span>
            </div>
            <div className="relative w-full h-3 bg-gradient-to-r from-red-200 via-green-200 to-blue-200 rounded-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-5 bg-neutral-800 rounded"></div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-4 py-4 border-t border-neutral-100">
          <div className="text-xs font-bold mb-3">Why we recommend M:</div>
          <div className="space-y-2 text-xs text-neutral-700 leading-relaxed">
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Your height: 165cm - Length will be perfect</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>Similar purchases: Size M fit well</span>
            </div>
            <div className="flex items-start gap-2">
              <span>•</span>
              <span>This brand runs true to size</span>
            </div>
          </div>
        </div>

        <div className="pb-32"></div>
      </div>

      {/* Fixed CTA */}
      <div className="border-t border-neutral-200 bg-white px-4 py-4">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full mb-2">
          SELECT SIZE M
        </button>
        <div className="text-center">
          <button className="text-xs text-neutral-600 underline">View Full Size Chart</button>
        </div>
      </div>
    </div>
  );
}
export default function ExclusivityPartialGuarantee() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">Exclusivity</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-5">
          {/* Warning icon */}
          <div className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full border-4 border-yellow-600 flex items-center justify-center mb-4">
              <div className="text-3xl text-yellow-600">!</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-neutral-800 mb-1">PARTIAL GUARANTEE</div>
            </div>
          </div>

          {/* Warning message */}
          <div className="bg-yellow-50 border border-yellow-600 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-yellow-600 text-lg">⚠</span>
              <div className="text-xs text-yellow-900 leading-relaxed">
                This dress was purchased by 2 customers in Riyadh this month who didn't share their event details.
              </div>
            </div>
          </div>

          {/* Event details card */}
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <span>📍</span>
                <span>Ritz Carlton, Riyadh</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <span>📅</span>
                <span>January 25, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-700">
                <span>💒</span>
                <span>Wedding</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Options heading */}
          <div className="text-xs font-bold text-neutral-500">YOUR OPTIONS:</div>

          {/* Option 1: Partial Guarantee */}
          <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <div className="w-5 h-5 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </div>
              <div className="font-bold text-sm text-neutral-800">OPTION 1: PARTIAL GUARANTEE</div>
            </div>
            
            <div className="text-xs text-neutral-700 space-y-1 mb-3">
              <div>Exclusivity Fee: SAR 65 (50% off)</div>
              <div className="font-bold">Total: SAR 2,515</div>
            </div>

            <div className="text-xs text-neutral-600 leading-relaxed mb-3">
              If someone wears same dress at your event:<br/>
              • Full refund of dress + fee<br/>
              • SAR 200 credit for next purchase
            </div>

            <button className="w-full bg-neutral-800 text-white py-3 font-bold rounded-full text-sm">
              ACCEPT PARTIAL GUARANTEE
            </button>
          </div>

          {/* Option 2: Full Guarantee */}
          <div className="bg-green-50 border-2 border-green-600 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-5 h-5 rounded-full border-2 border-neutral-400 flex-shrink-0 mt-0.5"></div>
              <div className="font-bold text-sm text-neutral-800">OPTION 2: FULL GUARANTEE</div>
            </div>
            
            <div className="text-xs text-neutral-700 mb-3">
              Browse 12 similar dresses with no prior purchases in Riyadh
            </div>

            <button className="w-full border-2 border-neutral-800 text-neutral-800 py-3 font-bold rounded-full text-sm">
              VIEW ALTERNATIVES
            </button>
          </div>

          {/* Option 3: No Guarantee */}
          <div className="border-2 border-neutral-300 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <div className="w-5 h-5 rounded-full border-2 border-neutral-400 flex-shrink-0 mt-0.5"></div>
              <div className="font-bold text-sm text-neutral-700">OPTION 3: NO GUARANTEE</div>
            </div>
            
            <div className="text-xs text-neutral-600 mb-3">
              Buy this dress without exclusivity
            </div>

            <button className="w-full border-2 border-neutral-300 text-neutral-700 py-3 font-bold rounded-full text-sm">
              BUY WITHOUT EXCLUSIVITY
            </button>
          </div>

          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}

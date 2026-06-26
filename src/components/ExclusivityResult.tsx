export default function ExclusivityResult() {
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
          {/* Success checkmark */}
          <div className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full border-4 border-green-600 flex items-center justify-center mb-4">
              <div className="text-3xl text-green-600">✓</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-neutral-800 mb-1">GREAT NEWS!</div>
              <div className="text-sm text-neutral-600">This dress is available</div>
              <div className="text-sm text-neutral-600">for your event</div>
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

          {/* Full Guarantee badge */}
          <div className="bg-green-50 border border-green-600 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">●</span>
              <span className="text-sm font-bold text-green-900">FULL GUARANTEE</span>
            </div>
            <div className="text-xs text-green-800 leading-relaxed">
              No one has purchased this dress for your event. You will be the only one wearing it.
            </div>
          </div>

          {/* Pricing breakdown */}
          <div className="border-t border-neutral-200 pt-4">
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between text-neutral-600">
                <span>Dress Price</span>
                <span>SAR 2,450</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Exclusivity Fee (5%)</span>
                <span>SAR 125</span>
              </div>
            </div>
            <div className="border-t border-neutral-300 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>SAR 2,575</span>
            </div>
          </div>

          {/* What's included */}
          <div className="bg-yellow-50 border border-yellow-600 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <span>👑</span>
              <span className="text-xs font-bold text-neutral-800">INCLUDES:</span>
            </div>
            <div className="space-y-1.5 text-xs text-neutral-700">
              <div>• Guaranteed uniqueness at your event</div>
              <div>• Digital exclusivity certificate</div>
              <div>• Priority customer support</div>
              <div>• Full refund if guarantee broken</div>
            </div>
          </div>

          <div className="pb-32"></div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="border-t border-neutral-200 bg-white p-4 space-y-3">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full">
          LOCK THIS DRESS - SAR 2,575
        </button>
        <button className="w-full border-2 border-neutral-300 text-neutral-800 py-4 font-bold rounded-full">
          Continue without exclusivity
        </button>
      </div>
    </div>
  );
}

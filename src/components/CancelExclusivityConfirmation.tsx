export default function CancelExclusivityConfirmation() {
  return (
    <div className="w-full min-h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal */}
      <div className="bg-white rounded-2xl w-full max-w-sm relative">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 text-center">
          <button className="absolute left-4 top-4 w-8 h-8 text-neutral-400 text-xl">←</button>
          <div className="font-bold text-sm">Cancel Exclusivity</div>
        </div>

        {/* Scrollable content */}
        <div className="px-6 py-4 space-y-5">
          {/* Warning icon */}
          <div className="flex justify-center py-2">
            <div className="w-16 h-16 rounded-full border-4 border-yellow-600 flex items-center justify-center">
              <div className="text-2xl text-yellow-600">⚠</div>
            </div>
          </div>

          {/* Warning message */}
          <div className="text-center text-sm text-neutral-700 leading-relaxed">
            Are you sure you want to cancel<br/>your exclusivity booking?
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Booking details */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">BOOKING DETAILS</div>
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 space-y-2 text-xs text-neutral-700">
              <div className="font-bold text-sm">Elegant Evening Dress</div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>Ritz Carlton, Riyadh</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>January 25, 2026</span>
              </div>
              <div className="text-neutral-500">Certificate #EXC-94857</div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Refund calculation */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">REFUND CALCULATION</div>
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between text-neutral-600">
                <span>Days until event:</span>
                <span className="font-bold">15 days</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Exclusivity fee paid:</span>
                <span>SAR 125</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Refund percentage:</span>
                <span className="font-bold">100%</span>
              </div>
            </div>
            <div className="border-t border-neutral-300 pt-2 flex justify-between font-bold">
              <span>Your refund:</span>
              <span>SAR 125</span>
            </div>
          </div>

          {/* Refund policy - EXPANDED */}
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-neutral-700">
              <span>📋</span>
              <span>REFUND POLICY</span>
            </div>
            <div className="text-xs text-neutral-600 space-y-2 leading-relaxed">
              <div>• 14+ days before: 100% refund</div>
              <div>• 7-13 days before: 80% refund</div>
              <div>• 3-6 days before: 50% refund</div>
              <div>• Less than 3 days: No refund</div>
            </div>
          </div>

          {/* Action buttons */}
          <button className="w-full bg-red-600 text-white py-3.5 font-bold rounded-full text-sm">
            YES, CANCEL AND REFUND SAR 125
          </button>

          <button className="w-full border-2 border-neutral-800 text-neutral-800 py-3.5 font-bold rounded-full text-sm mb-2">
            KEEP MY EXCLUSIVITY
          </button>
        </div>
      </div>
    </div>
  );
}
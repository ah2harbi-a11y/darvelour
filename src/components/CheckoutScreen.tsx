export default function CheckoutScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header - Clean */}
      <div className="px-4 py-4 border-b border-neutral-200">
        <div className="flex items-center">
          <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
          <div className="flex-1 text-center font-bold">Checkout</div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-5">
          {/* Delivery Address - Reduced visual weight */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">DELIVERY ADDRESS</div>
            <div className="border border-neutral-200 rounded-lg bg-neutral-50 p-3">
              <div className="flex items-start justify-between">
                <div className="text-xs text-neutral-700 leading-relaxed">
                  <div className="font-bold text-sm text-neutral-800 mb-1">Home</div>
                  Fatima Al-Rashid<br />
                  King Fahd Road, Al Olaya District<br />
                  Riyadh 12211
                </div>
                <button className="text-xs text-neutral-600 font-bold underline">Edit</button>
              </div>
            </div>
          </div>

          {/* Delivery Method - Preselected and emphasized */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">DELIVERY METHOD</div>
            <div className="space-y-2">
              {/* Express 24h - Emphasized */}
              <div className="border-2 border-neutral-800 bg-neutral-800 text-white rounded-lg p-4 flex items-center justify-between">
                <div>
                  <div className="font-bold mb-0.5 flex items-center gap-2">
                    <span className="text-sm">●</span>
                    <span>Express 24h</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">Recommended</span>
                  </div>
                  <div className="text-xs opacity-90">Arrives tomorrow by 6 PM</div>
                </div>
                <div className="font-bold">SAR 25</div>
              </div>
              {/* Standard - De-emphasized */}
              <button className="w-full border border-neutral-200 rounded-lg p-3 flex items-center justify-between text-left">
                <div className="text-xs text-neutral-600">
                  <span className="mr-2">○</span>
                  Standard 2-3 days
                </div>
                <div className="text-xs font-bold text-neutral-600">Free</div>
              </button>
            </div>
          </div>

          {/* Delivery Time Slot - Default selected */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">DELIVERY TIME</div>
            <div className="space-y-2">
              <button className="w-full border border-neutral-300 rounded-lg p-3 text-sm font-bold text-left flex items-center gap-2">
                <span className="text-neutral-800">●</span>
                <span>Evening (4 PM - 8 PM)</span>
                <span className="text-[10px] text-neutral-500 ml-auto">Most popular</span>
              </button>
              <button className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-600 text-left flex items-center gap-2">
                <span>○</span>
                <span>Morning (9 AM - 12 PM)</span>
              </button>
              <button className="w-full border border-neutral-200 rounded-lg p-2.5 text-xs text-neutral-600 text-left flex items-center gap-2">
                <span>○</span>
                <span>Afternoon (12 PM - 4 PM)</span>
              </button>
            </div>
          </div>

          {/* Order Summary - Price Breakdown */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">ORDER SUMMARY</div>
            <div className="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
              {/* Item details with exclusivity */}
              <div className="space-y-3 mb-4 pb-4 border-b border-neutral-200">
                {/* Item 1 - Evening Dress with Exclusivity */}
                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-800">Evening Dress Name</span>
                    <span className="font-bold">SAR 549</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-600 mb-1">
                    <span>👑</span>
                    <span>Exclusivity: Ritz Carlton, Jan 25</span>
                  </div>
                  <div className="flex justify-between text-xs text-neutral-600">
                    <span>Exclusivity Fee</span>
                    <span>SAR 75</span>
                  </div>
                </div>
                
                {/* Item 2 - Party Dress */}
                <div className="text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-800">Party Dress Name</span>
                    <span className="font-bold">SAR 399</span>
                  </div>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal (2 items)</span>
                  <span>SAR 948</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Exclusivity Fee</span>
                  <span>SAR 75</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Express Delivery</span>
                  <span>SAR 25</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>VAT (15%)</span>
                  <span>SAR 157.20</span>
                </div>
                <div className="border-t border-neutral-300 pt-2 mt-2 flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>SAR 1,205.20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method - Grouped by recommended */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">PAYMENT METHOD</div>
            <div className="space-y-3">
              {/* Recommended */}
              <div className="space-y-2">
                <div className="border-2 border-neutral-800 rounded-lg bg-neutral-800 text-white p-3 flex items-center gap-3">
                  <div className="text-lg">●</div>
                  <div className="font-bold">Mada</div>
                  <div className="text-[10px] bg-white/20 px-2 py-0.5 rounded ml-auto">Fast</div>
                </div>
                <button className="w-full border border-neutral-200 rounded-lg p-3 flex items-center gap-3 text-left">
                  <div className="text-lg text-neutral-400">○</div>
                  <div className="font-bold text-neutral-800">Apple Pay</div>
                </button>
              </div>
              {/* Other options */}
              <details className="group">
                <summary className="text-xs text-neutral-600 font-bold cursor-pointer list-none flex items-center gap-1">
                  <span>More payment options</span>
                  <span className="text-[10px] group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="mt-2 space-y-2">
                  <button className="w-full border border-neutral-200 rounded-lg p-3 flex items-center gap-3 text-left">
                    <div className="text-lg text-neutral-400">○</div>
                    <div className="text-sm text-neutral-700">Credit/Debit Card</div>
                  </button>
                  <button className="w-full border border-neutral-200 rounded-lg p-3 flex items-center justify-between text-left">
                    <div className="flex items-center gap-3">
                      <div className="text-lg text-neutral-400">○</div>
                      <div className="text-sm text-neutral-700">Cash on Delivery</div>
                    </div>
                    <div className="text-xs text-neutral-500">+SAR 10</div>
                  </button>
                </div>
              </details>
            </div>
          </div>

          <div className="pb-32"></div>
        </div>
      </div>

      {/* Sticky footer - Emphasized with delivery reassurance */}
      <div className="border-t border-neutral-200 bg-white">
        {/* Delivery reassurance */}
        <div className="px-4 pt-3 pb-2 bg-green-50 border-b border-green-100">
          <div className="text-xs text-green-900 font-bold flex items-center gap-1.5">
            <span>✓</span>
            <span>Express delivery by tomorrow 6 PM</span>
          </div>
        </div>

        {/* Total + CTA */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-neutral-700">Total</span>
            <span className="text-xl font-bold">SAR 1,205.20</span>
          </div>
          <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full">
            Place Order
          </button>
          <div className="mt-3 text-xs text-neutral-500 text-center flex items-center justify-center gap-1">
            <span>🔒</span>
            <span>Secure payment · Easy returns within 14 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function CartScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header - Clean */}
      <div className="px-4 py-4 border-b border-neutral-200">
        <div className="flex items-center">
          <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
          <div className="flex-1 text-center font-bold">Shopping Bag (2)</div>
          <div className="w-8"></div>
        </div>
      </div>

      {/* Delivery Toggle - Below Header */}
      <div className="px-4 py-3 border-b border-neutral-100">
        <div className="inline-flex bg-neutral-100 rounded-full p-1 gap-1">
          <button className="px-4 py-2 bg-neutral-800 text-white rounded-full text-xs font-bold">
            EXPRESS 2-3h
          </button>
          <button className="px-4 py-2 text-neutral-600 rounded-full text-xs font-bold">
            STANDARD
          </button>
        </div>
      </div>

      {/* Urgency Messaging */}
      <div className="px-4 py-3 bg-orange-50 border-b border-orange-100">
        <div className="text-xs font-bold text-orange-900 mb-0.5">Get everything by 6:00 PM today</div>
        <div className="text-xs text-orange-700">Order within 1h 22m for express</div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Cart items - Compact cards */}
        <div className="p-4 space-y-3">
          {/* Item 1 - Compact layout */}
          <div className="border border-neutral-200 rounded-lg p-3">
            <div className="flex gap-3">
              {/* Reduced image height */}
              <div className="w-20 h-24 border border-neutral-200 rounded bg-neutral-50 flex items-center justify-center text-[10px] text-neutral-300 flex-shrink-0 relative">
                IMG
                {/* Express Badge on Item */}
                <div className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span>🚚</span>
                  <span>2-3h</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm mb-0.5">Evening Dress Name</div>
                <div className="text-xs text-neutral-500 mb-2">Boutique Name</div>
                {/* Size/Color with low-stock warning inline */}
                <div className="text-xs text-neutral-700 mb-1">
                  Size M · Black
                </div>
                {/* EXCLUSIVE badge with event details */}
                <div className="mb-2 flex items-center gap-1.5">
                  <div className="inline-flex items-center gap-1 bg-yellow-100 border border-yellow-600 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    <span>👑</span>
                    <span>EXCLUSIVE</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-500 mb-2">
                  Ritz Carlton · Jan 25
                </div>
                {/* Grouped controls: Quantity + Price + Remove */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-neutral-300 rounded">
                    <button className="w-7 h-7 flex items-center justify-center text-neutral-600">−</button>
                    <div className="w-7 h-7 border-x border-neutral-300 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center text-neutral-600">+</button>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">SAR 549</div>
                    <div className="text-[10px] text-neutral-500">+SAR 75 excl.</div>
                  </div>
                  <button className="text-xs text-neutral-500 underline">Remove</button>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 - Compact layout */}
          <div className="border border-neutral-200 rounded-lg p-3">
            <div className="flex gap-3">
              <div className="w-20 h-24 border border-neutral-200 rounded bg-neutral-50 flex items-center justify-center text-[10px] text-neutral-300 flex-shrink-0 relative">
                IMG
                {/* Express Badge on Item */}
                <div className="absolute top-1 left-1 bg-orange-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <span>🚚</span>
                  <span>2-3h</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm mb-0.5">Party Dress Name</div>
                <div className="text-xs text-neutral-500 mb-2">Boutique Name</div>
                <div className="text-xs text-neutral-700 mb-2">
                  Size S · Navy
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-neutral-300 rounded">
                    <button className="w-7 h-7 flex items-center justify-center text-neutral-600">−</button>
                    <div className="w-7 h-7 border-x border-neutral-300 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <button className="w-7 h-7 flex items-center justify-center text-neutral-600">+</button>
                  </div>
                  <div className="text-sm font-bold">SAR 399</div>
                  <button className="text-xs text-neutral-500 underline">Remove</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promo code - Collapsed behind link */}
        <div className="px-4 pb-4">
          <button className="text-xs text-neutral-600 font-bold underline">
            Have a promo code?
          </button>
        </div>

        {/* Price breakdown - Single display with details */}
        <div className="px-4 pb-6 space-y-2 text-sm">
          <div className="flex justify-between text-neutral-600">
            <span>Subtotal</span>
            <span>SAR 948</span>
          </div>
          <div className="flex justify-between text-neutral-600">
            <span>Exclusivity Fee</span>
            <span>SAR 75</span>
          </div>
          <div className="border-t border-neutral-200 pt-2 flex justify-between font-bold text-base">
            <span>Total</span>
            <span>SAR 1,023</span>
          </div>
        </div>

        <div className="pb-24"></div>
      </div>

      {/* Sticky footer - Decision-focused */}
      <div className="border-t border-neutral-200 bg-white">
        {/* Delivery urgency */}
        <div className="px-4 pt-3 pb-2 bg-amber-50 border-b border-amber-100">
          <div className="text-xs text-amber-900 font-bold flex items-center gap-1.5">
            <span>⏰</span>
            <span>Order within 2h for delivery by tomorrow 6 PM</span>
          </div>
        </div>

        {/* Final total + CTA */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold text-neutral-700">Total</span>
            <span className="text-xl font-bold">SAR 1,023</span>
          </div>
          <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full text-sm">
            CHECKOUT - EXPRESS DELIVERY
          </button>
          <div className="text-center text-xs text-neutral-600 mt-2">Arriving by 6:00 PM</div>
          {/* Trust badges - Subtle, near CTA */}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-neutral-500">
            <div className="flex items-center gap-1">
              <span>🔒</span>
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-1">
              <span>↩</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Undo toast (shown after item removal) */}
      {/* 
      <div className="fixed bottom-24 left-4 right-4 bg-neutral-800 text-white p-4 flex items-center justify-between rounded-lg shadow-lg">
        <span className="text-sm">Item removed from cart</span>
        <button className="underline font-bold text-sm">UNDO</button>
      </div>
      */}
    </div>
  );
}
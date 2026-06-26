export default function OrderTracking() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">Track Order</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-5">
          {/* 1. COUNTDOWN TIMER with Circular Progress */}
          <div className="flex flex-col items-center py-4">
            {/* Large circular progress indicator */}
            <div className="relative w-32 h-32 mb-3">
              {/* Outer circle - background */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#e5e5e5"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress circle - 70% complete example */}
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  stroke="#16a34a"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="339.292"
                  strokeDashoffset="101.788"
                  strokeLinecap="round"
                />
              </svg>
              {/* Timer text in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold text-neutral-800">1h 42m</div>
                <div className="text-xs text-neutral-500">Until delivery</div>
              </div>
            </div>
            
            {/* 2. ARRIVAL TIME BELOW COUNTDOWN */}
            <div className="text-sm font-bold text-neutral-600 tracking-wide">
              ARRIVING BY 6:00 PM
            </div>
          </div>

          {/* Order number - Compact */}
          <div className="text-xs text-neutral-500">
            Order #DRN-XXXXXX
          </div>

          {/* 4. LIVE STATUS CARD - Highlighted with light background */}
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-sm font-bold text-green-900 mb-1">
              Your order is 12 minutes away
            </div>
            <div className="text-xs text-green-800">
              Driver: Ahmed - Toyota Camry
            </div>
          </div>

          {/* Map placeholder - Reduced height with clear purpose */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-2">DRIVER LOCATION</div>
            <div className="border border-neutral-200 rounded-lg h-32 bg-neutral-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-1">📍</div>
                <div className="text-xs text-neutral-600">Live tracking map</div>
              </div>
            </div>
          </div>

          {/* Delivery partner info - Prioritized with Contact Driver CTA */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4">
            <div className="text-xs font-bold text-neutral-500 mb-3">DRIVER</div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-lg">
                👤
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">Ahmed M.</div>
                <div className="text-xs text-neutral-500">ID: #DRV-1234</div>
              </div>
            </div>
            <button className="w-full bg-neutral-800 text-white py-3 font-bold rounded-full">
              Contact Driver
            </button>
          </div>

          {/* Delivery Address - Reduced visual weight */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-2">DELIVERY ADDRESS</div>
            <div className="text-xs text-neutral-600 leading-relaxed">
              King Fahd Road, Al Olaya District<br />
              Riyadh 12211
            </div>
          </div>

          {/* 3. UPDATED TIMELINE WITH TIMESTAMPS */}
          <details className="group" open>
            <summary className="text-xs font-bold text-neutral-600 cursor-pointer list-none flex items-center gap-1">
              <span>Delivery updates</span>
              <span className="text-[10px] group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="mt-3 space-y-3 pl-1">
              {/* Current - Out for Delivery with green dot */}
              <div className="flex gap-2 items-start">
                <div className="w-4 h-4 rounded-full bg-green-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold">Out for Delivery</div>
                    <div className="text-xs text-neutral-600">4:45 PM</div>
                  </div>
                  <div className="text-[10px] text-green-700 font-bold">Current</div>
                </div>
              </div>
              {/* Being Prepared */}
              <div className="flex gap-2 items-start">
                <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center text-white text-[8px] mt-0.5 flex-shrink-0">✓</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-700">Being Prepared</div>
                    <div className="text-xs text-neutral-500">3:20 PM</div>
                  </div>
                </div>
              </div>
              {/* Order Confirmed */}
              <div className="flex gap-2 items-start">
                <div className="w-4 h-4 rounded-full bg-neutral-800 flex items-center justify-center text-white text-[8px] mt-0.5 flex-shrink-0">✓</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-neutral-700">Order Confirmed</div>
                    <div className="text-xs text-neutral-500">3:15 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </details>

          {/* Support actions - De-emphasized and lower priority */}
          <div className="flex gap-4 text-xs text-neutral-600 pt-2">
            <button className="font-bold underline">Contact Support</button>
            <button className="font-bold underline">Report Issue</button>
          </div>

          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}

export default function ExclusivityNotAvailable() {
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
          {/* Red X icon */}
          <div className="flex flex-col items-center py-6">
            <div className="w-20 h-20 rounded-full border-4 border-red-600 flex items-center justify-center mb-4">
              <div className="text-3xl text-red-600">×</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-neutral-800 mb-2">ALREADY BOOKED</div>
              <div className="text-sm text-neutral-600">Someone has locked this dress for</div>
              <div className="text-sm text-neutral-600">an event matching yours</div>
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

          {/* Similar dresses heading */}
          <div className="text-xs font-bold text-neutral-500">SIMILAR DRESSES WITH FULL GUARANTEE</div>

          {/* Dress cards - horizontal scroll */}
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 pb-2">
            {[
              { price: '2,850', available: 'Free' },
              { price: '3,200', available: 'Free' },
              { price: '2,950', available: 'Free' }
            ].map((dress, idx) => (
              <div key={idx} className="border border-neutral-200 rounded-lg p-3 w-32 flex-shrink-0">
                <div className="aspect-[3/4] bg-neutral-100 rounded flex items-center justify-center text-[10px] text-neutral-300 mb-2">
                  [IMG]
                </div>
                <div className="flex items-center gap-1 text-xs text-green-700 font-bold mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  <span>{dress.available}</span>
                </div>
                <div className="text-sm font-bold text-neutral-800">SAR {dress.price}</div>
                <button className="text-xs text-neutral-600 underline mt-1">[Check]</button>
              </div>
            ))}
          </div>

          {/* View all button */}
          <button className="w-full border-2 border-neutral-800 text-neutral-800 py-4 font-bold rounded-full text-sm">
            VIEW ALL 15 ALTERNATIVES
          </button>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Buy anyway button */}
          <button className="w-full border-2 border-neutral-300 text-neutral-700 py-4 font-bold rounded-full text-sm">
            Buy anyway without exclusivity
          </button>
          
          <div className="text-xs text-neutral-500 text-center">
            Someone at your event may wear same dress
          </div>

          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}
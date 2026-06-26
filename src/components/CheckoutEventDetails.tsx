export default function CheckoutEventDetails() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">Almost Done!</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-5">
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="text-xs text-neutral-500 mb-2">Step 2 of 3</div>
            <div className="flex gap-1">
              <div className="h-1 flex-1 bg-neutral-800 rounded"></div>
              <div className="h-1 flex-1 bg-neutral-800 rounded"></div>
              <div className="h-1 flex-1 bg-neutral-200 rounded"></div>
            </div>
          </div>

          {/* Highlighted box with gift icon */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-300 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-red-600 text-lg">📍</span>
              <div className="font-bold text-sm text-neutral-800">WHERE WILL YOU WEAR THIS?</div>
            </div>
            <div className="text-xs text-neutral-600 leading-relaxed mb-3">
              Help other shoppers avoid wearing the same dress at the same event
            </div>
            <div className="flex items-center gap-2 text-xs text-orange-700">
              <span>🎁</span>
              <span className="font-bold">Share and get SAR 20 off your next order</span>
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-3 block">EVENT TYPE</label>
            <div className="flex gap-3">
              <button className="border-2 border-neutral-800 bg-white rounded-lg px-6 py-3 text-center font-bold text-sm">
                Wedding
              </button>
              <button className="border border-neutral-300 bg-white rounded-lg px-6 py-3 text-center font-bold text-sm text-neutral-700">
                Party
              </button>
              <button className="border border-neutral-300 bg-white rounded-lg px-6 py-3 text-center font-bold text-sm text-neutral-700">
                Formal
              </button>
            </div>
          </div>

          {/* Event Date */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">EVENT DATE</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select date"
                className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm text-neutral-500"
                readOnly
              />
              <div className="absolute left-3 top-3 text-sm">📅</div>
              <div className="absolute right-3 top-3 text-neutral-400">▾</div>
            </div>
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">CITY</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Select city"
                className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm text-neutral-500"
                readOnly
              />
              <div className="absolute right-3 top-3 text-neutral-400">▾</div>
            </div>
          </div>

          {/* Venue (Optional) */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">VENUE (Optional)</label>
            <input
              type="text"
              placeholder="e.g., Ritz Carlton"
              className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm"
            />
          </div>

          {/* Privacy notice */}
          <div className="bg-neutral-100 rounded-lg p-3 flex items-start gap-2">
            <span className="text-sm">🔒</span>
            <div className="text-xs text-neutral-600 leading-relaxed">
              This info is private and helps our community avoid awkward matching
            </div>
          </div>

          <div className="pb-32"></div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="border-t border-neutral-200 bg-white p-4 space-y-2">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full">
          CONTINUE
        </button>
        <div className="text-center">
          <button className="text-xs text-neutral-500 underline">
            [Skip - I don't want to share]
          </button>
        </div>
      </div>
    </div>
  );
}

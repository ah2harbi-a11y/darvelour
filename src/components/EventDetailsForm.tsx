export default function EventDetailsForm() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">Event Details</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-6">
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="text-xs text-neutral-500 mb-2">Step 1 of 2</div>
            <div className="flex gap-1">
              <div className="h-1 flex-1 bg-neutral-800 rounded"></div>
              <div className="h-1 flex-1 bg-neutral-200 rounded"></div>
            </div>
          </div>

          {/* Occasion Type */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-3 block">OCCASION TYPE *</label>
            <div className="grid grid-cols-3 gap-3 mb-3">
              <button className="border-2 border-neutral-800 bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">💒</div>
                <div className="text-xs font-bold text-neutral-800">Wedding</div>
              </button>
              <button className="border border-neutral-300 bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">🎉</div>
                <div className="text-xs font-bold text-neutral-700">Party</div>
              </button>
              <button className="border border-neutral-300 bg-white rounded-lg p-4 text-center">
                <div className="text-2xl mb-1">👔</div>
                <div className="text-xs font-bold text-neutral-700">Formal</div>
              </button>
            </div>
            <button className="border border-neutral-300 bg-white rounded-lg p-4 text-center w-32">
              <div className="text-2xl mb-1">👗</div>
              <div className="text-xs font-bold text-neutral-700">Casual</div>
            </button>
          </div>

          {/* Event Date */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">EVENT DATE *</label>
            <div className="relative">
              <input
                type="text"
                value="January 25, 2026"
                className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm"
                readOnly
              />
              <div className="absolute left-3 top-3 text-sm">📅</div>
              <div className="absolute right-3 top-3 text-neutral-400">▾</div>
            </div>
          </div>

          {/* City */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">CITY *</label>
            <div className="relative">
              <input
                type="text"
                value="Riyadh"
                className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm"
                readOnly
              />
              <div className="absolute right-3 top-3 text-neutral-400">▾</div>
            </div>
          </div>

          {/* Venue / Mall Name */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">VENUE / MALL NAME *</label>
            <input
              type="text"
              placeholder="Ritz Carlton"
              className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm"
            />
            <div className="text-xs text-neutral-500 mt-1">Show autocomplete suggestions dropdown</div>
          </div>

          {/* Area / District */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">AREA / DISTRICT</label>
            <input
              type="text"
              placeholder="Al Olaya"
              className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm"
            />
          </div>

          {/* Event Name */}
          <div>
            <label className="text-xs font-bold text-neutral-700 mb-2 block">EVENT NAME (Optional)</label>
            <input
              type="text"
              placeholder="e.g., Sarah's Wedding"
              className="w-full border border-neutral-300 rounded-lg px-3 py-3 text-sm"
            />
          </div>

          {/* Privacy notice */}
          <div className="bg-neutral-100 rounded-lg p-3 flex items-start gap-2">
            <span className="text-sm">🔒</span>
            <div className="text-xs text-neutral-600 leading-relaxed">
              Your information is private and will never be shared with other customers
            </div>
          </div>

          <div className="pb-24"></div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="border-t border-neutral-200 bg-white p-4">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full">
          CHECK AVAILABILITY
        </button>
      </div>
    </div>
  );
}

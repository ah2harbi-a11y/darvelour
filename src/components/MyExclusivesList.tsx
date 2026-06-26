export default function MyExclusivesList() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">My Exclusives</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-5">
          {/* Tab selector */}
          <div className="flex gap-3">
            <button className="border-2 border-neutral-800 bg-neutral-800 text-white rounded-lg px-6 py-3 font-bold text-sm">
              Active<br/>
              <span className="text-lg">1</span>
            </button>
            <button className="border border-neutral-300 bg-white text-neutral-700 rounded-lg px-6 py-3 font-bold text-sm">
              Past<br/>
              <span className="text-lg">3</span>
            </button>
            <button className="border border-neutral-300 bg-white text-neutral-700 rounded-lg px-6 py-3 font-bold text-sm">
              Cancelled<br/>
              <span className="text-lg">0</span>
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Section heading */}
          <div className="text-xs font-bold text-neutral-500">ACTIVE BOOKINGS</div>

          {/* Active booking card */}
          <div className="border border-neutral-300 rounded-lg p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-20 h-24 bg-neutral-100 border border-neutral-200 rounded flex items-center justify-center text-[10px] text-neutral-300 flex-shrink-0">
                [IMG]
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm mb-1">Elegant Evening Dress</div>
                <div className="text-xs text-neutral-500 mb-3">Style #DRN-8847</div>

                <div className="space-y-1.5 text-xs text-neutral-700">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>Ritz Carlton, Riyadh</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span>
                    <span>January 25, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💒</span>
                    <span>Wedding</span>
                  </div>
                </div>

                <div className="text-xs text-neutral-500 mt-3">
                  Certificate #EXC-94857
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button className="flex-1 border-2 border-neutral-800 text-neutral-800 py-2.5 font-bold rounded-full text-sm">
                View Certificate
              </button>
              <button className="flex-1 border border-neutral-300 text-neutral-700 py-2.5 font-bold rounded-full text-sm">
                Cancel
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Tip box */}
          <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-lg">💡</span>
              <div className="text-xs text-neutral-700 leading-relaxed">
                <span className="font-bold">TIP</span><br/>
                Your exclusivity is guaranteed until January 26, 2026 (day after your event)
              </div>
            </div>
          </div>

          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}

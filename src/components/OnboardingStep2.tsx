export default function OnboardingStep2() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Progress indicator - showing step 2 */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full"></div>
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full"></div>
          <div className="flex-1 h-1.5 bg-neutral-200 rounded-full"></div>
        </div>
        <div className="text-xs text-neutral-500">Step 2 of 3</div>
      </div>

      {/* Title & Context */}
      <div className="px-6 mb-6">
        <h1 className="font-bold mb-2">What's your size?</h1>
        <p className="text-sm text-neutral-600">This helps us show relevant options</p>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        {/* Size selector - PRIMARY FOCUS / HERO */}
        <div className="mb-3">
          <div className="grid grid-cols-3 gap-3 mb-3">
            <button className="border-2 border-neutral-300 py-5 font-bold rounded-lg text-neutral-800 hover:border-neutral-400 transition-colors">
              XS
            </button>
            <button className="border-2 border-neutral-300 py-5 font-bold rounded-lg text-neutral-800 hover:border-neutral-400 transition-colors">
              S
            </button>
            <button className="border-2 border-neutral-800 bg-neutral-800 text-white py-5 font-bold rounded-lg">
              M
            </button>
            <button className="border-2 border-neutral-300 py-5 font-bold rounded-lg text-neutral-800 hover:border-neutral-400 transition-colors">
              L
            </button>
            <button className="border-2 border-neutral-300 py-5 font-bold rounded-lg text-neutral-800 hover:border-neutral-400 transition-colors">
              XL
            </button>
            <button className="border-2 border-neutral-300 py-5 font-bold rounded-lg text-neutral-800 hover:border-neutral-400 transition-colors">
              XXL
            </button>
          </div>
          <div className="text-center">
            <button className="text-sm underline text-neutral-600">Not sure? We'll help</button>
          </div>
        </div>

        {/* Spacing between hero and secondary sections */}
        <div className="h-8"></div>

        {/* Budget range - SECONDARY / OPTIONAL */}
        <div className="mb-6">
          <div className="text-xs font-bold mb-3 text-neutral-500">BUDGET RANGE (OPTIONAL)</div>
          <div className="flex flex-wrap gap-2">
            <button className="px-5 py-2.5 border border-neutral-800 bg-neutral-800 text-white rounded-full text-sm font-medium">
              Under SAR 500
            </button>
            <button className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors">
              SAR 500–1,000
            </button>
            <button className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors">
              SAR 1,000–2,000
            </button>
            <button className="px-5 py-2.5 border border-neutral-300 text-neutral-700 rounded-full text-sm font-medium hover:border-neutral-400 transition-colors">
              SAR 2,000+
            </button>
          </div>
        </div>

        {/* Fit preference - SECONDARY / OPTIONAL / DE-EMPHASIZED */}
        <div className="mb-6">
          <div className="text-xs font-bold mb-3 text-neutral-500">FIT PREFERENCE (OPTIONAL)</div>
          <div className="flex gap-2">
            <button className="flex-1 border border-neutral-300 py-2.5 text-sm font-medium rounded-lg text-neutral-700 hover:border-neutral-400 transition-colors">
              Fitted
            </button>
            <button className="flex-1 border border-neutral-300 py-2.5 text-sm font-medium rounded-lg text-neutral-700 hover:border-neutral-400 transition-colors">
              Regular
            </button>
            <button className="flex-1 border border-neutral-300 py-2.5 text-sm font-medium rounded-lg text-neutral-700 hover:border-neutral-400 transition-colors">
              Loose
            </button>
          </div>
        </div>
      </div>

      {/* Bottom actions - fixed at bottom */}
      <div className="p-6 space-y-3">
        <button className="w-full bg-neutral-800 text-white py-4 px-6 font-bold rounded-full">
          Next
        </button>
        <div className="flex justify-between text-sm">
          <button className="underline text-neutral-600">← Back</button>
          <button className="underline text-neutral-600">Skip</button>
        </div>
      </div>
    </div>
  );
}
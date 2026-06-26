export default function OnboardingStep3() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Progress indicator - fully complete - EMPHASIZED */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full"></div>
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full"></div>
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full"></div>
        </div>
        <div className="text-xs font-bold text-neutral-800">Step 3 of 3 • Almost there!</div>
      </div>

      {/* Title & Context */}
      <div className="px-6 mb-6">
        <h1 className="font-bold mb-2">What's your style?</h1>
        <p className="text-sm text-neutral-500">Select any styles you like</p>
      </div>

      {/* Style Grid - image-based, multi-select - REDUCED HEIGHT & SOFTER */}
      <div className="flex-1 overflow-auto px-6 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Style 1 - Modern (Selected) */}
          <button className="border-2 border-neutral-400 rounded-lg overflow-hidden relative">
            <div className="aspect-[4/5] bg-neutral-50 flex items-center justify-center text-xs">
              <div className="text-neutral-300">STYLE IMAGE</div>
            </div>
            {/* Checkmark overlay for selected state - SOFTER */}
            <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-neutral-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div className="p-2.5 text-center font-bold text-xs bg-white border-t border-neutral-200">
              Modern
            </div>
          </button>

          {/* Style 2 - Classic (Unselected) */}
          <button className="border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-colors opacity-75">
            <div className="aspect-[4/5] bg-neutral-50 flex items-center justify-center text-xs">
              <div className="text-neutral-300">STYLE IMAGE</div>
            </div>
            <div className="p-2.5 text-center font-bold text-xs bg-white border-t border-neutral-200 text-neutral-600">
              Classic
            </div>
          </button>

          {/* Style 3 - Elegant (Selected) */}
          <button className="border-2 border-neutral-400 rounded-lg overflow-hidden relative">
            <div className="aspect-[4/5] bg-neutral-50 flex items-center justify-center text-xs">
              <div className="text-neutral-300">STYLE IMAGE</div>
            </div>
            {/* Checkmark overlay for selected state - SOFTER */}
            <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-neutral-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
            <div className="p-2.5 text-center font-bold text-xs bg-white border-t border-neutral-200">
              Elegant
            </div>
          </button>

          {/* Style 4 - Modest (Unselected) */}
          <button className="border border-neutral-200 rounded-lg overflow-hidden hover:border-neutral-300 transition-colors opacity-75">
            <div className="aspect-[4/5] bg-neutral-50 flex items-center justify-center text-xs">
              <div className="text-neutral-300">STYLE IMAGE</div>
            </div>
            <div className="p-2.5 text-center font-bold text-xs bg-white border-t border-neutral-200 text-neutral-600">
              Modest
            </div>
          </button>
        </div>
      </div>

      {/* Bottom actions - Done always enabled */}
      <div className="p-6 space-y-3">
        <button className="w-full bg-neutral-800 text-white py-4 px-6 font-bold rounded-full">
          Done
        </button>
        <div className="flex justify-between text-sm">
          <button className="underline text-neutral-600">← Back</button>
          <button className="underline text-neutral-600">Skip</button>
        </div>
      </div>
    </div>
  );
}
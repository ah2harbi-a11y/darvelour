export default function OnboardingStep1() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Progress indicator - horizontal bar with clear fill */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full"></div>
          <div className="flex-1 h-1.5 bg-neutral-200 rounded-full"></div>
          <div className="flex-1 h-1.5 bg-neutral-200 rounded-full"></div>
        </div>
        <div className="text-xs text-neutral-500">Step 1 of 3</div>
      </div>

      {/* Title & Subtitle */}
      <div className="px-6 mb-6">
        <h1 className="font-bold mb-2">What's the occasion?</h1>
        <p className="text-sm text-neutral-600">Help us find the perfect dress for you</p>
      </div>

      {/* Occasion Grid - 2 columns, breathable spacing */}
      <div className="flex-1 px-6 pb-6 overflow-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Selected state example - Wedding */}
          <button className="border-2 border-neutral-800 bg-neutral-800 text-white p-6 rounded-xl aspect-square flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <div className="text-4xl">💍</div>
            </div>
            <div className="font-bold text-sm">Wedding</div>
          </button>

          {/* Unselected states */}
          <button className="border-2 border-neutral-300 bg-white p-6 rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-neutral-400 transition-colors">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <div className="text-4xl">🎉</div>
            </div>
            <div className="font-bold text-sm text-neutral-800">Party</div>
          </button>

          <button className="border-2 border-neutral-300 bg-white p-6 rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-neutral-400 transition-colors">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <div className="text-4xl">💼</div>
            </div>
            <div className="font-bold text-sm text-neutral-800">Formal</div>
          </button>

          <button className="border-2 border-neutral-300 bg-white p-6 rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-neutral-400 transition-colors">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <div className="text-4xl">👗</div>
            </div>
            <div className="font-bold text-sm text-neutral-800">Casual</div>
          </button>

          <button className="border-2 border-neutral-300 bg-white p-6 rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-neutral-400 transition-colors">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <div className="text-4xl">🌙</div>
            </div>
            <div className="font-bold text-sm text-neutral-800">Modest</div>
          </button>

          <button className="border-2 border-neutral-300 bg-white p-6 rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-neutral-400 transition-colors">
            <div className="w-12 h-12 mb-3 flex items-center justify-center">
              <div className="text-4xl">🌴</div>
            </div>
            <div className="font-bold text-sm text-neutral-800">Vacation</div>
          </button>
        </div>
      </div>

      {/* Bottom actions - fixed at bottom */}
      <div className="p-6 space-y-3">
        <button className="w-full bg-neutral-800 text-white py-4 px-6 font-bold rounded-full">
          Next
        </button>
        <div className="text-center">
          <button className="text-sm underline text-neutral-600">Skip</button>
        </div>
      </div>
    </div>
  );
}
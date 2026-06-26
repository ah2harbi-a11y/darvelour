export default function VirtualTryOnIntro() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">✕</button>
        <div className="font-bold">VIRTUAL TRY-ON</div>
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">?</button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* Hero Visual */}
        <div className="px-8 pt-8 pb-6">
          <div className="w-full h-64 border-2 border-dashed border-neutral-300 rounded-2xl bg-neutral-50 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-24 h-32 border-2 border-neutral-400 rounded-full mx-auto mb-2"></div>
              <div className="w-20 h-28 border-2 border-neutral-600 rounded-lg mx-auto"></div>
            </div>
            {/* Sparkle effects */}
            <div className="absolute top-4 left-6 text-2xl">✨</div>
            <div className="absolute bottom-6 right-6 text-xl">✨</div>
            <div className="absolute top-8 right-8 text-lg">✨</div>
          </div>
        </div>

        {/* Title Section */}
        <div className="px-6 pb-6 text-center">
          <h2 className="font-bold text-xl mb-2">See It On You</h2>
          <h3 className="font-bold text-xl mb-3">Before You Buy</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Our AI creates a realistic preview<br />
            of how this dress will look on you
          </p>
        </div>

        {/* How It Works */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-2 bg-neutral-50">
                <span className="text-2xl">📷</span>
              </div>
              <div className="text-xs font-bold mb-1">Step 1</div>
              <div className="text-[10px] text-neutral-600 leading-tight">Take a photo</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-2 bg-neutral-50">
                <span className="text-2xl">✨</span>
              </div>
              <div className="text-xs font-bold mb-1">Step 2</div>
              <div className="text-[10px] text-neutral-600 leading-tight">AI processes</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-neutral-800 rounded-full flex items-center justify-center mx-auto mb-2 bg-neutral-50">
                <span className="text-2xl">👗</span>
              </div>
              <div className="text-xs font-bold mb-1">Step 3</div>
              <div className="text-[10px] text-neutral-600 leading-tight">See the result</div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mx-6 mb-6 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 border border-neutral-800 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🔒</span>
            </div>
            <div className="text-xs text-neutral-700 leading-relaxed">
              Your photos are processed securely and never stored on our servers
            </div>
          </div>
        </div>

        <div className="pb-4"></div>
      </div>

      {/* Fixed Footer - CTA Buttons */}
      <div className="border-t border-neutral-200 bg-white px-4 py-4">
        <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full mb-2">
          TAKE A PHOTO
        </button>
        <button className="w-full border-2 border-neutral-800 text-neutral-800 py-3.5 font-bold rounded-full mb-3 text-sm">
          UPLOAD FROM GALLERY
        </button>
        <div className="text-center">
          <button className="text-xs text-neutral-600 underline">Skip for now</button>
        </div>
      </div>
    </div>
  );
}

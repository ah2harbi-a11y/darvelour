export default function WelcomeScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Language toggle - top right, subtle */}
      <div className="p-4 flex justify-end">
        <div className="border border-neutral-400 rounded px-3 py-1 text-xs text-neutral-600">
          AR | EN
        </div>
      </div>

      {/* Main content - centered vertically */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        {/* Logo - reduced size by 35%, lighter styling */}
        <div className="w-20 h-20 border border-neutral-200 rounded-lg flex items-center justify-center mb-8 bg-neutral-50">
          <div className="text-center">
            <div className="text-sm font-bold text-neutral-800">DRESS</div>
            <div className="text-sm font-bold text-neutral-800">NOW</div>
          </div>
        </div>

        {/* Single visual element - dress + speed indicator */}
        <div className="mb-8 relative">
          <div className="w-20 h-28 border border-neutral-200 rounded-lg bg-neutral-50 flex items-center justify-center">
            <div className="text-4xl">👗</div>
          </div>
          <div className="absolute -right-2 -top-2 w-8 h-8 border-2 border-neutral-800 bg-white rounded-full flex items-center justify-center text-xs font-bold">
            24h
          </div>
        </div>

        {/* Headline - primary value proposition */}
        <h1 className="font-bold text-center mb-6 max-w-xs leading-snug">
          Your perfect dress.<br />Delivered in 24 hours.
        </h1>

        {/* Supporting benefits - scannable with subtle icons */}
        <div className="flex items-center justify-center gap-6 mb-10 text-xs text-neutral-600">
          <div className="flex flex-col items-center gap-1">
            <div className="text-base">◆</div>
            <div>Multiple<br />Boutiques</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-base">⚡</div>
            <div>24h<br />Delivery</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="text-base">↩</div>
            <div>Easy<br />Returns</div>
          </div>
        </div>

        {/* Primary CTA - strong emphasis */}
        <div className="w-full max-w-xs mb-3">
          <button className="w-full border-2 border-neutral-800 text-neutral-800 py-4 px-6 font-bold rounded-full">
            Get Started
          </button>
        </div>

        {/* Trust microcopy - subtle reassurance */}
        <div className="text-xs text-neutral-500 mb-6">
          No commitment · Browse as guest
        </div>

        {/* Secondary action - visually distinct but secondary */}
        <div className="text-sm text-neutral-600">
          Already have an account? <span className="font-bold underline text-neutral-800">Login</span>
        </div>
      </div>
    </div>
  );
}
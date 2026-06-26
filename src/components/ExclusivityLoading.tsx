export default function ExclusivityLoading() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">Checking</div>
        <div className="w-8"></div>
      </div>

      {/* Content centered */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-sm w-full">
          {/* Spinning loader */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 border-4 border-neutral-200 border-t-neutral-800 rounded-full animate-spin"></div>
          </div>

          {/* Status text */}
          <div className="mb-6">
            <div className="text-sm text-neutral-700 mb-2">Checking availability...</div>
            <div className="text-xs text-neutral-500">This takes a few seconds</div>
          </div>

          {/* Event details card */}
          <div className="bg-neutral-100 rounded-lg p-4 inline-block">
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span>📍</span>
                <span>Ritz Carlton</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span>📅</span>
                <span>January 25, 2026</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700">
                <span>💒</span>
                <span>Wedding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

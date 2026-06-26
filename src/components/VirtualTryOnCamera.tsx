export default function VirtualTryOnCamera() {
  return (
    <div className="w-full h-full bg-neutral-800 flex flex-col relative">
      {/* Camera View - Full screen */}
      <div className="absolute inset-0 bg-neutral-700 flex items-center justify-center">
        <div className="text-center text-neutral-500 text-xs">
          CAMERA VIEWFINDER
        </div>
      </div>

      {/* Body Guide Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          {/* Head circle */}
          <div className="w-16 h-16 border-2 border-dashed border-white/60 rounded-full mx-auto mb-4"></div>
          {/* Body outline */}
          <div className="w-32 h-64 border-2 border-dashed border-white/60 rounded-full"></div>
          {/* Alignment text */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap bg-black/50 px-3 py-1 rounded-full">
            Align yourself with the guide
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="relative z-10 px-4 py-4 flex items-center justify-between">
        <button className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white">
          ✕
        </button>
        <button className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white">
          ⚡
        </button>
        <button className="w-10 h-10 bg-black/40 backdrop-blur rounded-full flex items-center justify-center text-white">
          ⟲
        </button>
      </div>

      {/* Instructions Banner */}
      <div className="relative z-10 mx-4 mt-2 bg-black/60 backdrop-blur rounded-lg p-3">
        <div className="text-white text-xs font-bold mb-2">Stand 2 meters away</div>
        <div className="text-white/80 text-xs mb-2">Keep arms slightly apart</div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-white/90">
            <span className="text-green-400">✓</span>
            <span>Good lighting</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/90">
            <span className="text-green-400">✓</span>
            <span>Full body visible</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="w-3 h-3 border border-white/60 rounded-sm"></span>
            <span>Hold steady</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-8 pt-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-center gap-8">
          {/* Gallery thumbnail */}
          <div className="w-12 h-12 border border-white/40 rounded-lg bg-white/10 flex items-center justify-center">
            <div className="text-white/60 text-[8px]">Gallery</div>
          </div>

          {/* Capture button */}
          <button className="w-20 h-20 rounded-full bg-white border-4 border-neutral-300 shadow-xl flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-neutral-400"></div>
          </button>

          {/* Selected dress thumbnail */}
          <div className="w-12 h-16 border border-white/40 rounded bg-white/10 flex flex-col items-center justify-center p-1">
            <div className="w-8 h-10 bg-neutral-600 rounded mb-0.5"></div>
            <div className="text-white text-[7px] leading-tight text-center">Dress Name</div>
          </div>
        </div>
      </div>

      {/* Processing Overlay (commented - shown when capturing) */}
      {/* 
      <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4 animate-spin"></div>
          <div className="text-white font-bold mb-2">AI is working its magic...</div>
          <div className="text-white/70 text-xs space-y-1">
            <div>✓ Analyzing your photo</div>
            <div>✓ Fitting the dress</div>
            <div className="text-white font-bold">Almost done...</div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}

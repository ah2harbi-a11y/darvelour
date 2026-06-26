export default function ExclusivityCertificate() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <button className="text-sm text-neutral-600 font-bold flex items-center gap-1">
          Share 📤
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto bg-neutral-100">
        <div className="p-4 space-y-5">
          {/* Certificate card with shadow */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Inner certificate with cream/gold background */}
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-4 border-yellow-700 rounded-lg m-4 p-6">
              {/* Crown icon */}
              <div className="flex justify-center mb-4">
                <span className="text-3xl">👑</span>
              </div>

              {/* Certificate title */}
              <div className="text-center text-xs font-bold text-neutral-700 tracking-wider mb-6">
                EXCLUSIVITY CERTIFICATE
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-400 mb-6"></div>

              {/* Certificate text */}
              <div className="text-xs text-neutral-700 leading-relaxed space-y-4">
                <p className="text-center">This certifies that</p>
                
                <p className="text-center font-bold text-sm">FATIMA AL-RASHID</p>
                
                <p className="text-center">Has exclusive rights to</p>
                
                <p className="text-center font-bold">
                  Elegant Evening Dress<br/>
                  Style #DRN-8847
                </p>

                {/* Divider */}
                <div className="border-t border-neutral-400 my-4"></div>

                <div className="space-y-1">
                  <p>Event: Wedding</p>
                  <p>Date: January 25, 2026</p>
                  <p>Venue: Ritz Carlton</p>
                  <p>City: Riyadh</p>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-400 my-4"></div>

                <p className="text-center text-neutral-600">Certificate #EXC-94857</p>
                
                <p className="text-center text-[10px] text-neutral-500">[QR CODE]</p>
                
                <p className="text-center font-bold text-neutral-800">DRESSNOW</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full text-sm">
            SAVE TO PHOTOS
          </button>

          <button className="w-full border-2 border-neutral-300 text-neutral-800 py-4 font-bold rounded-full text-sm">
            VIEW MY ORDER
          </button>

          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}

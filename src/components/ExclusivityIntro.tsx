import { Crown } from 'lucide-react';
import dressImage from 'figma:asset/29d708beeb1730140360f560144f754167573530.png';

export default function ExclusivityIntro({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="w-full min-h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal */}
      <div className="bg-white rounded-2xl w-full max-w-sm relative">
        {/* Close button */}
        <button className="absolute top-4 left-4 w-8 h-8 text-neutral-400 text-xl">×</button>
        
        {/* Crown icon */}
        <div className="pt-6 pb-4 flex justify-center">
          <Crown className="text-3xl" />
        </div>

        {/* Scrollable content */}
        <div className="px-6 pb-6">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-xs font-bold text-neutral-500 tracking-wider mb-2">DRESS EXCLUSIVITY</div>
          </div>

          {/* Dress card */}
          <div className="border border-neutral-300 rounded-lg p-4 mb-6">
            <div className="aspect-[3/4] bg-neutral-100 rounded flex items-center justify-center mb-3">
              <img src={dressImage} alt="Dress" className="w-full h-full" />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold mb-1">Elegant Evening Dress</div>
              <div className="text-sm text-neutral-600">SAR 2,450</div>
            </div>
          </div>

          {/* How it works */}
          <div className="mb-6">
            <div className="text-xs font-bold text-neutral-700 mb-4">HOW IT WORKS</div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-neutral-600">
                  1
                </div>
                <div className="text-xs text-neutral-700 leading-relaxed pt-1">
                  <div className="font-bold mb-0.5">Tell us your event details</div>
                  <div className="text-neutral-500">Date, venue, and occasion</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-neutral-600">
                  2
                </div>
                <div className="text-xs text-neutral-700 leading-relaxed pt-1">
                  <div className="font-bold mb-0.5">We check our database</div>
                  <div className="text-neutral-500">Against all purchases</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-neutral-600">
                  3
                </div>
                <div className="text-xs text-neutral-700 leading-relaxed pt-1">
                  <div className="font-bold mb-0.5">Lock this dress</div>
                  <div className="text-neutral-500">For your specific event</div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 border border-neutral-300 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold text-neutral-600">
                  4
                </div>
                <div className="text-xs text-neutral-700 leading-relaxed pt-1">
                  <div className="font-bold mb-0.5">Get your certificate</div>
                  <div className="text-neutral-500">Digital proof of exclusivity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats badge */}
          <div className="bg-neutral-100 rounded-lg p-3 mb-4 flex items-center gap-2">
            <span className="text-xs">🔒</span>
            <span className="text-xs text-neutral-700">547 dresses locked this month in Riyadh</span>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-neutral-800 text-white py-3.5 font-bold rounded-full text-sm mb-3" onClick={onContinue}>
            CHECK AVAILABILITY
          </button>

          {/* Pricing info */}
          <div className="text-center text-xs text-neutral-500">
            Exclusivity fee: SAR 50-150
          </div>
        </div>
      </div>
    </div>
  );
}
import { AlertCircle } from 'lucide-react';
import dressImage from 'figma:asset/29d708beeb1730140360f560144f754167573530.png';

export default function ConflictNotification({ onResolve }: { onResolve: () => void }) {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">Heads Up!</div>
        <div className="w-8"></div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 space-y-5">
          {/* Warning icon with dress */}
          <div className="flex justify-center py-6">
            <div className="w-24 h-32 border-4 border-red-600 rounded flex items-center justify-center">
              <div className="text-3xl">👗</div>
            </div>
          </div>

          {/* Warning message */}
          <div className="text-center text-sm text-neutral-700 leading-relaxed mb-4">
            Someone just purchased the same<br/>dress as you with exclusivity
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-300"></div>

          {/* Dress details */}
          <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4">
            <img src={dressImage} alt="Dress" className="w-full h-auto mb-2 rounded" />
            <div className="font-bold text-sm mb-1">Elegant Evening Dress</div>
            <div className="text-xs text-neutral-500">Your purchase: January 10, 2026</div>
          </div>

          {/* Their event details */}
          <div>
            <div className="text-xs font-bold text-neutral-700 mb-3">THEIR EVENT DETAILS:</div>
            <div className="bg-neutral-100 border border-neutral-200 rounded-lg p-4 space-y-2 text-xs text-neutral-700">
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
          </div>

          {/* Warning box */}
          <div className="bg-yellow-50 border border-yellow-600 rounded-lg p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-yellow-600 text-lg">⚠</span>
              <div className="font-bold text-sm text-neutral-800">IS THIS YOUR EVENT TOO?</div>
            </div>
            <div className="text-xs text-neutral-700 leading-relaxed">
              If you're attending the same event, you might want to exchange for a different dress.
            </div>
          </div>

          {/* Action buttons */}
          <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full text-sm">
            EXCHANGE FOR DIFFERENT DRESS (FREE)
          </button>

          <button className="w-full border-2 border-neutral-800 text-neutral-800 py-4 font-bold rounded-full text-sm">
            NO, IT'S A DIFFERENT EVENT
          </button>

          <div className="text-center text-xs text-neutral-500">
            [This is not my dress / Wrong notification]
          </div>

          <div className="pb-6"></div>
        </div>
      </div>
    </div>
  );
}
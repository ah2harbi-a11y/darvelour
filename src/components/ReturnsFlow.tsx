import { useState } from 'react';

export default function ReturnsFlow() {
  const [step, setStep] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  if (step === 1) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center">
          <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
          <div className="flex-1 text-center font-bold">Request Return</div>
          <div className="w-8"></div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <h2 className="font-bold mb-1">Select Order</h2>
            <p className="text-xs text-neutral-500 mb-4">Eligible orders from the last 14 days</p>

            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedOrder(i)}
                  className={`w-full border rounded-lg p-3 text-left transition-all ${
                    selectedOrder === i
                      ? 'border-2 border-neutral-800 bg-neutral-50'
                      : 'border border-neutral-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm">Order #DRN-XXXXX{i}</div>
                      <div className="text-xs text-neutral-500">Jan {20 + i}, 2026</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="font-bold text-sm">SAR 549</div>
                      {selectedOrder === i && (
                        <div className="w-5 h-5 rounded-full bg-neutral-800 flex items-center justify-center text-white text-xs">✓</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <div className="w-10 h-12 border border-neutral-200 bg-neutral-100 rounded text-[10px] flex items-center justify-center">
                      IMG
                    </div>
                    <div className="text-xs text-neutral-600">
                      Evening Dress · Size M
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky footer with Continue button */}
        <div className="p-4 border-t border-neutral-200 bg-white">
          <button
            onClick={() => selectedOrder && setStep(2)}
            disabled={!selectedOrder}
            className={`w-full py-4 font-bold rounded-full transition-all ${
              selectedOrder
                ? 'bg-neutral-800 text-white'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex items-center">
          <button onClick={() => setStep(1)} className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
            ←
          </button>
          <div className="flex-1 text-center font-bold">Select Items</div>
          <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="mb-4">
            <div className="text-xs text-neutral-500 mb-1">ORDER #DRN-XXXXX1</div>
            <h2 className="font-bold">Select items to return</h2>
          </div>

          <div className="space-y-3 mb-6">
            <div className="border-2 border-neutral-800 rounded-lg p-4 flex items-start gap-3 bg-neutral-50">
              <div className="w-5 h-5 border-2 border-neutral-800 bg-neutral-800 mt-1 flex-shrink-0"></div>
              <div className="w-16 h-20 border border-neutral-200 bg-neutral-100 rounded text-xs flex items-center justify-center flex-shrink-0">
                IMG
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm">Evening Dress Name</div>
                <div className="text-xs text-neutral-600 mb-1">Size: M</div>
                <div className="font-bold text-sm">SAR 549</div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setStep(3)}
            className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex items-center">
          <button onClick={() => setStep(2)} className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
            ←
          </button>
          <div className="flex-1 text-center font-bold">Return Reason</div>
          <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="mb-6">
            <h2 className="font-bold mb-1">Why are you returning?</h2>
            <p className="text-xs text-neutral-500">This helps us improve</p>
          </div>

          <div className="space-y-2 mb-6">
            {[
              "Doesn't fit",
              'Not as described',
              'Changed my mind',
              'Received wrong item',
              'Damaged/Defective',
            ].map((reason, idx) => (
              <button key={reason} className={`w-full border rounded-lg p-3 flex items-center gap-3 text-left ${
                idx === 0 ? 'border-2 border-neutral-800 bg-neutral-50' : 'border border-neutral-200'
              }`}>
                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${
                  idx === 0 ? 'border-neutral-800 bg-neutral-800' : 'border-neutral-300'
                }`}></div>
                <span className="text-sm">{reason}</span>
              </button>
            ))}
          </div>

          <div className="mb-6">
            <div className="text-xs font-bold mb-2 text-neutral-500">ADDITIONAL COMMENTS (OPTIONAL)</div>
            <div className="border border-neutral-200 rounded-lg p-3 h-24 text-sm text-neutral-400">
              Tell us more...
            </div>
          </div>

          <button
            onClick={() => setStep(4)}
            className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="p-4 border-b border-neutral-200 flex items-center">
          <button onClick={() => setStep(3)} className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">
            ←
          </button>
          <div className="flex-1 text-center font-bold">Schedule Pickup</div>
          <div className="w-8"></div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="mb-6">
            <h2 className="font-bold">Schedule Pickup</h2>
          </div>

          <div className="mb-6">
            <div className="text-xs font-bold mb-2 text-neutral-500">PICKUP DATE</div>
            <div className="grid grid-cols-7 gap-2">
              {['Mon\n25', 'Tue\n26', 'Wed\n27', 'Thu\n28', 'Fri\n29', 'Sat\n30', 'Sun\n31'].map((day, i) => (
                <button
                  key={day}
                  className={`border rounded-lg py-3 text-xs font-bold whitespace-pre-line ${
                    i === 1 ? 'border-2 border-neutral-800 bg-neutral-800 text-white' : 'border border-neutral-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs font-bold mb-2 text-neutral-500">PICKUP TIME</div>
            <div className="space-y-2">
              {['Morning (9 AM - 12 PM)', 'Afternoon (12 PM - 4 PM)', 'Evening (4 PM - 8 PM)'].map((time, i) => (
                <button
                  key={time}
                  className={`w-full border rounded-lg p-3 text-left ${i === 1 ? 'border-2 border-neutral-800 bg-neutral-800 text-white' : 'border border-neutral-200'}`}
                >
                  <div className="text-sm font-bold">{time}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-xs font-bold mb-2 text-neutral-500">PICKUP ADDRESS</div>
            <div className="border border-neutral-200 rounded-lg bg-neutral-50 p-4">
              <div className="font-bold mb-1 text-sm">Home</div>
              <div className="text-xs text-neutral-600">
                King Fahd Road, Al Olaya District<br />
                Riyadh 12211<br />
                +966 5X XXX XXXX
              </div>
            </div>
            <button className="text-xs text-neutral-600 font-bold underline mt-2">Change address</button>
          </div>

          <button
            onClick={() => setStep(5)}
            className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full mb-6"
          >
            Confirm Return
          </button>
        </div>
      </div>
    );
  }

  // Step 5 - Confirmation
  return (
    <div className="w-full h-full bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6 text-3xl text-green-700">
          ✓
        </div>

        <h1 className="text-2xl font-bold mb-2 text-center">Return Confirmed</h1>
        <p className="text-sm text-neutral-600 mb-8 text-center">
          We'll pick up your item on Tuesday
        </p>

        <div className="w-full max-w-sm bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-6">
          <div className="text-xs text-neutral-500 mb-1">RETURN ID</div>
          <div className="font-bold mb-4">#RTN-XXXXXX</div>

          <div className="text-sm mb-3 pb-3 border-b border-neutral-200">
            <div className="text-xs text-neutral-500 mb-1">PICKUP DETAILS</div>
            <div className="font-bold">Tuesday, Jan 26</div>
            <div className="text-xs text-neutral-600">Afternoon (12 PM - 4 PM)</div>
          </div>

          <div className="text-sm">
            <div className="text-xs text-neutral-500 mb-1">REFUND INFO</div>
            <div className="text-xs text-neutral-600">Refund within 3-5 business days</div>
            <div className="font-bold mt-1">SAR 549</div>
          </div>
        </div>

        <button
          onClick={() => setStep(1)}
          className="w-full max-w-sm bg-neutral-800 text-white py-4 font-bold rounded-full"
        >
          Done
        </button>
      </div>
    </div>
  );
}
export default function OrderConfirmation() {
  return (
    <div className="w-full h-full bg-white flex flex-col relative">
      {/* Scrollable content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-auto">
        {/* Success icon - Calm and reassuring */}
        <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mb-6 text-3xl text-green-700">
          ✓
        </div>

        {/* Simplified success messaging - One headline, one reassurance */}
        <h1 className="text-2xl font-bold mb-2 text-center">Order Confirmed</h1>
        <p className="text-sm text-neutral-600 mb-8 text-center">
          We'll deliver your order tomorrow by 6 PM
        </p>

        {/* Key delivery info - Compact */}
        <div className="w-full max-w-sm bg-neutral-50 border border-neutral-200 rounded-lg p-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-neutral-500">ORDER #DRN-XXXXXX</div>
          </div>
          <div className="text-sm mb-1">
            <div className="font-bold">Delivery: Tomorrow, Jan 25</div>
            <div className="text-xs text-neutral-600">Evening slot (4-8 PM)</div>
          </div>
          <div className="text-xs text-neutral-600 mt-2">
            King Fahd Road, Al Olaya District, Riyadh
          </div>
        </div>

        {/* Collapsed order summary */}
        <div className="w-full max-w-sm mb-6">
          <button className="text-xs text-neutral-600 font-bold underline">
            View order details (2 items)
          </button>
        </div>

        {/* Primary CTA - Track Order */}
        <div className="w-full max-w-sm space-y-2 mb-4">
          <button className="w-full bg-neutral-800 text-white py-4 font-bold rounded-full">
            Track Order
          </button>
        </div>

        {/* Secondary actions - De-emphasized */}
        <div className="w-full max-w-sm flex gap-3 mb-8">
          <button className="flex-1 text-xs text-neutral-600 font-bold underline">
            Add to Calendar
          </button>
          <button className="flex-1 text-xs text-neutral-600 font-bold underline">
            Continue Shopping
          </button>
        </div>

        {/* Support */}
        <div className="text-xs text-neutral-500 mb-12">
          Need help? <span className="text-neutral-700 font-bold underline">Contact Support</span>
        </div>

        {/* Referral incentive - Lower position, reduced visual weight */}
        <div className="w-full max-w-sm border border-neutral-200 rounded-lg p-4 bg-neutral-50">
          <div className="text-xs font-bold text-neutral-700 mb-1">Share DressNow</div>
          <div className="text-xs text-neutral-500 mb-3">
            Give SAR 50, get SAR 50 when friends order
          </div>
          <button className="text-xs text-neutral-600 font-bold underline">
            Share with friends
          </button>
        </div>

        <div className="pb-12"></div>
      </div>
    </div>
  );
}
import { Check, Shield } from 'lucide-react';
import { Page, CartItem } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileConfirmProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  cart: CartItem[];
  onPlaceOrder: () => void;
}

export default function MobileConfirm({ onNavigate, onGoBack, wishlistItems, cart, onPlaceOrder }: MobileConfirmProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.dress.price * item.quantity, 0);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Checkout"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-32">
        {/* Progress Steps */}
        <div className="bg-white border-b border-gray-200 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center">
                <Check className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-gray-500">Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center">
                <Check className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <span className="text-sm text-gray-500">Payment</span>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-base font-bold">3</div>
              <span className="text-sm text-black font-medium">Confirm</span>
            </div>
          </div>
        </div>

        {/* Review Your Order */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl text-black font-medium mb-8">Review Your Order</h2>

            {/* Order Items */}
            <div className="mb-8">
              <h3 className="text-base text-black font-medium mb-5">Order Items</h3>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.dress.id} className="flex gap-4">
                    <div className="w-16 h-24 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={getDressImage(item.dress.id)}
                        alt={item.dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base font-medium text-black mb-1">{item.dress.name}</h4>
                      <p className="text-sm text-gray-500 mb-3">Size {item.size} · {item.color} · Qty {item.quantity}</p>
                      <p className="text-lg font-bold text-black">SAR {(item.dress.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Subtotal</span>
                <span className="text-base text-black font-medium">SAR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Delivery</span>
                <span className="text-base text-black font-bold">FREE</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 mb-8">
              <span className="text-xl font-bold text-black">Total</span>
              <span className="text-2xl font-bold text-black">SAR {subtotal.toLocaleString()}</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => onNavigate('payment')}
                className="py-4 rounded-xl border-2 border-gray-300 text-gray-700 text-base font-medium bg-white"
              >
                Back
              </button>
              <button
                onClick={() => { onPlaceOrder(); onNavigate('orders'); }}
                className="py-4 rounded-xl bg-gray-800 text-white text-base font-medium"
              >
                Place Order
              </button>
            </div>

            {/* Security Message */}
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm text-gray-500">Your payment is secure and protected</span>
            </div>
          </div>
        </div>
      </main>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

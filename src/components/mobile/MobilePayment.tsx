import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { Page, CartItem } from '../../App';
import { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobilePaymentProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  cart: CartItem[];
}

export default function MobilePayment({ onNavigate, onGoBack, wishlistItems, cart }: MobilePaymentProps) {
  const [selectedPayment, setSelectedPayment] = useState('card');

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
              <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-base font-medium">1</div>
              <span className="text-sm text-gray-400">Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-base font-bold">2</div>
              <span className="text-sm text-black font-medium">Payment</span>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center text-base font-medium">3</div>
              <span className="text-sm text-gray-400">Confirm</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl text-black font-medium mb-6">Payment Method</h2>

            <div className="space-y-3">
              <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === 'card' ? 'border-gray-800 bg-white' : 'border-gray-200 bg-white'
              }`}>
                <input type="radio" name="payment" value="card" checked={selectedPayment === 'card'}
                  onChange={(e) => setSelectedPayment(e.target.value)} className="w-5 h-5" />
                <CreditCard className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                <span className="text-base text-black font-medium">Credit/Debit Card</span>
              </label>

              <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === 'apple' ? 'border-gray-800 bg-white' : 'border-gray-200 bg-white'
              }`}>
                <input type="radio" name="payment" value="apple" checked={selectedPayment === 'apple'}
                  onChange={(e) => setSelectedPayment(e.target.value)} className="w-5 h-5" />
                <Smartphone className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                <span className="text-base text-black font-medium">Apple Pay</span>
              </label>

              <label className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPayment === 'cash' ? 'border-gray-800 bg-white' : 'border-gray-200 bg-white'
              }`}>
                <input type="radio" name="payment" value="cash" checked={selectedPayment === 'cash'}
                  onChange={(e) => setSelectedPayment(e.target.value)} className="w-5 h-5" />
                <Banknote className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                <span className="text-base text-black font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="px-4 pb-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl text-black font-medium mb-6">Order Summary</h2>

            {/* Cart Items */}
            {cart.map((item) => (
              <div key={item.dress.id} className="flex gap-4 pb-6 mb-6 border-b border-gray-200">
                <div className="w-20 h-28 bg-gray-100 border border-gray-200 rounded-xl flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(item.dress.id)}
                    alt={item.dress.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-black mb-2">{item.dress.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">Size {item.size} · {item.color} · Qty {item.quantity}</p>
                  <p className="text-lg font-bold text-black">SAR {(item.dress.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}

            {/* Price Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Subtotal</span>
                <span className="text-base text-black font-medium">SAR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-600">Delivery</span>
                <span className="text-base text-black font-bold">FREE</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-black">Total</span>
                <span className="text-2xl font-bold text-black">SAR {subtotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Order Button */}
        <div className="px-4 pb-6">
          <button
            onClick={() => onNavigate('confirm')}
            className="w-full bg-gray-800 text-white py-5 rounded-xl text-base font-medium"
          >
            Complete Order
          </button>
        </div>
      </main>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

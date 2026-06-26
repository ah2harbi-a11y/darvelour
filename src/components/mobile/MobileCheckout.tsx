import { MapPin, MoreHorizontal } from 'lucide-react';
import { Page, CartItem } from '../../App';
import { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';

interface MobileCheckoutProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  cart: CartItem[];
}

export default function MobileCheckout({ onNavigate, onGoBack, wishlistItems, cart }: MobileCheckoutProps) {
  const [streetAddress, setStreetAddress] = useState('123 King Fahd Road');
  const [city, setCity] = useState('Riyadh');
  const [district, setDistrict] = useState('Al Olaya District');
  const [postalCode, setPostalCode] = useState('12345');

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
              <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center text-base font-bold">1</div>
              <span className="text-sm text-black font-medium">Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center text-base font-medium">2</div>
              <span className="text-sm text-gray-400">Payment</span>
            </div>
            <div className="flex flex-col items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 text-gray-400 flex items-center justify-center text-base font-medium">3</div>
              <span className="text-sm text-gray-400">Confirm</span>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="text-xl text-black font-medium mb-6">Delivery Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-xs text-gray-400 mb-3 tracking-wide uppercase">Street Address</label>
                <div className="relative">
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full px-4 py-4 pr-24 border border-gray-200 rounded-xl text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button className="p-1"><MoreHorizontal className="w-5 h-5 text-gray-400" strokeWidth={2} /></button>
                    <button className="p-1"><MapPin className="w-5 h-5 text-gray-400" strokeWidth={2} /></button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-3 tracking-wide uppercase">City</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-4 border border-gray-200 rounded-xl text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-3 tracking-wide uppercase">District</label>
                  <input type="text" value={district} onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-3 py-4 border border-gray-200 rounded-xl text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-3 tracking-wide uppercase">Postal Code</label>
                  <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-3 py-4 border border-gray-200 rounded-xl text-base text-black bg-white focus:outline-none focus:ring-2 focus:ring-gray-800" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => onNavigate('payment')}
            className="w-full bg-gray-800 text-white py-5 rounded-xl text-base font-medium"
          >
            Continue to Payment
          </button>
        </div>
      </main>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

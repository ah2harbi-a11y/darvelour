import { X, Truck, Minus, Plus, Trash2, ShoppingBag, Share2 } from 'lucide-react';
import { Page, CartItem } from '../../App';
import { useState } from 'react';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileCartProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  cart: CartItem[];
  onRemoveFromCart: (dressId: number) => void;
  onUpdateQuantity: (dressId: number, quantity: number) => void;
}

export default function MobileCart({ onNavigate, onGoBack, wishlistItems, cart, onRemoveFromCart, onUpdateQuantity }: MobileCartProps) {
  const [deliverySpeed, setDeliverySpeed] = useState('24-hour');

  const [showShareInput, setShowShareInput] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.dress.price * item.quantity, 0);
  const deliveryFee = deliverySpeed === '3-hour' ? 100 : 0;
  const total = subtotal + deliveryFee;

  const handleShareWhatsApp = () => {
    const itemsList = cart.map(item =>
      `• ${item.dress.name} (${item.size}, ${item.color}) x${item.quantity} — SAR ${(item.dress.price * item.quantity).toLocaleString()}`
    ).join('\n');
    const message = `Hi! Check out my Darvelour cart:\n\n${itemsList}\n\nTotal: SAR ${total.toLocaleString()}\n\nShop at Darvelour — Luxury Dresses`;
    const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowShareInput(false);
    setWhatsappNumber('');
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col">
        <MobileHeader
          title="Shopping Cart"
          showBack={true}
          showCart={false}
          onNavigate={onNavigate}
          onBack={onGoBack}
        />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-lg font-bold mb-2">Your cart is empty</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Browse our collection and add dresses to your bag</p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-black text-white px-8 py-3 text-sm font-bold"
          >
            Start Shopping
          </button>
        </div>
        <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Order Summary"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={() => onNavigate('search')}
      />

      <main className="flex-1 overflow-y-auto pb-32">
        <div className="px-4 py-6 bg-white border-b border-gray-200">
          <h1 className="text-xl text-black font-medium">Order Summary</h1>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-3">
          {cart.map((item) => (
            <div key={item.dress.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex gap-4">
                <div className="w-24 h-32 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(item.dress.id)}
                    alt={item.dress.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-black mb-1">{item.dress.name}</h3>
                      <p className="text-xs text-gray-500 mb-1">{item.dress.boutique}</p>
                    </div>
                    <button onClick={() => onRemoveFromCart(item.dress.id)} className="p-1">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Size:</span>
                      <span className="text-xs text-black">{item.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">Color:</span>
                      <span className="text-xs text-black">{item.color}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.dress.id, item.quantity - 1)}
                        className="w-7 h-7 border border-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.dress.id, item.quantity + 1)}
                        className="w-7 h-7 border border-gray-300 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-base font-medium text-black">SAR {(item.dress.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Options */}
        <div className="px-4 pb-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Truck className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <h2 className="text-base text-black font-medium">Delivery Options</h2>
            </div>
            <div className="space-y-3">
              <label className={`border-2 ${deliverySpeed === '24-hour' ? 'border-gray-800' : 'border-gray-300'} rounded-lg p-4 flex items-start gap-3 cursor-pointer bg-white`}>
                <input type="radio" name="delivery" value="24-hour" checked={deliverySpeed === '24-hour'} onChange={(e) => setDeliverySpeed(e.target.value)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-black">24-Hour Delivery</span>
                    <span className="text-sm font-medium text-black">FREE</span>
                  </div>
                  <p className="text-xs text-gray-500">Delivered by tomorrow evening</p>
                </div>
              </label>
              <label className={`border-2 ${deliverySpeed === '3-hour' ? 'border-gray-800' : 'border-gray-300'} rounded-lg p-4 flex items-start gap-3 cursor-pointer bg-white`}>
                <input type="radio" name="delivery" value="3-hour" checked={deliverySpeed === '3-hour'} onChange={(e) => setDeliverySpeed(e.target.value)} className="mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-black">3-Hour Express</span>
                    <span className="bg-gray-700 text-white text-[10px] font-medium px-2 py-0.5 rounded">PREMIUM</span>
                    <span className="text-sm font-medium text-black ml-auto">SAR 100</span>
                  </div>
                  <p className="text-xs text-gray-500">Delivered today by 6:00 PM</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="px-4 pb-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="text-sm text-black">SAR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Delivery</span>
                <span className="text-sm text-black">{deliveryFee === 0 ? 'FREE' : `SAR ${deliveryFee}`}</span>
              </div>
              <div className="h-px bg-gray-200 my-2"></div>
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-black">Total</span>
                <span className="text-xl font-bold text-black">SAR {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Share via WhatsApp */}
        <div className="px-4 pb-6">
          {!showShareInput ? (
            <button
              onClick={() => setShowShareInput(true)}
              className="w-full bg-[#25D366] text-white py-3.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Share Cart via WhatsApp
            </button>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="text-sm font-medium text-black">Share via WhatsApp</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+966 5X XXX XXXX"
                  className="flex-1 px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
                <button
                  onClick={handleShareWhatsApp}
                  disabled={!whatsappNumber.replace(/[^0-9]/g, '')}
                  className="px-5 py-3 bg-[#25D366] text-white rounded-lg text-sm font-medium disabled:opacity-40"
                >
                  Send
                </button>
              </div>
              <button
                onClick={() => { setShowShareInput(false); setWhatsappNumber(''); }}
                className="w-full text-xs text-gray-400 mt-2 py-1"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>

      <div className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => onNavigate('checkout')}
          className="w-full bg-black text-white py-4 rounded-xl text-sm font-semibold tracking-wide"
        >
          Proceed to Checkout — SAR {total.toLocaleString()}
        </button>
      </div>

      <MobileNav currentPage="search" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

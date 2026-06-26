import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, Crown, ShoppingBag } from 'lucide-react';
import { Page, CartItem } from '../../App';
import { useState } from 'react';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

interface DesktopCartProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  cart: CartItem[];
  onRemoveFromCart: (dressId: number) => void;
  onUpdateQuantity: (dressId: number, quantity: number) => void;
}

export default function DesktopCart({ onNavigate, onGoBack, cart, onRemoveFromCart, onUpdateQuantity }: DesktopCartProps) {
  const [deliveryOption, setDeliveryOption] = useState<'24h' | '3h'>('24h');
  const [showShareInput, setShowShareInput] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.dress.price * item.quantity, 0);
  const deliveryFee = deliveryOption === '3h' ? 100 : 0;
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
      <div className="min-h-screen bg-white">
        <div className="max-w-[1400px] mx-auto px-8 py-24 flex flex-col items-center justify-center">
          <ShoppingBag className="w-20 h-20 text-gray-300 mb-6" />
          <h1 className="text-3xl font-light mb-3">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Browse our collection and add dresses to your bag</p>
          <button
            onClick={() => onNavigate('search')}
            className="bg-black text-white px-12 py-4 text-sm font-bold tracking-wider hover:bg-gray-900"
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1400px] mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-light">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.dress.id} className="border border-gray-200 p-6 flex gap-6 bg-white">
                <div className="w-32 aspect-[3/4] bg-gray-100 flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(item.dress.id)}
                    alt={item.dress.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-xs text-gray-500 mb-1 tracking-wide">{item.dress.boutique}</div>
                      <h3 className="font-medium text-lg mb-2">{item.dress.name}</h3>
                    </div>
                    <button
                      onClick={() => onRemoveFromCart(item.dress.id)}
                      className="p-2 hover:bg-gray-100 transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>

                  <div className="flex gap-4 mb-4 text-sm text-gray-500">
                    <span>Size: <strong className="text-black font-medium">{item.size}</strong></span>
                    <span>Color: <strong className="text-black font-medium">{item.color}</strong></span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.dress.id, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.dress.id, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-2xl font-medium">SAR {(item.dress.price * item.quantity).toLocaleString()}</div>
                  </div>

                  <button
                    onClick={() => onNavigate('exclusivity', item.dress.id)}
                    className="mt-4 flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    <Crown className="w-4 h-4 text-yellow-700" />
                    <span>Make this dress exclusive for my event</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="border border-gray-200 rounded-lg p-6 sticky top-24 bg-white shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              {/* Delivery Options */}
              <div className="mb-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Delivery Options</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setDeliveryOption('24h')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-all ${
                      deliveryOption === '24h'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          deliveryOption === '24h' ? 'border-black bg-black' : 'border-gray-300'
                        }`}>
                          {deliveryOption === '24h' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className="text-sm font-medium">24-Hour Delivery</span>
                      </div>
                      <span className="text-sm font-semibold text-green-600">FREE</span>
                    </div>
                    <p className="text-xs text-gray-400 ml-7 mt-1">Delivered by tomorrow evening</p>
                  </button>

                  <button
                    onClick={() => setDeliveryOption('3h')}
                    className={`w-full border-2 rounded-lg p-4 text-left transition-all ${
                      deliveryOption === '3h'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          deliveryOption === '3h' ? 'border-black bg-black' : 'border-gray-300'
                        }`}>
                          {deliveryOption === '3h' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">3-Hour Express</span>
                          <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded font-bold">PREMIUM</span>
                        </div>
                      </div>
                      <span className="text-sm font-semibold">SAR 100</span>
                    </div>
                    <p className="text-xs text-gray-400 ml-7 mt-1">Same-day delivery within 3 hours</p>
                  </button>
                </div>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium">SAR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium">{deliveryFee === 0 ? 'FREE' : `SAR ${deliveryFee}`}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold">SAR {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Proceed to Checkout */}
              <button
                onClick={() => onNavigate('checkout')}
                className="w-full py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 font-semibold text-sm tracking-wide mb-3"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Share via WhatsApp */}
              {!showShareInput ? (
                <button
                  onClick={() => setShowShareInput(true)}
                  className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-wide flex items-center justify-center gap-2 mb-3 text-white"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  Share Cart via WhatsApp
                </button>
              ) : (
                <div className="rounded-lg p-4 mb-3" style={{ backgroundColor: '#E8F5E9', border: '1px solid #25D366' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
                    <span className="text-sm font-semibold text-gray-800">Send cart via WhatsApp</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+966 5X XXX XXXX"
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                    />
                    <button
                      onClick={handleShareWhatsApp}
                      disabled={!whatsappNumber.replace(/[^0-9]/g, '')}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white disabled:opacity-40 transition-colors"
                      style={{ backgroundColor: '#25D366' }}
                    >
                      Send
                    </button>
                  </div>
                  <button
                    onClick={() => { setShowShareInput(false); setWhatsappNumber(''); }}
                    className="w-full text-xs text-gray-500 mt-2 py-1 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => onNavigate('search')}
                className="w-full py-2.5 text-sm text-gray-500 hover:text-black transition-colors"
              >
                Continue Shopping
              </button>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2.5 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Easy returns within 14 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>Secure payment processing</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
                  <span>Authenticity guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

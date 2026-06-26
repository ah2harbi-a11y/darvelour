import { useState } from 'react';
import { CreditCard, MapPin, Package, Check, Crown, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Page, CartItem } from '../../App';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopCheckoutProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  cart: CartItem[];
  onPlaceOrder: () => void;
}

export default function DesktopCheckout({ onNavigate, onGoBack, cart, onPlaceOrder }: DesktopCheckoutProps) {
  const [step, setStep] = useState(1);
  const [hasExclusivity, setHasExclusivity] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState<'24h' | '3h'>('24h');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'cash'>('card');

  const subtotal = cart.reduce((sum, item) => sum + item.dress.price * item.quantity, 0);
  const deliveryFee = deliveryOption === '3h' ? 100 : 0;
  const total = subtotal + deliveryFee;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <h1 className="heading-serif text-4xl font-light text-charcoal">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-16">
          {[
            { num: 1, label: 'Delivery' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Confirm' },
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <div className={`flex flex-col items-center ${idx < 2 ? 'w-48' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium mb-2 luxury-transition ${
                  step >= s.num ? 'bg-emerald text-ivory' : 'bg-warm-grey-lighter text-warm-grey'
                }`}>
                  {step > s.num ? <Check className="w-6 h-6" /> : s.num}
                </div>
                <span className={`text-sm tracking-wide luxury-transition ${step >= s.num ? 'text-charcoal font-medium' : 'text-warm-grey font-light'}`}>
                  {s.label}
                </span>
              </div>
              {idx < 2 && (
                <div className={`w-48 h-1 mb-8 rounded-full luxury-transition ${step > s.num ? 'bg-emerald' : 'bg-warm-grey-lighter'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="col-span-2">
            {step === 1 && (
              <div className="bg-white border border-warm-grey-lighter rounded-sm p-8 luxury-shadow-sm">
                <h2 className="heading-serif text-2xl mb-6 font-light text-charcoal">Delivery Information</h2>

                <div className="space-y-5 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">First Name</label>
                      <input type="text" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Last Name</label>
                      <input type="text" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Phone Number</label>
                    <input type="tel" placeholder="+966" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Street Address</label>
                    <input type="text" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">City</label>
                      <input type="text" value="Riyadh" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm bg-ivory-dark text-warm-grey" readOnly />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">District</label>
                      <input type="text" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Postal Code</label>
                      <input type="text" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                    </div>
                  </div>
                </div>

                {/* Delivery Options */}
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-charcoal mb-4 tracking-wider uppercase">Delivery Speed</h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => setDeliveryOption('24h')}
                      className={`w-full border rounded-sm p-4 text-left luxury-transition ${
                        deliveryOption === '24h'
                          ? 'border-emerald bg-emerald-subtle'
                          : 'border-warm-grey-lighter hover:border-emerald'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center luxury-transition ${
                            deliveryOption === '24h' ? 'border-emerald bg-emerald' : 'border-warm-grey-lighter'
                          }`}>
                            {deliveryOption === '24h' && <div className="w-2.5 h-2.5 bg-ivory rounded-full"></div>}
                          </div>
                          <span className="font-medium text-charcoal">24-Hour Delivery</span>
                        </div>
                        <span className="text-emerald font-medium">FREE</span>
                      </div>
                      <p className="text-xs text-warm-grey font-light ml-8">Delivered by tomorrow evening</p>
                    </button>

                    <button
                      onClick={() => setDeliveryOption('3h')}
                      className={`w-full border rounded-sm p-4 text-left luxury-transition ${
                        deliveryOption === '3h'
                          ? 'border-gold bg-gold-subtle'
                          : 'border-warm-grey-lighter hover:border-gold'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center luxury-transition ${
                            deliveryOption === '3h' ? 'border-gold bg-gold' : 'border-warm-grey-lighter'
                          }`}>
                            {deliveryOption === '3h' && <div className="w-2.5 h-2.5 bg-ivory rounded-full"></div>}
                          </div>
                          <div>
                            <span className="font-medium text-charcoal">3-Hour Express</span>
                            <span className="ml-2 text-xs bg-gold text-white px-2 py-0.5 rounded-sm tracking-wide">PREMIUM</span>
                          </div>
                        </div>
                        <span className="font-medium text-charcoal">SAR 100</span>
                      </div>
                      <p className="text-xs text-warm-grey font-light ml-8">Same-day delivery within 3 hours</p>
                    </button>
                  </div>
                </div>

                {/* Exclusivity Event Details */}
                <div className="bg-gold-subtle border border-gold/20 rounded-sm p-6 mb-8">
                  <div className="flex items-start gap-3 mb-4">
                    <input
                      type="checkbox"
                      checked={hasExclusivity}
                      onChange={(e) => setHasExclusivity(e.target.checked)}
                      className="w-5 h-5 mt-1 accent-gold"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-4 h-4 text-gold" />
                        <span className="font-medium text-charcoal">Add Event Details for Exclusivity</span>
                      </div>
                      <div className="text-sm text-warm-grey font-light">Lock this dress for your specific event</div>
                    </div>
                  </div>

                  {hasExclusivity && (
                    <div className="space-y-4 mt-4 pl-8">
                      <div>
                        <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Event Date</label>
                        <input type="date" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-gold focus:outline-none luxury-transition bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Event Venue</label>
                        <input type="text" placeholder="e.g., Ritz-Carlton Riyadh" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-gold focus:outline-none luxury-transition bg-white" />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white border border-warm-grey-lighter rounded-sm p-8 luxury-shadow-sm">
                <h2 className="heading-serif text-2xl mb-6 font-light text-charcoal">Payment Method</h2>

                <div className="space-y-3 mb-8">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`w-full p-5 border rounded-sm text-left flex items-center gap-4 luxury-transition ${
                      paymentMethod === 'card'
                        ? 'border-emerald bg-emerald-subtle'
                        : 'border-warm-grey-lighter hover:border-emerald'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center luxury-transition ${
                      paymentMethod === 'card' ? 'bg-emerald text-ivory' : 'bg-warm-grey-lighter text-warm-grey'
                    }`}>
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium text-charcoal">Credit / Debit Card</div>
                      <div className="text-sm text-warm-grey font-light">Visa, Mastercard, Mada</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('apple')}
                    className={`w-full p-5 border rounded-sm text-left flex items-center gap-4 luxury-transition ${
                      paymentMethod === 'apple'
                        ? 'border-emerald bg-emerald-subtle'
                        : 'border-warm-grey-lighter hover:border-emerald'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl luxury-transition ${
                      paymentMethod === 'apple' ? 'bg-emerald' : 'bg-warm-grey-lighter'
                    }`}>

                    </div>
                    <div>
                      <div className="font-medium text-charcoal">Apple Pay</div>
                      <div className="text-sm text-warm-grey font-light">Fast and secure</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-5 border rounded-sm text-left flex items-center gap-4 luxury-transition ${
                      paymentMethod === 'cash'
                        ? 'border-emerald bg-emerald-subtle'
                        : 'border-warm-grey-lighter hover:border-emerald'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl luxury-transition ${
                      paymentMethod === 'cash' ? 'bg-emerald' : 'bg-warm-grey-lighter'
                    }`}>

                    </div>
                    <div>
                      <div className="font-medium text-charcoal">Cash on Delivery</div>
                      <div className="text-sm text-warm-grey font-light">Pay when you receive</div>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">Expiry Date</label>
                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-warm-grey mb-2 tracking-wider uppercase">CVV</label>
                        <input type="text" placeholder="123" className="w-full px-4 py-3 border border-warm-grey-lighter rounded-sm focus:border-emerald focus:outline-none luxury-transition bg-white" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 border border-warm-grey-lighter text-charcoal rounded-sm hover:bg-ivory-dark luxury-transition tracking-wide"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white border border-warm-grey-lighter rounded-sm p-8 luxury-shadow-sm">
                <h2 className="heading-serif text-2xl mb-6 font-light text-charcoal">Review Your Order</h2>

                <div className="border border-warm-grey-lighter rounded-sm p-6 mb-6 bg-ivory-dark">
                  <h3 className="font-medium mb-4 text-charcoal">Order Items</h3>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.dress.id} className="flex gap-4 bg-white p-3 rounded-sm">
                        <div className="w-20 aspect-[3/4] bg-ivory-dark rounded-sm flex-shrink-0 border border-warm-grey-lighter overflow-hidden">
                          <ImageWithFallback
                            src={getDressImage(item.dress.id)}
                            alt={item.dress.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-charcoal">{item.dress.name}</div>
                          <div className="text-sm text-warm-grey font-light">Size {item.size} · {item.color} · Qty {item.quantity}</div>
                          <div className="font-medium mt-1 text-charcoal">SAR {(item.dress.price * item.quantity).toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-warm-grey-lighter rounded-sm p-6 mb-6">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-warm-grey font-light">
                      <span>Subtotal ({itemCount} items)</span>
                      <span className="font-medium text-charcoal">SAR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-warm-grey font-light">
                      <span>{deliveryOption === '3h' ? '3-Hour Express Delivery' : '24-Hour Delivery'}</span>
                      <span className="font-medium text-charcoal">{deliveryFee === 0 ? 'FREE' : `SAR ${deliveryFee}`}</span>
                    </div>
                    <div className="border-t border-warm-grey-lighter pt-3 flex justify-between text-lg font-medium">
                      <span className="text-charcoal">Total</span>
                      <span className="text-charcoal">SAR {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 border border-warm-grey-lighter text-charcoal rounded-sm hover:bg-ivory-dark luxury-transition tracking-wide"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { onPlaceOrder(); onNavigate('order-tracking'); }}
                    className="flex-1 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide"
                  >
                    Place Order
                  </button>
                </div>

                <div className="bg-gold-subtle border border-gold/20 rounded-sm p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-gold" />
                    <span className="text-charcoal font-light">Your payment is secure and protected</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div>
            <div className="border border-warm-grey-lighter rounded-sm p-6 sticky top-32 bg-white luxury-shadow-sm">
              <h3 className="heading-serif text-xl mb-6 font-light text-charcoal">Order Summary</h3>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.dress.id} className="flex gap-3">
                    <div className="w-16 aspect-[3/4] bg-ivory-dark rounded-sm flex-shrink-0 border border-warm-grey-lighter overflow-hidden">
                      <ImageWithFallback
                        src={getDressImage(item.dress.id)}
                        alt={item.dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate text-charcoal">{item.dress.name}</div>
                      <div className="text-xs text-warm-grey font-light">Size {item.size} · {item.color}</div>
                      <div className="text-sm font-medium mt-1 text-charcoal">SAR {(item.dress.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-warm-grey-lighter pt-4 space-y-3 text-sm mb-6">
                <div className="flex justify-between text-warm-grey font-light">
                  <span>Subtotal</span>
                  <span className="font-medium text-charcoal">SAR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-warm-grey font-light">
                  <span>Delivery</span>
                  <span className="font-medium text-charcoal">{deliveryFee === 0 ? 'FREE' : `SAR ${deliveryFee}`}</span>
                </div>
                <div className="border-t border-warm-grey-lighter pt-3 flex justify-between font-medium">
                  <span className="text-charcoal">Total</span>
                  <span className="text-charcoal text-lg">SAR {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-warm-grey font-light">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold" />
                  <span>{deliveryOption === '3h' ? '3-hour express delivery' : '24-hour delivery'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gold" />
                  <span>Easy returns within 14 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

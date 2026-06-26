import { Package, Truck, CheckCircle, MapPin, Phone, Clock, ArrowLeft } from 'lucide-react';
import { Page, Order } from '../../App';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopOrderTrackingProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  orders: Order[];
}

export default function DesktopOrderTracking({ onNavigate, onGoBack, orders }: DesktopOrderTrackingProps) {
  const latestOrder = orders[0];

  const trackingSteps = [
    { status: 'completed', title: 'Order Confirmed', time: '10:30 AM', description: 'Your order has been confirmed' },
    { status: 'completed', title: 'Preparing', time: '10:45 AM', description: 'Boutique is preparing your items' },
    { status: 'current', title: 'Out for Delivery', time: '11:30 AM', description: 'Driver is on the way' },
    { status: 'pending', title: 'Delivered', time: 'Est. 1:00 PM', description: 'Package will be delivered' },
  ];

  if (!latestOrder) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="max-w-[1200px] mx-auto px-8 py-12 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-light text-charcoal mb-2">No orders to track</h2>
          <button onClick={() => onNavigate('search')} className="mt-4 px-8 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide">
            Browse Collection
          </button>
        </div>
      </div>
    );
  }

  const itemCount = latestOrder.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <h1 className="heading-serif text-4xl font-light text-charcoal">Track Your Order</h1>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Tracking Timeline */}
          <div className="col-span-2">
            <div className="border border-warm-grey-lighter rounded-sm p-8 bg-white luxury-shadow">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gold-subtle rounded-full flex items-center justify-center">
                  <Truck className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <div className="heading-serif text-2xl mb-1 font-light text-charcoal">Out for Delivery</div>
                  <div className="text-warm-grey font-light">Expected delivery by 1:00 PM today</div>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center luxury-transition ${
                        step.status === 'completed' ? 'bg-emerald text-ivory' :
                        step.status === 'current' ? 'bg-gold text-white' :
                        'bg-warm-grey-lighter text-warm-grey'
                      }`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : step.status === 'current' ? (
                          <Truck className="w-6 h-6" />
                        ) : (
                          <Clock className="w-6 h-6" />
                        )}
                      </div>
                      {idx < trackingSteps.length - 1 && (
                        <div className={`w-1 flex-1 mt-2 luxury-transition ${
                          step.status === 'completed' ? 'bg-emerald' : 'bg-warm-grey-lighter'
                        }`} style={{ minHeight: '40px' }} />
                      )}
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium text-lg text-charcoal">{step.title}</div>
                        <div className="text-sm text-warm-grey font-light">{step.time}</div>
                      </div>
                      <div className="text-warm-grey font-light">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gold-subtle border border-gold/20 rounded-sm p-6">
                <div className="flex items-start gap-3">
                  <Truck className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium mb-1 text-charcoal">Driver on the way</div>
                    <div className="text-sm text-warm-grey mb-3 font-light">
                      Ahmed is delivering your order. He's 15 minutes away.
                    </div>
                    <button className="px-4 py-2 bg-emerald text-ivory rounded-sm text-sm hover:bg-emerald-light luxury-transition tracking-wide">
                      Contact Driver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div>
            <div className="border border-warm-grey-lighter rounded-sm p-6 mb-6 bg-white luxury-shadow-sm">
              <h3 className="font-medium mb-4 text-charcoal">Order Details</h3>
              <div className="space-y-3 text-sm mb-4">
                <div>
                  <div className="text-warm-grey font-light">Order ID</div>
                  <div className="font-medium text-charcoal">{latestOrder.id}</div>
                </div>
                <div>
                  <div className="text-warm-grey font-light">Order Date</div>
                  <div className="font-medium text-charcoal">
                    {new Date(latestOrder.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
                <div>
                  <div className="text-warm-grey font-light">Total Amount</div>
                  <div className="font-medium text-lg text-charcoal">SAR {latestOrder.total.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-warm-grey font-light">Items</div>
                  <div className="font-medium text-charcoal">{itemCount} item{itemCount > 1 ? 's' : ''}</div>
                </div>
              </div>

              <div className="border-t border-warm-grey-lighter pt-4">
                <div className="space-y-3">
                  {latestOrder.items.map((item) => (
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
                        <div className="text-xs text-warm-grey font-light">Size {item.size} · Qty {item.quantity}</div>
                        <div className="text-sm font-medium mt-1 text-charcoal">SAR {(item.dress.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-warm-grey-lighter rounded-sm p-6 bg-white luxury-shadow-sm">
              <h3 className="font-medium mb-4 text-charcoal">Delivery Address</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald" />
                  <div>
                    <div className="font-medium mb-1 text-charcoal">Sarah Al-Rashid</div>
                    <div className="text-warm-grey font-light">
                      123 King Fahd Road<br />
                      Al Olaya District<br />
                      Riyadh 12345
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 flex-shrink-0 text-emerald" />
                  <div className="text-warm-grey font-light">+966 50 123 4567</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex gap-4 justify-center">
          <button
            onClick={() => onNavigate('orders')}
            className="px-8 py-4 border-2 border-emerald text-emerald rounded-sm hover:bg-emerald hover:text-ivory luxury-transition tracking-wide"
          >
            View All Orders
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-8 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

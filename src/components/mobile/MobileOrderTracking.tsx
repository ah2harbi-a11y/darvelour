import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Page, Order } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileOrderTrackingProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  orders: Order[];
}

export default function MobileOrderTracking({ onNavigate, onGoBack, wishlistItems, orders }: MobileOrderTrackingProps) {
  const latestOrder = orders[0];

  const trackingSteps = [
    { status: 'completed', title: 'Order Confirmed', time: '10:30 AM', icon: CheckCircle },
    { status: 'completed', title: 'Preparing', time: '10:45 AM', icon: Package },
    { status: 'current', title: 'Out for Delivery', time: '11:30 AM', icon: Truck },
    { status: 'pending', title: 'Delivered', time: 'Est. 1:00 PM', icon: Clock },
  ];

  if (!latestOrder) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col">
        <MobileHeader title="Track Order" showBack={true} showCart={false} onNavigate={onNavigate} onBack={onGoBack} />
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-lg font-bold mb-2">No orders to track</h2>
          <button onClick={() => onNavigate('search')} className="bg-black text-white px-8 py-3 text-sm font-bold mt-4">
            Browse Collection
          </button>
        </div>
        <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
      </div>
    );
  }

  const itemCount = latestOrder.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="Track Order"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20 px-4 py-4">
        {/* Order info */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-500">{latestOrder.id}</span>
            <span className="text-xs font-bold bg-yellow-100 text-yellow-800 px-2 py-1">In Transit</span>
          </div>
          <div className="space-y-2 mt-3">
            {latestOrder.items.map((item) => (
              <div key={item.dress.id} className="flex gap-3">
                <div className="w-12 h-16 bg-gray-100 border border-gray-200 rounded flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={getDressImage(item.dress.id)}
                    alt={item.dress.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold">{item.dress.name}</p>
                  <p className="text-xs text-gray-500">Size {item.size} · Qty {item.quantity}</p>
                  <p className="text-xs font-bold">SAR {(item.dress.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
            <span className="text-xs text-gray-500">{itemCount} item{itemCount > 1 ? 's' : ''}</span>
            <span className="text-sm font-bold">Total: SAR {latestOrder.total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">Estimated delivery: Today, 1:00 PM</p>
        </div>

        {/* Tracking steps */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h3 className="text-sm font-bold mb-4">Delivery Progress</h3>
          <div className="space-y-0">
            {trackingSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step.status === 'completed' ? 'bg-black border-black text-white' :
                      step.status === 'current' ? 'bg-white border-black text-black' :
                      'bg-gray-100 border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    {i < trackingSteps.length - 1 && (
                      <div className={`w-0.5 h-8 ${
                        step.status === 'completed' ? 'bg-black' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-bold ${step.status === 'pending' ? 'text-gray-400' : 'text-black'}`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500">{step.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact */}
        <button
          onClick={() => onNavigate('profile')}
          className="w-full mt-4 border border-gray-200 rounded-xl bg-white py-3 text-sm font-bold text-center"
        >
          Need Help? Contact Support
        </button>
      </main>

      <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

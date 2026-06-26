import { Package, Truck, CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Page, Order } from '../../App';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface DesktopMyOrdersProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  orders: Order[];
}

export default function DesktopMyOrders({ onNavigate, onGoBack, orders }: DesktopMyOrdersProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-emerald" />;
      case 'in-transit': return <Truck className="w-5 h-5 text-gold" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-destructive" />;
      default: return <Package className="w-5 h-5 text-warm-grey" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-transit': return 'In Transit';
      case 'processing': return 'Processing';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="flex items-center gap-4 mb-10">
          <button onClick={onGoBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-charcoal" />
          </button>
          <h1 className="heading-serif text-4xl font-light text-charcoal">My Orders</h1>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-light text-charcoal mb-2">No orders yet</h2>
            <p className="text-warm-grey font-light mb-6">Start shopping to see your orders here</p>
            <button
              onClick={() => onNavigate('search')}
              className="px-8 py-4 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
              return (
                <div key={order.id} className="border border-warm-grey-lighter rounded-sm p-6 hover:border-emerald luxury-transition bg-white luxury-shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(order.status)}
                        <span className="font-medium text-lg text-charcoal">{order.id}</span>
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-warm-grey">{getStatusLabel(order.status)}</span>
                      </div>
                      <div className="text-sm text-warm-grey font-light">
                        Ordered on {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-medium mb-1 text-charcoal">SAR {order.total.toLocaleString()}</div>
                      <div className="text-sm text-warm-grey font-light">{itemCount} item{itemCount > 1 ? 's' : ''}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {order.items.map((item) => (
                      <div key={item.dress.id} className="w-24 aspect-[3/4] bg-ivory-dark rounded-sm flex-shrink-0 border border-warm-grey-lighter overflow-hidden">
                        <ImageWithFallback
                          src={getDressImage(item.dress.id)}
                          alt={item.dress.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-warm-grey-lighter flex gap-3">
                    <button
                      onClick={() => onNavigate('order-tracking')}
                      className="flex-1 py-3 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition flex items-center justify-center gap-2 tracking-wide"
                    >
                      <span>Track Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onNavigate('order-tracking')}
                      className="flex-1 py-3 border-2 border-emerald text-emerald rounded-sm hover:bg-emerald hover:text-ivory luxury-transition tracking-wide"
                    >
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="flex-1 py-3 border border-warm-grey-lighter text-charcoal rounded-sm hover:bg-ivory-dark luxury-transition tracking-wide">
                        Request Return
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 p-6 bg-gold-subtle border border-gold/20 rounded-sm">
          <h3 className="font-medium text-charcoal mb-2">Need help with an order?</h3>
          <p className="text-sm text-warm-grey font-light mb-4">Our customer service team is available 24/7 to assist you</p>
          <button className="px-6 py-2.5 bg-emerald text-ivory rounded-sm hover:bg-emerald-light luxury-transition tracking-wide text-sm">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}

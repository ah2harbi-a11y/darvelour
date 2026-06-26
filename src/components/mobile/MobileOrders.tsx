import { Package, ChevronRight } from 'lucide-react';
import { Page, Order } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { getDressImage } from '../../data/dressImages';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface MobileOrdersProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
  orders: Order[];
}

export default function MobileOrders({ onNavigate, onGoBack, wishlistItems, orders }: MobileOrdersProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in-transit': return 'In Transit';
      case 'processing': return 'Processing';
      default: return status;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="My Orders"
        showBack={true}
        showCart={false}
        onNavigate={onNavigate}
        onBack={onGoBack}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Filter Tabs */}
        <div className="px-4 py-3 bg-white border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            {['All', 'Processing', 'Shipped', 'Delivered'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-xs font-medium whitespace-nowrap rounded-full ${
                  tab === 'All' ? 'bg-black text-white' : 'border border-gray-300 bg-white text-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4 py-20">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h2 className="text-lg font-bold mb-2">No orders yet</h2>
            <p className="text-sm text-gray-500 mb-6 text-center">Start shopping to see your orders here</p>
            <button
              onClick={() => onNavigate('search')}
              className="bg-black text-white px-8 py-3 text-sm font-bold"
            >
              Browse Collection
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {orders.map((order) => {
              const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
              const statusLabel = getStatusLabel(order.status);
              return (
                <button
                  key={order.id}
                  onClick={() => onNavigate('order-tracking')}
                  className="w-full bg-white border border-gray-200 rounded-lg p-4 text-left"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-sm font-bold text-black mb-1">{order.id}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[10px] font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'in-transit' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {statusLabel}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-2">
                      {order.items.map((item) => (
                        <div key={item.dress.id} className="w-16 h-20 bg-gray-100 border border-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          <ImageWithFallback
                            src={getDressImage(item.dress.id)}
                            alt={item.dress.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">{itemCount} item{itemCount > 1 ? 's' : ''}</p>
                      <p className="text-sm font-bold text-black">SAR {order.total.toLocaleString()}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-gray-200">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('order-tracking');
                      }}
                      className="flex-1 bg-gray-800 text-white py-2 rounded-lg text-xs font-medium text-center"
                    >
                      Track Order
                    </span>
                    <span className="flex-1 border border-gray-300 bg-white py-2 rounded-lg text-xs font-medium text-center text-gray-700">
                      View Details
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>

      <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}

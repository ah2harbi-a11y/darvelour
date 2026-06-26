import { useState } from 'react';

export default function MyOrdersScreen() {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'cancelled'>('active');

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center">
        <button className="w-8 h-8 border border-neutral-800 rounded-full flex items-center justify-center">←</button>
        <div className="flex-1 text-center font-bold">My Orders</div>
        <div className="w-8"></div>
      </div>

      {/* Tab bar with count badges */}
      <div className="flex border-b border-neutral-200">
        <button 
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 font-bold text-sm flex items-center justify-center gap-1.5 ${
            activeTab === 'active' ? 'bg-neutral-800 text-white' : 'text-neutral-600'
          }`}
        >
          <span>Active</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeTab === 'active' ? 'bg-white/20' : 'bg-neutral-200'
          }`}>2</span>
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 font-bold text-sm border-l border-neutral-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'completed' ? 'bg-neutral-800 text-white' : 'text-neutral-600'
          }`}
        >
          <span>Completed</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-full ${
            activeTab === 'completed' ? 'bg-white/20' : 'bg-neutral-200'
          }`}>5</span>
        </button>
        <button 
          onClick={() => setActiveTab('cancelled')}
          className={`flex-1 py-3 font-bold text-sm border-l border-neutral-200 flex items-center justify-center gap-1.5 ${
            activeTab === 'cancelled' ? 'bg-neutral-800 text-white' : 'text-neutral-600'
          }`}
        >
          <span>Cancelled</span>
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'active' && (
          <div className="p-4 space-y-3">
            {/* Order 1 - Compressed card, status-first */}
            <button className="w-full border border-neutral-200 hover:border-neutral-300 rounded-lg p-3 text-left transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold text-sm mb-0.5">Out for Delivery</div>
                  <div className="text-xs text-neutral-500">Arrives today, 4-6 PM</div>
                </div>
                <div className="font-bold">SAR 549</div>
              </div>
              
              <div className="flex gap-2 items-center pt-2 border-t border-neutral-100">
                <div className="w-10 h-12 border border-neutral-200 bg-neutral-100 rounded text-[10px] flex items-center justify-center flex-shrink-0">
                  IMG
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">Evening Dress Name</div>
                  <div className="text-xs text-neutral-500">Order #DRN-XXXXXX · Jan 24</div>
                </div>
                <div className="text-neutral-400">→</div>
              </div>
            </button>

            {/* Order 2 - Different status */}
            <button className="w-full border border-neutral-200 hover:border-neutral-300 rounded-lg p-3 text-left transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-bold text-sm mb-0.5">Preparing at Boutique</div>
                  <div className="text-xs text-neutral-500">Ships tomorrow</div>
                </div>
                <div className="font-bold">SAR 399</div>
              </div>
              
              <div className="flex gap-2 items-center pt-2 border-t border-neutral-100">
                <div className="w-10 h-12 border border-neutral-200 bg-neutral-100 rounded text-[10px] flex items-center justify-center flex-shrink-0">
                  IMG
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">Party Dress Name</div>
                  <div className="text-xs text-neutral-500">Order #DRN-XXXXX2 · Jan 22</div>
                </div>
                <div className="text-neutral-400">→</div>
              </div>
            </button>
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="p-4 space-y-3">
            {/* Example completed orders */}
            {[1, 2, 3].map((i) => (
              <button key={i} className="w-full border border-neutral-200 hover:border-neutral-300 rounded-lg p-3 text-left transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-bold text-sm mb-0.5 flex items-center gap-1.5">
                      <span>Delivered</span>
                      <span className="text-xs text-green-700">✓</span>
                    </div>
                    <div className="text-xs text-neutral-500">Jan {20 - i}, 2026</div>
                  </div>
                  <div className="font-bold">SAR {450 + i * 50}</div>
                </div>
                
                <div className="flex gap-2 items-center pt-2 border-t border-neutral-100">
                  <div className="w-10 h-12 border border-neutral-200 bg-neutral-100 rounded text-[10px] flex items-center justify-center flex-shrink-0">
                    IMG
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate">Formal Dress {i}</div>
                    <div className="text-xs text-neutral-500">Order #DRN-XXXX{i}</div>
                  </div>
                  <div className="text-neutral-400">→</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'cancelled' && (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-2xl mb-4">
              📦
            </div>
            <div className="font-bold mb-1">No Cancelled Orders</div>
            <div className="text-sm text-neutral-500 text-center">
              Orders you cancel will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
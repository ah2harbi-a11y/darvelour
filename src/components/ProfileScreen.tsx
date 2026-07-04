export default function ProfileScreen() {
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-neutral-200">
        <div className="text-center font-bold">Profile</div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto">
        {/* User info - Strengthened with contextual signal */}
        <div className="p-4 bg-neutral-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-full border border-neutral-300 bg-white flex items-center justify-center text-xs font-bold text-neutral-400">
              AVATAR
            </div>
            <div className="flex-1">
              <div className="font-bold mb-0.5">Fatima Al-Rashid</div>
              <div className="text-xs text-neutral-600">fatima@email.com</div>
            </div>
            <button className="text-xs text-neutral-600 font-bold underline">Edit</button>
          </div>
          {/* Contextual signal - Active orders */}
          <div className="bg-white border border-neutral-200 rounded-lg p-3 flex items-center justify-between">
            <div className="text-xs text-neutral-600">Active orders</div>
            <div className="text-sm font-bold">2 in progress</div>
          </div>
        </div>

        {/* Menu sections */}
        <div className="p-4 space-y-8">
          {/* My Orders - Visually prioritized */}
          <div>
            <button className="w-full bg-neutral-800 text-white rounded-lg p-4 flex items-center justify-between">
              <span className="font-bold">My Orders</span>
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* My Exclusives - NEW FEATURE */}
          <div>
            <button className="w-full bg-yellow-50 border-2 border-yellow-700 rounded-lg p-4 flex items-center justify-between relative">
              <div className="flex items-center gap-2">
                <span className="text-lg">👑</span>
                <div className="text-left">
                  <div className="font-bold text-neutral-800">My Exclusives</div>
                  <div className="text-xs text-neutral-600">1 active booking</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold bg-neutral-800 text-white px-2 py-1 rounded">NEW</span>
                <span className="text-neutral-600">→</span>
              </div>
            </button>
          </div>

          {/* Orders & Activity - Softer styling */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">ACTIVITY</div>
            <div className="space-y-0">
              <button className="w-full border-b border-neutral-100 py-3 flex items-center justify-between text-left">
                <span className="text-sm">DV Closet</span>
                <span className="text-neutral-400">→</span>
              </button>
              <button className="w-full border-b border-neutral-100 py-3 flex items-center justify-between text-left">
                <span className="text-sm">Followed Boutiques</span>
                <span className="text-neutral-400">→</span>
              </button>
              <button className="w-full py-3 flex items-center justify-between text-left">
                <span className="text-sm">My Reviews</span>
                <span className="text-neutral-400">→</span>
              </button>
            </div>
          </div>

          {/* Account Settings - Softer styling */}
          <div>
            <div className="text-xs font-bold text-neutral-500 mb-3">SETTINGS</div>
            <div className="space-y-0">
              <button className="w-full border-b border-neutral-100 py-3 flex items-center justify-between text-left">
                <span className="text-sm">Addresses</span>
                <span className="text-neutral-400">→</span>
              </button>
              <button className="w-full border-b border-neutral-100 py-3 flex items-center justify-between text-left">
                <span className="text-sm">Payment Methods</span>
                <span className="text-neutral-400">→</span>
              </button>
              <button className="w-full border-b border-neutral-100 py-3 flex items-center justify-between text-left">
                <span className="text-sm">Notifications</span>
                <span className="text-neutral-400">→</span>
              </button>
              <button className="w-full py-3 flex items-center justify-between text-left">
                <span className="text-sm">Language</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-500">العربية / English</span>
                  <span className="text-neutral-400">→</span>
                </div>
              </button>
            </div>
          </div>

          {/* Support & Logout - De-emphasized */}
          <div className="pt-4 pb-24 space-y-3">
            <div className="flex gap-4 text-xs text-neutral-500">
              <button className="underline">Help Center</button>
              <button className="underline">Contact Us</button>
              <button className="underline">FAQs</button>
            </div>
            <button className="w-full border border-neutral-200 rounded-lg py-3 text-sm text-neutral-600 font-bold">
              Log Out
            </button>
            <div className="text-center text-xs text-neutral-400">
              App version 1.0.0
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="border-t border-neutral-200 flex">
        <button className="flex-1 py-3 border-r border-neutral-100 text-xs font-bold text-neutral-600">Home</button>
        <button className="flex-1 py-3 border-r border-neutral-100 text-xs font-bold text-neutral-600">Search</button>
        <button className="flex-1 py-3 border-r border-neutral-100 text-xs font-bold text-neutral-600">DV Closet</button>
        <button className="flex-1 py-3 border-r border-neutral-100 text-xs font-bold text-neutral-600">Orders</button>
        <button className="flex-1 py-3 bg-neutral-800 text-white text-xs font-bold">Profile</button>
      </div>
    </div>
  );
}
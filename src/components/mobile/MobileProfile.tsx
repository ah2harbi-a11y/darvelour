import { User, MapPin, CreditCard, Bell, Shield, LogOut, ChevronRight, Package, Crown } from 'lucide-react';
import { Page } from '../../App';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface MobileProfileProps {
  onNavigate: (page: Page) => void;
  onGoBack: () => void;
  wishlistItems: number;
}

export default function MobileProfile({ onNavigate, wishlistItems }: MobileProfileProps) {
  const { user, logout, updateProfile } = useAuth();
  const [showAccountInfo, setShowAccountInfo] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editEmail, setEditEmail] = useState(user?.email || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile({ name: editName, email: editEmail, phone: editPhone });
    } catch { /* ignore */ }
    setSaving(false);
  };

  const handleLogout = () => {
    logout();
    onNavigate('home');
  };

  // Account Information Detail View
  if (showAccountInfo) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col">
        <MobileHeader
          title="My Account"
          showBack={true}
          showCart={false}
          onNavigate={onNavigate}
          onBack={() => setShowAccountInfo(false)}
        />

        <main className="flex-1 overflow-y-auto pb-20">
          <div className="px-4 py-6 space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg text-black mb-6">Account Information</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide">FULL NAME</label>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full text-sm text-black bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide">EMAIL ADDRESS</label>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full text-sm text-black bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 tracking-wide">PHONE NUMBER</label>
                  <div className="border border-gray-200 rounded-lg px-4 py-3">
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full text-sm text-black bg-transparent outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full bg-gray-800 text-white py-3.5 rounded-lg text-sm font-medium mt-2 disabled:opacity-50"
                >
                  {saving ? 'SAVING...' : 'SAVE CHANGES'}
                </button>
              </div>
            </div>
          </div>
        </main>

        <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
      </div>
    );
  }

  // Main Profile View
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <MobileHeader
        title="My Account"
        showBack={false}
        showCart={false}
        onNavigate={onNavigate}
      />

      <main className="flex-1 overflow-y-auto pb-20">
        {/* Account Management Header */}
        <div className="px-4 pt-6 pb-4 bg-white">
          <p className="text-[11px] text-gray-400 tracking-wider mb-2">ACCOUNT MANAGEMENT</p>
          <h2 className="text-2xl text-black mb-2">My Account</h2>
          <p className="text-sm text-gray-500">Manage your personal information, addresses, and preferences</p>
        </div>

        {/* User Info Card */}
        <div className="px-4 pb-6 bg-white">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-base text-black mb-1">{user?.name || 'Guest'}</h3>
            <p className="text-sm text-gray-500 mb-1">{user?.email || ''}</p>
            {user?.phone && <p className="text-sm text-gray-500 mb-3">{user.phone}</p>}
            <div className="flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
              </svg>
              <span className="text-xs text-gray-700 font-medium tracking-wide">VERIFIED MEMBER</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white border-y border-gray-200">
          <button
            onClick={() => setShowAccountInfo(true)}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">Account Information</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Package className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">My Orders</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('my-exclusives')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">My Exclusives</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">Addresses</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('checkout')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">Payment Methods</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="text-sm text-black">Privacy & Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-4 py-4 flex items-center justify-between border-t border-gray-100 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
              <span className="text-sm text-black">Sign Out</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </main>

      <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}
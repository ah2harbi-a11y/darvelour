import { User, MapPin, CreditCard, Bell, Shield, LogOut, Check } from 'lucide-react';
import { Page } from '../../App';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface DesktopProfileProps {
  onNavigate: (page: Page) => void;
}

export default function DesktopProfile({ onNavigate }: DesktopProfileProps) {
  const { user, logout, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState<'account' | 'addresses' | 'payment' | 'notifications' | 'privacy'>('account');
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

  const menuItems = [
    { id: 'account' as const, icon: User, label: 'Account Information' },
    { id: 'addresses' as const, icon: MapPin, label: 'Addresses' },
    { id: 'payment' as const, icon: CreditCard, label: 'Payment Methods' },
    { id: 'notifications' as const, icon: Bell, label: 'Notifications' },
    { id: 'privacy' as const, icon: Shield, label: 'Privacy & Security' },
  ];

  return (
    <div className="min-h-screen bg-porcelain">
      {/* Page Header */}
      <div className="border-b border-charcoal/10">
        <div className="max-w-[1400px] mx-auto px-12 py-20">
          <div className="max-w-4xl">
            <div className="text-[10px] tracking-[0.3em] uppercase text-warm-grey mb-6 font-light">
              ACCOUNT MANAGEMENT
            </div>
            <h1 className="heading-serif text-5xl mb-4 font-light text-charcoal tracking-tight">
              My Account
            </h1>
            <p className="text-charcoal/60 font-light leading-relaxed">
              Manage your personal information, addresses, and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-12 py-16">
        <div className="grid grid-cols-12 gap-12">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
            {/* Profile Card */}
            <div className="bg-porcelain-warm border border-charcoal/10 p-8 mb-8">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-champagne/30 flex items-center justify-center mb-4 border border-charcoal/10">
                  <User className="w-10 h-10 text-charcoal/40" strokeWidth={1.5} />
                </div>
                <h3 className="heading-serif text-xl font-light text-charcoal mb-1">
                  {user?.name || 'Guest'}
                </h3>
                <p className="text-xs text-warm-grey font-light mb-1">
                  {user?.email || ''}
                </p>
                {user?.phone && (
                  <p className="text-xs text-warm-grey font-light">
                    {user.phone}
                  </p>
                )}
              </div>

              {/* Member Badge */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-imperial/30">
                  <Check className="w-3 h-3 text-imperial" strokeWidth={2} />
                  <span className="text-[8px] tracking-[0.3em] uppercase text-imperial font-light">
                    VERIFIED MEMBER
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-5 py-4 border luxury-transition flex items-center gap-3 ${
                      isActive
                        ? 'bg-porcelain-warm border-charcoal/20 text-charcoal'
                        : 'border-charcoal/10 text-charcoal/60 hover:border-charcoal/20 hover:text-charcoal'
                    }`}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                    <span className="text-sm font-light">{item.label}</span>
                  </button>
                );
              })}

              <button
                onClick={handleLogout}
                className="w-full text-left px-5 py-4 border border-burgundy/20 text-burgundy hover:bg-burgundy/5 luxury-transition flex items-center gap-3 mt-6"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.5} />
                <span className="text-sm font-light">Sign Out</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            {activeSection === 'account' && (
              <div className="space-y-8">
                {/* Account Information */}
                <div className="bg-porcelain-warm border border-charcoal/10 p-10">
                  <h2 className="heading-serif text-2xl mb-8 font-light text-charcoal">
                    Account Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
                        FULL NAME
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-imperial focus:outline-none luxury-transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-imperial focus:outline-none luxury-transition"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        value={editPhone}
                        onChange={(e) => setEditPhone(e.target.value)}
                        className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light focus:border-imperial focus:outline-none luxury-transition"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-10 py-4 bg-imperial text-porcelain text-xs tracking-[0.2em] uppercase font-light hover:bg-imperial/90 luxury-transition disabled:opacity-50"
                      >
                        {saving ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Style Preferences */}
                <div className="bg-porcelain-warm border border-charcoal/10 p-10">
                  <h2 className="heading-serif text-2xl mb-8 font-light text-charcoal">
                    Style Preferences
                  </h2>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-4 font-light">
                        PREFERRED OCCASIONS
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['Wedding', 'Evening', 'Business', 'Casual', 'Party'].map((occasion) => (
                          <button
                            key={occasion}
                            className="px-5 py-2 border border-imperial bg-imperial text-porcelain text-xs font-light hover:bg-imperial/90 luxury-transition"
                          >
                            {occasion}
                          </button>
                        ))}
                        <button className="px-5 py-2 border border-charcoal/20 text-charcoal/60 text-xs font-light hover:border-charcoal/40 luxury-transition">
                          + Add More
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-4 font-light">
                        PREFERRED SIZES
                      </label>
                      <div className="flex gap-2">
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                          const isSelected = size === 'S' || size === 'M';
                          return (
                            <button
                              key={size}
                              className={`w-12 h-12 border text-xs font-light luxury-transition ${
                                isSelected
                                  ? 'border-imperial bg-imperial text-porcelain'
                                  : 'border-charcoal/20 text-charcoal/60 hover:border-charcoal/40'
                              }`}
                            >
                              {size}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-4 font-light">
                        PREFERRED COLORS
                      </label>
                      <div className="flex gap-3">
                        {[
                          { name: 'Midnight', color: '#1a1a2e' },
                          { name: 'Burgundy', color: '#6B1C23' },
                          { name: 'Emerald', color: '#064635' },
                          { name: 'Champagne', color: '#D4C5B0' },
                          { name: 'Ivory', color: '#F8F7F4' },
                        ].map((color) => {
                          const isSelected = color.name === 'Midnight' || color.name === 'Burgundy';
                          return (
                            <button
                              key={color.name}
                              className={`relative w-12 h-12 rounded-full border luxury-transition ${
                                isSelected ? 'border-charcoal/60' : 'border-charcoal/20 hover:border-charcoal/40'
                              }`}
                              style={{ backgroundColor: color.color }}
                            >
                              {isSelected && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" strokeWidth={2} />
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'addresses' && (
              <div className="bg-porcelain-warm border border-charcoal/10 p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="heading-serif text-2xl font-light text-charcoal">
                    Saved Addresses
                  </h2>
                  <button className="px-6 py-3 border border-imperial text-imperial text-xs tracking-[0.2em] uppercase font-light hover:bg-imperial hover:text-porcelain luxury-transition">
                    Add New Address
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Default Address */}
                  <div className="border border-charcoal/20 p-6 relative">
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-imperial/30">
                        <Check className="w-2.5 h-2.5 text-imperial" strokeWidth={2} />
                        <span className="text-[7px] tracking-[0.3em] uppercase text-imperial font-light">
                          DEFAULT
                        </span>
                      </div>
                    </div>
                    <div className="pr-24">
                      <h3 className="font-light text-charcoal mb-1">Home</h3>
                      <p className="text-sm text-charcoal/60 font-light leading-relaxed">
                        123 King Fahd Road, Al Olaya District<br />
                        Riyadh 12345, Saudi Arabia
                      </p>
                      <div className="flex gap-4 mt-4">
                        <button className="text-xs text-imperial hover:underline font-light">Edit</button>
                        <button className="text-xs text-charcoal/40 hover:text-burgundy font-light">Remove</button>
                      </div>
                    </div>
                  </div>

                  {/* Additional Address */}
                  <div className="border border-charcoal/10 p-6">
                    <h3 className="font-light text-charcoal mb-1">Office</h3>
                    <p className="text-sm text-charcoal/60 font-light leading-relaxed">
                      456 Prince Mohammed Bin Abdulaziz Street<br />
                      Riyadh 11564, Saudi Arabia
                    </p>
                    <div className="flex gap-4 mt-4">
                      <button className="text-xs text-imperial hover:underline font-light">Edit</button>
                      <button className="text-xs text-imperial hover:underline font-light">Set as Default</button>
                      <button className="text-xs text-charcoal/40 hover:text-burgundy font-light">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'payment' && (
              <div className="bg-porcelain-warm border border-charcoal/10 p-10">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="heading-serif text-2xl font-light text-charcoal">
                    Payment Methods
                  </h2>
                  <button className="px-6 py-3 border border-imperial text-imperial text-xs tracking-[0.2em] uppercase font-light hover:bg-imperial hover:text-porcelain luxury-transition">
                    Add New Card
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border border-charcoal/20 p-6 relative">
                    <div className="absolute top-4 right-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 border border-imperial/30">
                        <Check className="w-2.5 h-2.5 text-imperial" strokeWidth={2} />
                        <span className="text-[7px] tracking-[0.3em] uppercase text-imperial font-light">
                          DEFAULT
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pr-24">
                      <div className="w-12 h-12 bg-charcoal/5 border border-charcoal/10 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-charcoal/40" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-light text-charcoal">•••• •••• •••• 4532</p>
                        <p className="text-xs text-charcoal/60 font-light">Expires 12/26</p>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <button className="text-xs text-imperial hover:underline font-light">Edit</button>
                      <button className="text-xs text-charcoal/40 hover:text-burgundy font-light">Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-porcelain-warm border border-charcoal/10 p-10">
                <h2 className="heading-serif text-2xl mb-8 font-light text-charcoal">
                  Notification Preferences
                </h2>

                <div className="space-y-6">
                  {[
                    { label: 'Order Updates', description: 'Receive updates about your order status and delivery' },
                    { label: 'New Arrivals', description: 'Be notified when new dresses from your favorite boutiques arrive' },
                    { label: 'Special Offers', description: 'Exclusive offers and promotions tailored to your preferences' },
                    { label: 'Style Recommendations', description: 'Personalized dress recommendations based on your style' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start justify-between py-4 border-b border-charcoal/10 last:border-0">
                      <div className="flex-1">
                        <h3 className="font-light text-charcoal mb-1">{item.label}</h3>
                        <p className="text-xs text-charcoal/60 font-light">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-6">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-charcoal/20 peer-focus:outline-none peer-checked:bg-imperial luxury-transition border border-charcoal/20 peer-checked:border-imperial"></div>
                        <div className="absolute left-1 top-1 bg-porcelain w-4 h-4 luxury-transition peer-checked:translate-x-5"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="bg-porcelain-warm border border-charcoal/10 p-10">
                <h2 className="heading-serif text-2xl mb-8 font-light text-charcoal">
                  Privacy & Security
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="font-light text-charcoal mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light placeholder:text-charcoal/30 focus:border-imperial focus:outline-none luxury-transition"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light placeholder:text-charcoal/30 focus:border-imperial focus:outline-none luxury-transition"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-5 py-4 bg-porcelain border border-charcoal/20 text-charcoal font-light placeholder:text-charcoal/30 focus:border-imperial focus:outline-none luxury-transition"
                      />
                      <button className="px-8 py-4 bg-imperial text-porcelain text-xs tracking-[0.2em] uppercase font-light hover:bg-imperial/90 luxury-transition">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-charcoal/10">
                    <h3 className="font-light text-charcoal mb-4">Account Privacy</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 border-charcoal/20" />
                        <span className="text-sm text-charcoal/70 font-light">Allow personalized recommendations</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-4 h-4 border-charcoal/20" />
                        <span className="text-sm text-charcoal/70 font-light">Share purchase history for better suggestions</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-charcoal/10">
                    <h3 className="font-light text-charcoal mb-2">Delete Account</h3>
                    <p className="text-sm text-charcoal/60 font-light mb-4 leading-relaxed">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <button className="px-8 py-4 border border-burgundy text-burgundy text-xs tracking-[0.2em] uppercase font-light hover:bg-burgundy hover:text-porcelain luxury-transition">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

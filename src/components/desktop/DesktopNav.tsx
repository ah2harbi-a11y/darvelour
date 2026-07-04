import { Home, Search, Heart, ShoppingBag, User, Sparkles, LogIn } from 'lucide-react';
import { Page } from '../../App';
import { useAuth } from '../../context/AuthContext';

interface DesktopNavProps {
  onNavigate: (page: Page) => void;
  currentPage?: Page;
  cartCount?: number;
  wishlistCount?: number;
}

export default function DesktopNav({ onNavigate, currentPage, cartCount = 0, wishlistCount = 0 }: DesktopNavProps) {
  const { user } = useAuth();
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-8 py-3 flex items-center justify-between">
        {/* Logo - always links home */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-bold tracking-widest hover:opacity-70 transition-opacity"
        >
          DARVELOUR
        </button>

        {/* Center links */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => onNavigate('search')}
            className={`text-sm tracking-wide hover:text-black transition-colors ${currentPage === 'search' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            Shop
          </button>
          <button
            onClick={() => onNavigate('boutiques')}
            className={`text-sm tracking-wide hover:text-black transition-colors ${currentPage === 'boutiques' || currentPage === 'boutique' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            Boutiques
          </button>
          <button
            onClick={() => onNavigate('ai-stylist')}
            className={`text-sm tracking-wide hover:text-black transition-colors flex items-center gap-1.5 ${currentPage === 'ai-stylist' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Stylist
          </button>
          <button
            onClick={() => onNavigate('virtual-tryon')}
            className={`text-sm tracking-wide hover:text-black transition-colors ${currentPage === 'virtual-tryon' ? 'text-black font-medium' : 'text-gray-500'}`}
          >
            Virtual Try-On
          </button>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => onNavigate('home')}
            className={`p-1.5 hover:text-black transition-colors ${currentPage === 'home' ? 'text-black' : 'text-gray-500'}`}
            title="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <button
            onClick={() => onNavigate('wishlist')}
            className={`p-1.5 hover:text-black transition-colors relative ${currentPage === 'wishlist' ? 'text-black' : 'text-gray-500'}`}
            title="DV Closet"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className={`p-1.5 hover:text-black transition-colors relative ${currentPage === 'cart' ? 'text-black' : 'text-gray-500'}`}
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate(user ? 'profile' : 'login')}
            className={`p-1.5 hover:text-black transition-colors ${currentPage === 'profile' || currentPage === 'login' ? 'text-black' : 'text-gray-500'}`}
            title={user ? 'Account' : 'Sign In'}
          >
            {user ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}

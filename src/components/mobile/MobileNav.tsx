import { Home, Search, Sparkles, Heart, User } from 'lucide-react';
import { Page } from '../../App';

interface MobileNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  wishlistItems?: number;
}

export default function MobileNav({ currentPage, onNavigate, wishlistItems = 0 }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center z-50">
      <button 
        onClick={() => onNavigate('home')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 ${
          currentPage === 'home' ? 'bg-gray-200' : ''
        }`}
      >
        <Home className={`w-5 h-5 ${currentPage === 'home' ? 'text-black' : 'text-gray-500'}`} />
        <span className={`text-[9px] ${currentPage === 'home' ? 'text-black font-bold' : 'text-gray-500'}`}>
          Home
        </span>
      </button>
      
      <button 
        onClick={() => onNavigate('search')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 ${
          currentPage === 'search' ? 'bg-gray-200' : ''
        }`}
      >
        <Search className={`w-5 h-5 ${currentPage === 'search' ? 'text-black' : 'text-gray-500'}`} />
        <span className={`text-[9px] ${currentPage === 'search' ? 'text-black font-bold' : 'text-gray-500'}`}>
          Search
        </span>
      </button>
      
      <button 
        onClick={() => onNavigate('ai-stylist')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 ${
          currentPage === 'ai-stylist' ? 'bg-gray-200' : ''
        }`}
      >
        <Sparkles className={`w-5 h-5 ${currentPage === 'ai-stylist' ? 'text-black' : 'text-gray-500'}`} />
        <span className={`text-[9px] ${currentPage === 'ai-stylist' ? 'text-black font-bold' : 'text-gray-500'}`}>
          AI Stylist
        </span>
      </button>
      
      <button 
        onClick={() => onNavigate('wishlist')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 relative ${
          currentPage === 'wishlist' ? 'bg-gray-200' : ''
        }`}
      >
        <Heart className={`w-5 h-5 ${currentPage === 'wishlist' ? 'text-black' : 'text-gray-500'}`} />
        {wishlistItems > 0 && (
          <span className="absolute top-1.5 right-[calc(50%-8px)] bg-black text-white text-[8px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center border border-black">
            {wishlistItems}
          </span>
        )}
        <span className={`text-[9px] ${currentPage === 'wishlist' ? 'text-black font-bold' : 'text-gray-500'}`}>
          DV Closet
        </span>
      </button>
      
      <button 
        onClick={() => onNavigate('profile')}
        className={`flex-1 py-3 flex flex-col items-center gap-1 ${
          currentPage === 'profile' ? 'bg-gray-200' : ''
        }`}
      >
        <User className={`w-5 h-5 ${currentPage === 'profile' ? 'text-black' : 'text-gray-500'}`} />
        <span className={`text-[9px] ${currentPage === 'profile' ? 'text-black font-bold' : 'text-gray-500'}`}>
          Profile
        </span>
      </button>
    </nav>
  );
}
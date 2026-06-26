import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Page } from '../../App';

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  cartItems?: number;
  onNavigate: (page: Page) => void;
  onBack?: () => void;
}

export default function MobileHeader({ title, showBack = false, showCart = true, cartItems = 0, onNavigate, onBack }: MobileHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={onBack || (() => onNavigate('home'))} className="p-1">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        {title ? (
          <h1 className="text-lg font-bold">{title}</h1>
        ) : (
          <div className="text-lg font-bold tracking-wider">DARVELOUR</div>
        )}
      </div>
      {showCart && (
        <button onClick={() => onNavigate('cart')} className="relative p-1">
          <ShoppingBag className="w-5 h-5" />
          {cartItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-white text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartItems}
            </span>
          )}
        </button>
      )}
    </header>
  );
}

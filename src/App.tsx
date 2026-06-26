import { useState, useEffect, useCallback } from 'react';
import { useIsMobile } from './components/ui/use-mobile';
import { getDressById, Dress, loadDresses } from './data/dresses';
import { loadBoutiques } from './data/boutiques';
import { useAuth } from './context/AuthContext';
import * as api from './api';

export interface CartItem {
  dress: Dress;
  quantity: number;
  size: string;
  color: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'in-transit' | 'processing';
  items: CartItem[];
  total: number;
}

export interface Exclusive {
  id: number;
  dress_id: number;
  dressName: string;
  boutique: string;
  price: number;
  event_name: string;
  event_date: string;
  venue: string;
  occasion: string;
  status: string;
}

// Mobile components
import MobileHome from './components/mobile/MobileHome';
import MobileSearch from './components/mobile/MobileSearch';
import MobileCart from './components/mobile/MobileCart';
import MobileCheckout from './components/mobile/MobileCheckout';
import MobileConfirm from './components/mobile/MobileConfirm';
import MobilePayment from './components/mobile/MobilePayment';
import MobileProfile from './components/mobile/MobileProfile';
import MobileWishlist from './components/mobile/MobileWishlist';
import MobileAIStylist from './components/mobile/MobileAIStylist';
import MobileVirtualTryOn from './components/mobile/MobileVirtualTryOn';
import MobileOrders from './components/mobile/MobileOrders';
import MobileOrderTracking from './components/mobile/MobileOrderTracking';
import MobileExclusivity from './components/mobile/MobileExclusivity';
import MobileExclusivityConfirmation from './components/mobile/MobileExclusivityConfirmation';
import MobileMyExclusives from './components/mobile/MobileMyExclusives';
import MobileDressDetail from './components/mobile/MobileDressDetail';
import MobileBoutique from './components/mobile/MobileBoutique';
import MobileBoutiques from './components/mobile/MobileBoutiques';
import MobileLogin from './components/mobile/MobileLogin';

// Desktop components
import DesktopHome from './components/desktop/DesktopHome';
import DesktopSearch from './components/desktop/DesktopSearch';
import DesktopCart from './components/desktop/DesktopCart';
import DesktopCheckout from './components/desktop/DesktopCheckout';
import DesktopProfile from './components/desktop/DesktopProfile';
import DesktopWishlist from './components/desktop/DesktopWishlist';
import DesktopAIStylist from './components/desktop/DesktopAIStylist';
import DesktopVirtualTryOn from './components/desktop/DesktopVirtualTryOn';
import DesktopMyOrders from './components/desktop/DesktopMyOrders';
import DesktopOrderTracking from './components/desktop/DesktopOrderTracking';
import DesktopMyExclusives from './components/desktop/DesktopMyExclusives';
import DesktopBoutique from './components/desktop/DesktopBoutique';
import DesktopBoutiques from './components/desktop/DesktopBoutiques';
import DesktopDressDetail from './components/desktop/DesktopDressDetail';
import DesktopNav from './components/desktop/DesktopNav';
import DesktopLogin from './components/desktop/DesktopLogin';

export type Page =
  | 'home'
  | 'search'
  | 'cart'
  | 'checkout'
  | 'confirm'
  | 'payment'
  | 'profile'
  | 'wishlist'
  | 'ai-stylist'
  | 'virtual-tryon'
  | 'orders'
  | 'order-tracking'
  | 'exclusivity'
  | 'exclusivity-confirmation'
  | 'exclusivity-certificate'
  | 'my-exclusives'
  | 'dress-detail'
  | 'boutique'
  | 'boutiques'
  | 'login';

export default function App() {
  const isMobile = useIsMobile();
  const { user, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageHistory, setPageHistory] = useState<Page[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [selectedDressId, setSelectedDressId] = useState<number | null>(null);
  const [selectedBoutiqueName, setSelectedBoutiqueName] = useState<string | null>(null);
  const [exclusives, setExclusives] = useState<Exclusive[]>([]);
  const [, setDataVersion] = useState(0);

  // Load dresses & boutiques from API on mount
  useEffect(() => {
    Promise.all([loadDresses(), loadBoutiques()]).then(() => {
      setDataVersion(v => v + 1);
    });
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Load cart, wishlist, and orders from API when user logs in
  const loadUserData = useCallback(async () => {
    if (!user) {
      setCart([]);
      setWishlistIds([]);
      setOrders([]);
      setExclusives([]);
      return;
    }
    try {
      const [cartData, wishlistData, ordersData, exclusivesData] = await Promise.all([
        api.getCart(),
        api.getWishlist(),
        api.getOrders(),
        api.getExclusives(),
      ]);
      // Map API cart items (flat) to local CartItem format (nested dress object)
      setCart(cartData.map((item: any) => ({
        dress: {
          id: item.dress_id,
          name: item.name,
          boutique: item.boutique,
          price: item.price,
          rating: item.rating,
          reviews: item.reviews,
          express: item.express,
          collection: item.collection,
          image: item.image_url,
        },
        quantity: item.quantity,
        size: item.size || 'M',
        color: 'Black',
        _cartItemId: item.id, // keep server cart item id for updates
      })));
      setWishlistIds(wishlistData.map((item: any) => item.dress_id || item.id));
      setOrders(ordersData.map((order: any) => ({
        id: order.order_number || `ORD-${order.id}`,
        date: order.created_at?.split('T')[0] || order.created_at,
        status: order.status || 'processing',
        items: (order.items || []).map((oi: any) => ({
          dress: {
            id: oi.dress_id,
            name: oi.name,
            boutique: oi.boutique,
            price: oi.price,
            image: oi.image_url,
            collection: oi.collection,
          },
          quantity: oi.quantity,
          size: oi.size || 'M',
          color: 'Black',
        })),
        total: order.total,
      })));
      setExclusives(exclusivesData.map((e: any) => ({
        id: e.id,
        dress_id: e.dress_id,
        dressName: e.name,
        boutique: e.boutique,
        price: e.price,
        event_name: e.event_name,
        event_date: e.event_date,
        venue: e.venue,
        occasion: e.occasion,
        status: e.status,
      })));
    } catch {
      // silently fail — user can still browse
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading) {
      loadUserData();
    }
  }, [authLoading, loadUserData]);

  const handleNavigate = (page: Page, dressId?: number) => {
    // Redirect to login for auth-required pages if not logged in
    if (!user && ['checkout', 'confirm', 'payment', 'orders', 'order-tracking', 'profile', 'exclusivity', 'my-exclusives'].includes(page)) {
      setPageHistory(prev => [...prev, currentPage]);
      setCurrentPage('login');
      return;
    }
    setPageHistory(prev => [...prev, currentPage]);
    setCurrentPage(page);
    if (dressId !== undefined) {
      setSelectedDressId(dressId);
    }
  };

  const handleGoBack = () => {
    const previousPage = pageHistory[pageHistory.length - 1] || 'home';
    setPageHistory(prev => prev.slice(0, -1));
    setCurrentPage(previousPage);
  };

  const handleSelectBoutique = (name: string) => {
    setSelectedBoutiqueName(name);
    setPageHistory(prev => [...prev, currentPage]);
    setCurrentPage('boutique');
  };

  const handleAddToCart = async (dressId?: number) => {
    const id = dressId || selectedDressId || 1;
    const dress = getDressById(id);
    if (!dress) return;

    if (user) {
      try {
        await api.addToCart(id, 'M', 1);
        await loadUserData();
      } catch { /* ignore */ }
    } else {
      setCart(prev => {
        const existing = prev.find(item => item.dress.id === id);
        if (existing) {
          return prev.map(item =>
            item.dress.id === id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { dress, quantity: 1, size: 'M', color: 'Black' }];
      });
    }
  };

  const handleRemoveFromCart = async (dressId: number) => {
    if (user) {
      const cartItem = cart.find(item => item.dress.id === dressId) as any;
      if (cartItem?._cartItemId) {
        try {
          await api.removeFromCart(cartItem._cartItemId);
          await loadUserData();
        } catch { /* ignore */ }
      }
    } else {
      setCart(prev => prev.filter(item => item.dress.id !== dressId));
    }
  };

  const handleUpdateQuantity = async (dressId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(dressId);
      return;
    }
    if (user) {
      const cartItem = cart.find(item => item.dress.id === dressId) as any;
      if (cartItem?._cartItemId) {
        try {
          await api.updateCartItem(cartItem._cartItemId, quantity);
          await loadUserData();
        } catch { /* ignore */ }
      }
    } else {
      setCart(prev => prev.map(item =>
        item.dress.id === dressId ? { ...item, quantity } : item
      ));
    }
  };

  const handleAddToWishlist = async (dressId?: number) => {
    const id = dressId || selectedDressId || 1;
    if (user) {
      try {
        await api.toggleWishlist(id);
        await loadUserData();
      } catch { /* ignore */ }
    } else {
      setWishlistIds(prev => {
        if (prev.includes(id)) {
          return prev.filter(wid => wid !== id);
        }
        return [...prev, id];
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;
    if (user) {
      try {
        await api.placeOrder({});
        await loadUserData();
      } catch { /* ignore */ }
    } else {
      const total = cart.reduce((sum, item) => sum + item.dress.price * item.quantity, 0);
      const newOrder: Order = {
        id: `ORD-2026-${String(orders.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        status: 'in-transit',
        items: [...cart],
        total,
      };
      setOrders(prev => [newOrder, ...prev]);
      setCart([]);
    }
  };

  const handleRequestExclusivity = async (data: {
    dress_id: number;
    event_name: string;
    event_date: string;
    venue: string;
    occasion: string;
  }) => {
    if (!user) return;
    try {
      await api.requestExclusivity(data);
      await loadUserData();
    } catch { /* ignore */ }
  };

  const handleCancelExclusivity = async (id: number) => {
    if (!user) return;
    try {
      await api.cancelExclusivity(id);
      await loadUserData();
    } catch { /* ignore */ }
  };

  if (isMobile) {
    return renderMobile();
  }
  return renderDesktop();

  function renderMobile() {
    switch (currentPage) {
      case 'home':
        return <MobileHome onNavigate={handleNavigate} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} cartItems={cartCount} wishlistItems={wishlistIds.length} />;
      case 'search':
        return <MobileSearch onNavigate={handleNavigate} onGoBack={handleGoBack} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} wishlistItems={wishlistIds.length} />;
      case 'dress-detail':
        return <MobileDressDetail onNavigate={handleNavigate} onGoBack={handleGoBack} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} wishlistItems={wishlistIds.length} dressId={selectedDressId} />;
      case 'cart':
        return <MobileCart onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} cart={cart} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />;
      case 'checkout':
        return <MobileCheckout onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} cart={cart} />;
      case 'confirm':
        return <MobileConfirm onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} cart={cart} onPlaceOrder={handlePlaceOrder} />;
      case 'payment':
        return <MobilePayment onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} cart={cart} />;
      case 'profile':
        return <MobileProfile onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} />;
      case 'wishlist':
        return <MobileWishlist onNavigate={handleNavigate} onGoBack={handleGoBack} onAddToCart={handleAddToCart} onRemoveFromWishlist={handleAddToWishlist} wishlistItems={wishlistIds.length} wishlistIds={wishlistIds} />;
      case 'ai-stylist':
        return <MobileAIStylist onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
      case 'virtual-tryon':
        return <MobileVirtualTryOn onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} />;
      case 'orders':
        return <MobileOrders onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} orders={orders} />;
      case 'order-tracking':
        return <MobileOrderTracking onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} orders={orders} />;
      case 'exclusivity':
        return <MobileExclusivity onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} dressId={selectedDressId} onRequestExclusivity={handleRequestExclusivity} />;
      case 'exclusivity-confirmation':
      case 'exclusivity-certificate':
        return <MobileExclusivityConfirmation onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} exclusives={exclusives} />;
      case 'my-exclusives':
        return <MobileMyExclusives onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} exclusives={exclusives} onCancelExclusivity={handleCancelExclusivity} />;
      case 'boutiques':
        return <MobileBoutiques onNavigate={handleNavigate} onGoBack={handleGoBack} onSelectBoutique={handleSelectBoutique} wishlistItems={wishlistIds.length} />;
      case 'boutique':
        return <MobileBoutique onNavigate={handleNavigate} onGoBack={handleGoBack} wishlistItems={wishlistIds.length} boutiqueName={selectedBoutiqueName} />;
      case 'login':
        return <MobileLogin onNavigate={handleNavigate} wishlistItems={wishlistIds.length} />;
      default:
        return <MobileHome onNavigate={handleNavigate} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} cartItems={cartCount} wishlistItems={wishlistIds.length} />;
    }
  }

  function renderDesktop() {
    function desktopPage() {
      switch (currentPage) {
        case 'home':
          return <DesktopHome onNavigate={handleNavigate} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
        case 'search':
          return <DesktopSearch onNavigate={handleNavigate} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
        case 'dress-detail':
          return <DesktopDressDetail onNavigate={handleNavigate} onGoBack={handleGoBack} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} dressId={selectedDressId} />;
        case 'cart':
          return <DesktopCart onNavigate={handleNavigate} onGoBack={handleGoBack} cart={cart} onRemoveFromCart={handleRemoveFromCart} onUpdateQuantity={handleUpdateQuantity} />;
        case 'checkout':
          return <DesktopCheckout onNavigate={handleNavigate} onGoBack={handleGoBack} cart={cart} onPlaceOrder={handlePlaceOrder} />;
        case 'confirm':
        case 'payment':
          return <DesktopCheckout onNavigate={handleNavigate} onGoBack={handleGoBack} cart={cart} onPlaceOrder={handlePlaceOrder} />;
        case 'profile':
          return <DesktopProfile onNavigate={handleNavigate} />;
        case 'wishlist':
          return <DesktopWishlist onNavigate={handleNavigate} onGoBack={handleGoBack} onAddToCart={handleAddToCart} onRemoveFromWishlist={handleAddToWishlist} wishlistIds={wishlistIds} />;
        case 'ai-stylist':
          return <DesktopAIStylist onNavigate={handleNavigate} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
        case 'virtual-tryon':
          return <DesktopVirtualTryOn onNavigate={handleNavigate} />;
        case 'orders':
          return <DesktopMyOrders onNavigate={handleNavigate} onGoBack={handleGoBack} orders={orders} />;
        case 'order-tracking':
          return <DesktopOrderTracking onNavigate={handleNavigate} onGoBack={handleGoBack} orders={orders} />;
        case 'exclusivity':
          return <DesktopMyExclusives onNavigate={handleNavigate} exclusives={exclusives} onCancelExclusivity={handleCancelExclusivity} onRequestExclusivity={handleRequestExclusivity} dressId={selectedDressId} />;
        case 'exclusivity-confirmation':
        case 'exclusivity-certificate':
          return <DesktopMyExclusives onNavigate={handleNavigate} exclusives={exclusives} onCancelExclusivity={handleCancelExclusivity} onRequestExclusivity={handleRequestExclusivity} dressId={selectedDressId} />;
        case 'my-exclusives':
          return <DesktopMyExclusives onNavigate={handleNavigate} exclusives={exclusives} onCancelExclusivity={handleCancelExclusivity} onRequestExclusivity={handleRequestExclusivity} dressId={selectedDressId} />;
        case 'boutiques':
          return <DesktopBoutiques onNavigate={handleNavigate} onSelectBoutique={handleSelectBoutique} />;
        case 'boutique':
          return <DesktopBoutique onNavigate={handleNavigate} onGoBack={handleGoBack} boutiqueName={selectedBoutiqueName} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
        case 'login':
          return <DesktopLogin onNavigate={handleNavigate} />;
        default:
          return <DesktopHome onNavigate={handleNavigate} onAddToCart={handleAddToCart} onAddToWishlist={handleAddToWishlist} />;
      }
    }

    return (
      <>
        <DesktopNav onNavigate={handleNavigate} currentPage={currentPage} cartCount={cartCount} wishlistCount={wishlistIds.length} />
        {desktopPage()}
      </>
    );
  }
}

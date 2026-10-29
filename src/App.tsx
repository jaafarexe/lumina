import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, Order } from './types';
import { Check, ShoppingBag, Sparkles } from 'lucide-react';

const CART_STORAGE_KEY = 'lumina_cart_v1';
const WISHLIST_STORAGE_KEY = 'lumina_wishlist_v1';
const ORDERS_STORAGE_KEY = 'lumina_orders_v1';

export default function App() {
  // Products catalog
  const products = PRODUCTS;
  const featuredProduct = products[0]; // Hasami Tumbler

  // Filter & Search State
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart State with LocalStorage sync
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage sync
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Orders State with LocalStorage sync
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Discounts
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | null>(null);

  // Modals & Drawers Visibility
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Subtle floating toast feedback when quick-added
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Wishlisted product objects
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  // Cart total items
  const totalCartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Cart financial computations
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedDiscountCode === 'LUMINA10') {
    discountAmount = cartSubtotal * 0.10; // 10% off
  } else if (appliedDiscountCode === 'WELCOME15') {
    discountAmount = Math.min(cartSubtotal, 15.00); // $15 off
  }

  // Cart Handlers
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    selectedVariants?: Record<string, string>
  ) => {
    const variants = selectedVariants || {};
    if (Object.keys(variants).length === 0) {
      product.variants.forEach((v) => {
        variants[v.name] = v.options[0];
      });
    }

    const variantKey = Object.entries(variants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');

    const itemId = `${product.id}-${variantKey}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity,
        };
        return copy;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            productId: product.id,
            product,
            selectedVariants: variants,
            quantity,
            unitPrice: product.price,
          },
        ];
      }
    });

    // Provide visual toast feedback
    setToastMessage(`Added ${product.name} to bag`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleApplyDiscountCode = (code: string) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'LUMINA10') {
      setAppliedDiscountCode('LUMINA10');
      return { success: true, message: 'Applied 10% seasonal discount!' };
    }
    if (cleanCode === 'WELCOME15') {
      setAppliedDiscountCode('WELCOME15');
      return { success: true, message: 'Applied $15 welcome credit!' };
    }
    if (cleanCode === 'FREESHIP') {
      setAppliedDiscountCode('FREESHIP');
      return { success: true, message: 'Free express shipping activated!' };
    }
    return { success: false, message: 'Invalid promo code. Try LUMINA10 or WELCOME15.' };
  };

  const handleRemoveDiscountCode = () => {
    setAppliedDiscountCode(null);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        return prev.filter((id) => id !== product.id);
      } else {
        return [...prev, product.id];
      }
    });
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
    handleToggleWishlist(product);
  };

  // Immediate Buy Now Handler
  const handleBuyNow = (
    product: Product,
    quantity: number,
    selectedVariants: Record<string, string>
  ) => {
    handleAddToCart(product, quantity, selectedVariants);
    setSelectedProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Checkout Handlers
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setCartItems([]);
    setAppliedDiscountCode(null);
    setIsCheckoutOpen(false);
    setConfirmedOrder(order);
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-stone-300 selection:text-stone-950 font-sans-body">
      {/* Top Bar with Contract Compliance */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={setActiveCategory}
        activeCategory={activeCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Floating Feedback Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-stone-100 text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-stone-400 hover:text-white underline ml-2 font-normal text-[11px]"
          >
            View bag
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section (only when no active search query to preserve editorial rhythm) */}
        {!searchQuery && activeCategory === 'All' && (
          <HeroBanner
            featuredProduct={featuredProduct}
            onExploreClick={scrollToCatalog}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {/* Product Catalog Grid with Filters & Sort */}
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(prod, qty, vars) => handleAddToCart(prod, qty, vars)}
        onBuyNow={handleBuyNow}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        appliedDiscountCode={appliedDiscountCode}
        discountAmount={discountAmount}
        onApplyDiscountCode={handleApplyDiscountCode}
        onRemoveDiscountCode={handleRemoveDiscountCode}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
        onMoveToCart={handleMoveWishlistToCart}
        onSelectProduct={setSelectedProduct}
      />

      {/* Checkout Demo Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        appliedDiscountCode={appliedDiscountCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Screen */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Past Orders History Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        onViewOrder={(order) => setConfirmedOrder(order)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCatalog();
        }}
        onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
      />
    </div>
  );
}

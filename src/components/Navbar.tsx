import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, X, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onSelectCategory: (cat: ProductCategory) => void;
  activeCategory: ProductCategory;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onSelectCategory,
  activeCategory,
  searchQuery,
  onSearchChange,
}) => {
  const [showBanner, setShowBanner] = useState(true);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navCategories: { label: string; category: ProductCategory }[] = [
    { label: 'Shop All', category: 'All' },
    { label: 'Kitchen & Table', category: 'Kitchen & Table' },
    { label: 'Living & Decor', category: 'Living & Decor' },
    { label: 'Care & Wellness', category: 'Care & Wellness' },
    { label: 'Stationery', category: 'Stationery & Desk' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Editorial Announcement Banner */}
      {showBanner && (
        <div className="bg-[#2B2724] text-[#FAF8F5] px-4 py-2 text-xs flex items-center justify-between transition-all">
          <div className="flex-1 text-center font-normal tracking-wide">
            <span>Complimentary express shipping on orders over $75</span>
            <span className="mx-2 text-stone-500">·</span>
            <span className="hidden sm:inline text-stone-300">Mindfully packaged with 100% recycled materials</span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Strict Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (4-5 Nav Links) — Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display serif) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-2xl font-serif-title font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity"
        >
          Lumina
        </a>

        {/* Zone 2: 4–5 single-line clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navCategories.map((item) => {
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.label}
                onClick={() => {
                  onSelectCategory(item.category);
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  isActive
                    ? 'text-stone-950 font-semibold'
                    : 'hover:text-stone-950 text-stone-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-stone-900 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action Cluster (Search, Wishlist, Bag) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search Affordance */}
          <div className="relative flex items-center">
            {isSearchExpanded ? (
              <div className="flex items-center bg-stone-100 rounded-lg border border-stone-300 px-2.5 py-1.5 w-44 sm:w-60 transition-all">
                <Search className="w-4 h-4 text-stone-500 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search goods..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  className="bg-transparent text-xs text-stone-900 outline-none w-full placeholder:text-stone-400"
                />
                <button
                  onClick={() => {
                    onSearchChange('');
                    setIsSearchExpanded(false);
                  }}
                  className="text-stone-400 hover:text-stone-700 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchExpanded(true)}
                aria-label="Search store"
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Wishlist items"
            className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors relative"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-800 text-white rounded-full text-[10px] font-mono tabular-nums flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button (Primary Action) */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className="flex items-center gap-2.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg transition-colors font-medium text-xs tracking-wide shrink-0 shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono tabular-nums bg-stone-700/80 px-1.5 py-0.5 rounded text-[11px]">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

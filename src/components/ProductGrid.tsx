import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedVariants?: Record<string, string>) => void;
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // In-stock toggle filter
    if (inStockOnly) {
      result = result.filter((p) => p.inStock > 0);
    }

    // Sort order
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'featured':
      default:
        // Default order
        break;
    }

    return result;
  }, [products, activeCategory, searchQuery, inStockOnly, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    onSearchChange('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  return (
    <section id="catalog-section" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-stone-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-stone-500">
            Curated Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-stone-900 mt-1">
            Objects for Daily Living
          </h2>
        </div>

        <div className="text-xs font-mono tabular-nums text-stone-500">
          Showing {filteredProducts.length} of {products.length} objects
        </div>
      </div>

      {/* Control Bar: Category Tabs, Search Bar, Sort Dropdown & Toggles */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Category Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-stone-900 text-stone-50 shadow-xs'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-950 hover:bg-stone-200/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search, Sort, and In-Stock Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-50/80 p-3 rounded-xl border border-stone-200/80">
          {/* Search Input Field */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by material, origin, name..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-white rounded-lg border border-stone-300 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5">
            {/* In-Stock Filter Toggle */}
            <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer bg-white px-3 py-2 rounded-lg border border-stone-300 select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded text-stone-900 focus:ring-0 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-stone-300 text-xs text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500 shrink-0" />
              <span className="text-stone-400 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort products by"
                className="bg-transparent text-xs text-stone-900 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid: 3-column (desktop), 2-column (tablet), 1-column (mobile) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center bg-stone-50/60 rounded-2xl border border-dashed border-stone-300 p-8">
          <p className="text-base font-serif-title font-medium text-stone-800">
            No matching everyday objects found
          </p>
          <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search terms or clearing your category filters to view our full collection.
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 px-4 py-2 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </section>
  );
};

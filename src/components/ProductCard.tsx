import React, { useState } from 'react';
import { Star, Plus, Heart, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedVariants?: Record<string, string>) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default to first variant option if available
    const defaults: Record<string, string> = {};
    product.variants.forEach((v) => {
      defaults[v.name] = v.options[0];
    });

    onAddToCart(product, 1, defaults);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1600);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col bg-white rounded-xl border border-stone-200/80 hover:border-stone-300 hover:shadow-md transition-all duration-300 overflow-hidden relative"
    >
      {/* Visual Canvas Area */}
      <div className="relative">
        <ProductCardVisual product={product} size="md" />

        {/* Wishlist Button floating subtle in top right overlay */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-xs transition-colors z-20 ${
            isWishlisted
              ? 'bg-red-50 text-red-600 border border-red-200'
              : 'bg-white/80 text-stone-500 hover:text-stone-900 border border-stone-200/80 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Hover Tooltip */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
          <span className="bg-stone-900/85 text-stone-100 text-[11px] font-medium px-3 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5 shadow-sm">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick Inspect</span>
          </span>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic dot separator */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="truncate">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[11px] font-mono text-stone-400 shrink-0">{product.origin.split(',')[0]}</span>
          </div>

          {/* Title */}
          <h3 className="text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>

          {/* Rating without pill enclosure */}
          <div className="flex items-center gap-1.5 mt-2.5 text-xs text-stone-600">
            <div className="flex items-center text-amber-600">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="font-mono tabular-nums font-medium text-stone-800">{product.rating.toFixed(1)}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Bottom Price & Quick Add Bar */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold font-mono tabular-nums text-stone-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs font-mono tabular-nums text-stone-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAddedRecently}
            aria-label={`Add ${product.name} to bag`}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 flex items-center gap-1.5 ${
              isAddedRecently
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-100 hover:bg-stone-900 text-stone-800 hover:text-white border border-stone-200/90'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

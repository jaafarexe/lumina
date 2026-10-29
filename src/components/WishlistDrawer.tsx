import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onMoveToCart,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wishlist Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50/80">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-600 fill-current" />
              <h2 className="text-lg font-serif-title font-semibold text-stone-900">
                Saved Favorites
              </h2>
              <span className="text-xs font-mono tabular-nums text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded-full">
                {wishlistProducts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close wishlist drawer"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4 border border-stone-200">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif-title font-medium text-stone-900">
                  No saved items yet
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1.5 mb-6 leading-relaxed">
                  Click the heart icon on any product to save it to your personal curation.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 rounded-xl bg-stone-50/70 border border-stone-200/80 items-center justify-between"
                >
                  <div
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex gap-3 items-center flex-1 min-w-0 cursor-pointer group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white">
                      <ProductCardVisual product={product} size="sm" showBadge={false} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-stone-900 group-hover:text-amber-900 transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">{product.category}</p>
                      <p className="text-xs font-mono font-semibold text-stone-900 mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                    <button
                      onClick={() => onMoveToCart(product)}
                      title="Move to bag"
                      className="p-2 bg-stone-900 text-white hover:bg-stone-800 rounded-lg text-xs transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      title="Remove from favorites"
                      className="p-2 text-stone-400 hover:text-red-600 rounded-lg hover:bg-stone-200/50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

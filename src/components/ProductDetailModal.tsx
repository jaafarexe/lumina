import React, { useState } from 'react';
import { X, Star, Heart, Check, Plus, Minus, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedVariants: Record<string, string>) => void;
  onBuyNow: (product: Product, quantity: number, selectedVariants: Record<string, string>) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  // Initialize selected variants with first option of each
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach((v) => {
      initial[v.name] = v.options[0];
    });
    return initial;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  const handleVariantChange = (variantName: string, option: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: option,
    }));
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariants);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedVariants);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.name} details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Modal Top Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <span>{product.category}</span>
            <span>·</span>
            <span>{product.origin}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left Column: Visual Showcase Gallery */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="rounded-xl overflow-hidden border border-stone-200/90 shadow-xs">
                <ProductCardVisual
                  product={product}
                  size="hero"
                  className="rounded-xl"
                  showBadge={true}
                />
              </div>

              {/* Material & Craft Provenance Highlight Box */}
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/70 text-xs">
                <div className="font-semibold text-stone-900 mb-1">Authentic Studio Craft</div>
                <p className="text-stone-600 leading-relaxed mb-2">
                  Each piece is inspected individually. Natural variations in ceramic glazing,
                  wood grain, and linen weave are intentional hallmarks of artisanal production.
                </p>
                <div className="flex items-center gap-4 text-stone-500 pt-2 border-t border-stone-200/60">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Free ship $75+</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>30-Day returns</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="md:col-span-6 flex flex-col">
              {/* Product Title & Tagline */}
              <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-stone-900">
                {product.name}
              </h2>
              <p className="text-sm text-stone-500 mt-1">{product.tagline}</p>

              {/* Ratings and Reviews count */}
              <div className="flex items-center gap-2 mt-3 text-xs text-stone-600">
                <div className="flex items-center text-amber-600">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-current'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-mono tabular-nums font-semibold text-stone-800">
                  {product.rating.toFixed(1)}
                </span>
                <span>·</span>
                <span className="underline cursor-pointer" onClick={() => setActiveTab('reviews')}>
                  {product.reviewCount} customer reviews
                </span>
              </div>

              {/* Pricing Display */}
              <div className="mt-5 flex items-baseline gap-3 pb-5 border-b border-stone-200">
                <span className="text-2xl font-bold font-mono tabular-nums text-stone-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-mono tabular-nums text-stone-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-stone-500 font-mono ml-auto">
                  {product.inStock > 5 ? (
                    <span className="text-emerald-700 font-medium">In Stock ({product.inStock} units)</span>
                  ) : (
                    <span className="text-amber-700 font-medium">Only {product.inStock} left in stock</span>
                  )}
                </span>
              </div>

              {/* Variant Selectors */}
              {product.variants.map((variant) => (
                <div key={variant.name} className="mt-4">
                  <div className="flex items-center justify-between text-xs font-medium text-stone-800 mb-2">
                    <span>{variant.name}:</span>
                    <span className="text-stone-500 font-normal">
                      {selectedVariants[variant.name]}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {variant.options.map((opt) => {
                      const isSelected = selectedVariants[variant.name] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => handleVariantChange(variant.name, opt)}
                          className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                            isSelected
                              ? 'bg-stone-900 text-stone-50 shadow-xs'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Quantity Stepper & Actions */}
              <div className="mt-6 flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-mono tabular-nums font-semibold text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.inStock, q + 1))}
                    aria-label="Increase quantity"
                    className="p-1.5 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium text-xs tracking-wide transition-all flex items-center justify-center gap-2 shadow-xs ${
                    addedToast
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white'
                  }`}
                >
                  {addedToast ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · ${(product.price * quantity).toFixed(2)}</span>
                  )}
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  aria-label="Wishlist toggle"
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-stone-600 hover:text-stone-900 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="mt-2.5 w-full py-3 px-4 rounded-lg font-medium text-xs tracking-wide bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 transition-colors"
              >
                Instant Checkout
              </button>

              {/* Tab Navigation for Extended Specs */}
              <div className="mt-8 pt-5 border-t border-stone-200">
                <div className="flex border-b border-stone-200 text-xs">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`py-2 px-3 font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === 'details'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab('specs')}
                    className={`py-2 px-3 font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === 'specs'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Specifications
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-2 px-3 font-medium transition-colors border-b-2 -mb-px ${
                      activeTab === 'reviews'
                        ? 'border-stone-900 text-stone-900'
                        : 'border-transparent text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    Reviews ({product.reviews.length})
                  </button>
                </div>

                <div className="py-4 text-xs text-stone-600">
                  {activeTab === 'details' && (
                    <div className="space-y-2 leading-relaxed">
                      <p>{product.description}</p>
                      <p className="text-stone-500">
                        Designed for longevity and quiet elegance. Free from artificial synthetics and packaged in 100% recyclable materials.
                      </p>
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <dl className="grid grid-cols-2 gap-3 bg-stone-50 p-3 rounded-lg border border-stone-200/80">
                      <div>
                        <dt className="text-stone-400 uppercase font-mono text-[10px]">Material</dt>
                        <dd className="font-medium text-stone-900 mt-0.5">{product.material}</dd>
                      </div>
                      <div>
                        <dt className="text-stone-400 uppercase font-mono text-[10px]">Origin</dt>
                        <dd className="font-medium text-stone-900 mt-0.5">{product.origin}</dd>
                      </div>
                      <div>
                        <dt className="text-stone-400 uppercase font-mono text-[10px]">Dimensions</dt>
                        <dd className="font-medium text-stone-900 mt-0.5">{product.dimensions}</dd>
                      </div>
                      <div>
                        <dt className="text-stone-400 uppercase font-mono text-[10px]">Care</dt>
                        <dd className="font-medium text-stone-900 mt-0.5">Hand wash or wipe with damp cloth</dd>
                      </div>
                    </dl>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      {product.reviews.map((rev) => (
                        <div key={rev.id} className="border-b border-stone-100 pb-3">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-stone-900">{rev.author}</span>
                            <span className="text-[10px] text-stone-400">{rev.date}</span>
                          </div>
                          <div className="flex items-center gap-1 text-amber-600 my-1">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                          <p className="font-medium text-stone-800">{rev.title}</p>
                          <p className="text-stone-600 mt-0.5">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

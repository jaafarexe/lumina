import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  appliedDiscountCode: string | null;
  discountAmount: number;
  onApplyDiscountCode: (code: string) => { success: boolean; message: string };
  onRemoveDiscountCode: () => void;
}

const FREE_SHIPPING_THRESHOLD = 75.0;

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscountCode,
  discountAmount,
  onApplyDiscountCode,
  onRemoveDiscountCode,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  // Financial calculations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || appliedDiscountCode === 'FREESHIP';
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 8.0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.08; // 8% sales tax
  const total = Math.max(0, taxableAmount + shippingFee + tax);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = onApplyDiscountCode(promoInput.trim().toUpperCase());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 bg-stone-50/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-900" />
              <h2 className="text-lg font-serif-title font-semibold text-stone-900">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-mono tabular-nums text-stone-500 bg-stone-200/80 px-2 py-0.5 rounded-full">
                {items.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close bag drawer"
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#FAF8F5] border-b border-stone-200/70 text-xs">
              <div className="flex justify-between items-center mb-1.5 font-medium">
                {isFreeShipping ? (
                  <span className="text-emerald-800 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Unlocked complimentary express shipping</span>
                  </span>
                ) : (
                  <span className="text-stone-700">
                    Add <strong className="font-mono tabular-nums text-stone-950">${amountToFreeShipping.toFixed(2)}</strong> more for free delivery
                  </span>
                )}
                <span className="font-mono text-stone-500">{freeShippingProgress.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-stone-900 h-full rounded-full transition-all duration-300"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Drawer Body: Item List or Empty State */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4 border border-stone-200">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif-title font-medium text-stone-900">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mt-1.5 mb-6 leading-relaxed">
                  Explore our carefully curated collection of ceramic vessels, linen throws, and everyday brass tools.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-xl bg-stone-50/70 border border-stone-200/80 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white">
                    <ProductCardVisual product={item.product} size="sm" showBadge={false} />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-stone-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Selected Variants */}
                      {Object.keys(item.selectedVariants).length > 0 && (
                        <div className="text-[11px] text-stone-500 mt-0.5">
                          {Object.entries(item.selectedVariants)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(' · ')}
                        </div>
                      )}
                    </div>

                    {/* Quantity Stepper & Price Line */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-mono tabular-nums font-medium text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="p-1 text-stone-600 hover:text-stone-900 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-semibold font-mono tabular-nums text-stone-900">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </span>
                        {item.quantity > 1 && (
                          <div className="text-[10px] text-stone-400 font-mono">
                            ${item.unitPrice.toFixed(2)} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Order Summary & Checkout Trigger */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50/90 space-y-4">
              {/* Promo Code Accordion */}
              <div>
                {appliedDiscountCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Code: {appliedDiscountCode}</span>
                    </div>
                    <button
                      onClick={onRemoveDiscountCode}
                      className="text-stone-400 hover:text-stone-700 underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (try: LUMINA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-stone-500 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg text-xs font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p
                    className={`text-[11px] mt-1 ${
                      promoMessage.isError ? 'text-red-600' : 'text-emerald-700'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200/60 font-normal">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({appliedDiscountCode})</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingFee === 0 ? 'Free' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span className="font-mono tabular-nums text-stone-900">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between pt-2 border-t border-stone-300 font-semibold text-sm text-stone-950">
                  <span>Estimated Total</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Encrypted 256-bit secure checkout demo</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

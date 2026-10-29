import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Truck, ArrowLeft, CheckCircle2, Lock, Smartphone, Banknote } from 'lucide-react';
import { CartItem, ShippingDetails, Order } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedDiscountCode: string | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  appliedDiscountCode,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  // Form State
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstName: 'Eleanor',
    lastName: 'Vance',
    email: 'eleanor.vance@everyday.com',
    phone: '(555) 392-8172',
    address: '420 Alder Street',
    apartment: 'Apt 4B',
    city: 'Portland',
    state: 'OR',
    postalCode: '97205',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9281');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('831');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Calculation
  const isFreeStandard = subtotal >= 75 || appliedDiscountCode === 'FREESHIP';
  const shippingCost = shippingMethod === 'standard' ? (isFreeStandard ? 0 : 8) : 15;
  const taxable = Math.max(0, subtotal - discountAmount);
  const tax = taxable * 0.08;
  const total = taxable + shippingCost + tax;

  const handleInputChange = (field: keyof ShippingDetails, val: string) => {
    setShippingDetails((prev) => ({ ...prev, [field]: val }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!shippingDetails.firstName.trim()) errors.firstName = 'First name is required';
    if (!shippingDetails.lastName.trim()) errors.lastName = 'Last name is required';
    if (!shippingDetails.email.trim() || !shippingDetails.email.includes('@')) errors.email = 'Valid email is required';
    if (!shippingDetails.address.trim()) errors.address = 'Street address is required';
    if (!shippingDetails.city.trim()) errors.city = 'City is required';
    if (!shippingDetails.state.trim()) errors.state = 'State is required';
    if (!shippingDetails.postalCode.trim()) errors.postalCode = 'Postal code is required';
    if (!shippingDetails.phone.trim()) errors.phone = 'Phone number is required';
    return errors;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);

    // Simulate authentic network verification
    setTimeout(() => {
      const orderId = `LUM-${Math.floor(100000 + Math.random() * 900000)}`;
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + (shippingMethod === 'express' ? 2 : 5));

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items,
        subtotal,
        discount: discountAmount,
        discountCode: appliedDiscountCode || undefined,
        shippingFee: shippingCost,
        tax,
        total,
        shippingDetails,
        shippingMethod,
        paymentMethod,
        status: 'Confirmed',
        estimatedDelivery: deliveryDate.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      };

      setIsProcessing(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Checkout Demo"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-serif-title font-semibold text-stone-900">
              Lumina
            </span>
            <span className="text-stone-300">/</span>
            <span className="text-xs font-medium text-stone-600 uppercase tracking-wider font-mono">
              Secure Checkout
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Return to cart"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2-Column Split: Form (Left) & Live Order Summary (Right) */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-full">
            {/* Left 7 cols: Checkout Form */}
            <form onSubmit={handlePlaceOrder} className="lg:col-span-7 p-6 sm:p-8 space-y-6">
              {/* Step 1: Customer Contact */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-stone-900 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">
                      1
                    </span>
                    <span>Contact Information</span>
                  </h3>
                  <span className="text-[11px] text-stone-400">Order updates will be sent here</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Email</label>
                    <input
                      type="email"
                      value={shippingDetails.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-stone-900 focus:outline-none focus:border-stone-500 ${
                        formErrors.email ? 'border-red-400 bg-red-50/20' : 'border-stone-300'
                      }`}
                    />
                    {formErrors.email && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.email}</span>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={shippingDetails.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-stone-900 focus:outline-none focus:border-stone-500 ${
                        formErrors.phone ? 'border-red-400 bg-red-50/20' : 'border-stone-300'
                      }`}
                    />
                    {formErrors.phone && <span className="text-[10px] text-red-500 mt-0.5">{formErrors.phone}</span>}
                  </div>
                </div>
              </div>

              {/* Step 2: Shipping Destination */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Shipping Address</span>
                </h3>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">First Name</label>
                      <input
                        type="text"
                        value={shippingDetails.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-stone-900 focus:outline-none focus:border-stone-500 ${
                          formErrors.firstName ? 'border-red-400' : 'border-stone-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Last Name</label>
                      <input
                        type="text"
                        value={shippingDetails.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-stone-900 focus:outline-none focus:border-stone-500 ${
                          formErrors.lastName ? 'border-red-400' : 'border-stone-300'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-stone-600 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={shippingDetails.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-white border rounded-lg text-stone-900 focus:outline-none focus:border-stone-500 ${
                        formErrors.address ? 'border-red-400' : 'border-stone-300'
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">City</label>
                      <input
                        type="text"
                        value={shippingDetails.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">State</label>
                      <input
                        type="text"
                        value={shippingDetails.state}
                        onChange={(e) => handleInputChange('state', e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">Postal Code</label>
                      <input
                        type="text"
                        value={shippingDetails.postalCode}
                        onChange={(e) => handleInputChange('postalCode', e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-stone-300 rounded-lg text-stone-900"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Shipping Method */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">
                    3
                  </span>
                  <span>Delivery Speed</span>
                </h3>

                <div className="space-y-2">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                      shippingMethod === 'standard'
                        ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-xs'
                        : 'border-stone-300 bg-white/70 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping_method"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="text-stone-900 focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Standard Carbon-Neutral Delivery</div>
                        <div className="text-[11px] text-stone-500">3–5 business days via USPS / DHL</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-900">
                      {isFreeStandard ? 'FREE' : '$8.00'}
                    </span>
                  </label>

                  <label
                    onClick={() => setShippingMethod('express')}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                      shippingMethod === 'express'
                        ? 'border-stone-900 bg-white ring-1 ring-stone-900 shadow-xs'
                        : 'border-stone-300 bg-white/70 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping_method"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="text-stone-900 focus:ring-0"
                      />
                      <div>
                        <div className="text-xs font-semibold text-stone-900">Priority Express Courier</div>
                        <div className="text-[11px] text-stone-500">1–2 business days with signature tracking</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-medium text-stone-900">$15.00</span>
                  </label>
                </div>
              </div>

              {/* Step 4: Payment Simulation */}
              <div className="pt-4 border-t border-stone-200">
                <h3 className="text-sm font-semibold text-stone-900 mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-xs flex items-center justify-center font-mono">
                    4
                  </span>
                  <span>Payment Method</span>
                </h3>

                {/* Payment Option Tabs */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                      paymentMethod === 'card'
                        ? 'bg-white border-stone-900 text-stone-900 shadow-xs ring-1 ring-stone-900'
                        : 'bg-white/60 border-stone-300 text-stone-600 hover:bg-white'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>Card</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                      paymentMethod === 'apple_pay'
                        ? 'bg-white border-stone-900 text-stone-900 shadow-xs ring-1 ring-stone-900'
                        : 'bg-white/60 border-stone-300 text-stone-600 hover:bg-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-2.5 rounded-lg border text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${
                      paymentMethod === 'cod'
                        ? 'bg-white border-stone-900 text-stone-900 shadow-xs ring-1 ring-stone-900'
                        : 'bg-white/60 border-stone-300 text-stone-600 hover:bg-white'
                    }`}
                  >
                    <Banknote className="w-3.5 h-3.5" />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                {/* Card Fields */}
                {paymentMethod === 'card' && (
                  <div className="bg-white p-3.5 rounded-xl border border-stone-300 space-y-2.5">
                    <div>
                      <label className="block text-[10px] font-medium text-stone-500 uppercase tracking-wider mb-1">
                        Card Number (Demo test mode)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-md font-mono text-stone-900"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] font-medium text-stone-500 uppercase tracking-wider mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-md font-mono text-stone-900"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-stone-500 uppercase tracking-wider mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded-md font-mono text-stone-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'apple_pay' && (
                  <div className="p-4 bg-stone-900 text-stone-100 rounded-xl text-center text-xs space-y-1">
                    <p className="font-medium">Touch ID / Face ID simulation ready</p>
                    <p className="text-[11px] text-stone-400">Clicking Complete Order will authorize instantly.</p>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900">
                    <p className="font-medium">Cash on Delivery Verified</p>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      Pay <strong className="font-mono">${total.toFixed(2)}</strong> upon arrival of courier. Exact change appreciated.
                    </p>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 px-6 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-600 text-stone-50 font-medium text-xs tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-stone-400 border-t-white rounded-full animate-spin" />
                      <span>Authorizing Order...</span>
                    </span>
                  ) : (
                    <span>
                      Authorize & Place Order · ${total.toFixed(2)}
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Right 5 cols: Itemized Live Order Summary */}
            <div className="lg:col-span-5 bg-stone-100/90 p-6 sm:p-8 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider font-mono mb-4">
                  Order Summary ({items.length} items)
                </h4>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {items.map((it) => (
                    <div key={it.id} className="flex gap-3 text-xs bg-white p-2.5 rounded-lg border border-stone-200">
                      <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-stone-50">
                        <ProductCardVisual product={it.product} size="sm" showBadge={false} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-stone-900 truncate">{it.product.name}</div>
                        <div className="text-[10px] text-stone-500 font-mono">
                          Qty: {it.quantity} · ${it.unitPrice.toFixed(2)}
                        </div>
                      </div>
                      <div className="font-mono font-semibold text-stone-900 shrink-0">
                        ${(it.unitPrice * it.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-stone-300 space-y-2 text-xs text-stone-600">
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
                    <span>Shipping</span>
                    <span className="font-mono tabular-nums text-stone-900">
                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="font-mono tabular-nums text-stone-900">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between pt-3 border-t border-stone-300 font-bold text-sm text-stone-950">
                    <span>Total Due</span>
                    <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200/80 text-[11px] text-stone-500 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 shrink-0" />
                <span>Complies with PCI-DSS level 1 security simulation.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

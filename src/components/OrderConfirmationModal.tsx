import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, ArrowRight, Package, Calendar, MapPin, Truck, Copy, Check } from 'lucide-react';
import { Order } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface OrderConfirmationModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (order) {
      // Fire celebratory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C87A5B', '#9A8E7D', '#BFA054', '#2B2724'],
        });
      } catch (err) {
        // Ignore confetti if unsupported
      }
    }
  }, [order]);

  if (!order) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order Confirmation"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[92vh] flex flex-col">
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-stone-100 p-6 sm:p-8 text-center relative">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 stroke-[2]" />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
            Order Confirmed
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-white mt-1">
            Thank you for your order
          </h2>
          <p className="text-xs text-stone-300 mt-2 max-w-md mx-auto">
            We have received your order and are carefully preparing your items at our workshop.
            A confirmation receipt was dispatched to{' '}
            <strong className="text-white">{order.shippingDetails.email}</strong>.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-lg border border-stone-700 text-xs font-mono">
            <span className="text-stone-400">Reference:</span>
            <span className="text-white font-semibold">{order.id}</span>
            <button
              onClick={handleCopyOrderId}
              className="text-stone-400 hover:text-white transition-colors ml-1"
              title="Copy Order ID"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Estimated Schedule & Destination Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block font-mono uppercase text-[10px]">Estimated Delivery</span>
                <span className="font-semibold text-stone-900 text-sm mt-0.5 block">
                  {order.estimatedDelivery}
                </span>
                <span className="text-stone-500 text-[11px]">
                  {order.shippingMethod === 'express' ? 'Priority Courier' : 'Standard Shipping'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-stone-400 block font-mono uppercase text-[10px]">Shipment Destination</span>
                <span className="font-semibold text-stone-900 mt-0.5 block">
                  {order.shippingDetails.firstName} {order.shippingDetails.lastName}
                </span>
                <span className="text-stone-600 block">
                  {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.postalCode}
                </span>
              </div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider font-mono text-stone-500 mb-3">
              Itemized Manifest
            </h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3.5 p-3 rounded-lg border border-stone-200 bg-white"
                >
                  <div className="w-14 h-14 rounded overflow-hidden shrink-0 bg-stone-50 border border-stone-200/60">
                    <ProductCardVisual product={item.product} size="sm" showBadge={false} />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <h5 className="font-semibold text-stone-900 truncate">{item.product.name}</h5>
                    <div className="text-stone-500 text-[11px] mt-0.5">
                      {Object.entries(item.selectedVariants)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(' · ')}
                    </div>
                    <div className="font-mono text-stone-500 text-[11px] mt-0.5">
                      Qty: {item.quantity} × ${item.unitPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-mono font-semibold text-stone-900 text-xs">
                    ${(item.unitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="pt-4 border-t border-stone-200 space-y-1.5 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-stone-900">${order.subtotal.toFixed(2)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount ({order.discountCode || 'Promo'})</span>
                <span className="font-mono tabular-nums">-${order.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-mono tabular-nums text-stone-900">
                {order.shippingFee === 0 ? 'Free' : `$${order.shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span className="font-mono tabular-nums text-stone-900">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-200 font-bold text-sm text-stone-900">
              <span>Total Paid</span>
              <span className="font-mono tabular-nums">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 rounded-lg text-xs font-medium transition-colors flex items-center gap-2"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg text-xs font-medium transition-colors flex items-center gap-2 ml-auto shadow-xs"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

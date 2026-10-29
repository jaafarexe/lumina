import React from 'react';
import { X, Package, Calendar, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Order } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onViewOrder,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order History"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-stone-900" />
            <h3 className="text-base font-serif-title font-semibold text-stone-900">
              Your Past Orders ({orders.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 text-stone-400 hover:text-stone-900 rounded-lg hover:bg-stone-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-stone-300 mx-auto mb-3 stroke-[1.5]" />
              <p className="text-sm font-medium text-stone-700">No placed orders yet</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Any orders you complete through the demo checkout will be preserved here for your review.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-stone-50 transition-colors flex flex-col gap-3"
              >
                <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-200/60">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-stone-900">{order.id}</span>
                    <span className="text-stone-400">·</span>
                    <span className="text-stone-500">{order.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{order.status}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-stone-600">
                    <span>{order.items.length} object{order.items.length !== 1 ? 's' : ''}</span>
                    <span className="mx-1.5">·</span>
                    <span className="font-mono font-semibold text-stone-900">${order.total.toFixed(2)}</span>
                  </div>

                  <button
                    onClick={() => {
                      onViewOrder(order);
                      onClose();
                    }}
                    className="text-xs font-medium text-stone-900 underline hover:text-amber-800 transition-colors flex items-center gap-1"
                  >
                    <span>View Receipt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

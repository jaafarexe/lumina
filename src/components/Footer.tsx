import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Shield, RefreshCw } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenOrderHistory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenOrderHistory,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#211E1C] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-stone-800">
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-2xl font-serif-title font-semibold text-white tracking-tight">
                Lumina
              </span>
              <p className="mt-3 text-xs text-stone-400 max-w-sm leading-relaxed">
                Objects for deliberate living. We work directly with independent ceramicists,
                textile mills, and timber craftsmen to create durable everyday goods that age with grace.
              </p>
            </div>

            <div className="mt-8 text-xs text-stone-500 space-y-1">
              <div>Storefront Atelier & Archive</div>
              <div>Kyoto · Copenhagen · Portland</div>
            </div>
          </div>

          {/* Column 2: Department Navigation */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onSelectCategory('Kitchen & Table')}
                  className="hover:text-white transition-colors"
                >
                  Kitchen & Tableware
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Living & Decor')}
                  className="hover:text-white transition-colors"
                >
                  Living & Home Textiles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Care & Wellness')}
                  className="hover:text-white transition-colors"
                >
                  Apothecary & Aromatics
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Lighting')}
                  className="hover:text-white transition-colors"
                >
                  Atmospheric Lighting
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Stationery & Desk')}
                  className="hover:text-white transition-colors"
                >
                  Desk Tools & Fine Paper
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={onOpenOrderHistory}
                  className="text-stone-300 hover:text-white underline transition-colors"
                >
                  Look Up Past Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Gazette & Dispatch */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-2">
              The Everyday Journal
            </h4>
            <p className="text-xs text-stone-400 mb-4 leading-relaxed">
              Seasonal kiln releases, craftsman interviews, and thoughtful essays on living well.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 p-3 rounded-lg border border-emerald-800/60">
                <Check className="w-4 h-4 shrink-0" />
                <span>You are subscribed to the seasonal dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-900 border border-stone-700 rounded-lg text-white placeholder:text-stone-500 focus:outline-none focus:border-stone-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-3.5 py-2 bg-stone-100 hover:bg-white text-stone-900 rounded-lg text-xs font-medium transition-colors"
                >
                  Join
                </button>
              </form>
            )}

            <div className="mt-6 flex items-center gap-4 text-[11px] text-stone-500">
              <span>Recycled packaging</span>
              <span>·</span>
              <span>Plastic-free shipping</span>
              <span>·</span>
              <span>Fair craft wages</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Lumina Everyday Store. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer">Ethical Sourcing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

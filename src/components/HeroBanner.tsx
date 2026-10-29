import React from 'react';
import { ArrowDown, ShieldCheck, Compass, Sparkles, Feather } from 'lucide-react';
import { Product } from '../types';
import { ProductCardVisual } from './ProductCardVisual';

interface HeroBannerProps {
  featuredProduct: Product;
  onExploreClick: () => void;
  onSelectProduct: (p: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredProduct,
  onExploreClick,
  onSelectProduct,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFEA] to-[#FAF8F5] border-b border-stone-200/70 pt-8 pb-14 md:pt-14 md:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Value Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Category Kicker (Quiet Unboxed Text with Separator) */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-stone-500 mb-4">
              <span>Autumn 2026 Collection</span>
              <span aria-hidden="true">·</span>
              <span>Independent Craft Studios</span>
            </div>

            {/* Display Headline with balanced text-wrap */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-medium text-stone-900 leading-[1.15] tracking-tight mb-6 text-balance">
              Thoughtful essentials for everyday ritual.
            </h1>

            {/* Prose description */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl mb-8">
              Lumina curates objects that bring stillness and tactile beauty to daily life.
              Crafted by independent artisans using honest stoneware, stone-washed European flax,
              and wild Japanese hinoki timber.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Explore Catalog</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectProduct(featuredProduct)}
                className="px-6 py-3.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <span>View Featured Piece</span>
                <span className="text-xs font-mono text-stone-500">${featuredProduct.price.toFixed(2)}</span>
              </button>
            </div>

            {/* Proof & Craft Adjacency Strip */}
            <div className="pt-6 border-t border-stone-200/80 grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-stone-900">Direct Provenance</span>
                <span className="text-xs text-stone-500 mt-0.5">Sourced from 18 artisan kilns & mills</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-stone-900">Natural Materials</span>
                <span className="text-xs text-stone-500 mt-0.5">Zero synthetic plastics or resins</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-stone-900">Carbon Neutral</span>
                <span className="text-xs text-stone-500 mt-0.5">100% offset recycled shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Feature Card */}
          <div className="lg:col-span-5">
            <div
              onClick={() => onSelectProduct(featuredProduct)}
              className="group cursor-pointer bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Product Visual Container */}
              <div className="relative">
                <ProductCardVisual
                  product={featuredProduct}
                  size="hero"
                  className="rounded-t-2xl"
                  showBadge={false}
                />
                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-xs font-medium px-3 py-1 rounded">
                  Featured Spotlight
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>{featuredProduct.category}</span>
                  <span className="font-mono">{featuredProduct.origin}</span>
                </div>
                <h3 className="text-lg font-serif-title font-semibold text-stone-900 group-hover:text-amber-800 transition-colors">
                  {featuredProduct.name}
                </h3>
                <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                  {featuredProduct.tagline}
                </p>

                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-semibold font-mono tabular-nums text-stone-900">
                      ${featuredProduct.price.toFixed(2)}
                    </span>
                    {featuredProduct.originalPrice && (
                      <span className="text-xs font-mono tabular-nums text-stone-400 line-through">
                        ${featuredProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <span className="text-xs font-medium text-stone-700 underline group-hover:text-stone-950 transition-colors">
                    Inspect specifications →
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

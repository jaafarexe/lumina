import React from 'react';
import { Product } from '../types';

interface ProductCardVisualProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
  showBadge?: boolean;
}

export const ProductCardVisual: React.FC<ProductCardVisualProps> = ({
  product,
  size = 'md',
  className = '',
  showBadge = true,
}) => {
  const { icon, background, accent, materialLook } = product.visualTheme;

  const renderIconGraphic = () => {
    switch (icon) {
      case 'mug':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor">
            {/* Pedestal Shadow */}
            <ellipse cx="60" cy="102" rx="34" ry="7" fill="rgba(0,0,0,0.06)" stroke="none" />
            {/* Mug Body */}
            <path d="M40 38 L43 92 C43 96 48 99 60 99 C72 99 77 96 77 92 L80 38 Z" fill="#DDD5C7" stroke="#7A6F60" strokeWidth="2.5" />
            {/* Inner rim */}
            <ellipse cx="60" cy="38" rx="20" ry="5.5" fill="#C5BBAA" stroke="#7A6F60" strokeWidth="2.5" />
            <ellipse cx="60" cy="38" rx="17" ry="4" fill="#9F9380" stroke="none" />
            {/* Hasami stackable stepped foot */}
            <path d="M45 92 L45 96 C45 97.5 49 99 60 99 C71 99 75 97.5 75 96 L75 92" stroke="#7A6F60" strokeWidth="2" fill="none" />
            {/* Subtle tactile speckled glaze marks */}
            <circle cx="52" cy="55" r="1" fill="#7A6F60" opacity="0.6" />
            <circle cx="68" cy="62" r="1.2" fill="#7A6F60" opacity="0.5" />
            <circle cx="58" cy="74" r="0.9" fill="#7A6F60" opacity="0.7" />
            <circle cx="64" cy="85" r="1.1" fill="#7A6F60" opacity="0.4" />
            {/* Delicate steam line */}
            <path d="M57 28 Q55 22 58 16" stroke="#9F9380" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" strokeDasharray="3 3" />
            <path d="M63 26 Q66 20 63 14" stroke="#9F9380" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" strokeDasharray="3 3" />
          </svg>
        );

      case 'teapot':
        return (
          <svg viewBox="0 0 140 120" className="w-32 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none" stroke="currentColor">
            <ellipse cx="70" cy="102" rx="38" ry="7" fill="rgba(0,0,0,0.06)" stroke="none" />
            {/* Glass Globe Body */}
            <circle cx="70" cy="66" r="32" fill="#E8F1F2" fillOpacity="0.4" stroke="#8A9BA8" strokeWidth="2.5" />
            {/* Tea Infusion Glow inside */}
            <circle cx="70" cy="70" r="22" fill="#C29254" fillOpacity="0.35" stroke="none" />
            {/* Spout */}
            <path d="M42 60 C32 58 26 44 24 38 C28 38 38 46 44 52" fill="#E8F1F2" fillOpacity="0.5" stroke="#8A9BA8" strokeWidth="2" strokeLinejoin="round" />
            {/* Brass Lid & Finial */}
            <rect x="58" y="31" width="24" height="6" rx="2" fill="#D4AF37" stroke="#A6821E" strokeWidth="2" />
            <circle cx="70" cy="28" r="3" fill="#D4AF37" stroke="#A6821E" strokeWidth="1.5" />
            {/* Arching Handle */}
            <path d="M98 56 C114 56 114 78 98 80" stroke="#8A9BA8" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'board':
        return (
          <svg viewBox="0 0 130 110" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="65" cy="95" rx="46" ry="8" fill="rgba(0,0,0,0.07)" />
            {/* Hinoki Board Slab (Perspective) */}
            <path d="M26 35 L104 35 L114 85 L16 85 Z" fill="#EADCC7" stroke="#9A8264" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Side Thickness */}
            <path d="M16 85 L114 85 L114 93 L16 93 Z" fill="#CDBEA5" stroke="#9A8264" strokeWidth="2" strokeLinejoin="round" />
            {/* Wood Grain Lines */}
            <path d="M34 45 Q70 47 100 45" stroke="#BAA587" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            <path d="M28 58 Q70 60 106 58" stroke="#BAA587" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M22 72 Q68 74 110 72" stroke="#BAA587" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            {/* Hanging Hole */}
            <circle cx="98" cy="48" r="4.5" fill="#B39E80" stroke="#9A8264" strokeWidth="1.5" />
          </svg>
        );

      case 'blanket':
        return (
          <svg viewBox="0 0 130 110" className="w-32 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="65" cy="98" rx="42" ry="7" fill="rgba(0,0,0,0.06)" />
            {/* Folded Layer 1 */}
            <rect x="25" y="70" width="80" height="20" rx="4" fill="#DDD2C4" stroke="#8E7E6D" strokeWidth="2" />
            {/* Folded Layer 2 */}
            <rect x="28" y="52" width="74" height="20" rx="4" fill="#E7DDD0" stroke="#8E7E6D" strokeWidth="2" />
            {/* Top Fold Layer 3 */}
            <rect x="32" y="34" width="66" height="20" rx="4" fill="#F0E8DD" stroke="#8E7E6D" strokeWidth="2" />
            {/* Waffle Weave Texture on Top */}
            <line x1="42" y1="36" x2="42" y2="52" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="52" y1="36" x2="52" y2="52" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="62" y1="36" x2="62" y2="52" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="72" y1="36" x2="72" y2="52" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="82" y1="36" x2="82" y2="52" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="34" y1="42" x2="96" y2="42" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="34" y1="48" x2="96" y2="48" stroke="#A99B8B" strokeWidth="1" strokeDasharray="2 2" />
            {/* Delicate Fringes */}
            <path d="M98 74 L105 74 M98 77 L106 77 M98 80 L104 80 M98 83 L106 83 M98 86 L105 86" stroke="#9A8A79" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'cushion':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="100" rx="38" ry="7" fill="rgba(0,0,0,0.06)" />
            {/* Plump Round/Square Cushion */}
            <path d="M26 64 C24 45 42 36 60 36 C78 36 96 45 94 64 C96 83 78 92 60 92 C42 92 24 83 26 64 Z" fill="#E8DECة" stroke="#877464" strokeWidth="2.5" />
            {/* Center Tuft / Button */}
            <circle cx="60" cy="64" r="3.5" fill="#756253" />
            {/* Radial Tuft Creases */}
            <path d="M57 62 Q45 52 38 48" stroke="#988473" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M63 62 Q75 52 82 48" stroke="#988473" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M57 66 Q45 76 38 80" stroke="#988473" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M63 66 Q75 76 82 80" stroke="#988473" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'vase':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="103" rx="30" ry="6" fill="rgba(0,0,0,0.06)" />
            {/* Sculptural Ceramic Vase Body */}
            <path d="M52 28 C45 36 32 50 32 72 C32 94 44 98 60 98 C76 98 88 94 88 72 C88 50 75 36 68 28 Z" fill="#DDD1C1" stroke="#7A6856" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Lip */}
            <ellipse cx="60" cy="28" rx="8" ry="3" fill="#BFAF9B" stroke="#7A6856" strokeWidth="2" />
            {/* Dried Olive Branch Silhouette emerging */}
            <path d="M60 27 Q55 12 48 6" stroke="#68735A" strokeWidth="1.8" strokeLinecap="round" />
            <ellipse cx="49" cy="9" rx="3.5" ry="1.8" transform="rotate(-30 49 9)" fill="#788667" stroke="none" />
            <ellipse cx="56" cy="16" rx="3.5" ry="1.8" transform="rotate(25 56 16)" fill="#788667" stroke="none" />
          </svg>
        );

      case 'lamp':
        return (
          <svg viewBox="0 0 130 120" className="w-32 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            {/* Warm light ambient halo */}
            <ellipse cx="65" cy="85" rx="46" ry="16" fill="#FDF3CF" fillOpacity="0.45" />
            <ellipse cx="65" cy="104" rx="26" ry="5" fill="rgba(0,0,0,0.08)" />
            {/* Base */}
            <rect x="52" y="96" width="26" height="8" rx="3" fill="#D4AF37" stroke="#9A7B1C" strokeWidth="2" />
            {/* Stem */}
            <rect x="63" y="52" width="4" height="44" rx="1.5" fill="#4B3A2C" />
            {/* Spun Brass Dome Shade */}
            <path d="M36 54 C36 32 50 24 65 24 C80 24 94 32 94 54 Z" fill="#E5C158" stroke="#9A7B1C" strokeWidth="2.5" />
            {/* Shade Lower Rim */}
            <ellipse cx="65" cy="54" rx="29" ry="5.5" fill="#F5DC88" stroke="#9A7B1C" strokeWidth="2" />
            {/* Warm Glow Aperture under shade */}
            <ellipse cx="65" cy="56" rx="16" ry="3.5" fill="#FFF9E0" />
            <circle cx="65" cy="22" r="3" fill="#D4AF37" stroke="#9A7B1C" strokeWidth="1.5" />
          </svg>
        );

      case 'pendant':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            {/* Hanging Cord */}
            <line x1="60" y1="4" x2="60" y2="40" stroke="#7A6856" strokeWidth="2.5" />
            <rect x="56" y="36" width="8" height="6" rx="1.5" fill="#D4AF37" stroke="#9A7B1C" strokeWidth="1.5" />
            {/* Pleated Shade with Origami facets */}
            <path d="M30 76 L44 42 L76 42 L90 76 Z" fill="#EFE8DE" stroke="#877562" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Pleat Fold Lines */}
            <line x1="44" y1="42" x2="38" y2="76" stroke="#B8A793" strokeWidth="1.5" />
            <line x1="52" y1="42" x2="48" y2="76" stroke="#877562" strokeWidth="1.5" />
            <line x1="60" y1="42" x2="60" y2="76" stroke="#B8A793" strokeWidth="1.5" />
            <line x1="68" y1="42" x2="72" y2="76" stroke="#877562" strokeWidth="1.5" />
            <line x1="76" y1="42" x2="82" y2="76" stroke="#B8A793" strokeWidth="1.5" />
            {/* Scalloped pleated lower edge */}
            <path d="M30 76 Q34 78 38 76 Q43 78 48 76 Q54 78 60 76 Q66 78 72 76 Q77 78 82 76 Q86 78 90 76" stroke="#877562" strokeWidth="2" fill="none" />
            {/* Ambient downward light cone */}
            <polygon points="32,78 88,78 106,110 14,110" fill="#FFF8E7" fillOpacity="0.4" />
          </svg>
        );

      case 'diffuser':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="104" rx="26" ry="6" fill="rgba(0,0,0,0.07)" />
            {/* Rattan Reeds Fan out from neck */}
            <line x1="60" y1="62" x2="40" y2="12" stroke="#8A7662" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="62" x2="52" y2="10" stroke="#8A7662" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="62" x2="65" y2="8" stroke="#8A7662" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="62" x2="75" y2="14" stroke="#8A7662" strokeWidth="2" strokeLinecap="round" />
            <line x1="60" y1="62" x2="84" y2="20" stroke="#8A7662" strokeWidth="2" strokeLinecap="round" />
            {/* Heavy Amber Glass Bottle */}
            <rect x="42" y="62" width="36" height="40" rx="6" fill="#B8652D" stroke="#683411" strokeWidth="2.5" />
            {/* Bottle Neck */}
            <rect x="54" y="52" width="12" height="10" rx="1.5" fill="#8C491B" stroke="#683411" strokeWidth="2" />
            {/* Lip Ring */}
            <rect x="52" y="50" width="16" height="4" rx="1" fill="#683411" />
            {/* Minimal Apothecary Paper Label */}
            <rect x="47" y="70" width="26" height="24" rx="2" fill="#FAF6EE" stroke="#A99682" strokeWidth="1" />
            <line x1="51" y1="76" x2="69" y2="76" stroke="#4A3B2C" strokeWidth="1.5" />
            <line x1="53" y1="81" x2="67" y2="81" stroke="#8A7662" strokeWidth="1" />
            <line x1="55" y1="86" x2="65" y2="86" stroke="#8A7662" strokeWidth="1" />
          </svg>
        );

      case 'candle':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="102" rx="28" ry="6" fill="rgba(0,0,0,0.06)" />
            {/* Warm Candle flame glow */}
            <circle cx="60" cy="38" r="14" fill="#FCE8B3" fillOpacity="0.5" />
            {/* Flame */}
            <path d="M60 28 C64 36 65 42 60 46 C55 42 56 36 60 28 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
            <circle cx="60" cy="42" r="2.5" fill="#FEF3C7" />
            {/* Wooden Wick */}
            <rect x="58.5" y="46" width="3" height="7" fill="#45270C" />
            {/* Ceramic Jar */}
            <rect x="36" y="52" width="48" height="48" rx="7" fill="#DDD4C4" stroke="#7A6C58" strokeWidth="2.5" />
            {/* Wax surface dip */}
            <ellipse cx="60" cy="53" rx="23" ry="5" fill="#F4E9D5" stroke="#7A6C58" strokeWidth="1.5" />
            {/* Subtle speckled body texture */}
            <circle cx="48" cy="72" r="1" fill="#7A6C58" opacity="0.6" />
            <circle cx="72" cy="80" r="1.2" fill="#7A6C58" opacity="0.5" />
            <circle cx="58" cy="88" r="0.9" fill="#7A6C58" opacity="0.7" />
          </svg>
        );

      case 'bottle':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="104" rx="24" ry="5.5" fill="rgba(0,0,0,0.06)" />
            {/* Metal Squeeze Tube Body */}
            <path d="M48 24 L72 24 L76 86 C76 94 70 98 60 98 C50 98 44 94 44 86 Z" fill="#D3DAD6" stroke="#5F6D66" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Crimped Top */}
            <rect x="46" y="20" width="28" height="6" rx="1.5" fill="#95A39D" stroke="#5F6D66" strokeWidth="1.5" />
            {/* Black Hex Cap at bottom (or top) */}
            <rect x="54" y="98" width="12" height="6" rx="2" fill="#292524" />
            {/* Typography on tube */}
            <line x1="52" y1="42" x2="68" y2="42" stroke="#48534E" strokeWidth="2" strokeLinecap="round" />
            <line x1="52" y1="48" x2="66" y2="48" stroke="#7E8E87" strokeWidth="1" strokeLinecap="round" />
            <line x1="52" y1="53" x2="64" y2="53" stroke="#7E8E87" strokeWidth="1" strokeLinecap="round" />
            {/* Botanical Leaf Mark */}
            <path d="M60 66 Q67 60 67 72 Q60 76 60 66 Z" fill="#687F6F" stroke="#48534E" strokeWidth="1" />
          </svg>
        );

      case 'tray':
        return (
          <svg viewBox="0 0 130 110" className="w-32 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="65" cy="95" rx="44" ry="8" fill="rgba(0,0,0,0.07)" />
            {/* Walnut Valet Tray */}
            <path d="M22 42 L108 42 L116 86 L14 86 Z" fill="#6B4B35" stroke="#3D271A" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Inner Hollowed Cavity 1 (Left - Pens) */}
            <path d="M25 50 L58 50 L56 80 L20 80 Z" fill="#543825" stroke="#3D271A" strokeWidth="1.5" />
            {/* Inner Hollowed Cavity 2 (Right - Sundries) */}
            <path d="M64 50 L105 50 L110 80 L62 80 Z" fill="#543825" stroke="#3D271A" strokeWidth="1.5" />
            {/* Brass Pen Resting in Cavity */}
            <line x1="28" y1="74" x2="52" y2="56" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" />
            {/* Walnut Grain Subtle Flow */}
            <path d="M30 45 Q65 47 100 45" stroke="#856046" strokeWidth="1" opacity="0.6" />
          </svg>
        );

      case 'pen':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="102" rx="32" ry="6" fill="rgba(0,0,0,0.06)" />
            {/* Brass Desktop Stand (Cylinder) */}
            <ellipse cx="60" cy="86" rx="20" ry="7" fill="#CDB052" stroke="#8E711E" strokeWidth="2" />
            <path d="M40 86 L40 96 C40 100 49 103 60 103 C71 103 80 100 80 96 L80 86" fill="#A88B32" stroke="#8E711E" strokeWidth="2" />
            {/* Slanted Rollerball Pen */}
            <path d="M57 90 L82 22 L88 24 L63 92 Z" fill="#E5C765" stroke="#8E711E" strokeWidth="2" />
            <polygon points="82,22 86,14 88,24" fill="#292524" stroke="#8E711E" strokeWidth="1.5" />
            {/* Pen Clip */}
            <line x1="84" y1="28" x2="80" y2="44" stroke="#8E711E" strokeWidth="2.5" strokeLinecap="round" />
            {/* Metallic Highlight line */}
            <line x1="60" y1="84" x2="83" y2="25" stroke="#FFF7D1" strokeWidth="1.2" />
          </svg>
        );

      case 'notebook':
        return (
          <svg viewBox="0 0 120 120" className="w-28 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="60" cy="98" rx="36" ry="6" fill="rgba(0,0,0,0.06)" />
            {/* Hardcover Notebook Spine & Cover */}
            <rect x="34" y="30" width="56" height="66" rx="4" fill="#C9BCAF" stroke="#6B5B4E" strokeWidth="2.5" />
            {/* Spine Wrap */}
            <path d="M34 30 L44 30 L44 96 L34 96 Z" fill="#8C7968" stroke="#6B5B4E" strokeWidth="1.5" />
            {/* Gilt / Blind Debossed Title Panel */}
            <rect x="52" y="46" width="28" height="18" rx="2" fill="#FAF6F0" stroke="#8C7968" strokeWidth="1" />
            <line x1="56" y1="52" x2="76" y2="52" stroke="#6B5B4E" strokeWidth="1.5" />
            <line x1="58" y1="58" x2="74" y2="58" stroke="#A69483" strokeWidth="1" />
            {/* Silk Ribbon Bookmark hanging out */}
            <path d="M62 96 C62 104 68 108 64 114" stroke="#9A382A" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        );

      case 'plate':
      default:
        return (
          <svg viewBox="0 0 130 110" className="w-32 h-28 drop-shadow-md text-stone-700/80 transition-transform duration-500 group-hover:scale-105" fill="none">
            <ellipse cx="65" cy="85" rx="46" ry="16" fill="rgba(0,0,0,0.07)" />
            {/* Ceramic Plate Rim */}
            <ellipse cx="65" cy="62" rx="46" ry="18" fill="#DDD3C5" stroke="#7A6856" strokeWidth="2.5" />
            {/* Inner Recessed Well */}
            <ellipse cx="65" cy="63" rx="32" ry="11" fill="#EAE2D7" stroke="#9E8D7B" strokeWidth="1.5" />
            {/* Speckled Clay Texture */}
            <circle cx="56" cy="60" r="1.1" fill="#7A6856" opacity="0.6" />
            <circle cx="74" cy="66" r="1" fill="#7A6856" opacity="0.5" />
            <circle cx="62" cy="68" r="0.9" fill="#7A6856" opacity="0.7" />
          </svg>
        );
    }
  };

  const containerHeight = size === 'lg' ? 'h-72' : size === 'sm' ? 'h-36' : size === 'hero' ? 'h-96' : 'h-56';

  return (
    <div
      className={`group relative overflow-hidden rounded-t-xl bg-gradient-to-b ${background} ${containerHeight} ${className} flex items-center justify-center p-6 border-b border-stone-200/60 select-none`}
    >
      {/* Subtle Studio Pedestal Horizon */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-stone-900/[0.02] border-t border-stone-900/[0.04]" />

      {/* Gentle Radial Lighting Ambient Overlay */}
      <div className="absolute inset-0 bg-radial from-white/40 via-transparent to-black/[0.03] pointer-events-none" />

      {/* Origin / Material Watermark in Top Right */}
      <div className="absolute top-3 right-3 text-[10px] font-mono tracking-wider uppercase text-stone-500/80 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded border border-stone-300/40">
        {materialLook}
      </div>

      {/* Badges strictly using unboxed or subtle editorial tags */}
      {showBadge && product.badge && (
        <div className="absolute top-3 left-3 text-[11px] font-medium tracking-wide text-stone-800 bg-stone-100/90 backdrop-blur-xs px-2.5 py-0.5 rounded border border-stone-300/60 shadow-xs">
          {product.badge}
        </div>
      )}

      {/* Graphic Product Visual */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {renderIconGraphic()}
      </div>

      {/* Subtle Bottom Accent Strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 transition-opacity duration-300 group-hover:opacity-100"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
};

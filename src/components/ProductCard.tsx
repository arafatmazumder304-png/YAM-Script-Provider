import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Star, ShoppingCart, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    settings, 
    setActiveProductDetail, 
    setCheckoutItem, 
    addToCart, 
    cart 
  } = useStore();

  const discountPercentage = Math.round(
    ((product.regularPrice - product.discountedPrice) / product.regularPrice) * 100
  );

  const isInCart = cart.some(item => item.product.id === product.id);

  return (
    <div className="group relative flex flex-col bg-slate-900/90 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 hover:shadow-xl hover:shadow-blue-950/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      
      {/* Product Thumbnail Container */}
      <div 
        onClick={() => setActiveProductDetail(product)}
        className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer"
      >
        <img
          src={product.thumbnailUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Subtle Gradient Over Thumbnail */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Discount Tag (Top Left - sleek text tag, not pill sandwich) */}
        {discountPercentage > 0 && (
          <div className="absolute top-2.5 left-2.5 bg-rose-600/90 backdrop-blur-xs text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-md font-mono tracking-wide shadow-xs">
            -{discountPercentage}%
          </div>
        )}

        {/* Version Kicker (Top Right) */}
        <div className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-xs text-slate-300 text-[10px] sm:text-xs font-mono font-medium px-2 py-0.5 rounded-md border border-slate-800">
          v{product.version}
        </div>

        {/* Quick View Button on Hover */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setActiveProductDetail(product);
          }}
          className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-slate-700 shadow-lg hover:scale-110 active:scale-95"
          title="Quick View Details"
        >
          <Eye className="w-5 h-5 text-blue-400" />
        </button>
      </div>

      {/* Product Body Information */}
      <div className="flex-1 p-3 sm:p-4 md:p-5 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-400 mb-1.5 truncate">
            <span className="text-cyan-400 font-medium truncate">{product.category}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-0.5 text-amber-400 font-semibold font-mono shrink-0">
              <Star className="w-3 h-3 fill-amber-400 stroke-none" />
              <span>{product.rating}</span>
              <span className="text-slate-500 text-[10px] font-normal">({product.reviewsCount})</span>
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => setActiveProductDetail(product)}
            className="text-xs sm:text-sm md:text-base font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug mb-1.5"
          >
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 sm:pt-3 border-t border-slate-800/80">
          {/* Price baseline */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-mono text-sm sm:text-base md:text-lg font-extrabold text-white tabular-nums tracking-tight">
              {settings.currencySymbol}{product.discountedPrice.toLocaleString()}
            </span>
            {product.regularPrice > product.discountedPrice && (
              <span className="font-mono text-xs sm:text-xs text-slate-500 line-through tabular-nums">
                {settings.currencySymbol}{product.regularPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Dual Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveProductDetail(product)}
              className="w-full py-2 px-2 text-[11px] sm:text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700/80 rounded-xl transition-colors text-center truncate flex items-center justify-center gap-1"
            >
              <Eye className="w-3.5 h-3.5 hidden sm:inline-block text-slate-400" />
              <span>Details</span>
            </button>

            <button
              type="button"
              onClick={() => setCheckoutItem(product)}
              className="w-full py-2 px-2 text-[11px] sm:text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md shadow-blue-600/20 text-center truncate flex items-center justify-center gap-1 active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Purchase</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

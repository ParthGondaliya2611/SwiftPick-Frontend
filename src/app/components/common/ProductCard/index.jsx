import StarRatings from "react-star-ratings";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="animate-fade-in-up">
      <Link to={`/product-detail/${product._id}`}>
        <div className="group relative glass-card max-w-sm mx-auto overflow-hidden rounded-2xl p-4 flex flex-col h-full h-[450px]">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-xl bg-slate-900/50 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center p-4 h-56">
            <img
              alt={product.name}
              src={product.thumbnail[0] || ""}
              className="h-full w-full object-contain object-center transition-all duration-300 group-hover:brightness-110"
            />
          </div>
          <div className="flex flex-col flex-grow py-4 gap-2">
            <div>
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors truncate">
                  {product.name || ""}
                </h3>
              </div>
              <p className="text-slate-400 text-sm line-clamp-2 mt-1 h-10">
                {product.description}
              </p>
            </div>
            
            <div className="flex items-center gap-1 mt-2">
              <StarRatings
                rating={product.rating}
                starDimension="16px"
                starRatedColor="#fbbf24"
                starEmptyColor="#475569"
                starSpacing="2px"
              />
              <span className="text-xs text-slate-500 ml-1">({product.rating})</span>
            </div>

            <div className="mt-auto flex justify-between items-end">
              <div className="flex flex-col">
                <p className="text-2xl font-black text-white">
                  {`$${product.pricediscount || product.price || ""}`}
                </p>
                {product.pricediscount && product.pricediscount !== product.price && (
                  <p className="text-sm font-medium line-through text-slate-500">
                    {`$${product.price || ""}`}
                  </p>
                )}
              </div>
              
              <div className="text-indigo-400 border border-indigo-400/30 bg-indigo-500/10 font-semibold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider mb-1">
                {product.category}
              </div>
            </div>
          </div>
          
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

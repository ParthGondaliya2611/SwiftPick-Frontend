import React from "react";

const ProductCardLoader = () => {
  return (
    <div className="glass-panel rounded-[2.5rem] p-6 border border-white/5 bg-white/[0.02] animate-pulse h-full flex flex-col gap-6">
      {/* Image Skeleton */}
      <div className="aspect-square w-full bg-white/5 rounded-3xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded-full w-3/4" />
          <div className="h-3 bg-white/5 rounded-full w-1/2" />
        </div>
        
        <div className="flex justify-between items-end pt-2">
          <div className="space-y-2">
            <div className="h-6 bg-white/10 rounded-lg w-16" />
            <div className="h-3 bg-white/5 rounded-full w-10" />
          </div>
          <div className="h-10 w-10 bg-indigo-500/20 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardLoader;

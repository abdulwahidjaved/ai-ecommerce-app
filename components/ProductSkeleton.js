'use client';

export default function ProductSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="bg-gray-200 h-48 flex items-center justify-center" />

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title Skeleton */}
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2" />

        {/* Price Skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />

        {/* Category Skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/4 mb-4" />

        {/* Buttons Skeleton */}
        <div className="flex gap-2 mt-auto">
          <div className="flex-1 h-10 bg-gray-200 rounded" />
          <div className="flex-1 h-10 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

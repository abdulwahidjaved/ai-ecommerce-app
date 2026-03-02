'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// Reusable ProductCard component for both listing and related products
export default function ProductCardDetail({ product }) {
  const { addToCart, cartItems } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    const existingItem = cartItems.find(item => item._id === product._id);

    // Check if at max quantity
    if (existingItem && existingItem.quantity >= 99) {
      toast.error('Maximum quantity (99) reached for this item');
      return;
    }

    addToCart(product);
    setIsAdded(true);
    toast.success(`${product.name} added to cart`);

    // Reset the "added" state after 2 seconds
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      {/* Product Image Placeholder */}
      <div className="bg-gray-100 h-48 flex items-center justify-center text-5xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
        {product.image}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900">
            <p>${product?.price?.toFixed(2)}</p>
          </span>
          {product.discount && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Category (if available) */}
        {product.category && (
          <p className="text-xs text-gray-500 mb-4">{product.category}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/products/${product._id}`}
            className="flex-1 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-3 py-2 rounded text-sm font-semibold transition-all duration-150 text-center"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`flex-1 text-white px-3 py-2 rounded text-sm font-semibold transition-all duration-150 active:scale-95 disabled:cursor-default ${isAdded
              ? 'bg-green-600'
              : 'bg-green-500 hover:bg-green-600'
              }`}
          >
            {isAdded ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

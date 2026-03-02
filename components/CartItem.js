'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

// Reusable CartItem component to display each item in the cart
export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart();
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDecrease = () => {
    if (item.quantity === 1) {
      handleRemove();
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (item.quantity >= 99) {
      toast.error('Maximum quantity is 99 items per product');
      return;
    }
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '') return;
    
    const qty = parseInt(value, 10);
    if (isNaN(qty)) return;
    
    if (qty < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }
    if (qty > 99) {
      toast.error('Maximum quantity is 99 items per product');
      return;
    }
    
    updateQuantity(item.id, qty);
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
      toast.success(`${item.name} removed from cart`);
    }, 150);
  };

  return (
    <div className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
      isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-3xl shrink-0">
        {item.image}
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm mt-1">Price: ${item.price.toFixed(2)}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-2">
        <button
          onClick={handleDecrease}
          className="w-8 h-8 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-200 rounded transition"
          aria-label="Decrease quantity"
          disabled={isRemoving}
        >
          −
        </button>
        <input
          type="number"
          min="1"
          max="99"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-12 px-2 py-1 text-center font-semibold text-gray-800 border-0 focus:ring-2 focus:ring-blue-500 rounded"
          aria-label="Item quantity"
          disabled={isRemoving}
        />
        <button
          onClick={handleIncrease}
          className="w-8 h-8 flex items-center justify-center font-semibold text-gray-600 hover:bg-gray-200 rounded transition"
          aria-label="Increase quantity"
          disabled={isRemoving || item.quantity >= 99}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right">
        <p className="text-sm text-gray-600">Subtotal</p>
        <p className="text-xl font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={`Remove ${item.name} from cart`}
        disabled={isRemoving}
      >
        {isRemoving ? 'Removing...' : 'Remove'}
      </button>
    </div>
  );
}

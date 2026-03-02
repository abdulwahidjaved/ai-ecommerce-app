'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Protect route - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to view your cart');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty. Please add items before checkout.');
      return;
    }
    router.push('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart? This action cannot be undone.')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const subtotal = getTotalPrice();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Title and Actions */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Cart</h1>
            <p className="text-gray-600 mt-2">
              You have {cartItems.length} item(s) in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 active:scale-95 text-white rounded-lg font-semibold transition-all duration-150 whitespace-nowrap"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Cart Content */}
        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              Start shopping to add items to your cart
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // Cart with Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Table Header - Hidden on Mobile */}
                <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-4 font-bold text-gray-900 border-b border-gray-200">
                  <div className="col-span-2">Image</div>
                  <div className="col-span-3">Product</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Quantity</div>
                  <div className="col-span-2">Subtotal</div>
                  <div className="col-span-1">Action</div>
                </div>

                {/* Cart Items */}
                <div>
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-6">
                <Link
                  href="/products"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary - Sidebar on Desktop, Below on Mobile */}
            <div className="lg:col-span-1">
              <OrderSummary
                subtotal={subtotal}
                gstRate={5}
                showButton={true}
                buttonText="Proceed to Checkout"
                onButtonClick={handleProceedToCheckout}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

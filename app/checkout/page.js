'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const { cartItems, getTotalPrice, clearCart } = useCart();

  // Protect route - redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Check if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Add items to your cart before proceeding to checkout
            </p>
            <button
              onClick={() => router.push('/products')}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Back to Products
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const subtotal = getTotalPrice();

  // Handle form submission
  const handleCheckoutSubmit = (formData) => {
    try {
      // Create order from cart and checkout data
      const subtotal = getTotalPrice();
      const tax = subtotal * 0.05; // 5% tax
      const shipping = subtotal > 100 ? 0 : 10;
      const total = subtotal + tax + shipping;

      const pendingOrder = {
        id: `ORDER-${Date.now()}`,
        userId: user?.id,
        items: cartItems,
        subtotal,
        tax,
        shipping,
        total,
        shippingAddress: formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      // Save pending order to sessionStorage (NOT localStorage yet)
      // This will be moved to localStorage after successful payment
      sessionStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));

      toast.success('Proceeding to payment...');

      // Navigate to payment page
      router.push('/payment');
    } catch (error) {
      toast.error(error.message || 'Failed to proceed to payment');
      console.error('[v0] Checkout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Checkout
          </h1>
          <p className="text-gray-600 mt-2">
            Step 2 of 3: Enter your delivery details
          </p>
        </div>

        {/* Checkout Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form - 2 columns on desktop */}
          <div className="lg:col-span-2">
            <CheckoutForm onSubmit={handleCheckoutSubmit} />
          </div>

          {/* Order Summary - 1 column on desktop */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              gstRate={5}
              showButton={false}
            />

            {/* Cart Items Summary */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Items in Cart
              </h3>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

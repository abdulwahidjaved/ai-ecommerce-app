'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  const { clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('orderData');

    if (data) {
      const parsedData = JSON.parse(data);
      setOrderData(parsedData);

      // Clear cart after successful order
      clearCart();

      // Clean up storage AFTER setting state
      sessionStorage.removeItem('checkoutData');
      sessionStorage.removeItem('orderData');
    }
  }, [clearCart]);

  // Loading state
  if (!orderData) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4">⏳</div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const gstAmount = orderData.gstAmount ?? 0;
  const total = orderData.total ?? 0;
  const subtotal = orderData.subtotal ?? 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-8">
        
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600">
            Thank you for your purchase. Your order is on its way!
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white border-2 border-green-500 rounded-lg p-8 mb-8">
          
          {/* Order Header */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-600">Order Number</p>
                <p className="text-2xl font-bold text-gray-900">
                  #{Math.random().toString(36).substring(2, 9).toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {orderData.orderDate}
                </p>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
            <div>
              <h3 className="font-bold text-gray-900 mb-3">Delivery Address</h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold">{orderData.fullName}</p>
                <p>{orderData.address}</p>
                <p>{orderData.city}, {orderData.pincode}</p>
                <p className="text-sm">Phone: {orderData.phone}</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Contact Details</h3>
              <div className="text-gray-700 space-y-1">
                <p>Email: {orderData.email}</p>
                <p>Phone: {orderData.phone}</p>
              </div>
            </div>
          </div>

          {/* Items Ordered */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Items Ordered</h3>

            <div className="space-y-3">
              {orderData.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{item.image}</div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-bold text-gray-900">
                    ₹{((item.price * item.quantity) ?? 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-700">
              <span>GST (5%)</span>
              <span className="font-semibold">
                ₹{gstAmount.toFixed(2)}
              </span>
            </div>

            <div className="border-t border-gray-300 pt-3 flex justify-between text-xl font-bold text-gray-900">
              <span>Total Amount</span>
              <span>
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-gray-900 mb-3">What Next?</h3>
          <ul className="text-gray-700 space-y-2">
            <li>
              ✓ Confirmation email sent to <strong>{orderData.email}</strong>
            </li>
            <li>✓ Delivery within 3-5 business days</li>
            <li>✓ Tracking link via SMS & email</li>
            <li>✓ Contact support if needed</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition text-center"
          >
            Back to Home
          </Link>

          <Link
            href="/products"
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
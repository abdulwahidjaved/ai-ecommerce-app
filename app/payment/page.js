'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import OrderSummary from '@/components/OrderSummary';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PaymentPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { getTotalPrice, cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);
  const [upiId, setUpiId] = useState('');
  const { user } = useAuth();
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  // Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to complete payment');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Load pending order from sessionStorage
  useEffect(() => {
    const storedOrder = sessionStorage.getItem('pendingOrder');
    if (!storedOrder) {
      toast.error('No pending order found. Please start checkout again.');
      router.push('/cart');
      return;
    }

    try {
      const order = JSON.parse(storedOrder);
      setPendingOrder(order);
    } catch (error) {
      console.error('[v0] Failed to parse pending order:', error);
      toast.error('Invalid order data');
      router.push('/cart');
    }
  }, [router]);

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!pendingOrder) return;

    try {
      setIsProcessing(true);

      const res = await fetch("http://localhost:5000/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: pendingOrder.total }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Order creation failed");
        return;
      }

      const order = data.order;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
          const verifyRes = await fetch(
            "http://localhost:5000/api/payment/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            const newOrder = {
              id: "ORD-" + Date.now(),
              userId: user.id, // IMPORTANT
              items: pendingOrder.items,
              subtotal: pendingOrder.subtotal,
              tax: pendingOrder.gstAmount,
              shipping: 0,
              total: pendingOrder.total,
              status: "pending",
              createdAt: new Date().toISOString(),
              shippingAddress: {
                fullName: pendingOrder.fullName,
                address: pendingOrder.address,
                city: pendingOrder.city,
                state: pendingOrder.state || "",
                zipCode: pendingOrder.pincode,
              },
            };

            // Get existing orders
            const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");

            // Add new order
            existingOrders.push(newOrder);

            // Save back to localStorage
            localStorage.setItem("orders", JSON.stringify(existingOrders));

            // Store for success page
            sessionStorage.setItem("orderData", JSON.stringify(newOrder));

            router.push("/success");
          } else {
            router.push("/failure");
          }
        },

        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setIsProcessing(false);
    }
  };
  if (!pendingOrder) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading payment details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Payment
          </h1>
          <p className="text-gray-600 mt-2">
            Step 3 of 3: Choose your payment method
          </p>
        </div>

        {/* Payment Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment} className="bg-white border border-gray-200 rounded-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Select Payment Method
              </h2>

              {/* Payment Method Options */}
              <div className="space-y-4 mb-8">
                {/* UPI Option */}
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">UPI</p>
                    <p className="text-sm text-gray-600">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </label>

                {/* Credit/Debit Card Option */}
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      Credit/Debit Card
                    </p>
                    <p className="text-sm text-gray-600">
                      Visa, Mastercard, RuPay
                    </p>
                  </div>
                </label>

                {/* Cash on Delivery Option */}
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-gray-600">
                      Pay when you receive your order
                    </p>
                  </div>
                </label>
              </div>

              {/* UPI Input */}
              {paymentMethod === 'upi' && (
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <label htmlFor="upiId" className="block text-gray-700 font-semibold mb-2">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Example: john@okhdfcbank
                  </p>
                </div>
              )}

              {/* Card Input */}
              {paymentMethod === 'card' && (
                <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-gray-700 font-semibold mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      maxLength="16"
                      value={cardDetails.cardNumber}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          cardNumber: e.target.value.replace(/\D/g, ''),
                        })
                      }
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-gray-700 font-semibold mb-2">
                        MM/YY
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        maxLength="5"
                        value={cardDetails.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setCardDetails({
                            ...cardDetails,
                            expiryDate: value,
                          });
                        }}
                        placeholder="12/25"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-gray-700 font-semibold mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        maxLength="3"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value.replace(/\D/g, ''),
                          })
                        }
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* COD Notice */}
              {paymentMethod === 'cod' && (
                <div className="mb-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-gray-700">
                    You can pay with cash when you receive your order. An
                    additional delivery charge may apply.
                  </p>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition"
              >
                {isProcessing ? 'Processing Payment...' : `Pay Now (${paymentMethod === 'cod' ? 'COD' : 'Online'})`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 md:top-28">
              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{pendingOrder?.subtotal?.toFixed(2) || "0.0"}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Tax (5%)</span>
                    <span className="font-semibold">₹{pendingOrder?.tax?.toFixed(2) || "0.0"}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      {pendingOrder.shipping === 0 ? 'Free' : `₹${pendingOrder?.shipping?.toFixed(2) || "0.0"}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-blue-600">₹{pendingOrder?.total?.toFixed(2) || "0.0"}</span>
                  </div>
                </div>

                {/* Processing State */}
                {isProcessing && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800 flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      Processing payment...
                    </p>
                  </div>
                )}
              </div>

              {/* Items Summary */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Items ({pendingOrder.items.length})
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {pendingOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

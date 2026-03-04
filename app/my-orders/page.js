'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// My Orders page - displays all customer orders with tracking and actions
export default function MyOrdersPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Please login to view orders');
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  // Load user's orders
  useEffect(() => {
    if (isAuthenticated && user) {
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = allOrders.filter(order => order.userId === user.id);
      setOrders(userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  }, [isAuthenticated, user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'processing':
        return '⚙️';
      case 'shipped':
        return '📦';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '❓';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Track your orders and view order details</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Orders Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping now!
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Orders List */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className={`border rounded-lg p-6 cursor-pointer transition ${
                      selectedOrder?.id === order.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Order Info */}
                      <div>
                        <h3 className="font-semibold text-gray-900">{order.id}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-3">
                        <div>
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)} {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>

                        {/* Total */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{(order?.total ?? 0).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-600">Total</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Details Sidebar */}
            {selectedOrder && (
              <div className="lg:col-span-1">
                <div className="border border-gray-200 rounded-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Order Details</h2>

                  {/* Order ID and Status */}
                  <div className="mb-6">
                    <p className="text-xs text-gray-600 mb-1">Order ID</p>
                    <p className="font-mono text-sm font-semibold text-gray-900">{selectedOrder.id}</p>
                    <div className="mt-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)} {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Items</p>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedOrder.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium text-gray-900">₹{((item.price * item.quantity) ?? 0).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <p className="text-sm font-semibold text-gray-900 mb-3">Shipping Address</p>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{selectedOrder.shippingAddress.fullName}</p>
                      <p>{selectedOrder.shippingAddress.address}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                    </div>
                  </div>

                  {/* Totals */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">₹{(selectedOrder?.subtotal ?? 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax (5%)</span>
                      <span className="font-medium text-gray-900">₹{(selectedOrder?.tax?? 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-gray-900">
                        {selectedOrder.shipping === 0 ? 'Free' : `₹${(selectedOrder?.shipping ?? 0).toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                      <span>Total</span>
                      <span>₹{(selectedOrder?.total ?? 0).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-xs text-gray-600 mt-6 pt-6 border-t border-gray-200">
                    Ordered on {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </main>

      <Footer />
    </div>
  );
}

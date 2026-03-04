'use client';

import { useState } from 'react';
import TrackingBar from './TrackingBar';

// Reusable OrderCard component for displaying individual order details
export default function OrderCard({ order, onStatusChange }) {
  const [status, setStatus] = useState(order.status);
  const [message, setMessage] = useState('');

  // Handle cancel order
  const handleCancelOrder = () => {
    setStatus('Cancelled');
    setMessage('Order Cancelled Successfully');
    onStatusChange(order.orderId, 'Cancelled');
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  // Handle return order
  const handleReturnOrder = () => {
    setStatus('Returned');
    setMessage('Return Request Submitted');
    onStatusChange(order.orderId, 'Returned');
    // Clear message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  // Check if cancel button should be shown
  const canCancel = status === 'Processing' || status === 'Shipped';

  // Check if return button should be shown
  const canReturn = status === 'Delivered';

  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-6">
      {/* Order Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">Order ID</p>
          <p className="text-lg font-bold text-gray-900">{order.orderId}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold">Order Date</p>
          <p className="text-lg font-semibold text-gray-900">
            {formatDate(order.orderDate)}
          </p>
        </div>
        <div className="flex items-end">
          <div>
            <p className="text-xs text-gray-600 uppercase font-semibold">Status</p>
            <p
              className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${
                status === 'Processing'
                  ? 'bg-yellow-100 text-yellow-800'
                  : status === 'Shipped'
                  ? 'bg-blue-100 text-blue-800'
                  : status === 'Out for Delivery'
                  ? 'bg-purple-100 text-purple-800'
                  : status === 'Delivered'
                  ? 'bg-green-100 text-green-800'
                  : status === 'Cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {status}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-6 mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-4">Items Ordered</p>
        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
            >
              {/* Item Image */}
              <div className="text-3xl">{item.image}</div>

              {/* Item Details */}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>

              {/* Item Price */}
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">Estimated Delivery</p>
          <p className="text-lg font-bold text-gray-900">
            {formatDate(order.deliveryDate)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-gray-900">
            ₹{order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Tracking Bar */}
      <TrackingBar currentStatus={status} />

      {/* Action Message */}
      {message && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-800 font-semibold text-sm">
          ✓ {message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-3 flex-col sm:flex-row">
        {canCancel && (
          <button
            onClick={handleCancelOrder}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Cancel Order
          </button>
        )}
        {canReturn && (
          <button
            onClick={handleReturnOrder}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Return Order
          </button>
        )}
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
}

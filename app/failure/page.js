'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FailurePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 py-8 flex items-center justify-center">
        <div className="text-center">
          {/* Error Icon */}
          <div className="text-7xl mb-6">❌</div>

          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Payment Failed
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
            We were unable to process your payment. Please check your details and
            try again.
          </p>

          {/* Error Details */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 max-w-md mx-auto">
            <h3 className="font-bold text-red-900 mb-3">What might have happened:</h3>
            <ul className="text-red-800 text-left space-y-2 text-sm">
              <li>• Insufficient balance in your account</li>
              <li>• Incorrect card/UPI details entered</li>
              <li>• Your bank declined the transaction</li>
              <li>• Network connection issue during payment</li>
              <li>• Transaction timeout</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <Link
              href="/payment"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Try Again
            </Link>
            <Link
              href="/cart"
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Back to Cart
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-2">
              Need help? Contact our support team
            </p>
            <p className="text-gray-600">
              Email: <span className="font-semibold">support@ai-shop.com</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

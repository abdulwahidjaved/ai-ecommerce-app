'use client';

// Reusable OrderSummary component to display price breakdown
export default function OrderSummary({ subtotal, gstRate = 5, showButton = true, buttonText = 'Proceed to Checkout', onButtonClick = () => {}, isLoading = false }) {
  const gstAmount = (subtotal * gstRate) / 100;
  const total = subtotal + gstAmount;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-20 md:top-28 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">GST ({gstRate}%)</span>
          <span className="font-semibold text-gray-900">₹{gstAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span className="text-blue-600">₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Button */}
      {showButton && (
        <button
          onClick={onButtonClick}
          disabled={isLoading || subtotal === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all duration-150 mb-4"
        >
          {isLoading ? 'Processing...' : buttonText}
        </button>
      )}

      {/* Trust Badge */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
        <p className="text-xs text-green-800 text-center font-medium">
          ✓ Secure checkout • 100% safe
        </p>
      </div>
    </div>
  );
}

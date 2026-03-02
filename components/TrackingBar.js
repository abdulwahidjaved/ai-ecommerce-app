'use client';

// Reusable TrackingBar component for order status visualization
// Shows the progress of an order through different stages
export default function TrackingBar({ currentStatus }) {
  // Define the tracking steps
  const steps = [
    { name: 'Processing', label: 'Processing' },
    { name: 'Shipped', label: 'Shipped' },
    { name: 'Out for Delivery', label: 'Out for Delivery' },
    { name: 'Delivered', label: 'Delivered' },
  ];

  // Map status to step number (1-4 or 0 for cancelled/returned)
  const statusSteps = {
    Processing: 1,
    Shipped: 2,
    'Out for Delivery': 3,
    Delivered: 4,
    Cancelled: 0,
    Returned: 0,
  };

  const currentStep = statusSteps[currentStatus] || 0;
  const isCancelledOrReturned =
    currentStatus === 'Cancelled' || currentStatus === 'Returned';

  // If order is cancelled or returned, show special message
  if (isCancelledOrReturned) {
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-300 text-center">
        <p className="text-gray-700 font-semibold">Order {currentStatus}</p>
        <p className="text-gray-600 text-sm mt-1">
          Tracking is no longer available for this order.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm font-semibold text-gray-700 mb-4">Order Tracking</p>

      {/* Tracking Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1;
          const isCurrent = currentStep === index + 1;

          return (
            <div key={step.name} className="flex-1 flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-blue-500 text-white ring-4 ring-blue-200'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>

              {/* Step Label */}
              <p
                className={`text-xs font-semibold mt-2 text-center ${
                  isCompleted || isCurrent
                    ? 'text-gray-800'
                    : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>

              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute h-1 w-16 top-5 left-1/2 transition-all duration-300 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  style={{
                    width: 'calc(100% / 4 - 20px)',
                    left: `calc(50% + 20px)`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Status Message */}
      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Current Status:</span> {currentStatus}
        </p>
      </div>
    </div>
  );
}

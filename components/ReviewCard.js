'use client';

// Star rating display component
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
    </div>
  );
}

// Reusable ReviewCard component
export default function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Reviewer Name and Rating */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{review.name}</h4>
          <StarRating rating={review.rating} />
        </div>
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-sm leading-relaxed">{review.text}</p>
    </div>
  );
}

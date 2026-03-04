// Reusable Product Card Component
export default function ProductCard({ name, price, discount, image }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:scale-105">
      {/* Product Image Container */}
      <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
        {/* Image Placeholder */}
        <span className="text-5xl">{image}</span>

        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-blue-600">₹{price}</span>
          {discount && (
            <span className="text-sm text-gray-500 line-through">
              ₹{Math.round(price / (1 - discount / 100))}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

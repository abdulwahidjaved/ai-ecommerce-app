'use client';

import { useState, use, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCardDetail from '@/components/ProductCardDetail';
import ReviewCard from '@/components/ReviewCard';
import { allProducts, getRelatedProducts, dummyReviews } from '@/lib/data';

export default function ProductDetailPage({ params }) {
  // Unwrap params Promise using React.use()
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  // Find the product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://backend-1wke.onrender.com/api/allProducts/${id}`);

        if (!res.ok) {
          setProduct(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        console.log("Fetched product:", data);

        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Get related products
  const relatedProducts = getRelatedProducts(parseInt(id));

  // State for review form
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(dummyReviews);
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  // Handle review form input change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  // Handle review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.comment.trim()) {
      const newReview = {
        id: reviews.length + 1,
        name: formData.name,
        rating: formData.rating,
        text: formData.comment,
      };
      setReviews([...reviews, newReview]);
      setFormData({ name: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  // Handle product not found
  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/products"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded font-semibold transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 bg-gray-50">
        {/* Back Button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link
              href="/products"
              className="text-blue-500 hover:text-blue-600 font-semibold flex items-center gap-2"
            >
              ← Back to Products
            </Link>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-6 mb-8">
            {/* Product Image */}
            <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center text-8xl">
              {product.image}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-start">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </p>
                {product.discount && (
                  <p className="text-sm text-gray-600 mt-2">
                    Save {product.discount}% on this product!
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full text-white py-3 px-6 rounded-lg font-bold text-lg transition-colors mb-4 ${isAddedToCart
                  ? 'bg-green-600'
                  : 'bg-green-500 hover:bg-green-600'
                  }`}
              >
                {isAddedToCart ? '✓ Added to Cart' : 'Add to Cart'}
              </button>

              {/* Additional Info */}
              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
                <p>✓ Free shipping on orders over $50</p>
                <p>✓ 30-day money-back guarantee</p>
                <p>✓ 1-year warranty included</p>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

            {/* Existing Reviews */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Add Review Button */}
            {!showReviewForm && (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Add Your Review
              </button>
            )}

            {/* Review Form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={5}>5 Stars - Excellent</option>
                    <option value={4}>4 Stars - Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Poor</option>
                    <option value={1}>1 Star - Terrible</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Comment
                  </label>
                  <textarea
                    name="comment"
                    value={formData.comment}
                    onChange={handleFormChange}
                    placeholder="Share your experience with this product..."
                    rows="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Submit Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Related Products Section */}
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCardDetail key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';

// Reusable Carousel Component
export default function Carousel({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoSlideRef = useRef(null);

  // Auto-slide functionality
  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(autoSlideRef.current);
  }, [items.length]);

  // Stop auto-slide on user interaction
  const resetAutoSlide = () => {
    clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    resetAutoSlide();
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    resetAutoSlide();
  };

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
        {/* Carousel Items */}
        <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="min-w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 relative">
              {/* Product Image Placeholder */}
              <span className="text-7xl md:text-9xl">{item.image}</span>

              {/* Discount Badge */}
              {item.discount && (
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold">
                  Sale {item.discount}%
                </div>
              )}

              {/* Product Name */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-xl md:text-2xl font-bold">{item.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition z-10"
          aria-label="Previous slide"
        >
          ❮
        </button>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 text-gray-800 rounded-full w-10 h-10 flex items-center justify-center transition z-10"
          aria-label="Next slide"
        >
          ❯
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              resetAutoSlide();
            }}
            className={`w-2 h-2 rounded-full transition ${
              index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

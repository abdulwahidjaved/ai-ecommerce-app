// Static data for the e-commerce store

export const categories = [
  { name: 'Electronics', bgColor: 'bg-blue-100' },
  { name: 'Fashion', bgColor: 'bg-pink-100' },
  { name: 'Home & Garden', bgColor: 'bg-green-100' },
  { name: 'Sports', bgColor: 'bg-yellow-100' },
  { name: 'Books', bgColor: 'bg-purple-100' },
  { name: 'Toys', bgColor: 'bg-orange-100' },
];

export const carouselItems = [
  { name: 'Wireless Headphones', image: '🎧', discount: 30 },
  { name: 'Smart Watch', image: '⌚', discount: 25 },
  { name: 'Laptop Stand', image: '💻', discount: 15 },
  { name: 'USB-C Cable', image: '🔌', discount: 40 },
  { name: 'Phone Case', image: '📱', discount: 20 },
];

export const trendingProducts = [
  { name: 'Premium Headphones', price: 79.99, discount: 20, image: '🎧' },
  { name: 'Smart Watch Pro', price: 199.99, discount: 15, image: '⌚' },
  { name: 'USB-C Hub', price: 49.99, discount: 25, image: '🔌' },
  { name: 'Phone Stand', price: 19.99, discount: 10, image: '📱' },
  { name: 'Laptop Bag', price: 59.99, discount: 30, image: '🎒' },
  { name: 'Wireless Mouse', price: 29.99, discount: 12, image: '🖱️' },
  { name: 'Mechanical Keyboard', price: 89.99, discount: 18, image: '⌨️' },
  { name: 'Monitor Arm', price: 44.99, discount: 22, image: '🖥️' },
];

export const recommendedProducts = [
  { name: 'Blue Light Glasses', price: 44.99, discount: 20, image: '👓' },
  { name: 'Desk Lamp', price: 34.99, discount: 15, image: '💡' },
  { name: 'Phone Charger', price: 24.99, discount: 10, image: '🔋' },
  { name: 'Screen Protector', price: 9.99, discount: 25, image: '🛡️' },
  { name: 'Cable Organizer', price: 14.99, discount: 30, image: '🧵' },
  { name: 'Webcam', price: 69.99, discount: 12, image: '📷' },
  { name: 'Microphone', price: 99.99, discount: 18, image: '🎤' },
  { name: 'Speaker', price: 129.99, discount: 20, image: '🔊' },
];

// Complete products list for the products page
export const allProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    image: '🎧',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 199.99,
    category: 'Electronics',
    image: '⌚',
    description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and 7-day battery life. Great for keeping track of your health.',
  },
  {
    id: 3,
    name: 'USB-C Multi Hub',
    price: 49.99,
    category: 'Electronics',
    image: '🔌',
    description: 'All-in-one USB-C hub with multiple ports for charging and data transfer. Compatible with all USB-C devices.',
  },
  {
    id: 4,
    name: 'Adjustable Phone Stand',
    price: 19.99,
    category: 'Electronics',
    image: '📱',
    description: 'Portable phone stand with adjustable angles. Perfect for video calls and streaming content.',
  },
  {
    id: 5,
    name: 'Premium Laptop Bag',
    price: 59.99,
    category: 'Fashion',
    image: '🎒',
    description: 'Durable laptop bag with multiple compartments for safe storage and easy transportation of your devices.',
  },
  {
    id: 6,
    name: 'Wireless Mouse Pro',
    price: 29.99,
    category: 'Electronics',
    image: '🖱️',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Great for office work.',
  },
  {
    id: 7,
    name: 'Mechanical RGB Keyboard',
    price: 89.99,
    category: 'Electronics',
    image: '⌨️',
    description: 'Gaming mechanical keyboard with RGB lighting and responsive keys. Perfect for gamers and typists.',
  },
  {
    id: 8,
    name: 'Desktop Monitor Arm',
    price: 44.99,
    category: 'Electronics',
    image: '🖥️',
    description: 'Adjustable monitor arm to free up desk space and improve ergonomics. Supports up to 27-inch monitors.',
  },
  {
    id: 9,
    name: 'Blue Light Glasses',
    price: 44.99,
    category: 'Fashion',
    image: '👓',
    description: 'Stylish glasses that reduce blue light exposure from screens. Comfortable for extended use.',
  },
  {
    id: 10,
    name: 'Adjustable LED Desk Lamp',
    price: 34.99,
    category: 'Home & Garden',
    image: '💡',
    description: 'Bright LED lamp with adjustable brightness levels. Energy-efficient and perfect for reading.',
  },
  {
    id: 11,
    name: 'Fast USB-C Charger',
    price: 24.99,
    category: 'Electronics',
    image: '🔋',
    description: 'Fast charging USB-C charger for all your devices. Compact design perfect for travel.',
  },
  {
    id: 12,
    name: 'Screen Protector Pack',
    price: 9.99,
    category: 'Electronics',
    image: '🛡️',
    description: 'Pack of 3 tempered glass screen protectors. Easy to apply and provides excellent protection.',
  },
];

// Related products for product detail page
export const getRelatedProducts = (productId) => {
  return allProducts.filter((p) => p.id !== productId).slice(0, 4);
};

// Dummy reviews
export const dummyReviews = [
  {
    id: 1,
    name: 'John Smith',
    rating: 5,
    text: 'Amazing product! Great quality and exactly what I was looking for. Highly recommend!',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    rating: 4,
    text: 'Very good product. Works as expected. Shipping was fast and packaging was excellent.',
  },
  {
    id: 3,
    name: 'Mike Chen',
    rating: 5,
    text: 'Outstanding quality! Worth every penny. Customer service was helpful and responsive.',
  },
];

// Dummy order data for My Orders page
export const dummyOrders = [
  {
    orderId: 'ORD-001234',
    orderDate: '2024-02-15',
    items: [
      { name: 'Premium Wireless Headphones', quantity: 1, price: 79.99, image: '🎧' },
      { name: 'Wireless Mouse Pro', quantity: 2, price: 29.99, image: '🖱️' },
    ],
    totalAmount: 139.97,
    status: 'Delivered',
    deliveryDate: '2024-02-20',
  },
  {
    orderId: 'ORD-001235',
    orderDate: '2024-02-18',
    items: [
      { name: 'Smart Watch Pro', quantity: 1, price: 199.99, image: '⌚' },
    ],
    totalAmount: 199.99,
    status: 'Shipped',
    deliveryDate: '2024-02-25',
  },
  {
    orderId: 'ORD-001236',
    orderDate: '2024-02-20',
    items: [
      { name: 'Mechanical RGB Keyboard', quantity: 1, price: 89.99, image: '⌨️' },
      { name: 'Desktop Monitor Arm', quantity: 1, price: 44.99, image: '🖥️' },
    ],
    totalAmount: 134.98,
    status: 'Processing',
    deliveryDate: '2024-02-28',
  },
  {
    orderId: 'ORD-001237',
    orderDate: '2024-02-10',
    items: [
      { name: 'Blue Light Glasses', quantity: 1, price: 44.99, image: '👓' },
    ],
    totalAmount: 44.99,
    status: 'Delivered',
    deliveryDate: '2024-02-14',
  },
  {
    orderId: 'ORD-001238',
    orderDate: '2024-02-22',
    items: [
      { name: 'USB-C Multi Hub', quantity: 1, price: 49.99, image: '🔌' },
      { name: 'Fast USB-C Charger', quantity: 1, price: 24.99, image: '🔋' },
      { name: 'Screen Protector Pack', quantity: 3, price: 9.99, image: '🛡️' },
    ],
    totalAmount: 114.96,
    status: 'Out for Delivery',
    deliveryDate: '2024-02-27',
  },
  {
    orderId: 'ORD-001239',
    orderDate: '2024-02-05',
    items: [
      { name: 'Premium Laptop Bag', quantity: 1, price: 59.99, image: '🎒' },
    ],
    totalAmount: 59.99,
    status: 'Returned',
    deliveryDate: '2024-02-09',
  },
];

// Order statuses with descriptions
export const orderStatuses = {
  Processing: { color: 'bg-yellow-100 text-yellow-800', step: 1 },
  Shipped: { color: 'bg-blue-100 text-blue-800', step: 2 },
  'Out for Delivery': { color: 'bg-purple-100 text-purple-800', step: 3 },
  Delivered: { color: 'bg-green-100 text-green-800', step: 4 },
  Cancelled: { color: 'bg-red-100 text-red-800', step: 0 },
  Returned: { color: 'bg-gray-100 text-gray-800', step: 0 },
};

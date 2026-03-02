# E-Commerce App - Quick Reference Guide

## Start Here

This guide provides quick answers to common questions about the application.

---

## How to Add to Cart?

### From ProductCardDetail Component
```javascript
import { useCart } from '@/context/CartContext';

export default function ProductCardDetail({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);  // Adds product or increases qty
  };

  return (
    <button onClick={handleClick}>
      Add to Cart
    </button>
  );
}
```

### From Any Page Component
```javascript
import { useCart } from '@/context/CartContext';

export default function MyPage() {
  const { addToCart } = useCart();

  const handleAddProduct = () => {
    addToCart({
      id: 1,
      name: 'Product Name',
      price: 99.99,
      image: '🎧',
      category: 'Electronics',
      description: 'Product description'
    });
  };

  return <button onClick={handleAddProduct}>Add</button>;
}
```

---

## How to Use Cart State?

### Get Cart Items
```javascript
const { cartItems } = useCart();
// cartItems is an array of items in cart
```

### Get Cart Total
```javascript
const { getTotalPrice } = useCart();
const total = getTotalPrice();  // Returns number
```

### Get Item Count
```javascript
const { getTotalItems } = useCart();
const count = getTotalItems();  // Total including quantities
```

### Remove Item from Cart
```javascript
const { removeFromCart } = useCart();
removeFromCart(productId);  // Removes completely
```

### Decrease Quantity
```javascript
const { decreaseQuantity } = useCart();
decreaseQuantity(productId);  // Decreases by 1, removes if qty = 0
```

### Clear Entire Cart
```javascript
const { clearCart } = useCart();
clearCart();  // Empties cart
```

---

## How to Get Product Data?

### Import All Products
```javascript
import { allProducts } from '@/lib/data';

// Use in component
const products = allProducts;  // Array of all products

// Find one product
const product = allProducts.find(p => p.id === 1);

// Filter products
const electronics = allProducts.filter(p => p.category === 'Electronics');
```

### Product Structure
```javascript
{
  id: 1,                                    // Unique ID
  name: 'Premium Wireless Headphones',     // Product name
  price: 79.99,                            // Price in dollars
  category: 'Electronics',                 // Category
  image: '🎧',                             // Emoji or image URL
  description: 'High-quality wireless...'  // Full description
}
```

---

## How to Handle Dynamic Routes?

### Access Route Parameters (Next.js 16)
```javascript
'use client';

import { use } from 'react';

export default function ProductDetailPage({ params }) {
  // IMPORTANT: Use React.use() to unwrap Promise
  const { id } = use(params);

  // Now you can use id
  const product = allProducts.find(p => p.id === parseInt(id));

  return <div>{product.name}</div>;
}
```

### Navigate to Dynamic Route
```javascript
import Link from 'next/link';

// Direct link
<Link href={`/products/${productId}`}>View Product</Link>

// Using router
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push(`/products/${productId}`);
```

---

## How to Validate Forms?

### Basic Validation Pattern
```javascript
import { useState } from 'react';

export default function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  // Validate
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email required';
    }
    
    if (formData.phone.length !== 10) {
      newErrors.phone = '10-digit phone required';
    }
    
    return newErrors;
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length === 0) {
      // Form is valid - proceed
      console.log('Form submitted:', formData);
    } else {
      // Form has errors
      setErrors(formErrors);
    }
  };

  // Render form
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
      />
      {errors.name && <span className="text-red-500">{errors.name}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## How to Use SessionStorage?

### Save Data
```javascript
const data = {
  fullName: 'John Doe',
  email: 'john@example.com',
  address: '123 Main St'
};

// Save to sessionStorage
sessionStorage.setItem('checkoutData', JSON.stringify(data));
```

### Retrieve Data
```javascript
// Get from sessionStorage
const savedData = JSON.parse(
  sessionStorage.getItem('checkoutData')
);

console.log(savedData.fullName);  // 'John Doe'
```

### Clear Data
```javascript
// Remove one item
sessionStorage.removeItem('checkoutData');

// Clear all
sessionStorage.clear();
```

---

## How to Navigate Between Pages?

### Using Link (Recommended)
```javascript
import Link from 'next/link';

<Link href="/cart">Go to Cart</Link>
<Link href={`/products/${id}`}>View Product</Link>
```

### Using Router
```javascript
import { useRouter } from 'next/navigation';

export default function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/cart');  // Navigate to cart
  };

  return <button onClick={handleClick}>Go to Cart</button>;
}
```

---

## How to Debug Cart State?

### Console Logging
The app includes `[v0]` debug logs:
```
[v0] Adding product to cart: Premium Wireless Headphones
[v0] Cart total: 79.99 Items count: 1
[v0] Removing product from cart, ID: 1
```

### Monitor State Changes
```javascript
// In any component using cart
const { cartItems } = useCart();

useEffect(() => {
  console.log('Cart items changed:', cartItems);
}, [cartItems]);
```

### Check SessionStorage (Browser Console)
```javascript
// In browser DevTools console
JSON.parse(sessionStorage.getItem('checkoutData'))
sessionStorage.getItem('orderData')
```

---

## How to Render Dynamic Lists?

### Map Over Array
```javascript
const products = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' }
];

export default function ProductList() {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {product.name}
        </div>
      ))}
    </div>
  );
}
```

### Map Cart Items
```javascript
const { cartItems } = useCart();

return (
  <div>
    {cartItems.map((item) => (
      <div key={item.id}>
        {item.name} - Qty: {item.quantity}
      </div>
    ))}
  </div>
);
```

---

## Common Patterns

### Show/Hide Component
```javascript
const [isVisible, setIsVisible] = useState(false);

return (
  <>
    <button onClick={() => setIsVisible(!isVisible)}>
      Toggle
    </button>
    
    {isVisible && <div>Content</div>}
  </>
);
```

### Conditional Rendering
```javascript
{cartItems.length === 0 ? (
  <p>Cart is empty</p>
) : (
  <div>Cart has {cartItems.length} items</div>
)}
```

### Handle Form Input
```javascript
const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter name..."
/>
```

### Conditional CSS Classes
```javascript
<button
  className={`px-4 py-2 rounded ${
    isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
  }`}
  disabled={isLoading}
>
  {isLoading ? 'Loading...' : 'Submit'}
</button>
```

---

## Error Messages to Fix

### "useCart must be used within CartProvider"
**Issue**: Component not wrapped by CartProvider
**Fix**: Ensure CartProvider is in layout.tsx and wraps all components

### "params.id is undefined"
**Issue**: Not unwrapping params Promise
**Fix**: Use `const { id } = use(params);` instead of `const { id } = params;`

### "Cannot find module '/lib/data'"
**Issue**: Wrong import path
**Fix**: Use `import { allProducts } from '@/lib/data';`

### "Link requires href prop"
**Issue**: Missing href attribute
**Fix**: Add href: `<Link href="/products">Products</Link>`

---

## Useful Tailwind Classes

### Layout
```
flex, grid, block, inline, absolute, relative
```

### Spacing
```
m-4 (margin), p-4 (padding), gap-4 (gap between flex/grid items)
```

### Colors
```
bg-blue-500, text-gray-700, border-red-500
```

### Hover/Responsive
```
hover:bg-blue-600, md:text-xl, sm:w-full
```

### Display
```
hidden, block, flex, grid
```

---

## File Paths Quick Reference

```
Product data:           /lib/data.js
Cart state:            /context/CartContext.js
Product card:          /components/ProductCardDetail.js
Cart items:            /components/CartItem.js
Home page:             /app/page.js
Products listing:      /app/products/page.js
Product detail:        /app/products/[id]/page.js
Cart page:             /app/cart/page.js
Checkout:              /app/checkout/page.js
Payment:               /app/payment/page.js
Success:               /app/success/page.js
Failure:               /app/failure/page.js
My Orders:             /app/my-orders/page.js
```

---

## Quick Copy-Paste Code

### Complete Add to Cart Button
```javascript
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded text-white ${
        isAdded ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'
      }`}
    >
      {isAdded ? '✓ Added' : 'Add to Cart'}
    </button>
  );
}
```

### Complete Cart Total Display
```javascript
import { useCart } from '@/context/CartContext';

export default function CartTotal() {
  const { getTotalPrice } = useCart();
  const total = getTotalPrice();
  const gst = (total * 5) / 100;

  return (
    <div className="p-6 bg-gray-100 rounded">
      <p className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </p>
      <p className="flex justify-between mb-2">
        <span>GST (5%)</span>
        <span>${gst.toFixed(2)}</span>
      </p>
      <p className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>${(total + gst).toFixed(2)}</span>
      </p>
    </div>
  );
}
```

---

## Testing Tips

1. **Console Logging**: Check browser console for `[v0]` debug messages
2. **React DevTools**: Inspect CartContext state changes
3. **SessionStorage**: Check developer tools → Application → Session Storage
4. **Network Tab**: Monitor API calls (there are none in this app - all client-side)
5. **Responsive Design**: Test with mobile viewport (F12 → Toggle device mode)

---

## Most Important Reminders

1. ✅ **Always use `use(params)`** to unwrap route parameters in Next.js 16
2. ✅ **Always import `useCart`** when using cart functions
3. ✅ **CartProvider must wrap** all components in layout.tsx
4. ✅ **Use Link not <a>** tags for navigation
5. ✅ **Check console logs** for `[v0]` debug messages

---

**Last Updated**: February 2025
**Version**: 1.0

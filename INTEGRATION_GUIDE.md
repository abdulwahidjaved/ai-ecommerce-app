# E-Commerce Application Integration Guide

## Overview
This document provides a comprehensive guide to understanding and verifying the cart and checkout flow integration in the AI-Shop e-commerce application.

## Architecture Overview

```
CartContext (context/CartContext.js)
    ↓
    ├── Navbar (displays cart count)
    ├── ProductCardDetail (Add to Cart button)
    ├── Product Detail Page (Add to Cart button)
    ├── Cart Page (displays items, updates quantities)
    ├── Checkout Page (displays order summary)
    ├── Payment Page (processes payment)
    └── Success/Failure Pages (order confirmation)
```

## Component Hierarchy & Data Flow

### 1. CartContext (React Context API)
**File**: `context/CartContext.js`
**Purpose**: Global state management for shopping cart

**State Variables**:
- `cartItems`: Array of items in the cart
  ```javascript
  [
    {
      id: 1,
      name: 'Product Name',
      price: 79.99,
      image: '🎧',
      quantity: 2
    }
  ]
  ```

**Functions**:
- `addToCart(product)`: Adds product or increases quantity if exists
- `removeFromCart(productId)`: Removes product from cart
- `decreaseQuantity(productId)`: Decreases quantity by 1
- `clearCart()`: Empties entire cart
- `getTotalPrice()`: Returns sum of all items (price × quantity)
- `getTotalItems()`: Returns total item count including quantities

### 2. Product Listing & Cards

**ProductCardDetail Component** (`components/ProductCardDetail.js`)
```javascript
// Key Features:
- Uses useCart() hook
- handleAddToCart() calls addToCart(product)
- Shows "✓ Added" feedback for 2 seconds
- Works in:
  - Products listing page (/products)
  - Product detail page (related products)
  - Home page (trending/recommended sections)
```

### 3. Product Detail Page

**File**: `app/products/[id]/page.js`
**Key Implementation**:
```javascript
const { id } = use(params);  // Unwraps params Promise (Next.js 16)
const product = allProducts.find((p) => p.id === parseInt(id));
const { addToCart } = useCart();

handleAddToCart() → addToCart(product) → updates CartContext
```

### 4. Cart Page

**File**: `app/cart/page.js`
**Features**:
- Displays all cartItems from context
- CartItem component for each item with quantity controls
- OrderSummary component for price breakdown
- Empty cart state handling
- Proceed to Checkout button

**Data Flow**:
```
CartContext → useCart() → cartItems, getTotalPrice()
  ↓
  Render CartItem components
  ↓
  Render OrderSummary with calculations
```

### 5. Checkout Page

**File**: `app/checkout/page.js`
**Features**:
- Checks if cart is empty (redirects to /cart if so)
- Uses CheckoutForm component for form data collection
- Stores checkout data in sessionStorage
- Passes to payment page via sessionStorage

**Data Storage**:
```javascript
sessionStorage.setItem('checkoutData', JSON.stringify(formData));
// Contains: fullName, email, phone, address, city, pincode
```

### 6. Payment Page

**File**: `app/payment/page.js`
**Features**:
- Retrieves checkoutData from sessionStorage
- Gets order summary from CartContext
- Simulates payment processing (70% success, 30% failure)
- Redirects to /success or /failure

**Payment Methods**:
- UPI (requires UPI ID)
- Credit/Debit Card (requires card details)
- Cash on Delivery (no additional fields)

### 7. Success Page

**File**: `app/success/page.js`
**Features**:
- Displays order confirmation
- Shows bill with order details
- Clears cart after displaying
- Generates order number

### 8. My Orders Page

**File**: `app/my-orders/page.js`
**Features**:
- Displays dummy order history
- Shows order tracking with progress bar
- Cancel/Return options
- Order status badges

## Testing Checklist

### Test 1: Add to Cart from Listing Page
```
1. Navigate to /products
2. Click "Add to Cart" on any product
3. Verify:
   - Button shows "✓ Added" for 2 seconds
   - Console logs show: "[v0] Adding product to cart: [name]"
   - Product appears in cart count (if displaying)
   - Navigate to /cart and verify item appears
```

### Test 2: Add to Cart from Detail Page
```
1. Click "View Details" on any product from /products
2. Verify product details load correctly (name, price, description)
3. Click "Add to Cart"
4. Verify:
   - Button changes to "✓ Added to Cart"
   - Console logs: "[v0] Adding product to cart: [name]"
   - Go to /cart and verify item is there
```

### Test 3: Quantity Management
```
1. Add a product to cart
2. Go to /cart
3. Click "+" to increase quantity
4. Verify quantity increases and subtotal updates
5. Click "-" to decrease quantity
6. Verify quantity decreases and subtotal updates
7. Click "-" when quantity is 1
8. Verify item is removed from cart
```

### Test 4: Cart Context Updates
```
1. Open browser console (F12)
2. Add multiple products to cart
3. Verify console logs show:
   - "[v0] Adding product to cart: [name]"
   - "[v0] Cart total: [amount] Items count: [number]"
4. Update quantities and verify logs update
5. Remove items and verify removal logs
```

### Test 5: Checkout Flow
```
1. Add products to cart
2. Go to /cart
3. Click "Proceed to Checkout"
4. Verify:
   - Redirects to /checkout
   - Order summary shows correct total
   - Form fields are present (name, email, phone, etc.)
5. Fill form with valid data
6. Click "Continue to Payment"
7. Verify:
   - Redirects to /payment
   - Order summary still shows correct amount
   - Checkout data was saved to sessionStorage
```

### Test 6: Payment Processing
```
1. On /payment page
2. Select payment method (e.g., UPI)
3. Fill in required fields
4. Click "Pay Now"
5. Verify:
   - Processing message appears
   - Payment is simulated (70% chance success)
   - Redirects to /success or /failure
```

### Test 7: Success & Cart Clearing
```
1. After successful payment
2. Verify /success page shows:
   - Order confirmation message
   - Bill with order details
   - Order items list
   - "Back to Home" button
3. Click "Back to Home"
4. Navigate to /cart
5. Verify cart is empty
```

### Test 8: Empty Cart Handling
```
1. Clear cart manually
2. Try to access /checkout directly
3. Verify:
   - Redirected to /cart
   - Shows "Your cart is empty" message
4. Try to access /payment directly
5. Verify:
   - Redirected to /cart due to useEffect check
```

## Data Flow Diagram

```
Add to Cart (Product Card)
    ↓
useCart() hook
    ↓
addToCart(product) in CartContext
    ↓
setCartItems updates state
    ↓
Component re-renders with updated items
    ↓
Cart Page reflects changes immediately
```

## Debugging Tips

### Enable Console Logging
The CartContext includes console.log statements with "[v0]" prefix:
```javascript
console.log('[v0] Adding product to cart:', product.name);
console.log('[v0] Cart total:', total, 'Items count:', cartItems.length);
console.log('[v0] Removing product from cart, ID:', productId);
```

### Check CartContext Provider
```javascript
// app/layout.tsx
<CartProvider>
  {children}
</CartProvider>
```
Ensure CartProvider wraps all components that need cart access.

### Verify useCart Hook Import
All components using cart must import:
```javascript
import { useCart } from '@/context/CartContext';
```

### Session Storage for Checkout
Checkout data persists in sessionStorage between pages:
```javascript
// Get checkout data on payment page
const checkoutData = JSON.parse(sessionStorage.getItem('checkoutData'));
```

## Common Issues & Solutions

### Issue 1: "useCart must be used within CartProvider"
**Solution**: Ensure the component is within the CartProvider wrapper in layout.tsx

### Issue 2: Products not appearing in cart
**Solution**: 
- Check console for "[v0]" logs
- Verify product has required fields (id, name, price, image)
- Ensure addToCart is called with product object

### Issue 3: Cart doesn't update on product detail page
**Solution**:
- Verify params are unwrapped with `use()`: `const { id } = use(params);`
- Check product is found: `const product = allProducts.find(...)`
- Ensure useCart is imported and used

### Issue 4: Checkout form doesn't submit
**Solution**:
- Check form validation in CheckoutForm component
- Verify all required fields are filled
- Check browser console for errors

### Issue 5: Payment page shows empty cart
**Solution**:
- Verify cartItems are in context before navigating to payment
- Check sessionStorage contains checkoutData
- Add console.log to verify data persistence

## Performance Optimization Notes

1. **Context Updates**: CartContext uses setState callbacks which batch updates efficiently
2. **Component Re-renders**: Only components consuming useCart() will re-render
3. **SessionStorage**: Used for checkout data to persist between page navigations
4. **Product Data**: Static array (allProducts) loaded from lib/data.js

## Security Notes

1. **Client-Side Only**: This is a demo app with no backend validation
2. **Session Storage**: Used instead of localStorage for sensitive data (temporary)
3. **Payment Simulation**: Not actual payment processing
4. **Form Validation**: Client-side only, should add backend validation for production

## File Structure Reference

```
app/
  ├── page.js (Home page)
  ├── products/
  │   ├── page.js (Product listing)
  │   └── [id]/page.js (Product detail)
  ├── cart/page.js
  ├── checkout/page.js
  ├── payment/page.js
  ├── success/page.js
  ├── failure/page.js
  └── my-orders/page.js

components/
  ├── Navbar.js
  ├── ProductCardDetail.js
  ├── CartItem.js
  ├── OrderSummary.js
  ├── CheckoutForm.js
  ├── ReviewCard.js
  ├── TrackingBar.js
  └── OrderCard.js

context/
  └── CartContext.js

lib/
  └── data.js
```

## Quick Start Verification

1. Start dev server: `npm run dev`
2. Open browser console: `F12`
3. Navigate to `/products`
4. Add a product and watch console for "[v0]" logs
5. Navigate to `/cart` and verify item appears
6. Test complete checkout flow
7. Check `/my-orders` for dummy order history

---

**Last Updated**: February 2025
**Status**: Fully Functional

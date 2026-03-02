# Cart and Checkout Flow Documentation

## Overview
This document explains the complete cart and checkout flow implementation using React Context API for state management.

---

## Architecture

### 1. Cart Context (`/context/CartContext.js`)
The heart of the cart system using React Context API to manage global cart state.

**Key Functions:**
- `addToCart(product)` - Add item to cart or increase quantity if exists
- `removeFromCart(productId)` - Remove item completely from cart
- `decreaseQuantity(productId)` - Decrease quantity or remove if reaches 0
- `clearCart()` - Empty the entire cart
- `getTotalPrice()` - Calculate total price of all items
- `getTotalItems()` - Get total number of items in cart

**Usage:**
```javascript
const { cartItems, addToCart, removeFromCart } = useCart();
```

---

## Pages and Components

### 2. Cart Page (`/app/cart/page.js`)
**Route:** `/cart`

**Features:**
- Display all items in cart with product details
- Quantity controls (+ and - buttons)
- Remove individual items
- Show order summary with:
  - Subtotal
  - GST calculation (5%)
  - Final total
- Empty cart state with link to continue shopping
- "Proceed to Checkout" button

**Responsive Layout:**
- Mobile: Vertical layout with stacked items
- Desktop: Table-like layout with organized columns

---

### 3. Checkout Page (`/app/checkout/page.js`)
**Route:** `/checkout`

**Features:**
- Form collection for delivery details:
  - Full Name (required)
  - Email (required, validated)
  - Phone Number (required, 10-digit validation)
  - Address (required)
  - City (required)
  - Pincode (required, 6-digit validation)
- Real-time form validation with error messages
- Order summary sidebar showing:
  - Items in cart
  - Price breakdown
  - Subtotal and GST
- "Continue to Payment" button

**Data Storage:**
- Form data stored in `sessionStorage` as 'checkoutData' for use on payment page
- Redirects to `/payment` on successful form submission

**Validation Rules:**
- Email format validation
- Phone number: exactly 10 digits
- Pincode: exactly 6 digits
- All fields are required

---

### 4. Payment Page (`/app/payment/page.js`)
**Route:** `/payment`

**Features:**
- Three payment method options:
  1. **UPI** - Input UPI ID (e.g., yourname@upi)
  2. **Credit/Debit Card** - Input card details with validation
     - Card Number (16 digits)
     - Expiry Date (MM/YY format)
     - CVV (3 digits)
  3. **Cash on Delivery (COD)** - No additional details needed

**Payment Simulation:**
- 2-second processing delay
- Random success/failure outcome:
  - 70% success rate
  - 30% failure rate
- Redirects to `/success` on successful payment
- Redirects to `/failure` on failed payment

**Order Data Storage:**
- Stores complete order information in sessionStorage as 'orderData'
- Includes:
  - Customer details (name, email, phone, address, city, pincode)
  - Items purchased with quantities and prices
  - Subtotal, GST, and total amount
  - Order date
  - Payment method used

---

### 5. Success Page (`/app/success/page.js`)
**Route:** `/success`

**Features:**
- Success confirmation with celebration emoji (🎉)
- Order summary card with:
  - Order number (randomly generated)
  - Order date
  - Customer delivery address
  - Contact details
  - Complete list of purchased items with quantities and prices
  - Price breakdown (Subtotal, GST, Total)
- Next steps information
- Automatic cart clearing after order completion
- Session storage cleanup
- Action buttons:
  - "Back to Home"
  - "Continue Shopping"

**Important:**
- Cart is automatically cleared using `clearCart()`
- Session storage data is removed for security

---

### 6. Failure Page (`/app/failure/page.js`)
**Route:** `/failure`

**Features:**
- Error message with error emoji (❌)
- Common reasons for payment failure:
  - Insufficient balance
  - Incorrect details
  - Bank declined transaction
  - Network issues
  - Transaction timeout
- Action buttons:
  - "Try Again" - Redirects back to `/payment`
  - "Back to Cart" - Allows reviewing cart before retry
- Support contact information

**Cart State:**
- Cart items are preserved for retry

---

## Reusable Components

### CartItem (`/components/CartItem.js`)
Displays individual cart items with controls.

**Props:** `item` (cart item object)

**Features:**
- Product image, name, and price
- Quantity controls (+/- buttons)
- Subtotal calculation
- Remove button

---

### OrderSummary (`/components/OrderSummary.js`)
Shows price breakdown (used across multiple pages).

**Props:**
- `subtotal` - Subtotal amount
- `gstRate` - GST percentage (default: 5%)
- `showButton` - Whether to show action button
- `buttonText` - Custom button text
- `onButtonClick` - Button click handler
- `isLoading` - Loading state

**Features:**
- Subtotal display
- GST calculation
- Total calculation
- Optional action button
- Sticky positioning on desktop

---

### CheckoutForm (`/components/CheckoutForm.js`)
Reusable form component for delivery details.

**Props:**
- `onSubmit` - Form submission callback
- `isLoading` - Loading state

**Features:**
- Full form validation
- Real-time error clearing
- Error message display
- Form reset after submission
- Phone and pincode format validation

---

### ProductCardDetail (`/components/ProductCardDetail.js`)
Product card with integrated "Add to Cart" functionality.

**Features:**
- Uses `useCart()` hook for cart operations
- Visual feedback on adding to cart (✓ Added text)
- Automatic state reset after 2 seconds

---

## Data Flow

```
User Views Product
       ↓
Click "Add to Cart"
       ↓
useCart() → addToCart() → cartItems updated
       ↓
Navigate to /cart
       ↓
View CartItems, Order Summary
       ↓
Click "Proceed to Checkout"
       ↓
Navigate to /checkout
       ↓
Fill CheckoutForm
       ↓
Form validation & submission
       ↓
Store data in sessionStorage
       ↓
Navigate to /payment
       ↓
Select payment method
       ↓
Simulate payment processing
       ↓
Success (70%) → /success
  OR
Failure (30%) → /failure
       ↓
On Success: Clear cart, display order summary
On Failure: Preserve cart for retry
```

---

## State Management

### Context API (CartContext)
- **Centralized cart state** - All components can access cart items
- **No prop drilling** - No need to pass props through multiple levels
- **Persistent across pages** - Cart data maintained during checkout flow

### Session Storage
- **Checkout Data** - Temporary storage of form data between checkout and payment pages
- **Order Data** - Complete order information displayed on success page
- **Auto-cleanup** - Cleared after successful order

---

## Validation Rules

### Phone Number Validation
- Must be exactly 10 digits
- Non-digit characters are stripped

### Pincode Validation
- Must be exactly 6 digits

### Email Validation
- Standard email format (user@domain.com)

### All Required Fields
- Empty fields show error messages
- Errors clear when user starts typing

---

## User Experience Features

### Visual Feedback
- "✓ Added" text on add to cart buttons
- Loading states on form submissions
- Error messages with field-specific validation
- Success confirmation on payment completion

### Empty States
- Empty cart redirects appropriately
- Helpful messages and links to continue shopping

### Responsive Design
- Mobile-first approach
- Desktop optimizations
- Sticky sidebars for order summaries

### Security
- Session storage cleared after order completion
- No sensitive data stored permanently
- Form validation before submission

---

## Testing the Flow

1. **Add to Cart:**
   - Navigate to `/products`
   - Click "Add to Cart" on any product
   - Observe "✓ Added" feedback

2. **Cart Page:**
   - Go to `/cart`
   - Adjust quantities
   - Remove items
   - View price calculations

3. **Checkout:**
   - Click "Proceed to Checkout"
   - Fill in delivery details
   - Test validation by leaving fields empty
   - Submit form

4. **Payment:**
   - Select payment method
   - Fill in payment details (if UPI/Card)
   - Click "Pay Now"
   - Wait 2 seconds for simulation

5. **Success/Failure:**
   - View order summary on success
   - Review error options on failure
   - Click action buttons to continue

---

## Code Examples

### Using Cart in a Component
```javascript
import { useCart } from '@/context/CartContext';

export default function MyComponent() {
  const { cartItems, addToCart, getTotalPrice } = useCart();

  const handleAdd = () => {
    addToCart({ id: 1, name: 'Product', price: 29.99, image: '🎧' });
  };

  return (
    <div>
      <button onClick={handleAdd}>Add to Cart</button>
      <p>Total: ${getTotalPrice().toFixed(2)}</p>
    </div>
  );
}
```

### Accessing Session Data
```javascript
// Store data
sessionStorage.setItem('checkoutData', JSON.stringify(formData));

// Retrieve data
const data = JSON.parse(sessionStorage.getItem('checkoutData'));

// Clear data
sessionStorage.removeItem('checkoutData');
```

---

## Future Enhancements

- Add coupon/discount code support
- Implement persistent cart (localStorage or database)
- Add order history page
- Email confirmation integration
- Real payment gateway integration
- Address autocomplete
- Order tracking

---

## File Structure

```
├── context/
│   └── CartContext.js
├── components/
│   ├── CartItem.js
│   ├── CheckoutForm.js
│   ├── OrderSummary.js
│   └── ProductCardDetail.js
├── app/
│   ├── cart/
│   │   └── page.js
│   ├── checkout/
│   │   └── page.js
│   ├── payment/
│   │   └── page.js
│   ├── success/
│   │   └── page.js
│   └── failure/
│       └── page.js
```

---

## Notes

- All prices are formatted to 2 decimal places
- GST is calculated at 5% (configurable in OrderSummary)
- Cart persistence can be added using localStorage if needed
- Payment simulation uses `Math.random()` with 0.7 success probability
- Phone and pincode validation uses regex patterns

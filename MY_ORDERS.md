# My Orders Module Documentation

## Overview
The My Orders module provides a complete order management interface for customers to view, track, and manage their previous purchases. It features interactive order cards with detailed tracking information and action buttons for cancelling or returning orders.

## File Structure

```
app/
  └── my-orders/
      └── page.js          # Main My Orders page

components/
  ├── OrderCard.js         # Individual order display component
  └── TrackingBar.js       # Order tracking progress visualization

lib/
  └── data.js              # Contains dummy order data
```

## Components

### 1. OrderCard Component (`components/OrderCard.js`)
Reusable component for displaying individual order details with tracking and action buttons.

**Props:**
- `order` (object) - Order data object containing:
  - `orderId` (string) - Unique order identifier
  - `orderDate` (string) - Date order was placed
  - `items` (array) - Array of product items ordered
  - `totalAmount` (number) - Total order price
  - `status` (string) - Current order status
  - `deliveryDate` (string) - Estimated delivery date
- `onStatusChange` (function) - Callback function when order status changes

**Features:**
- Displays order ID, date, and status badge
- Lists all items with images, quantities, and prices
- Shows total amount and estimated delivery date
- Integrates TrackingBar component
- Conditionally shows Cancel Order button (if status is Processing or Shipped)
- Conditionally shows Return Order button (if status is Delivered)
- Shows View Details button
- Displays success messages when actions are performed

**Status Styling:**
- Processing: Yellow background
- Shipped: Blue background
- Out for Delivery: Purple background
- Delivered: Green background
- Cancelled: Red background
- Returned: Gray background

### 2. TrackingBar Component (`components/TrackingBar.js`)
Visualizes order progress through different shipping stages.

**Props:**
- `currentStatus` (string) - Current order status

**Features:**
- Shows 4 tracking steps: Processing → Shipped → Out for Delivery → Delivered
- Step circles change color based on completion status:
  - Completed steps: Green with checkmark
  - Current step: Blue with ring effect
  - Future steps: Gray
- Displays step labels below each circle
- Connecting lines between steps
- Shows current status message
- Disables tracking for cancelled or returned orders

**Tracking Steps:**
```
1. Processing    - Order is being prepared
2. Shipped       - Order has been dispatched
3. Out for Delivery - Order is with delivery partner
4. Delivered     - Order has been delivered
```

## Data Structure

### Order Object
```javascript
{
  orderId: 'ORD-001234',
  orderDate: '2024-02-15',
  items: [
    {
      name: 'Product Name',
      quantity: 1,
      price: 79.99,
      image: '🎧'
    }
  ],
  totalAmount: 139.97,
  status: 'Delivered', // 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned'
  deliveryDate: '2024-02-20'
}
```

### Order Status Values
- **Processing** - Order received and being prepared
- **Shipped** - Order dispatched to courier
- **Out for Delivery** - Order with delivery partner
- **Delivered** - Order successfully delivered
- **Cancelled** - Order was cancelled (only if Processing or Shipped)
- **Returned** - Order was returned (only if Delivered)

## Page Features

### My Orders Page (`app/my-orders/page.js`)

**State Management:**
- Uses `useState` to manage orders array
- Updates order status when user performs actions
- Maintains local state without backend

**Empty State:**
- Shows message "You have no previous orders"
- Provides link to browse products
- Displays shopping bag emoji (📦)

**Orders Summary:**
- Shows total number of orders
- Displays count of delivered orders
- Shows count of in-transit orders

**Functionality:**
1. Displays all orders from dummy data
2. Allows users to cancel orders (if Processing or Shipped)
3. Allows users to return orders (if Delivered)
4. Shows success/action messages for 3 seconds
5. Updates order status in real-time
6. Includes "Browse Products" link for continued shopping

**Responsive Design:**
- Single column layout on mobile
- Multi-column summary cards on tablet/desktop
- Full-width order cards on all devices
- Flexible button layouts

## Usage

### Import and Use OrderCard
```javascript
import OrderCard from '@/components/OrderCard';

<OrderCard 
  order={orderObject}
  onStatusChange={handleStatusChange}
/>
```

### Import and Use TrackingBar
```javascript
import TrackingBar from '@/components/TrackingBar';

<TrackingBar currentStatus="Shipped" />
```

### Access Dummy Orders
```javascript
import { dummyOrders } from '@/lib/data';

const orders = dummyOrders;
```

## Interaction Flow

### Cancelling an Order
1. Order must have status "Processing" or "Shipped"
2. User clicks "Cancel Order" button
3. Order status changes to "Cancelled"
4. TrackingBar disables and shows cancellation message
5. Success message displays for 3 seconds
6. Cancel button disappears

### Returning an Order
1. Order must have status "Delivered"
2. User clicks "Return Order" button
3. Order status changes to "Returned"
4. TrackingBar disables and shows return message
5. Success message displays for 3 seconds
6. Return button disappears

## Styling Details

### Color System
- **Primary**: Blue (#3B82F6) - Information and CTAs
- **Success**: Green (#10B981) - Delivered status
- **Warning**: Yellow (#F59E0B) - Processing status
- **Info**: Purple (#A855F7) - Out for Delivery
- **Danger**: Red (#EF4444) - Cancelled status
- **Neutral**: Gray (#6B7280) - Default states

### Spacing
- Section padding: 2.5rem (40px)
- Card padding: 1.5rem (24px)
- Item spacing: 0.75rem (12px)
- Gap between components: 1.5rem (24px)

### Typography
- Page title: 2.25rem (36px) bold
- Card title: 1.25rem (20px) bold
- Labels: 0.875rem (14px) uppercase
- Body text: 1rem (16px)

## Responsive Breakpoints

- **Mobile**: < 768px
  - Single column layout
  - Stacked buttons (flex-col)
  - Full-width elements
  
- **Tablet**: 768px - 1024px
  - Grid cards in 2-3 columns
  - Flexible button layout
  
- **Desktop**: > 1024px
  - Grid cards in 3 columns
  - Inline buttons
  - Max width container (1536px)

## No Backend Requirements

- All data is static and stored in `/lib/data.js`
- Order status updates are handled by React state only
- No API calls or server communication required
- All changes are temporary and reset on page refresh
- Perfect for UI/UX demonstration and prototyping

## Customization Guide

### Add More Orders
Edit `/lib/data.js` and add objects to `dummyOrders` array with the Order Object structure.

### Change Status Colors
Edit the className in OrderCard.js:
```javascript
status === 'Processing'
  ? 'bg-yellow-100 text-yellow-800'
  : status === 'Shipped'
  ? 'bg-blue-100 text-blue-800'
  // ... modify colors here
```

### Modify Tracking Steps
Edit the `steps` array in TrackingBar.js to change step names or order.

### Adjust Button Behavior
Edit the `handleCancelOrder()` and `handleReturnOrder()` functions in OrderCard.js.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Notes

- Minimal re-renders using useState for local state
- Efficient CSS with Tailwind classes
- No external UI library dependencies
- Fast page load without API calls
- Responsive design without media queries overhead

## Future Enhancements

- Export order as PDF
- Order history filtering/sorting
- Order search functionality
- Email support for returns
- Live tracking integration
- Payment method display
- Reorder functionality
- Order notes/comments section

# AI-Shop E-Commerce Home Page

A beginner-friendly, fully responsive e-commerce home page built with Next.js (App Router), React, and Tailwind CSS.

## 📁 Project Structure

```
/components
  ├── Navbar.js              # Sticky navigation bar with mobile hamburger menu
  ├── CategoryCard.js        # Reusable category card component
  ├── ProductCard.js         # Reusable product card component
  ├── Carousel.js            # Auto-sliding carousel with manual controls
  └── Footer.js              # Footer with multiple sections

/app
  ├── page.js               # Main home page component
  ├── layout.tsx            # Root layout
  └── globals.css           # Global styles (Tailwind)

/lib
  └── data.js               # Static data arrays for all sections
```

## ✨ Features

### 1. **Responsive Navigation Bar**
- Logo and branding text "AI-Shop"
- Desktop navigation links
- Mobile hamburger menu (toggle on small screens)
- Sticky positioning at the top
- Smooth hover effects

### 2. **Top Categories Section**
- Grid layout: 2 columns on mobile, 4 columns on desktop
- Reusable `CategoryCard` component
- Icon-based placeholder images
- Hover scale effect for interactivity

### 3. **Carousel Section**
- Auto-sliding functionality (changes every 4 seconds)
- Manual navigation with left/right arrow buttons
- Dot indicators for slide navigation
- Smooth CSS transitions
- Responsive height
- No third-party carousel library (built from scratch)

### 4. **Trending Products Section**
- Responsive grid: 1 column mobile, 2 on tablet, 4 on desktop
- Product cards with:
  - Icon-based images
  - Product name
  - Discounted price with original price strikethrough
  - Discount percentage badge
  - "Add to Cart" button
- Hover scale and shadow effects

### 5. **Recommended Products Section**
- Similar layout to Trending Products
- Different background color for visual distinction
- Same card design and functionality

### 6. **Footer**
- Three-column layout:
  - About section
  - Quick Links
  - Contact information
- Dark theme
- Responsive grid
- Copyright text

## 🎨 Design & Styling

- **Framework:** Tailwind CSS
- **Color Scheme:** Blue primary, with neutral grays and accent colors
- **Responsive Design:** Mobile-first approach with breakpoints for tablet and desktop
- **Spacing:** Consistent use of Tailwind's spacing scale
- **Typography:** Clean and readable with proper font weights

## 🔧 Technologies Used

- **Next.js 16** (App Router)
- **React 19** (Client Components)
- **Tailwind CSS** (Utility-first CSS)
- **JavaScript** (No TypeScript)
- **Emojis** (for product/category icons)

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (2 columns for categories, 1 column for products)
- **Tablet:** 768px - 1024px (3-4 columns for products)
- **Desktop:** > 1024px (Full layout with 4 columns)

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Reusable Components

### CategoryCard
- Props: `name`, `bgColor`
- Simple and lightweight category display

### ProductCard
- Props: `name`, `price`, `discount`, `image`
- Calculates original price from discount
- Shows discount badge

### Carousel
- Props: `items` (array of carousel items)
- Auto-plays and supports manual navigation
- Responsive height

## 📊 Data Structure

All static data is stored in `/lib/data.js`:

```javascript
// Each category object
{ name: 'Electronics', bgColor: 'bg-blue-100' }

// Each carousel item
{ name: 'Wireless Headphones', image: '🎧', discount: 30 }

// Each product
{ name: 'Premium Headphones', price: 79.99, discount: 20, image: '🎧' }
```

## 🎯 Learning Points for Beginners

- Component-based architecture
- Prop drilling and component reusability
- React hooks (`useState`, `useEffect`, `useRef`)
- Tailwind CSS utility classes
- Responsive design with mobile-first approach
- Grid and Flexbox layouts
- Simple animations with CSS transitions

## 💡 Future Enhancements

- Add product detail pages
- Implement shopping cart functionality
- Add user authentication
- Connect to a real database (Supabase, MongoDB)
- Add product filters and search
- Implement user reviews and ratings
- Add payment integration

## 📄 License

Free to use and modify for learning purposes.

---

**Built with ❤️ for beginners learning web development**

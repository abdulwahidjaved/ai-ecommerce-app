'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Cart Context
const CartContext = createContext();

// CartProvider component to wrap the app
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('[v0] Error loading cart from localStorage:', error);
        setCartItems([]);
      }
    }
    setIsHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  // Add item to cart or increase quantity if already exists
  const addToCart = (product) => {
    const MAX_QUANTITY = 99;
    console.log('[v0] Adding product to cart:', product.name);
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increase quantity (with limit)
        if (existingItem.quantity >= MAX_QUANTITY) {
          console.log('[v0] Max quantity reached for:', product.name);
          return prevItems; // Return unchanged
        }
        console.log('[v0] Item exists, increasing quantity to:', existingItem.quantity + 1);
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
            : item
        );
      }

      // If item doesn't exist, add it with quantity 1
      console.log('[v0] Adding new item to cart');
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ];
    });
  };

  // Remove item from cart completely
  const removeFromCart = (productId) => {
    console.log('[v0] Removing product from cart, ID:', productId);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Decrease quantity or remove if quantity reaches 0
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Update quantity directly with validation
  const updateQuantity = (productId, quantity) => {
    const MAX_QUANTITY = 99;
    const validQuantity = Math.max(1, Math.min(Math.floor(quantity), MAX_QUANTITY));
    
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: validQuantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total price of all items in cart
  const getTotalPrice = () => {
    const total = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    console.log('[v0] Cart total:', total, 'Items count:', cartItems.length);
    return total;
  };

  // Get total number of items in cart
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {isHydrated ? children : <></>}
    </CartContext.Provider>
  );
}

// Custom hook to use Cart Context
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }

  return context;
}

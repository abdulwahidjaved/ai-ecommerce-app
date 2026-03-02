'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { getTotalItems } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'My Cart', href: '/cart' },
    { name: 'My Orders', href: '/my-orders' },
    { name: 'AI Help', href: '/help' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
            AI-Shop
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition font-medium relative"
              >
                {link.name}
                {link.name === 'My Cart' && getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            ))}

            {/* Auth Links */}
            {isAuthenticated ? (
              <div className="flex items-center gap-4 border-l border-gray-300 pl-6">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">{user?.name}</span>
                  <span className="text-xs text-gray-600">{user?.email}</span>
                </div>
                <Link
                  href="/profile"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm"
                >
                  Profile
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-gray-300 pl-6">
                <Link
                  href="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold text-sm"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-50 py-4 px-4 space-y-2 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition relative"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                {link.name === 'My Cart' && getTotalItems() > 0 && (
                  <span className="absolute right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            ))}

            {/* Mobile Auth Links */}
            <div className="border-t border-gray-300 pt-4 mt-4">
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 mb-3">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-600">{user?.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    className="block text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    My Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-4 py-2 rounded transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

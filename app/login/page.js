'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/LoginForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/products');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 mt-3">
              Sign in to your account to continue shopping
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <LoginForm />
          </div>

          {/* Additional Help */}
          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Need help? Contact our{' '}
              <Link href="/support" className="text-blue-600 hover:text-blue-700 font-semibold">
                support team
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

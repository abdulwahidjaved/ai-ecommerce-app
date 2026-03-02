'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import SignupForm from '@/components/SignupForm';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SignupPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-3">
              Join us and start shopping with exclusive offers
            </p>
          </div>

          {/* Signup Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
            <SignupForm />
          </div>

          {/* Security Note */}
          <div className="mt-8 text-center text-xs text-gray-600 space-y-2">
            <p className="font-semibold">Your account is secure</p>
            <p>
              We never share your information with third parties. By creating an account,
              you agree to our{' '}
              <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                terms of service
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

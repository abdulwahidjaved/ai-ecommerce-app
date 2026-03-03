'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import {
  validateEmail,
  validatePassword,
  validateName,
  getPasswordStrength,
  getPasswordStrengthLabel,
} from '@/lib/auth';

export default function SignupForm() {
  const router = useRouter();
  const { signup } = useAuth(); // ✅ use login instead of local signup
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    const nameValidation = validateName(formData.name);
    if (!nameValidation.valid) newErrors.name = nameValidation.error;

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.valid) newErrors.email = emailValidation.error;

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) newErrors.password = passwordValidation.error;

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const user = await signup(
        formData.email,
        formData.password,
        formData.name
      );

      toast.success(`Welcome, ${user.name}! Your account has been created.`);

      router.push('/products');

    } catch (error) {
      toast.error(error.message || 'Signup failed');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const strengthColors = {
    0: 'bg-red-500',
    1: 'bg-orange-500',
    2: 'bg-yellow-500',
    3: 'bg-blue-500',
    4: 'bg-green-500',
    5: 'bg-emerald-500',
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-2">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.email
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-2">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.password
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-2">{errors.password}</p>
        )}

        {formData.password && (
          <div className="mt-3 space-y-2">
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`h-2 flex-1 rounded-full transition ${index < passwordStrength
                      ? strengthColors[passwordStrength]
                      : 'bg-gray-200'
                    }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-600">
              Password strength:{' '}
              <span className="font-semibold">
                {getPasswordStrengthLabel(passwordStrength)}
              </span>
            </p>
          </div>
        )}

        <div className="mt-3 text-xs text-gray-600 space-y-1">
          <p className="font-semibold">Password must contain:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter (A-Z)</li>
            <li>At least one number (0-9)</li>
            <li>At least one special character (!@#$%^&*)</li>
          </ul>
        </div>
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={isLoading}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${errors.confirmPassword
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
            } disabled:bg-gray-100 disabled:cursor-not-allowed`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-4 rounded-lg transition disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
          Sign in here
        </Link>
      </p>
    </form>
  );
}
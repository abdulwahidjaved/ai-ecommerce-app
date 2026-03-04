'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { validateName, validatePassword } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, updateProfile, changePassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name
    const nameValidation = validateName(profileData.name);
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.error;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      updateProfile(profileData.name);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate old password
    if (!passwordData.oldPassword) {
      newErrors.oldPassword = 'Current password is required';
    }

    // Validate new password
    const newPasswordValidation = validatePassword(passwordData.newPassword);
    if (!newPasswordValidation.valid) {
      newErrors.newPassword = newPasswordValidation.error;
    }

    // Validate confirm password
    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your new password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      changePassword(passwordData.oldPassword, passwordData.newPassword);
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      toast.success('Logged out successfully');
      router.push('/login');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Account</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile and account settings
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 font-semibold border-b-2 transition ${
              activeTab === 'password'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Change Password
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 max-w-2xl">
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
                <p className="text-xs text-gray-600 mt-2">Email cannot be changed</p>
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ₹{
                    errors.name
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">{errors.name}</p>
                )}
              </div>

              {/* Member Since */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Member Since
                </label>
                <input
                  type="text"
                  value={new Date(user?.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                />
              </div>

              {/* Save Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 max-w-2xl">
            <form onSubmit={handleChangePassword} className="space-y-6">
              {/* Old Password */}
              <div>
                <label htmlFor="oldPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.oldPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="••••••••"
                />
                {errors.oldPassword && (
                  <p className="text-red-500 text-sm mt-2">{errors.oldPassword}</p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.newPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="••••••••"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm mt-2">{errors.newPassword}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
                    errors.confirmPassword
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-gray-300 focus:ring-blue-500'
                  } disabled:bg-gray-100 disabled:cursor-not-allowed`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Save Button */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Updating...' : 'Change Password'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Logout Button */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

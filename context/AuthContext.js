'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem("authUser");

        if (
          storedUser &&
          storedUser !== "undefined" &&
          storedUser !== "null"
        ) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        setUser(null);
        localStorage.removeItem("authUser");
      } finally {
        setIsHydrated(true);
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // ===============================
  // SIGNUP (MongoDB API)
  // ===============================
  const signup = async (email, password, name) => {
    setIsLoading(true);

    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      throw new Error(data.message || 'Signup failed');
    }

    setUser(data);
    localStorage.setItem('authUser', JSON.stringify(data));

    setIsLoading(false);
    return data;
  };

  // ===============================
  // LOGIN (MongoDB API)
  // ===============================
  const login = async (email, password) => {
    setIsLoading(true);

    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      throw new Error(data.message || 'Login failed');
    }

    setUser(data);
    localStorage.setItem('authUser', JSON.stringify(data));

    setIsLoading(false);
    return data;
  };

  // ===============================
  // LOGOUT
  // ===============================
  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  // ===============================
  // UPDATE PROFILE (API BASED)
  // ===============================
  const updateProfile = async (name) => {
    if (!user) throw new Error('No user logged in');

    const res = await fetch('http://localhost:5000/api/auth/update-profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user.id, name }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Profile update failed');
    }

    setUser(data.user);
    localStorage.setItem('authUser', JSON.stringify(data.user));

    return data.user;
  };

  // ===============================
  // CHANGE PASSWORD (API BASED)
  // ===============================
  const changePassword = async (oldPassword, newPassword) => {
    if (!user) throw new Error('No user logged in');

    const res = await fetch('http://localhost:5000/api/auth/change-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        oldPassword,
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Password change failed');
    }

    return true;
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signup,
    login,
    logout,
    updateProfile,
    changePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {isHydrated ? children : null}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
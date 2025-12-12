import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Basic validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      }, {
        withCredentials: true
      });

      const user = response.data.data.user;
      
      // Store user data in local storage
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      toast.success('Successfully logged in!');
      return user;
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to sign in. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Basic validation
      if (!email || !password || !name) {
        throw new Error('All fields are required');
      }

      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      const response = await axios.post(`${API_URL}/auth/signup`, {
        name,
        email,
        password,
        passwordConfirm: password
      }, {
        withCredentials: true
      });

      // Return the user data for the component to handle
      const user = response.data.data.user;
      toast.success('Account created successfully! Please log in.');
      return user;
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create an account. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      try {
        // Try to call the logout endpoint if possible
        await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      } catch (err) {
        console.error('Logout API call failed, but continuing with client-side logout', err);
      }
      
      // Clear local storage and state
      localStorage.removeItem('user');
      setCurrentUser(null);
      
      toast.success('Successfully logged out');
      navigate('/login');
      
    } catch (err: any) {
      const errorMessage = 'Failed to log out. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading,
    error,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

import apiClient from './apiClient';
import { getRefreshToken, setAccessToken, setRefreshToken, clearAuthData } from '../utils/auth';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// User Registration
export const register = async (userData: Omit<RegisterData, 'confirmPassword'>) => {
  const response = await apiClient.post<AuthResponse>('/auth/register', userData);
  const { accessToken, refreshToken, user } = response.data;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  return user;
};

// User Login
export const login = async (credentials: LoginCredentials) => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  const { accessToken, refreshToken, user } = response.data;
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
  return user;
};

// User Logout
export const logout = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
  } finally {
    clearAuthData();
    window.location.href = '/login';
  }
};

// Refresh Access Token
export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<{ accessToken: string }>('/auth/refresh-token', {
      refreshToken,
    });

    const { accessToken } = response.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    clearAuthData();
    throw error;
  }
};

// Forgot Password
export const forgotPassword = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};

// Reset Password
export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
  await apiClient.post('/auth/reset-password', { token, newPassword });
};

// Verify Email
export const verifyEmail = async (token: string): Promise<void> => {
  await apiClient.post('/auth/verify-email', { token });
};

// Get Current User
export const getCurrentUser = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};

import apiClient from './client';

/**
 * Auth API Service
 * Handles all authentication-related API calls
 */

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/auth/login/', {
      username: credentials.username,
      password: credentials.password,
    });
    
    // Store tokens in localStorage
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/auth/register/', {
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      username: userData.username,
      password: userData.password,
      role: userData.role,
    });
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const getProfile = async () => {
  try {
    const response = await apiClient.get('/api/patients/me/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch profile' };
  }
};

export const updateProfile = async (profileData) => {
  try {
    const response = await apiClient.patch('/api/patients/me/', {
      user: {
        phone: profileData.phone,
        gender: profileData.gender,
        address: profileData.address,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to update profile' };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  } catch (error) {
    console.error('[v0] Logout error:', error);
  }
};

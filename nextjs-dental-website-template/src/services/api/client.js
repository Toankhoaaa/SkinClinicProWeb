import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: 'https://movement-hall-call-soon.trycloudflare.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for requests to include auth token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add interceptor for responses to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;

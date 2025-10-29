import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example API call to get items
export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

// Example API call to login
export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// Example API call to signup
export const signup = async (userData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

// Example API call to get user profile
export const getUserProfile = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};
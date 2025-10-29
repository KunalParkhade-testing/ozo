import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface TokenResponse {
  access_token: string;
  token_type: string;
}

// Auth API calls
export const login = async (credentials: LoginCredentials): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>('/auth/login', credentials);
  return response.data;
};

export const signup = async (userData: SignupData) => {
  const response = await api.post('/auth/signup', userData);
  return response.data;
};

// User API calls
export const getUserProfile = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Items API calls
export const getItems = async () => {
  const response = await api.get('/items');
  return response.data;
};

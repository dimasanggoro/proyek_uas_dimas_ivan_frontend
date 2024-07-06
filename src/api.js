import axios from 'axios';

// Function to get the token from localStorage
const getToken = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData ? userData.token : null;
};

// Create an axios instance with default headers
const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add token to headers for every request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.mybearer = token;
  }
  return config;
});

export default api;

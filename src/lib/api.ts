const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Set auth token in localStorage
const setAuthToken = (token: string) => {
  localStorage.setItem('authToken', token);
};

// Remove auth token from localStorage
const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// API request helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data;
};

// Auth API
export const authAPI = {
  register: async (fullName: string, email: string, password: string) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password }),
    });
    setAuthToken(data.token);
    return data;
  },

  login: async (email: string, password: string) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(data.token);
    return data;
  },

  logout: () => {
    removeAuthToken();
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },
};

// Tasks API
export const tasksAPI = {
  getAll: async (filters?: { status?: string; priority?: string }) => {
    const params = new URLSearchParams(filters as any);
    return await apiRequest(`/tasks?${params}`);
  },

  getById: async (id: string) => {
    return await apiRequest(`/tasks/${id}`);
  },

  create: async (taskData: any) => {
    return await apiRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  update: async (id: string, taskData: any) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  delete: async (id: string) => {
    return await apiRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return await apiRequest('/tasks/stats/overview');
  },
};

// Notes API
export const notesAPI = {
  getAll: async (filters?: { tags?: string; search?: string }) => {
    const params = new URLSearchParams(filters as any);
    return await apiRequest(`/notes?${params}`);
  },

  getById: async (id: string) => {
    return await apiRequest(`/notes/${id}`);
  },

  create: async (noteData: any) => {
    return await apiRequest('/notes', {
      method: 'POST',
      body: JSON.stringify(noteData),
    });
  },

  update: async (id: string, noteData: any) => {
    return await apiRequest(`/notes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(noteData),
    });
  },

  delete: async (id: string) => {
    return await apiRequest(`/notes/${id}`, {
      method: 'DELETE',
    });
  },
};

// Profile API
export const profileAPI = {
  get: async () => {
    return await apiRequest('/profile');
  },

  update: async (profileData: any) => {
    return await apiRequest('/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

export { getAuthToken, setAuthToken, removeAuthToken };

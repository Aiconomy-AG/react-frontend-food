import axios from 'axios';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// 401 pe /login sau /register înseamnă "credențiale greșite", nu "sesiune
// expirată" — nu trebuie tratat ca deconectare automată.
const AUTH_ENDPOINTS = ['/login', '/register'];

API.interceptors.response.use(
    (response) => response,
    (error) => {
        const isAuthEndpoint = AUTH_ENDPOINTS.some(path => error.config?.url?.includes(path));

        if (error.response?.status === 401 && !isAuthEndpoint) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

export const recipeService = {
    getAll: () => API.get('/recipes').then(res => res.data),
    create: (data) => API.post('/recipes', data).then(res => res.data),
    delete: (id) => API.delete(`/recipes/${id}`).then(res => res.data),
    getRandom: () => API.get('/recipes/random-recipe').then(res => res.data),
};

export const nutritionService = {
    calculate: (ingredients) => API.post('/nutrition/calculate', { ingredients }).then(res => res.data),
};

export const authService = {
    register: async (data) => {
        const res = await API.post('/register', data);
        localStorage.setItem(TOKEN_KEY, res.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
        return res.data;
    },
    login: async (data) => {
        const res = await API.post('/login', data);
        localStorage.setItem(TOKEN_KEY, res.data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
        return res.data;
    },
    logout: async () => {
        try {
            await API.post('/logout');
        } finally {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
        }
    },
    getStoredUser: () => {
        const raw = localStorage.getItem(USER_KEY);
        return raw ? JSON.parse(raw) : null;
    },
    getToken: () => localStorage.getItem(TOKEN_KEY),
};
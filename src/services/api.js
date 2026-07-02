import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const recipeService = {
    getAll: () => API.get('/recipes').then(res => res.data),
    create: (data) => API.post('/recipes', data).then(res => res.data),
    delete: (id) => API.delete(`/recipes/${id}`).then(res => res.data),
    getRandom: () => API.get('/recipes/random-recipe').then(res => res.data),
};

export const nutritionService = {
    calculate: (ingredients) => API.post('/nutrition/calculate', { ingredients }).then(res => res.data),
};
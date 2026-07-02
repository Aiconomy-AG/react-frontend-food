import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const recipeService = {
    getAll: () => API.get('').then(res => res.data),
    create: (data) => API.post('', data).then(res => res.data),
    delete: (id) => API.delete(`/${id}`).then(res => res.data),
    getRandom: () => API.get('/random-recipe').then(res => res.data), 

};
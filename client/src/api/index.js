import axios from 'axios';
//https://memories-api-82s8.onrender.com'
const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});
// Configure Axios to handle larger payloads
API.defaults.maxContentLength = Infinity;
API.defaults.maxBodyLength = Infinity;

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);


export const fetchPostsBySearch = (searchQuery) => {
  const titleParam = searchQuery && searchQuery.search ? `searchQuery=${searchQuery.search}` : '';
  const tagsParam = searchQuery && searchQuery.tags ? `tags=${searchQuery.tags}` : '';
  const queryParams = [titleParam, tagsParam].filter(Boolean).join('&');
  console.log('queryp',queryParams)
  return API.get(`/posts/search?${queryParams}`);
};

export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const comment = (value,id) => API.patch(`/posts/${id}/commentPost`, {value});
export const signIn = (formData) => API.post('/users/signin', formData);
export const signUp = (formData) => API.post('/users/signup', formData);

export default API;

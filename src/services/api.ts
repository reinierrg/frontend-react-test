import axios from 'axios';
import type { User, Post } from '../types';
import { API_BASE_URL, API_ENDPOINTS } from './endpoints';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getUsers = () => api.get<User[]>(API_ENDPOINTS.GET_USERS);

export const getPostsByUser = (userId: number) => 
  api.get<Post[]>(API_ENDPOINTS.GET_POSTSBYUSER(userId));

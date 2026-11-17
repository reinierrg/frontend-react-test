import { create } from 'zustand';
import type { User, Post } from '../types';
import { getUsers, getPostsByUser } from '../services/api';

interface AppState {
  users: User[];
  selectedUser: User | null;
  posts: Post[];
  searchTerm: string;
  loading: boolean;
  error: string | null;

  fetchUsers: () => Promise<void>;
  fetchPosts: (userId: number) => Promise<void>;
  setSearchTerm: (term: string) => void;
  selectUser: (user: User | null) => void;
  addPost: (post: Post) => void;
  clearError: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  users: [],
  selectedUser: null,
  posts: [],
  searchTerm: '',
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await getUsers();
      set({ users: data, loading: false });
    } catch (err) {
      set({ error: 'Error al cargar usuarios', loading: false });
    }
  },

  fetchPosts: async (userId) => {
    set({ loading: true, error: null });
    try {
      const { data } = await getPostsByUser(userId);
      set({ posts: data, loading: false });
    } catch (err) {
      set({ error: 'Error al cargar publicaciones', loading: false });
    }
  },

  setSearchTerm: (term) => set({ searchTerm: term }),
  selectUser: (user) => set({ selectedUser: user, posts: [] }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  clearError: () => set({ error: null }),
}));
import { create } from 'zustand';
import type { User, Post } from '../types';
import { getUsers, getPostsByUser } from '../services/api';

interface AppState {
  users: User[];
  selectedUser: User | null;
  posts: Post[];
  searchTerm: string;
  usersLoading: boolean;
  postsLoading: boolean;
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
  usersLoading: false,
  postsLoading: false,
  error: null,

  fetchUsers: async () => {
    set({ usersLoading: true, error: null });
    try {
      const { data } = await getUsers();
      set({ users: data, usersLoading: false });
    } catch {
      set({ error: 'Error al cargar usuarios', usersLoading: false });
    }
  },

  fetchPosts: async (userId) => {
    set({ postsLoading: true, error: null });
    try {
      const { data } = await getPostsByUser(userId);
      set({ posts: data, postsLoading: false });
    } catch {
      set({ error: 'Error al cargar publicaciones', postsLoading: false });
    }
  },

  setSearchTerm: (term) =>
    set({ searchTerm: term, selectedUser: null, posts: [] }),
  selectUser: (user) => set({ selectedUser: user, posts: [] }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  clearError: () => set({ error: null }),
}));
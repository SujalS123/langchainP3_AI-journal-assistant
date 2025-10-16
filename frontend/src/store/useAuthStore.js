import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      
      setAuth: (token, user) => set({ 
        token, 
        user, 
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        token: null, 
        user: null, 
        isAuthenticated: false 
      }),
      
      getAuthHeaders: () => {
        const token = get().token;
        return token ? {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        } : {
          'Content-Type': 'application/json'
        };
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
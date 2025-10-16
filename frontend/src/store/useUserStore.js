import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set, get) => ({
      userId: null,
      userName: '',
      
      // Generate or get user
      initializeUser: () => {
        const existingUserId = get().userId;
        if (!existingUserId) {
          const newUserId = 'user_' + Math.random().toString(36).substr(2, 9);
          set({ userId: newUserId });
          return newUserId;
        }
        return existingUserId;
      },
      
      setUserName: (name) => set({ userName: name }),
      
      clearUser: () => set({ userId: null, userName: '' }),
    }),
    {
      name: 'journal-user-storage',
    }
  )
);
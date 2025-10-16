import { create } from 'zustand';

export const useJournalStore = create((set, get) => ({
  entries: [],
  currentEntry: '',
  reflection: null,
  loading: false,
  
  setCurrentEntry: (entry) => set({ currentEntry: entry }),
  setReflection: (reflection) => set({ reflection }),
  setLoading: (loading) => set({ loading }),
  
  addEntry: (entry) => set((state) => ({
    entries: [...state.entries, entry]
  })),
  
  clearCurrentEntry: () => set({ currentEntry: '', reflection: null }),
}));
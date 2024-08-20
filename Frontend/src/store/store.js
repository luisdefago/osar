import { create } from 'zustand'

export const useStore = create((set) => ({
  user: null,
  setUser: (newUser) => set(() => ({ user: newUser }))
}));

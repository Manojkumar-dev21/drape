import { create } from 'zustand'

interface UIStore {
  isCartOpen: boolean
  isLoaded: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  setLoaded: (val: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isLoaded: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  setLoaded: (val: boolean) => set({ isLoaded: val }),
}))

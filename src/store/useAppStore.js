// src/store/useAppStore.js
import { create } from "zustand";

export const useAppStore = create((set) => ({
  isLoading: false,
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));

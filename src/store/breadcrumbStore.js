import { create } from 'zustand'

export const useBreadcrumbStore = create((set) => ({
  breadcrumbs: [],
  setBreadcrumbs: (items) => set({ breadcrumbs: items }),
}))

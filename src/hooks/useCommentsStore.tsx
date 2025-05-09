import { create } from 'zustand'

export interface ICommentsStore {
  sort: 'asc' | 'desc'
  page: number
  size: number
  setSort: (sort: ICommentsStore['sort']) => void
  setPage: (page: number) => void
  setSize: (size: number) => void
}

export const useCommentsStore = create<ICommentsStore>()((set) => ({
  sort: 'asc',
  page: 1,
  size: 3,
  setSort: (sort) => set({ sort }),
  setPage: (page) => set({ page }),
  setSize: (size) => set({ size }),
}))
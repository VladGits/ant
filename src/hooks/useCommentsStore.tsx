import { create } from 'zustand'

export interface ICommentsStore {
  sort: 'asc' | 'desc'
  page: number
  size: number
  setSort: (sort: ICommentsStore['sort']) => void
  setPage: (page: number) => void
}

export const useCommentsStore = create<ICommentsStore>()((set) => ({
  sort: 'asc',
  page: 1,
  size: 4,
  setSort: (sort) => set({ sort }),
  setPage: (page) => set({ page }),
}))
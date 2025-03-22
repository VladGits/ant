import { create } from "zustand";

interface DateStore {
  dateRange: [string | null, string | null];
  setDateRange: (range: [string | null, string | null]) => void;
}

export const useDateStore = create<DateStore>((set) => ({
  dateRange: [null, null],
  setDateRange: (range) => set({ dateRange: range }),
}));

import { create } from "zustand";

type AttendanceState = {
  loading: boolean;
  error: string | null;
  cache: Record<string, unknown>;
  entries: Array<Record<string, unknown>>;
  setEntries: (value: Array<Record<string, unknown>>) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
};

export const useAttendanceStore = create<AttendanceState>((set) => ({
  loading: false,
  error: null,
  cache: {},
  entries: [],
  setEntries: (entries) => set({ entries }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

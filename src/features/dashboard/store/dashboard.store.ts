import { create } from "zustand";

type DashboardState = {
  loading: boolean;
  error: string | null;
  cache: Record<string, unknown>;
  summary: Record<string, unknown> | null;
  setSummary: (value: Record<string, unknown> | null) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  loading: false,
  error: null,
  cache: {},
  summary: null,
  setSummary: (summary) => set({ summary }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

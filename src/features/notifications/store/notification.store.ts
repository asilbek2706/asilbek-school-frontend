import { create } from "zustand";

type NotificationState = {
  loading: boolean;
  error: string | null;
  cache: Record<string, unknown>;
  items: Array<Record<string, unknown>>;
  setItems: (value: Array<Record<string, unknown>>) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  loading: false,
  error: null,
  cache: {},
  items: [],
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

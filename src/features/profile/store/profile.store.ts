import { create } from "zustand";

type ProfileState = {
  loading: boolean;
  error: string | null;
  cache: Record<string, unknown>;
  profile: Record<string, unknown> | null;
  setProfile: (value: Record<string, unknown> | null) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
};

export const useProfileStore = create<ProfileState>((set) => ({
  loading: false,
  error: null,
  cache: {},
  profile: null,
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

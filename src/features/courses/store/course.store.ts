import { create } from "zustand";
import type { Course } from "@/entities/course/model/types";

type CourseState = {
  loading: boolean;
  error: string | null;
  cache: Record<string, unknown>;
  items: Course[];
  setItems: (value: Course[]) => void;
  setLoading: (value: boolean) => void;
  setError: (value: string | null) => void;
};

export const useCourseStore = create<CourseState>((set) => ({
  loading: false,
  error: null,
  cache: {},
  items: [],
  setItems: (items) => set({ items }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));

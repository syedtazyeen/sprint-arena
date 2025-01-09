import { create } from "zustand";

interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  user: User | null;
  setUser: (val: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "light",
  setTheme: (theme) => {
    set({ theme });
  },
  user: null,
  setUser: (user) => {
    set({ user });
  },
}));

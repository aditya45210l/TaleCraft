// store/bearStore.ts
import { create } from "zustand";
interface BearState {
  theme: "light" | "dark";
  setTheme: () => void;
}

const useTheme = create<BearState>()((set) => ({
  theme: "dark",
  setTheme: () =>
    set((state) => ({ theme: state.theme === "dark" ? "light" : "dark" })),
}));

export default useTheme;

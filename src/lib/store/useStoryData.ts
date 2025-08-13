// store/bearStore.ts
import { create } from "zustand";
interface BearState {
  title: string;
  setTitle: (title: string) => void;
}

const useTheme = create<BearState>()((set) => ({
  title: "",
  setTitle: (title: string) => set({ title: title }),
}));

export default useTheme;

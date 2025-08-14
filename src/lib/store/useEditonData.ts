// store/useStoryStore.ts
import { create } from "zustand";
import { StoryData_Interfase } from "../../../components/layout/IpNftMintButton";

interface StoryState extends StoryData_Interfase {
  // Actions to update the state
  setTitle: (name: string) => void;
  setDescription: (description: string) => void;
  setStoryData: (content: string) => void;
  setImageFile: (file: File | null) => void;
  setParentId: (id: string) => void;
  resetState: () => void;
}

const initialState = {
  name: "",
  description: "",
  imageFile: null,
  storyData: "",
  type: "Story" as "Story" | "Chapter",
  parentTokenId: "0",
};

export const useEditorDataStore = create<StoryState>((set) => ({
  ...initialState,
  setTitle: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setStoryData: (content) => set({ storyData: content }),
  setParentId: (id) => set({ parentTokenId: id }),
  setImageFile: (file) => set({ imageFile: file }),
  resetState: () => set(initialState),
}));

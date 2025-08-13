// store/useStoryStore.ts
import { create } from 'zustand';
import { StoryData_Interfase } from '../../../components/layout/IpNftMintButton';


interface StoryState extends StoryData_Interfase {
  // Actions to update the state
  setTitle: (name: string) => void;
  setDescription: (description: string) => void;
  setStoryData: (content: string) => void;
  setImageFile: (file: File | null) => void;
  resetState: () => void;
}

const initialState = {
  name: "",
  description: "",
  imageFile: null,
  storyData: "",
  type: "Story" as "Story" | "Chapter",
  parentTokenId: undefined,
};

export const useStoryStore = create<StoryState>((set) => ({
  ...initialState,
  setTitle: (name) => set({ name }),
  setDescription: (description) => set({ description }),
  setStoryData: (content) => set({ storyData: content }),
  setImageFile: (file) => set({ imageFile: file }),
  resetState: () => set(initialState),
}));
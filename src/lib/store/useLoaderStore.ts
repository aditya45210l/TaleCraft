// store/useLoaderStore.ts
import { create } from 'zustand';

// Define the steps for the loader UI
export const loadingStates = [
  { text: "Signing the signature" },
  { text: "Uploading story content to IPFS" },
  { text: "Uploading NFT metadata to IPFS" },
  { text: "Waiting for User to confirm transaction" },
  { text: "Minting story NFT via Origin SDK Succesfully" },
  { text: "Data saved in DB" },
];

interface LoaderState {
  loading: boolean;
  activeStep: number;
  loadingStates: typeof loadingStates;
  startLoading: () => void;
  advanceStep: () => void;
  stopLoading: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  activeStep: 0,
  loadingStates: loadingStates,
  startLoading: () => set({ loading: true, activeStep: 0 }),
  advanceStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
  stopLoading: () => set({ loading: false }),
}));
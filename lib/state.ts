import { create } from "zustand";

interface ExperimentalFeaturesState {
  enabled: boolean;
  toggle: () => void;
}

export const useExperimentalFeatures = create<ExperimentalFeaturesState>(
  (set) => ({
    enabled: false,
    toggle: () => set((state) => ({ enabled: !state.enabled })),
  }),
);

interface UiState {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const useUiState = create<UiState>((set) => ({
  searchOpen: false,
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
}));

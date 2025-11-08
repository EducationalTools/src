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
  toggleSearch: () => void;
}

export const useUiState = create<UiState>((set) => ({
  searchOpen: false,
  toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
}));

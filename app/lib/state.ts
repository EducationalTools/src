import { create } from "zustand";

interface ExperimentalFeaturesState {
  enabled: boolean;
  toggle: () => void;
}

const useExperimentalFeatures = create<ExperimentalFeaturesState>((set) => ({
  enabled: false,
  toggle: () => set((state) => ({ enabled: !state.enabled })),
}));

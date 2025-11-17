import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ExperimentalFeaturesState {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (enabled: boolean) => void;
}

export const useExperimentalFeatures = create<ExperimentalFeaturesState>()(
  persist(
    (set) => ({
      enabled: false,
      toggle: () => set((state) => ({ enabled: !state.enabled })),
      setEnabled: (enabled: boolean) => set({ enabled }),
    }),
    {
      name: "edutools-experimental-features",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface UiState {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

export const useUiState = create<UiState>((set) => ({
  searchOpen: false,
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  settingsOpen: false,
  setSettingsOpen: (open: boolean) => set({ settingsOpen: open }),
}));

interface SettingsState {
  theme: {
    mode: string;
    theme: string;
  };
  setTheme: (theme: { mode: string; theme: string }) => void;
}

export const useSettingsState = create<SettingsState>((set) => ({
  theme: {
    mode: "light",
    theme: "default",
  },
  setTheme: (theme) => set({ theme }),
}));

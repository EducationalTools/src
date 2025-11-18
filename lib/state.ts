import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { themes } from "./themes/themes";

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
    mode: "light" | "dark";
    theme: keyof typeof themes;
  };
  setTheme: (theme: { mode?: "light" | "dark"; theme?: string }) => void;
}

export const useSettingsState = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: {
        mode: "dark",
        theme: "default",
      },
      setTheme: (theme) => set({ theme: { ...get().theme, ...theme } }),
    }),
    {
      name: "edutools-theme",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

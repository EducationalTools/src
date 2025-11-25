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
      name: "edutools-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface GeneralSettingsState {
  gmaeOpenMode: "tab" | "window";
  setGmaeOpenMode: (mode: "tab" | "window") => void;
  panicKey: {
    enabled: boolean;
    key: string;
    url: string;
    disableExperimental: boolean;
  };
  setPanicKey: (panicKey: Partial<GeneralSettingsState["panicKey"]>) => void;
  cloak: {
    mode: "off" | "always" | "unfocused";
    title: string;
    favicon: string;
  };
  setCloak: (cloak: Partial<GeneralSettingsState["cloak"]>) => void;
  reset: () => void;
}

export const useGeneralSettings = create<GeneralSettingsState>()(
  persist(
    (set, get) => ({
      gmaeOpenMode: "tab",
      setGmaeOpenMode: (mode) => set({ gmaeOpenMode: mode }),
      panicKey: {
        enabled: false,
        key: "`",
        url: "https://google.com",
        disableExperimental: true,
      },
      setPanicKey: (panicKey) =>
        set({ panicKey: { ...get().panicKey, ...panicKey } }),
      cloak: {
        mode: "off",
        title: "Google",
        favicon: "https://google.com/favicon.ico",
      },
      setCloak: (cloak) => set({ cloak: { ...get().cloak, ...cloak } }),
      reset: () =>
        set({
          gmaeOpenMode: "tab",
          panicKey: {
            enabled: false,
            key: "`",
            url: "https://google.com",
            disableExperimental: true,
          },
          cloak: {
            mode: "off",
            title: "Google",
            favicon: "https://google.com/favicon.ico",
          },
        }),
    }),
    {
      name: "edutools-general-settings",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface SavedGmaes {
  saved: string[];
  isSaved: (gmaeId: string) => boolean;
  toggleSaved: (gmaeId: string) => void;
}

export const useSavedGmaes = create<SavedGmaes>()(
  persist(
    (set, get) => ({
      saved: [],
      isSaved: (gmaeId) => get().saved.includes(gmaeId),
      toggleSaved: (gmaeId) =>
        set((state) => ({
          saved: state.saved.includes(gmaeId)
            ? state.saved.filter((id) => id !== gmaeId)
            : [...state.saved, gmaeId],
        })),
    }),
    {
      name: "edutools-saved-gmaes",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

interface GmaeHistory {
  history: string[];
  enabled: boolean;
  toggleEnabled: () => void;
  addToHistory: (gmaeId: string) => void;
  clearHistory: () => void;
}

export const useGmaeHistory = create<GmaeHistory>()(
  persist(
    (set, get) => ({
      history: [],
      enabled: true,
      toggleEnabled: () => set((state) => ({ enabled: !state.enabled })),
      addToHistory: (gmaeId) =>
        set((state) => {
          if (!state.enabled) return {};
          // If included, move to end
          if (state.history.includes(gmaeId)) {
            return {
              history: [...state.history.filter((id) => id !== gmaeId), gmaeId],
            };
          }
          return {
            history: [...state.history, gmaeId],
          };
        }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "edutools-gmae-history",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

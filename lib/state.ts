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
    }
  )
);

interface UiState {
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  panicModeActivated: boolean;
  setPanicModeActivated: (activated: boolean) => void;
}

export const useUiState = create<UiState>((set) => ({
  searchOpen: false,
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  settingsOpen: false,
  setSettingsOpen: (open: boolean) => set({ settingsOpen: open }),
  panicModeActivated: false,
  setPanicModeActivated: (activated: boolean) =>
    set({ panicModeActivated: activated }),
}));

interface SettingsState {
  theme: {
    mode: "light" | "dark";
    theme: keyof typeof themes;
  };
  setTheme: (theme: { mode?: "light" | "dark"; theme?: string }) => void;
  panicKey: {
    enabled: boolean;
    url: string;
    key: string;
    disableExperimentalOnTrigger: boolean;
  };
  setPanicKey: (panicKey: {
    enabled?: boolean;
    url?: string;
    key?: string;
    disableExperimentalOnTrigger?: boolean;
  }) => void;
  cloak: {
    mode: "off" | "when-not-focused" | "on";
    title: string;
    favicon: string;
  };
  setCloak: (cloak: {
    mode?: "off" | "when-not-focused" | "on";
    title?: string;
    favicon?: string;
  }) => void;
}

export const useSettingsState = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: {
        mode: "dark",
        theme: "default",
      },
      setTheme: (theme) => set({ theme: { ...get().theme, ...theme } }),
      panicKey: {
        enabled: false,
        url: "https://classroom.google.com",
        key: "shift+escape",
        disableExperimentalOnTrigger: true,
      },
      setPanicKey: (panicKey) =>
        set({
          panicKey: { ...get().panicKey, ...panicKey },
        }),
      cloak: {
        mode: "off",
        title: "",
        favicon: "",
      },
      setCloak: (cloak) =>
        set({
          cloak: { ...get().cloak, ...cloak },
        }),
    }),
    {
      name: "edutools-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
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
    }
  )
);

interface GmaeHistory {
  history: string[];
  addToHistory: (gmaeId: string) => void;
  removeFromHistory: (gmaeId: string) => void;
  clearHistory: () => void;
}

export const useGmaeHistory = create<GmaeHistory>()(
  persist(
    (set, get) => ({
      history: [],
      addToHistory: (gmaeId) =>
        set((state) => {
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
      removeFromHistory: (gmaeId) =>
        set((state) => ({
          history: state.history.filter((id) => id !== gmaeId),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "edutools-gmae-history",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

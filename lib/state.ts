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
  loadingOverlayOpen: boolean;
  setLoadingOverlayOpen: (open: boolean) => void;
  loadingOverlayMessage: string;
  setLoadingOverlayMessage: (message: string) => void;
}

export const useUiState = create<UiState>((set) => ({
  searchOpen: false,
  setSearchOpen: (open: boolean) => set({ searchOpen: open }),
  settingsOpen: false,
  setSettingsOpen: (open: boolean) => set({ settingsOpen: open }),
  panicModeActivated: false,
  setPanicModeActivated: (activated: boolean) =>
    set({ panicModeActivated: activated }),
  loadingOverlayOpen: false,
  setLoadingOverlayOpen: (open: boolean) => set({ loadingOverlayOpen: open }),
  loadingOverlayMessage: "",
  setLoadingOverlayMessage: (message: string) =>
    set({ loadingOverlayMessage: message }),
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
  disableBlurBehind: boolean;
  setDisableBlurBehind: (disabled: boolean) => void;
  disableAllBlur: boolean;
  setDisableAllBlur: (disabled: boolean) => void;
  disableAnimations: boolean;
  setDisableAnimations: (disabled: boolean) => void;
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
        title: "Home",
        favicon: "https://ssl.gstatic.com/classroom/favicon.png",
      },
      setCloak: (cloak) =>
        set({
          cloak: { ...get().cloak, ...cloak },
        }),
      disableBlurBehind: false,
      setDisableBlurBehind: (disabled: boolean) => {
        // If disableAllBlur is enabled, keep disableBlurBehind enabled
        if (get().disableAllBlur && !disabled) {
          return; // Don't allow disabling when all blur is disabled
        }
        set({ disableBlurBehind: disabled });
      },
      disableAllBlur: false,
      setDisableAllBlur: (disabled: boolean) => {
        if (disabled) {
          // When enabling disableAllBlur, force enable disableBlurBehind
          set({ disableAllBlur: true, disableBlurBehind: true });
        } else {
          set({ disableAllBlur: false });
        }
      },
      disableAnimations: false,
      setDisableAnimations: (disabled: boolean) =>
        set({ disableAnimations: disabled }),
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

interface PrivacyState {
  historyCollectionEnabled: boolean;
  setHistoryCollectionEnabled: (enabled: boolean) => void;
}

export const usePrivacyState = create<PrivacyState>()(
  persist(
    (set) => ({
      historyCollectionEnabled: true,
      setHistoryCollectionEnabled: (enabled: boolean) =>
        set({ historyCollectionEnabled: enabled }),
    }),
    {
      name: "edutools-privacy",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Utility functions for privacy actions
export const clearAllHistory = () => {
  useGmaeHistory.getState().clearHistory();
};

export const resetSettings = () => {
  // Reset to default settings
  const defaultSettings = {
    theme: {
      mode: "dark" as const,
      theme: "default" as keyof typeof themes,
    },
    panicKey: {
      enabled: false,
      url: "https://classroom.google.com",
      key: "shift+escape",
      disableExperimentalOnTrigger: true,
    },
    cloak: {
      mode: "off" as const,
      title: "",
      favicon: "",
    },
    disableBlurBehind: false,
    disableAllBlur: false,
    disableAnimations: false,
  };
  useSettingsState.setState(defaultSettings);
};

export const clearEverything = () => {
  // Clear all localStorage items
  const keysToKeep: string[] = []; // Add any keys you want to preserve
  Object.keys(localStorage).forEach((key) => {
    if (!keysToKeep.includes(key)) {
      localStorage.removeItem(key);
    }
  });

  // Clear all sessionStorage items
  Object.keys(sessionStorage).forEach((key) => {
    sessionStorage.removeItem(key);
  });

  // Clear all cookies
  document.cookie.split(";").forEach((cookie) => {
    const trimmed = cookie.trim();
    if (trimmed) {
      const eqPos = trimmed.indexOf("=");
      const name = eqPos > -1 ? trimmed.substring(0, eqPos) : trimmed;
      // Skip malformed cookies that do not contain '='
      if (name) {
        // Set cookie to expire in the past
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        // Also try with domain
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
      }
    }
  });

  // Reload the page to reset all state
  window.location.reload();
};

import {
  useExperimentalFeatures,
  useUiState,
  useSettingsState,
} from "@/lib/state";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

export default function Hotkeys() {
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const setCommandPaletteOpen = useUiState(
    (state) => state.setCommandPaletteOpen
  );
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);
  const experimental = useExperimentalFeatures((state) => state.enabled);
  const setExperimentalEnabled = useExperimentalFeatures(
    (state) => state.setEnabled
  );
  const navigate = useNavigate();
  const panicKey = useSettingsState((state) => state.panicKey);
  const setPanicModeActivated = useUiState(
    (state) => state.setPanicModeActivated
  );

  useHotkeys("mod+k", () => setSearchOpen(true), {
    preventDefault: true,
  });
  useHotkeys("mod+p", () => setCommandPaletteOpen(true), {
    preventDefault: true,
  });
  useHotkeys("mod+comma", () => setSettingsOpen(true), {
    preventDefault: true,
  });
  useHotkeys("mod+shift+h", () => navigate("/"), {
    preventDefault: true,
  });
  useHotkeys(
    "mod+shift+g",
    () => {
      if (experimental) navigate("/g");
    },
    {
      preventDefault: true,
    }
  );

  // Panic key handler
  useHotkeys(
    panicKey.key,
    () => {
      if (panicKey.enabled && panicKey.url && experimental) {
        // Optionally disable experimental features
        if (panicKey.disableExperimentalOnTrigger) {
          setExperimentalEnabled(false);
        }
        setPanicModeActivated(true);
        // Redirect to the configured URL
        window.location.href = panicKey.url;
      }
    },
    {
      preventDefault: true,
      enabled: panicKey.enabled && !!panicKey.url && experimental,
    }
  );

  return null;
}

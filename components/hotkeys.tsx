import { useExperimentalFeatures, useUiState } from "@/lib/state";
import { useHotkeys } from "react-hotkeys-hook";
import { useNavigate } from "react-router";

export default function Hotkeys() {
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);
  const experimental = useExperimentalFeatures((state) => state.enabled);
  const navigate = useNavigate();

  useHotkeys("mod+k", () => setSearchOpen(true), {
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
    },
  );

  return null;
}

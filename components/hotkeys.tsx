import { useUiState } from "@/lib/state";
import { useHotkeys } from "react-hotkeys-hook";

export default function Hotkeys() {
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);

  useHotkeys("mod+k", () => setSearchOpen(true), {
    preventDefault: true,
  });
  useHotkeys("mod+comma", () => setSettingsOpen(true), {
    preventDefault: true,
  });

  return null;
}

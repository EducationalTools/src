import { useSettingsState, useUiState } from "@/lib/state";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ThemeSelector } from "./theme-selector";
import { ThemeModeSelector } from "./theme-mode-selector";

export default function Settings() {
  const open = useUiState((state) => state.settingsOpen);
  const setOpen = useUiState((state) => state.setSettingsOpen);
  const settingsState = useSettingsState();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <ThemeSelector className="flex-1" />
          <ThemeModeSelector />
        </div>
      </DialogContent>
    </Dialog>
  );
}

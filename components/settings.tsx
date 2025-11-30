import {
  useSettingsState,
  useUiState,
  useExperimentalFeatures,
} from "@/lib/state";
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
import { CloakModeSelector } from "./cloak-mode-selector";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function Settings() {
  const open = useUiState((state) => state.settingsOpen);
  const setOpen = useUiState((state) => state.setSettingsOpen);
  const panicKey = useSettingsState((state) => state.panicKey);
  const setPanicKey = useSettingsState((state) => state.setPanicKey);
  const cloak = useSettingsState((state) => state.cloak);
  const setCloak = useSettingsState((state) => state.setCloak);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <ThemeSelector className="flex-1" />
            <ThemeModeSelector />
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Checkbox
                id="panic-key-enabled"
                checked={panicKey.enabled}
                onCheckedChange={(checked) =>
                  setPanicKey({ enabled: checked === true })
                }
              />
              <label
                htmlFor="panic-key-enabled"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Enable Panic Key
              </label>
            </div>
            {panicKey.enabled && (
              <div className="flex flex-col gap-3 p-4 rounded-md border bg-card">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="panic-key-url"
                    className="text-sm font-medium leading-none"
                  >
                    Redirect URL
                  </label>
                  <Input
                    id="panic-key-url"
                    type="url"
                    placeholder="https://example.com"
                    value={panicKey.url}
                    onChange={(e) => setPanicKey({ url: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="panic-key-combination"
                    className="text-sm font-medium leading-none"
                  >
                    Key Combination
                  </label>
                  <Input
                    id="panic-key-combination"
                    type="text"
                    placeholder="mod+shift+p"
                    value={panicKey.key}
                    onChange={(e) => setPanicKey({ key: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use format like "mod+shift+p" or "escape". "mod" is Cmd on
                    Mac, Ctrl on Windows/Linux.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="panic-key-disable-experimental"
                    checked={panicKey.disableExperimentalOnTrigger}
                    onCheckedChange={(checked) =>
                      setPanicKey({
                        disableExperimentalOnTrigger: checked === true,
                      })
                    }
                  />
                  <label
                    htmlFor="panic-key-disable-experimental"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    Disable Experimental Features on Trigger
                  </label>
                </div>
              </div>
            )}
          </div>
          {experimentalFeatures && (
            <>
              <Separator />
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="cloak-mode"
                    className="text-sm font-medium leading-none"
                  >
                    Cloak Mode
                  </label>
                  <CloakModeSelector />
                </div>
                {cloak.mode !== "off" && (
                  <div className="flex flex-col gap-3 p-4 rounded-md border bg-card">
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="cloak-title"
                        className="text-sm font-medium leading-none"
                      >
                        Title
                      </label>
                      <Input
                        id="cloak-title"
                        type="text"
                        placeholder="Google Classroom"
                        value={cloak.title}
                        onChange={(e) => setCloak({ title: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="cloak-favicon"
                        className="text-sm font-medium leading-none"
                      >
                        Favicon URL
                      </label>
                      <Input
                        id="cloak-favicon"
                        type="url"
                        placeholder="https://example.com/favicon.ico"
                        value={cloak.favicon}
                        onChange={(e) => setCloak({ favicon: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

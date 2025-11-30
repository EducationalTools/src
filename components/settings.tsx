import {
  useSettingsState,
  useUiState,
  useExperimentalFeatures,
} from "@/lib/state";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ThemeSelector } from "./theme-selector";
import { ThemeModeSelector } from "./theme-mode-selector";
import { CloakModeSelector } from "./cloak-mode-selector";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Palette, Shield, Eye, Keyboard, Globe, Info } from "lucide-react";

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
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your EduTools experience
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          {/* Appearance Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <ThemeSelector className="flex-1" />
                <ThemeModeSelector />
              </div>
            </CardContent>
          </Card>

          {/* Panic Key Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Panic Key</CardTitle>
              </div>
              <CardDescription>
                Quickly redirect to a safe page when needed
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="panic-key-enabled"
                  checked={panicKey.enabled}
                  onCheckedChange={(checked) =>
                    setPanicKey({ enabled: checked === true })
                  }
                  className="mt-1"
                />
                <div className="flex-1 space-y-1">
                  <label
                    htmlFor="panic-key-enabled"
                    className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Enable Panic Key
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Press your configured key combination to instantly redirect
                    to a safe page
                  </p>
                </div>
              </div>
              {panicKey.enabled && (
                <div className="flex flex-col gap-4 pt-2 pl-7 border-l-2 border-border">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                      <label
                        htmlFor="panic-key-url"
                        className="text-sm font-medium leading-none"
                      >
                        Redirect URL
                      </label>
                    </div>
                    <Input
                      id="panic-key-url"
                      type="url"
                      placeholder="https://classroom.google.com"
                      value={panicKey.url}
                      onChange={(e) => setPanicKey({ url: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      The URL to redirect to when the panic key is pressed
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Keyboard className="h-3.5 w-3.5 text-muted-foreground" />
                      <label
                        htmlFor="panic-key-combination"
                        className="text-sm font-medium leading-none"
                      >
                        Key Combination
                      </label>
                    </div>
                    <Input
                      id="panic-key-combination"
                      type="text"
                      placeholder="mod+shift+p"
                      value={panicKey.key}
                      onChange={(e) => setPanicKey({ key: e.target.value })}
                    />
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                      <p>
                        Use format like "mod+shift+p" or "escape". "mod" is Cmd
                        on Mac, Ctrl on Windows/Linux.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 pt-2">
                    <Checkbox
                      id="panic-key-disable-experimental"
                      checked={panicKey.disableExperimentalOnTrigger}
                      onCheckedChange={(checked) =>
                        setPanicKey({
                          disableExperimentalOnTrigger: checked === true,
                        })
                      }
                      className="mt-1"
                    />
                    <div className="flex-1 space-y-1">
                      <label
                        htmlFor="panic-key-disable-experimental"
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        Disable Experimental Features on Trigger
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Automatically disable experimental features when panic
                        key is activated
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Cloak Mode Section (Experimental) */}
          {experimentalFeatures && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <CardTitle>Cloak Mode</CardTitle>
                </div>
                <CardDescription>
                  Disguise the browser tab to look like another website
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="cloak-mode"
                    className="text-sm font-medium leading-none"
                  >
                    Mode
                  </label>
                  <CloakModeSelector />
                  <p className="text-xs text-muted-foreground">
                    Choose when the cloak should be active
                  </p>
                </div>
                {cloak.mode !== "off" && (
                  <>
                    <Separator />
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="cloak-title"
                          className="text-sm font-medium leading-none"
                        >
                          Tab Title
                        </label>
                        <Input
                          id="cloak-title"
                          type="text"
                          placeholder="Google Classroom"
                          value={cloak.title}
                          onChange={(e) => setCloak({ title: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">
                          The title that will appear in the browser tab
                        </p>
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
                          placeholder="https://classroom.google.com/favicon.ico"
                          value={cloak.favicon}
                          onChange={(e) =>
                            setCloak({ favicon: e.target.value })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          URL to the favicon that will appear in the browser tab
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

import {
  useSettingsState,
  useUiState,
  useExperimentalFeatures,
  usePrivacyState,
  useGmaeHistory,
  clearAllHistory,
  resetSettings,
  clearEverything,
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Palette,
  Shield,
  Eye,
  Keyboard,
  Globe,
  Info,
  ArrowRight,
  Trash2,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const historyCollectionEnabled = usePrivacyState(
    (state) => state.historyCollectionEnabled
  );
  const setHistoryCollectionEnabled = usePrivacyState(
    (state) => state.setHistoryCollectionEnabled
  );
  const history = useGmaeHistory((state) => state.history);
  const disableBlur = useSettingsState((state) => state.disableBlur);
  const setDisableBlur = useSettingsState((state) => state.setDisableBlur);
  const disableAnimations = useSettingsState(
    (state) => state.disableAnimations
  );
  const setDisableAnimations = useSettingsState(
    (state) => state.setDisableAnimations
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[85vh] overflow-y-auto max-w-7xl! w-[90vw]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Appearance Section */}
          <Card className="gap-0 pb-0 overflow-hidden">
            <CardHeader>
              <div className="flex gap-2">
                <Palette className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Theme</CardTitle>
                <ThemeModeSelector className="ml-auto" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 p-0 h-full">
              <ThemeSelector />
              <Separator className="mx-6" />
              <div className="flex flex-col gap-4 px-6 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="disable-blur"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Disable Blur Effects
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Remove all blur effects from the interface
                    </p>
                  </div>
                  <Switch
                    id="disable-blur"
                    checked={disableBlur}
                    onCheckedChange={setDisableBlur}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="disable-animations"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Disable Animations
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Remove all animations and transitions
                    </p>
                  </div>
                  <Switch
                    id="disable-animations"
                    checked={disableAnimations}
                    onCheckedChange={setDisableAnimations}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Panic Key Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <CardTitle>Panic Key</CardTitle>
                </div>
                <Switch
                  checked={panicKey.enabled}
                  onCheckedChange={(checked) =>
                    setPanicKey({ enabled: checked })
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div
                className={cn(
                  "flex flex-col gap-4",
                  !panicKey.enabled && "opacity-50"
                )}
              >
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
                    disabled={!panicKey.enabled}
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
                    disabled={!panicKey.enabled}
                  />
                  <div className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                    <p>
                      Use format like "mod+shift+p" or "escape". "mod" is Cmd on
                      Mac, Ctrl on Windows/Linux.
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
                    disabled={!panicKey.enabled}
                  />
                  <div className="flex-1 space-y-1">
                    <label
                      htmlFor="panic-key-disable-experimental"
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      Disable Experimental Features on Trigger
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Automatically disable experimental features when panic key
                      is activated
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cloak Mode Section (Experimental) */}
          {experimentalFeatures && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <CardTitle>Cloak</CardTitle>
                </div>
                <CardDescription>
                  Change the title and icon of the browser tab
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Tabs
                    value={cloak.mode}
                    onValueChange={(value) =>
                      setCloak({
                        mode: value as "off" | "when-not-focused" | "on",
                      })
                    }
                  >
                    <TabsList className="w-full">
                      <TabsTrigger value="off">Off</TabsTrigger>
                      <TabsTrigger value="when-not-focused">
                        Unfocused
                      </TabsTrigger>
                      <TabsTrigger value="on">Always</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div
                  className={cn(
                    "flex flex-col gap-4",
                    cloak.mode === "off" && "opacity-50"
                  )}
                >
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
                        disabled={cloak.mode === "off"}
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
                        onChange={(e) => setCloak({ favicon: e.target.value })}
                        disabled={cloak.mode === "off"}
                      />
                      <p className="text-xs text-muted-foreground">
                        URL to the image that will appear in the browser tab
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Privacy Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <CardTitle>Privacy</CardTitle>
              </div>
              <CardDescription>
                Manage your privacy settings and data
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {/* History Collection Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="history-collection"
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    History Collection
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Track your browsing history for quick access
                  </p>
                </div>
                <Switch
                  id="history-collection"
                  checked={historyCollectionEnabled}
                  onCheckedChange={setHistoryCollectionEnabled}
                />
              </div>

              <Separator />

              {/* Clear History */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      Clear History
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Remove all items from your browsing history
                      {history.length > 0 && ` (${history.length} items)`}
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={history.length === 0}
                      >
                        <Trash2 className="h-4 w-4" />
                        Clear
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear History</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to clear all browsing history?
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={clearAllHistory}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Clear History
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <Separator />

              {/* Reset Settings */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      Reset Settings
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Reset all settings to their default values
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4" />
                        Reset
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset Settings</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to reset all settings to their
                          default values? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={resetSettings}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Reset Settings
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <Separator />

              {/* Clear Everything */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium leading-none">
                      Clear Everything
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Clear all local storage, cookies, and data. This will
                      reload the page.
                    </p>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <AlertTriangle className="h-4 w-4" />
                        Clear All
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          Clear Everything
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all your data including:
                          <ul className="list-disc list-inside mt-2 space-y-1">
                            <li>All settings and preferences</li>
                            <li>Browsing history</li>
                            <li>Saved games</li>
                            <li>Local storage data</li>
                            <li>Cookies</li>
                            <li>Session storage</li>
                          </ul>
                          <p className="mt-2 font-medium">
                            This action cannot be undone and will reload the
                            page.
                          </p>
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={clearEverything}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Clear Everything
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

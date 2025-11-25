import {
  useSettingsState,
  useUiState,
  useGeneralSettings,
  useGmaeHistory,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Settings() {
  const open = useUiState((state) => state.settingsOpen);
  const setOpen = useUiState((state) => state.setSettingsOpen);
  const settingsState = useSettingsState();
  const general = useGeneralSettings();
  const history = useGmaeHistory();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6 py-4">
            {/* Game Opening */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium leading-none">Gmae Opening</h3>
              <p className="text-sm text-muted-foreground">
                Choose how gmaes should open.
              </p>
              <div className="flex items-center gap-2">
                <select
                  value={general.gmaeOpenMode}
                  onChange={(e) =>
                    general.setGmaeOpenMode(e.target.value as "tab" | "window")
                  }
                  className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="tab" className="bg-popover text-popover-foreground">Tab</option>
                  <option value="window" className="bg-popover text-popover-foreground">Window</option>
                </select>
              </div>
            </div>

            {/* Panic Key */}
            <div className="space-y-4 border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-lg font-medium leading-none">Panic Key</h3>
                  <p className="text-sm text-muted-foreground">
                    Quickly redirect to another site.
                  </p>
                </div>
                <Checkbox
                  checked={general.panicKey.enabled}
                  onCheckedChange={(checked) =>
                    general.setPanicKey({ enabled: !!checked })
                  }
                />
              </div>
              {general.panicKey.enabled && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Trigger Key
                    </label>
                    <Input
                      value={general.panicKey.key}
                      onChange={(e) =>
                        general.setPanicKey({ key: e.target.value })
                      }
                      maxLength={1}
                      placeholder="`"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Redirect URL
                    </label>
                    <Input
                      value={general.panicKey.url}
                      onChange={(e) =>
                        general.setPanicKey({ url: e.target.value })
                      }
                      placeholder="https://google.com"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="disable-experimental"
                      checked={general.panicKey.disableExperimental}
                      onCheckedChange={(c) =>
                        general.setPanicKey({ disableExperimental: !!c })
                      }
                    />
                    <label
                      htmlFor="disable-experimental"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Disable Experimental Mode on Trigger
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Cloak */}
            <div className="space-y-4 border rounded-lg p-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-medium leading-none">Cloak</h3>
                <p className="text-sm text-muted-foreground">
                  Disguise the tab title and icon.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <select
                  value={general.cloak.mode}
                  onChange={(e) =>
                    general.setCloak({ mode: e.target.value as any })
                  }
                  className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                >
                  <option value="off" className="bg-popover text-popover-foreground">Off</option>
                  <option value="unfocused" className="bg-popover text-popover-foreground">When not focused</option>
                  <option value="always" className="bg-popover text-popover-foreground">Always On</option>
                </select>

                {general.cloak.mode !== "off" && (
                  <>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Tab Title
                      </label>
                      <Input
                        value={general.cloak.title}
                        onChange={(e) =>
                          general.setCloak({ title: e.target.value })
                        }
                        placeholder="Google"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Favicon URL
                      </label>
                      <Input
                        value={general.cloak.favicon}
                        onChange={(e) =>
                          general.setCloak({ favicon: e.target.value })
                        }
                        placeholder="https://google.com/favicon.ico"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="appearance" className="py-4">
            <div className="flex items-center gap-2">
              <ThemeSelector className="flex-1" />
              <ThemeModeSelector />
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <label className="text-base font-medium">Enable History</label>
                  <p className="text-sm text-muted-foreground">
                    Keep track of played gmaes.
                  </p>
                </div>
                <Checkbox
                  checked={history.enabled}
                  onCheckedChange={() => history.toggleEnabled()}
                />
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-medium">Data Management</h3>
                <div className="flex flex-col gap-2">
                    <Button
                        variant="destructive"
                        onClick={() => history.clearHistory()}
                        className="w-full justify-start"
                    >
                        Clear History
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => general.reset()}
                        className="w-full justify-start"
                    >
                        Reset General Settings
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to reset everything? This action cannot be undone.")) {
                                localStorage.clear();
                                window.location.reload();
                            }
                        }}
                        className="w-full justify-start"
                    >
                        Clear Everything (Factory Reset)
                    </Button>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

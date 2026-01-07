import { useExperimentalFeatures, useUiState } from "@/lib/state";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { PiSignIn, PiSignOut, PiGear } from "react-icons/pi";
import { authClient } from "@/lib/auth-client";

export default function CommandPalette() {
  const commandPaletteOpen = useUiState((state) => state.commandPaletteOpen);
  const setCommandPaletteOpen = useUiState(
    (state) => state.setCommandPaletteOpen,
  );
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);

  const setLoadingOverlayOpen = useUiState(
    (state) => state.setLoadingOverlayOpen,
  );
  const setLoadingOverlayMessage = useUiState(
    (state) => state.setLoadingOverlayMessage,
  );

  const session = authClient.useSession();

  const items: {
    label: string;
    icon?: React.ComponentType;
    onSelect: () => void;
    kbd?: string;
  }[] = [
    {
      label: "Settings",
      icon: PiGear,
      onSelect: () => {
        setSettingsOpen(true);
      },
      kbd: "⌘ ,",
    },
    ...(session.data?.user
      ? [
          {
            label: "Sign out",
            icon: PiSignOut,
            onSelect: async () => {
              setLoadingOverlayOpen(true);
              setLoadingOverlayMessage("Signing out...");
              await authClient.signOut();
              setLoadingOverlayOpen(false);
            },
          },
        ]
      : [
          { label: "Github", id: "github" },
          { label: "Google", id: "google" },
          { label: "Discord", id: "discord" },
        ].map((item) => ({
          label: "Continue with " + item.label,
          icon: PiSignIn,
          onSelect: async () => {
            const convexSiteUrl = new URL(import.meta.env.VITE_CONVEX_SITE_URL);

            const redirectUrl = new URL("/auth", convexSiteUrl);
            redirectUrl.searchParams.set("redirect", window.location.href);

            setLoadingOverlayOpen(true);
            setLoadingOverlayMessage("Signing in...");

            await authClient.signIn.social({
              provider: item.id,
              callbackURL: redirectUrl.toString(),
            });
          },
        }))),
  ];

  return (
    <CommandDialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
    >
      <CommandInput placeholder="Search commands" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {items.map((item) => (
            <CommandItem
              key={item.label}
              value={item.label}
              onSelect={() => {
                item.onSelect();
                setCommandPaletteOpen(false);
              }}
            >
              {item.icon && <item.icon />}
              {item.label}
              {item.kbd && <CommandShortcut>{item.kbd}</CommandShortcut>}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

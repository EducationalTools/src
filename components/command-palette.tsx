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
import { Settings } from "lucide-react";

export default function CommandPalette() {
  const commandPaletteOpen = useUiState((state) => state.commandPaletteOpen);
  const setCommandPaletteOpen = useUiState(
    (state) => state.setCommandPaletteOpen
  );
  const setSettingsOpen = useUiState((state) => state.setSettingsOpen);

  const items: {
    label: string;
    icon?: React.ComponentType;
    onSelect: () => void;
    kbd?: string;
  }[] = [
    {
      label: "Settings",
      icon: Settings,
      onSelect: () => {
        setSettingsOpen(true);
      },
      kbd: "⌘ ,",
    },
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

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
import { MENU_ITEMS } from "@/lib/menu";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";

export default function CommandPalette() {
  const commandPaletteOpen = useUiState((state) => state.commandPaletteOpen);
  const setCommandPaletteOpen = useUiState(
    (state) => state.setCommandPaletteOpen
  );
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled
  );
  const navigate = useNavigate();

  const menuItems = MENU_ITEMS.filter(
    (item) => !(item.experimental && !experimentalFeatures)
  );

  return (
    <CommandDialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
    >
      <CommandInput placeholder="Search commands" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {menuItems
            .filter((item) => item.href && !item.newTab)
            .map((item) => (
              <CommandItem
                key={item.href}
                value={item.href}
                onSelect={() => {
                  navigate({ pathname: item.href });
                  setCommandPaletteOpen(false);
                }}
              >
                {item.icon ? <item.icon /> : <ArrowRight />}
                {item.label}
                {item.kbd && <CommandShortcut>{item.kbd}</CommandShortcut>}
              </CommandItem>
            ))}
        </CommandGroup>
        {menuItems
          .filter((item) => item.children)
          .map((item) => (
            <CommandGroup key={item.label} heading={item.label}>
              {item.children &&
                item.children
                  .filter((item) => item.href && !item.newTab)
                  .map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.href}
                      onSelect={() => {
                        navigate({ pathname: item.href });
                        setCommandPaletteOpen(false);
                      }}
                    >
                      {item.icon ? <item.icon /> : <ArrowRight />}
                      {item.label}
                      {item.kbd && (
                        <CommandShortcut>{item.kbd}</CommandShortcut>
                      )}
                    </CommandItem>
                  ))}
            </CommandGroup>
          ))}
      </CommandList>
    </CommandDialog>
  );
}

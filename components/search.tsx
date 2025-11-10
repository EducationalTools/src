import { useExperimentalFeatures, useUiState } from "@/lib/state";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCommandState } from "cmdk";

export default function Search() {
  const searchOpen = useUiState((state) => state.searchOpen);
  const setSearchOpen = useUiState((state) => state.setSearchOpen);

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <ExperimentalFeatures />
          <CommandItem>
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

function ExperimentalFeatures() {
  const search = useCommandState((state) => state.search);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled,
  );
  const toggleExperimentalFeatures = useExperimentalFeatures(
    (state) => state.toggle,
  );
  const setSearchOpen = useUiState((state) => state.setSearchOpen);

  return (
    <CommandItem
      onSelect={() => {
        toggleExperimentalFeatures();
        setSearchOpen(false);
      }}
      className={search.toLowerCase().includes("exp") ? "" : "hidden"}
    >
      <span>
        {experimentalFeatures ? "Disable" : "Enable"} Experimental Features
      </span>
    </CommandItem>
  );
}

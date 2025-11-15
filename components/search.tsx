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
import { MENU_ITEMS } from "@/lib/menu";
import { useNavigate } from "react-router";

export default function Search() {
  const searchOpen = useUiState((state) => state.searchOpen);
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled,
  );
  const navigate = useNavigate();

  const menuItems = MENU_ITEMS.filter(
    (item) => !(item.experimental && !experimentalFeatures),
  );

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {menuItems
            .filter((item) => item.href)
            .map((item) => (
              <CommandItem
                key={item.href}
                value={item.href}
                onSelect={() => {
                  navigate({ pathname: item.href });
                  setSearchOpen(false);
                }}
              >
                {item.label}
              </CommandItem>
            ))}
        </CommandGroup>
        {menuItems
          .filter((item) => item.children)
          .map((item) => (
            <CommandGroup key={item.label} heading={item.label}>
              {item.children &&
                item.children
                  .filter((item) => item.href)
                  .map((item) => (
                    <CommandItem
                      key={item.href}
                      value={item.href}
                      onSelect={() => {
                        navigate({ pathname: item.href });
                        setSearchOpen(false);
                      }}
                    >
                      {item.label}
                    </CommandItem>
                  ))}
            </CommandGroup>
          ))}
        <CommandGroup>
          <ExperimentalFeatures />
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
      className={
        search.toLowerCase().includes("exp") || experimentalFeatures
          ? ""
          : "hidden"
      }
    >
      <span>
        {experimentalFeatures ? "Disable" : "Enable"} Experimental Features
      </span>
    </CommandItem>
  );
}

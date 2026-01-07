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
import { useEffect, useState } from "react";
import { PiArrowRight, PiCircle, PiCheckCircle } from "react-icons/pi";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Search() {
  const searchOpen = useUiState((state) => state.searchOpen);
  const setSearchOpen = useUiState((state) => state.setSearchOpen);
  const experimentalFeatures = useExperimentalFeatures(
    (state) => state.enabled,
  );
  const navigate = useNavigate();
  const [placeholder, setPlaceholder] = useState("Search...");
  const currentUser = useQuery(api.auth.getCurrentUser);

  const isAdmin = currentUser?.role === "admin";

  const menuItems = MENU_ITEMS.filter(
    (item) =>
      !(item.experimental && !experimentalFeatures) &&
      !(item.requiresAdmin && !isAdmin),
  );

  useEffect(() => {
    if (searchOpen == true) {
      if (Math.random() < 0.05) {
        // https://share.google/hDyEYsAfkwuZNZNAi
        setPlaceholder("The search begins, I'm back, so enjoy the trip, huh");
      } else {
        setPlaceholder("Search...");
      }
    }
  }, [searchOpen]);

  return (
    <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
      <CommandInput placeholder={placeholder} />
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
                  setSearchOpen(false);
                }}
              >
                {item.icon ? <item.icon /> : <PiArrowRight />}
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
                        setSearchOpen(false);
                      }}
                    >
                      {item.icon ? <item.icon /> : <PiArrowRight />}
                      {item.label}
                      {item.kbd && (
                        <CommandShortcut>{item.kbd}</CommandShortcut>
                      )}
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
      {experimentalFeatures ? <PiCheckCircle /> : <PiCircle />}
      {experimentalFeatures ? "Disable" : "Enable"} Experimental Features
    </CommandItem>
  );
}
